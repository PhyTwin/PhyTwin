import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import {
  Activity, ArrowRight, BookOpen, Check, ChevronRight, Code2,
  ExternalLink, Layers3, Play, Sparkles, Terminal, Waves,
  Atom, Boxes, Grid3X3, Sigma, Braces, Calculator, ShieldCheck,
  Cpu, Zap, Compass, Database, Globe
} from 'lucide-react'
import { capabilities, devices, validations } from './data.js'

const CosmicExplorer = lazy(() => import('./components/CosmicExplorer.jsx'))
const GlueballSimulation = lazy(() => import('./components/GlueballSimulation.jsx'))
const NuclearFieldTheory = lazy(() => import('./components/NuclearFieldTheory.jsx'))
const RealtimeLab = lazy(() => import('./pages/RealtimeLab.jsx'))

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title}｜PhyTwin 物理数字孪生`
  }, [title])
}

function Brand() {
  return (
    <Link className="brand" to="/">
      <span className="brand-badge">
        <span className="brand-dot" />
        <span className="brand-pulse" />
      </span>
      <div className="brand-text">
        <strong>PhyTwin</strong>
        <small>物理数字孪生 · 聚变与连续介质</small>
      </div>
    </Link>
  )
}

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-title">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function Shell({ children }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  const navLinks = [
    ['/', '首页'],
    ['/capabilities', '仿真技术'],
    ['/lab', '仿真实验室'],
    ['/projects', '工程装置'],
    ['/resources', '资源导航']
  ]

  return (
    <div className={location.pathname === '/' ? 'home-route' : ''}>
      <header className="topbar">
        <Brand />
        <nav className="desktop-nav">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="topbar-actions">
          <Link className="primary-button small" to="/lab">
            <Play size={13} fill="currentColor" />
            <span>进入仿真实验室</span>
          </Link>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {navLinks.map(([path, label]) => (
            <Link key={path} to={path}>
              <span>{label}</span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </nav>
      )}

      <main>{children}</main>
    </div>
  )
}

function Home() {
  useDocumentTitle('首页')
  return (
    <>
      <section className="cosmic-home-hero">
        <Suspense
          fallback={
            <div className="cosmic-fallback">
              <div className="spinner" />
              <span>生成银河系恒星与旋臂场…</span>
            </div>
          }
        >
          <CosmicExplorer />
        </Suspense>
      </section>

      <Suspense fallback={<div className="plot-skeleton" />}>
        <GlueballSimulation />
      </Suspense>

      <Suspense fallback={<div className="plot-skeleton" />}>
        <NuclearFieldTheory />
      </Suspense>

      <footer className="home-footer">
        <div className="section-shell footer-inner">
          <div>
            <Brand />
            <p>以可验证的连续介质流场与超算物理数字孪生，构筑从微观核子到宏观宇宙的计算基石。</p>
          </div>
          <div className="footer-links">
            <Link to="/lab">仿真实验室</Link>
            <Link to="/capabilities">仿真技术</Link>
            <Link to="/projects">工程装置</Link>
            <Link to="/resources">资源导航</Link>
            <a href="https://github.com/PhyTwin/PhyTwin" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:phytwin@outlook.com">phytwin@outlook.com</a>
          </div>
        </div>
        <span className="copyright">© 2026 PhyTwin · www.phytwin.com · 物理数字孪生</span>
      </footer>
    </>
  )
}

// 1. 仿真技术 (Capabilities / Tech)
function Capabilities() {
  useDocumentTitle('仿真技术')
  return (
    <>
      <section className="page-hero section-shell">
        <Eyebrow>SIMULATION TECHNOLOGIES & NUMERICAL METHODS</Eyebrow>
        <h1>从控制方程到可信工程结论</h1>
        <p>构建覆盖磁流体动力学（MHD）、高精度有限体积法、超导多场耦合有限元与粒子动理学的全栈数值技术路线。</p>
      </section>

      <section className="section-shell process-grid">
        {['数学建模与控制方程', '离散方案与网格拓扑', '强耦合迭代与收敛控制', 'V&V 验证与确认', '数字孪生与工程决策'].map((x, i) => (
          <div key={x}>
            <span>0{i + 1}</span>
            <h3>{x}</h3>
            <p>
              {[
                '根据时间/空间尺度确定偏微分方程（PDE）系统与边界条件',
                '构建贴体非结构/自适应多面体网格与高阶离散格式',
                '基于多重网格与 Krylov 子空间算法控制动量/能量残差',
                '对照解析基准与国家大科学装置实测数据执行严格误差标定',
                '输出灵敏度梯度、工程安全裕度与多学科优化方案'
              ][i]}
            </p>
          </div>
        ))}
      </section>

      <section className="section-shell capability-detail-list">
        {capabilities.map((item, i) => (
          <article key={item.id}>
            <div>
              <span className="detail-index">{item.id}</span>
              <Eyebrow>{item.key}</Eyebrow>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul>
                {[
                  ['非线性 Grad–Shafranov 平衡与自由边界求解', '电阻撕裂模、ELM 与逃逸电子瞬态演化', '回旋动理学与微观湍流多尺度输运'],
                  ['3D Biot–Savart 复杂空间磁场数值积分', '高温超导 CICC 导体交流损耗与失超瞬态传播', '极向场与环向场超导线圈洛伦兹应力分布'],
                  ['密度基高阶激波捕捉与接触间断分辨率', '激波-边界层干扰（SBLI）与气动热通量预测', '跨声速非定常抖振与气动弹性阻尼'],
                  ['低普朗特数液态金属（LBE/LiPb）MHD 压降抑制', '强浮力驱动非定常自然对流衰变热导出', '离心叶轮空化相变与气液多相界面演化'],
                  ['固体各向异性导热与微通道强制对流换热', '偏滤器钨/铜复合装甲 20 MW/m² 稳态热阻分析', '瞬态热冲击弹性-塑性热蠕变疲劳寿命评估'],
                  ['三维对流-扩散-反应-一阶衰变 Green 积分核', '深远海潮汐洋流风浪流场同位素扩散追踪', '多源项释放非各向同性烟羽浓度场解析']
                ][i].map(x => (
                  <li key={x}>
                    <Check size={15} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="capability-metric-card">
              <span>ACCURACY METRIC</span>
              <strong>{item.metric}</strong>
              <small>{item.label}</small>
            </div>
          </article>
        ))}
      </section>

      {/* ASME V&V 验证基准 */}
      <section className="section-shell validation">
        <SectionTitle
          eyebrow="VERIFICATION & VALIDATION"
          title="可信度量化：标准算例与理论解析误差对比"
          description="遵循 ASME V&V 20 与 ISO 规范，以严格的解析闭式解与标准网格收敛性证明自研求解器的精度。"
        />
        <div className="validation-table">
          <div>
            <b>标准验证算例 (Benchmark)</b>
            <b>参考基准 / 参照方法</b>
            <b>绝对 / 相对误差</b>
          </div>
          {validations.map(row => (
            <div key={row[0]}>
              {row.map((x, i) => (
                <span key={x} className={i === 2 ? 'good' : ''}>
                  {x}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// 2. 工程装置 (Devices / Projects)
function Devices() {
  useDocumentTitle('工程装置')
  return (
    <>
      <section className="page-hero section-shell">
        <Eyebrow>ENGINEERING FACILITIES & MAJOR DEVICES</Eyebrow>
        <h1>真实前沿重大工程装置与聚变装备</h1>
        <p>聚焦全超导托卡马克、先进仿星器、场反向位形（FRC）、高场超导磁体与大型跨声速风洞等国家重大科技基础设施。</p>
      </section>

      <section className="section-shell device-list">
        {devices.map((dev, i) => (
          <article className="device-card" key={dev.id}>
            <div className="device-header">
              <div className="device-title-wrap">
                <span className="device-badge">{dev.category}</span>
                <h2>{dev.name}</h2>
                <small className="device-latin">{dev.latin}</small>
              </div>
              <div className="device-status-tag">
                <span className="status-dot" />
                <span>{dev.status}</span>
              </div>
            </div>

            <p className="device-highlight">{dev.highlight}</p>

            <div className="device-specs-grid">
              {dev.specs.map(([lbl, val]) => (
                <div className="spec-item" key={lbl}>
                  <span>{lbl}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>

            <div className="device-footer">
              <div className="device-meta">
                <span><strong>依托机构：</strong>{dev.facility}</span>
                <span><strong>地理位置：</strong>{dev.location}</span>
              </div>
              <div className="device-sim-scope">
                <b>仿真对标范围：</b>
                <p>{dev.simScope}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

// 3. 资源导航 (Fusion Hub / Resources)
const resourceGroups = [
  {
    key: 'FUSION CODES',
    title: '聚变与磁流体动力学仿真代码 (Fusion Codes)',
    description: '涵盖磁面平衡、宏观扩展 MHD、微观回旋动理学、边缘刮削层与零维系统级设计代码。',
    items: [
      { name: 'EFIT / FreeGS', subtitle: '托卡马克 Grad-Shafranov 磁平衡重建', url: 'https://github.com/freegs-fusion/freegs', icon: Atom, featured: true, tags: ['平衡重建', 'GS 方程', 'Python / Fortran'], text: '磁约束聚变界标准平衡重建与自由边界 Grad–Shafranov 求解工具。' },
      { name: 'VMEC / STELLOPT', subtitle: '三维仿星器与托卡马克 3D 平衡', url: 'https://princetonuniversity.github.io/STELLOPT/', icon: Code2, featured: true, tags: ['仿星器', '3D MHD', '磁面优化'], text: '求解三维嵌套磁通量曲面与外加扭曲超导线圈拓扑优化。' },
      { name: 'M3D-C1', subtitle: '三维高精度扩展 MHD 代码', url: 'https://m3dc1.pppl.gov/', icon: Code2, featured: true, tags: ['Extended MHD', 'C¹ FEM', 'PPPL'], text: '普林斯顿等离子体物理实验室面向锯齿崩塌、ELM 与破裂 VDE 的高阶有限元代码。' },
      { name: 'GENE / GTC', subtitle: '回旋动理学微观湍流与反常输运', url: 'http://genecode.org/', icon: Code2, tags: ['Gyrokinetic', 'PIC', '微观湍流'], text: '跨尺度回旋动理学模拟，解析离子温度梯度模（ITG）与电子温度梯度模（ETG）。' },
      { name: 'BOUT++', subtitle: '等离子体边缘与流体湍流框架', url: 'https://boutproject.github.io/', icon: Code2, tags: ['Edge Plasma', '偏滤器', 'C++'], text: '针对磁场对齐非正交坐标系的高性能 PDE 等离子体边缘湍流模拟框架。' },
      { name: 'SOLPS-ITER', subtitle: 'ITER 官方偏滤器与边缘等离子体输运', url: 'https://www.iter.org/', icon: Atom, tags: ['B2-EIRENE', '中性粒子', '偏滤器脱靶'], text: '耦合 B2 流体方程与 Eirene 蒙特卡罗中性粒子输运，评估偏滤器热负荷与脱靶。' },
      { name: 'PROCESS / SYCOMORE', subtitle: '聚变电站 0D/1D 系统设计与经济性', url: 'https://github.com/ukaea/process', icon: Sigma, tags: ['Systems Code', 'Lawson 判据', 'UKAEA'], text: '聚变反应堆全局参数优化、能量平衡与经济性平准化度电成本分析。' }
    ]
  },
  {
    key: 'MULTIPHYSICS',
    title: '连续介质与开源多物理场工具箱 (CFD / FEM)',
    description: '涵盖流体动力学、热工水力、电磁结构强耦合与粒子系统的通用数值计算生态。',
    items: [
      { name: 'OpenFOAM', subtitle: '通用有限体积 (FVM) 连续介质求解器', url: 'https://openfoam.org/', icon: Waves, featured: true, tags: ['FVM', 'CFD', '多相流 / 传热'], text: '不可压/可压流、低普朗特数液态金属、传热与燃烧的大型开源工具箱。' },
      { name: 'SU2', subtitle: '可压缩流体动力学与伴随拓扑优化', url: 'https://su2code.github.io/', icon: Waves, tags: ['CFD', '激波捕捉', '伴随优化'], text: '高精度可压缩空气动力学与 PDE 约束伴随梯度形状优化。' },
      { name: 'FEniCSx', subtitle: '自动化有限元 (FEM) 变分求解平台', url: 'https://fenicsproject.org/', icon: Code2, tags: ['FEM', 'Python', '偏微分方程'], text: '以严格的弱形式变分语法自动生成高效 C++ 多物理场装配内核。' },
      { name: 'Elmer FEM', subtitle: '多物理场强耦合有限元套件', url: 'https://www.elmerfem.org/', icon: Boxes, tags: ['电磁-热-力', '超导磁体', 'FEM'], text: '芬兰国家计算中心研发的流体、传热、电磁与结构强耦合开源求解器。' },
      { name: 'Code_Aster', subtitle: '工业级非线性热力学与断裂力学', url: 'https://www.code-aster.org/', icon: Boxes, tags: ['结构力学', '热蠕变', 'EDF 核电'], text: '法国电力集团（EDF）研发的核电与极端载荷非线性有限元软件。' },
      { name: 'WarpX', subtitle: '先进高阶粒子模拟 (PIC) 框架', url: 'https://ecp-warpx.github.io/', icon: Code2, tags: ['PIC', 'GPU 加速', '高能等离子体'], text: '美国百亿亿次超算项目（ECP）支持的激光等离子体加速与 PIC 求解器。' }
    ]
  },
  {
    key: 'ENTITIES & LABS',
    title: '全球聚变重大工程主体与创新企业 (Fusion Hub)',
    description: '汇集国家级大科学装置实验室、国际组织与全球代表性商业聚变创新独角兽。',
    items: [
      { name: 'ASIPP 等离子体所', subtitle: 'EAST / BEST / CFETR 研制依托单位', url: 'http://www.ipp.cas.cn/', icon: Globe, featured: true, tags: ['合肥', '全超导托卡马克', '国家队'], text: '中国聚变国家队核心力量，运行 EAST 装置并主导建设 BEST 与 CFETR。' },
      { name: 'SWIP 核工业西南物理研究院', subtitle: 'HL-3 中国环流三号研制依托单位', url: 'https://www.swip.ac.cn/', icon: Globe, featured: true, tags: ['成都', '中核集团', '先进偏滤器'], text: '中国磁约束聚变发源地之一，研制并运行新一代先进托卡马克 HL-3。' },
      { name: 'ITER Organization', subtitle: '国际热核聚变实验堆国际组织', url: 'https://www.iter.org/', icon: Globe, featured: true, tags: ['法国', '500 MW', '国际合作'], text: '人类历史上规模最宏大的跨国聚变大科学工程总部。' },
      { name: 'Commonwealth Fusion (CFS)', subtitle: '高场紧凑型超导托卡马克 SPARC', url: 'https://cfs.energy/', icon: Zap, featured: true, tags: ['MIT 衍生', '20T 高温超导', '商业聚变'], text: '从 MIT 衍生出的商业聚变独角兽，基于 20T 高温超导线圈建造 SPARC 装置。' },
      { name: 'Helion Energy', subtitle: '脉冲式磁声对撞 FRC 聚变发电', url: 'https://www.helionenergy.com/', icon: Zap, tags: ['FRC', 'D-He3 燃料', '直接电能回收'], text: '开发脉冲磁压缩场反向位形（FRC），探索直接感应发电路线。' },
      { name: 'Energy Singularity 能量奇点', subtitle: '洪荒 70 全高温超导托卡马克', url: 'https://www.energysingularity.cn/', icon: Zap, tags: ['中国上海', '高温超导', '商业托卡马克'], text: '中国首家商业全超导托卡马克研发企业，研制成功「洪荒 70」装置。' },
      { name: 'TAE Technologies', subtitle: '中性束驱动场反向位形 Norman / Copernicus', url: 'https://tae.com/', icon: Zap, tags: ['美国', 'p-B11 无中子', 'FRC'], text: '探索先进中性束稳态注入与氢-硼无中子洁净聚变反应堆。' },
      { name: 'Kyoto Fusioneering', subtitle: '聚变电站先进包层与热工系统工程', url: 'https://kyotofusioneering.com/', icon: Boxes, tags: ['日本', '回旋管', '液态金属包层'], text: '开发回旋管射频加热系统、液态金属增殖包层与氚增殖回路。' }
    ]
  },
  {
    key: 'MESH & POST',
    title: '几何造型、高阶网格与科学可视化 (Mesh & Post)',
    description: '从复杂三维 CAD 几何、自适应非结构多面体网格到大规模并行渲染引擎。',
    items: [
      { name: 'Gmsh', subtitle: '脚本化三维有限元网格生成器', url: 'https://gmsh.info/', icon: Grid3X3, featured: true, tags: ['网格生成', 'CAD 内核', '开源'], text: '支持几何建模、高阶曲面网格与参数化批处理网格划分。' },
      { name: 'SALOME', subtitle: '核工业与通用仿真前处理集成平台', url: 'https://www.salome-platform.org/', icon: Boxes, tags: ['CAD / Mesh', '求解器集成', 'CEA / EDF'], text: '集成 OpenCASCADE 几何建模、SMESH 复杂网格与 ParaVis 后处理。' },
      { name: 'ParaView', subtitle: '大规模多变量科学数据并行可视化', url: 'https://www.paraview.org/', icon: Layers3, featured: true, tags: ['VTK', '超算后处理', '并行渲染'], text: '全球科研与工程界标准的并行数据分析与高质量等值面/流线渲染套件。' },
      { name: 'PyVista', subtitle: 'Python 3D 网格流体场交互分析', url: 'https://pyvista.org/', icon: Code2, tags: ['Python', 'VTK', '3D 渲染'], text: '基于 Python 快速执行 VTK 空间切片、矢量流线与网格拓扑计算。' }
    ]
  },
  {
    key: 'MATH & TOOLS',
    title: '在线理论计算与偏微分方程工具 (Math & Tools)',
    description: '无需本地安装，快速验证解析解、时空 PDE 演化与多元微积分几何。',
    items: [
      { name: 'VisualPDE', subtitle: '浏览器端 PDE 反应扩散波动实时仿真', url: 'https://visualpde.com/', icon: Waves, featured: true, tags: ['PDE', '实时 GPU 求解', '无需安装'], text: '实时交互调整初始条件与边界条件，直观呈现偏微分方程时空波形。' },
      { name: 'WolframAlpha', subtitle: '微分方程符号解析解与特征曲线', url: 'https://www.wolframalpha.com/examples/mathematics/differential-equations', icon: Sigma, featured: true, tags: ['ODE / PDE', '符号推导', '精确解'], text: '核对常微分与偏微分方程闭式解、特征值与本征模态。' },
      { name: 'GeoGebra CAS', subtitle: '计算机代数系统与常微分方程', url: 'https://www.geogebra.org/cas', icon: Braces, tags: ['CAS', 'Runge-Kutta', '矢量场'], text: '快速求解初边值常微分方程并动态绘制积分曲线与方向场。' },
      { name: 'SageMathCell', subtitle: '可复现的开源数学与张量计算脚本', url: 'https://sagecell.sagemath.org/', icon: Code2, tags: ['Python', '符号微积分', '开源'], text: '在线运行 Python 与 Sage 脚本，验证张量场、广义坐标与微分几何。' }
    ]
  }
]

function Resources() {
  useDocumentTitle('资源导航')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('ALL')

  const visibleGroups = resourceGroups
    .map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          (category === 'ALL' || group.key === category) &&
          `${item.name} ${item.subtitle} ${item.text} ${item.tags.join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0)

  return (
    <div className="resources-page">
      <section className="resource-hero section-shell">
        <div>
          <Eyebrow>FUSION & ENGINEERING SIMULATION HUB</Eyebrow>
          <h1>聚变与多物理场仿真导航器</h1>
          <p>
            全面汇集<strong>聚变代码库（MHD / 动理学 / 边缘输运）</strong>、<strong>开源连续介质多物理场工具（CFD / FEM）</strong>与<strong>全球重大聚变装置主体与创新企业</strong>。
          </p>
        </div>
      </section>

      {/* 搜索与分类 Tab */}
      <section className="section-shell resource-search">
        <label>
          <span>SEARCH CODES & ENTITIES</span>
          <input
            type="search"
            placeholder="搜索 EFIT、M3D-C1、OpenFOAM、ITER、CFS、W7-X…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
        <div className="category-filter-bar">
          {['ALL', ...resourceGroups.map(g => g.key)].map(k => (
            <button
              key={k}
              className={category === k ? 'active' : ''}
              onClick={() => setCategory(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      {/* 资源卡片网格 */}
      <section className="section-shell resource-directory">
        {visibleGroups.map(group => (
          <div className="resource-group" key={group.key}>
            <header>
              <span>{group.key}</span>
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </header>
            <div className="resource-grid">
              {group.items.map(item => {
                const Icon = item.icon
                const isInternal = item.url.startsWith('/')
                return (
                  <a
                    className={`resource-card${item.featured ? ' featured' : ''}`}
                    href={item.url}
                    target={isInternal ? undefined : '_blank'}
                    rel={isInternal ? undefined : 'noreferrer'}
                    key={item.name}
                  >
                    <div className="resource-card-top">
                      <span className="resource-icon">
                        <Icon size={20} />
                      </span>
                      {item.featured && <em>推荐</em>}
                      <ExternalLink size={15} />
                    </div>
                    <small>{item.subtitle}</small>
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    <div className="resource-tags">
                      {item.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route
          path="/lab"
          element={
            <Suspense
              fallback={
                <div className="route-loader">
                  <div className="spinner" />
                  <span>加载仿真实验室…</span>
                </div>
              }
            >
              <RealtimeLab />
            </Suspense>
          }
        />
        <Route path="/simulate" element={<Navigate to="/lab" replace />} />
        <Route path="/projects" element={<Devices />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Shell>
  )
}
