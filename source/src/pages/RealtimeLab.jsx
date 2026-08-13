import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Atom, ChevronRight, Droplets, Flame, Gauge, Info, Magnet, MousePointer2, Pause, Play, RotateCcw, Sparkles, TestTubes, Wind } from 'lucide-react'
import WindTunnelCanvas from '../components/WindTunnelCanvas'

const ThermalPlume3D = lazy(() => import('../components/ThermalPlume3D'))

const windDefaults = { airfoil: '2412', speed: 42, angle: 6, chord: 1.2, density: 1.225, turbulence: .28 }
const plumeDefaults = { heat: 620, buoyancy: 1.2, turbulence: .68, wind: .25 }
const fieldDefaults = { plasma:{drive:62,diffusion:.36,coupling:.72}, em:{drive:48,diffusion:.22,coupling:.64}, liquid:{drive:55,diffusion:.42,coupling:.58}, mass:{drive:46,diffusion:.55,coupling:.68} }
const modes = {
  plasma:{label:'等离子体',short:'PLASMA',icon:Atom,method:'漂移扩散 + 泊松耦合',note:'实时场用于观察电离源、扩散和电势耦合的趋势；工程求解需进一步引入反应截面、鞘层网格与能量方程。'},
  em:{label:'电磁场',short:'E / B FIELD',icon:Magnet,method:'Maxwell 场线代理模型',note:'显示激励频率、材料扩散和耦合强度对场线及损耗区的影响；高频工程问题需使用全波有限元或时域方法。'},
  gas:{label:'气体计算',short:'GAS FLOW',icon:Wind,method:'薄翼理论 + 势流粒子对流',note:'用于快速观察翼型、攻角和来流参数的趋势。升阻力来自修正薄翼理论，粒子场用于交互演示；不替代 RANS / LES。'},
  liquid:{label:'液体计算',short:'LIQUID',icon:Droplets,method:'不可压缩涡量输运代理',note:'展示驱动、黏性扩散和界面耦合对液体涡结构的影响；工程应用需进一步求解压力泊松方程与自由液面。'},
  thermal:{label:'热传输',short:'HEAT',icon:Flame,method:'浮力粒子输运 + 湍动扰动',note:'用于演示浮力、热衰减、湍动与横向来流对羽流形态的影响，不替代辐射、相变或燃烧耦合 CFD。'},
  mass:{label:'传质计算',short:'MASS',icon:TestTubes,method:'对流扩散反应代理模型',note:'展示 Peclet、扩散和反应耦合对浓度羽流的影响；工程计算需进一步标定多组分物性和反应动力学。'},
}

function RangeField({ label, value, min, max, step, unit, onChange }) {
  const progress = (Number(value) - min) / (max - min) * 100
  return <label className="lab-range">
    <span><b>{label}</b><output>{Number(value).toFixed(step < .1 ? 2 : step < 1 ? 1 : 0)} <small>{unit}</small></output></span>
    <input type="range" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} style={{ '--range-progress': `${progress}%` }}/>
  </label>
}

function Metric({ label, value, unit, accent }) {
  return <div className={accent ? 'lab-metric accent' : 'lab-metric'}><span>{label}</span><strong>{value}</strong><small>{unit}</small></div>
}

function WindControls({ params, setParams }) {
  const set = (key) => (value) => setParams((current) => ({ ...current, [key]: value }))
  return <>
    <div className="lab-control-group">
      <span className="lab-control-label">翼型截面</span>
      <div className="airfoil-presets">{['0012', '2412', '4412'].map((code) => <button key={code} className={params.airfoil === code ? 'active' : ''} onClick={() => set('airfoil')(code)}>NACA {code}</button>)}</div>
    </div>
    <div className="lab-control-group range-stack">
      <RangeField label="自由来流" value={params.speed} min={10} max={90} step={1} unit="m/s" onChange={set('speed')}/>
      <RangeField label="攻角 α" value={params.angle} min={-8} max={18} step={.5} unit="deg" onChange={set('angle')}/>
      <RangeField label="弦长" value={params.chord} min={.4} max={2.5} step={.1} unit="m" onChange={set('chord')}/>
      <RangeField label="湍动强度" value={params.turbulence} min={0} max={1} step={.01} unit="I" onChange={set('turbulence')}/>
    </div>
  </>
}

function PlumeControls({ params, setParams }) {
  const set = (key) => (value) => setParams((current) => ({ ...current, [key]: value }))
  return <div className="lab-control-group range-stack plume-ranges">
    <RangeField label="温升 ΔT" value={params.heat} min={120} max={1100} step={10} unit="K" onChange={set('heat')}/>
    <RangeField label="浮力系数" value={params.buoyancy} min={.2} max={2.4} step={.05} unit="B" onChange={set('buoyancy')}/>
    <RangeField label="湍动强度" value={params.turbulence} min={0} max={1.4} step={.02} unit="I" onChange={set('turbulence')}/>
    <RangeField label="横向来流" value={params.wind} min={0} max={2.5} step={.05} unit="m/s" onChange={set('wind')}/>
  </div>
}

function GenericControls({ params, setParams, mode }) {
  const set=(key)=>(value)=>setParams(current=>({...current,[key]:value}))
  return <div className="lab-control-group range-stack plume-ranges">
    <RangeField label={mode==='em'?'激励频率':'驱动强度'} value={params.drive} min={10} max={100} step={1} unit={mode==='em'?'kHz':'%'} onChange={set('drive')}/>
    <RangeField label={mode==='liquid'?'黏性扩散':'扩散系数'} value={params.diffusion} min={.05} max={1} step={.01} unit="D" onChange={set('diffusion')}/>
    <RangeField label={mode==='plasma'?'电势耦合':mode==='mass'?'反应耦合':'材料耦合'} value={params.coupling} min={.05} max={1.2} step={.01} unit="K" onChange={set('coupling')}/>
  </div>
}

function ConceptFieldCanvas({ mode, params, running, resetKey }) {
  const ref=useRef(null)
  useEffect(()=>{const canvas=ref.current,ctx=canvas.getContext('2d');let frame=0,t=0
    const draw=()=>{frame=requestAnimationFrame(draw);if(running)t+=.012;const dpr=Math.min(devicePixelRatio||1,2),rect=canvas.getBoundingClientRect(),w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}ctx.setTransform(dpr,0,0,dpr,0,0);const W=rect.width,H=rect.height;ctx.fillStyle='#060e19';ctx.fillRect(0,0,W,H)
      const palette=mode==='plasma'?['#7837ff','#58ddff','#ff79c9']:mode==='em'?['#4ec8ff','#a8f0ff','#ffd66b']:mode==='liquid'?['#1665b5','#4ee0d1','#d4fbff']:['#3149a8','#50d6be','#f4df70'];const bands=22
      for(let j=0;j<bands;j++){ctx.beginPath();for(let x=0;x<=W;x+=7){const y=H*(.15+j/(bands-1)*.7)+Math.sin(x*.013+t*(.7+params.drive*.012)+j*.52)*18*params.coupling+Math.cos(x*.005-t+j)*11*params.diffusion;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.strokeStyle=palette[j%palette.length];ctx.globalAlpha=.11+(j%4)*.035;ctx.lineWidth=1.2;ctx.stroke()}
      ctx.globalAlpha=.9;const cx=W*(.5+Math.sin(t*.35)*.08),cy=H*.5;const glow=ctx.createRadialGradient(cx,cy,2,cx,cy,Math.min(W,H)*.22);glow.addColorStop(0,palette[1]+'cc');glow.addColorStop(.35,palette[0]+'55');glow.addColorStop(1,'#00000000');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
    draw();return()=>cancelAnimationFrame(frame)},[mode,params,running,resetKey])
  return <canvas className="concept-field-canvas" ref={ref}/>
}

export default function RealtimeLab() {
  const [mode, setMode] = useState('gas')
  const [running, setRunning] = useState(true)
  const [view, setView] = useState('speed')
  const [resetKey, setResetKey] = useState(0)
  const [windParams, setWindParams] = useState(windDefaults)
  const [plumeParams, setPlumeParams] = useState(plumeDefaults)
  const [fieldParams, setFieldParams] = useState(fieldDefaults)
  const [windMetrics, setWindMetrics] = useState({ cl: .84, cd: .029, lift: 1089, reynolds: 3.41e6, ratio: 29 })
  const [plumeMetrics, setPlumeMetrics] = useState({ maxTemperature: 913, rise: 1.2, ri: 4.8, particles: 5200 })

  useEffect(() => { document.title = '浏览器实时实验室｜PhyTwin' }, [])
  const reset = () => {
    if (mode === 'gas') setWindParams(windDefaults); else if(mode==='thermal') setPlumeParams(plumeDefaults); else setFieldParams(current=>({...current,[mode]:fieldDefaults[mode]}))
    setResetKey((key) => key + 1); setRunning(true)
  }
  const metrics = useMemo(() => mode === 'gas' ? [
    ['升力系数 Cₗ', windMetrics.cl.toFixed(3), '—', true],
    ['阻力系数 Cᴅ', windMetrics.cd.toFixed(3), '—'],
    ['单位翼展升力', windMetrics.lift.toFixed(0), 'N/m'],
    ['雷诺数', `${(windMetrics.reynolds / 1e6).toFixed(2)}M`, 'Re'],
    ['升阻比', windMetrics.ratio.toFixed(1), 'L/D'],
  ] : mode === 'thermal' ? [
    ['峰值温度', plumeMetrics.maxTemperature.toFixed(0), 'K', true],
    ['羽流上升速度', plumeMetrics.rise.toFixed(2), 'm/s'],
    ['Richardson 数', plumeMetrics.ri.toFixed(2), 'Ri'],
    ['实时粒子', plumeMetrics.particles.toLocaleString(), 'points'],
  ] : [
    [mode==='plasma'?'峰值电子密度':mode==='em'?'峰值场强':mode==='liquid'?'最大速度':'峰值浓度', `${(fieldParams[mode].drive*(1+fieldParams[mode].coupling)).toFixed(1)}`, mode==='em'?'kV/m':mode==='liquid'?'m/s':'a.u.', true],
    ['扩散尺度',fieldParams[mode].diffusion.toFixed(2),'D'],['耦合强度',fieldParams[mode].coupling.toFixed(2),'K'],['实时场线','22','lines'],
  ], [mode, windMetrics, plumeMetrics, fieldParams])

  return <section className="realtime-lab-page">
    <div className="lab-intro section-shell">
      <div><div className="lab-eyebrow"><span className="pulse-dot"/>PHYTWIN REALTIME LAB / 60 FPS</div><h1>把六类物理场放进浏览器里。</h1><p>在等离子体、电磁、气体、液体、热传输与传质模型之间切换，拖动参数即可观察场结构与瞬态响应。</p></div>
      <div className="lab-intro-note"><Sparkles size={18}/><span><b>客户快捷体验</b>六类模型均已预载稳定工况，打开即可调整参数并观察响应。</span></div>
    </div>

    <div className="lab-shell">
      <header className="lab-toolbar">
        <div className="experiment-tabs">
          {Object.entries(modes).map(([key,item])=>{const Icon=item.icon;return <button key={key} className={mode===key?'active':''} onClick={()=>{setMode(key);setRunning(true)}}><Icon size={16}/>{item.label}<span>{key==='thermal'?'3D':'LIVE'}</span></button>})}
        </div>
        <div className="lab-run-state"><span className={running ? 'live' : ''}/>{running ? 'COMPUTING LIVE' : 'PAUSED'}</div>
        <div className="lab-toolbar-actions">
          <button onClick={() => setRunning((value) => !value)}>{running ? <Pause size={15}/> : <Play size={15} fill="currentColor"/>}{running ? '暂停' : '继续'}</button>
          <button onClick={reset}><RotateCcw size={15}/>重置</button>
        </div>
      </header>

      <div className="lab-workspace">
        <aside className="lab-controls">
          <div className="lab-panel-heading"><span>01</span><div><b>工况参数</b><small>BOUNDARY CONDITIONS</small></div></div>
          {mode === 'gas' ? <WindControls params={windParams} setParams={setWindParams}/> : mode==='thermal' ? <PlumeControls params={plumeParams} setParams={setPlumeParams}/> : <GenericControls mode={mode} params={fieldParams[mode]} setParams={(update)=>setFieldParams(current=>({...current,[mode]:typeof update==='function'?update(current[mode]):update}))}/>} 
          <div className="model-chip"><Activity size={15}/><div><b>{modes[mode].method}</b><span>{mode === 'thermal' ? 'TRANSIENT / THREE.JS WEBGL' : 'INSTANT / LOCAL FIELD'}</span></div></div>
        </aside>

        <main className="lab-viewport">
          <div className="viewport-hud top-left"><span>{mode === 'gas' ? `NACA ${windParams.airfoil}` : modes[mode].short}</span><b>{mode === 'gas' ? `${windParams.speed.toFixed(0)} m/s · α ${windParams.angle.toFixed(1)}°` : mode==='thermal'?`ΔT ${plumeParams.heat.toFixed(0)} K · B ${plumeParams.buoyancy.toFixed(2)}`:`DRIVE ${fieldParams[mode].drive.toFixed(0)} · COUPLING ${fieldParams[mode].coupling.toFixed(2)}`}</b></div>
          <div className="viewport-hud top-right"><span>LOCAL COMPUTE</span><b>NO SERVER REQUIRED</b></div>
          {mode === 'gas' ? <WindTunnelCanvas params={windParams} running={running} view={view} resetKey={resetKey} onMetrics={setWindMetrics}/> : mode==='thermal'?<Suspense fallback={<div className="lab-loading"><div className="spinner"/><span>初始化 WebGL 粒子场…</span></div>}><ThermalPlume3D params={plumeParams} running={running} resetKey={resetKey} onMetrics={setPlumeMetrics}/></Suspense>:<ConceptFieldCanvas mode={mode} params={fieldParams[mode]} running={running} resetKey={resetKey}/>} 
          <div className="viewport-help"><MousePointer2 size={14}/>{mode === 'gas' ? '在流场中拖动，注入瞬态涡扰动' : mode==='thermal'?'拖动旋转视角 · 滚轮缩放':'调整左侧参数，实时观察场结构演化'}</div>
          {mode === 'gas' && <div className="field-legend"><span>LOW</span><i className={`legend-${view}`}/><span>HIGH</span></div>}
        </main>

        <aside className="lab-diagnostics">
          <div className="lab-panel-heading"><span>02</span><div><b>实时诊断</b><small>LIVE DIAGNOSTICS</small></div></div>
          {mode === 'gas' && <div className="view-switch"><span>场变量</span>{[['speed', '速度'], ['pressure', '压力'], ['vorticity', '涡量']].map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}>{label}</button>)}</div>}
          <div className="lab-metrics">{metrics.map(([label, value, unit, accent]) => <Metric key={label} label={label} value={value} unit={unit} accent={accent}/>)}</div>
          <div className="solver-health"><Gauge size={17}/><div><span>TIME INTEGRATION</span><b>STABLE · Δt ADAPTIVE</b></div></div>
          <div className="lab-scope-note"><Info size={16}/><div><b>模型适用范围</b><p>{modes[mode].note}</p></div></div>
        </aside>
      </div>
    </div>

    <div className="lab-method section-shell">
      <div><span>MODEL TRANSPARENCY</span><h2>先让物理直觉可交互，<br/>再让工程结论可验证。</h2></div>
      <div className="method-steps">
        <div><b>01</b><span>即时响应</span><p>参数变化直接进入时间推进与指标计算，没有预录视频或假动画。</p></div>
        <ChevronRight/>
        <div><b>02</b><span>层级清晰</span><p>实时简化模型负责趋势探索，高保真求解负责最终工程判定。</p></div>
        <ChevronRight/>
        <div><b>03</b><span>继续扩展</span><p>后续可接入 WebGPU 体积求解器、WASM 内核与服务器侧 CFD 作业队列。</p></div>
      </div>
    </div>
  </section>
}
