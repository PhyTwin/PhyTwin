
import * as ReactRuntime from './jsx-runtime-Cltr0gcK.js';
const React = ReactRuntime.n();
const { createElement, useEffect, useRef, useState, useMemo, useCallback, lazy, Suspense, Fragment } = React;

function createIcon(svgContent) {
  return function IconComponent(props) {
    const size = props.size || 24;
    const color = props.color || 'currentColor';
    const strokeWidth = props.strokeWidth || 2;
    const style = props.style || {};
    const className = props.className || '';
    return createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: props.fill || 'none',
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: className,
      style: style,
      dangerouslySetInnerHTML: { __html: svgContent }
    });
  };
}

const ArrowRight = createIcon('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
const ChevronDown = createIcon('<path d="m6 9 6 6 6-6"/>');
const Compass = createIcon('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
const Crosshair = createIcon('<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>');
const Maximize2 = createIcon('<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>');
const MousePointer2 = createIcon('<path d="m4.037 4.688 6.208 15.176a.75.75 0 0 0 1.378-.052l2.368-6.155 6.155-2.368a.75.75 0 0 0 .052-1.378L5.022 3.693a.75.75 0 0 0-.985.995z"/>');
const Rotate3D = createIcon('<path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"/><path d="m15.194 13.707 3.814 1.86-1.86 3.814"/><path d="M19 15.57c-1.804.885-3.843 1.43-6 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"/>');
const Sparkles = createIcon('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>');
const X = createIcon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const Activity = createIcon('<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/>');
const Atom = createIcon('<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>');
const Box = createIcon('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>');
const Boxes = createIcon('<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l5 2.88a2 2 0 0 0 1.97 0l5-2.88A2 2 0 0 0 16 17.87v-3.24a2 2 0 0 0-.97-1.71l-5-2.88a2 2 0 0 0-1.97 0l-5 2.88Z"/><path d="M7 16.5 3 14"/><path d="m11 16.5 4-2.5"/><path d="M11 14v5"/><path d="M12 2v5"/><path d="M17 6.5l4-2.5"/><path d="M17 14l4-2.5"/><path d="m7 6.5-4-2.5"/><path d="M7 2v5"/>');
const Cpu = createIcon('<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>');
const Download = createIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>');
const Droplets = createIcon('<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>');
const Flame = createIcon('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>');
const Gauge = createIcon('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>');
const Info = createIcon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>');
const Layers = createIcon('<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>');
const Magnet = createIcon('<path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/>');
const Orbit = createIcon('<circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M10.4 21.9a10 10 0 0 0 9.94-8.4"/><path d="M13.6 2.1a10 10 0 0 0-9.94 8.4"/>');
const Pause = createIcon('<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>');
const Play = createIcon('<polygon points="6 3 20 12 6 21 6 3"/>');
const Radio = createIcon('<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>');
const RefreshCw = createIcon('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>');
const RotateCcw = createIcon('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>');
const ShieldAlert = createIcon('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>');
const TestTubes = createIcon('<path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2"/><path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2"/><path d="M3 2h7"/><path d="M14 2h7"/><path d="M4 12h5"/><path d="M15 12h5"/>');
const Waves = createIcon('<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>');
const Wind = createIcon('<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>');
const Zap = createIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>');

function Link(props) {
  const { to, children, ...rest } = props;
  return createElement('a', { href: to, ...rest }, children);
}

import * as THREE from './three.module-CMwKnOU8.js';

// 银河系刚体缓慢自转速率
const GALAXY_ROTATION_RATE = Math.PI * 2 / (12 * 60 * 60);

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
};

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
};

// 银河系四大主旋臂标注
const SPIRAL_ARMS = [{
  id: 'perseus',
  name: '英仙臂 (Perseus Arm)',
  latin: 'Major Outer Arm',
  x: -1.45,
  y: -2.48,
  color: '#86c8ff'
}, {
  id: 'sagittarius',
  name: '人马-船底臂 (Sagittarius Arm)',
  latin: 'Major Inner Arm',
  x: 1.95,
  y: -1.35,
  color: '#6db8ff'
}, {
  id: 'scutum',
  name: '盾牌-南十字臂 (Scutum-Centaurus)',
  latin: 'Major Molecular Arm',
  x: 1.55,
  y: 1.75,
  color: '#8ec5ff'
}, {
  id: 'norma',
  name: '矩尺-天鹅臂 (Norma-Cygnus Arm)',
  latin: 'Innermost / Outer Arm',
  x: -1.95,
  y: 1.25,
  color: '#7ab3ff'
}];

// 银河系周边与本星系群主要真实星系
const DISTANT_GALAXIES = [{
  name: '大麦哲伦云 (LMC)',
  latin: 'Large Magellanic Cloud',
  dist: '≈ 163,000 ly',
  desc: '银河系最大卫星星系，棒旋矮星系',
  color: '#82d4ff'
}, {
  name: '小麦哲伦云 (SMC)',
  latin: 'Small Magellanic Cloud',
  dist: '≈ 204,000 ly',
  desc: '不规则矮星系，含丰富恒星形成区',
  color: '#7ad0e8'
}, {
  name: '仙女座星系 (M31)',
  latin: 'Andromeda Galaxy',
  dist: '≈ 2,500,000 ly',
  desc: '本星系群最大螺旋星系，未来将与银河系并合',
  color: '#ffd59e'
}, {
  name: '三角座星系 (M33)',
  latin: 'Triangulum Galaxy',
  dist: '≈ 2,730,000 ly',
  desc: '本星系群第三大星系，弥漫恒星盘',
  color: '#c7b8ff'
}];
function makeGalaxy() {
  const group = new THREE.Group();
  let seed = 48271;
  const random = () => {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const count = 16000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const ice = new THREE.Color('#a8d8ff');
  const blue = new THREE.Color('#4c79bd');
  const warm = new THREE.Color('#ffd29a');

  // 旋臂极坐标方程：缩短 sweep 系数到 6.8
  const armPoint = (arm, t, radialNoise = 0, angularNoise = 0) => {
    const sweep = 0.22 + t * 6.8;
    const theta = sweep + arm * Math.PI / 2 + angularNoise;
    const r = 0.65 + sweep * 0.38 + radialNoise;
    return new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0);
  };
  for (let i = 0; i < count; i += 1) {
    const bulge = i < count * 0.2;
    let point, color;
    if (bulge) {
      const r = Math.pow(random(), 2.1) * 1.15;
      const theta = random() * Math.PI * 2;
      point = new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, (random() - 0.5) * 0.34 * (1 - r / 1.25));
      color = warm.clone().lerp(ice, 0.16 + random() * 0.22);
    } else {
      const t = Math.pow(random(), 0.84);
      const arm = i % 4;
      const spread = (random() - 0.5) * (0.15 + t * 0.14);
      const twist = (random() - 0.5) * (0.08 + t * 0.05);
      point = armPoint(arm, t, spread, twist);
      point.z = (random() - 0.5) * 0.085 * (1 - t * 0.68);
      color = ice.clone().lerp(blue, 0.12 + random() * 0.46).offsetHSL((random() - 0.5) * 0.02, 0, (random() - 0.5) * 0.1);
    }
    positions.set([point.x, point.y, point.z], i * 3);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  const stars = new THREE.BufferGeometry();
  stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  stars.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  group.add(new THREE.Points(stars, new THREE.PointsMaterial({
    size: 0.026,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })));

  // 绘制四条主旋臂骨架线
  for (let arm = 0; arm < 4; arm += 1) {
    const curve = Array.from({
      length: 180
    }, (_, i) => armPoint(arm, i / 179));
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve), new THREE.LineBasicMaterial({
      color: arm % 2 ? 0x6d9ed4 : 0x86c8ff,
      transparent: true,
      opacity: arm % 2 ? 0.16 : 0.22,
      blending: THREE.AdditiveBlending
    })));
  }

  // 银河核心棒状结构
  const bar = new THREE.Mesh(new THREE.SphereGeometry(0.52, 36, 20), new THREE.MeshBasicMaterial({
    color: 0xffd7a3,
    transparent: true,
    opacity: 0.52,
    blending: THREE.AdditiveBlending
  }));
  bar.scale.set(2.1, 0.6, 0.26);
  bar.rotation.z = 0.38;
  group.add(bar)

  // 标尺同心参考环
  ;
  [1.18, 2.36, 3.54].forEach(r => {
    const ring = orbitLine(r);
    ring.material.color.set(0x597390);
    ring.material.opacity = 0.09;
    group.add(ring);
  });
  return group;
}
function makeBackground() {
  const count = 1600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions.set([(Math.random() - 0.5) * 28, (Math.random() - 0.5) * 18, -3 - Math.random() * 7], i * 3);
    const c = 0.35 + Math.random() * 0.55;
    colors.set([c * 0.72, c * 0.82, c], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.024,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
}
function orbitLine(radius) {
  const points = Array.from({
    length: 97
  }, (_, i) => new THREE.Vector3(Math.cos(i / 96 * Math.PI * 2) * radius, Math.sin(i / 96 * Math.PI * 2) * radius, 0));
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({
    color: 0x6d91ac,
    transparent: true,
    opacity: 0.2
  }));
}
function makeSolarSystem() {
  const group = new THREE.Group();
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 28, 18), new THREE.MeshBasicMaterial({
    color: 0xfff0b3
  }));
  const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 14), new THREE.MeshBasicMaterial({
    color: 0xffd97d,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  }));
  group.add(sun);
  group.add(sunGlow);
  const specs = [[0.25, 0.026, 0x9b8f84, 1.8], [0.35, 0.04, 0xd7a66d, 1.35], [0.47, 0.044, 0x4f91d9, 1], [0.59, 0.034, 0xc65e42, 0.8], [0.79, 0.095, 0xd7aa79, 0.43], [1.02, 0.082, 0xe2c18c, 0.32], [1.24, 0.063, 0x82c4d5, 0.23], [1.43, 0.059, 0x5177c7, 0.18]];
  const planets = [];
  specs.forEach(([radius, size, color, speed], i) => {
    group.add(orbitLine(radius));
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 18, 12), new THREE.MeshStandardMaterial({
      color,
      roughness: 0.75,
      metalness: 0.05
    }));
    mesh.userData = {
      radius,
      speed,
      phase: i * 0.83,
      spin: 0.014 + i * 0.006
    };
    group.add(mesh);
    planets.push(mesh);
    if (i === 5) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.35, size * 2.05, 30), new THREE.MeshBasicMaterial({
        color: 0xd5bf95,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.62
      }));
      ring.rotation.x = 1.15;
      mesh.add(ring);
    }
  });
  group.userData.planets = planets;
  group.userData.sun = sun;
  return group;
}
function makeStar(colorHex, size = 0.13, isDual = false) {
  const group = new THREE.Group();
  const star = new THREE.Mesh(new THREE.SphereGeometry(size, 22, 16), new THREE.MeshBasicMaterial({
    color: colorHex
  }));
  group.add(star);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(size * 2.6, 16, 12), new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  }));
  group.add(halo);
  if (isDual) {
    const companion = new THREE.Mesh(new THREE.SphereGeometry(size * 0.45, 14, 10), new THREE.MeshBasicMaterial({
      color: 0xffffff
    }));
    companion.position.set(size * 1.8, size * 0.6, 0);
    group.add(companion);
  }
  return group;
}
function makeGlobularCluster() {
  const group = new THREE.Group();
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(750);
  const colors = new Float32Array(750);
  let seed = 7919;
  const random = () => {
    seed = seed * 48271 % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 250; i += 1) {
    const r = Math.pow(random(), 1.85) * 0.58;
    const theta = random() * Math.PI * 2;
    positions.set([Math.cos(theta) * r, Math.sin(theta) * r * 0.62, (random() - 0.5) * 0.22], i * 3);
    const glow = 0.6 + random() * 0.4;
    colors.set([0.95 * glow, 0.85 * glow, 0.52 * glow], i * 3);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  group.add(new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.038,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })));
  return group;
}
function GalaxyAnchorLayer({
  expanded = false,
  onSelect,
  anchorRefs,
  armRefs
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: expanded ? 'galaxy-marker-layer expanded' : 'galaxy-marker-layer'
  }, /*#__PURE__*/React.createElement("div", {
    className: "galactic-center-label"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", null, "\u4EBA\u9A6C\u5EA7 A* (\u94F6\u5FC3)", /*#__PURE__*/React.createElement("small", null, "GALACTIC CENTER \xB7 0 ly \xB7 4.15M M\u2609"))), SPIRAL_ARMS.map(arm => /*#__PURE__*/React.createElement("div", {
    key: arm.id,
    ref: node => {
      if (armRefs && armRefs.current) armRefs.current[arm.id] = node;
    },
    className: "spiral-arm-tag",
    style: {
      '--arm-color': arm.color
    }
  }, /*#__PURE__*/React.createElement("span", null, arm.name), /*#__PURE__*/React.createElement("small", null, arm.latin))), Object.entries(OBJECTS).map(([id, item]) => {
    const [labelX, labelY] = item.labelOffset;
    const leaderLength = Math.hypot(labelX, labelY);
    const leaderAngle = Math.atan2(labelY, labelX) * 180 / Math.PI;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      ref: node => {
        anchorRefs.current[id] = node;
      },
      className: `galaxy-anchor ${id}`,
      style: {
        '--label-x': `${labelX}px`,
        '--label-y': `${labelY}px`,
        '--leader-length': `${leaderLength}px`,
        '--leader-angle': `${leaderAngle}deg`,
        '--anchor-color': item.markerColor
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "anchor-dot"
    }), /*#__PURE__*/React.createElement("i", {
      className: "anchor-leader"
    }), /*#__PURE__*/React.createElement("button", {
      className: "galaxy-marker",
      onClick: () => onSelect(id)
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("small", null, item.kind), /*#__PURE__*/React.createElement("b", null, item.name), /*#__PURE__*/React.createElement("em", null, item.distance)), /*#__PURE__*/React.createElement(Crosshair, {
      size: 13
    })));
  }));
}
export default function CosmicExplorer() {
  const hostRef = useRef(null);
  const anchorRefs = useRef({});
  const armRefs = useRef({});
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [showGalaxies, setShowGalaxies] = useState(false);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    const host = hostRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x010207, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010207, 0.02);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 11);
    scene.add(new THREE.AmbientLight(0x8ebcff, 1.8));
    const light = new THREE.PointLight(0xffd79b, 8, 12);
    light.position.set(0, 0, 3);
    scene.add(light);
    const background = makeBackground();
    scene.add(background);
    const galacticFrame = new THREE.Group();
    const galaxy = makeGalaxy();
    galacticFrame.add(galaxy);
    scene.add(galacticFrame);

    // 创建局部高精模型
    const localGroups = {
      solar: makeSolarSystem(),
      vega: makeStar(0xcce5ff, 0.14),
      thuban: makeStar(0xff8c42, 0.13, true),
      sirius: makeStar(0xe0f0ff, 0.13, true),
      omegaCen: makeGlobularCluster()
    };
    Object.entries(localGroups).forEach(([id, g]) => {
      g.position.set(OBJECTS[id].x, OBJECTS[id].y, (OBJECTS[id].z || 0) + 0.18);
      g.scale.setScalar(0.001);
      galacticFrame.add(g);
    });
    const markerMeshes = {};
    Object.entries(OBJECTS).forEach(([id, o]) => {
      const marker = new THREE.Mesh(new THREE.RingGeometry(0.045, 0.075, 24), new THREE.MeshBasicMaterial({
        color: o.markerHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92
      }));
      marker.position.set(o.x, o.y, (o.z || 0) + 0.12);
      galacticFrame.add(marker);
      markerMeshes[id] = marker;
    });
    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
      camera.aspect = rect.width / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    const mouse = {
      down: false,
      lastX: 0,
      lastY: 0,
      dragX: 0,
      dragY: 0,
      zoom: 0
    };
    const onDown = e => {
      mouse.down = true;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onMove = e => {
      if (mouse.down && selectedRef.current) {
        mouse.dragX += (e.clientX - mouse.lastX) * 0.006;
        mouse.dragY += (e.clientY - mouse.lastY) * 0.005;
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
      }
    };
    const onUp = () => {
      mouse.down = false;
    };
    const onWheel = e => {
      if (selectedRef.current) {
        e.preventDefault();
        mouse.zoom = Math.max(-1.4, Math.min(1.8, mouse.zoom + e.deltaY * 0.0025));
      }
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointercancel', onUp);
    renderer.domElement.addEventListener('wheel', onWheel, {
      passive: false
    });
    let frame = 0;
    const start = performance.now();
    setReady(true);
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;
      const active = selectedRef.current;
      const target = active ? active === 'galaxy' ? GALAXY_INFO : OBJECTS[active] : null;

      // 银河坐标系刚体自转
      galacticFrame.rotation.z = t * GALAXY_ROTATION_RATE;
      galacticFrame.rotation.x = THREE.MathUtils.lerp(galacticFrame.rotation.x, active === 'galaxy' ? mouse.dragY : 0, 0.055);
      galacticFrame.rotation.y = THREE.MathUtils.lerp(galacticFrame.rotation.y, active === 'galaxy' ? mouse.dragX : 0, 0.055);
      const frameScale = active && active !== 'galaxy' ? 0.78 : active === 'galaxy' ? 1.1 : 1;
      galacticFrame.scale.setScalar(THREE.MathUtils.lerp(galacticFrame.scale.x, frameScale, 0.04));
      scene.updateMatrixWorld(true);
      const targetPoint = new THREE.Vector3(target?.x || 0, target?.y || 0, target?.z || 0);
      if (active && active !== 'galaxy') targetPoint.applyMatrix4(galacticFrame.matrixWorld);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPoint.x, 0.045);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPoint.y, 0.045);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, active === 'galaxy' ? 7.4 + mouse.zoom : target ? 4.25 + mouse.zoom : 11, 0.045);
      camera.lookAt(camera.position.x, camera.position.y, 0);
      Object.entries(localGroups).forEach(([id, g]) => {
        const shown = id === active;
        const targetScale = shown ? id === 'solar' ? 1.08 : 1.22 : 0.001;
        const s = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.065);
        g.scale.setScalar(s);
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, shown ? mouse.dragY : 0, 0.06);
        g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, shown ? mouse.dragX : 0, 0.06);
        if (shown && id !== 'solar') g.rotation.z += 0.0008;
      });
      const solar = localGroups.solar;
      solar.userData.sun.rotation.y += 0.006;
      solar.userData.planets.forEach(p => {
        const a = p.userData.phase + t * p.userData.speed;
        p.position.set(Math.cos(a) * p.userData.radius, Math.sin(a) * p.userData.radius, 0);
        p.rotation.y += p.userData.spin;
      });
      Object.entries(markerMeshes).forEach(([id, m]) => {
        m.visible = !active;
        m.rotation.z = t * (id === 'solar' ? 0.5 : 0.22);
        const pulse = 1 + Math.sin(t * 2 + parseInt(OBJECTS[id].index)) * 0.12;
        m.scale.setScalar(pulse);
      });

      // 投影锚点位置
      Object.entries(OBJECTS).forEach(([id, o]) => {
        const element = anchorRefs.current[id];
        if (!element) return;
        const point = new THREE.Vector3(o.x, o.y, o.z || 0).applyMatrix4(galacticFrame.matrixWorld);
        point.project(camera);
        element.style.left = `${(point.x * 0.5 + 0.5) * 100}%`;
        element.style.top = `${(-point.y * 0.5 + 0.5) * 100}%`;
        element.style.opacity = point.z > -1 && point.z < 1 ? '1' : '0';
      });

      // 投影旋臂标签
      SPIRAL_ARMS.forEach(arm => {
        const element = armRefs.current[arm.id];
        if (!element) return;
        const point = new THREE.Vector3(arm.x, arm.y, 0).applyMatrix4(galacticFrame.matrixWorld);
        point.project(camera);
        element.style.left = `${(point.x * 0.5 + 0.5) * 100}%`;
        element.style.top = `${(-point.y * 0.5 + 0.5) * 100}%`;
        element.style.opacity = !active || active === 'galaxy' ? '1' : '0.2';
      });
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointercancel', onUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      scene.traverse(o => {
        o.geometry?.dispose();
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());else o.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  const current = selected ? selected === 'galaxy' ? GALAXY_INFO : OBJECTS[selected] : null;
  const openObject = id => setSelected(id);
  const closeSelection = () => setSelected(selected === 'galaxy' ? null : 'galaxy');
  return /*#__PURE__*/React.createElement("div", {
    className: selected ? 'cosmic-explorer selected' : 'cosmic-explorer'
  }, /*#__PURE__*/React.createElement("div", {
    className: "cosmic-canvas",
    ref: hostRef
  }), !ready && /*#__PURE__*/React.createElement("div", {
    className: "cosmic-loader"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", null, "\u6B63\u5728\u6784\u5EFA\u94F6\u6CB3\u7CFB\u6052\u661F\u4E0E\u65CB\u81C2\u573A\u2026")), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-status"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("b", null, "MILKY WAY / RIGID SPIRAL FRAME"), /*#__PURE__*/React.createElement("em", null, "ASTRONOMICAL ACCURATE MODEL \xB7 4 MAIN ARMS")), /*#__PURE__*/React.createElement("div", {
    className: "distant-galaxies-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: showGalaxies ? 'active' : '',
    onClick: () => setShowGalaxies(!showGalaxies)
  }, /*#__PURE__*/React.createElement(Compass, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "\u672C\u661F\u7CFB\u7FA4 / \u90BB\u8FD1\u661F\u7CFB"), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 13,
    style: {
      transform: showGalaxies ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s'
    }
  })), showGalaxies && /*#__PURE__*/React.createElement("div", {
    className: "distant-galaxies-panel"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("b", null, "LOCAL GROUP & SATELLITES"), /*#__PURE__*/React.createElement("small", null, "\u771F\u5B9E\u5929\u6587\u8DDD\u79BB\u4E0E\u5929\u4F53\u5206\u7C7B")), /*#__PURE__*/React.createElement("ul", null, DISTANT_GALAXIES.map(g => /*#__PURE__*/React.createElement("li", {
    key: g.name,
    style: {
      '--galaxy-color': g.color
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: g.color
    }
  }, g.name), /*#__PURE__*/React.createElement("em", null, g.latin), /*#__PURE__*/React.createElement("p", null, g.desc)), /*#__PURE__*/React.createElement("b", null, g.dist)))))), !selected && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cosmic-copy"
  }, /*#__PURE__*/React.createElement("span", null, "PHYTWIN / COMPUTABLE UNIVERSE"), /*#__PURE__*/React.createElement("h1", null, "\u7ED9\u6211\u4EEC\u65E0\u9650\u7B97\u529B\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u6A21\u62DF\u5B87\u5B99\u7EA7\u7269\u7406\u6570\u5B57\u5B6A\u751F\u3002"), /*#__PURE__*/React.createElement("p", null, "\u4ECE\u8FDE\u7EED\u573A\u5230\u7535\u8377\u8D28\u91CF\u6D8C\u73B0\uFF0C\u4ECE\u592A\u9633\u7CFB\u5230\u94F6\u6CB3\u7CFB\u56DB\u5927\u4E3B\u65CB\u81C2\u2014\u2014\u4EE5\u4E25\u8C28\u7684\u5929\u6587\u4E0E\u6D41\u4F53\u529B\u5B66\u5750\u6807\uFF0C\u628A\u5B87\u5B99\u4ECE\u63A7\u5236\u65B9\u7A0B\u6784\u5EFA\u4E3A\u53EF\u4EA4\u4E92\u7684\u6570\u5B57\u5B6A\u751F\u3002"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelected('galaxy')
  }, "\u5168\u89C8\u94F6\u6CB3\u7CFB ", /*#__PURE__*/React.createElement(Maximize2, {
    size: 15
  })), /*#__PURE__*/React.createElement(Link, {
    to: "/lab"
  }, "\u8FDB\u5165\u5B9E\u65F6\u5B9E\u9A8C\u5BA4 ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })))), /*#__PURE__*/React.createElement(GalaxyAnchorLayer, {
    onSelect: openObject,
    anchorRefs: anchorRefs,
    armRefs: armRefs
  })), selected && current && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "cosmic-close",
    onClick: closeSelection
  }, /*#__PURE__*/React.createElement(X, {
    size: 17
  }), selected === 'galaxy' ? '返回首页' : '返回银河总览'), selected === 'galaxy' && /*#__PURE__*/React.createElement(GalaxyAnchorLayer, {
    expanded: true,
    onSelect: openObject,
    anchorRefs: anchorRefs,
    armRefs: armRefs
  }), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-detail"
  }, /*#__PURE__*/React.createElement("span", null, current.kind, " / ", current.index), /*#__PURE__*/React.createElement("h2", null, current.name, /*#__PURE__*/React.createElement("small", null, current.latin)), /*#__PURE__*/React.createElement("p", null, current.description), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-detail-metric"
  }, /*#__PURE__*/React.createElement("span", null, current.metric), /*#__PURE__*/React.createElement("b", null, current.value), current.spectral && /*#__PURE__*/React.createElement("small", {
    style: {
      color: current.markerColor || '#a0c4ff'
    }
  }, "\u5149\u8C31\u578B / \u7269\u7406\u7279\u5F81: ", current.spectral)), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-controls-hint"
  }, /*#__PURE__*/React.createElement(Rotate3D, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, selected === 'galaxy' ? '拖动倾斜银河盘' : '拖动旋转天体结构'), /*#__PURE__*/React.createElement(MousePointer2, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "\u6EDA\u8F6E\u7F29\u653E\u89C6\u56FE"))), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-model-note"
  }, /*#__PURE__*/React.createElement("b", null, selected === 'galaxy' ? 'FOUR-ARM SPIRAL MODEL' : selected === 'solar' ? 'ORBITAL SIMULATION' : 'STELLAR ASTROMETRY'), /*#__PURE__*/React.createElement("span", null, selected === 'galaxy' ? '银河系模型包含英仙臂、人马-船底臂、盾牌-南十字臂与矩尺臂四大主旋臂；太阳系标定在距银心 26,700 光年处。' : selected === 'solar' ? '太阳系包含太阳与八大行星轨道运行；尺寸与周期经过比例缩放以保证可视化呈现。' : '天体位置基于天文测距与光谱数据标定：太阳（黄白）、天琴座 α（蓝白）、天龙座 α（右枢，橙红标记）、天狼星（白蓝）。'))), /*#__PURE__*/React.createElement("div", {
    className: "cosmic-data-note"
  }, "MILKY WAY \xB7 FOUR-ARM BARRED SPIRAL MODEL (GAIA / ASTRONOMICAL SURVEYS)", /*#__PURE__*/React.createElement("br", null), "SUN \u2194 \u03B1 LYRAE: ~25 ly \xB7 SUN \u2194 THUBAN: ~303 ly \xB7 \u03B1 LYRAE \u2194 THUBAN: ~280 ly"), !selected && /*#__PURE__*/React.createElement("a", {
    href: "#glueball-origin",
    className: "cosmic-scroll"
  }, /*#__PURE__*/React.createElement("span", null, "\u5411\u4E0B\u63A2\u7D22\u5F3A\u76F8\u4E92\u4F5C\u7528\u8272\u8377\u4E0E\u80F6\u7403\u81EA\u675F\u7F1A\u4EFF\u771F"), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 14
  })));
}
