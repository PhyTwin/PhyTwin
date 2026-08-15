import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Atom, Boxes, Cpu, Flame, Layers, Maximize2, Orbit, Play, Pause, Radio, RefreshCw, Rotate3D, ShieldAlert, Sparkles, Waves, Zap } from 'lucide-react'
import * as THREE from 'three'

const MODES = [
  {
    id: 'scalar',
    name: '标量基态胶球 0⁺⁺',
    latin: 'Scalar Glueball · Ground State',
    mass: '≈ 1.5–1.7 GeV/c²',
    spin: 'Jᴾᶜ = 0⁺⁺',
    desc: '纯杨-米尔斯规范场在红外强耦合区自禁闭形成的基态闭合色通量环。两个非阿贝尔胶子色场通过自吸引形成球对称致密驻波。',
    color1: 0xff3b30,
    color2: 0x34c759,
    color3: 0x007aff,
    knotP: 2,
    knotQ: 3,
    scale: 1.1,
    tension: '1.02 GeV/fm'
  },
  {
    id: 'tensor',
    name: '张量激发态 2⁺⁺',
    latin: 'Tensor Glueball · Excited State',
    mass: '≈ 2.2–2.4 GeV/c²',
    spin: 'Jᴾᶜ = 2⁺⁺',
    desc: '具有轨道角动量的激发态胶球，色通量管呈椭圆四极形自振荡，是北京正负电子对撞机（BESIII）与 LHCb 重点搜寻的高阶奇特态。',
    color1: 0xff9500,
    color2: 0xaf52de,
    color3: 0x5856d6,
    knotP: 3,
    knotQ: 4,
    scale: 1.35,
    tension: '1.25 GeV/fm'
  },
  {
    id: 'pseudoscalar',
    name: '赝标量拓扑结 0⁻⁺',
    latin: 'Pseudoscalar · Oddball / Trefoil',
    mass: '≈ 2.5–2.6 GeV/c²',
    spin: 'Jᴾᶜ = 0⁻⁺',
    desc: '带有非平凡第二陈数（Chern Number）拓扑荷的色通量纽结，具有空间手征奇偶性反演特征，与轴子（Axion）反常耦合机制密切相关。',
    color1: 0xff2d55,
    color2: 0x5ac8fa,
    color3: 0xffcc00,
    knotP: 2,
    knotQ: 5,
    scale: 1.2,
    tension: '1.40 GeV/fm'
  },
  {
    id: 'qgp',
    name: '高温解禁闭等离子体 (QGP)',
    latin: 'Quark-Gluon Plasma Deconfinement',
    mass: '渐近自由连续谱',
    spin: 'Free Gluons',
    desc: '在极高能密度（T > 170 MeV）下，色通量管断裂融化，色荷进入渐近自由态，胶子在介质中形成自由弱耦合弱阻尼流体。',
    color1: 0xff3b30,
    color2: 0xff9500,
    color3: 0x00c7be,
    knotP: 1,
    knotQ: 1,
    scale: 1.9,
    tension: '0.08 GeV/fm'
  }
]

function GlueballCanvas({ mode, alphaS, autoRotate, speed }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x01030a, 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x01030a, 0.025)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
    camera.position.set(0, 0, 5.2)

    // 灯光
    scene.add(new THREE.AmbientLight(0x7695d6, 1.6))
    const pLight1 = new THREE.PointLight(0xff453a, 4, 10)
    pLight1.position.set(2, 3, 2)
    scene.add(pLight1)
    const pLight2 = new THREE.PointLight(0x0a84ff, 4, 10)
    pLight2.position.set(-2, -3, 2)
    scene.add(pLight2)

    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // 核心发光自禁闭致密球
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x62a8ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    rootGroup.add(coreMesh)

    // 外层脉动能量晕
    const haloGeo = new THREE.SphereGeometry(0.95, 24, 16)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xff6644,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    rootGroup.add(haloMesh)

    // 3 条缠绕的非阿贝尔 SU(3) 色通量管（红、绿、蓝主色荷）
    const tubeColors = [mode.color1, mode.color2, mode.color3]
    const tubeMeshes = []
    const particleCount = 1200
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    // 生成环面纽结曲线
    const p = mode.knotP
    const q = mode.knotQ
    const rBase = mode.id === 'qgp' ? 1.6 : 0.88 * mode.scale

    for (let k = 0; k < 3; k++) {
      const phaseOffset = (k * Math.PI * 2) / 3
      const points = []
      const segs = 180
      for (let i = 0; i <= segs; i++) {
        const u = (i / segs) * Math.PI * 2 * p + phaseOffset
        const rKnot = rBase * (0.8 + 0.3 * Math.cos(q * u / p))
        const x = rKnot * Math.cos(u)
        const y = rKnot * Math.sin(u)
        const z = (rBase * 0.45) * Math.sin(q * u / p)
        points.push(new THREE.Vector3(x, y, z))
      }
      const curve = new THREE.CatmullRomCurve3(points, true)
      const tubeGeo = new THREE.TubeGeometry(curve, 140, mode.id === 'qgp' ? 0.025 : 0.065, 12, true)
      const tubeMat = new THREE.MeshStandardMaterial({
        color: tubeColors[k],
        emissive: tubeColors[k],
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: mode.id === 'qgp' ? 0.5 : 0.88
      })
      const mesh = new THREE.Mesh(tubeGeo, tubeMat)
      mesh.userData = { curve, phaseOffset }
      rootGroup.add(mesh)
      tubeMeshes.push(mesh)
    }

    // 周围色荷胶子粒子云
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2
      const rad = 0.4 + Math.pow(Math.random(), 1.5) * (mode.id === 'qgp' ? 2.2 : 1.4)
      particlePos[i * 3] = Math.cos(u) * rad
      particlePos[i * 3 + 1] = Math.sin(u) * rad * (0.6 + Math.random() * 0.4)
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.2

      const col = new THREE.Color(tubeColors[i % 3])
      particleColors[i * 3] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    rootGroup.add(particleSystem)

    // 响应式大小
    const resize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // 交互拖拽
    let isDown = false
    let prevX = 0
    let prevY = 0
    let rotX = 0.3
    let rotY = 0.2

    const onPointerDown = e => {
      isDown = true
      prevX = e.clientX
      prevY = e.clientY
    }
    const onPointerMove = e => {
      if (!isDown) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      rotY += dx * 0.008
      rotX += dy * 0.008
      prevX = e.clientX
      prevY = e.clientY
    }
    const onPointerUp = () => {
      isDown = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    let animId
    let t = 0

    const render = () => {
      animId = requestAnimationFrame(render)
      const dt = 0.016 * speed
      t += dt

      if (autoRotate && !isDown) {
        rotY += 0.006 * speed
        rotX = 0.25 + Math.sin(t * 0.5) * 0.15
      }

      rootGroup.rotation.x = rotX
      rootGroup.rotation.y = rotY

      // 核心脉动（呼吸模式）
      const pulse = 1 + Math.sin(t * 3.5 * alphaS) * (0.08 * alphaS)
      coreMesh.scale.setScalar(pulse * (mode.id === 'qgp' ? 0.4 : 1))
      haloMesh.scale.setScalar((1 + Math.cos(t * 2.2) * 0.12) * (mode.id === 'qgp' ? 1.5 : 1))

      // 通量管自旋波动
      tubeMeshes.forEach((mesh, idx) => {
        mesh.rotation.z = t * (0.4 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1)
      })

      // 粒子自旋
      particleSystem.rotation.z = -t * 0.35

      renderer.render(scene, camera)
    }
    render()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [mode, alphaS, autoRotate, speed])

  return <div ref={containerRef} className="glueball-3d-canvas" />
}

export default function GlueballSimulation() {
  const [activeModeId, setActiveModeId] = useState('scalar')
  const [alphaS, setAlphaS] = useState(1.18) // 强相互作用耦合常数
  const [autoRotate, setAutoRotate] = useState(true)
  const [speed, setSpeed] = useState(1.0)
  const [showFormula, setShowFormula] = useState(true)

  const activeMode = MODES.find(m => m.id === activeModeId) || MODES[0]

  return (
    <section className="glueball-section" id="glueball-origin">
      <div className="section-shell">
        {/* 顶部标题 */}
        <div className="glueball-header">
          <div className="eyebrow">
            <span />
            QUANTUM CHROMODYNAMICS & NON-ABELIAN VORTEX CONFINEMENT
          </div>
          <h2>
            强相互作用与胶球（Glueball）自束缚：
            <br />
            <span>无夸克参与的纯规范场非线性质量凝聚</span>
          </h2>
          <p>
            在量子色动力学（QCD）与拓扑流场理论中，胶子不仅传递强相互作用，自身更携带非阿贝尔 $SU(3)$ 色荷。
            在低能红外区，色通量管自相互吸引、缠绕并闭合为自禁闭孤子纽结——这就是物理学中完全由纯色场自束缚构成的神秘粒子：<strong>胶球（Glueball）</strong>。
          </p>
        </div>

        {/* 交互工作台 */}
        <div className="glueball-workbench">
          {/* 左侧控制与物理态选择 */}
          <div className="glueball-controls">
            <div className="panel-title">
              <Sparkles size={16} />
              <b>胶子场拓扑态与能级选择</b>
            </div>

            <div className="mode-selector-list">
              {MODES.map(m => {
                const isActive = m.id === activeModeId
                return (
                  <button
                    key={m.id}
                    className={`mode-card-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveModeId(m.id)}
                  >
                    <div className="mode-card-head">
                      <b>{m.name}</b>
                      <span className="mass-tag">{m.mass}</span>
                    </div>
                    <small>{m.latin} · {m.spin}</small>
                    <p>{m.desc}</p>
                    <div className="mode-metric-row">
                      <span>弦张力: <strong>{m.tension}</strong></span>
                      <span className="color-dots">
                        <i style={{ background: `#${m.color1.toString(16).padStart(6, '0')}` }} />
                        <i style={{ background: `#${m.color2.toString(16).padStart(6, '0')}` }} />
                        <i style={{ background: `#${m.color3.toString(16).padStart(6, '0')}` }} />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* 参数实时微调 */}
            <div className="glueball-sliders">
              <div className="slider-group">
                <div className="slider-label">
                  <span>强耦合常数 $\alpha_s(Q^2)$</span>
                  <b>{alphaS.toFixed(2)}</b>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.0"
                  step="0.05"
                  value={alphaS}
                  onChange={e => setAlphaS(parseFloat(e.target.value))}
                />
                <div className="slider-hints">
                  <small>渐近自由 (高能)</small>
                  <small>红外色禁闭 (低能)</small>
                </div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <span>拓扑涡动与自旋流速</span>
                  <b>{speed.toFixed(1)}x</b>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={speed}
                  onChange={e => setSpeed(parseFloat(e.target.value))}
                />
              </div>

              <div className="button-actions-row">
                <button
                  className="icon-action-btn"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  <Rotate3D size={14} />
                  <span>{autoRotate ? '暂停自转' : '开启自转'}</span>
                </button>
                <button
                  className="icon-action-btn"
                  onClick={() => {
                    setAlphaS(1.18)
                    setSpeed(1.0)
                    setActiveModeId('scalar')
                  }}
                >
                  <RefreshCw size={14} />
                  <span>重置基准态</span>
                </button>
              </div>
            </div>
          </div>

          {/* 右侧 3D 胶球色通量交互视口 */}
          <div className="glueball-viewport-panel">
            <div className="viewport-hud-header">
              <div>
                <span className="live-pill"><span />QCD FLUX TUBE SIMULATOR</span>
                <b>{activeMode.name}</b>
              </div>
              <div className="hud-metrics">
                <span>自旋宇称: <strong>{activeMode.spin}</strong></span>
                <span>预测质能: <strong>{activeMode.mass}</strong></span>
              </div>
            </div>

            <GlueballCanvas
              mode={activeMode}
              alphaS={alphaS}
              autoRotate={autoRotate}
              speed={speed}
            />

            <div className="viewport-hud-footer">
              <small>拖动鼠标倾斜旋转 · 观察非阿贝尔色通量管的三维空间拓扑闭合与自吸引收缩</small>
            </div>
          </div>
        </div>

        {/* 下方理论机制解析与物理方程式 */}
        <div className="glueball-theory-deck">
          <div className="theory-deck-card">
            <div className="deck-head">
              <Cpu size={16} />
              <b>1. 非阿贝尔规范场自相互作用</b>
            </div>
            <code>
              G_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + g f^{abc} A_\mu^b A_\nu^c
            </code>
            <p>
              不同于光子（不带电荷、场方程线性），QCD 胶子场自身携带色荷（$SU(3)$ 生成元），三胶子与四胶子自耦合项产生极强的非线性聚集效应。
            </p>
          </div>

          <div className="theory-deck-card">
            <div className="deck-head">
              <Zap size={16} />
              <b>2. 色通量管收缩与线性禁闭势</b>
            </div>
            <code>
              V_{\text{QCD}}(r) = -\frac{4}{3}\frac{\alpha_s}{r} + \sigma r \quad (\sigma \approx 1\text{ GeV/fm})
            </code>
            <p>
              当两个色源被拉开时，真空超导效应使色电场线被压缩成一维致密“通量管”（Flux Tube），能量随距离线性增加，促使闭合形成孤子纽结。
            </p>
          </div>

          <div className="theory-deck-card">
            <div className="deck-head">
              <Atom size={16} />
              <b>3. 质量凝聚（无夸克的纯场质量）</b>
            </div>
            <code>
              M_{\text{glueball}} = \langle 0 | \Theta_{\mu}^\mu | 0 \rangle_{\text{anomaly}} = \frac{\beta(g)}{2g} \langle G^2 \rangle
            </code>
            <p>
              胶球没有任何构成夸克（即没有夸克静止质量），其全部 1.7 GeV/c² 质量均源自非阿贝尔色场的动力学自禁闭动能与量子微商反常。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
