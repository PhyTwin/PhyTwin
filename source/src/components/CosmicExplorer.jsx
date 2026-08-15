import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Crosshair, Maximize2, MousePointer2, Rotate3D, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 银河盘与全部空间锚点绑定在同一坐标框架中，仅做极慢的整体刚体旋转。
const GALAXY_ROTATION_RATE = Math.PI * 2 / (12 * 60 * 60)

// 四个主要旋臂（示意俯视模型）与本地臂的标注位置。
const ARM_LABELS = [
  { name: '英仙臂', latin: 'PERSEUS', x: 2.18, y: -1.14 },
  { name: '盾牌-半人马臂', latin: 'SCUTUM-CENTAURUS', x: 1.14, y: 2.18 },
  { name: '人马臂', latin: 'SAGITTARIUS', x: -2.18, y: 1.14 },
  { name: '矩尺臂', latin: 'NORMA', x: -1.14, y: -2.18 },
  { name: '猎户臂', latin: 'ORION SPUR', x: -1.15, y: -2.72, local: true },
]

const OBJECTS = {
  solar: { index:'01', kind:'LOCAL STAR', name:'太阳', latin:'Sun · G2V Yellow Dwarf', x:-.34, y:-2.04, z:0, markerColor:'#ffe08a', markerHex:0xffe08a, labelOffset:[34,30], distance:'距银心 26,700 ly', metric:'SPECTRAL TYPE', value:'G2V · 黄白色', description:'太阳是一颗 G2V 型黄矮星，表面温度约 5,778 K，光谱呈黄白色。它位于猎户臂（本地臂），距银心约 26,700 光年；质量约 1.989×10³⁰ kg，直径约 139 万公里，占太阳系总质量的 99.86%。' },
  vega: { index:'02', kind:'LOCAL STAR', name:'织女星', latin:'Vega · α Lyrae (A0V)', x:-.18, y:-1.90, z:0, markerColor:'#9ec9ff', markerHex:0x9ec9ff, labelOffset:[-38,-44], distance:'距太阳 25 ly', metric:'SPECTRAL TYPE', value:'A0V · 蓝白色', description:'织女星（天琴座 α，Vega）是一颗 A0V 型主序星，表面温度约 9,600 K，呈高温亮蓝白色。它距太阳仅约 25 光年，与太阳同处猎户臂附近星域，是北天最亮的恒星之一（全天第五亮）。约公元前 12,000 年它曾是北极星，未来约 12,000 年后将再度成为北极星。' },
  thuban: { index:'03', kind:'LOCAL STAR', name:'天龙座 α · 右枢', latin:'Thuban · α Draconis (A0III)', x:.22, y:-1.58, z:0, markerColor:'#ff7a45', markerHex:0xff7a45, labelOffset:[42,-22], distance:'距太阳 300 ly', metric:'SPECTRAL TYPE', value:'A0III · 浅白偏淡蓝白', description:'天龙座 α（Thuban，古称「右枢」）是一颗 A0III 型巨星，光谱呈浅白偏淡蓝白色。它距太阳约 300 光年，位于猎户臂同侧更远处。约公元前 2700 年 Thuban 恰在北极点附近，是古埃及与古代中国「右枢」所指的北极星，古埃及金字塔的方位可能即以它为基准。' },
  lmc: { index:'04', kind:'SATELLITE GALAXY', name:'大麦哲伦云', latin:'Large Magellanic Cloud', x:-3.5, y:2.2, z:0, markerColor:'#d9b3ff', markerHex:0xd9b3ff, labelOffset:[34,-18], distance:'距银河 163,000 ly', metric:'DISTANCE', value:'≈ 163,000 ly', description:'大麦哲伦云（LMC）是银河系最大的伴星系，距离约 163,000 光年，属不规则矮星系，直径约 14,000 光年，质量约为银河系的 1/100。1987 年在此观测到 SN 1987A 超新星，是数百年内距地球最近的超新星；其恒星形成区「狼蛛星云」（30 Doradus）正孕育大量大质量恒星。' },
  smc: { index:'05', kind:'SATELLITE GALAXY', name:'小麦哲伦云', latin:'Small Magellanic Cloud', x:-4.7, y:1.2, z:0, markerColor:'#9fe8d0', markerHex:0x9fe8d0, labelOffset:[34,14], distance:'距银河 200,000 ly', metric:'DISTANCE', value:'≈ 200,000 ly', description:'小麦哲伦云（SMC）是不规则矮星系，距离约 200,000 光年，直径约 7,000 光年。它与大麦哲伦云共同构成麦哲伦云系统，两者在银河系潮汐作用下被拉伸，并经由「麦哲伦流」（一条中性氢气体桥）与银河系相连。' },
  sagdeg: { index:'06', kind:'SATELLITE GALAXY', name:'人马座矮椭球星系', latin:'Sagittarius Dwarf Spheroidal', x:-.6, y:-3.9, z:0, markerColor:'#ffd08a', markerHex:0xffd08a, labelOffset:[-46,8], distance:'距银河 70,000 ly', metric:'DISTANCE', value:'≈ 70,000 ly', description:'人马座矮椭球星系（SagDEG）是目前已知距银河系最近的伴星系，中心距银心仅约 70,000 光年。它正被银河系的潮汐力逐步瓦解，被剥离的恒星沿轨道形成「人马座星流」，是研究星系并合与银河系增长历史的关键证据。' },
  andromeda: { index:'07', kind:'SPIRAL GALAXY', name:'仙女座星系', latin:'Andromeda · M31', x:5.4, y:2.2, z:0, markerColor:'#6fd4ff', markerHex:0x6fd4ff, labelOffset:[42,-4], distance:'距银河 2.54 Mly', metric:'DISTANCE', value:'≈ 254 万 ly', description:'仙女座星系（M31）是本星系群中最大的星系，距离约 254 万光年，是一颗直径约 22 万光年的旋涡星系，恒星总数约 1 万亿颗。它是肉眼可见的最远天体之一，正以约 110 km/s 的速度接近银河系，预计约 40–50 亿年后与银河系碰撞并合并。' },
  triangulum: { index:'08', kind:'SPIRAL GALAXY', name:'三角座星系', latin:'Triangulum · M33', x:5.0, y:3.4, z:0, markerColor:'#c8a0ff', markerHex:0xc8a0ff, labelOffset:[40,-16], distance:'距银河 2.73 Mly', metric:'DISTANCE', value:'≈ 273 万 ly', description:'三角座星系（M33）是本星系群第三大星系，距离约 273 万光年，属旋涡星系，直径约 6 万光年。它可能是仙女座星系的伴星系，内部拥有活跃的恒星形成区（如 NGC 604，是本星系群中最大的恒星形成区之一）。' },
}

const GALAXY_INFO = { index:'00', kind:'GALACTIC TWIN', name:'银河系', latin:'Milky Way · Face-on', x:0, y:0, metric:'ESTIMATED DIAMETER', value:'≈ 100,000–120,000 ly', description:'银河系是太阳系所在的棒旋星系，直径约 10–12 万光年，包含约 1000 亿–4000 亿颗恒星。其主要旋臂为英仙臂、盾牌-半人马臂、人马臂与矩尺臂；太阳位于猎户臂（本地臂），距银心约 26,700 光年。本图以俯视示意方式绘制固定旋臂与邻近星系位置。' }

function armPoint(arm, t, radialNoise = 0, angularNoise = 0) {
  const sweep = 0.2 + t * 8.0
  const theta = sweep + arm * Math.PI / 2 + angularNoise
  const r = 0.60 + sweep * 0.32 + radialNoise
  return new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0)
}

function makeGalaxy() {
  const group = new THREE.Group(); let seed = 48271
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
  const count = 15000, positions = new Float32Array(count * 3), colors = new Float32Array(count * 3)
  const ice = new THREE.Color('#a8d8ff'), blue = new THREE.Color('#557eb8'), warm = new THREE.Color('#ffd29a')
  for (let i = 0; i < count; i += 1) {
    const bulge = i < count * .18; let point, color
    if (bulge) { const r = Math.pow(random(), 2.1) * 1.18, theta = random() * Math.PI * 2; point = new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, (random() - .5) * .36 * (1 - r / 1.3)); color = warm.clone().lerp(ice, .18 + random() * .2) }
    else { const t = Math.pow(random(), .82), arm = i % 4, spread = (random() - .5) * (.16 + t * .15), twist = (random() - .5) * (.09 + t * .05); point = armPoint(arm, t, spread, twist); point.z = (random() - .5) * .09 * (1 - t * .7); color = ice.clone().lerp(blue, .12 + random() * .48).offsetHSL((random() - .5) * .025, 0, (random() - .5) * .12) }
    positions.set([point.x, point.y, point.z], i * 3); colors.set([color.r, color.g, color.b], i * 3)
  }
  const stars = new THREE.BufferGeometry(); stars.setAttribute('position', new THREE.BufferAttribute(positions, 3)); stars.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  group.add(new THREE.Points(stars, new THREE.PointsMaterial({ size: .026, vertexColors: true, transparent: true, opacity: .84, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true })))
  for (let arm = 0; arm < 4; arm += 1) { const curve = Array.from({ length: 220 }, (_, i) => armPoint(arm, i / 219)); group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve), new THREE.LineBasicMaterial({ color: arm % 2 ? 0x6d9ed4 : 0x86c8ff, transparent: true, opacity: arm % 2 ? .16 : .24, blending: THREE.AdditiveBlending }))) }
  // 猎户臂（本地臂）经过太阳系锚点，位于人马臂与英仙臂之间。
  const localCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(-1.08, -2.7, .018), new THREE.Vector3(-.34, -2.04, .018), new THREE.Vector3(.48, -1.24, .018)])
  const localArm = localCurve.getPoints(109)
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(localArm), new THREE.LineBasicMaterial({ color: 0x71e5ff, transparent: true, opacity: .48, blending: THREE.AdditiveBlending })))
  const bar = new THREE.Mesh(new THREE.SphereGeometry(.54, 36, 20), new THREE.MeshBasicMaterial({ color: 0xffd7a3, transparent: true, opacity: .55, blending: THREE.AdditiveBlending })); bar.scale.set(2.15, .62, .28); bar.rotation.z = .38; group.add(bar)
  ;[1.2, 2.39].forEach(r => { const ring = orbitLine(r); ring.material.color.set(0x597390); ring.material.opacity = .1; group.add(ring) })
  return group
}

function makeBackground() {
  const count = 1800, positions = new Float32Array(count * 3), colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) { positions.set([(Math.random() - .5) * 28, (Math.random() - .5) * 18, -3 - Math.random() * 7], i * 3); const c = .35 + Math.random() * .55; colors.set([c * .72, c * .82, c], i * 3) }
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return new THREE.Points(geometry, new THREE.PointsMaterial({ size: .025, vertexColors: true, transparent: true, opacity: .78, depthWrite: false, blending: THREE.AdditiveBlending }))
}

function orbitLine(radius) {
  const points = Array.from({ length: 97 }, (_, i) => new THREE.Vector3(Math.cos(i / 96 * Math.PI * 2) * radius, Math.sin(i / 96 * Math.PI * 2) * radius, 0))
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x6d91ac, transparent: true, opacity: .2 }))
}

function makeSolarSystem() {
  const group = new THREE.Group(); const sun = new THREE.Mesh(new THREE.SphereGeometry(.16, 28, 18), new THREE.MeshBasicMaterial({ color: 0xffe08a })); group.add(sun)
  const specs = [[.25, .026, 0x9b8f84, 1.8], [.35, .04, 0xd7a66d, 1.35], [.47, .044, 0x4f91d9, 1], [.59, .034, 0xc65e42, .8], [.79, .095, 0xd7aa79, .43], [1.02, .082, 0xe2c18c, .32], [1.24, .063, 0x82c4d5, .23], [1.43, .059, 0x5177c7, .18]]
  const planets = []
  specs.forEach(([radius, size, color, speed], i) => { group.add(orbitLine(radius)); const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 18, 12), new THREE.MeshStandardMaterial({ color, roughness: .75, metalness: .05 })); mesh.userData = { radius, speed, phase: i * .83, spin: .014 + i * .006 }; group.add(mesh); planets.push(mesh); if (i === 5) { const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.35, size * 2.05, 30), new THREE.MeshBasicMaterial({ color: 0xd5bf95, side: THREE.DoubleSide, transparent: true, opacity: .62 })); ring.rotation.x = 1.15; mesh.add(ring) } })
  group.userData.planets = planets; group.userData.sun = sun; return group
}

function makeStar(color) {
  const group = new THREE.Group()
  const core = new THREE.Mesh(new THREE.SphereGeometry(.09, 22, 16), new THREE.MeshBasicMaterial({ color }))
  group.add(core)
  ;[[.17, .22], [.30, .10], [.48, .05]].forEach(([r, op]) => { const h = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false })); group.add(h) })
  return group
}

function makeSmallGalaxy(color, kind) {
  const group = new THREE.Group()
  const count = kind === 'spiral' ? 700 : 450, positions = new Float32Array(count * 3), colors = new Float32Array(count * 3)
  let seed = 12345
  const random = () => { seed = seed * 48271 % 2147483647; return seed / 2147483647 }
  const base = new THREE.Color(color)
  for (let i = 0; i < count; i += 1) {
    let x, y, z
    if (kind === 'spiral') { const t = Math.pow(random(), .9), arm = i % 2, sweep = t * 5.2, theta = sweep + arm * Math.PI + (random() - .5) * (.5 + t * .6), r = .14 + sweep * .34 + (random() - .5) * .10; x = Math.cos(theta) * r; y = Math.sin(theta) * r * .72; z = (random() - .5) * .10 * (1 - t * .6) }
    else { const r = Math.pow(random(), 1.7) * .7, theta = random() * Math.PI * 2; x = Math.cos(theta) * r; y = Math.sin(theta) * r * .62; z = (random() - .5) * .14 }
    positions.set([x, y, z], i * 3); const c = base.clone().lerp(new THREE.Color('#ffffff'), .1 + random() * .5); colors.set([c.r, c.g, c.b], i * 3)
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(positions, 3)); geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  group.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: .04, vertexColors: true, transparent: true, opacity: .8, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true })))
  return group
}

function GalaxyAnchorLayer({ expanded = false, onSelect, anchorRefs, rulerRef, armLabelRefs }) {
  return <div className={expanded ? 'galaxy-marker-layer expanded' : 'galaxy-marker-layer'}>
    <div className="galactic-center-label"><i /><span>银河系中心<small>GALACTIC CENTER · 0 ly</small></span></div>
    <div className="solar-distance-ruler" ref={rulerRef}><span>太阳系银心距 · ≈ 26,700 ly</span></div>
    {ARM_LABELS.map((arm, i) => <div key={arm.name} ref={node => { armLabelRefs.current[i] = node }} className={`arm-label${arm.local ? ' local' : ''}`}><b>{arm.name}</b><small>{arm.latin}</small></div>)}
    {Object.entries(OBJECTS).map(([id, item]) => {
      const [labelX, labelY] = item.labelOffset
      const leaderLength = Math.hypot(labelX, labelY)
      const leaderAngle = Math.atan2(labelY, labelX) * 180 / Math.PI
      return <div
        key={id}
        ref={node => { anchorRefs.current[id] = node }}
        className={`galaxy-anchor ${id}`}
        style={{ '--label-x': `${labelX}px`, '--label-y': `${labelY}px`, '--leader-length': `${leaderLength}px`, '--leader-angle': `${leaderAngle}deg`, '--anchor-color': item.markerColor }}
      >
        <i className="anchor-dot" />
        <i className="anchor-leader" />
        <button className="galaxy-marker" onClick={() => onSelect(id)}>
          <span><small>{item.kind}</small><b>{item.name}</b><em>{item.distance}</em></span><Crosshair size={13} />
        </button>
      </div>
    })}
  </div>
}

export default function CosmicExplorer() {
  const hostRef = useRef(null); const anchorRefs = useRef({}); const armLabelRefs = useRef({}); const rulerRef = useRef(null); const [selected, setSelected] = useState(null); const selectedRef = useRef(null); const [ready, setReady] = useState(false)
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => {
    const host = hostRef.current, renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }); renderer.setClearColor(0x010207, 1); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); host.appendChild(renderer.domElement)
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x010207, .02); const camera = new THREE.PerspectiveCamera(42, 1, .1, 100); camera.position.set(0, 0, 11)
    scene.add(new THREE.AmbientLight(0x8ebcff, 1.8)); const light = new THREE.PointLight(0xffd79b, 8, 12); light.position.set(0, 0, 3); scene.add(light)
    const background = makeBackground(); scene.add(background); const galacticFrame = new THREE.Group(), galaxy = makeGalaxy(); galacticFrame.add(galaxy); scene.add(galacticFrame)
    const localGroups = {
      solar: makeSolarSystem(),
      vega: makeStar(0x9ec9ff),
      thuban: makeStar(0xff7a45),
      lmc: makeSmallGalaxy(0xd9b3ff, 'dwarf'),
      smc: makeSmallGalaxy(0x9fe8d0, 'dwarf'),
      sagdeg: makeSmallGalaxy(0xffd08a, 'dwarf'),
      andromeda: makeSmallGalaxy(0x6fd4ff, 'spiral'),
      triangulum: makeSmallGalaxy(0xc8a0ff, 'spiral'),
    }
    Object.entries(localGroups).forEach(([id, g]) => { g.position.set(OBJECTS[id].x, OBJECTS[id].y, (OBJECTS[id].z || 0) + .18); g.scale.setScalar(.001); galacticFrame.add(g) })
    const markerMeshes = {}; Object.entries(OBJECTS).forEach(([id, o]) => { const marker = new THREE.Mesh(new THREE.RingGeometry(.045, .075, 24), new THREE.MeshBasicMaterial({ color: o.markerHex, side: THREE.DoubleSide, transparent: true, opacity: .94 })); marker.position.set(o.x, o.y, (o.z || 0) + .12); galacticFrame.add(marker); markerMeshes[id] = marker })
    const resize = () => { const rect = host.getBoundingClientRect(); renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false); camera.aspect = rect.width / Math.max(1, rect.height); camera.updateProjectionMatrix() }; const observer = new ResizeObserver(resize); observer.observe(host); resize()
    const mouse = { down: false, lastX: 0, lastY: 0, dragX: 0, dragY: 0, zoom: 0 }; const onDown = e => { mouse.down = true; mouse.lastX = e.clientX; mouse.lastY = e.clientY; renderer.domElement.setPointerCapture(e.pointerId) }; const onMove = e => { if (mouse.down && selectedRef.current) { mouse.dragX += (e.clientX - mouse.lastX) * .006; mouse.dragY += (e.clientY - mouse.lastY) * .005; mouse.lastX = e.clientX; mouse.lastY = e.clientY } }; const onUp = () => { mouse.down = false }; const onWheel = e => { if (selectedRef.current) { e.preventDefault(); mouse.zoom = Math.max(-1.4, Math.min(1.8, mouse.zoom + e.deltaY * .0025)) } }
    renderer.domElement.addEventListener('pointerdown', onDown); renderer.domElement.addEventListener('pointermove', onMove); renderer.domElement.addEventListener('pointerup', onUp); renderer.domElement.addEventListener('pointercancel', onUp); renderer.domElement.addEventListener('wheel', onWheel, { passive: false })
    let frame = 0, start = performance.now(); setReady(true)
    const animate = () => { frame = requestAnimationFrame(animate); const t = (performance.now() - start) / 1000, active = selectedRef.current, target = active ? (active === 'galaxy' ? GALAXY_INFO : OBJECTS[active]) : null
      galacticFrame.rotation.z = t * GALAXY_ROTATION_RATE
      galacticFrame.rotation.x = THREE.MathUtils.lerp(galacticFrame.rotation.x, active === 'galaxy' ? mouse.dragY : 0, .055); galacticFrame.rotation.y = THREE.MathUtils.lerp(galacticFrame.rotation.y, active === 'galaxy' ? mouse.dragX : 0, .055)
      const frameScale = active && active !== 'galaxy' ? .78 : active === 'galaxy' ? 1.1 : 1; galacticFrame.scale.setScalar(THREE.MathUtils.lerp(galacticFrame.scale.x, frameScale, .04)); scene.updateMatrixWorld(true)
      const targetPoint = new THREE.Vector3(target?.x || 0, target?.y || 0, target?.z || 0); if (active && active !== 'galaxy') targetPoint.applyMatrix4(galacticFrame.matrixWorld)
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPoint.x, .045); camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPoint.y, .045); camera.position.z = THREE.MathUtils.lerp(camera.position.z, active === 'galaxy' ? 7.4 + mouse.zoom : target ? 4.25 + mouse.zoom : 11, .045); camera.lookAt(camera.position.x, camera.position.y, 0)
      Object.entries(localGroups).forEach(([id, g]) => { const shown = id === active, targetScale = shown ? (id === 'solar' ? 1.08 : 1.22) : .001; const s = THREE.MathUtils.lerp(g.scale.x, targetScale, .065); g.scale.setScalar(s); g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, shown ? mouse.dragY : 0, .06); g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, shown ? mouse.dragX : 0, .06); if (shown && id !== 'solar' && id !== 'vega' && id !== 'thuban') g.rotation.z += .0008 })
      const solar = localGroups.solar; solar.userData.sun.rotation.y += .006; solar.userData.planets.forEach(p => { const a = p.userData.phase + t * p.userData.speed; p.position.set(Math.cos(a) * p.userData.radius, Math.sin(a) * p.userData.radius, 0); p.rotation.y += p.userData.spin })
      Object.entries(markerMeshes).forEach(([id, m]) => { m.visible = !active; m.rotation.z = t * (id === 'solar' ? .5 : .22); const pulse = 1 + Math.sin(t * 2 + OBJECTS[id].index) * .13; m.scale.setScalar(pulse) })
      Object.entries(OBJECTS).forEach(([id, o]) => { const element = anchorRefs.current[id]; if (!element) return; const point = new THREE.Vector3(o.x, o.y, o.z || 0).applyMatrix4(galacticFrame.matrixWorld); point.project(camera); element.style.left = `${(point.x * .5 + .5) * 100}%`; element.style.top = `${(-point.y * .5 + .5) * 100}%`; element.style.opacity = point.z > -1 && point.z < 1 ? '1' : '0' })
      ARM_LABELS.forEach((arm, i) => { const el = armLabelRefs.current[i]; if (!el) return; const point = new THREE.Vector3(arm.x, arm.y, 0).applyMatrix4(galacticFrame.matrixWorld); point.project(camera); el.style.left = `${(point.x * .5 + .5) * 100}%`; el.style.top = `${(-point.y * .5 + .5) * 100}%`; el.style.opacity = point.z > -1 && point.z < 1 ? '1' : '0' })
      const ruler = rulerRef.current; if (ruler) { const center = new THREE.Vector3().applyMatrix4(galacticFrame.matrixWorld), sun = new THREE.Vector3(OBJECTS.solar.x, OBJECTS.solar.y, OBJECTS.solar.z).applyMatrix4(galacticFrame.matrixWorld); center.project(camera); sun.project(camera); const rect = host.getBoundingClientRect(); const startX = (center.x * .5 + .5) * rect.width, startY = (-center.y * .5 + .5) * rect.height, endX = (sun.x * .5 + .5) * rect.width, endY = (-sun.y * .5 + .5) * rect.height; ruler.style.left = `${startX}px`; ruler.style.top = `${startY}px`; ruler.style.width = `${Math.hypot(endX - startX, endY - startY)}px`; ruler.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)` }
      renderer.render(scene, camera) }; animate()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.domElement.removeEventListener('pointerdown', onDown); renderer.domElement.removeEventListener('pointermove', onMove); renderer.domElement.removeEventListener('pointerup', onUp); renderer.domElement.removeEventListener('pointercancel', onUp); renderer.domElement.removeEventListener('wheel', onWheel); scene.traverse(o => { o.geometry?.dispose(); if (Array.isArray(o.material)) o.material.forEach(m => m.dispose()); else o.material?.dispose() }); renderer.dispose(); renderer.domElement.remove() }
  }, [])
  const current = selected ? (selected === 'galaxy' ? GALAXY_INFO : OBJECTS[selected]) : null
  const openObject = id => setSelected(id)
  const closeSelection = () => setSelected(selected === 'galaxy' ? null : 'galaxy')
  return <div className={selected ? 'cosmic-explorer selected' : 'cosmic-explorer'}>
    <div className="cosmic-canvas" ref={hostRef} />{!ready && <div className="cosmic-loader"><i /><span>生成银河系旋臂…</span></div>}<div className="cosmic-grid" />
    <div className="cosmic-status"><span /><b>MILKY WAY / FACE-ON</b><em>SPIRAL ARMS · LOCAL GROUP NEIGHBORS</em></div>
    {!selected && <><div className="cosmic-copy"><span>PHYTWIN / COMPUTABLE UNIVERSE</span><h1>给我们无限算力，<br />模拟宇宙级物理数字孪生。</h1><p>一台拥有无限算力的超级计算机，足以让物理世界从方程走向可运行的数字孪生——从粒子、行星与星系，直至整个宇宙。</p><div><button onClick={() => setSelected('galaxy')}>放大银河系<Maximize2 size={15} /></button><Link to="/lab">进入实时实验室<ArrowRight size={15} /></Link></div></div>
      <GalaxyAnchorLayer onSelect={openObject} anchorRefs={anchorRefs} rulerRef={rulerRef} armLabelRefs={armLabelRefs} /></>}
    {selected && current && <><button className="cosmic-close" onClick={closeSelection}><X size={17} />{selected === 'galaxy' ? '返回首页' : '返回放大后的银河系'}</button>{selected === 'galaxy' && <GalaxyAnchorLayer expanded onSelect={openObject} anchorRefs={anchorRefs} rulerRef={rulerRef} armLabelRefs={armLabelRefs} />}<div className="cosmic-detail"><span>{current.kind} / {current.index}</span><h2>{current.name}<small>{current.latin}</small></h2><p>{current.description}</p><div className="cosmic-detail-metric"><span>{current.metric}</span><b>{current.value}</b></div><div className="cosmic-controls-hint"><Rotate3D size={15} /><span>{selected === 'galaxy' ? '拖动倾斜银河盘' : '拖动旋转局部结构'}</span><MousePointer2 size={14} /><span>滚轮缩放</span></div></div><div className="cosmic-model-note"><b>{selected === 'galaxy' ? 'SPIRAL ARM MODEL' : selected === 'solar' ? 'ORBITAL MOTION' : ['vega', 'thuban'].includes(selected) ? 'LOCAL STAR' : 'NEIGHBOR GALAXY'}</b><span>{selected === 'galaxy' ? '旋臂、恒星纹理和全部位置锚点绑定在同一银河坐标框架中，以极慢速度整体旋转；引线仅用于分开重叠标签。' : selected === 'solar' ? '行星具有独立自转与公转动画；为保证可读性，尺寸、距离与周期均采用视觉压缩。' : ['vega', 'thuban'].includes(selected) ? '本地恒星的相对距离按天文学数值标注；为便于观察，空间尺度做了视觉压缩。' : '邻近星系按天文学距离与方位放置，点击后放大查看其形态示意。'}</span></div></>}
    <div className="cosmic-data-note">MILKY WAY · FOUR-ARM SPIRAL MODEL<br />LOCAL GROUP NEIGHBORS · STELLAR &amp; GALACTIC MARKERS</div>
  </div>
}
