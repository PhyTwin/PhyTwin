import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Atom,
  Activity,
  ArrowRight,
  ShieldAlert,
  GitBranch,
  CircleDot,
  CheckCircle2
} from 'lucide-react'

// 强相互作用与胶球演化 4 大阶段示意数据
const EVOLUTION_STAGES = [
  {
    step: '01',
    id: 'asymptotic',
    title: '高能渐近自由',
    subtitle: 'Asymptotic Freedom (Q² ≫ Λ²_QCD)',
    energy: 'T > 200 MeV · r < 0.1 fm',
    state: '非束缚自由胶子气',
    equation: 'α_s(Q^2) = \\frac{12\\pi}{(33 - 2n_f) \\ln(Q^2/\\Lambda^2)} \\to 0',
    desc: '在高能短距离尺度下，QCD 负 β 函数使强耦合常数趋近于零。胶子携带 8 种 SU(3) 色荷自由运动，色电场向外平滑发散，尚无法形成稳定聚集态。',
    visualType: 'free-gluons',
    color: '#3a86ff',
    metrics: [
      ['耦合常数 α_s', '< 0.18 (极弱)'],
      ['相互作用势', '库仑型 -α_s / r'],
      ['微观状态', '夸克-胶子等离子体 (QGP)']
    ]
  },
  {
    step: '02',
    id: 'fluxtube',
    title: '色通量管收缩',
    subtitle: 'Color Flux Tube Formation',
    energy: 'r ≈ 0.3–0.8 fm',
    state: '一维致密色电弦',
    equation: 'V_{QCD}(r) = -\\frac{4}{3}\\frac{\\alpha_s}{r} + \\sigma r \\quad (\\sigma \\approx 1.0\\text{ GeV/fm})',
    desc: '随着距离增大，真空非阿贝尔反屏蔽效应占据主导。QCD 真空对色电场的排斥产生双重超导效应，将发散的色电力线强行压缩成截面仅 0.2 fm² 的准一维致密“色通量管”。',
    visualType: 'flux-tube',
    color: '#06d6a0',
    metrics: [
      ['通量弦张力 σ', '≈ 1.02 GeV/fm (16 吨力)'],
      ['禁闭机制', '对偶 Meissner 效应'],
      ['能量密度', '线性随距离增加 (σ·r)']
    ]
  },
  {
    step: '03',
    id: 'knotting',
    title: '非线性拓扑纽结',
    subtitle: 'Topological Knotting & Self-Attraction',
    energy: 'r ≈ 1.0 fm',
    state: 'SU(3) 闭合环面纽结孤子',
    equation: 'G_{\\mu\\nu}^a = \\partial_\\mu A_\\nu^a - \\partial_\\nu A_\\mu^a + g f^{abc} A_\\mu^b A_\\nu^c',
    desc: '不同于无带电的光子，胶子自身携带非阿贝尔色荷，具有三胶子与四胶子自相互作用项。色通量管受到自身强大自引力与拓扑扭曲驱动，首尾自闭合并缠绕为稳定的三维孤子纽结。',
    visualType: 'knot-torus',
    color: '#ffd166',
    metrics: [
      ['纽结拓扑荷 Q', '第二陈数 c₂ = 1'],
      ['自相互作用项', 'g f^{abc} A_μ^b A_ν^c (非线性)'],
      ['几何构型', '环面纽结 (Torus Knot)']
    ]
  },
  {
    step: '04',
    id: 'glueball',
    title: '纯场质量凝聚（胶球）',
    subtitle: 'Glueball Mass Condensation',
    energy: '基态静止质能 M ≈ 1.5–1.7 GeV/c²',
    state: '标量基态粒子 0⁺⁺',
    equation: 'M_{glueball} = \\langle 0 | \\Theta_\\mu^\\mu | 0 \\rangle = \\frac{\\beta(g)}{2g} \\langle G_{\\mu\\nu}^a G^{a\\mu\\nu} \\rangle',
    desc: '通过量子微商反常（Trace Anomaly），完全没有夸克参与的纯色场自束缚体系在真空中凝聚出宏观静止质量，形成标准模型预测的纯胶子粒子——标量胶球（0⁺⁺）与张量胶球（2⁺⁺）。',
    visualType: 'condensed-ball',
    color: '#ef476f',
    metrics: [
      ['基态质量 (0⁺⁺)', '≈ 1.71 GeV/c² (Lattice QCD)'],
      ['自旋与宇称 Jᴾᶜ', '0⁺⁺ (标量) / 2⁺⁺ (张量)'],
      ['实验寻找依托', 'BESIII (北京) / LHCb (CERN)']
    ]
  }
]

// 静态矢量示意演化图渲染器（纯 SVG / CSS，绝对零闪烁、零 GPU 资源占用）
function StaticEvolutionGraphic({ activeStage }) {
  return (
    <div className="glueball-static-diagram-wrap">
      <svg
        viewBox="0 0 760 380"
        className="glueball-svg-canvas"
        aria-label="强相互作用胶球演变历程示意图"
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#132b45" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#040b14" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fluxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3b30" />
            <stop offset="50%" stopColor="#34c759" />
            <stop offset="100%" stopColor="#007aff" />
          </linearGradient>
          <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 背景轻微能量网格 */}
        <rect x="0" y="0" width="760" height="380" fill="url(#bgGlow)" />
        <g stroke="#1b334a" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4">
          <line x1="40" y1="95" x2="720" y2="95" />
          <line x1="40" y1="190" x2="720" y2="190" />
          <line x1="40" y1="285" x2="720" y2="285" />
          <line x1="190" y1="30" x2="190" y2="350" />
          <line x1="380" y1="30" x2="380" y2="350" />
          <line x1="570" y1="30" x2="570" y2="350" />
        </g>

        {/* 阶段 1：高能自由弱耦合胶子点阵 */}
        <g transform="translate(100, 190)">
          <circle cx="0" cy="0" r="65" fill="#0c1d30" stroke="#254a6e" strokeWidth="1.5" />
          <text x="0" y="-76" textAnchor="middle" fill="#62d9ff" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">STAGE 01</text>
          <text x="0" y="82" textAnchor="middle" fill="#8baac7" fontSize="11" fontWeight="500">高能渐近自由</text>
          
          {/* 自由发散色场粒子 */}
          <circle cx="-25" cy="-20" r="6" fill="#ff4d4f" />
          <circle cx="30" cy="-15" r="6" fill="#52c41a" />
          <circle cx="-10" cy="28" r="6" fill="#1890ff" />
          <circle cx="20" cy="22" r="5" fill="#faad14" />
          {/* 发散虚线箭头 */}
          <path d="M-25,-20 L-45,-40" stroke="#ff4d4f" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />
          <path d="M30,-15 L50,-30" stroke="#52c41a" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M-10,28 L-25,48" stroke="#1890ff" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M20,22 L42,38" stroke="#faad14" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* 演化箭头 1 -> 2 */}
        <path d="M175,190 L215,190" stroke="#3d6285" strokeWidth="2" strokeDasharray="4 2" />

        {/* 阶段 2：色电力线受真空排斥压缩为通量管 */}
        <g transform="translate(285, 190)">
          <circle cx="0" cy="0" r="65" fill="#0c1d30" stroke="#254a6e" strokeWidth="1.5" />
          <text x="0" y="-76" textAnchor="middle" fill="#06d6a0" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">STAGE 02</text>
          <text x="0" y="82" textAnchor="middle" fill="#8baac7" fontSize="11" fontWeight="500">色通量管凝聚</text>

          {/* 准一维色通量管 */}
          <path
            d="M-45,0 C-20,-18 20,-18 45,0 C20,18 -20,18 -45,0 Z"
            fill="none"
            stroke="#06d6a0"
            strokeWidth="3.5"
            filter="url(#glowFilter)"
          />
          <path
            d="M-45,0 L45,0"
            stroke="#ff5e7e"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          <circle cx="-45" cy="0" r="7" fill="#ff4d4f" />
          <circle cx="45" cy="0" r="7" fill="#1890ff" />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">σ≈1GeV/fm</text>
        </g>

        {/* 演化箭头 2 -> 3 */}
        <path d="M360,190 L400,190" stroke="#3d6285" strokeWidth="2" strokeDasharray="4 2" />

        {/* 阶段 3：非阿贝尔自引力纽结自缠绕 */}
        <g transform="translate(470, 190)">
          <circle cx="0" cy="0" r="65" fill="#0c1d30" stroke="#254a6e" strokeWidth="1.5" />
          <text x="0" y="-76" textAnchor="middle" fill="#ffd166" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">STAGE 03</text>
          <text x="0" y="82" textAnchor="middle" fill="#8baac7" fontSize="11" fontWeight="500">拓扑孤子纽结</text>

          {/* 三叶纽结 (Trefoil Knot) 矢量轨迹 */}
          <path
            d="M-28,-22 C-5,-42 35,-35 28,-10 C20,18 -35,5 -30,25 C-25,42 18,38 32,15 C42,-12 10,-30 -10,-28"
            fill="none"
            stroke="#ffd166"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glowFilter)"
          />
          <circle cx="0" cy="0" r="14" fill="#3a86ff" opacity="0.3" />
        </g>

        {/* 演化箭头 3 -> 4 */}
        <path d="M545,190 L585,190" stroke="#3d6285" strokeWidth="2" strokeDasharray="4 2" />

        {/* 阶段 4：纯胶子场宏观静止质量凝聚 (胶球 0++) */}
        <g transform="translate(655, 190)">
          <circle cx="0" cy="0" r="68" fill="#150818" stroke="#ef476f" strokeWidth="2.5" filter="url(#glowFilter)" />
          <text x="0" y="-76" textAnchor="middle" fill="#ef476f" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono">STAGE 04 (FINAL)</text>
          <text x="0" y="82" textAnchor="middle" fill="#ff758f" fontSize="11" fontWeight="600">标量基态胶球 0⁺⁺</text>

          {/* 核心质量致密球 */}
          <circle cx="0" cy="0" r="32" fill="#ef476f" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="22" fill="#ff5e7e" fillOpacity="0.5" />
          <circle cx="0" cy="0" r="12" fill="#ffffff" filter="url(#glowFilter)" />
          
          {/* 三重色相环绕 */}
          <ellipse cx="0" cy="0" rx="44" ry="18" fill="none" stroke="#ff3b30" strokeWidth="2.5" transform="rotate(-30)" />
          <ellipse cx="0" cy="0" rx="44" ry="18" fill="none" stroke="#34c759" strokeWidth="2.5" transform="rotate(30)" />
          <ellipse cx="0" cy="0" rx="44" ry="18" fill="none" stroke="#007aff" strokeWidth="2.5" transform="rotate(90)" />

          <text x="0" y="3" textAnchor="middle" fill="#040b14" fontSize="8" fontWeight="800">1.7 GeV</text>
        </g>
      </svg>
    </div>
  )
}

export default function GlueballSimulation() {
  const [selectedStageIdx, setSelectedStageIdx] = useState(3) // 默认选中胶球生成最终态

  const activeStage = EVOLUTION_STAGES[selectedStageIdx]

  return (
    <section className="glueball-section" id="glueball-origin">
      <div className="section-shell">
        {/* 顶部标题 */}
        <div className="glueball-header">
          <div className="eyebrow">
            <span />
            QUANTUM CHROMODYNAMICS & NON-ABELIAN FIELD SELF-BINDING
          </div>
          <h2>
            强相互作用与胶球（Glueball）自束缚演变示意
            <br />
            <span>无夸克参与的纯非阿贝尔规范场非线性质量凝聚</span>
          </h2>
          <p>
            量子色动力学（QCD）中，胶子不仅传递强相互作用，其自身携带非阿贝尔 $SU(3)$ 色荷。
            在红外强耦合区，色通量线受真空对偶 Meissner 效应压缩为致密通量弦，并通过非线性自吸引缠绕为自禁闭孤子纽结——形成了完全由纯色场凝聚构成的神秘粒子：<strong>胶球（Glueball）</strong>。
          </p>
        </div>

        {/* 演变历程静态示意总览图 */}
        <div className="glueball-static-overview-card">
          <div className="overview-header">
            <div className="overview-title-tag">
              <Activity size={16} />
              <b>强相互作用色通量演化与胶球生成 4 阶段解析</b>
            </div>
            <span className="static-tag">静态示意 · 物理一致</span>
          </div>

          <StaticEvolutionGraphic activeStage={activeStage} />
        </div>

        {/* 4 大阶段交互式卡片切换区 */}
        <div className="evolution-stage-cards-grid">
          {EVOLUTION_STAGES.map((st, idx) => {
            const isSelected = idx === selectedStageIdx
            return (
              <div
                key={st.id}
                className={`stage-card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedStageIdx(idx)}
                role="button"
                tabIndex={0}
              >
                <div className="stage-card-top">
                  <span className="step-num">{st.step}</span>
                  <span className="stage-state-tag" style={{ color: st.color }}>
                    {st.state}
                  </span>
                </div>
                <h3>{st.title}</h3>
                <small className="stage-subtitle">{st.subtitle}</small>
                <p className="stage-desc">{st.desc}</p>

                <div className="stage-equation-box">
                  <code>{st.equation}</code>
                </div>

                <div className="stage-metrics-list">
                  {st.metrics.map(([label, val]) => (
                    <div className="metric-row" key={label}>
                      <span>{label}</span>
                      <strong>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部物理机制与前沿实验验证 */}
        <div className="glueball-theory-deck">
          <div className="theory-deck-card">
            <div className="deck-head">
              <Cpu size={16} />
              <b>1. 非阿贝尔杨-米尔斯自相互作用</b>
            </div>
            <code>
              {"G_{μν}^a = ∂_μ A_ν^a - ∂_ν A_μ^a + g f^{abc} A_μ^b A_ν^c"}
            </code>
            <p>
              光子不带电且场方程线性；而 QCD 胶子自身带色荷，三胶子与四胶子非线性耦合产生极强的自吸引聚集力。
            </p>
          </div>

          <div className="theory-deck-card">
            <div className="deck-head">
              <Zap size={16} />
              <b>2. 色通量管与线性禁闭弦</b>
            </div>
            <code>
              {"V_{QCD}(r) = -(4/3)(α_s / r) + σ r  (σ ≈ 1.02 GeV/fm)"}
            </code>
            <p>
              真空超导效应排斥色电场，迫使电力线压缩为横截面约 0.2 fm² 的致密通量管，张力高达 16 吨力。
            </p>
          </div>

          <div className="theory-deck-card">
            <div className="deck-head">
              <Atom size={16} />
              <b>3. 纯规范场能量质量凝聚</b>
            </div>
            <code>
              {"M_{glueball} = ⟨0 | Θ_μ^μ | 0⟩ = [β(g)/(2g)] ⟨G^2⟩ ≈ 1.7 GeV/c²"}
            </code>
            <p>
              胶球不含任何夸克静止质量，全部 1.7 GeV/c² 质能均源自纯胶子场动能与量子微商反常（Trace Anomaly）。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
