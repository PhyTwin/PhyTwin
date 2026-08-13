import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Activity, Box, ChevronRight, Flame, Gauge, Info, MousePointer2, Pause, Play, RotateCcw, Sparkles, Wind } from 'lucide-react'
import WindTunnelCanvas from '../components/WindTunnelCanvas'

const ThermalPlume3D = lazy(() => import('../components/ThermalPlume3D'))

const windDefaults = { airfoil: '2412', speed: 42, angle: 6, chord: 1.2, density: 1.225, turbulence: .28 }
const plumeDefaults = { heat: 620, buoyancy: 1.2, turbulence: .68, wind: .25 }

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

export default function RealtimeLab() {
  const [mode, setMode] = useState('wind')
  const [running, setRunning] = useState(true)
  const [view, setView] = useState('speed')
  const [resetKey, setResetKey] = useState(0)
  const [windParams, setWindParams] = useState(windDefaults)
  const [plumeParams, setPlumeParams] = useState(plumeDefaults)
  const [windMetrics, setWindMetrics] = useState({ cl: .84, cd: .029, lift: 1089, reynolds: 3.41e6, ratio: 29 })
  const [plumeMetrics, setPlumeMetrics] = useState({ maxTemperature: 913, rise: 1.2, ri: 4.8, particles: 5200 })

  useEffect(() => { document.title = '浏览器实时实验室｜PhyTwin' }, [])
  const reset = () => {
    if (mode === 'wind') setWindParams(windDefaults); else setPlumeParams(plumeDefaults)
    setResetKey((key) => key + 1); setRunning(true)
  }
  const metrics = useMemo(() => mode === 'wind' ? [
    ['升力系数 Cₗ', windMetrics.cl.toFixed(3), '—', true],
    ['阻力系数 Cᴅ', windMetrics.cd.toFixed(3), '—'],
    ['单位翼展升力', windMetrics.lift.toFixed(0), 'N/m'],
    ['雷诺数', `${(windMetrics.reynolds / 1e6).toFixed(2)}M`, 'Re'],
    ['升阻比', windMetrics.ratio.toFixed(1), 'L/D'],
  ] : [
    ['峰值温度', plumeMetrics.maxTemperature.toFixed(0), 'K', true],
    ['羽流上升速度', plumeMetrics.rise.toFixed(2), 'm/s'],
    ['Richardson 数', plumeMetrics.ri.toFixed(2), 'Ri'],
    ['实时粒子', plumeMetrics.particles.toLocaleString(), 'points'],
  ], [mode, windMetrics, plumeMetrics])

  return <section className="realtime-lab-page">
    <div className="lab-intro section-shell">
      <div><div className="lab-eyebrow"><span className="pulse-dot"/>PHYTWIN REALTIME LAB / 60 FPS</div><h1>把物理场放进浏览器里。</h1><p>拖动参数即可观察流场与热羽流的瞬态响应；无需安装求解器，所有更新都在当前设备上实时计算与渲染。</p></div>
      <div className="lab-intro-note"><Sparkles size={18}/><span><b>面试官快捷体验</b>两个模型均已预载稳定工况，打开即运行。</span></div>
    </div>

    <div className="lab-shell">
      <header className="lab-toolbar">
        <div className="experiment-tabs">
          <button className={mode === 'wind' ? 'active' : ''} onClick={() => { setMode('wind'); setRunning(true) }}><Wind size={16}/>翼型风洞<span>2D</span></button>
          <button className={mode === 'plume' ? 'active' : ''} onClick={() => { setMode('plume'); setRunning(true) }}><Flame size={16}/>热羽流<span>3D</span></button>
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
          {mode === 'wind' ? <WindControls params={windParams} setParams={setWindParams}/> : <PlumeControls params={plumeParams} setParams={setPlumeParams}/>} 
          <div className="model-chip"><Activity size={15}/><div><b>{mode === 'wind' ? '薄翼理论 + 势流粒子对流' : '浮力粒子输运 + 湍动扰动'}</b><span>{mode === 'wind' ? 'INSTANT / CPU CANVAS' : 'TRANSIENT / THREE.JS WEBGL'}</span></div></div>
        </aside>

        <main className="lab-viewport">
          <div className="viewport-hud top-left"><span>{mode === 'wind' ? `NACA ${windParams.airfoil}` : 'THERMAL PLUME'}</span><b>{mode === 'wind' ? `${windParams.speed.toFixed(0)} m/s · α ${windParams.angle.toFixed(1)}°` : `ΔT ${plumeParams.heat.toFixed(0)} K · B ${plumeParams.buoyancy.toFixed(2)}`}</b></div>
          <div className="viewport-hud top-right"><span>LOCAL COMPUTE</span><b>NO SERVER REQUIRED</b></div>
          {mode === 'wind' ? <WindTunnelCanvas params={windParams} running={running} view={view} resetKey={resetKey} onMetrics={setWindMetrics}/> : <Suspense fallback={<div className="lab-loading"><div className="spinner"/><span>初始化 WebGL 粒子场…</span></div>}><ThermalPlume3D params={plumeParams} running={running} resetKey={resetKey} onMetrics={setPlumeMetrics}/></Suspense>}
          <div className="viewport-help"><MousePointer2 size={14}/>{mode === 'wind' ? '在流场中拖动，注入瞬态涡扰动' : '拖动旋转视角 · 滚轮缩放'}</div>
          {mode === 'wind' && <div className="field-legend"><span>LOW</span><i className={`legend-${view}`}/><span>HIGH</span></div>}
        </main>

        <aside className="lab-diagnostics">
          <div className="lab-panel-heading"><span>02</span><div><b>实时诊断</b><small>LIVE DIAGNOSTICS</small></div></div>
          {mode === 'wind' && <div className="view-switch"><span>场变量</span>{[['speed', '速度'], ['pressure', '压力'], ['vorticity', '涡量']].map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}>{label}</button>)}</div>}
          <div className="lab-metrics">{metrics.map(([label, value, unit, accent]) => <Metric key={label} label={label} value={value} unit={unit} accent={accent}/>)}</div>
          <div className="solver-health"><Gauge size={17}/><div><span>TIME INTEGRATION</span><b>STABLE · Δt ADAPTIVE</b></div></div>
          <div className="lab-scope-note"><Info size={16}/><div><b>模型适用范围</b><p>{mode === 'wind' ? '用于快速观察翼型、攻角和来流参数的趋势。升阻力来自修正薄翼理论，粒子场用于交互演示；不替代带湍流模型的 RANS / LES。' : '用于演示浮力、热衰减、湍动与横向来流对羽流形态的影响。当前为实时粒子输运模型，不替代燃烧化学或辐射耦合 CFD。'}</p></div></div>
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
