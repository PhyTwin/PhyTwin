import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Compass, Crosshair, Maximize2, MousePointer2, Rotate3D, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 银河系刚体缓慢自转速率
const GALAXY_ROTATION_RATE = Math.PI * 2 / (12 * 60 * 60)

// 真实天文天体数据标定
const OBJECTS = {
  solar: {
    index: '01',
    kind: 'LOCAL STELLAR SYSTEM',
    name: '太阳系 (Solar System)',
    latin: 'Sol · G2V Main-sequence Star',
    x: -0.34,
    y: -2.04,
    z: 0,
    markerColor: '#fff2b0',
    markerHex: 0xfff2b0,
    labelOffset: [50, -44],
    distance: '距银心约 26,700 光年',
    metric: 'GALACTOCENTRIC DISTANCE',
    value: '≈ 26,700 ly',
    spectral: 'G2V 黄矮星 (Yellow Dwarf)',
    temp: '5,778 K',
    description: '太阳系位于英仙臂与人马臂之间，距离银心约 26,700 光年（8.2 千秒差距），以约 220 km/s 的轨道速度绕银心公转，周期约 2.3 亿年。核心天体太阳为 G2V 型黄矮星，拥有八大行星及柯伊伯带。'
  },
  vega: {
    index: '02',
    kind: 'STELLAR SYSTEM',
    name: '天琴座 α',
    latin: 'α Lyrae · HIP 91262',
    x: -0.15,
    y: -1.78,
    z: 0.02,
    markerColor: '#cce5ff',
    markerHex: 0xcce5ff,
    labelOffset: [56, -18],
    distance: '距太阳约 25.04 光年',
    metric: 'DISTANCE FROM SUN',
    value: '≈ 25.04 ly',
    spectral: 'A0Va 高温蓝白主序星',
    temp: '9,602 K',
    description: '天琴座 α（α Lyrae）是天琴座最亮恒星，全天第五亮星。属于 A0V 型高温蓝白色主序星，质量约 2.13 M☉，光度为太阳的 40 倍。距离太阳极近（约 25 光年），自转极快（赤道速度 ~236 km/s），呈显著扁球体。历史上曾作为天文测光的零星等基准。'
  },
  thuban: {
    index: '03',
    kind: 'STELLAR SYSTEM',
    name: '天龙座 α（右枢）',
    latin: 'α Draconis · Thuban · HIP 68756',
    x: 0.22,
    y: -1.42,
    z: 0.04,
    markerColor: '#ff8c42',
    markerHex: 0xff8c42,
    labelOffset: [52, -10],
    distance: '距太阳约 303 光年 (距天琴座 α 约 280 ly)',
    metric: 'DISTANCE FROM SUN',
    value: '≈ 303 ly',
    spectral: 'A0III 白巨星 / 分光双星',
    temp: '9,800 K',
    description: '天龙座 α（Thuban，右枢）距太阳约 303 光年，距天琴座 α 约 280 光年。为 A0III 型巨星组成的分光食双星系统。约公元前 3942 年至前 1793 年间曾是地球北极星，古埃及胡夫金字塔北向通道即精确对准此星。在古文明与现代地外传说中具有重要象征意义。'
  },
  sirius: {
    index: '04',
    kind: 'BINARY SYSTEM',
    name: '天狼星（大犬座 α）',
    latin: 'α Canis Majoris · Sirius',
    x: -0.62,
    y: -2.32,
    z: -0.01,
    markerColor: '#e0f0ff',
    markerHex: 0xe0f0ff,
    labelOffset: [-68, 48],
    distance: '距太阳约 8.60 光年',
    metric: 'DISTANCE FROM SUN',
    value: '≈ 8.60 ly',
    spectral: 'A1V + DA2 白矮星双星',
    temp: '9,940 K',
    description: '天狼星（Sirius）是全夜空最明亮的恒星，视星等 −1.46。距太阳系仅 8.6 光年，属于最近的恒星邻居之一。主星为 A1V 型蓝白主序星，伴星天狼星 B 则是人类发现的第一颗白矮星。'
  },
  omegaCen: {
    index: '05',
    kind: 'GLOBULAR CLUSTER',
    name: '半人马座 ω (NGC 5139)',
    latin: 'ω Centauri · Globular Cluster',
    x: 1.18,
    y: -1.15,
    z: 0.12,
    markerColor: '#ffd885',
    markerHex: 0xffd885,
    labelOffset: [42, -18],
    distance: '距太阳约 15,800 光年',
    metric: 'DISTANCE FROM SUN',
    value: '≈ 15,800 ly',
    spectral: '巨型星团 (约 1000 万颗恒星)',
    temp: 'Core Dense Cluster',
    description: '半人马座 ω 是银河系已知最庞大、最明亮的球状星团，质量达 400 万 M☉。其复杂的恒星演化族群与核心黑洞迹象表明，它极可能是被银河系引力潮汐撕裂并吞噬的远古矮星系残余致密核心。'
  }
}

// 银河系整体参数
const GALAXY_INFO = {
  index: '00',
  kind: 'BARRED SPIRAL GALAXY',
  name: '银河系 (Milky Way)',
  latin: 'Milky Way Galaxy · SBbc-type',
  x: 0,
  y: 0,
  metric: 'STELLAR DISK DIAMETER',
  value: '≈ 100,000–120,000 ly',
  description: '银河系是一个中等质量的棒旋星系（SBbc 型），由约 1000~4000 亿颗恒星及致密星际介质构成。中央核心包含约 415 万 M☉ 的超大质量黑洞人马座 A* (Sgr A*)。主要旋臂包括英仙臂、人马-船底臂、盾牌-南十字臂和矩尺臂，太阳系距银心约 26,700 光年。'
}

// 银河系四大主旋臂标注
const SPIRAL_ARMS = [
  { id: 'perseus', name: '英仙臂 (Perseus Arm)', latin: 'Major Outer Arm', x: -1.45, y: -2.48, color: '#86c8ff' },
  { id: 'sagittarius', name: '人马-船底臂 (Sagittarius Arm)', latin: 'Major Inner Arm', x: 1.95, y: -1.35, color: '#6db8ff' },
  { id: 'scutum', name: '盾牌-南十字臂 (Scutum-Centaurus)', latin: 'Major Molecular Arm', x: 1.55, y: 1.75, color: '#8ec5ff' },
  { id: 'norma', name: '矩尺-天鹅臂 (Norma-Cygnus Arm)', latin: 'Innermost / Outer Arm', x: -1.95, y: 1.25, color: '#7ab3ff' }
]

// 银河系周边与本星系群主要真实星系
const DISTANT_GALAXIES = [
  { name: '大麦哲伦云 (LMC)', latin: 'Large Magellanic Cloud', dist: '≈ 163,000 ly', desc: '银河系最大卫星星系，棒旋矮星系', color: '#82d4ff' },
  { name: '小麦哲伦云 (SMC)', latin: 'Small Magellanic Cloud', dist: '≈ 204,000 ly', desc: '不规则矮星系，含丰富恒星形成区', color: '#7ad0e8' },
  { name: '仙女座星系 (M31)', latin: 'Andromeda Galaxy', dist: '≈ 2,500,000 ly', desc: '本星系群最大螺旋星系，未来将与银河系并合', color: '#ffd59e' },
  { name: '三角座星系 (M33)', latin: 'Triangulum Galaxy', dist: '≈ 2,730,000 ly', desc: '本星系群第三大星系，弥漫恒星盘', color: '#c7b8ff' }
]

function makeGalaxy() {
  const group = new THREE.Group()
  let seed = 48271
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const count = 16000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const ice = new THREE.Color('#a8d8ff')
  const blue = new THREE.Color('#4c79bd')
  const warm = new THREE.Color('#ffd29a')

  // 旋臂极坐标方程：缩短 sweep 系数到 6.8
  const armPoint = (arm, t, radialNoise = 0, angularNoise = 0) => {
    const sweep = 0.22 + t * 6.8
    const theta = sweep + (arm * Math.PI) / 2 + angularNoise
    const r = 0.65 + sweep * 0.38 + radialNoise
    return new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0)
  }

  for (let i = 0; i < count; i += 1) {
    const bulge = i < count * 0.2
    let point, color
    if (bulge) {
      const r = Math.pow(random(), 2.1) * 1.15
      const theta = random() * Math.PI * 2
      point = new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, (random() - 0.5) * 0.34 * (1 - r / 1.25))
      color = warm.clone().lerp(ice, 0.16 + random() * 0.22)
    } else {
      const t = Math.pow(random(), 0.84)
      const arm = i % 4
      const spread = (random() - 0.5) * (0.15 + t * 0.14)
      const twist = (random() - 0.5) * (0.08 + t * 0.05)
      point = armPoint(arm, t, spread, twist)
      point.z = (random() - 0.5) * 0.085 * (1 - t * 0.68)
      color = ice.clone().lerp(blue, 0.12 + random() * 0.46).offsetHSL((random() - 0.5) * 0.02, 0, (random() - 0.5) * 0.1)
    }
    positions.set([point.x, point.y, point.z], i * 3)
    colors.set([color.r, color.g, color.b], i * 3)
  }

  const stars = new THREE.BufferGeometry()
  stars.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  stars.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  group.add(new THREE.Points(stars, new THREE.PointsMaterial({ size: 0.026, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true })))

  // 绘制四条主旋臂骨架线
  for (let arm = 0; arm < 4; arm += 1) {
    const curve = Array.from({ length: 180 }, (_, i) => armPoint(arm, i / 179))
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve), new THREE.LineBasicMaterial({ color: arm % 2 ? 0x6d9ed4 : 0x86c8ff, transparent: true, opacity: arm % 2 ? 0.16 : 0.22, blending: THREE.AdditiveBlending })))
  }

  // 银河核心棒状结构
  const bar = new THREE.Mesh(new THREE.SphereGeometry(0.52, 36, 20), new THREE.MeshBasicMaterial({ color: 0xffd7a3, transparent: true, opacity: 0.52, blending: THREE.AdditiveBlending }))
  bar.scale.set(2.1, 0.6, 0.26)
  bar.rotation.z = 0.38
  group.add(bar)

  // 标尺同心参考环
  ;[1.18, 2.36, 3.54].forEach(r => {
    const ring = orbitLine(r)
    ring.material.color.set(0x597390)
    ring.material.opacity = 0.09
    group.add(ring)
  })

  return group
}

function makeBackground() {
  const count = 1600
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    positions.set([(Math.random() - 0.5) * 28, (Math.random() - 0.5) * 18, -3 - Math.random() * 7], i * 3)
    const c = 0.35 + Math.random() * 0.55
    colors.set([c * 0.72, c * 0.82, c], i * 3)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.024, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }))
}

function orbitLine(radius) {
  const points = Array.from({ length: 97 }, (_, i) => new THREE.Vector3(Math.cos((i / 96) * Math.PI * 2) * radius, Math.sin((i / 96) * Math.PI * 2) * radius, 0))
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x6d91ac, transparent: true, opacity: 0.2 }))
}

function makeSolarSystem() {
  const group = new THREE.Group()
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 28, 18), new THREE.MeshBasicMaterial({ color: 0xfff0b3 }))
  const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffd97d, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending }))
  group.add(sun)
  group.add(sunGlow)
  const specs = [
    [0.25, 0.026, 0x9b8f84, 1.8],
    [0.35, 0.04, 0xd7a66d, 1.35],
    [0.47, 0.044, 0x4f91d9, 1],
    [0.59, 0.034, 0xc65e42, 0.8],
    [0.79, 0.095, 0xd7aa79, 0.43],
    [1.02, 0.082, 0xe2c18c, 0.32],
    [1.24, 0.063, 0x82c4d5, 0.23],
    [1.43, 0.059, 0x5177c7, 0.18]
  ]
  const planets = []
  specs.forEach(([radius, size, color, speed], i) => {
    group.add(orbitLine(radius))
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 18, 12), new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05 }))
    mesh.userData = { radius, speed, phase: i * 0.83, spin: 0.014 + i * 0.006 }
    group.add(mesh)
    planets.push(mesh)
    if (i === 5) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.35, size * 2.05, 30), new THREE.MeshBasicMaterial({ color: 0xd5bf95, side: THREE.DoubleSide, transparent: true, opacity: 0.62 }))
      ring.rotation.x = 1.15
      mesh.add(ring)
    }
  })
  group.userData.planets = planets
  group.userData.sun = sun
  return group
}

function makeStar(colorHex, size = 0.13, isDual = false) {
  const group = new THREE.Group()
  const star = new THREE.Mesh(new THREE.SphereGeometry(size, 22, 16), new THREE.MeshBasicMaterial({ color: colorHex }))
  group.add(star)
  const halo = new THREE.Mesh(new THREE.SphereGeometry(size * 2.6, 16, 12), new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending }))
  group.add(halo)
  if (isDual) {
    const companion = new THREE.Mesh(new THREE.SphereGeometry(size * 0.45, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }))
    companion.position.set(size * 1.8, size * 0.6, 0)
    group.add(companion)
  }
  return group
}

function makeGlobularCluster() {
  const group = new THREE.Group()
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(750)
  const colors = new Float32Array(750)
  let seed = 7919
  const random = () => {
    seed = (seed * 48271) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < 250; i += 1) {
    const r = Math.pow(random(), 1.85) * 0.58
    const theta = random() * Math.PI * 2
    positions.set([Math.cos(theta) * r, Math.sin(theta) * r * 0.62, (random() - 0.5) * 0.22], i * 3)
    const glow = 0.6 + random() * 0.4
    colors.set([0.95 * glow, 0.85 * glow, 0.52 * glow], i * 3)
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  group.add(new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.038, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending })))
  return group
}

function GalaxyAnchorLayer({ expanded = false, onSelect, anchorRefs, armRefs }) {
  return (
    <div className={expanded ? 'galaxy-marker-layer expanded' : 'galaxy-marker-layer'}>
      {/* 银心标注 */}
      <div className="galactic-center-label">
        <i />
        <span>
          人马座 A* (银心)
          <small>GALACTIC CENTER · 0 ly · 4.15M M☉</small>
        </span>
      </div>

      {/* 四大主旋臂标注（无猎户臂） */}
      {SPIRAL_ARMS.map(arm => (
        <div
          key={arm.id}
          ref={node => {
            if (armRefs && armRefs.current) armRefs.current[arm.id] = node
          }}
          className="spiral-arm-tag"
          style={{ '--arm-color': arm.color }}
        >
          <span>{arm.name}</span>
          <small>{arm.latin}</small>
        </div>
      ))}

      {/* 真实天体锚点 */}
      {Object.entries(OBJECTS).map(([id, item]) => {
        const [labelX, labelY] = item.labelOffset
        const leaderLength = Math.hypot(labelX, labelY)
        const leaderAngle = (Math.atan2(labelY, labelX) * 180) / Math.PI
        return (
          <div
            key={id}
            ref={node => {
              anchorRefs.current[id] = node
            }}
            className={`galaxy-anchor ${id}`}
            style={{
              '--label-x': `${labelX}px`,
              '--label-y': `${labelY}px`,
              '--leader-length': `${leaderLength}px`,
              '--leader-angle': `${leaderAngle}deg`,
              '--anchor-color': item.markerColor
            }}
          >
            <i className="anchor-dot" />
            <i className="anchor-leader" />
            <button className="galaxy-marker" onClick={() => onSelect(id)}>
              <span>
                <small>{item.kind}</small>
                <b>{item.name}</b>
                <em>{item.distance}</em>
              </span>
              <Crosshair size={13} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

// 动态非重叠矩形排斥与引线自适应避让算法（确保所有星体与旋臂图层四边互不重叠）
function resolveLabelCollisions(items, containerWidth, containerHeight) {
  const PADDING = 14 // 边缘安全间隔（像素）
  const ITERATIONS = 12 // 迭代松弛次数

  // 1. 初始化每个卡片的目标中心位置与尺寸
  const boxes = items.map(item => ({
    ...item,
    cx: item.ox + item.initDx,
    cy: item.oy + item.initDy,
    w: item.w,
    h: item.h
  }))

  // 2. 迭代排斥消除重叠
  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const b1 = boxes[i]
        const b2 = boxes[j]

        const dx = b1.cx - b2.cx
        const dy = b1.cy - b2.cy
        const minDistX = (b1.w + b2.w) / 2 + PADDING
        const minDistY = (b1.h + b2.h) / 2 + PADDING

        const absDx = Math.abs(dx) || 0.001
        const absDy = Math.abs(dy) || 0.001

        if (absDx < minDistX && absDy < minDistY) {
          const overlapX = minDistX - absDx
          const overlapY = minDistY - absDy

          // 沿重叠最小维度分离，确保四边完全分开
          if (overlapX < overlapY) {
            const sign = dx >= 0 ? 1 : -1
            const push = overlapX * 0.55
            b1.cx += sign * push
            b2.cx -= sign * push
          } else {
            const sign = dy >= 0 ? 1 : -1
            const push = overlapY * 0.55
            b1.cy += sign * push
            b2.cy -= sign * push
          }
        }
      }
    }

    // 视口边界钳制，确保不会移出屏幕
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i]
      const minX = b.w / 2 + 20
      const maxX = Math.max(minX, containerWidth - b.w / 2 - 20)
      const minY = b.h / 2 + 75
      const maxY = Math.max(minY, containerHeight - b.h / 2 - 60)
      b.cx = Math.max(minX, Math.min(maxX, b.cx))
      b.cy = Math.max(minY, Math.min(maxY, b.cy))
    }
  }

  return boxes
}

export default function CosmicExplorer() {
  const hostRef = useRef(null)
  const anchorRefs = useRef({})
  const armRefs = useRef({})
  const [selected, setSelected] = useState(null)
  const selectedRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [showGalaxies, setShowGalaxies] = useState(false)

  useEffect(() => {
    selectedRef.current = selected
  }, [selected])

  useEffect(() => {
    const host = hostRef.current
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x010207, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2))
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x010207, 0.02)
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 11)

    scene.add(new THREE.AmbientLight(0x8ebcff, 1.8))
    const light = new THREE.PointLight(0xffd79b, 8, 12)
    light.position.set(0, 0, 3)
    scene.add(light)

    const background = makeBackground()
    scene.add(background)
    const galacticFrame = new THREE.Group()
    const galaxy = makeGalaxy()
    galacticFrame.add(galaxy)
    scene.add(galacticFrame)

    // 创建局部高精模型
    const localGroups = {
      solar: makeSolarSystem(),
      vega: makeStar(0xcce5ff, 0.14),
      thuban: makeStar(0xff8c42, 0.13, true),
      sirius: makeStar(0xe0f0ff, 0.13, true),
      omegaCen: makeGlobularCluster()
    }

    Object.entries(localGroups).forEach(([id, g]) => {
      g.position.set(OBJECTS[id].x, OBJECTS[id].y, (OBJECTS[id].z || 0) + 0.18)
      g.scale.setScalar(0.001)
      galacticFrame.add(g)
    })

    const markerMeshes = {}
    Object.entries(OBJECTS).forEach(([id, o]) => {
      const marker = new THREE.Mesh(
        new THREE.RingGeometry(0.045, 0.075, 24),
        new THREE.MeshBasicMaterial({ color: o.markerHex, side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
      )
      marker.position.set(o.x, o.y, (o.z || 0) + 0.12)
      galacticFrame.add(marker)
      markerMeshes[id] = marker
    })

    const resize = () => {
      const rect = host.getBoundingClientRect()
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false)
      camera.aspect = rect.width / Math.max(1, rect.height)
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    resize()

    const mouse = { down: false, lastX: 0, lastY: 0, dragX: 0, dragY: 0, zoom: 0 }
    const onDown = e => {
      mouse.down = true
      mouse.lastX = e.clientX
      mouse.lastY = e.clientY
      renderer.domElement.setPointerCapture(e.pointerId)
    }
    const onMove = e => {
      if (mouse.down && selectedRef.current) {
        mouse.dragX += (e.clientX - mouse.lastX) * 0.006
        mouse.dragY += (e.clientY - mouse.lastY) * 0.005
        mouse.lastX = e.clientX
        mouse.lastY = e.clientY
      }
    }
    const onUp = () => {
      mouse.down = false
    }
    const onWheel = e => {
      if (selectedRef.current) {
        e.preventDefault()
        mouse.zoom = Math.max(-1.4, Math.min(1.8, mouse.zoom + e.deltaY * 0.0025))
      }
    }

    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointermove', onMove)
    renderer.domElement.addEventListener('pointerup', onUp)
    renderer.domElement.addEventListener('pointercancel', onUp)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    let frame = 0
    const start = performance.now()
    setReady(true)

    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = (performance.now() - start) / 1000
      const active = selectedRef.current
      const target = active ? (active === 'galaxy' ? GALAXY_INFO : OBJECTS[active]) : null

      // 银河坐标系刚体自转
      galacticFrame.rotation.z = t * GALAXY_ROTATION_RATE
      galacticFrame.rotation.x = THREE.MathUtils.lerp(galacticFrame.rotation.x, active === 'galaxy' ? mouse.dragY : 0, 0.055)
      galacticFrame.rotation.y = THREE.MathUtils.lerp(galacticFrame.rotation.y, active === 'galaxy' ? mouse.dragX : 0, 0.055)

      const frameScale = active && active !== 'galaxy' ? 0.78 : active === 'galaxy' ? 1.1 : 1
      galacticFrame.scale.setScalar(THREE.MathUtils.lerp(galacticFrame.scale.x, frameScale, 0.04))
      scene.updateMatrixWorld(true)

      const targetPoint = new THREE.Vector3(target?.x || 0, target?.y || 0, target?.z || 0)
      if (active && active !== 'galaxy') targetPoint.applyMatrix4(galacticFrame.matrixWorld)

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPoint.x, 0.045)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPoint.y, 0.045)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, active === 'galaxy' ? 7.4 + mouse.zoom : target ? 4.25 + mouse.zoom : 11, 0.045)
      camera.lookAt(camera.position.x, camera.position.y, 0)

      Object.entries(localGroups).forEach(([id, g]) => {
        const shown = id === active
        const targetScale = shown ? (id === 'solar' ? 1.08 : 1.22) : 0.001
        const s = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.065)
        g.scale.setScalar(s)
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, shown ? mouse.dragY : 0, 0.06)
        g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, shown ? mouse.dragX : 0, 0.06)
        if (shown && id !== 'solar') g.rotation.z += 0.0008
      })

      const solar = localGroups.solar
      solar.userData.sun.rotation.y += 0.006
      solar.userData.planets.forEach(p => {
        const a = p.userData.phase + t * p.userData.speed
        p.position.set(Math.cos(a) * p.userData.radius, Math.sin(a) * p.userData.radius, 0)
        p.rotation.y += p.userData.spin
      })

      Object.entries(markerMeshes).forEach(([id, m]) => {
        m.visible = !active
        m.rotation.z = t * (id === 'solar' ? 0.5 : 0.22)
        const pulse = 1 + Math.sin(t * 2 + parseInt(OBJECTS[id].index)) * 0.12
        m.scale.setScalar(pulse)
      })

      // 计算并动态排斥所有星体与旋臂图层，确保四边互不重叠
      const containerW = host.clientWidth || 1200
      const containerH = host.clientHeight || 800

      // 准备参与碰撞排斥计算的所有可见图层项目
      const collisionItems = []

      // 1. 恒星/天体锚点
      Object.entries(OBJECTS).forEach(([id, o]) => {
        const element = anchorRefs.current[id]
        if (!element) return
        const point = new THREE.Vector3(o.x, o.y, o.z || 0).applyMatrix4(galacticFrame.matrixWorld)
        point.project(camera)
        const ox = (point.x * 0.5 + 0.5) * containerW
        const oy = (-point.y * 0.5 + 0.5) * containerH
        const isVisible = point.z > -1 && point.z < 1

        collisionItems.push({
          type: 'stellar',
          id,
          element,
          ox,
          oy,
          initDx: o.labelOffset[0],
          initDy: o.labelOffset[1],
          w: 184,
          h: 46,
          isVisible
        })
      })

      // 2. 四大旋臂标注
      SPIRAL_ARMS.forEach(arm => {
        const element = armRefs.current[arm.id]
        if (!element) return
        const point = new THREE.Vector3(arm.x, arm.y, 0).applyMatrix4(galacticFrame.matrixWorld)
        point.project(camera)
        const ox = (point.x * 0.5 + 0.5) * containerW
        const oy = (-point.y * 0.5 + 0.5) * containerH
        const isVisible = point.z > -1 && point.z < 1 && (!active || active === 'galaxy')

        collisionItems.push({
          type: 'arm',
          id: arm.id,
          element,
          ox,
          oy,
          initDx: 0,
          initDy: 0,
          w: 140,
          h: 36,
          isVisible
        })
      })

      // 运行排斥计算
      const resolvedBoxes = resolveLabelCollisions(collisionItems, containerW, containerH)

      // 应用最终计算出的无重叠坐标与引线
      resolvedBoxes.forEach(box => {
        const el = box.element
        if (!el) return
        if (box.type === 'stellar') {
          el.style.left = `${box.ox}px`
          el.style.top = `${box.oy}px`
          const dx = box.cx - box.ox
          const dy = box.cy - box.oy
          const L = Math.hypot(dx, dy)
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI

          el.style.setProperty('--label-x', `${dx}px`)
          el.style.setProperty('--label-y', `${dy}px`)
          el.style.setProperty('--leader-length', `${L}px`)
          el.style.setProperty('--leader-angle', `${angle}deg`)
          el.style.opacity = box.isVisible ? '1' : '0'
        } else if (box.type === 'arm') {
          el.style.left = `${box.cx}px`
          el.style.top = `${box.cy}px`
          el.style.opacity = box.isVisible ? '1' : '0.2'
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointermove', onMove)
      renderer.domElement.removeEventListener('pointerup', onUp)
      renderer.domElement.removeEventListener('pointercancel', onUp)
      renderer.domElement.removeEventListener('wheel', onWheel)
      scene.traverse(o => {
        o.geometry?.dispose()
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose())
        else o.material?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  const current = selected ? (selected === 'galaxy' ? GALAXY_INFO : OBJECTS[selected]) : null
  const openObject = id => setSelected(id)
  const closeSelection = () => setSelected(selected === 'galaxy' ? null : 'galaxy')

  return (
    <div className={selected ? 'cosmic-explorer selected' : 'cosmic-explorer'}>
      <div className="cosmic-canvas" ref={hostRef} />
      {!ready && (
        <div className="cosmic-loader">
          <i />
          <span>正在构建银河系恒星与旋臂场…</span>
        </div>
      )}
      <div className="cosmic-grid" />

      {/* 左上角状态徽标 */}
      <div className="cosmic-status">
        <span />
        <b>MILKY WAY / RIGID SPIRAL FRAME</b>
        <em>ASTRONOMICAL ACCURATE MODEL · 4 MAIN ARMS</em>
      </div>

      {/* 右上角周边真实星系抽屉切换按钮 */}
      <div className="distant-galaxies-toggle">
        <button className={showGalaxies ? 'active' : ''} onClick={() => setShowGalaxies(!showGalaxies)}>
          <Compass size={14} />
          <span>本星系群 / 邻近星系</span>
          <ChevronDown size={13} style={{ transform: showGalaxies ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
        </button>
        {showGalaxies && (
          <div className="distant-galaxies-panel">
            <header>
              <b>LOCAL GROUP & SATELLITES</b>
              <small>真实天文距离与天体分类</small>
            </header>
            <ul>
              {DISTANT_GALAXIES.map(g => (
                <li key={g.name} style={{ '--galaxy-color': g.color }}>
                  <div>
                    <strong style={{ color: g.color }}>{g.name}</strong>
                    <em>{g.latin}</em>
                    <p>{g.desc}</p>
                  </div>
                  <b>{g.dist}</b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 首页默认左下主文案 */}
      {!selected && (
        <>
          <div className="cosmic-copy">
            <span>PHYTWIN / COMPUTABLE UNIVERSE</span>
            <h1>
              给我们无限算力，
              <br />
              模拟宇宙级物理数字孪生。
            </h1>
            <p>
              从连续场到电荷质量涌现，从太阳系到银河系四大主旋臂——以严谨的天文与流体力学坐标，把宇宙从控制方程构建为可交互的数字孪生。
            </p>
            <div>
              <button onClick={() => setSelected('galaxy')}>
                全览银河系 <Maximize2 size={15} />
              </button>
              <Link to="/lab">
                进入实时实验室 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <GalaxyAnchorLayer onSelect={openObject} anchorRefs={anchorRefs} armRefs={armRefs} />
        </>
      )}

      {/* 天体 / 银河详细展开 */}
      {selected && current && (
        <>
          <button className="cosmic-close" onClick={closeSelection}>
            <X size={17} />
            {selected === 'galaxy' ? '返回首页' : '返回银河总览'}
          </button>
          {selected === 'galaxy' && (
            <GalaxyAnchorLayer expanded onSelect={openObject} anchorRefs={anchorRefs} armRefs={armRefs} />
          )}
          <div className="cosmic-detail">
            <span>
              {current.kind} / {current.index}
            </span>
            <h2>
              {current.name}
              <small>{current.latin}</small>
            </h2>
            <p>{current.description}</p>
            <div className="cosmic-detail-metric">
              <span>{current.metric}</span>
              <b>{current.value}</b>
              {current.spectral && <small style={{ color: current.markerColor || '#a0c4ff' }}>光谱型 / 物理特征: {current.spectral}</small>}
            </div>
            <div className="cosmic-controls-hint">
              <Rotate3D size={15} />
              <span>{selected === 'galaxy' ? '拖动倾斜银河盘' : '拖动旋转天体结构'}</span>
              <MousePointer2 size={14} />
              <span>滚轮缩放视图</span>
            </div>
          </div>
          <div className="cosmic-model-note">
            <b>{selected === 'galaxy' ? 'FOUR-ARM SPIRAL MODEL' : selected === 'solar' ? 'ORBITAL SIMULATION' : 'STELLAR ASTROMETRY'}</b>
            <span>
              {selected === 'galaxy'
                ? '银河系模型包含英仙臂、人马-船底臂、盾牌-南十字臂与矩尺臂四大主旋臂；太阳系标定在距银心 26,700 光年处。'
                : selected === 'solar'
                ? '太阳系包含太阳与八大行星轨道运行；尺寸与周期经过比例缩放以保证可视化呈现。'
                : '天体位置基于天文测距与光谱数据标定：太阳（黄白）、天琴座 α（蓝白）、天龙座 α（右枢，橙红标记）、天狼星（白蓝）。'}
            </span>
          </div>
        </>
      )}

      {/* 底部天文数据提示 */}
      <div className="cosmic-data-note">
        MILKY WAY · FOUR-ARM BARRED SPIRAL MODEL (GAIA / ASTRONOMICAL SURVEYS)
        <br />
        SUN ↔ α LYRAE: ~25 ly · SUN ↔ THUBAN: ~303 ly · α LYRAE ↔ THUBAN: ~280 ly
      </div>

      {/* 滚动提示 */}
      {!selected && (
        <a href="#glueball-origin" className="cosmic-scroll">
          <span>向下探索强相互作用色荷与胶球自束缚仿真</span>
          <ChevronDown size={14} />
        </a>
      )}
    </div>
  )
}
