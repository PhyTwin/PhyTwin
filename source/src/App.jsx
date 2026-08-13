import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Code2, Download, ExternalLink, Gauge, Mail, Menu, Pause, Play, RotateCcw, Save, X } from 'lucide-react'
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
  const links = [['/', '首页'], ['/capabilities', 'CAE 能力'], ['/lab', '实时实验室'], ['/simulate', '在线仿真'], ['/projects', '项目案例'], ['/about', '关于我']]
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
      <div className="footer-links"><Link to="/simulate">在线仿真</Link><Link to="/projects">案例</Link><a href="https://github.com/PhyTwin/PhyTwin">GitHub</a><a href="mailto:phytwin@outlook.com">phytwin@outlook.com</a></div>
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
    <section className="cosmic-home-hero"><Suspense fallback={<div className="cosmic-fallback"><div className="spinner"/><span>装载真实星空坐标…</span></div>}><CosmicExplorer/></Suspense></section>

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

    <section className="section-shell contact-banner"><div><Eyebrow>AVAILABLE FOR CAE ROLES</Eyebrow><h2>让复杂物理，变成清晰的工程判断。</h2></div><a className="primary-button" href="mailto:phytwin@outlook.com"><Mail size={17} />联系 PhyTwin</a></section>
  </>
}

function Capabilities() {
  useDocumentTitle('CAE 专业能力')
  return <>
    <section className="page-hero section-shell"><Eyebrow>CAE CAPABILITIES</Eyebrow><h1>从物理问题到可信结论</h1><p>以验证与确认（V&amp;V）为主线组织建模、求解、后处理和工程决策。</p></section>
    <section className="section-shell process-grid">{['问题定义','数值建模','求解控制','验证确认','工程决策'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>{['识别载荷路径、时间尺度与控制指标','选择方程、单元、材料与边界条件','监控残差、守恒量和目标响应','解析解、实验或高保真模型交叉验证','灵敏度、裕量与优化建议'][i]}</p></div>)}</section>
    <section className="section-shell capability-detail-list">{capabilities.slice(0,4).map((item,i)=><article key={item.id}><div><span className="detail-index">{item.id}</span><Eyebrow>{item.key}</Eyebrow><h2>{item.title}</h2><p>{item.description}</p><ul>{[
        ['载荷路径与边界条件审查','网格收敛 / GCI','失效准则与安全裕度'],
        ['质量与动量守恒','近壁 y+ 控制','残差与积分量双收敛'],
        ['热阻网络与能量闭合','温度相关物性','热点与热流路径识别'],
        ['场量映射与时间步协调','单向 / 双向耦合','系统指标与局部响应关联'],
      ][i].map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul></div><FieldPreview type={['stress','flow','thermal','thermal'][i]} /></article>)}</section>
    <section className="section-shell validation"><SectionTitle eyebrow="VERIFICATION" title="精度不是口号，是可以检查的记录" /><div className="validation-table"><div><b>验证算例</b><b>参照方法</b><b>相对误差</b></div>{validations.map(row=><div key={row[0]}>{row.map((x,i)=><span key={x} className={i===2?'good':''}>{x}</span>)}</div>)}</div></section>
  </>
}

const parameterSchema = {
  beam: [['length','梁长','m'],['width','截面宽','m'],['height','截面高','m'],['load','端部载荷','N'],['young','弹性模量','GPa'],['poisson','泊松比','—']],
  thermal: [['width','板宽','m'],['height','板高','m'],['hot','热端温度','K'],['cold','冷端温度','K'],['conductivity','导热系数','W/mK'],['source','体热源','W/m³']],
  flow: [['speed','来流速度','m/s'],['density','流体密度','kg/m³'],['radius','圆柱半径','m'],['viscosity','动力黏度','Pa·s'],['angle','攻角','deg']],
}

function ResultPlot({ result, tab }) {
  if (!result) return null
  const isFlow = result.model === 'flow'
  const title = modelMeta[result.model]
  if (tab === 'curve') return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ x: result.curveX, y: result.curveY, type: 'scatter', mode: 'lines', line: { color: '#3157d5', width: 2.5 }, fill: result.model === 'beam' ? 'tozeroy' : 'none', fillcolor: 'rgba(49,87,213,.08)', name: result.model === 'beam' ? '位移' : result.model === 'thermal' ? '中心线温度' : '压力系数 Cp' }]} layout={{ ...baseLayout, title: { text: result.model === 'beam' ? '沿梁轴向位移' : result.model === 'thermal' ? '中心线温度剖面' : '圆柱表面压力系数', x: .02, font: { size: 13 } }, xaxis: { title: result.model === 'flow' ? '周向角 θ (°)' : 'x (m)', gridcolor: '#e6e8e3', zeroline: false }, yaxis: { title: result.model === 'beam' ? '位移 (mm)' : result.model === 'thermal' ? '温度 (K)' : 'Cp (—)', gridcolor: '#e6e8e3', zerolinecolor: '#adb3aa' }, height: 420, showlegend: false }} config={plotConfig} style={{ width:'100%' }} /></Suspense>
  if (tab === 'residual') return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ x: result.convergence.map((_,i)=>i+1), y: result.convergence, type:'scatter', mode:'lines+markers', line:{color:'#16a6a1',width:2}, marker:{size:4}, name:'L₂ residual' }]} layout={{...baseLayout,title:{text:'迭代收敛历史',x:.02,font:{size:13}},xaxis:{title:'Iteration',gridcolor:'#e6e8e3'},yaxis:{title:'L₂ residual',type:'log',gridcolor:'#e6e8e3'},height:420,showlegend:false}} config={plotConfig} style={{width:'100%'}} /></Suspense>
  return <Suspense fallback={<div className="plot-skeleton"/>}><Plot data={[{ x: result.x, y: result.y, z: result.z, type: 'heatmap', connectgaps: false, colorscale: result.model==='thermal' ? [[0,'#293480'],[.25,'#2c7bb6'],[.5,'#70cdb5'],[.72,'#f4d35e'],[1,'#d94841']] : [[0,'#213b67'],[.28,'#2e77b5'],[.55,'#79c9b8'],[.78,'#f5c761'],[1,'#dc4b46']], colorbar:{title:{text:`${title.unit}`},thickness:12,outlinewidth:0}, hovertemplate: isFlow?'x=%{x:.3f} m<br>y=%{y:.3f} m<br>U=%{z:.2f} m/s<extra></extra>':'x=%{x:.3f} m<br>y=%{y:.3f} m<br>value=%{z:.2f}<extra></extra>' }]} layout={{...baseLayout,title:{text:`${title.name} · ${title.legend}`,x:.02,font:{size:13}},xaxis:{title:'x (m)',scaleanchor:'y',gridcolor:'#e6e8e3'},yaxis:{title:'y (m)',gridcolor:'#e6e8e3'},height:420}} config={plotConfig} style={{width:'100%'}} /></Suspense>
}

function Simulator() {
  useDocumentTitle('在线实时仿真')
  const [model, setModel] = useState('beam'); const [params, setParams] = useState(presets.beam)
  const [result, setResult] = useState(() => runSolver('beam', presets.beam)); const [running, setRunning] = useState(false)
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
  return <section className="simulator-page">
    <div className="sim-header"><div><Eyebrow>LIVE CAE STUDIO</Eyebrow><h1>在线实时仿真</h1><p>浏览器端计算 · 参数可复现 · 结果可导出</p></div><div className="sim-status"><span className="live-dot">READY</span><small>{modelMeta[model].method}</small></div></div>
    <div className="sim-workspace">
      <aside className="parameter-panel">
        <div className="panel-head"><span>01</span><div><b>模型与参数</b><small>INPUT DEFINITION</small></div></div>
        <label className="field-label">求解模型</label>
        <div className="model-select">{Object.entries(modelMeta).map(([key,m])=><button key={key} className={model===key?'active':''} onClick={()=>changeModel(key)}>{key==='beam'?'结构':key==='thermal'?'热传导':'流体'}<small>{m.name}</small></button>)}</div>
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
  return <><section className="page-hero section-shell"><Eyebrow>ENGINEERING PORTFOLIO</Eyebrow><h1>让每个案例回答一个工程问题</h1><p>完整展示目标、方法、验证、结论与设计影响。</p></section><section className="section-shell project-list">{cases.map((item,i)=><article key={item.title}><div className="project-visual"><FieldPreview type={item.palette}/><span>CASE / 0{i+1}</span></div><div className="project-copy"><Eyebrow>{item.tag}</Eyebrow><h2>{item.title}</h2><p>{item.detail}</p><div className="project-result"><span>KEY RESULT</span><b>{item.result}</b></div><dl><div><dt>工程目标</dt><dd>{['满足屈曲与强度约束下实现轻量化','降低器件结温并均匀化温度场','减少压差阻力并控制尾迹分离'][i]}</dd></div><div><dt>可信度控制</dt><dd>{['缺陷敏感性、网格收敛、材料曲线','能量闭合、热阻对比、网格无关性','y+ 检查、力系数稳定、守恒量监控'][i]}</dd></div><div><dt>工具链</dt><dd>{['Python · FEA · DOE','Python · FDM · CHT','Python · CFD · Plotly'][i]}</dd></div></dl><button className="code-peek"><Code2 size={16}/>查看方法摘要<ChevronRight size={15}/></button></div></article>)}</section></>
}

function About() {
  useDocumentTitle('关于我')
  return <><section className="about-hero section-shell"><div><Eyebrow>ABOUT / CAREER</Eyebrow><h1>CAE 工程师，<br/>也是仿真工具开发者。</h1><p>我关注的不只是求解器能否跑完，而是计算是否可信、结论能否帮助设计，以及知识能否沉淀为可复用工具。</p><div className="hero-actions"><a className="primary-button" href="mailto:phytwin@outlook.com"><Mail size={17}/>phytwin@outlook.com</a><a className="text-button" href="https://github.com/PhyTwin/PhyTwin" target="_blank" rel="noreferrer">GitHub<ExternalLink size={15}/></a></div></div><div className="profile-panel"><div className="profile-monogram">PT</div><span>CAE / MULTIPHYSICS / CODE</span><p>以第一性原理理解问题<br/>以数值方法构建模型<br/>以工程指标交付结论</p></div></section>
    <section className="section-shell value-grid">{[['01','工程建模','把真实研发问题转译为正确的物理模型与边界条件。'],['02','数值计算','控制离散、收敛、误差与稳定性，而不是黑盒操作。'],['03','工具开发','用 Python / React 把重复流程产品化，提升仿真效率。'],['04','技术沟通','让客户、设计师与决策者都能读懂仿真证据。']].map(x=><div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</section>
    <section className="dark-section"><div className="section-shell skill-stack"><div><Eyebrow>TECHNICAL STACK</Eyebrow><h2>跨越求解、数据与产品界面</h2></div><div>{['结构 / 热 / 流体 / 多物理耦合','FEM / FDM / CFD / V&V','Python / NumPy / SciPy / Matplotlib','React / Plotly / API / GitHub Pages','参数化 / DOE / 优化 / 自动化'].map(x=><span key={x}>{x}</span>)}</div></div></section>
    <section className="section-shell contact-banner"><div><Eyebrow>LET’S TALK</Eyebrow><h2>期待讨论 CAE、仿真平台与工程研发机会。</h2></div><a className="primary-button" href="mailto:phytwin@outlook.com"><Mail size={17}/>发送邮件</a></section></>
}

export default function App() {
  return <Shell><Routes><Route path="/" element={<Home/>}/><Route path="/capabilities" element={<Capabilities/>}/><Route path="/lab" element={<Suspense fallback={<div className="route-loader"><div className="spinner"/><span>加载实时实验室…</span></div>}><RealtimeLab/></Suspense>}/><Route path="/simulate" element={<Simulator/>}/><Route path="/projects" element={<Projects/>}/><Route path="/about" element={<About/>}/><Route path="*" element={<Home/>}/></Routes></Shell>
}
