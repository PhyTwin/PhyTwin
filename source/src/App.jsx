import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, BookOpen, Braces, Calculator, Check, ChevronRight, Code2, Download, ExternalLink, Gauge, Grid3X3, Mail, Menu, Pause, Play, RotateCcw, Save, Sigma, Waves, X } from 'lucide-react'
import { capabilities, cases, validations } from './data'
import { downloadResult, modelMeta, presets, runSolver } from './lib/solver'

const colors = { cobalt: '#3157d5', cyan: '#16a6a1', ember: '#ef6a4c', moss: '#607768' }
const Plot = lazy(() => import('./components/Plot'))
const RealtimeLab = lazy(() => import('./pages/RealtimeLab'))
const CosmicExplorer = lazy(() => import('./components/CosmicExplorer'))
const plotConfig = { responsive: true, displaylogo: false, toImageButtonOptions: { format: 'png', filename: 'PhyTwin-result', scale: 3 } }
const baseLayout = {
  font: { family: 'Inter, system-ui, sans-serif', color: '#b8c9d8', size: 11 },
  paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
  margin: { l: 54, r: 20, t: 34, b: 48 }, hoverlabel: { bgcolor: '#07111d', font: { color: '#eaf4ff' } },
}

function useDocumentTitle(title) {
  useEffect(() => { document.title = `${title}｜PhyTwin` }, [title])
}

function Brand() {
  return <Link className="brand" to="/" aria-label="PhyTwin 首页"><span className="brand-mark">P</span><span><b>PhyTwin</b><small>CAE COMPUTE STUDIO</small></span></Link>
}

function Shell({ children }) {
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  useEffect(() => { setMobile(false); window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])
  const links = [['/', '首页'], ['/capabilities', '计算能力'], ['/lab', '实时实验室'], ['/projects', '项目案例'], ['/resources', '资源链接']]
  return <div className={location.pathname === '/' ? 'home-route' : ''}>
    <header className="topbar">
      <Brand />
      <nav className="desktop-nav" aria-label="主导航">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      <div className="header-actions">
        <a className="icon-link" href="https://github.com/PhyTwin/PhyTwin" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={18} /></a>
        <button className="mobile-menu" onClick={() => setMobile(!mobile)} aria-label="菜单">{mobile ? <X /> : <Menu />}</button>
      </div>
    </header>
    {mobile && <nav className="mobile-nav">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}<ChevronRight size={16} /></NavLink>)}</nav>}
    <main>{children}</main>
    <footer>
      <div><Brand /><p>用可复现的计算，把工程判断变成证据。</p></div>
      <div className="footer-links"><Link to="/lab">实时实验室</Link><Link to="/projects">案例</Link><Link to="/resources">资源链接</Link><a href="https://github.com/PhyTwin/PhyTwin">GitHub</a><a href="mailto:phytwin@outlook.com">phytwin@outlook.com</a></div>
      <span className="copyright">© 2026 PhyTwin · www.phytwin.com</span>
    </footer>
  </div>
}

function Eyebrow({ children }) { return <div className="eyebrow"><span />{children}</div> }
function SectionTitle({ eyebrow, title, lead }) { return <div className="section-title"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{lead && <p>{lead}</p>}</div> }

function FieldPreview({ type = 'stress', compact = false }) {
  const heat = type === 'thermal'
  const flow = type === 'flow'
  const z = Array.from({ length: 18 }, (_, j) => Array.from({ length: 32 }, (_, i) => {
    const x = (i - 15.5) / 15.5; const y = (j - 8.5) / 8.5
    if (flow) return Math.min(2, Math.abs(y) + 0.25 + 1.2 * Math.exp(-7 * ((x + .2) ** 2 + y ** 2)))
    if (heat) return 1 - i / 31 + .22 * Math.sin(Math.PI * i / 31) * Math.cos(Math.PI * y)
    return Math.max(0, 1 - i / 35) * Math.abs(y)
  }))
  const scale = heat ? [[0,'#293480'],[.25,'#2c7bb6'],[.5,'#70cdb5'],[.72,'#f4d35e'],[1,'#d94841']] : flow ? [[0,'#173b57'],[.4,'#168d9c'],[.72,'#b7d578'],[1,'#f2c14e']] : [[0,'#213b67'],[.28,'#2e77b5'],[.55,'#79c9b8'],[.78,'#f5c761'],[1,'#dc4b46']]
  return <div className={`field-preview ${compact ? 'compact' : ''}`}><Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ z, type: 'heatmap', colorscale: scale, showscale: !compact, colorbar: { thickness: 8, outlinewidth: 0, tickfont: { size: 8 } } }]} layout={{ ...baseLayout, margin: compact ? { l: 0, r: 0, t: 0, b: 0 } : { l: 10, r: 35, t: 10, b: 10 }, xaxis: { visible: false }, yaxis: { visible: false }, height: compact ? 180 : 340 }} config={{ ...plotConfig, displayModeBar: false }} style={{ width: '100%' }} /></Suspense></div>
}

function Home() {
  useDocumentTitle('多物理场仿真与计算平台')
  return <>
    <section className="cosmic-home-hero"><Suspense fallback={<div className="cosmic-fallback"><div className="spinner"/><span>生成银河系旋臂…</span></div>}><CosmicExplorer/></Suspense></section>

    <section className="section-shell capability-section" id="capability-map">
      <SectionTitle eyebrow="CAPABILITY MAP" title="从单场分析到设计决策" lead="每一项能力都对应清晰的物理假设、收敛证据与可交付工程指标。" />
      <div className="capability-grid">{capabilities.map((item) => <article className="capability-card" key={item.id}>
        <div className="capability-head"><span>{item.id}</span><i style={{ background: colors[item.color] }} /></div><small>{item.key}</small><h3>{item.title}</h3><p className="subtitle">{item.subtitle}</p><p>{item.description}</p><div className="card-metric"><b>{item.metric}</b><span>{item.label}</span></div>
      </article>)}</div>
    </section>

    <section className="dark-section"><div className="section-shell split-showcase">
      <div><Eyebrow>LIVE COMPUTE</Eyebrow><h2>不是视频演示，<br />是真正在浏览器中演化。</h2><p>调节翼型、攻角、温升与湍动参数，实时观察粒子流场和三维热羽流；需要工程指标时，再进入可复现的参数化求解工作台。</p><Link className="light-button" to="/lab">打开实时实验室<ArrowRight size={16} /></Link></div>
      <div className="mini-console"><div className="console-title"><span>求解日志</span><span className="live-dot">LIVE</span></div>{['初始化有限元模型','装配全局刚度矩阵','应用位移与载荷边界','PCG 迭代求解 · 22 steps','后处理等效应力'].map((x,i)=><div className="log-line" key={x}><Check size={14}/><span>0{`0${i+1}`.slice(-2)}</span>{x}<em>{[12,28,43,91,118][i]} ms</em></div>)}<div className="console-result"><span>STATUS</span><b>CONVERGED</b><span>ERROR</span><b>1.6%</b></div></div>
    </div></section>

    <section className="section-shell case-section">
      <SectionTitle eyebrow="SELECTED WORK" title="工程案例，不止一张云图" lead="把仿真过程转译为设计约束、性能变化与可执行结论。" />
      <div className="case-grid">{cases.map((item) => <Link to="/projects" className="case-card" key={item.title}><FieldPreview type={item.palette} compact /><div className="case-copy"><div><span>{item.type}</span><small>{item.tag}</small></div><h3>{item.title}</h3><p>{item.detail}</p><strong>{item.result}</strong></div></Link>)}</div>
    </section>

    <section className="section-shell contact-banner"><div><Eyebrow>BUILD A COMPUTABLE TWIN</Eyebrow><h2>把真实世界映射成可以运行、验证与预测的数字孪生。</h2></div><a className="primary-button" href="mailto:phytwin@outlook.com"><Mail size={17} />联系 PhyTwin</a></section>
  </>
}

function Capabilities() {
  useDocumentTitle('CAE 专业能力')
  return <>
    <section className="page-hero section-shell"><Eyebrow>CAE CAPABILITIES</Eyebrow><h1>从物理问题到可信结论</h1><p>以验证与确认（V&amp;V）为主线组织建模、求解、后处理和工程决策。</p></section>
    <section className="section-shell process-grid">{['问题定义','数值建模','求解控制','验证确认','工程决策'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>{['识别载荷路径、时间尺度与控制指标','选择方程、单元、材料与边界条件','监控残差、守恒量和目标响应','解析解、实验或高保真模型交叉验证','灵敏度、裕量与优化建议'][i]}</p></div>)}</section>
    <section className="section-shell capability-detail-list">{capabilities.map((item,i)=><article key={item.id}><div><span className="detail-index">{item.id}</span><Eyebrow>{item.key}</Eyebrow><h2>{item.title}</h2><p>{item.description}</p><ul>{[
        ['电荷守恒与源项闭合','鞘层网格与时间步收敛','输运系数与反应机制审查'],
        ['散度约束与边界条件审查','频率 / 网格收敛','损耗与功率闭合'],
        ['质量、动量与能量守恒','激波与近壁分辨率控制','残差与积分量双收敛'],
        ['界面捕捉与质量平衡','旋转域 / 多相模型审查','压降、流量与空化指标'],
        ['热阻网络与能量闭合','温度相关物性','热点与热流路径识别'],
        ['组分守恒与反应源项','Peclet / Damköhler 分析','浓度与通量交叉验证'],
      ][i].map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul></div><FieldPreview type={['thermal','stress','flow','flow','thermal','thermal'][i]} /></article>)}</section>
    <section className="section-shell validation"><SectionTitle eyebrow="VERIFICATION" title="精度不是口号，是可以检查的记录" /><div className="validation-table"><div><b>验证算例</b><b>参照方法</b><b>相对误差</b></div>{validations.map(row=><div key={row[0]}>{row.map((x,i)=><span key={x} className={i===2?'good':''}>{x}</span>)}</div>)}</div></section>
  </>
}

const parameterSchema = {
  plasma: [['majorRadius','大半径 R₀','m'],['minorRadius','小半径 a','m'],['plasmaCurrent','等离子体电流','MA'],['toroidalField','环向磁场','T'],['elongation','拉长比 κ','—']],
  motor: [['frequency','电源频率','Hz'],['polePairs','极对数','p'],['voltage','线电压','V'],['slip','转差率','—'],['radius','转子半径','m']],
  gas: [['speed','来流速度','m/s'],['density','气体密度','kg/m³'],['radius','圆柱半径','m'],['viscosity','动力黏度','Pa·s'],['angle','攻角','deg']],
  pipe: [['velocity','平均流速','m/s'],['diameter','管径','m'],['density','液体密度','kg/m³'],['viscosity','动力黏度','Pa·s'],['roughness','绝对粗糙度','m'],['length','管长','m']],
  thermal: [['width','板宽','m'],['height','板高','m'],['hot','热端温度','K'],['cold','冷端温度','K'],['conductivity','导热系数','W/mK'],['source','体热源','W/m³']],
  ocean: [['current','海流速度','m/s'],['diffusivity','扩散系数','m²/s'],['mass','释放质量','kg'],['decay','衰减率','s⁻¹'],['time','计算时间','s']],
}

function ResultPlot({ result, tab }) {
  if (!result) return null
  const title = modelMeta[result.model]
  if (tab === 'curve') return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ x:result.curveX,y:result.curveY,type:'scatter',mode:'lines',line:{color:'#55d6ff',width:2.5},fill:'tozeroy',fillcolor:'rgba(85,214,255,.08)',name:result.curveTitle }]} layout={{...baseLayout,title:{text:result.curveTitle,x:.02,font:{size:13}},xaxis:{title:result.curveXTitle,gridcolor:'#1d3447',zeroline:false},yaxis:{title:result.curveYTitle,gridcolor:'#1d3447',zerolinecolor:'#526a7b'},height:420,showlegend:false}} config={plotConfig} style={{width:'100%'}} /></Suspense>
  if (tab === 'residual') return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ x: result.convergence.map((_,i)=>i+1), y: result.convergence, type:'scatter', mode:'lines+markers', line:{color:'#16a6a1',width:2}, marker:{size:4}, name:'L₂ residual' }]} layout={{...baseLayout,title:{text:'迭代收敛历史',x:.02,font:{size:13}},xaxis:{title:'Iteration',gridcolor:'#e6e8e3'},yaxis:{title:'L₂ residual',type:'log',gridcolor:'#e6e8e3'},height:420,showlegend:false}} config={plotConfig} style={{width:'100%'}} /></Suspense>
  return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{x:result.x,y:result.y,z:result.z,type:'heatmap',connectgaps:false,colorscale:result.model==='plasma'?[[0,'#1a1747'],[.35,'#4732a8'],[.7,'#2dd4d7'],[1,'#ffe8aa']]:result.model==='ocean'?[[0,'#071828'],[.25,'#124a7c'],[.55,'#20a3a5'],[.8,'#e2cc61'],[1,'#e95b4d']]:[[0,'#173b57'],[.35,'#168d9c'],[.72,'#b7d578'],[1,'#f2c14e']],colorbar:{title:{text:title.unit},thickness:12,outlinewidth:0},hovertemplate:'x=%{x:.3f}<br>y=%{y:.3f}<br>value=%{z:.3g}<extra></extra>'}]} layout={{...baseLayout,title:{text:`${title.name} · ${title.legend}`,x:.02,font:{size:13}},xaxis:{title:result.model==='ocean'?'x (km)':'x (m)',scaleanchor:'y',gridcolor:'#1d3447'},yaxis:{title:result.model==='ocean'?'y (km)':'y (m)',gridcolor:'#1d3447'},height:420}} config={plotConfig} style={{width:'100%'}} /></Suspense>
}

function Simulator({ embedded = false }) {
  useDocumentTitle(embedded ? '实时实验室' : '在线实时仿真')
  const [model, setModel] = useState('plasma'); const [params, setParams] = useState(presets.plasma)
  const [result, setResult] = useState(() => runSolver('plasma', presets.plasma)); const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(100); const [error, setError] = useState(''); const [tab, setTab] = useState('field')
  const [logs, setLogs] = useState(['载入默认模型与参数','基准解已就绪']); const [saved, setSaved] = useState(false)
  function changeModel(next) { setModel(next); setParams(presets[next]); setResult(runSolver(next,presets[next])); setLogs(['切换求解模型',`${modelMeta[next].method} 已就绪`]); setProgress(100); setError('') }
  function run() {
    setError(''); setRunning(true); setProgress(8); setLogs(['检查输入参数与量纲…'])
    const steps = [[26,'生成计算域与节点…'],[48,'施加材料与边界条件…'],[72,'装配并求解控制方程…'],[91,'计算派生场量与工程指标…']]
    steps.forEach(([value,text],i)=>setTimeout(()=>{setProgress(value);setLogs(prev=>[...prev,text])},220*(i+1)))
    setTimeout(()=>{try{const solved=runSolver(model,params);setResult(solved);setProgress(100);setLogs(prev=>[...prev,'收敛判据满足 · 后处理完成']);}catch(e){setError(e.message);setLogs(prev=>[...prev,`错误：${e.message}`])}finally{setRunning(false)}},1200)
  }
  function saveScheme(){localStorage.setItem('phytwin-scheme',JSON.stringify({model,params}));setSaved(true);setTimeout(()=>setSaved(false),1800)}
  return <section className={`simulator-page${embedded ? ' embedded-simulator' : ''}`} id="solver-workbench">
    <div className="sim-header"><div><Eyebrow>PARAMETRIC SOLVER</Eyebrow><h1>参数求解工作台</h1><p>位于实时实验室下方 · 参数可复现 · 结果可导出</p></div><div className="sim-status"><span className="live-dot">READY</span><small>{modelMeta[model].method}</small></div></div>
    <div className="sim-workspace">
      <aside className="parameter-panel">
        <div className="panel-head"><span>01</span><div><b>模型与参数</b><small>INPUT DEFINITION</small></div></div>
        <label className="field-label">求解模型</label>
        <div className="model-select multiphysics-select">{Object.entries(modelMeta).map(([key,m])=><button key={key} className={model===key?'active':''} onClick={()=>changeModel(key)}>{({plasma:'托卡马克',motor:'电机',gas:'气体',pipe:'管流',thermal:'热传输',ocean:'海洋传质'})[key]}<small>{m.name}</small></button>)}</div>
        <div className="parameter-fields">{parameterSchema[model].map(([key,label,unit])=><label key={key}><span>{label}<em>{unit}</em></span><input type="number" step="any" value={params[key]} onChange={e=>setParams({...params,[key]:e.target.value})}/></label>)}</div>
        {error && <div className="error-message">{error}</div>}
        <button className="run-button" onClick={run} disabled={running}>{running?<><Pause size={17}/>计算中 {progress}%</>:<><Play size={17} fill="currentColor"/>运行仿真</>}</button>
        <div className="progress-track"><i style={{width:`${progress}%`}}/></div>
        <div className="parameter-actions"><button onClick={()=>{setParams(presets[model]);setError('')}}><RotateCcw size={14}/>重置</button><button onClick={saveScheme}><Save size={14}/>{saved?'已保存':'保存方案'}</button></div>
      </aside>
      <section className="log-panel"><div className="panel-head"><span>02</span><div><b>计算输出</b><small>SOLVER OUTPUT</small></div></div><div className="chat-log"><div className="assistant-message"><span className="ai-mark">P</span><div><b>PhyTwin Solver</b><p>模型已就绪。将基于输入参数执行 <strong>{modelMeta[model].name}</strong>。</p></div></div>{logs.map((log,i)=><div className="solver-log" key={`${log}-${i}`}><span>{String(i+1).padStart(2,'0')}</span><p>{log}</p>{i===logs.length-1&&<Check size={14}/>}</div>)}</div>{result&&<div className="insight-card"><Gauge size={18}/><div><b>工程判断</b><p>{result.insight}</p></div></div>}</section>
      <section className="result-panel"><div className="result-top"><div className="panel-head"><span>03</span><div><b>结果可视化</b><small>SCIENTIFIC VISUALIZATION</small></div></div><button onClick={()=>downloadResult(result)} disabled={!result}><Download size={15}/>下载</button></div>
        <div className="plot-tabs">{[['field','场云图'],['curve','剖面曲线'],['residual','收敛性']].map(([key,label])=><button key={key} onClick={()=>setTab(key)} className={tab===key?'active':''}>{label}</button>)}</div>
        <div className={running?'plot-wrap loading':'plot-wrap'}>{running&&<div className="compute-overlay"><div className="spinner"/><b>求解中</b><span>{progress}%</span></div>}<ResultPlot result={result} tab={tab}/></div>
        {result&&<div className="result-stats">{result.stats.map(([label,value,unit])=><div key={label}><span>{label}</span><b>{value}</b><small>{unit}</small></div>)}</div>}
      </section>
    </div>
    <p className="sim-disclaimer">在线模型用于展示自研求解与数据链路；工程项目将进一步执行材料标定、网格无关性、实验验证和不确定性评估。</p>
  </section>
}

function Projects() {
  useDocumentTitle('CAE 项目案例')
  return <><section className="page-hero section-shell"><Eyebrow>ENGINEERING PORTFOLIO</Eyebrow><h1>六类物理场，六条可验证的计算链路</h1><p>等离子体、电磁场、气体、液体、热传输与传质计算，从控制方程一直走到工程指标。</p></section><section className="section-shell project-list">{cases.map((item,i)=><article key={item.title}><div className="project-visual"><FieldPreview type={item.palette}/><span>CASE / {String(i+1).padStart(2,'0')}</span></div><div className="project-copy"><Eyebrow>{item.tag}</Eyebrow><h2>{item.title}</h2><p>{item.detail}</p><div className="project-result"><span>KEY RESULT</span><b>{item.result}</b></div><dl><div><dt>工程目标</dt><dd>{item.objective}</dd></div><div><dt>可信度控制</dt><dd>{item.validation}</dd></div><div><dt>工具链</dt><dd>{item.tools}</dd></div></dl><button className="code-peek"><Code2 size={16}/>查看方法摘要<ChevronRight size={15}/></button></div></article>)}</section></>
}

const resourceGroups = [
  {
    key: 'ODE / PDE', title: '微分方程求解', description: '从符号解、数值积分到浏览器端偏微分方程交互，覆盖建模、验证和教学演示。',
    items: [
      { name: 'VisualPDE', subtitle: '浏览器端 PDE 交互仿真', url: 'https://visualpde.com/', icon: Waves, featured: true, tags: ['PDE', '实时可视化', '无需安装'], text: '直接创建、修改并观察一维或二维偏微分方程的时空演化，适合快速探索反应扩散、波动与输运问题。' },
      { name: 'WolframAlpha', subtitle: '常微分与偏微分方程', url: 'https://www.wolframalpha.com/examples/mathematics/differential-equations', icon: Sigma, featured: true, tags: ['ODE', 'PDE', '符号 / 数值'], text: '用于查询微分方程解析解、数值解、方向场与典型边值问题，是快速核对推导结果的通用入口。' },
      { name: 'GeoGebra CAS', subtitle: 'SolveODE 符号与数值求解', url: 'https://www.geogebra.org/cas', icon: Braces, tags: ['ODE', 'CAS', 'Runge–Kutta'], text: '在 CAS 中输入 SolveODE(...) 处理常见一、二阶常微分方程，并可将结果继续用于图形分析。' },
      { name: 'SageMathCell', subtitle: '可复现的开源数学计算', url: 'https://sagecell.sagemath.org/', icon: Code2, tags: ['ODE / PDE', 'Python', '开源'], text: '在线运行 Sage 代码，适合用 desolve、数值积分和符号计算构建可复制、可分享的方程求解过程。' },
      { name: 'Wave Equation Explorer', subtitle: '交互式波动方程演示', url: 'https://math.uchicago.edu/~luis/pde/wave.html', icon: Waves, tags: ['PDE', '波动方程', '边界条件'], text: '绘制初始位形并观察波的传播，可切换固定端与自由端边界，直观看到边界条件如何改变解。' },
    ],
  },
  {
    key: 'MATH / 3D', title: '数学计算与三维可视化', description: '通用方程、符号计算与多元微积分三维绘图工具。',
    items: [
      { name: 'Number Empire', subtitle: '中文在线方程求解器', url: 'https://zh.numberempire.com/equationsolver.php', icon: Calculator, tags: ['代数方程', '方程组', '中文'], text: '支持线性、多项式、指数、三角与对数方程，以及多个方程组成的方程组；适合快速验证基础计算。' },
      { name: 'CalcPlot3D / C3D', subtitle: '多元微积分三维绘图', url: 'https://c3d.libretexts.org/CalcPlot3D/index.html', icon: Grid3X3, tags: ['函数曲面', '向量场', '参数曲面'], text: '交互查看函数曲面、空间曲线、隐式与参数曲面、向量场和旋转体，并可自由旋转三维视角。' },
    ],
  },
]

function Resources() {
  useDocumentTitle('资源链接')
  return <div className="resources-page">
    <section className="resource-hero section-shell">
      <div><Eyebrow>ENGINEERING TOOLKIT</Eyebrow><h1>把可靠的数学工具，<br/>放进同一个入口。</h1><p>面向建模、推导与数值验证精选的在线资源。无需安装软件，即开即用；外部工具会在新标签页打开。</p></div>
      <div className="resource-hero-orbit" aria-hidden="true"><span>∂u/∂t</span><span>∇²u</span><span>dy/dx</span><i /></div>
    </section>
    <section className="section-shell resource-directory">
      {resourceGroups.map((group) => <div className="resource-group" key={group.key}>
        <header><span>{group.key}</span><div><h2>{group.title}</h2><p>{group.description}</p></div></header>
        <div className="resource-grid">{group.items.map((item) => {
          const Icon = item.icon
          return <a className={`resource-card${item.featured ? ' featured' : ''}`} href={item.url} target="_blank" rel="noreferrer" key={item.name}>
            <div className="resource-card-top"><span className="resource-icon"><Icon size={21}/></span>{item.featured && <em>推荐</em>}<ExternalLink size={16}/></div>
            <small>{item.subtitle}</small><h3>{item.name}</h3><p>{item.text}</p>
            <div className="resource-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </a>
        })}</div>
      </div>)}
    </section>
    <section className="section-shell resource-guide">
      <div><BookOpen size={20}/><span>HOW TO CHOOSE</span></div>
      <ol><li><b>快速检查解析或数值结果</b><p>优先使用 WolframAlpha 或 GeoGebra CAS。</p></li><li><b>探索 PDE 的时空演化</b><p>使用 VisualPDE，并明确写下初始条件与边界条件。</p></li><li><b>保留可复现计算过程</b><p>使用 SageMathCell，以代码记录公式、参数和求解方法。</p></li></ol>
      <p className="resource-note">这些链接指向第三方服务。提交保密工程数据前，请先确认对方的隐私政策与使用条款。</p>
    </section>
  </div>
}

export default function App() {
  return <Shell><Routes><Route path="/" element={<Home/>}/><Route path="/capabilities" element={<Capabilities/>}/><Route path="/lab" element={<><Suspense fallback={<div className="route-loader"><div className="spinner"/><span>加载实时实验室…</span></div>}><RealtimeLab/></Suspense><Simulator embedded/></>}/><Route path="/simulate" element={<Navigate to="/lab#solver-workbench" replace/>}/><Route path="/projects" element={<Projects/>}/><Route path="/resources" element={<Resources/>}/><Route path="/about" element={<Navigate to="/" replace/>}/><Route path="*" element={<Home/>}/></Routes></Shell>
}
