import { useEffect, useRef } from 'react'

const COLORS = {
  speed: ['#55d6ff', '#87f7d4', '#f8de7e'],
  pressure: ['#43a6ff', '#eef2f7', '#ff6b58'],
  vorticity: ['#a873ff', '#eff4f7', '#ffb347'],
}

function mixColor(a, b, t) {
  const parse = (hex) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))
  const ca = parse(a); const cb = parse(b)
  const rgb = ca.map((value, i) => Math.round(value + (cb[i] - value) * t))
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

function paletteColor(type, value) {
  const palette = COLORS[type] || COLORS.speed
  const v = Math.max(0, Math.min(1, value))
  return v < .5 ? mixColor(palette[0], palette[1], v * 2) : mixColor(palette[1], palette[2], (v - .5) * 2)
}

// 生成标准 NACA 四位数翼型轮廓，用于绘制与碰撞判定。
function nacaGeometry(code, chord, count = 70) {
  const safeCode = /^\d{4}$/.test(code) ? code : '2412'
  const m = Number(safeCode[0]) / 100
  const p = Math.max(.01, Number(safeCode[1]) / 10)
  const t = Number(safeCode.slice(2)) / 100
  const upper = []; const lower = []
  for (let i = 0; i <= count; i += 1) {
    const beta = Math.PI * i / count
    const x = (1 - Math.cos(beta)) / 2
    const yt = 5 * t * (.2969 * Math.sqrt(x) - .126 * x - .3516 * x ** 2 + .2843 * x ** 3 - .1015 * x ** 4)
    let yc = 0; let dy = 0
    if (m > 0 && x < p) {
      yc = m / p ** 2 * (2 * p * x - x ** 2)
      dy = 2 * m / p ** 2 * (p - x)
    } else if (m > 0) {
      yc = m / (1 - p) ** 2 * ((1 - 2 * p) + 2 * p * x - x ** 2)
      dy = 2 * m / (1 - p) ** 2 * (p - x)
    }
    const theta = Math.atan(dy)
    upper.push([(x - .5) * chord - yt * Math.sin(theta) * chord, -(yc + yt * Math.cos(theta)) * chord])
    lower.push([(x - .5) * chord + yt * Math.sin(theta) * chord, -(yc - yt * Math.cos(theta)) * chord])
  }
  return [...upper, ...lower.reverse()]
}

function calculateMetrics(params) {
  const alpha = Number(params.angle) * Math.PI / 180
  const camber = Number(params.airfoil?.[0] || 0) / 100
  const effectiveAlpha = alpha + camber * 1.65
  // 平滑限幅模拟失速趋势，避免薄翼理论在大攻角下无限增长。
  const clLinear = 2 * Math.PI * effectiveAlpha
  const cl = 1.62 * Math.tanh(clLinear / 1.62)
  const cd = .0105 + .019 * cl ** 2 + .0008 * Math.abs(Number(params.angle))
  const q = .5 * Number(params.density) * Number(params.speed) ** 2
  const lift = q * Number(params.chord) * cl
  const reynolds = Number(params.density) * Number(params.speed) * Number(params.chord) / 1.81e-5
  return { cl, cd, lift, reynolds, ratio: cl / Math.max(cd, .001) }
}

function drawAirfoil(ctx, size, params) {
  const { width, height } = size
  const cx = width * .44; const cy = height * .52
  const chord = Math.min(width * .37, 390)
  const angle = -Number(params.angle) * Math.PI / 180
  const points = nacaGeometry(params.airfoil, chord)

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angle)
  ctx.beginPath()
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))
  ctx.closePath()
  const fill = ctx.createLinearGradient(0, -chord * .1, 0, chord * .1)
  fill.addColorStop(0, '#f8fbff'); fill.addColorStop(.48, '#9fb0c3'); fill.addColorStop(.52, '#4d5e70'); fill.addColorStop(1, '#dce6ef')
  ctx.fillStyle = fill; ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.2; ctx.stroke()
  ctx.restore()
}

function drawGrid(ctx, size) {
  ctx.save()
  ctx.strokeStyle = 'rgba(135,170,200,.075)'; ctx.lineWidth = 1
  for (let x = 0; x <= size.width; x += 55) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size.height); ctx.stroke() }
  for (let y = 0; y <= size.height; y += 55) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size.width, y); ctx.stroke() }
  ctx.restore()
}

export default function WindTunnelCanvas({ params, running, view, resetKey, onMetrics }) {
  const canvasRef = useRef(null)
  const paramsRef = useRef(params)
  const runningRef = useRef(running)
  const viewRef = useRef(view)
  const sizeRef = useRef({ width: 900, height: 600, dpr: 1 })
  const particlesRef = useRef([])
  const vorticesRef = useRef([])
  const pointerRef = useRef({ down: false, lastX: 0, lastY: 0 })
  const frameRef = useRef(0)

  useEffect(() => { paramsRef.current = params }, [params])
  useEffect(() => { runningRef.current = running }, [running])
  useEffect(() => { viewRef.current = view }, [view])

  useEffect(() => {
    particlesRef.current = []
    vorticesRef.current = []
  }, [resetKey, params.airfoil])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { width: rect.width, height: rect.height, dpr }
      particlesRef.current = []
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas); resize()

    let last = performance.now(); let metricClock = 0
    const seedParticle = (randomX = true) => {
      const { width, height } = sizeRef.current
      return { x: randomX ? Math.random() * width : -6, y: 14 + Math.random() * Math.max(1, height - 28), px: 0, py: 0, age: Math.random() * 6 }
    }

    const velocityAt = (x, y, now) => {
      const current = paramsRef.current
      const { width, height } = sizeRef.current
      const cx = width * .44; const cy = height * .52
      const chord = Math.min(width * .37, 390)
      const radius = chord * .22
      const alpha = Number(current.angle) * Math.PI / 180
      const cos = Math.cos(alpha); const sin = Math.sin(alpha)
      const dx = x - cx; const dy = y - cy
      const lx = dx * cos - dy * sin; const ly = dx * sin + dy * cos
      const r2 = Math.max(lx * lx + ly * ly, radius ** 2 * .76)
      const r4 = r2 * r2
      const base = 62 + Number(current.speed) * 2.15
      const gamma = -2 * Math.PI * base * radius * Math.sin(alpha + Number(current.airfoil?.[0] || 0) / 38)
      let u = base * (1 - radius ** 2 * (lx * lx - ly * ly) / r4) + gamma * ly / (2 * Math.PI * r2)
      let v = -2 * base * radius ** 2 * lx * ly / r4 - gamma * lx / (2 * Math.PI * r2)
      // 将翼型局部坐标速度旋回屏幕坐标。
      let vx = u * cos + v * sin; let vy = -u * sin + v * cos
      const turbulence = Number(current.turbulence)
      vx += Math.sin(y * .035 + now * .0014) * turbulence * 8
      vy += Math.sin(x * .028 - now * .0017) * turbulence * 7
      vorticesRef.current.forEach((vortex) => {
        const ox = x - vortex.x; const oy = y - vortex.y
        const rr = Math.max(ox * ox + oy * oy, 180)
        const gain = vortex.strength * vortex.life / rr
        vx += -oy * gain; vy += ox * gain
      })
      const speed = Math.hypot(vx, vy)
      return { vx, vy, speed, localX: lx, localY: ly, radius, inside: (lx / (chord * .49)) ** 2 + (ly / (chord * .095)) ** 2 < 1 }
    }

    const animate = (now) => {
      frameRef.current = requestAnimationFrame(animate)
      const dt = Math.min((now - last) / 1000, .035); last = now
      const { width, height } = sizeRef.current
      if (!width || !height) return
      ctx.fillStyle = particlesRef.current.length ? 'rgba(6,14,25,.16)' : '#060e19'
      ctx.fillRect(0, 0, width, height); drawGrid(ctx, { width, height })

      const targetCount = Math.max(480, Math.min(1250, Math.round(width * height / 520)))
      while (particlesRef.current.length < targetCount) particlesRef.current.push(seedParticle(true))
      if (runningRef.current) {
        vorticesRef.current.forEach((v) => { v.life *= Math.pow(.23, dt) })
        vorticesRef.current = vorticesRef.current.filter((v) => v.life > .04)
        particlesRef.current.forEach((particle) => {
          particle.px = particle.x; particle.py = particle.y
          const flow = velocityAt(particle.x, particle.y, now)
          particle.x += flow.vx * dt; particle.y += flow.vy * dt; particle.age += dt
          if (flow.inside || particle.x > width + 10 || particle.x < -20 || particle.y < -12 || particle.y > height + 12 || particle.age > 11) {
            Object.assign(particle, seedParticle(false)); particle.px = particle.x; particle.py = particle.y; particle.age = 0
          }
          const normalizedSpeed = Math.max(0, Math.min(1, (flow.speed / (Number(paramsRef.current.speed) * 3 + 70) - .25) / .95))
          let scalar = normalizedSpeed
          if (viewRef.current === 'pressure') scalar = Math.max(0, Math.min(1, .5 + (1 - (flow.speed / (Number(paramsRef.current.speed) * 2.2 + 60)) ** 2) * .27))
          if (viewRef.current === 'vorticity') scalar = Math.max(0, Math.min(1, .5 + flow.vy / 90))
          ctx.strokeStyle = paletteColor(viewRef.current, scalar)
          ctx.globalAlpha = .3 + normalizedSpeed * .55
          ctx.lineWidth = .65 + normalizedSpeed * 1.05
          ctx.beginPath(); ctx.moveTo(particle.px, particle.py); ctx.lineTo(particle.x, particle.y); ctx.stroke()
        })
      }
      ctx.globalAlpha = 1
      drawAirfoil(ctx, { width, height }, paramsRef.current)
      ctx.fillStyle = 'rgba(210,225,238,.75)'; ctx.font = '10px IBM Plex Mono, monospace'
      ctx.fillText('INLET', 16, 25); ctx.fillText('OUTLET', width - 57, 25)
      metricClock += dt
      if (metricClock > .35) { onMetrics(calculateMetrics(paramsRef.current)); metricClock = 0 }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frameRef.current); observer.disconnect() }
  }, [onMetrics])

  const addVortex = (event) => {
    const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left; const y = event.clientY - rect.top
    const pointer = pointerRef.current
    const travel = Math.hypot(x - pointer.lastX, y - pointer.lastY)
    vorticesRef.current.push({ x, y, strength: Math.max(48, Math.min(180, travel * 14)), life: 1 })
    if (vorticesRef.current.length > 12) vorticesRef.current.shift()
    pointer.lastX = x; pointer.lastY = y
  }

  return <canvas
    ref={canvasRef}
    className="wind-tunnel-canvas"
    aria-label="交互式 NACA 翼型流场粒子可视化"
    onPointerDown={(event) => { pointerRef.current.down = true; pointerRef.current.lastX = event.nativeEvent.offsetX; pointerRef.current.lastY = event.nativeEvent.offsetY; event.currentTarget.setPointerCapture(event.pointerId); addVortex(event) }}
    onPointerMove={(event) => { if (pointerRef.current.down) addVortex(event) }}
    onPointerUp={() => { pointerRef.current.down = false }}
    onPointerCancel={() => { pointerRef.current.down = false }}
  />
}
