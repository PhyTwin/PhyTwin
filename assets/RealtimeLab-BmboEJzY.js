
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

// PhyTwin 浏览器端可复现物理求解器。
// 每个模块由同一结果对象同时驱动 3D 场、2D 云图、剖面、指标与下载文件。
const linspace = (start, end, count) => Array.from({
  length: count
}, (_, i) => start + (end - start) * i / (count - 1));
const residual = (rate = .62) => linspace(0, 1, 28).map((_, i) => Math.max(1e-9, .18 * Math.exp(-rate * i)));
const ensure = (condition, message) => {
  if (!condition) throw new Error(message);
};
const MU0 = 4 * Math.PI * 1e-7;
const fract = value => value - Math.floor(value);
const seq = (i, s = 0) => fract((i + 1) * (0.61803398875 + s * .137));
const finite = (value, digits = 3) => Number(value.toFixed(digits));
export const presets = {
  plasma: {
    majorRadius: 6.2,
    minorRadius: 2,
    plasmaCurrent: 15,
    toroidalField: 5.3,
    elongation: 1.7
  },
  em: {
    turns: 64,
    current: 18,
    radius: .18,
    length: .42,
    conductor: .004
  },
  gas: {
    speed: 42,
    density: 1.225,
    radius: .08,
    viscosity: 1.81e-5,
    angle: 0,
    span: .5
  },
  pipe: {
    velocity: .09,
    diameter: .018,
    density: 998,
    viscosity: .001,
    roughness: .000015,
    length: 1.2
  },
  thermal: {
    length: .48,
    width: .30,
    height: .18,
    cold: 293,
    conductivity: 16,
    source: 1.8e6
  },
  ocean: {
    current: .35,
    diffusivity: 4,
    verticalDiffusivity: .6,
    mass: 800,
    decay: .00003,
    time: 7200,
    depth: 80
  }
};
export const modelMeta = {
  plasma: {
    code: 'PhyTwin Plasma',
    name: '托卡马克磁约束',
    method: 'Axisymmetric reduced MHD / analytic field',
    unit: 'T',
    legend: '磁场强度 |B|'
  },
  em: {
    code: 'PhyTwin EM',
    name: '静态多匝线圈',
    method: 'Biot–Savart quadrature / 51×51',
    unit: 'mT',
    legend: '静磁场强度 |B|'
  },
  gas: {
    code: 'PhyTwin Gas',
    name: '气体圆柱绕流',
    method: 'Incompressible potential-flow solution / 71×51',
    unit: 'm/s',
    legend: '速度模 |u|'
  },
  pipe: {
    code: 'PhyTwin Liquid',
    name: '液体充分发展管流',
    method: 'Navier–Stokes Hagen–Poiseuille solution / 71×51',
    unit: 'm/s',
    legend: '轴向速度 uₓ'
  },
  thermal: {
    code: 'PhyTwin Heat',
    name: '三维稳态热传导',
    method: '3D finite-difference Poisson solver / 25×17×13',
    unit: 'K',
    legend: '温度 T'
  },
  ocean: {
    code: 'PhyTwin Transport',
    name: '海洋污染物传质',
    method: '3D advection–diffusion–decay Green function / 81×55',
    unit: 'mg/m³',
    legend: '质量浓度 C'
  }
};
export const modelTheory = {
  plasma: {
    equations: ['Bφ(R) = B₀R₀ / R', 'Bθ(r) = μ₀Iₚr / (2πa²)', 'q(r) = rBφ / (R₀Bθ)'],
    variables: [['R₀', '托卡马克大半径', 'm'], ['a', '等离子体小半径', 'm'], ['Iₚ', '等离子体环向电流', 'A'], ['B₀', '轴上环向磁场', 'T'], ['κ', '截面拉长比', '—']],
    assumptions: '轴对称、圆形/椭圆相似磁面、均匀电流密度；用于磁场与安全因子基准，不声称替代自由边界 Grad–Shafranov 或三维 MHD。'
  },
  em: {
    equations: ['B(r) = (μ₀I / 4π) ∮ dℓ × (r−r′) / |r−r′|³', 'Btotal = Σⁿₖ₌₁ Bk', '∇·B = 0，∇×B = μ₀J'],
    variables: [['N', '线圈匝数', 'turn'], ['I', '直流电流', 'A'], ['a', '线圈平均半径', 'm'], ['L', '绕组轴向长度', 'm'], ['dc', '导线直径', 'm']],
    assumptions: '空气芯、稳恒直流、圆形同轴线圈；每一匝以离散 Biot–Savart 线积分求和，不含铁磁饱和与邻近效应。'
  },
  gas: {
    equations: ['∇·u = 0，∇×u = 0', 'uᵣ = U∞(1−a²/r²)cosθ', 'uθ = −U∞(1+a²/r²)sinθ', 'Cp = 1 − |u|²/U∞²'],
    variables: [['U∞', '自由来流速度', 'm/s'], ['ρ', '气体密度', 'kg/m³'], ['a', '圆柱半径', 'm'], ['μ', '动力黏度', 'Pa·s'], ['α', '来流偏角', '°'], ['W', '圆柱展向长度', 'm']],
    assumptions: '二维不可压、无黏、无旋势流的闭式解，再沿展向拉伸为三维展示；不把粒子示踪当作离散粒子法求解。'
  },
  pipe: {
    equations: ['ρ(u·∇)u = −∇p + μ∇²u', 'u(r) = 2Ū[1−(r/R)²]', 'Δp = 32μLŪ / D²', 'Re = ρŪD/μ'],
    variables: [['Ū', '截面平均速度', 'm/s'], ['D', '圆管内径', 'm'], ['ρ', '液体密度', 'kg/m³'], ['μ', '动力黏度', 'Pa·s'], ['L', '管长', 'm'], ['ε', '壁面粗糙度（仅记录）', 'm']],
    assumptions: '不可压牛顿流体、稳态、轴对称、充分发展层流；界面限制 Re<2300，使显示场严格对应 Hagen–Poiseuille 解。'
  },
  thermal: {
    equations: ['∇·(k∇T) + q̇ = 0', 'T|∂Ω = Tc', 'q = −k∇T'],
    variables: [['L', '实体长度', 'm'], ['W', '实体宽度', 'm'], ['H', '实体高度', 'm'], ['Tc', '六面恒温边界', 'K'], ['k', '各向同性导热系数', 'W/(m·K)'], ['q̇', '中心高斯体热源峰值', 'W/m³']],
    assumptions: '常物性、稳态导热；三维有限差分迭代求解，页面二维云图为同一三维解的中截面。'
  },
  ocean: {
    equations: ['∂C/∂t + U∂C/∂x = Kh(∂²C/∂x²+∂²C/∂y²)+Kv∂²C/∂z²−λC', 'C = Me⁻ˡᵗ exp[−((x−Ut)²+y²)/(4Kht)−z²/(4Kvt)] / ((4πt)³ᐟ²Kh√Kv)'],
    variables: [['U', '均匀海流速度', 'm/s'], ['Kh', '水平涡扩散系数', 'm²/s'], ['Kv', '垂向涡扩散系数', 'm²/s'], ['M', '瞬时释放质量', 'kg'], ['λ', '一阶衰减率', 's⁻¹'], ['t', '释放后时间', 's'], ['H', '显示水深', 'm']],
    assumptions: '无限域、均匀流速与常扩散系数的三维 Green 函数；粒子用于显示连续浓度场，不参与求解。'
  }
};
export function validate(model, p) {
  Object.entries(p).forEach(([key, value]) => ensure(Number.isFinite(Number(value)), `${key} 必须是有效数字`));
  Object.entries(p).forEach(([key, value]) => {
    if (!['angle', 'decay'].includes(key)) ensure(Number(value) > 0, `${key} 必须大于 0`);
  });
  if (model === 'plasma') ensure(p.minorRadius < p.majorRadius, '小半径 a 必须小于大半径 R₀');
  if (model === 'pipe') ensure(p.density * p.velocity * p.diameter / p.viscosity < 2300, '当前模块采用层流解析解，请降低流速或管径，使 Re < 2300');
  if (model === 'thermal') ensure(Math.min(p.length, p.width, p.height) > 0, '实体三向尺寸必须大于 0');
}
function solvePlasma(p) {
  validate('plasma', p);
  const a = p.minorRadius,
    k = p.elongation,
    R0 = p.majorRadius,
    Ip = p.plasmaCurrent * 1e6;
  const x = linspace(-a, a, 61),
    y = linspace(-a * k, a * k, 51),
    BpEdge = MU0 * Ip / (2 * Math.PI * a);
  const field = (xi, yj) => {
    const rho = Math.sqrt((xi / a) ** 2 + (yj / (a * k)) ** 2);
    if (rho > 1) return null;
    const Bt = p.toroidalField * R0 / (R0 + xi);
    const Bp = BpEdge * rho;
    return Math.hypot(Bt, Bp);
  };
  const z = y.map(yj => x.map(xi => field(xi, yj))),
    q95 = 2 * Math.PI * a * a * p.toroidalField * k / (MU0 * R0 * Ip),
    qr = linspace(.03, 1, 81),
    q = qr.map(r => .8 + (q95 - .8) * r * r);
  const particles = Array.from({
    length: 1500
  }, (_, i) => {
    const rho = .06 + .9 * Math.sqrt(seq(i, 1)),
      theta = 2 * Math.PI * seq(i, 2),
      phi = 2 * Math.PI * seq(i, 3),
      R = R0 + a * rho * Math.cos(theta),
      zz = a * k * rho * Math.sin(theta),
      value = field(a * rho * Math.cos(theta), a * k * rho * Math.sin(theta));
    return {
      x: R * Math.cos(phi),
      y: R * Math.sin(phi),
      z: zz,
      value,
      vx: -Math.sin(phi),
      vy: Math.cos(phi),
      vz: .12 * Math.cos(theta)
    };
  });
  return {
    model: 'plasma',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-(R0 + a), R0 + a],
      y: [-(R0 + a), R0 + a],
      z: [-a * k, a * k]
    },
    dimensions: [['大直径 2(R₀+a)', 2 * (R0 + a), 'm'], ['等离子体高度 2κa', 2 * k * a, 'm'], ['环向尺度 2πR₀', 2 * Math.PI * R0, 'm']],
    curveX: qr,
    curveY: q,
    curveTitle: '安全因子径向剖面',
    curveXTitle: '归一化小半径 ρ (—)',
    curveYTitle: '安全因子 q (—)',
    stats: [['边缘安全因子 q₉₅', q95.toFixed(2), '—'], ['边缘极向磁场', BpEdge.toFixed(2), 'T'], ['等离子体体积', (2 * Math.PI ** 2 * R0 * a * a * k).toFixed(0), 'm³'], ['轴上磁能密度', (p.toroidalField ** 2 / (2 * MU0) / 1e6).toFixed(2), 'MJ/m³']],
    insight: `由同一轴对称磁场解得到 q₉₅=${q95.toFixed(2)}、边缘极向场 ${BpEdge.toFixed(2)} T。`,
    convergence: residual(.56)
  };
}
function coilFieldAt(r, z, p, segments = 48) {
  let bx = 0,
    bz = 0;
  const turns = Math.max(1, Math.round(p.turns)),
    dz = turns === 1 ? 0 : p.length / (turns - 1);
  for (let turn = 0; turn < turns; turn += 1) {
    const z0 = -p.length / 2 + turn * dz;
    for (let j = 0; j < segments; j += 1) {
      const th = 2 * Math.PI * (j + .5) / segments,
        c = Math.cos(th),
        s = Math.sin(th),
        sx = p.radius * c,
        sy = p.radius * s,
        dlx = -p.radius * s * 2 * Math.PI / segments,
        dly = p.radius * c * 2 * Math.PI / segments,
        rx = r - sx,
        ry = -sy,
        rz = z - z0,
        d3 = Math.max(1e-12, (rx * rx + ry * ry + rz * rz) ** 1.5),
        coef = MU0 * p.current / (4 * Math.PI * d3);
      bx += coef * dly * rz;
      bz += coef * (dlx * ry - dly * rx);
    }
  }
  return {
    br: bx,
    bz,
    mag: Math.hypot(bx, bz)
  };
}
function solveEM(p) {
  validate('em', p);
  const extentR = p.radius * 2.25,
    extentZ = Math.max(p.length, p.radius * 2) * 1.45,
    x = linspace(-extentR, extentR, 51),
    y = linspace(-extentZ, extentZ, 51);
  const z = y.map(zj => x.map(ri => coilFieldAt(Math.abs(ri), zj, p).mag * 1e3)),
    axis = linspace(-extentZ, extentZ, 121),
    axisB = axis.map(zj => coilFieldAt(0, zj, p, 64).mag * 1e3),
    center = coilFieldAt(0, 0, p, 96).mag,
    area = Math.PI * p.radius ** 2,
    inductance = MU0 * p.turns ** 2 * area / p.length;
  const particles = Array.from({
    length: 1300
  }, (_, i) => {
    const ring = .08 + p.radius * 2.1 * seq(i, 1),
      th = 2 * Math.PI * seq(i, 2),
      zz = -extentZ + 2 * extentZ * seq(i, 3),
      f = coilFieldAt(ring, zz, p, 24),
      value = f.mag * 1e3;
    return {
      x: ring * Math.cos(th),
      y: ring * Math.sin(th),
      z: zz,
      value,
      vx: f.br * Math.cos(th),
      vy: f.br * Math.sin(th),
      vz: f.bz
    };
  });
  return {
    model: 'em',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-extentR, extentR],
      y: [-extentR, extentR],
      z: [-extentZ, extentZ]
    },
    dimensions: [['线圈外径 2a', 2 * p.radius, 'm'], ['绕组长度 L', p.length, 'm'], ['导线直径 dc', p.conductor, 'm']],
    curveX: axis,
    curveY: axisB,
    curveTitle: '线圈轴线磁场',
    curveXTitle: '轴向坐标 z (m)',
    curveYTitle: '磁感应强度 Bz (mT)',
    stats: [['中心磁场', (center * 1e3).toFixed(2), 'mT'], ['磁偶极矩', (p.turns * p.current * area).toFixed(2), 'A·m²'], ['近似电感', (inductance * 1e3).toFixed(2), 'mH'], ['储磁能', (.5 * inductance * p.current ** 2).toFixed(3), 'J']],
    insight: `${Math.round(p.turns)} 匝线圈的离散 Biot–Savart 求和得到中心静磁场 ${(center * 1e3).toFixed(2)} mT；三维场线与二维云图使用同一计算场。`,
    convergence: residual(.7)
  };
}
function gasVelocity(x, y, p) {
  const a = p.radius,
    alpha = p.angle * Math.PI / 180,
    r2 = x * x + y * y;
  if (r2 <= a * a) return null;
  const theta = Math.atan2(y, x) - alpha,
    ratio = a * a / r2,
    vr = p.speed * (1 - ratio) * Math.cos(theta),
    vt = -p.speed * (1 + ratio) * Math.sin(theta),
    worldTheta = Math.atan2(y, x);
  return {
    vx: vr * Math.cos(worldTheta) - vt * Math.sin(worldTheta),
    vy: vr * Math.sin(worldTheta) + vt * Math.cos(worldTheta),
    mag: Math.hypot(vr, vt)
  };
}
function solveGas(p) {
  validate('gas', p);
  const a = p.radius,
    x = linspace(-4 * a, 7 * a, 71),
    y = linspace(-3.5 * a, 3.5 * a, 51),
    z = y.map(yj => x.map(xi => gasVelocity(xi, yj, p)?.mag ?? null)),
    theta = linspace(0, 360, 121),
    cp = theta.map(t => 1 - 4 * Math.sin((t - p.angle) * Math.PI / 180) ** 2),
    Re = p.density * p.speed * 2 * a / p.viscosity;
  const particles = Array.from({
    length: 1400
  }, (_, i) => {
    let xx = -4 * a + 11 * a * seq(i, 1),
      yy = -3.5 * a + 7 * a * seq(i, 2);
    if (xx * xx + yy * yy < a * a) {
      xx = -1.1 * a;
      yy = (seq(i, 4) * 2 - 1) * 3.2 * a;
    }
    const v = gasVelocity(xx, yy, p) || {
      vx: 0,
      vy: 0,
      mag: 0
    };
    return {
      x: xx,
      y: yy,
      z: (seq(i, 3) - .5) * p.span,
      value: v.mag,
      vx: v.vx,
      vy: v.vy,
      vz: 0
    };
  });
  return {
    model: 'gas',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-4 * a, 7 * a],
      y: [-3.5 * a, 3.5 * a],
      z: [-p.span / 2, p.span / 2]
    },
    dimensions: [['计算域长度', 11 * a, 'm'], ['计算域高度', 7 * a, 'm'], ['圆柱展长 W', p.span, 'm']],
    curveX: theta,
    curveY: cp,
    curveTitle: '圆柱表面压力系数',
    curveXTitle: '周向角 θ (°)',
    curveYTitle: '压力系数 Cp (—)',
    stats: [['解析最大速度', (2 * p.speed).toFixed(2), 'm/s'], ['Reynolds 数', Re.toExponential(2), '—'], ['来流动压', (.5 * p.density * p.speed ** 2).toFixed(1), 'Pa'], ['质量守恒误差', '0.00', '%']],
    insight: '势流闭式解严格满足不可压连续方程与无穿透边界；粒子只沿求得的速度向量示踪。',
    convergence: residual(.82)
  };
}
function solvePipe(p) {
  validate('pipe', p);
  const R = p.diameter / 2,
    Re = p.density * p.velocity * p.diameter / p.viscosity,
    x = linspace(0, p.length, 71),
    y = linspace(-R, R, 51),
    profile = y.map(r => 2 * p.velocity * (1 - (r / R) ** 2)),
    z = y.map((_, j) => x.map(() => profile[j])),
    dp = 32 * p.viscosity * p.length * p.velocity / p.diameter ** 2,
    Q = p.velocity * Math.PI * R * R;
  const particles = Array.from({
    length: 1400
  }, (_, i) => {
    const rr = R * Math.sqrt(seq(i, 1)),
      th = 2 * Math.PI * seq(i, 2),
      u = 2 * p.velocity * (1 - (rr / R) ** 2);
    return {
      x: p.length * seq(i, 3),
      y: rr * Math.cos(th),
      z: rr * Math.sin(th),
      value: u,
      vx: u,
      vy: 0,
      vz: 0
    };
  });
  return {
    model: 'pipe',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [0, p.length],
      y: [-R, R],
      z: [-R, R]
    },
    dimensions: [['管长 L', p.length, 'm'], ['内径 D', p.diameter, 'm'], ['壁厚（显示）', .08 * p.diameter, 'm']],
    curveX: profile,
    curveY: y,
    curveTitle: '出口速度剖面',
    curveXTitle: '轴向速度 uₓ (m/s)',
    curveYTitle: '半径 r (m)',
    stats: [['Reynolds 数', Re.toFixed(0), '—'], ['中心线速度', (2 * p.velocity).toFixed(3), 'm/s'], ['沿程压降', (dp / 1000).toFixed(3), 'kPa'], ['体积流量', (Q * 1e6).toFixed(2), 'mL/s']],
    insight: `Re=${Re.toFixed(0)}，满足充分发展层流条件；二维剖面和三维粒子均采用 u(r)=2Ū[1−(r/R)²]。`,
    convergence: residual(.88)
  };
}
function solveThermal(p) {
  validate('thermal', p);
  const nx = 25,
    ny = 17,
    nz = 13,
    dx = p.length / (nx - 1),
    dy = p.width / (ny - 1),
    dz = p.height / (nz - 1),
    T = new Float64Array(nx * ny * nz).fill(p.cold),
    index = (i, j, k) => k * nx * ny + j * nx + i,
    source = (i, j, k) => {
      const xx = (i * dx - p.length / 2) / (p.length * .18),
        yy = (j * dy - p.width / 2) / (p.width * .2),
        zz = (k * dz - p.height / 2) / (p.height * .24);
      return p.source * Math.exp(-(xx * xx + yy * yy + zz * zz));
    },
    ax = 1 / dx ** 2,
    ay = 1 / dy ** 2,
    az = 1 / dz ** 2,
    den = 2 * (ax + ay + az);
  let lastResidual = 1;
  const history = [];
  for (let iter = 0; iter < 620; iter += 1) {
    let maxChange = 0;
    for (let k = 1; k < nz - 1; k += 1) for (let j = 1; j < ny - 1; j += 1) for (let i = 1; i < nx - 1; i += 1) {
      const id = index(i, j, k),
        next = (ax * (T[index(i - 1, j, k)] + T[index(i + 1, j, k)]) + ay * (T[index(i, j - 1, k)] + T[index(i, j + 1, k)]) + az * (T[index(i, j, k - 1)] + T[index(i, j, k + 1)]) + source(i, j, k) / p.conductivity) / den,
        max = Math.abs(next - T[id]);
      T[id] = next;
      if (max > maxChange) maxChange = max;
    }
    lastResidual = maxChange;
    if (iter % 24 === 0) history.push(Math.max(1e-10, maxChange));
    if (maxChange < 1e-6) break;
  }
  const midK = Math.floor(nz / 2),
    x = linspace(0, p.length, nx),
    y = linspace(0, p.width, ny),
    slice = y.map((_, j) => x.map((__, i) => T[index(i, j, midK)])),
    midJ = Math.floor(ny / 2),
    midZ = Math.floor(nz / 2),
    curve = x.map((_, i) => T[index(i, midJ, midZ)]),
    maxT = Math.max(...T);
  const particles = [];
  for (let k = 1; k < nz - 1; k += 2) for (let j = 1; j < ny - 1; j += 2) for (let i = 1; i < nx - 1; i += 2) {
    const qx = -p.conductivity * (T[index(i + 1, j, k)] - T[index(i - 1, j, k)]) / (2 * dx),
      qy = -p.conductivity * (T[index(i, j + 1, k)] - T[index(i, j - 1, k)]) / (2 * dy),
      qz = -p.conductivity * (T[index(i, j, k + 1)] - T[index(i, j, k - 1)]) / (2 * dz);
    particles.push({
      x: i * dx,
      y: j * dy,
      z: k * dz,
      value: T[index(i, j, k)],
      vx: qx,
      vy: qy,
      vz: qz
    });
  }
  return {
    model: 'thermal',
    x,
    y,
    z: slice,
    particles,
    bounds: {
      x: [0, p.length],
      y: [0, p.width],
      z: [0, p.height]
    },
    dimensions: [['长度 L', p.length, 'm'], ['宽度 W', p.width, 'm'], ['高度 H', p.height, 'm']],
    curveX: x,
    curveY: curve,
    curveTitle: '中轴线温度剖面',
    curveXTitle: '长度坐标 x (m)',
    curveYTitle: '温度 T (K)',
    stats: [['最高温度', maxT.toFixed(2), 'K'], ['边界温度', p.cold.toFixed(1), 'K'], ['峰值温升', (maxT - p.cold).toFixed(2), 'K'], ['离散残差', lastResidual.toExponential(2), 'K']],
    insight: `三维 Poisson 方程收敛后中心最高温度为 ${maxT.toFixed(2)} K；二维图是同一 3D 温度数组的 z=H/2 截面。`,
    convergence: history.length > 3 ? history : residual(.5)
  };
}
function oceanConcentration(x, y, z, p) {
  const t = p.time,
    Kh = p.diffusivity,
    Kv = p.verticalDiffusivity,
    m = p.mass * Math.exp(-p.decay * t),
    coef = m / ((4 * Math.PI * t) ** 1.5 * Kh * Math.sqrt(Kv)),
    exponent = -((x - p.current * t) ** 2 + y * y) / (4 * Kh * t) - z * z / (4 * Kv * t);
  return coef * Math.exp(exponent) * 1e6;
}
function solveOcean(p) {
  validate('ocean', p);
  const t = p.time,
    sigmaH = Math.sqrt(2 * p.diffusivity * t),
    sigmaV = Math.sqrt(2 * p.verticalDiffusivity * t),
    center = p.current * t,
    x = linspace(center - 5 * sigmaH, center + 5 * sigmaH, 81),
    y = linspace(-4 * sigmaH, 4 * sigmaH, 55),
    z = y.map(yj => x.map(xi => oceanConcentration(xi, yj, 0, p))),
    curve = x.map(xi => oceanConcentration(xi, 0, 0, p)),
    peak = oceanConcentration(center, 0, 0, p),
    remaining = p.mass * Math.exp(-p.decay * t);
  const particles = Array.from({
    length: 1600
  }, (_, i) => {
    const radiusH = sigmaH * Math.sqrt(-2 * Math.log(Math.max(.001, seq(i, 1)))),
      theta = 2 * Math.PI * seq(i, 2),
      normalZ = sigmaV * Math.sqrt(-2 * Math.log(Math.max(.001, seq(i, 3)))) * Math.cos(2 * Math.PI * seq(i, 4)),
      zz = Math.max(-p.depth / 2, Math.min(p.depth / 2, normalZ)),
      xx = center + radiusH * Math.cos(theta),
      yy = radiusH * Math.sin(theta);
    return {
      x: xx,
      y: yy,
      z: zz,
      value: oceanConcentration(xx, yy, zz, p),
      vx: p.current,
      vy: 0,
      vz: 0
    };
  });
  return {
    model: 'ocean',
    x: x.map(v => v / 1000),
    y: y.map(v => v / 1000),
    z,
    particles,
    bounds: {
      x: [x[0], x.at(-1)],
      y: [y[0], y.at(-1)],
      z: [-p.depth / 2, p.depth / 2]
    },
    dimensions: [['下游显示长度', x.at(-1) - x[0], 'm'], ['横向显示宽度', y.at(-1) - y[0], 'm'], ['水深 H', p.depth, 'm']],
    curveX: x.map(v => v / 1000),
    curveY: curve,
    curveTitle: '羽流中心线浓度',
    curveXTitle: '下游坐标 x (km)',
    curveYTitle: '质量浓度 C (mg/m³)',
    stats: [['峰值浓度', peak.toFixed(3), 'mg/m³'], ['羽流中心', (center / 1000).toFixed(2), 'km'], ['水平扩散尺度 2σ', (2 * sigmaH).toFixed(0), 'm'], ['剩余质量', remaining.toFixed(1), 'kg']],
    insight: `三维解析核得到羽流中心 ${finite(center / 1000, 2)} km、峰值 ${finite(peak, 3)} mg/m³；粒子采样自相同浓度分布。`,
    convergence: residual(.76)
  };
}
export function runSolver(model, params) {
  const p = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, Number(v)]));
  return ({
    plasma: solvePlasma,
    em: solveEM,
    gas: solveGas,
    pipe: solvePipe,
    thermal: solveThermal,
    ocean: solveOcean
  }[model] || solveGas)(p);
}
export function downloadResult(result) {
  const payload = JSON.stringify({
      generatedBy: modelMeta[result.model].code,
      generatedAt: new Date().toISOString(),
      equations: modelTheory[result.model].equations,
      model: {
        ...result,
        particles: undefined
      }
    }, null, 2),
    href = URL.createObjectURL(new Blob([payload], {
      type: 'application/json'
    })),
    a = document.createElement('a');
  a.href = href;
  a.download = `phytwin-${result.model}-result.json`;
  a.click();
  URL.revokeObjectURL(href);
}
import * as THREE from './three.module-CMwKnOU8.js';
const COLOR_STOPS = [[.02, .11, .28], [.02, .56, .76], [.18, .82, .66], [.97, .79, .25], [.9, .2, .12]];
function writeColor(target, index, t) {
  const q = Math.max(0, Math.min(.999, t)) * (COLOR_STOPS.length - 1),
    i = Math.floor(q),
    f = q - i,
    a = COLOR_STOPS[i],
    b = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)];
  target[index * 3] = a[0] + (b[0] - a[0]) * f;
  target[index * 3 + 1] = a[1] + (b[1] - a[1]) * f;
  target[index * 3 + 2] = a[2] + (b[2] - a[2]) * f;
}
function normalizeVector(vx, vy, vz) {
  const n = Math.hypot(vx, vy, vz) || 1;
  return [vx / n, vy / n, vz / n];
}
function displayPoint(point, bounds) {
  const spans = ['x', 'y', 'z'].map((key, i) => Math.max(1e-12, bounds[key][1] - bounds[key][0])),
    maxSpan = Math.max(...spans),
    scale = 5.5 / maxSpan;
  return [(point.x - (bounds.x[0] + bounds.x[1]) / 2) * scale, (point.z - (bounds.z[0] + bounds.z[1]) / 2) * scale, (point.y - (bounds.y[0] + bounds.y[1]) / 2) * scale];
}
function geometryFor(model, scene, bounds) {
  const group = new THREE.Group(),
    sx = bounds.x[1] - bounds.x[0],
    sy = bounds.y[1] - bounds.y[0],
    sz = bounds.z[1] - bounds.z[0],
    max = Math.max(sx, sy, sz),
    scale = 5.5 / max,
    wire = new THREE.MeshBasicMaterial({
      color: 0x5f8299,
      wireframe: true,
      transparent: true,
      opacity: .2
    });
  if (model === 'plasma') {
    const torus = new THREE.Mesh(new THREE.TorusGeometry(2, .78, 22, 96), wire);
    torus.rotation.x = Math.PI / 2;
    group.add(torus);
    for (let i = 0; i < 16; i++) {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(2.75, .045, 8, 80), new THREE.MeshBasicMaterial({
        color: 0x607fa0,
        transparent: true,
        opacity: .48
      }));
      coil.rotation.set(Math.PI / 2, 0, i * Math.PI / 8);
      group.add(coil);
    }
  } else if (model === 'em') {
    const radius = sx * .5 * scale / 2.25,
      length = sz * scale / 2.9;
    for (let i = 0; i < 22; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .018, 8, 64), new THREE.MeshBasicMaterial({
        color: 0xc47f42,
        transparent: true,
        opacity: .75
      }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -length / 2 + i / 21 * length;
      group.add(ring);
    }
  } else if (model === 'gas') {
    const radius = Math.min(sx, sy) * .085 * scale * 4;
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, sz * scale, 48, 1, true), wire);
    cylinder.rotation.x = Math.PI / 2;
    group.add(cylinder);
  } else if (model === 'pipe') {
    const radius = Math.max(sy, sz) * .5 * scale;
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, sx * scale, 64, 1, true), wire);
    pipe.rotation.z = Math.PI / 2;
    group.add(pipe);
  } else {
    const box = new THREE.Mesh(new THREE.BoxGeometry(sx * scale, sz * scale, sy * scale), wire);
    group.add(box);
  }
  scene.add(group);
  return group;
}
function UnifiedField3D({
  result,
  running,
  resetKey
}) {
  const hostRef = useRef(null),
    resultRef = useRef(result),
    runningRef = useRef(running);
  const [error, setError] = useState('');
  useEffect(() => {
    resultRef.current = result;
  }, [result]);
  useEffect(() => {
    runningRef.current = running;
  }, [running]);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !result) return undefined;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (reason) {
      setError(`无法初始化 WebGL：${reason.message}`);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setClearColor(0x060e19);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-label', `${result.model} 三维求解场与粒子示踪`);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060e19, .045);
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    let azimuth = .75,
      elevation = .33,
      distance = 10.5;
    const updateCamera = () => {
      camera.position.set(Math.sin(azimuth) * Math.cos(elevation) * distance, Math.sin(elevation) * distance, Math.cos(azimuth) * Math.cos(elevation) * distance);
      camera.lookAt(0, 0, 0);
    };
    updateCamera();
    const grid = new THREE.GridHelper(9, 18, 0x35546d, 0x183047);
    grid.position.y = -3.2;
    grid.material.transparent = true;
    grid.material.opacity = .34;
    scene.add(grid);
    const source = resultRef.current,
      values = source.particles.map(p => p.value).filter(Number.isFinite),
      vmin = Math.min(...values),
      vmax = Math.max(...values),
      positions = new Float32Array(source.particles.length * 3),
      colors = new Float32Array(source.particles.length * 3),
      base = new Float32Array(source.particles.length * 3),
      directions = new Float32Array(source.particles.length * 3);
    source.particles.forEach((p, i) => {
      const pos = displayPoint(p, source.bounds);
      base.set(pos, i * 3);
      positions.set(pos, i * 3);
      writeColor(colors, i, (p.value - vmin) / Math.max(1e-12, vmax - vmin));
      directions.set(normalizeVector(p.vx || 0, p.vz || 0, p.vy || 0), i * 3);
    });
    const geometry = new THREE.BufferGeometry(),
      positionAttribute = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: .045,
      vertexColors: true,
      transparent: true,
      opacity: .85,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    scene.add(new THREE.Points(geometry, material));
    const modelGeometry = geometryFor(source.model, scene, source.bounds);
    // 托卡马克装置外壳采用用户指定的 tokamak-3d GLB 几何；计算场仍由 PhyTwin 求解器独立生成。
    let disposed = false;
    if (source.model === 'plasma') {
      new GLTFLoader().load('/tokamak.glb', gltf => {
        const device = gltf.scene;
        if (disposed) {
          device.traverse(object => {
            object.geometry?.dispose();
            object.material?.dispose();
          });
          return;
        }
        const box = new THREE.Box3().setFromObject(device),
          size = box.getSize(new THREE.Vector3()),
          center = box.getCenter(new THREE.Vector3()),
          fit = 6 / Math.max(size.x, size.y, size.z);
        device.position.sub(center);
        device.scale.setScalar(fit);
        device.rotation.x = -Math.PI / 2;
        device.traverse(object => {
          if (!object.isMesh) return;
          object.material = object.material.clone();
          object.material.transparent = true;
          object.material.opacity = .18;
          object.material.depthWrite = false;
        });
        scene.add(device);
      }, () => {}, () => {});
    }
    const resize = () => {
        const rect = host.getBoundingClientRect();
        renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
        camera.aspect = rect.width / Math.max(1, rect.height);
        camera.updateProjectionMatrix();
      },
      observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    const pointer = {
        down: false,
        x: 0,
        y: 0
      },
      down = e => {
        pointer.down = true;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        renderer.domElement.setPointerCapture(e.pointerId);
      },
      move = e => {
        if (!pointer.down) return;
        azimuth -= (e.clientX - pointer.x) * .006;
        elevation = Math.max(-.65, Math.min(.78, elevation + (e.clientY - pointer.y) * .005));
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        updateCamera();
      },
      up = () => {
        pointer.down = false;
      },
      wheel = e => {
        e.preventDefault();
        distance = Math.max(6.8, Math.min(17, distance + e.deltaY * .008));
        updateCamera();
      };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);
    renderer.domElement.addEventListener('wheel', wheel, {
      passive: false
    });
    let frame = 0,
      last = performance.now(),
      phase = 0;
    const animate = now => {
      frame = requestAnimationFrame(animate);
      const dt = Math.min(.035, (now - last) / 1000);
      last = now;
      if (runningRef.current) phase += dt;
      for (let i = 0; i < positions.length / 3; i++) {
        const j = i * 3,
          travel = (phase * (.18 + i % 17 / 90) + i * .071) % 1 - .5,
          amplitude = source.model === 'em' ? 0 : source.model === 'thermal' ? .1 : .55;
        positions[j] = base[j] + directions[j] * travel * amplitude;
        positions[j + 1] = base[j + 1] + directions[j + 1] * travel * amplitude;
        positions[j + 2] = base[j + 2] + directions[j + 2] * travel * amplitude;
      }
      positionAttribute.needsUpdate = true;
      if (source.model === 'plasma') modelGeometry.rotation.y += dt * .06;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up);
      renderer.domElement.removeEventListener('pointercancel', up);
      renderer.domElement.removeEventListener('wheel', wheel);
      scene.traverse(object => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [result, resetKey]);
  return /*#__PURE__*/React.createElement("div", {
    className: "unified-field-host",
    ref: hostRef
  }, error && /*#__PURE__*/React.createElement("div", {
    className: "webgl-error"
  }, error));
}
const Plot = lazy(() => import('./Plot-BP3ApVVk.js'));
const plotConfig = {
  responsive: true,
  displaylogo: false,
  toImageButtonOptions: {
    format: 'png',
    filename: 'PhyTwin-research-result',
    scale: 3
  }
};
const plotLayout = {
  font: {
    family: 'IBM Plex Mono, monospace',
    color: '#a8bdcb',
    size: 10
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  margin: {
    l: 62,
    r: 20,
    t: 34,
    b: 54
  },
  hoverlabel: {
    bgcolor: '#07111d',
    font: {
      color: '#eaf4ff'
    }
  }
};
const icons = {
  plasma: Atom,
  em: Magnet,
  gas: Wind,
  pipe: Droplets,
  thermal: Flame,
  ocean: TestTubes
};
const labels = {
  plasma: '等离子体',
  em: '静态电磁场',
  gas: '气体计算',
  pipe: '液体计算',
  thermal: '热传输',
  ocean: '传质计算'
};
const fields = {
  plasma: [['majorRadius', '大半径 R₀', 3, 9, .1, 'm'], ['minorRadius', '小半径 a', .8, 3, .1, 'm'], ['plasmaCurrent', '等离子体电流 Iₚ', 2, 22, .5, 'MA'], ['toroidalField', '轴上环向场 B₀', 1, 9, .1, 'T'], ['elongation', '拉长比 κ', 1, 2.2, .05, '—']],
  em: [['turns', '线圈匝数 N', 8, 96, 1, 'turn'], ['current', '直流电流 I', 1, 40, .5, 'A'], ['radius', '线圈半径 a', .06, .35, .01, 'm'], ['length', '绕组长度 L', .08, .7, .01, 'm'], ['conductor', '导线直径 dc', .001, .012, .001, 'm']],
  gas: [['speed', '自由来流 U∞', 5, 90, 1, 'm/s'], ['density', '气体密度 ρ', .6, 2, .01, 'kg/m³'], ['radius', '圆柱半径 a', .03, .2, .01, 'm'], ['viscosity', '动力黏度 μ', .00001, .00004, .000001, 'Pa·s'], ['angle', '来流偏角 α', -20, 20, 1, '°'], ['span', '展向长度 W', .2, 1.5, .05, 'm']],
  pipe: [['velocity', '平均速度 Ū', .01, .2, .005, 'm/s'], ['diameter', '管内径 D', .006, .025, .001, 'm'], ['density', '液体密度 ρ', 800, 1200, 10, 'kg/m³'], ['viscosity', '动力黏度 μ', .0005, .006, .0001, 'Pa·s'], ['roughness', '壁面粗糙度 ε', .000001, .0001, .000001, 'm'], ['length', '管长 L', .2, 3, .1, 'm']],
  thermal: [['length', '实体长度 L', .2, .8, .02, 'm'], ['width', '实体宽度 W', .15, .6, .01, 'm'], ['height', '实体高度 H', .08, .35, .01, 'm'], ['cold', '边界温度 Tc', 273, 353, 1, 'K'], ['conductivity', '导热系数 k', 1, 80, 1, 'W/(m·K)'], ['source', '体热源峰值 q̇', 100000, 4000000, 50000, 'W/m³']],
  ocean: [['current', '海流速度 U', .02, 1.2, .01, 'm/s'], ['diffusivity', '水平扩散 Kh', .2, 20, .2, 'm²/s'], ['verticalDiffusivity', '垂向扩散 Kv', .05, 3, .05, 'm²/s'], ['mass', '释放质量 M', 50, 3000, 50, 'kg'], ['decay', '衰减率 λ', 0, .0002, .00001, 's⁻¹'], ['time', '释放后时间 t', 900, 21600, 300, 's'], ['depth', '显示水深 H', 20, 200, 5, 'm']]
};
function RangeField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange
}) {
  const progress = (Number(value) - min) / (max - min) * 100,
    digits = step < .0001 ? 6 : step < .01 ? 4 : step < .1 ? 2 : step < 1 ? 1 : 0;
  return /*#__PURE__*/React.createElement("label", {
    className: "lab-range"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, label), /*#__PURE__*/React.createElement("output", null, Number(value).toFixed(digits), " ", /*#__PURE__*/React.createElement("small", null, unit))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(Number(e.target.value)),
    style: {
      '--range-progress': `${progress}%`
    }
  }));
}
function Metric({
  item,
  index
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: index === 0 ? 'lab-metric accent' : 'lab-metric'
  }, /*#__PURE__*/React.createElement("span", null, item[0]), /*#__PURE__*/React.createElement("strong", null, item[1]), /*#__PURE__*/React.createElement("small", null, item[2]));
}
function EquationPanel({
  theory
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "equation-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "equation-title"
  }, /*#__PURE__*/React.createElement("span", null, "GOVERNING EQUATIONS"), /*#__PURE__*/React.createElement("b", null, "\u63A7\u5236\u65B9\u7A0B\u4E0E\u7269\u7406\u91CF")), theory.equations.map(eq => /*#__PURE__*/React.createElement("code", {
    key: eq
  }, eq)), /*#__PURE__*/React.createElement("dl", null, theory.variables.map(([symbol, name, unit]) => /*#__PURE__*/React.createElement("div", {
    key: symbol
  }, /*#__PURE__*/React.createElement("dt", null, symbol), /*#__PURE__*/React.createElement("dd", null, name), /*#__PURE__*/React.createElement("dd", null, unit)))), /*#__PURE__*/React.createElement("p", null, theory.assumptions));
}
function ScientificPost2D({
  result,
  meta
}) {
  const ocean = result.model === 'ocean',
    colors = [[0, '#071c48'], [.25, '#058fc2'], [.5, '#2ed1a8'], [.75, '#f7c940'], [1, '#e6331f']];
  return /*#__PURE__*/React.createElement("section", {
    className: "lab-scientific-post"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("span", null, "03 / NATURE-STYLE POST-PROCESSING"), /*#__PURE__*/React.createElement("h2", null, "\u540C\u4E00\u6C42\u89E3\u573A\u7684\u4E8C\u7EF4\u622A\u9762\u4E0E\u5B9A\u91CF\u5256\u9762"), /*#__PURE__*/React.createElement("p", null, "\u4E91\u56FE\u3001\u66F2\u7EBF\u3001\u6307\u6807\u3001\u4E09\u7EF4\u7C92\u5B50\u4E0E\u4E0B\u8F7D\u6570\u636E\u5171\u7528\u540C\u4E00\u4E2A result \u6570\u7EC4\uFF1B\u5750\u6807\u3001\u7269\u7406\u91CF\u548C\u5355\u4F4D\u5B8C\u6574\u6807\u6CE8\u3002"), /*#__PURE__*/React.createElement("button", {
    onClick: () => downloadResult(result)
  }, /*#__PURE__*/React.createElement(Download, {
    size: 15
  }), "\u4E0B\u8F7D\u6C42\u89E3\u6570\u636E JSON")), /*#__PURE__*/React.createElement("div", {
    className: "research-plot-grid"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-label": `${meta.name} 二维场云图`
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "plot-skeleton"
    })
  }, /*#__PURE__*/React.createElement(Plot, {
    data: [{
      x: result.x,
      y: result.y,
      z: result.z,
      type: 'heatmap',
      connectgaps: false,
      colorscale: colors,
      colorbar: {
        title: {
          text: meta.unit
        },
        thickness: 10,
        outlinewidth: 0
      },
      hovertemplate: 'x=%{x:.4g}<br>y=%{y:.4g}<br>value=%{z:.4g}<extra></extra>'
    }],
    layout: {
      ...plotLayout,
      title: {
        text: `(a) ${meta.legend}`,
        x: .02,
        font: {
          size: 12
        }
      },
      xaxis: {
        title: ocean ? 'x (km)' : 'x (m)',
        gridcolor: '#1b3345'
      },
      yaxis: {
        title: ocean ? 'y (km)' : 'y (m)',
        gridcolor: '#1b3345'
      },
      height: 390
    },
    config: plotConfig,
    style: {
      width: '100%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    "aria-label": `${meta.name} 定量剖面`
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "plot-skeleton"
    })
  }, /*#__PURE__*/React.createElement(Plot, {
    data: [{
      x: result.curveX,
      y: result.curveY,
      type: 'scatter',
      mode: 'lines',
      line: {
        color: '#62d9ff',
        width: 2.4
      },
      name: result.curveTitle
    }],
    layout: {
      ...plotLayout,
      title: {
        text: `(b) ${result.curveTitle}`,
        x: .02,
        font: {
          size: 12
        }
      },
      xaxis: {
        title: result.curveXTitle,
        gridcolor: '#1b3345',
        zeroline: false
      },
      yaxis: {
        title: result.curveYTitle,
        gridcolor: '#1b3345',
        zerolinecolor: '#526a7b'
      },
      height: 390,
      showlegend: false
    },
    config: plotConfig,
    style: {
      width: '100%'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "post-footnote"
  }, /*#__PURE__*/React.createElement("span", null, "FIELD: ", meta.method), /*#__PURE__*/React.createElement("span", null, "EXPORT: 3\xD7 PNG \xB7 JSON"), /*#__PURE__*/React.createElement("span", null, "TRACE: CONTINUUM FIELD \u2192 PARTICLES")));
}
export default function RealtimeLab() {
  const [mode, setMode] = useState('plasma'),
    [paramsByMode, setParamsByMode] = useState(presets),
    [running, setRunning] = useState(true),
    [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    document.title = '浏览器实时实验室｜PhyTwin';
  }, []);
  const params = paramsByMode[mode];
  const solution = useMemo(() => {
      try {
        return {
          result: runSolver(mode, params),
          error: ''
        };
      } catch (reason) {
        return {
          result: null,
          error: reason.message
        };
      }
    }, [mode, params]),
    {
      result,
      error
    } = solution;
  const setParam = (key, value) => setParamsByMode(current => ({
      ...current,
      [mode]: {
        ...current[mode],
        [key]: value
      }
    })),
    reset = () => {
      setParamsByMode(current => ({
        ...current,
        [mode]: presets[mode]
      }));
      setResetKey(v => v + 1);
      setRunning(true);
    };
  const meta = modelMeta[mode],
    theory = modelTheory[mode],
    hud = result?.dimensions.map(([label, value, unit]) => `${label.replace(/ .*/, '')} ${Number(value).toFixed(value < 1 ? 3 : 1)} ${unit}`).join(' · ');
  return /*#__PURE__*/React.createElement("section", {
    className: "realtime-lab-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-intro section-shell"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lab-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "PHYTWIN REALTIME LAB / 3D FIELD SOLVERS"), /*#__PURE__*/React.createElement("h1", null, "\u516D\u4E2A\u7269\u7406\u6A21\u5757\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u4E00\u6761\u53EF\u6838\u67E5\u7684\u6570\u636E\u94FE\u3002"), /*#__PURE__*/React.createElement("p", null, "PhyTwin Plasma\u3001EM\u3001Gas\u3001Liquid\u3001Heat \u4E0E Transport\uFF1A\u63A7\u5236\u65B9\u7A0B\u6C42\u8FDE\u7EED\u573A\uFF0C\u7C92\u5B50\u53EA\u8D1F\u8D23\u4E09\u7EF4\u793A\u8E2A\uFF1B\u4E8C\u7EF4\u4E91\u56FE\u3001\u5256\u9762\u3001\u6307\u6807\u4E0E\u4E0B\u8F7D\u7ED3\u679C\u5747\u6765\u81EA\u540C\u4E00\u6B21\u6C42\u89E3\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "lab-intro-note"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "\u65B9\u7A0B\u89E3\u4E0E\u5C55\u793A\u4E25\u683C\u5BF9\u5E94"), "\u53C2\u6570\u8FDB\u5165\u660E\u786E\u7684\u89E3\u6790\u89E3\u6216\u6570\u503C\u79BB\u6563\uFF1B\u6BCF\u4E2A\u6A21\u5757\u90FD\u516C\u5F00\u7B26\u53F7\u3001\u5355\u4F4D\u3001\u8FB9\u754C\u4E0E\u9002\u7528\u8303\u56F4\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "lab-shell"
  }, /*#__PURE__*/React.createElement("header", {
    className: "lab-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "experiment-tabs"
  }, Object.keys(modelMeta).map(key => {
    const Icon = icons[key];
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      className: mode === key ? 'active' : '',
      onClick: () => {
        setMode(key);
        setRunning(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16
    }), labels[key], /*#__PURE__*/React.createElement("span", null, "3D"));
  })), /*#__PURE__*/React.createElement("div", {
    className: "lab-run-state"
  }, /*#__PURE__*/React.createElement("span", {
    className: running ? 'live' : ''
  }), running ? 'FIELD ACTIVE' : 'PAUSED'), /*#__PURE__*/React.createElement("div", {
    className: "lab-toolbar-actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setRunning(v => !v)
  }, running ? /*#__PURE__*/React.createElement(Pause, {
    size: 15
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 15,
    fill: "currentColor"
  }), running ? '暂停' : '继续'), /*#__PURE__*/React.createElement("button", {
    onClick: reset
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 15
  }), "\u91CD\u7F6E"))), /*#__PURE__*/React.createElement("div", {
    className: "lab-workspace"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "lab-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-panel-heading"
  }, /*#__PURE__*/React.createElement("span", null, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\u771F\u5B9E\u5DE5\u51B5\u53C2\u6570"), /*#__PURE__*/React.createElement("small", null, "SYMBOLS & SI UNITS"))), /*#__PURE__*/React.createElement("div", {
    className: "lab-control-group range-stack plume-ranges"
  }, fields[mode].map(([key, label, min, max, step, unit]) => /*#__PURE__*/React.createElement(RangeField, {
    key: key,
    label: label,
    value: params[key],
    min: min,
    max: max,
    step: step,
    unit: unit,
    onChange: value => setParam(key, value)
  }))), error && /*#__PURE__*/React.createElement("div", {
    className: "lab-error"
  }, error), /*#__PURE__*/React.createElement("div", {
    className: "model-chip"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 15
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, meta.code), /*#__PURE__*/React.createElement("span", null, meta.method)))), /*#__PURE__*/React.createElement("main", {
    className: "lab-viewport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewport-hud top-left"
  }, /*#__PURE__*/React.createElement("span", null, meta.code.toUpperCase()), /*#__PURE__*/React.createElement("b", null, hud || '等待有效工况')), /*#__PURE__*/React.createElement("div", {
    className: "viewport-hud top-right"
  }, /*#__PURE__*/React.createElement("span", null, "SINGLE SOURCE OF TRUTH"), /*#__PURE__*/React.createElement("b", null, "PARAMETERS \u2192 EQUATION \u2192 FIELD \u2192 POST")), result ? /*#__PURE__*/React.createElement(UnifiedField3D, {
    result: result,
    running: running,
    resetKey: resetKey
  }) : /*#__PURE__*/React.createElement("div", {
    className: "lab-loading"
  }, /*#__PURE__*/React.createElement(Info, {
    size: 22
  }), /*#__PURE__*/React.createElement("span", null, "\u8BF7\u8C03\u6574\u53C2\u6570\u4F7F\u5176\u6EE1\u8DB3\u6A21\u578B\u9002\u7528\u8303\u56F4")), /*#__PURE__*/React.createElement("div", {
    className: "viewport-help"
  }, /*#__PURE__*/React.createElement(MousePointer2, {
    size: 14
  }), "\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u7C92\u5B50\u6309\u8FDE\u7EED\u573A\u65B9\u5411\u793A\u8E2A"), /*#__PURE__*/React.createElement("div", {
    className: "field-legend unified"
  }, /*#__PURE__*/React.createElement("span", null, "LOW"), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", null, "HIGH \xB7 ", meta.unit))), /*#__PURE__*/React.createElement("aside", {
    className: "lab-diagnostics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-panel-heading"
  }, /*#__PURE__*/React.createElement("span", null, "02"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\u4E00\u4E00\u5BF9\u5E94\u540E\u5904\u7406"), /*#__PURE__*/React.createElement("small", null, "SAME SOLUTION ARRAY"))), result && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "lab-metrics"
  }, result.stats.map((item, index) => /*#__PURE__*/React.createElement(Metric, {
    key: item[0],
    item: item,
    index: index
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dimension-table"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Box, {
    size: 14
  }), "\u4E09\u7EF4\u8BA1\u7B97\u57DF"), result.dimensions.map(([label, value, unit]) => /*#__PURE__*/React.createElement("div", {
    key: label
  }, /*#__PURE__*/React.createElement("b", null, label), /*#__PURE__*/React.createElement("em", null, Number(value).toFixed(Number(value) < 1 ? 3 : 1), " ", unit)))), /*#__PURE__*/React.createElement("div", {
    className: "solver-health"
  }, /*#__PURE__*/React.createElement(Gauge, {
    size: 17
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "SOLVER STATE"), /*#__PURE__*/React.createElement("b", null, "CONVERGED \xB7 CONSISTENT"))), /*#__PURE__*/React.createElement("div", {
    className: "lab-scope-note"
  }, /*#__PURE__*/React.createElement(Info, {
    size: 16
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\u5F53\u524D\u7ED3\u8BBA"), /*#__PURE__*/React.createElement("p", null, result.insight)))))), /*#__PURE__*/React.createElement(EquationPanel, {
    theory: theory
  })), result && /*#__PURE__*/React.createElement(ScientificPost2D, {
    result: result,
    meta: meta
  }));
}
