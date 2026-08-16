import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// 聚变反应堆与多物理场高保真可交互三维渲染引擎
export default function UnifiedField3D({ result, running = true }) {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const frameRef = useRef(null)
  
  // 图层可见性状态
  const [layers, setLayers] = useState({
    coils: true,
    vessel: true,
    flux: true,
    particles: true,
    streamlines: true
  })

  const toggleLayer = (key) => setLayers(prev => ({ ...prev, [key]: !prev[key] }))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x040b14, 1)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.fog = new THREE.FogExp2(0x040b14, 0.04)

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(5.5, 4.2, 6.5)
    cameraRef.current = camera

    // 光照系统
    const ambLight = new THREE.AmbientLight(0xd6e8ff, 1.6)
    scene.add(ambLight)
    const dirLight1 = new THREE.DirectionalLight(0x70d6ff, 2.5)
    dirLight1.position.set(10, 15, 10)
    scene.add(dirLight1)
    const dirLight2 = new THREE.DirectionalLight(0xffa870, 1.8)
    dirLight2.position.set(-10, -5, -8)
    scene.add(dirLight2)

    // 坐标网格底盘
    const grid = new THREE.GridHelper(12, 24, 0x1d364a, 0x0c1e2d)
    grid.position.y = -2.2
    scene.add(grid)

    // 交互拖拽与旋转
    let isDragging = false, prevMouse = { x: 0, y: 0 }
    let rotX = 0.35, rotY = -0.55, targetZoom = 8.5, currentZoom = 8.5

    const onDown = e => {
      isDragging = true
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    const onMove = e => {
      if (!isDragging) return
      const dx = e.clientX - prevMouse.x
      const dy = e.clientY - prevMouse.y
      rotY += dx * 0.007
      rotX = Math.max(-1.4, Math.min(1.4, rotX + dy * 0.007))
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => { isDragging = false }
    const onWheel = e => {
      e.preventDefault()
      targetZoom = Math.max(3.0, Math.min(18.0, targetZoom + e.deltaY * 0.008))
    }

    const dom = renderer.domElement
    dom.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    dom.addEventListener('wheel', onWheel, { passive: false })

    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth, h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / Math.max(1, h)
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(container)

    // 主装配组
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    let t = 0
    let particlePoints = null
    let particlePositions = null

    // 构建各物理场 3D 几何模型
    const modelType = result ? result.model : 'plasma'

    // ==========================================
    // 1. 托卡马克反应堆 (Tokamak 3D)
    // ==========================================
    if (modelType === 'plasma') {
      const R0 = 2.4, a = 0.9, k = 1.75
      const coilsGroup = new THREE.Group(); coilsGroup.name = 'coils'
      const vesselGroup = new THREE.Group(); vesselGroup.name = 'vessel'
      const fluxGroup = new THREE.Group(); fluxGroup.name = 'flux'

      // 16 个 D 型环向场 (TF) 超导线圈
      const tfCount = 16
      for (let i = 0; i < tfCount; i++) {
        const angle = (i / tfCount) * Math.PI * 2
        const pts = []
        const tfH = a * k * 1.5, tfW = a * 1.55
        for (let j = 0; j <= 64; j++) {
          const u = (j / 64) * Math.PI * 2
          const x = (R0 + tfW * Math.cos(u) + 0.25 * Math.sin(u) * Math.sin(u))
          const y = tfH * Math.sin(u)
          pts.push(new THREE.Vector3(x, y, 0))
        }
        const curve = new THREE.CatmullRomCurve3(pts, true)
        const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.085, 8, true)
        const tfMat = new THREE.MeshStandardMaterial({
          color: 0x48a0f8,
          metalness: 0.85,
          roughness: 0.25,
          wireframe: false
        })
        const coilMesh = new THREE.Mesh(tubeGeom, tfMat)
        coilMesh.rotation.y = angle
        coilsGroup.add(coilMesh)
      }

      // 极向场 (PF) 线圈群
      const pfConfigs = [
        { r: R0 + 1.8, y: a * k * 1.3, rad: 0.11 },
        { r: R0 + 2.1, y: 0.2, rad: 0.12 },
        { r: R0 + 1.8, y: -a * k * 1.3, rad: 0.11 },
        { r: R0 - 1.6, y: a * k * 1.4, rad: 0.09 },
        { r: R0 - 1.6, y: -a * k * 1.4, rad: 0.09 }
      ]
      pfConfigs.forEach(pf => {
        const ringGeom = new THREE.TorusGeometry(pf.r, pf.rad, 16, 64)
        const pfMat = new THREE.MeshStandardMaterial({ color: 0x2ed1a8, metalness: 0.9, roughness: 0.2 })
        const ring = new THREE.Mesh(ringGeom, pfMat)
        ring.rotation.x = Math.PI / 2
        ring.position.y = pf.y
        coilsGroup.add(ring)
      })

      // 中心螺线管 (CS)
      const csGeom = new THREE.CylinderGeometry(0.55, 0.55, a * k * 2.8, 32, 1, true)
      const csMat = new THREE.MeshStandardMaterial({ color: 0x6e88a0, metalness: 0.8, roughness: 0.3, side: THREE.DoubleSide })
      const cs = new THREE.Mesh(csGeom, csMat)
      coilsGroup.add(cs)

      // 真空室外壳 (透明金属质感)
      const vesselGeom = new THREE.TorusGeometry(R0, a * 1.25, 32, 80)
      const vesselMat = new THREE.MeshPhysicalMaterial({
        color: 0x183048,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.5,
        transmission: 0.6,
        ior: 1.2,
        side: THREE.DoubleSide
      })
      const vessel = new THREE.Mesh(vesselGeom, vesselMat)
      vessel.rotation.x = Math.PI / 2
      vessel.scale.set(1, 1, k * 1.05)
      vesselGroup.add(vessel)

      // 嵌套磁通量面 (Nested Flux Surfaces)
      ;[0.35, 0.65, 0.95].forEach((rho, idx) => {
        const fluxGeom = new THREE.TorusGeometry(R0, a * rho, 32, 64)
        const fluxMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0xffea85 : idx === 1 ? 0x55dcff : 0xa665ff,
          wireframe: true,
          transparent: true,
          opacity: 0.28
        })
        const fMesh = new THREE.Mesh(fluxGeom, fluxMat)
        fMesh.rotation.x = Math.PI / 2
        fMesh.scale.set(1, 1, k)
        fluxGroup.add(fMesh)
      })

      // 下偏滤器靶板 (Divertor Cassettes)
      const divGeom = new THREE.TorusGeometry(R0 - 0.2, 0.25, 16, 64)
      const divMat = new THREE.MeshStandardMaterial({ color: 0xd88a38, metalness: 0.7, roughness: 0.4 })
      const div = new THREE.Mesh(divGeom, divMat)
      div.rotation.x = Math.PI / 2
      div.position.y = -a * k * 0.95
      vesselGroup.add(div)

      modelGroup.add(coilsGroup)
      modelGroup.add(vesselGroup)
      modelGroup.add(fluxGroup)
    }

    // ==========================================
    // 2. 场反向位形 (FRC 3D)
    // ==========================================
    else if (modelType === 'frc') {
      const coilsGroup = new THREE.Group(); coilsGroup.name = 'coils'
      const vesselGroup = new THREE.Group(); vesselGroup.name = 'vessel'
      const fluxGroup = new THREE.Group(); fluxGroup.name = 'flux'

      // 直筒真空室
      const cylGeom = new THREE.CylinderGeometry(1.2, 1.2, 5.5, 32, 1, true)
      const cylMat = new THREE.MeshPhysicalMaterial({
        color: 0x142b40,
        transparent: true,
        opacity: 0.28,
        metalness: 0.6,
        side: THREE.DoubleSide
      })
      const vessel = new THREE.Mesh(cylGeom, cylMat)
      vessel.rotation.z = Math.PI / 2
      vesselGroup.add(vessel)

      // 脉冲形成与镜像超导线圈群
      const coilZ = [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4]
      coilZ.forEach((zPos, idx) => {
        const isMirror = Math.abs(zPos) > 2.0
        const rCoil = isMirror ? 1.5 : 1.35
        const torusGeom = new THREE.TorusGeometry(rCoil, isMirror ? 0.12 : 0.08, 16, 48)
        const cMat = new THREE.MeshStandardMaterial({
          color: isMirror ? 0xff7c43 : 0x3bb2f0,
          metalness: 0.85
        })
        const ring = new THREE.Mesh(torusGeom, cMat)
        ring.rotation.y = Math.PI / 2
        ring.position.x = zPos
        coilsGroup.add(ring)
      })

      // 中性束注入管 (NBI Ports)
      ;[-1, 1].forEach(side => {
        const nbiGeom = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 16)
        const nbiMat = new THREE.MeshStandardMaterial({ color: 0x768fa5, metalness: 0.8 })
        const nbi = new THREE.Mesh(nbiGeom, nbiMat)
        nbi.position.set(side * 0.6, 0.9, 0.8)
        nbi.rotation.set(0.4, side * 0.5, 0.8)
        vesselGroup.add(nbi)
      })

      // 闭合磁通量分界面 (Separatrix Spheroid)
      const sepGeom = new THREE.SphereGeometry(0.75, 32, 24)
      sepGeom.scale(3.2, 0.9, 0.9)
      const sepMat = new THREE.MeshBasicMaterial({ color: 0x48e5c2, wireframe: true, transparent: true, opacity: 0.35 })
      const separatrix = new THREE.Mesh(sepGeom, sepMat)
      fluxGroup.add(separatrix)

      modelGroup.add(coilsGroup)
      modelGroup.add(vesselGroup)
      modelGroup.add(fluxGroup)
    }

    // ==========================================
    // 3. 仿星器 (Stellarator 3D · W7-X Style)
    // ==========================================
    else if (modelType === 'stellarator') {
      const coilsGroup = new THREE.Group(); coilsGroup.name = 'coils'
      const vesselGroup = new THREE.Group(); vesselGroup.name = 'vessel'
      const fluxGroup = new THREE.Group(); fluxGroup.name = 'flux'

      const R0 = 2.5, a = 0.55, Np = 5
      const totalCoils = 25

      // 25 个空间扭曲非平面超导线圈
      for (let i = 0; i < totalCoils; i++) {
        const phi0 = (i / totalCoils) * Math.PI * 2
        const pts = []
        for (let j = 0; j <= 64; j++) {
          const theta = (j / 64) * Math.PI * 2
          const rTwist = a * (1.2 + 0.3 * Math.cos(Np * phi0))
          const zTwist = a * (1.2 + 0.3 * Math.sin(Np * phi0))
          const localX = rTwist * Math.cos(theta)
          const localY = zTwist * Math.sin(theta)
          const R = R0 + localX + 0.15 * Math.sin(Np * phi0)
          const x = R * Math.cos(phi0 + 0.08 * Math.sin(theta))
          const z = R * Math.sin(phi0 + 0.08 * Math.sin(theta))
          const y = localY + 0.25 * Math.sin(Np * phi0)
          pts.push(new THREE.Vector3(x, y, z))
        }
        const curve = new THREE.CatmullRomCurve3(pts, true)
        const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.065, 8, true)
        const coilMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x22c1c3 : 0xfdbb2d,
          metalness: 0.9,
          roughness: 0.2
        })
        const coilMesh = new THREE.Mesh(tubeGeom, coilMat)
        coilsGroup.add(coilMesh)
      }

      // 扭曲磁通量曲面 (Helical Flux Surface)
      const fluxPts = []
      for (let u = 0; u <= 80; u++) {
        const phi = (u / 80) * Math.PI * 2
        const R = R0 + 0.12 * Math.cos(Np * phi)
        const x = R * Math.cos(phi)
        const z = R * Math.sin(phi)
        const y = 0.2 * Math.sin(Np * phi)
        fluxPts.push(new THREE.Vector3(x, y, z))
      }
      const fluxCurve = new THREE.CatmullRomCurve3(fluxPts, true)
      const fluxTube = new THREE.TubeGeometry(fluxCurve, 80, a * 0.7, 16, true)
      const fluxMat = new THREE.MeshBasicMaterial({ color: 0x9d4edd, wireframe: true, transparent: true, opacity: 0.32 })
      const fluxMesh = new THREE.Mesh(fluxTube, fluxMat)
      fluxGroup.add(fluxMesh)

      modelGroup.add(coilsGroup)
      modelGroup.add(vesselGroup)
      modelGroup.add(fluxGroup)
    }

    // ==========================================
    // 4. 电磁场多匝线圈 (EM 3D)
    // ==========================================
    else if (modelType === 'em') {
      const coilsGroup = new THREE.Group(); coilsGroup.name = 'coils'
      const N = Math.min(16, result.dimensions[2]?.[1] || 12)
      const rad = 1.4, len = 2.4
      for (let i = 0; i < N; i++) {
        const z = -len / 2 + (i / Math.max(1, N - 1)) * len
        const torusGeom = new THREE.TorusGeometry(rad, 0.06, 16, 48)
        const cMat = new THREE.MeshStandardMaterial({ color: 0x4cc9f0, metalness: 0.85 })
        const ring = new THREE.Mesh(torusGeom, cMat)
        ring.position.z = z
        coilsGroup.add(ring)
      }
      modelGroup.add(coilsGroup)
    }

    // ==========================================
    // 5. 气体与液体流动 (Gas & Liquid 3D)
    // ==========================================
    else if (modelType === 'gas' || modelType === 'pipe') {
      const vesselGroup = new THREE.Group(); vesselGroup.name = 'vessel'
      if (modelType === 'gas') {
        const bodyGeom = new THREE.CylinderGeometry(0.7, 0.7, 3.0, 32)
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5a738e, metalness: 0.8, roughness: 0.3 })
        const body = new THREE.Mesh(bodyGeom, bodyMat)
        vesselGroup.add(body)
      } else {
        const pipeGeom = new THREE.CylinderGeometry(0.95, 0.95, 5.0, 32, 1, true)
        const pipeMat = new THREE.MeshPhysicalMaterial({ color: 0x224466, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
        const pipe = new THREE.Mesh(pipeGeom, pipeMat)
        pipe.rotation.z = Math.PI / 2
        vesselGroup.add(pipe)
      }
      modelGroup.add(vesselGroup)
    }

    // ==========================================
    // 6. 热传输与海洋扩散 (Heat & Transport 3D)
    // ==========================================
    else {
      const vesselGroup = new THREE.Group(); vesselGroup.name = 'vessel'
      const boxGeom = new THREE.BoxGeometry(3.2, 2.0, 1.4)
      const boxMat = new THREE.MeshBasicMaterial({ color: 0x3d5a80, wireframe: true, transparent: true, opacity: 0.25 })
      const box = new THREE.Mesh(boxGeom, boxMat)
      vesselGroup.add(box)
      modelGroup.add(vesselGroup)
    }

    // ==========================================
    // 7. 物理场示踪粒子群与流线 (Field Particles)
    // ==========================================
    if (result && result.particles && result.particles.length > 0) {
      const pCount = result.particles.length
      const geom = new THREE.BufferGeometry()
      const posArray = new Float32Array(pCount * 3)
      const colArray = new Float32Array(pCount * 3)
      const velocities = []

      // 颜色映射谱
      const color1 = new THREE.Color(0x3a86ff)
      const color2 = new THREE.Color(0x06d6a0)
      const color3 = new THREE.Color(0xffd166)
      const color4 = new THREE.Color(0xef476f)

      result.particles.forEach((p, idx) => {
        posArray[idx * 3] = p.x
        posArray[idx * 3 + 1] = p.y
        posArray[idx * 3 + 2] = p.z
        velocities.push({ vx: p.vx || 0, vy: p.vy || 0, vz: p.vz || 0 })

        const valNorm = Math.min(1, Math.max(0, (p.value - (result.x?.[0] || 0)) / (result.stats?.[0]?.[1] || 10)))
        const c = new THREE.Color().lerpColors(color1, valNorm < 0.5 ? color2 : color4, valNorm)
        colArray[idx * 3] = c.r
        colArray[idx * 3 + 1] = c.g
        colArray[idx * 3 + 2] = c.b
      })

      geom.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
      geom.setAttribute('color', new THREE.BufferAttribute(colArray, 3))

      const pMat = new THREE.PointsMaterial({
        size: 0.052,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
      })

      particlePoints = new THREE.Points(geom, pMat)
      particlePoints.name = 'particles'
      modelGroup.add(particlePoints)
      particlePositions = posArray
    }

    // 动画循环
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      t += 0.015

      // 相机阻尼插值
      currentZoom += (targetZoom - currentZoom) * 0.08
      camera.position.x = currentZoom * Math.sin(rotY) * Math.cos(rotX)
      camera.position.y = currentZoom * Math.sin(rotX)
      camera.position.z = currentZoom * Math.cos(rotY) * Math.cos(rotX)
      camera.lookAt(0, 0, 0)

      // 粒子动态流动
      if (particlePoints && running) {
        const pos = particlePoints.geometry.attributes.position.array
        const count = pos.length / 3
        for (let i = 0; i < count; i++) {
          if (modelType === 'plasma' || modelType === 'stellarator') {
            const x = pos[i * 3], z = pos[i * 3 + 1], y = pos[i * 3 + 2]
            const angle = 0.012
            pos[i * 3] = x * Math.cos(angle) - z * Math.sin(angle)
            pos[i * 3 + 1] = x * Math.sin(angle) + z * Math.cos(angle)
          } else if (modelType === 'frc') {
            const x = pos[i * 3], y = pos[i * 3 + 1]
            const angle = 0.02
            pos[i * 3] = x * Math.cos(angle) - y * Math.sin(angle)
            pos[i * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle)
          } else if (modelType === 'gas' || modelType === 'pipe') {
            pos[i * 3] += 0.025
            if (pos[i * 3] > 3.0) pos[i * 3] = -3.0
          }
        }
        particlePoints.geometry.attributes.position.needsUpdate = true
      }

      // 控制图层可见性
      modelGroup.traverse(child => {
        if (child.name === 'coils') child.visible = layers.coils
        if (child.name === 'vessel') child.visible = layers.vessel
        if (child.name === 'flux') child.visible = layers.flux
        if (child.name === 'particles') child.visible = layers.particles
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      resizeObserver.disconnect()
      dom.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      dom.removeEventListener('wheel', onWheel)
      renderer.dispose()
      container.innerHTML = ''
    }
  }, [result, running, layers])

  return (
    <div className="unified-3d-wrapper" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '520px' }} />
      
      {/* 3D 图层控制悬浮面板 */}
      <div className="hud-layer-controls">
        <span>3D VIEW LAYERS</span>
        <div className="hud-layer-buttons">
          <button className={layers.coils ? 'active' : ''} onClick={() => toggleLayer('coils')}>超导线圈</button>
          <button className={layers.vessel ? 'active' : ''} onClick={() => toggleLayer('vessel')}>真空室/腔体</button>
          <button className={layers.flux ? 'active' : ''} onClick={() => toggleLayer('flux')}>约束磁面</button>
          <button className={layers.particles ? 'active' : ''} onClick={() => toggleLayer('particles')}>示踪粒子</button>
        </div>
      </div>

      {/* 交互提示 */}
      <div className="hud-camera-hint">
        <span>鼠标按住旋转 · 滚轮缩放 · 实时物理粒子流场</span>
      </div>
    </div>
  )
}
