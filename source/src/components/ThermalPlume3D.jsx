import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 5200

function writeColor(array, index, normalizedTemperature) {
  const t = Math.max(0, Math.min(1, normalizedTemperature))
  let a; let b; let local
  if (t < .28) { a = [0.08, .28, .72]; b = [0.05, .82, 1]; local = t / .28 }
  else if (t < .64) { a = [.05, .82, 1]; b = [1, .84, .25]; local = (t - .28) / .36 }
  else { a = [1, .84, .25]; b = [1, .16, .06]; local = (t - .64) / .36 }
  array[index * 3] = a[0] + (b[0] - a[0]) * local
  array[index * 3 + 1] = a[1] + (b[1] - a[1]) * local
  array[index * 3 + 2] = a[2] + (b[2] - a[2]) * local
}

function calculateMetrics(params) {
  const deltaT = Number(params.heat)
  const buoyancy = Number(params.buoyancy)
  const rise = .28 + .92 * Math.sqrt(Math.max(.05, buoyancy)) * Math.pow(Math.max(deltaT, 1) / 500, .28)
  const ri = 9.81 * (deltaT / (293 + deltaT)) * 1.2 / Math.max(.08, Number(params.wind) ** 2 + rise ** 2)
  return { maxTemperature: 293 + deltaT, rise, ri, particles: PARTICLE_COUNT }
}

export default function ThermalPlume3D({ params, running, resetKey, onMetrics }) {
  const hostRef = useRef(null)
  const paramsRef = useRef(params)
  const runningRef = useRef(running)
  const [error, setError] = useState('')

  useEffect(() => { paramsRef.current = params }, [params])
  useEffect(() => { runningRef.current = running }, [running])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    } catch (reason) {
      setError(`当前浏览器无法初始化 WebGL：${reason.message}`)
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x060e19, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-label', '三维浮力热羽流粒子场')

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060e19, .062)
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100)
    let azimuth = .72; let elevation = .16; let distance = 11.5
    const updateCamera = () => {
      camera.position.set(Math.sin(azimuth) * Math.cos(elevation) * distance, 1.1 + Math.sin(elevation) * distance, Math.cos(azimuth) * Math.cos(elevation) * distance)
      camera.lookAt(0, .5, 0)
    }
    updateCamera()

    const grid = new THREE.GridHelper(10, 20, 0x315471, 0x183047)
    grid.position.y = -2.55; grid.material.transparent = true; grid.material.opacity = .42
    scene.add(grid)
    const emitter = new THREE.Mesh(
      new THREE.CylinderGeometry(.58, .72, .16, 64),
      new THREE.MeshBasicMaterial({ color: 0x263b4e, transparent: true, opacity: .88 }),
    )
    emitter.position.y = -2.47; scene.add(emitter)
    const emitterRing = new THREE.Mesh(
      new THREE.TorusGeometry(.49, .025, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x73d9ff, transparent: true }),
    )
    emitterRing.rotation.x = Math.PI / 2; emitterRing.position.y = -2.36; scene.add(emitterRing)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const life = new Float32Array(PARTICLE_COUNT)
    const heat = new Float32Array(PARTICLE_COUNT)
    const phase = new Float32Array(PARTICLE_COUNT)

    const resetParticle = (i, initial = false) => {
      const radius = Math.sqrt(Math.random()) * .47
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(theta) * radius
      positions[i * 3 + 1] = -2.31 + (initial ? Math.random() * 5.8 : Math.random() * .12)
      positions[i * 3 + 2] = Math.sin(theta) * radius
      velocities[i * 3] = (Math.random() - .5) * .08
      velocities[i * 3 + 1] = .18 + Math.random() * .16
      velocities[i * 3 + 2] = (Math.random() - .5) * .08
      life[i] = initial ? Math.random() * 5.2 : 0
      heat[i] = initial ? Math.max(.1, 1 - (positions[i * 3 + 1] + 2.3) / 7) : .9 + Math.random() * .1
      phase[i] = Math.random() * Math.PI * 2
      writeColor(colors, i, heat[i])
    }
    for (let i = 0; i < PARTICLE_COUNT; i += 1) resetParticle(i, true)

    const geometry = new THREE.BufferGeometry()
    const positionAttribute = new THREE.BufferAttribute(positions, 3)
    const colorAttribute = new THREE.BufferAttribute(colors, 3)
    geometry.setAttribute('position', positionAttribute)
    geometry.setAttribute('color', colorAttribute)
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { pointScale: { value: 68 * Math.min(window.devicePixelRatio || 1, 2) } },
      vertexShader: `
        uniform float pointScale;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(pointScale / max(1.0, -mvPosition.z), 1.2, 13.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.04, d) * 0.72;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    })
    const plume = new THREE.Points(geometry, material)
    scene.add(plume)

    const resize = () => {
      const rect = host.getBoundingClientRect()
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false)
      camera.aspect = rect.width / Math.max(1, rect.height); camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize); observer.observe(host); resize()

    const pointer = { down: false, x: 0, y: 0 }
    const onPointerDown = (event) => { pointer.down = true; pointer.x = event.clientX; pointer.y = event.clientY; renderer.domElement.setPointerCapture(event.pointerId) }
    const onPointerMove = (event) => {
      if (!pointer.down) return
      azimuth -= (event.clientX - pointer.x) * .006
      elevation = Math.max(-.28, Math.min(.62, elevation + (event.clientY - pointer.y) * .004))
      pointer.x = event.clientX; pointer.y = event.clientY; updateCamera()
    }
    const onPointerUp = () => { pointer.down = false }
    const onWheel = (event) => { event.preventDefault(); distance = Math.max(7.5, Math.min(17, distance + event.deltaY * .008)); updateCamera() }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('pointercancel', onPointerUp)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    let frame = 0; let last = performance.now(); let metricClock = 0
    const animate = (now) => {
      frame = requestAnimationFrame(animate)
      const dt = Math.min((now - last) / 1000, .032); last = now
      const current = paramsRef.current
      if (runningRef.current) {
        const turbulence = Number(current.turbulence)
        const buoyancy = Number(current.buoyancy)
        const wind = Number(current.wind)
        const heatScale = Math.pow(Math.max(30, Number(current.heat)) / 500, .23)
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const ix = i * 3; const y = positions[ix + 1]
          const curlX = Math.sin(y * 1.7 + phase[i] + now * .0011) + .55 * Math.sin(positions[ix + 2] * 2.4 - now * .0017)
          const curlZ = Math.cos(y * 1.45 - phase[i] + now * .0013) + .5 * Math.sin(positions[ix] * 2.1 + now * .0015)
          velocities[ix] += (wind * .34 + curlX * turbulence * .17 * heat[i]) * dt
          velocities[ix + 1] += (buoyancy * heat[i] * .78 + .05) * heatScale * dt
          velocities[ix + 2] += curlZ * turbulence * .17 * heat[i] * dt
          const drag = Math.pow(.48, dt)
          velocities[ix] *= drag; velocities[ix + 1] *= Math.pow(.72, dt); velocities[ix + 2] *= drag
          positions[ix] += velocities[ix] * dt; positions[ix + 1] += velocities[ix + 1] * dt; positions[ix + 2] += velocities[ix + 2] * dt
          life[i] += dt; heat[i] *= Math.pow(.75 - Math.min(.14, wind * .025), dt)
          const spread = Math.hypot(positions[ix], positions[ix + 2])
          if (positions[ix + 1] > 5.1 || life[i] > 8.5 || heat[i] < .055 || spread > 4.2) resetParticle(i)
          else writeColor(colors, i, heat[i])
        }
        positionAttribute.needsUpdate = true; colorAttribute.needsUpdate = true
      }
      emitterRing.material.opacity = .65 + Math.sin(now * .004) * .25
      renderer.render(scene, camera)
      metricClock += dt
      if (metricClock > .35) { onMetrics(calculateMetrics(current)); metricClock = 0 }
    }
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame); observer.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      renderer.domElement.removeEventListener('pointercancel', onPointerUp)
      renderer.domElement.removeEventListener('wheel', onWheel)
      geometry.dispose(); material.dispose(); emitter.geometry.dispose(); emitter.material.dispose(); emitterRing.geometry.dispose(); emitterRing.material.dispose()
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [onMetrics, resetKey])

  return <div className="thermal-plume-host" ref={hostRef}>{error && <div className="webgl-error">{error}</div>}</div>
}
