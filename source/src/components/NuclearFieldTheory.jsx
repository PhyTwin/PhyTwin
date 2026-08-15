import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Atom, Boxes, Cpu, Flame, Layers, Orbit, Radio, ShieldAlert, Sparkles, Waves, Zap } from 'lucide-react'

const STAGES = [
  {
    id: 'fluid',
    num: '01',
    title: '连续流场基底',
    subtitle: 'THE UNIFIED CONTINUOUS FLOW FIELD',
    badge: '动力学本构',
    icon: Waves,
    summary: '物理空间本质上是由内蕴可压缩流体连续介质构成，而非绝对虚空。真空能量涨落即是流场微观微扰。',
    mechanism: '连续介质满足广义纳维-斯托克斯与能量守恒方程，其流速场 \\vec{v}(\\vec{x},t) 与微压强密度 \\rho(\\vec{x},t) 构成所有物理现象的基础底层。',
    formula: '\\frac{\\partial \\vec{v}}{\\partial t} + (\\vec{v} \\cdot \\nabla)\\vec{v} = -\\frac{1}{\\rho}\\nabla P + \\nu \\nabla^2 \\vec{v} + \\vec{f}_{\\text{vac}}',
    points: ['流场不依赖外禀粒子，自身即是实体', '微观声速 $c$ 构成信息与能量传播的上限（光速）', '连续介质的非线性形变为拓扑结构的孕育提供基质']
  },
  {
    id: 'charge',
    num: '02',
    title: '电荷的拓扑构成',
    subtitle: 'CHARGE AS VORTEX CIRCULATION & CHIRALITY',
    badge: '拓扑环量',
    icon: Zap,
    summary: '“电荷”并非点状附着物，而是连续流场在三维空间中形成的自持闭合涡旋（Vortex Filament）的环量与手征性。',
    mechanism: '沿闭合回路的流速线积分定义拓扑环量 \\Gamma。正负电荷分别对应涡旋的右手征顺流与左手征逆流，库仑力即为涡环间的流体动力学吸斥效应。',
    formula: 'q = \\kappa \\oint_{\\mathcal{C}} \\vec{v} \\cdot d\\vec{l} = \\kappa \\iint_{\\mathcal{S}} (\\nabla \\times \\vec{v}) \\cdot d\\vec{A} = \\kappa \\Gamma',
    points: ['正电荷与负电荷：流场涡旋的右手螺旋与左手螺旋', '同种相斥、异种相吸：流场伯努利压力与涡旋干涉的必然结果', '电荷量子化：流场拓扑缠绕数（Winding Number）的离散整数约束']
  },
  {
    id: 'mass',
    num: '03',
    title: '质量的自禁闭涌现',
    subtitle: 'MASS AS LOCALISED CONFINED FIELD ENERGY',
    badge: '自禁闭能量',
    icon: Boxes,
    summary: '静止质量是局域非线性涡旋孤子在空间中高度自禁闭的动能与压强场空间积分，实现了场到“实体惯性”的跨越。',
    mechanism: '当流场形成自闭合环流时，动量密度在局域形成驻波禁闭。外界改变其位置需克服内部涡动量的进动阻力，从而在宏观上表现为惯性质性 $m = E_{\\text{confined}} / c^2$。',
    formula: 'm = \\frac{1}{c^2} \\iiint_{V} \\left[ \\frac{1}{2}\\rho |\\vec{v}|^2 + \\mathcal{U}_{\\text{int}}(\\rho) + \\frac{1}{2\\mu_0}|\\nabla \\times \\vec{v}|^2 \\right] dV',
    points: ['惯性起源：改变自旋流场空间位置所需的陀螺反作用力矩', '质能等价：质量就是被束缚在极小空间内的流场环形流动动能', '引力效应：质量中心对周围背景连续介质造成的向心压力梯度']
  },
  {
    id: 'nucleus',
    num: '04',
    title: '原子核的纽结形成',
    subtitle: 'NUCLEAR SYNTHESIS VIA HOPF VORTEX KNOTS',
    badge: '核子纽结',
    icon: Atom,
    summary: '质子与中子是多重复合的流体孤子纽结（Hopf Solitons），多个核子在伯努利超低压槽中紧密交织，凝聚成原子核。',
    mechanism: '短距离下，核子流场间形成剧烈的局部相长干涉与流速急升，产生巨大的负压吸力（表现为强相互作用核力），抵消了同号电荷的宏观排斥。',
    formula: 'F_{\\text{strong}} = -\\nabla \\left( \\frac{1}{2}\\rho v_{\\text{overlap}}^2 \\right) \\implies E_{\\text{binding}} = \\Delta m c^2',
    points: ['强核力本质：两个涡环近距离同相旋转时流速陡增引发的超强伯努利负压', '中子构成：正反涡管拓扑对消净环量为零但保留局部涡旋自禁闭能量', '核壳层结构：多核子流场在三维球对称空间中的拓扑极小能量稳定几何']
  },
  {
    id: 'radiation',
    num: '05',
    title: '辐射与衰变机制',
    subtitle: 'RADIATION AS WAVE DISSIPATION & RECONNECTION',
    badge: '退激发波动',
    icon: Radio,
    summary: '辐射是原子核与激发态流场在拓扑重联（Reconnection）或能量跃迁时，向外界背景连续流场发射的球面高频波动。',
    mechanism: '当原子核流场处于高剪切不稳定构型时，局域涡线发生断裂与重新缝合（拓扑跃迁），损失的自禁闭动能化为连续介质的横向电磁波动（$\\gamma$ 辐射）或剥离独立微小涡环（$\\alpha/\\beta$ 粒子）。',
    formula: '\\mathcal{P}_{\\text{radiation}} = \\frac{\\mu_0}{6\\pi c} \\left( \\frac{d^2 \\Gamma}{dt^2} \\right)^2 + \\int_{\\partial V} \\vec{S}_{\\text{fluid}} \\cdot d\\vec{A}',
    points: ['$\\alpha$ 衰变：大原子核外围不稳定涡环团块发生流体动力学脱离', '$\\beta$ 衰变：中子内部零净环量涡对发生手征性翻转并释放微型副涡旋（反中微子）', '$\\gamma$ 辐射：原子核流场自振荡几何形态重排向背景真空释放的纯流场剪切应力波']
  }
]

function StreamlineCanvas({ activeStage }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 120 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      r: 30 + Math.random() * 120,
      theta: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      size: 1.5 + Math.random() * 2,
      hue: Math.random() * 40
    }))

    const render = () => {
      t += 0.02
      ctx.save()
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      // 背景网格与流场流动线
      ctx.strokeStyle = 'rgba(74, 115, 173, 0.08)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // 根据 stage 绘制不同特征的连续流场几何
      if (activeStage === 'fluid') {
        // 连续波动流场
        for (let i = 0; i < 9; i++) {
          ctx.beginPath()
          const offset = i * 28 - 110
          ctx.strokeStyle = `rgba(100, 180, 255, ${0.12 + (i % 3) * 0.08})`
          ctx.lineWidth = 1.5
          for (let px = 0; px < w; px += 8) {
            const py = cy + offset + Math.sin(px * 0.02 + t + i * 0.6) * 22 + Math.cos(px * 0.008 - t * 0.5) * 14
            if (px === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.stroke()
        }
      } else if (activeStage === 'charge') {
        // 双涡旋偶极流场（正负环量）
        ;[-80, 80].forEach((ox, idx) => {
          const dir = idx === 0 ? 1 : -1
          const color = idx === 0 ? '110, 200, 255' : '255, 140, 90'
          for (let r = 16; r < 90; r += 14) {
            ctx.beginPath()
            ctx.arc(cx + ox, cy, r, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${color}, ${0.15 + (1 - r / 90) * 0.3})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
          // 核心涡旋
          ctx.fillStyle = `rgb(${color})`
          ctx.beginPath()
          ctx.arc(cx + ox, cy, 6, 0, Math.PI * 2)
          ctx.fill()
        })
      } else if (activeStage === 'mass') {
        // 自禁闭环形流场与压力梯度
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120)
        grad.addColorStop(0, 'rgba(255, 215, 120, 0.45)')
        grad.addColorStop(0.4, 'rgba(95, 175, 255, 0.22)')
        grad.addColorStop(1, 'rgba(1, 2, 7, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, 120, 0, Math.PI * 2)
        ctx.fill()

        for (let r = 24; r < 95; r += 12) {
          ctx.beginPath()
          ctx.ellipse(cx, cy, r, r * 0.72, t * 0.4, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255, 230, 160, 0.4)'
          ctx.lineWidth = 1.8
          ctx.stroke()
        }
      } else if (activeStage === 'nucleus') {
        // 多核子复合纽结
        const centers = [
          [-28, -20],
          [28, -20],
          [0, 28]
        ]
        centers.forEach(([ox, oy], i) => {
          const color = i % 2 === 0 ? '255, 130, 90' : '100, 200, 255'
          ctx.beginPath()
          ctx.arc(cx + ox, cy + oy, 24, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, 0.25)`
          ctx.fill()
          ctx.strokeStyle = `rgba(${color}, 0.8)`
          ctx.lineWidth = 2
          ctx.stroke()
        })
        // 纽结包络
        ctx.beginPath()
        ctx.arc(cx, cy, 65, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 215, 100, 0.4)'
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.setLineDash([])
      } else if (activeStage === 'radiation') {
        // 核心与发射出的球面辐射扩散波
        ctx.fillStyle = 'rgba(255, 120, 80, 0.9)'
        ctx.beginPath()
        ctx.arc(cx, cy, 10, 0, Math.PI * 2)
        ctx.fill()

        for (let k = 0; k < 6; k++) {
          const waveR = ((t * 45 + k * 30) % 150) + 12
          const alpha = Math.max(0, 1 - waveR / 160)
          ctx.beginPath()
          ctx.arc(cx, cy, waveR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(130, 210, 255, ${alpha * 0.7})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      // 流动粒子示踪
      particles.forEach(p => {
        p.theta += p.speed
        const px = cx + Math.cos(p.theta) * p.r
        const py = cy + Math.sin(p.theta) * (p.r * 0.75)
        ctx.fillStyle = `rgba(170, 215, 255, 0.6)`
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
      animId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [activeStage])

  return <canvas ref={canvasRef} className="field-theory-canvas" />
}

export default function NuclearFieldTheory() {
  const [activeStage, setActiveStage] = useState('fluid')
  const current = STAGES.find(s => s.id === activeStage) || STAGES[0]
  const IconComponent = current.icon

  return (
    <section className="nuclear-field-section" id="nuclear-origin">
      <div className="section-shell">
        {/* 顶部标题区 */}
        <div className="field-theory-header">
          <div className="eyebrow">
            <span />
            CONTINUOUS FLUID MECHANICS & NUCLEAR EMERGENCE
          </div>
          <h2>
            探索原子核的来源与辐射：
            <br />
            <span>从连续流场构筑电荷、质量到原子核凝聚</span>
          </h2>
          <p>
            我们描述了一种非线性连续流场：空间通过内蕴拓扑环量形成电荷，通过自禁闭驻波能量构筑质量，
            通过高阶涡环纽结交织凝聚为原子核，并在跃迁与拓扑断裂中释放高频辐射波。
          </p>
        </div>

        {/* 五个物理演化阶梯卡片导航 */}
        <div className="field-stages-nav">
          {STAGES.map(s => {
            const Icon = s.icon
            const isActive = s.id === activeStage
            return (
              <button
                key={s.id}
                className={`field-stage-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStage(s.id)}
              >
                <div className="stage-tab-top">
                  <span className="stage-num">{s.num}</span>
                  <span className="stage-badge">{s.badge}</span>
                </div>
                <div className="stage-tab-title">
                  <Icon size={16} />
                  <b>{s.title}</b>
                </div>
                <small>{s.subtitle}</small>
              </button>
            )
          })}
        </div>

        {/* 核心双栏理论与可视化解构 */}
        <div className="field-stage-showcase">
          {/* 左侧理论解析 */}
          <div className="field-stage-content">
            <div className="field-content-head">
              <span className="stage-index-tag">STAGE / {current.num}</span>
              <h3>
                {current.title}
                <small>{current.subtitle}</small>
              </h3>
            </div>

            <p className="mechanism-lead">{current.summary}</p>
            <p className="mechanism-body">{current.mechanism}</p>

            {/* 控制方程展示 */}
            <div className="field-formula-box">
              <div className="formula-label">
                <Cpu size={14} />
                <span>控制方程 / 拓扑泛函</span>
              </div>
              <code>{current.formula}</code>
            </div>

            {/* 关键物理机制推论 */}
            <div className="field-deductions">
              <b>核心物理推论与几何机制</b>
              <ul>
                {current.points.map((pt, idx) => (
                  <li key={idx}>
                    <Sparkles size={14} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 链接至实时实验室 */}
            <div className="field-actions">
              <Link to="/lab" className="primary-link">
                在实时实验室验证流场方程 <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 右侧动态流场仿真画板 */}
          <div className="field-stage-visual">
            <div className="visual-hud-top">
              <span>
                <Activity size={13} /> STREAMLINE VISUALIZER
              </span>
              <em>{current.badge}</em>
            </div>
            <StreamlineCanvas activeStage={activeStage} />
            <div className="visual-hud-bottom">
              <small>NONLINEAR TOPOLOGICAL FIELD FLUID SOLVER · REALTIME PREVIEW</small>
            </div>
          </div>
        </div>

        {/* 下方全景物理闭环摘要 */}
        <div className="theory-summary-grid">
          <div className="theory-summary-card">
            <div className="summary-icon blue">
              <Waves size={20} />
            </div>
            <b>01. 连续流场</b>
            <p>空间充满具有可压缩性与内蕴微压强的连续介质，光速即介质极限扰动波速。</p>
          </div>
          <div className="theory-summary-card">
            <div className="summary-icon cyan">
              <Zap size={20} />
            </div>
            <b>02. 电荷环量</b>
            <p>涡旋回路环量 $\Gamma$ 与手征性衍生出正负电荷与库仑力的流体动力学本构。</p>
          </div>
          <div className="theory-summary-card">
            <div className="summary-icon amber">
              <Boxes size={20} />
            </div>
            <b>03. 质量禁闭</b>
            <p>局部闭合涡流的高密度动能与驻波自禁闭产生宏观惯性，统一质能关系 $E=mc^2$。</p>
          </div>
          <div className="theory-summary-card">
            <div className="summary-icon orange">
              <Atom size={20} />
            </div>
            <b>04. 核子纽结</b>
            <p>质子中子以 Hopf 纽结拓扑稳定存在，流体伯努利低压槽构成极强短程吸引力。</p>
          </div>
          <div className="theory-summary-card">
            <div className="summary-icon red">
              <Radio size={20} />
            </div>
            <b>05. 辐射耗散</b>
            <p>不稳定核结构发生拓扑重联时，释放微型孤子或向背景介质辐射剪切应力高频波动。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
