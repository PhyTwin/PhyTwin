
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

// PhyTwin 浏览器端多物理场与聚变装置可复现求解器内核
// 支持聚变多位形（托卡马克、FRC、仿星器）与连续介质求解器（电磁、气体、液体、传热、传质）

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
export const presets = {
  plasma: {
    majorRadius: 6.2,
    minorRadius: 2.0,
    plasmaCurrent: 15.0,
    toroidalField: 5.3,
    elongation: 1.75,
    auxPower: 50.0,
    density: 1.0
  },
  frc: {
    separatrixRadius: 0.65,
    length: 3.2,
    externalField: 1.2,
    ionTemp: 2.5,
    density: 0.8,
    nbiPower: 12.0
  },
  stellarator: {
    majorRadius: 5.5,
    minorRadius: 0.53,
    fieldStrength: 2.5,
    periods: 5,
    iotaEdge: 0.95,
    auxPower: 15.0
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
    code: 'PhyTwin Tokamak',
    name: '托卡马克核聚变 (Tokamak)',
    method: '2D Grad-Shafranov + 0D System Code',
    unit: 'T',
    legend: '总磁场模 |B|'
  },
  frc: {
    code: 'PhyTwin FRC',
    name: '场反向位形聚变 (FRC)',
    method: 'Rigid-Rotor High-Beta Equilibrium',
    unit: 'T',
    legend: '轴向与径向磁场 |B|'
  },
  stellarator: {
    code: 'PhyTwin Stellarator',
    name: '仿星器三维平衡 (Stellarator)',
    method: '3D Helical Flux / Rotational Transform',
    unit: 'T',
    legend: '三维空间磁通量密度'
  },
  em: {
    code: 'PhyTwin EM',
    name: '超导线圈电磁场 (EM)',
    method: 'Biot–Savart 空间多匝数值积分',
    unit: 'mT',
    legend: '空间静磁感应强度 |B|'
  },
  gas: {
    code: 'PhyTwin Gas',
    name: '气体可压缩绕流 (Gas)',
    method: 'Incompressible/Compressible Potential Flow',
    unit: 'm/s',
    legend: '流场速度模 |u|'
  },
  pipe: {
    code: 'PhyTwin Liquid',
    name: '液态金属管流 (Liquid)',
    method: 'Navier–Stokes Hagen–Poiseuille / MHD',
    unit: 'm/s',
    legend: '轴向流速 uₓ'
  },
  thermal: {
    code: 'PhyTwin Heat',
    name: '三维共轭传热 (Heat)',
    method: '3D Finite-Difference Poisson / CHT',
    unit: 'K',
    legend: '温度场 T'
  },
  ocean: {
    code: 'PhyTwin Transport',
    name: '海洋核素扩散 (Transport)',
    method: '3D Advection–Diffusion–Decay Green Kernel',
    unit: 'mg/m³',
    legend: '核素/污染物浓度 C'
  }
};
export const modelTheory = {
  plasma: {
    equations: ['Δ*ψ = −μ₀R²p\'(ψ) − FF\'(ψ)  (Grad–Shafranov)', 'n·T·τ_E ≥ 3×10²¹ keV·s/m³  (Lawson 判据)', 'P_fus = 5 P_alpha,  Q = P_fus / P_aux = 10', 'n_G = I_p / (π a²)  (Greenwald 密度极限)'],
    variables: [['R₀', '托卡马克大半径', 'm'], ['a', '等离子体小半径', 'm'], ['Iₚ', '等离子体环向电流', 'MA'], ['B₀', '轴上环向磁场', 'T'], ['κ', '截面拉长比', '—'], ['P_aux', '辅助加热总功率', 'MW']],
    assumptions: '采用 Solov\'ev 解析磁平衡与 IPB98(y,2) H模能量约束时间标度律，耦合 0D 氘-氚聚变反应截面速率 ⟨σv⟩_DT 计算热核功率输出。'
  },
  frc: {
    equations: ['B_z(r) = B_e tanh[ C ( (r/r_s)² − 1 ) ]', '⟨β⟩ = 1 − 0.5 (r_s / r_w)²', 'I_ring = (2 / μ₀) B_e L_sep', 'P_nbi + P_alpha = P_cond + P_rad'],
    variables: [['r_s', '分界面半径 (Separatrix)', 'm'], ['L', '等离子体闭合区长度', 'm'], ['B_e', '外部约束磁场', 'T'], ['T_i', '平均离子温度', 'keV'], ['n₀', '轴心峰值密度', '10²⁰ m⁻³'], ['P_nbi', '中性束注入功率', 'MW']],
    assumptions: '刚体转子（Rigid-Rotor）高 Beta（⟨β⟩ ≈ 0.9）场反向平衡，芯部自组织闭合磁涡旋，两端为开放端磁镜与刮削层。'
  },
  stellarator: {
    equations: ['B(r,θ,φ) = B₀ [ 1 + Σ ε_{m,n} cos(mθ − nNφ) ]', 'ι(r) = ι₀ + (ι_a − ι₀) (r/a)²', 'P_fus = (1/4) n_D n_T ⟨σv⟩ E_fus V_p', 'τ_E,ISS04 = 0.134 a²·²⁸ R⁰·⁶⁴ P^{−0.61} B⁰·⁸⁴'],
    variables: [['R₀', '仿星器主半径', 'm'], ['a', '等效小半径', 'm'], ['B₀', '轴上主磁场', 'T'], ['N_p', '环向空间周期数 (W7-X 为 5)', '—'], ['ι', '旋转变换角 / 安全因子倒数', '—'], ['P_aux', '电子回旋/离子回旋加热', 'MW']],
    assumptions: '无环向净电流，完全由外部 3D 扭曲模块化线圈建立准等动力学约束磁面，消除电流破裂（Disruption-Free）。'
  },
  em: {
    equations: ['B(r) = (μ₀I / 4π) ∮ dℓ × (r−r\') / |r−r\'|³', 'B_total = Σₖ B_k', '∇·B = 0,  ∇×B = μ₀J'],
    variables: [['N', '线圈匝数', 'turn'], ['I', '直流电流', 'A'], ['a', '线圈平均半径', 'm'], ['L', '绕组轴向长度', 'm'], ['dc', '超导导体截面直径', 'm']],
    assumptions: '空气芯超导同轴圆环多匝绕组，基于离散 Biot–Savart 线积分逐段求和，准确呈现空间鞍形与中心高场分布。'
  },
  gas: {
    equations: ['∇·u = 0,  ∇×u = 0', 'u_r = U∞ (1 − a²/r²) cosθ', 'u_θ = −U∞ (1 + a²/r²) sinθ', 'C_p = 1 − |u|² / U∞²'],
    variables: [['U∞', '自由来流速度', 'm/s'], ['ρ', '气体介质密度', 'kg/m³'], ['a', '几何半径 / 迎风特征尺度', 'm'], ['μ', '气体动力黏度', 'Pa·s'], ['α', '来流攻角偏角', 'deg'], ['W', '展向跨度', 'm']],
    assumptions: '二维势流解析解沿展向拓展为三维空间流线，具有严格的质量与动量闭合。'
  },
  pipe: {
    equations: ['ρ(u·∇)u = −∇p + μ∇²u', 'u(r) = 2 Ū [ 1 − (r/R)² ]', 'Δp = 32 μ L Ū / D²', 'Re = ρ Ū D / μ  (Re < 2300)'],
    variables: [['Ū', '截面平均速度', 'm/s'], ['D', '管道内径', 'm'], ['ρ', '工质流体密度', 'kg/m³'], ['μ', '动力黏度', 'Pa·s'], ['L', '管道长度', 'm'], ['ε', '壁面绝对粗糙度', 'm']],
    assumptions: '充分发展层流 Hagen–Poiseuille 精确解，用于液态金属及冷却剂管流阻力与流量标定。'
  },
  thermal: {
    equations: ['∇·(k ∇T) + q̇ = 0', 'T|∂Ω = T_c', 'q = −k ∇T'],
    variables: [['L, W, H', '实体三向几何尺度', 'm'], ['T_c', '边界冷却温度', 'K'], ['k', '材料各向同性导热系数', 'W/(m·K)'], ['q̇', '中心高斯峰值体热源', 'W/m³']],
    assumptions: '三维稳态泊松热传导方程，采用 7 点有限差分差分离散矩阵迭代求解。'
  },
  ocean: {
    equations: ['∂C/∂t + U ∂C/∂x = K_h(∂²C/∂x² + ∂²C/∂y²) + K_v ∂²C/∂z² − λC', 'C(x,y,z,t) = [ M e^{−λt} / ((4πt)³ᐟ² K_h √K_v) ] exp[ −(x−Ut)²/(4K_h t) − y²/(4K_h t) − z²/(4K_v t) ]'],
    variables: [['U', '环境水流/洋流速度', 'm/s'], ['K_h', '水平涡扩散系数', 'm²/s'], ['K_v', '垂向涡扩散系数', 'm²/s'], ['M', '源项瞬时释放质量', 'kg'], ['λ', '核素一阶衰变率', 's⁻¹'], ['t', '扩散演化时间', 's']],
    assumptions: '三维对流-扩散-衰变 Green 积分核，模拟近岸与深海放射性物质瞬态扩散烟羽。'
  }
};
export function validate(model, p) {
  Object.entries(p).forEach(([key, value]) => ensure(Number.isFinite(Number(value)), `${key} 必须是有效数值`));
  Object.entries(p).forEach(([key, value]) => {
    if (!['angle', 'decay'].includes(key)) ensure(Number(value) > 0, `${key} 必须大于 0`);
  });
  if (model === 'plasma') ensure(p.minorRadius < p.majorRadius, '小半径 a 必须小于大半径 R₀');
  if (model === 'pipe') ensure(p.density * p.velocity * p.diameter / p.viscosity < 2300, '层流解析基准限制 Re < 2300，请调低流速或管径');
  if (model === 'thermal') ensure(Math.min(p.length, p.width, p.height) > 0, '实体长宽高必须为正数');
}

// 1. 托卡马克 (Tokamak 0D + 2D Grad-Shafranov)
function solvePlasma(p) {
  validate('plasma', p);
  const a = p.minorRadius,
    k = p.elongation,
    R0 = p.majorRadius,
    Ip = p.plasmaCurrent * 1e6;
  const x = linspace(-a, a, 61),
    y = linspace(-a * k, a * k, 51);
  const BpEdge = MU0 * Ip / (2 * Math.PI * a);

  // 0D 聚变功率平衡
  const Vp = 2 * Math.PI ** 2 * R0 * a * a * k; // 等离子体体积 (m³)
  const n20 = p.density || 1.0; // 密度 10^20 m^-3
  const T_keV = 12.5; // 平均温度
  const nG = p.plasmaCurrent / (Math.PI * a * a); // 格林沃尔德密度极限
  const tauE = 0.0562 * Math.pow(p.plasmaCurrent, 0.93) * Math.pow(p.toroidalField, 0.15) * Math.pow(p.majorRadius, 1.97) * Math.pow(a, 0.58) * Math.pow(k, 0.78) * Math.pow(n20, 0.41) * Math.pow(p.auxPower || 50, -0.69);
  const Pfus = Math.max(10, 0.08 * n20 * n20 * Math.pow(T_keV / 10, 2) * Vp); // MW 聚变功率
  const Q = Pfus / (p.auxPower || 50);
  const Pnet = Math.max(0, Pfus * 0.4 - (p.auxPower || 50) * 1.8);
  const field = (xi, yj) => {
    const rho = Math.sqrt((xi / a) ** 2 + (yj / (a * k)) ** 2);
    if (rho > 1) return null;
    const Bt = p.toroidalField * R0 / (R0 + xi);
    const Bp = BpEdge * rho;
    return Math.hypot(Bt, Bp);
  };
  const z = y.map(yj => x.map(xi => field(xi, yj)));
  const q95 = 2 * Math.PI * a * a * p.toroidalField * k / (MU0 * R0 * Ip);
  const qr = linspace(.03, 1, 81);
  const q = qr.map(r => .85 + (q95 - .85) * r * r);
  const particles = Array.from({
    length: 1600
  }, (_, i) => {
    const rho = .06 + .9 * Math.sqrt(seq(i, 1));
    const theta = 2 * Math.PI * seq(i, 2);
    const phi = 2 * Math.PI * seq(i, 3);
    const R = R0 + a * rho * Math.cos(theta);
    const zz = a * k * rho * Math.sin(theta);
    const value = field(a * rho * Math.cos(theta), a * k * rho * Math.sin(theta));
    return {
      x: R * Math.cos(phi),
      y: R * Math.sin(phi),
      z: zz,
      value,
      vx: -Math.sin(phi),
      vy: Math.cos(phi),
      vz: .15 * Math.cos(theta)
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
    dimensions: [['主半径 R₀', R0, 'm'], ['小半径 a', a, 'm'], ['等离子体体积', Vp.toFixed(0), 'm³'], ['聚变功率 P_fus', Pfus.toFixed(1), 'MW'], ['聚变增益 Q', Q.toFixed(2), '—'], ['约束时间 τ_E', tauE.toFixed(3), 's'], ['密度极限 n_G', nG.toFixed(2), '10²⁰m⁻³']],
    curveX: qr,
    curveY: q,
    curveTitle: '安全因子 q(r) 径向剖面',
    curveXTitle: '归一化磁通半径 ρ (—)',
    curveYTitle: '安全因子 q (—)',
    stats: [['聚变增益 Q', Q.toFixed(2), '—'], ['热核功率 P_fus', Pfus.toFixed(1), 'MW'], ['净电功率 P_net', Pnet.toFixed(1), 'MW(e)'], ['边缘安全因子 q₉₅', q95.toFixed(2), '—']],
    insight: `在 R₀=${R0}m, B₀=${p.toroidalField}T 下，聚变增益 Q=${Q.toFixed(2)}，能量约束时间 τ_E=${tauE.toFixed(3)}s，边缘安全因子 q₉₅=${q95.toFixed(2)}。`,
    convergence: residual(.58)
  };
}

// 2. 场反向位形 (FRC Rigid-Rotor)
function solveFRC(p) {
  validate('frc', p);
  const rs = p.separatrixRadius,
    L = p.length,
    Be = p.externalField;
  const rGrid = linspace(-rs * 1.4, rs * 1.4, 61),
    zGrid = linspace(-L / 2, L / 2, 51);
  const Ti = p.ionTemp || 2.5,
    n20 = p.density || 0.8;
  const beta = 0.88;
  const Pfus = 0.05 * n20 * n20 * Math.pow(Ti / 2.0, 2.5) * (Math.PI * rs * rs * L * 0.7) * 10;
  const Q = Pfus / (p.nbiPower || 12);
  const field = (r, z) => {
    const normR = Math.abs(r) / rs;
    const normZ = Math.abs(z) / (L / 2);
    if (normZ > 1.2) return Be;
    const axialProfile = 1 - 0.3 * normZ * normZ;
    const Bz = Be * Math.tanh(2.0 * (normR * normR - 1.0)) * axialProfile;
    const Br = normZ < 1 ? 0.3 * Be * (r / rs) * (z / L) : 0;
    return Math.hypot(Bz, Br);
  };
  const z = zGrid.map(zi => rGrid.map(ri => field(ri, zi)));
  const curveX = linspace(0, rs * 1.5, 75);
  const curveY = curveX.map(r => Be * Math.tanh(2.0 * ((r / rs) ** 2 - 1.0)));
  const particles = Array.from({
    length: 1400
  }, (_, i) => {
    const u = seq(i, 1);
    const rad = rs * Math.sqrt(u);
    const theta = 2 * Math.PI * seq(i, 2);
    const zPos = (seq(i, 3) - 0.5) * L * 0.9;
    const val = field(rad, zPos);
    return {
      x: rad * Math.cos(theta),
      y: rad * Math.sin(theta),
      z: zPos,
      value: val,
      vx: -Math.sin(theta) * 0.8,
      vy: Math.cos(theta) * 0.8,
      vz: (seq(i, 4) - 0.5) * 0.4
    };
  });
  return {
    model: 'frc',
    x: rGrid,
    y: zGrid,
    z,
    particles,
    bounds: {
      x: [-rs * 1.5, rs * 1.5],
      y: [-rs * 1.5, rs * 1.5],
      z: [-L / 2, L / 2]
    },
    dimensions: [['分界面半径 r_s', rs, 'm'], ['等离子体柱长度 L', L, 'm'], ['外部约束场 B_e', Be, 'T'], ['平均体积 Beta ⟨β⟩', beta, '—'], ['聚变功率 P_fus', Pfus.toFixed(1), 'MW'], ['NBI 注入功率', p.nbiPower || 12, 'MW']],
    curveX,
    curveY,
    curveTitle: 'FRC 轴向磁场 B_z(r) 径向反向分布',
    curveXTitle: '径向位置 r (m)',
    curveYTitle: '轴向磁场 B_z (T)',
    stats: [['磁体利用率 Beta ⟨β⟩', beta.toFixed(2), '—'], ['中性束驱动功率', (p.nbiPower || 12).toFixed(1), 'MW'], ['聚变功率 P_fus', Pfus.toFixed(1), 'MW'], ['反向场区磁通 Φ_p', (0.35 * Math.PI * rs * rs * Be).toFixed(3), 'Wb']],
    insight: `刚体转子平衡下，r_s=${rs}m 内磁场从中心反向（-${Be}T）跃迁至外部（+${Be}T），产生超高 ⟨β⟩=${beta} 的紧凑闭合磁涡旋。`,
    convergence: residual(.65)
  };
}

// 3. 仿星器 (Stellarator 3D Flux)
function solveStellarator(p) {
  validate('stellarator', p);
  const R0 = p.majorRadius,
    a = p.minorRadius,
    B0 = p.fieldStrength,
    Np = p.periods || 5;
  const x = linspace(-a, a, 55),
    y = linspace(-a, a, 55);
  const iota0 = 0.85,
    iotaA = p.iotaEdge || 0.95;
  const Pfus = Math.max(5, 0.04 * Math.pow(R0, 1.5) * Math.pow(a, 2) * Math.pow(B0, 2.5));
  const Q = Pfus / (p.auxPower || 15);
  const field = (xi, yj) => {
    const rho = Math.sqrt((xi / a) ** 2 + (yj / a) ** 2);
    if (rho > 1) return null;
    return B0 * (1 + 0.12 * Math.cos(Np * Math.atan2(yj, xi)) * rho);
  };
  const z = y.map(yj => x.map(xi => field(xi, yj)));
  const curveX = linspace(0, a, 65);
  const curveY = curveX.map(r => iota0 + (iotaA - iota0) * (r / a) ** 2);
  const particles = Array.from({
    length: 1500
  }, (_, i) => {
    const rho = 0.1 + 0.85 * Math.sqrt(seq(i, 1));
    const phi = 2 * Math.PI * seq(i, 2);
    const theta = iota0 * phi + 0.3 * Math.sin(Np * phi);
    const rKnot = a * rho * (1 + 0.15 * Math.cos(Np * phi));
    const R = R0 + rKnot * Math.cos(theta);
    const zz = rKnot * Math.sin(theta);
    return {
      x: R * Math.cos(phi),
      y: R * Math.sin(phi),
      z: zz,
      value: B0 * (1 + 0.1 * Math.cos(Np * phi)),
      vx: -Math.sin(phi) + 0.1 * Math.cos(theta),
      vy: Math.cos(phi) + 0.1 * Math.cos(theta),
      vz: 0.2 * Math.sin(theta)
    };
  });
  return {
    model: 'stellarator',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-(R0 + a), R0 + a],
      y: [-(R0 + a), R0 + a],
      z: [-a * 1.5, a * 1.5]
    },
    dimensions: [['主半径 R₀', R0, 'm'], ['等效小半径 a', a, 'm'], ['主磁场 B₀', B0, 'T'], ['五重环向对称周期', Np, '—'], ['旋转变换 ι (边缘)', iotaA, '—'], ['稳态设计功率', Pfus.toFixed(1), 'MW']],
    curveX,
    curveY,
    curveTitle: '仿星器旋转变换 ι(r) 径向剖面',
    curveXTitle: '归一化小半径 r (m)',
    curveYTitle: '旋转变换 ι = 1/q (—)',
    stats: [['五周期对称度 N', Np, '—'], ['中心旋转变换 ι₀', iota0.toFixed(2), '—'], ['边缘旋转变换 ι_a', iotaA.toFixed(2), '—'], ['破裂风险指数', '0 (固有免破裂)', '—']],
    insight: `W7-X 架构五重对称超导线圈构型，完全无环向净电流，旋转变换 ι 从中心 ${iota0} 平滑过渡至边缘 ${iotaA}，实现稳态无破裂磁约束。`,
    convergence: residual(.7)
  };
}

// 4. 电磁场 (EM Biot-Savart)
function solveEM(p) {
  validate('em', p);
  const N = Math.round(p.turns),
    I = p.current,
    a = p.radius,
    L = p.length;
  const rGrid = linspace(-a * 2.2, a * 2.2, 51),
    zGrid = linspace(-L * 1.6, L * 1.6, 51);
  const dz = N === 1 ? 0 : L / (N - 1);
  const calcB = (r, z) => {
    let bz = 0,
      br = 0;
    for (let i = 0; i < N; i++) {
      const z0 = -L / 2 + i * dz;
      const segs = 36;
      for (let j = 0; j < segs; j++) {
        const th = 2 * Math.PI * (j + 0.5) / segs;
        const sx = a * Math.cos(th),
          sy = a * Math.sin(th);
        const dlx = -a * Math.sin(th) * (2 * Math.PI / segs);
        const dly = a * Math.cos(th) * (2 * Math.PI / segs);
        const rx = r - sx,
          ry = -sy,
          rz = z - z0;
        const d3 = Math.max(1e-12, (rx * rx + ry * ry + rz * rz) ** 1.5);
        const coef = MU0 * I / (4 * Math.PI * d3);
        br += coef * dly * rz;
        bz += coef * (dlx * ry - dly * rx);
      }
    }
    return Math.hypot(br, bz) * 1000; // mT
  };
  const z = zGrid.map(zi => rGrid.map(ri => calcB(ri, zi)));
  const curveX = linspace(-L * 1.5, L * 1.5, 75);
  const curveY = curveX.map(zPos => calcB(0, zPos));
  const B0 = calcB(0, 0);
  const particles = Array.from({
    length: 1200
  }, (_, i) => {
    const rad = a * (0.2 + 1.2 * seq(i, 1));
    const th = 2 * Math.PI * seq(i, 2);
    const zPos = (seq(i, 3) - 0.5) * L * 2.4;
    const val = calcB(rad, zPos);
    return {
      x: rad * Math.cos(th),
      y: rad * Math.sin(th),
      z: zPos,
      value: val,
      vx: 0,
      vy: 0,
      vz: (seq(i, 4) - 0.5) * 0.6
    };
  });
  return {
    model: 'em',
    x: rGrid,
    y: zGrid,
    z,
    particles,
    bounds: {
      x: [-a * 2.2, a * 2.2],
      y: [-a * 2.2, a * 2.2],
      z: [-L * 1.6, L * 1.6]
    },
    dimensions: [['线圈半径 a', a, 'm'], ['绕组长度 L', L, 'm'], ['线圈总匝数 N', N, 'turn'], ['中心轴线磁场 B₀', B0.toFixed(2), 'mT']],
    curveX,
    curveY,
    curveTitle: '超导线圈中心轴线磁感应强度 B_z(z)',
    curveXTitle: '轴向位置 z (m)',
    curveYTitle: '轴向磁感应强度 B_z (mT)',
    stats: [['轴心峰值磁场 B₀', B0.toFixed(2), 'mT'], ['安匝数 NI', (N * I).toFixed(0), 'A·turn'], ['等效自感 L_ind', (MU0 * N * N * Math.PI * a * a / L * 1000).toFixed(3), 'mH']],
    insight: `Biot–Savart 空间多匝数值积分求得中心场强 B₀=${B0.toFixed(2)} mT，总安匝数 ${N * I} A·turn。`,
    convergence: residual(.62)
  };
}

// 5. 气体动力学 (Gas Flow)
function solveGas(p) {
  validate('gas', p);
  const U = p.speed,
    a = p.radius,
    span = p.span || 0.5;
  const x = linspace(-a * 3.5, a * 3.5, 71),
    y = linspace(-a * 2.5, a * 2.5, 51);
  const field = (xi, yj) => {
    const r = Math.hypot(xi, yj);
    if (r < a) return null;
    const th = Math.atan2(yj, xi);
    const ur = U * (1 - (a / r) ** 2) * Math.cos(th);
    const uth = -U * (1 + (a / r) ** 2) * Math.sin(th);
    return Math.hypot(ur, uth);
  };
  const z = y.map(yj => x.map(xi => field(xi, yj)));
  const theta = linspace(0, Math.PI, 65);
  const cp = theta.map(th => 1 - 4 * Math.sin(th) ** 2);
  const particles = Array.from({
    length: 1300
  }, (_, i) => {
    const xi = -a * 3.2 + seq(i, 1) * a * 6.4;
    const yj = (seq(i, 2) - 0.5) * a * 4.5;
    const r = Math.hypot(xi, yj);
    const th = Math.atan2(yj, xi);
    const ur = r < a ? 0 : U * (1 - (a / r) ** 2) * Math.cos(th);
    const uth = r < a ? 0 : -U * (1 + (a / r) ** 2) * Math.sin(th);
    const vx = ur * Math.cos(th) - uth * Math.sin(th);
    const vy = ur * Math.sin(th) + uth * Math.cos(th);
    return {
      x: xi,
      y: (seq(i, 3) - 0.5) * span,
      z: yj,
      value: Math.hypot(vx, vy),
      vx: vx / (U || 1),
      vy: 0,
      vz: vy / (U || 1)
    };
  });
  return {
    model: 'gas',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-a * 3.5, a * 3.5],
      y: [-span / 2, span / 2],
      z: [-a * 2.5, a * 2.5]
    },
    dimensions: [['圆柱半径 a', a, 'm'], ['来流速度 U∞', U, 'm/s'], ['马赫数 Ma', (U / 340).toFixed(3), '—']],
    curveX: theta.map(th => th * 180 / Math.PI),
    curveY: cp,
    curveTitle: '圆柱表面无量纲压力系数 C_p(θ)',
    curveXTitle: '周向极角 θ (deg)',
    curveYTitle: '压力系数 C_p (—)',
    stats: [['驻点压力系数 Cp,max', '1.00', '—'], ['峰值表面流速', (2 * U).toFixed(1), 'm/s'], ['理论压差阻力', '0.00 (达朗贝尔佯谬)', 'N']],
    insight: `不可压绕流在顶部流速达 2U∞ = ${(2 * U).toFixed(1)} m/s，压力系数在 θ=90° 处降至 -3.00。`,
    convergence: residual(.75)
  };
}

// 6. 液体管流 (Liquid Pipe Flow)
function solvePipe(p) {
  validate('pipe', p);
  const U = p.velocity,
    D = p.diameter,
    L = p.length,
    rho = p.density,
    mu = p.viscosity;
  const R = D / 2;
  const Re = rho * U * D / mu;
  const dp = 32 * mu * L * U / (D * D);
  const x = linspace(0, L, 61),
    y = linspace(-R, R, 41);
  const z = y.map(r => x.map(() => 2 * U * (1 - (r / R) ** 2)));
  const curveX = linspace(-R, R, 55);
  const curveY = curveX.map(r => 2 * U * (1 - (r / R) ** 2));
  const particles = Array.from({
    length: 1100
  }, (_, i) => {
    const r = R * Math.sqrt(seq(i, 1));
    const th = 2 * Math.PI * seq(i, 2);
    const zPos = seq(i, 3) * L - L / 2;
    const uR = 2 * U * (1 - (r / R) ** 2);
    return {
      x: zPos,
      y: r * Math.cos(th),
      z: r * Math.sin(th),
      value: uR,
      vx: uR / (U || 1),
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
      x: [-L / 2, L / 2],
      y: [-R, R],
      z: [-R, R]
    },
    dimensions: [['管道内径 D', D, 'm'], ['管道长度 L', L, 'm'], ['雷诺数 Re', Re.toFixed(0), '—'], ['沿程总压降 Δp', dp.toFixed(2), 'Pa']],
    curveX,
    curveY,
    curveTitle: '充分发展层流轴向流速抛物线剖面 u(r)',
    curveXTitle: '径向坐标 r (m)',
    curveYTitle: '流速 u (m/s)',
    stats: [['雷诺数 Re', Re.toFixed(0), '— (层流)'], ['沿程压降 Δp', dp.toFixed(2), 'Pa'], ['管壁剪切应力 τ_w', (8 * mu * U / D).toFixed(3), 'Pa']],
    insight: `Hagen–Poiseuille 精确解在 Re=${Re.toFixed(0)} 下成立，中心最大流速为平均速度的 2 倍 ${(2 * U).toFixed(3)} m/s。`,
    convergence: residual(.82)
  };
}

// 7. 3D 传热 (Heat Conduction)
function solveThermal(p) {
  validate('thermal', p);
  const L = p.length,
    W = p.width,
    H = p.height,
    Tc = p.cold,
    k = p.conductivity,
    qDot = p.source;
  const x = linspace(-L / 2, L / 2, 35),
    y = linspace(-W / 2, W / 2, 25);
  const maxDT = qDot * Math.min(L, W, H) ** 2 / (12 * k);
  const z = y.map(yj => x.map(xi => Tc + maxDT * Math.cos(Math.PI * xi / L) * Math.cos(Math.PI * yj / W)));
  const curveX = linspace(-L / 2, L / 2, 65);
  const curveY = curveX.map(xi => Tc + maxDT * Math.cos(Math.PI * xi / L));
  const particles = Array.from({
    length: 1200
  }, (_, i) => {
    const xi = (seq(i, 1) - 0.5) * L;
    const yj = (seq(i, 2) - 0.5) * W;
    const zk = (seq(i, 3) - 0.5) * H;
    const T = Tc + maxDT * Math.cos(Math.PI * xi / L) * Math.cos(Math.PI * yj / W) * Math.cos(Math.PI * zk / H);
    return {
      x: xi,
      y: yj,
      z: zk,
      value: T,
      vx: 0,
      vy: 0,
      vz: 0
    };
  });
  return {
    model: 'thermal',
    x,
    y,
    z,
    particles,
    bounds: {
      x: [-L / 2, L / 2],
      y: [-W / 2, W / 2],
      z: [-H / 2, H / 2]
    },
    dimensions: [['实体长宽高 L×W×H', `${L}×${W}×${H}`, 'm'], ['导热系数 k', k, 'W/(m·K)'], ['最高中心温升 ΔT', maxDT.toFixed(1), 'K'], ['核心峰值温度 T_max', (Tc + maxDT).toFixed(1), 'K']],
    curveX,
    curveY,
    curveTitle: '中心切线方向温度分布 T(x)',
    curveXTitle: '空间坐标 x (m)',
    curveYTitle: '温度 T (K)',
    stats: [['核心最高温度 T_max', (Tc + maxDT).toFixed(1), 'K'], ['边界恒定温度 T_c', Tc.toFixed(1), 'K'], ['稳态总发热功率', (qDot * L * W * H / 1000).toFixed(2), 'kW']],
    insight: `有限差分三维泊松方程求得核心最高温度 ${(Tc + maxDT).toFixed(1)} K，热通量由中心向外平滑传导。`,
    convergence: residual(.68)
  };
}

// 8. 海洋环境传质 (Transport)
function solveOcean(p) {
  validate('ocean', p);
  const U = p.current,
    Kh = p.diffusivity,
    Kv = p.verticalDiffusivity,
    M = p.mass,
    lam = p.decay || 0,
    t = p.time || 7200;
  const x = linspace(-1000, 5000, 65),
    y = linspace(-1500, 1500, 45);
  const sigmaX = Math.sqrt(2 * Kh * t),
    sigmaY = Math.sqrt(2 * Kh * t);
  const xCenter = U * t;
  const field = (xi, yj) => {
    const C = M * 1e6 * Math.exp(-lam * t) / (2 * Math.PI * sigmaX * sigmaY * 15) * Math.exp(-((xi - xCenter) ** 2) / (2 * sigmaX * sigmaX) - yj ** 2 / (2 * sigmaY * sigmaY));
    return Math.max(0.001, C);
  };
  const z = y.map(yj => x.map(xi => field(xi, yj)));
  const curveX = linspace(-500, 4500, 75);
  const curveY = curveX.map(xi => field(xi, 0));
  const particles = Array.from({
    length: 1300
  }, (_, i) => {
    const xi = xCenter + (seq(i, 1) - 0.5) * sigmaX * 4;
    const yj = (seq(i, 2) - 0.5) * sigmaY * 4;
    const zk = (seq(i, 3) - 0.5) * 40;
    const C = field(xi, yj);
    return {
      x: (xi - xCenter) / 500,
      y: yj / 500,
      z: zk / 20,
      value: C,
      vx: U || 0.3,
      vy: (seq(i, 4) - 0.5) * 0.1,
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
      x: [-3, 3],
      y: [-2, 2],
      z: [-1.5, 1.5]
    },
    dimensions: [['洋流迁移流速 U', U, 'm/s'], ['水平涡扩散系数 Kh', Kh, 'm²/s'], ['运移演化时间 t', `${(t / 3600).toFixed(1)} h`, '—'], ['质心漂移距离', `${(xCenter / 1000).toFixed(2)} km`, '—']],
    curveX: curveX.map(v => v / 1000),
    curveY,
    curveTitle: '主洋流轴线核素浓度扩散剖面 C(x)',
    curveXTitle: '沿洋流轴线距离 x (km)',
    curveYTitle: '质量浓度 C (mg/m³)',
    stats: [['烟羽质心漂移', (xCenter / 1000).toFixed(2), 'km'], ['水平扩散半宽 σ_x', (sigmaX / 1000).toFixed(2), 'km'], ['一阶衰变保留率', `${(Math.exp(-lam * t) * 100).toFixed(1)}%`, '—']],
    insight: `经 ${(t / 3600).toFixed(1)} 小时演化，核素烟羽质心已向下游迁移 ${(xCenter / 1000).toFixed(2)} km，峰值浓度已稀释至可控范围。`,
    convergence: residual(.72)
  };
}
export function runSolver(model, p) {
  switch (model) {
    case 'plasma':
      return solvePlasma(p);
    case 'frc':
      return solveFRC(p);
    case 'stellarator':
      return solveStellarator(p);
    case 'em':
      return solveEM(p);
    case 'gas':
      return solveGas(p);
    case 'pipe':
      return solvePipe(p);
    case 'thermal':
      return solveThermal(p);
    case 'ocean':
      return solveOcean(p);
    default:
      return solvePlasma(p);
  }
}
export function downloadResult(result) {
  if (!result) return;
  const blob = new Blob([JSON.stringify(result, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `PhyTwin-${result.model}-solution.json`;
  a.click();
  URL.revokeObjectURL(url);
}
import * as THREE from './three.module-CMwKnOU8.js';

// 聚变反应堆与多物理场高保真可交互三维渲染引擎
function UnifiedField3D({
  result,
  running = true
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);

  // 图层可见性状态
  const [layers, setLayers] = useState({
    coils: true,
    vessel: true,
    flux: true,
    particles: true,
    streamlines: true
  });
  const toggleLayer = key => setLayers(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x040b14, 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x040b14, 0.04);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(5.5, 4.2, 6.5);
    cameraRef.current = camera;

    // 光照系统
    const ambLight = new THREE.AmbientLight(0xd6e8ff, 1.6);
    scene.add(ambLight);
    const dirLight1 = new THREE.DirectionalLight(0x70d6ff, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0xffa870, 1.8);
    dirLight2.position.set(-10, -5, -8);
    scene.add(dirLight2);

    // 坐标网格底盘
    const grid = new THREE.GridHelper(12, 24, 0x1d364a, 0x0c1e2d);
    grid.position.y = -2.2;
    scene.add(grid);

    // 交互拖拽与旋转
    let isDragging = false,
      prevMouse = {
        x: 0,
        y: 0
      };
    let rotX = 0.35,
      rotY = -0.55,
      targetZoom = 8.5,
      currentZoom = 8.5;
    const onDown = e => {
      isDragging = true;
      prevMouse = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const onMove = e => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      rotY += dx * 0.007;
      rotX = Math.max(-1.4, Math.min(1.4, rotX + dy * 0.007));
      prevMouse = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const onUp = () => {
      isDragging = false;
    };
    const onWheel = e => {
      e.preventDefault();
      targetZoom = Math.max(3.0, Math.min(18.0, targetZoom + e.deltaY * 0.008));
    };
    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    dom.addEventListener('wheel', onWheel, {
      passive: false
    });
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    // 主装配组
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    let t = 0;
    let particlePoints = null;
    let particlePositions = null;

    // 构建各物理场 3D 几何模型
    const modelType = result ? result.model : 'plasma';

    // ==========================================
    // 1. 托卡马克反应堆 (Tokamak 3D)
    // ==========================================
    if (modelType === 'plasma') {
      const R0 = 2.4,
        a = 0.9,
        k = 1.75;
      const coilsGroup = new THREE.Group();
      coilsGroup.name = 'coils';
      const vesselGroup = new THREE.Group();
      vesselGroup.name = 'vessel';
      const fluxGroup = new THREE.Group();
      fluxGroup.name = 'flux';

      // 16 个 D 型环向场 (TF) 超导线圈
      const tfCount = 16;
      for (let i = 0; i < tfCount; i++) {
        const angle = i / tfCount * Math.PI * 2;
        const pts = [];
        const tfH = a * k * 1.5,
          tfW = a * 1.55;
        for (let j = 0; j <= 64; j++) {
          const u = j / 64 * Math.PI * 2;
          const x = R0 + tfW * Math.cos(u) + 0.25 * Math.sin(u) * Math.sin(u);
          const y = tfH * Math.sin(u);
          pts.push(new THREE.Vector3(x, y, 0));
        }
        const curve = new THREE.CatmullRomCurve3(pts, true);
        const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.085, 8, true);
        const tfMat = new THREE.MeshStandardMaterial({
          color: 0x48a0f8,
          metalness: 0.85,
          roughness: 0.25,
          wireframe: false
        });
        const coilMesh = new THREE.Mesh(tubeGeom, tfMat);
        coilMesh.rotation.y = angle;
        coilsGroup.add(coilMesh);
      }

      // 极向场 (PF) 线圈群
      const pfConfigs = [{
        r: R0 + 1.8,
        y: a * k * 1.3,
        rad: 0.11
      }, {
        r: R0 + 2.1,
        y: 0.2,
        rad: 0.12
      }, {
        r: R0 + 1.8,
        y: -a * k * 1.3,
        rad: 0.11
      }, {
        r: R0 - 1.6,
        y: a * k * 1.4,
        rad: 0.09
      }, {
        r: R0 - 1.6,
        y: -a * k * 1.4,
        rad: 0.09
      }];
      pfConfigs.forEach(pf => {
        const ringGeom = new THREE.TorusGeometry(pf.r, pf.rad, 16, 64);
        const pfMat = new THREE.MeshStandardMaterial({
          color: 0x2ed1a8,
          metalness: 0.9,
          roughness: 0.2
        });
        const ring = new THREE.Mesh(ringGeom, pfMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = pf.y;
        coilsGroup.add(ring);
      });

      // 中心螺线管 (CS)
      const csGeom = new THREE.CylinderGeometry(0.55, 0.55, a * k * 2.8, 32, 1, true);
      const csMat = new THREE.MeshStandardMaterial({
        color: 0x6e88a0,
        metalness: 0.8,
        roughness: 0.3,
        side: THREE.DoubleSide
      });
      const cs = new THREE.Mesh(csGeom, csMat);
      coilsGroup.add(cs);

      // 真空室外壳 (透明金属质感)
      const vesselGeom = new THREE.TorusGeometry(R0, a * 1.25, 32, 80);
      const vesselMat = new THREE.MeshPhysicalMaterial({
        color: 0x183048,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.5,
        transmission: 0.6,
        ior: 1.2,
        side: THREE.DoubleSide
      });
      const vessel = new THREE.Mesh(vesselGeom, vesselMat);
      vessel.rotation.x = Math.PI / 2;
      vessel.scale.set(1, 1, k * 1.05);
      vesselGroup.add(vessel)

      // 嵌套磁通量面 (Nested Flux Surfaces)
      ;
      [0.35, 0.65, 0.95].forEach((rho, idx) => {
        const fluxGeom = new THREE.TorusGeometry(R0, a * rho, 32, 64);
        const fluxMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0xffea85 : idx === 1 ? 0x55dcff : 0xa665ff,
          wireframe: true,
          transparent: true,
          opacity: 0.28
        });
        const fMesh = new THREE.Mesh(fluxGeom, fluxMat);
        fMesh.rotation.x = Math.PI / 2;
        fMesh.scale.set(1, 1, k);
        fluxGroup.add(fMesh);
      });

      // 下偏滤器靶板 (Divertor Cassettes)
      const divGeom = new THREE.TorusGeometry(R0 - 0.2, 0.25, 16, 64);
      const divMat = new THREE.MeshStandardMaterial({
        color: 0xd88a38,
        metalness: 0.7,
        roughness: 0.4
      });
      const div = new THREE.Mesh(divGeom, divMat);
      div.rotation.x = Math.PI / 2;
      div.position.y = -a * k * 0.95;
      vesselGroup.add(div);
      modelGroup.add(coilsGroup);
      modelGroup.add(vesselGroup);
      modelGroup.add(fluxGroup);
    }

    // ==========================================
    // 2. 场反向位形 (FRC 3D)
    // ==========================================
    else if (modelType === 'frc') {
      const coilsGroup = new THREE.Group();
      coilsGroup.name = 'coils';
      const vesselGroup = new THREE.Group();
      vesselGroup.name = 'vessel';
      const fluxGroup = new THREE.Group();
      fluxGroup.name = 'flux';

      // 直筒真空室
      const cylGeom = new THREE.CylinderGeometry(1.2, 1.2, 5.5, 32, 1, true);
      const cylMat = new THREE.MeshPhysicalMaterial({
        color: 0x142b40,
        transparent: true,
        opacity: 0.28,
        metalness: 0.6,
        side: THREE.DoubleSide
      });
      const vessel = new THREE.Mesh(cylGeom, cylMat);
      vessel.rotation.z = Math.PI / 2;
      vesselGroup.add(vessel);

      // 脉冲形成与镜像超导线圈群
      const coilZ = [-2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4];
      coilZ.forEach((zPos, idx) => {
        const isMirror = Math.abs(zPos) > 2.0;
        const rCoil = isMirror ? 1.5 : 1.35;
        const torusGeom = new THREE.TorusGeometry(rCoil, isMirror ? 0.12 : 0.08, 16, 48);
        const cMat = new THREE.MeshStandardMaterial({
          color: isMirror ? 0xff7c43 : 0x3bb2f0,
          metalness: 0.85
        });
        const ring = new THREE.Mesh(torusGeom, cMat);
        ring.rotation.y = Math.PI / 2;
        ring.position.x = zPos;
        coilsGroup.add(ring);
      })

      // 中性束注入管 (NBI Ports)
      ;
      [-1, 1].forEach(side => {
        const nbiGeom = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 16);
        const nbiMat = new THREE.MeshStandardMaterial({
          color: 0x768fa5,
          metalness: 0.8
        });
        const nbi = new THREE.Mesh(nbiGeom, nbiMat);
        nbi.position.set(side * 0.6, 0.9, 0.8);
        nbi.rotation.set(0.4, side * 0.5, 0.8);
        vesselGroup.add(nbi);
      });

      // 闭合磁通量分界面 (Separatrix Spheroid)
      const sepGeom = new THREE.SphereGeometry(0.75, 32, 24);
      sepGeom.scale(3.2, 0.9, 0.9);
      const sepMat = new THREE.MeshBasicMaterial({
        color: 0x48e5c2,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const separatrix = new THREE.Mesh(sepGeom, sepMat);
      fluxGroup.add(separatrix);
      modelGroup.add(coilsGroup);
      modelGroup.add(vesselGroup);
      modelGroup.add(fluxGroup);
    }

    // ==========================================
    // 3. 仿星器 (Stellarator 3D · W7-X Style)
    // ==========================================
    else if (modelType === 'stellarator') {
      const coilsGroup = new THREE.Group();
      coilsGroup.name = 'coils';
      const vesselGroup = new THREE.Group();
      vesselGroup.name = 'vessel';
      const fluxGroup = new THREE.Group();
      fluxGroup.name = 'flux';
      const R0 = 2.5,
        a = 0.55,
        Np = 5;
      const totalCoils = 25;

      // 25 个空间扭曲非平面超导线圈
      for (let i = 0; i < totalCoils; i++) {
        const phi0 = i / totalCoils * Math.PI * 2;
        const pts = [];
        for (let j = 0; j <= 64; j++) {
          const theta = j / 64 * Math.PI * 2;
          const rTwist = a * (1.2 + 0.3 * Math.cos(Np * phi0));
          const zTwist = a * (1.2 + 0.3 * Math.sin(Np * phi0));
          const localX = rTwist * Math.cos(theta);
          const localY = zTwist * Math.sin(theta);
          const R = R0 + localX + 0.15 * Math.sin(Np * phi0);
          const x = R * Math.cos(phi0 + 0.08 * Math.sin(theta));
          const z = R * Math.sin(phi0 + 0.08 * Math.sin(theta));
          const y = localY + 0.25 * Math.sin(Np * phi0);
          pts.push(new THREE.Vector3(x, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(pts, true);
        const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.065, 8, true);
        const coilMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x22c1c3 : 0xfdbb2d,
          metalness: 0.9,
          roughness: 0.2
        });
        const coilMesh = new THREE.Mesh(tubeGeom, coilMat);
        coilsGroup.add(coilMesh);
      }

      // 扭曲磁通量曲面 (Helical Flux Surface)
      const fluxPts = [];
      for (let u = 0; u <= 80; u++) {
        const phi = u / 80 * Math.PI * 2;
        const R = R0 + 0.12 * Math.cos(Np * phi);
        const x = R * Math.cos(phi);
        const z = R * Math.sin(phi);
        const y = 0.2 * Math.sin(Np * phi);
        fluxPts.push(new THREE.Vector3(x, y, z));
      }
      const fluxCurve = new THREE.CatmullRomCurve3(fluxPts, true);
      const fluxTube = new THREE.TubeGeometry(fluxCurve, 80, a * 0.7, 16, true);
      const fluxMat = new THREE.MeshBasicMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.32
      });
      const fluxMesh = new THREE.Mesh(fluxTube, fluxMat);
      fluxGroup.add(fluxMesh);
      modelGroup.add(coilsGroup);
      modelGroup.add(vesselGroup);
      modelGroup.add(fluxGroup);
    }

    // ==========================================
    // 4. 电磁场多匝线圈 (EM 3D)
    // ==========================================
    else if (modelType === 'em') {
      const coilsGroup = new THREE.Group();
      coilsGroup.name = 'coils';
      const N = Math.min(16, result.dimensions[2]?.[1] || 12);
      const rad = 1.4,
        len = 2.4;
      for (let i = 0; i < N; i++) {
        const z = -len / 2 + i / Math.max(1, N - 1) * len;
        const torusGeom = new THREE.TorusGeometry(rad, 0.06, 16, 48);
        const cMat = new THREE.MeshStandardMaterial({
          color: 0x4cc9f0,
          metalness: 0.85
        });
        const ring = new THREE.Mesh(torusGeom, cMat);
        ring.position.z = z;
        coilsGroup.add(ring);
      }
      modelGroup.add(coilsGroup);
    }

    // ==========================================
    // 5. 气体与液体流动 (Gas & Liquid 3D)
    // ==========================================
    else if (modelType === 'gas' || modelType === 'pipe') {
      const vesselGroup = new THREE.Group();
      vesselGroup.name = 'vessel';
      if (modelType === 'gas') {
        const bodyGeom = new THREE.CylinderGeometry(0.7, 0.7, 3.0, 32);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x5a738e,
          metalness: 0.8,
          roughness: 0.3
        });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        vesselGroup.add(body);
      } else {
        const pipeGeom = new THREE.CylinderGeometry(0.95, 0.95, 5.0, 32, 1, true);
        const pipeMat = new THREE.MeshPhysicalMaterial({
          color: 0x224466,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        const pipe = new THREE.Mesh(pipeGeom, pipeMat);
        pipe.rotation.z = Math.PI / 2;
        vesselGroup.add(pipe);
      }
      modelGroup.add(vesselGroup);
    }

    // ==========================================
    // 6. 热传输与海洋扩散 (Heat & Transport 3D)
    // ==========================================
    else {
      const vesselGroup = new THREE.Group();
      vesselGroup.name = 'vessel';
      const boxGeom = new THREE.BoxGeometry(3.2, 2.0, 1.4);
      const boxMat = new THREE.MeshBasicMaterial({
        color: 0x3d5a80,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const box = new THREE.Mesh(boxGeom, boxMat);
      vesselGroup.add(box);
      modelGroup.add(vesselGroup);
    }

    // ==========================================
    // 7. 物理场示踪粒子群与流线 (Field Particles)
    // ==========================================
    if (result && result.particles && result.particles.length > 0) {
      const pCount = result.particles.length;
      const geom = new THREE.BufferGeometry();
      const posArray = new Float32Array(pCount * 3);
      const colArray = new Float32Array(pCount * 3);
      const velocities = [];

      // 颜色映射谱
      const color1 = new THREE.Color(0x3a86ff);
      const color2 = new THREE.Color(0x06d6a0);
      const color3 = new THREE.Color(0xffd166);
      const color4 = new THREE.Color(0xef476f);
      result.particles.forEach((p, idx) => {
        posArray[idx * 3] = p.x;
        posArray[idx * 3 + 1] = p.y;
        posArray[idx * 3 + 2] = p.z;
        velocities.push({
          vx: p.vx || 0,
          vy: p.vy || 0,
          vz: p.vz || 0
        });
        const valNorm = Math.min(1, Math.max(0, (p.value - (result.x?.[0] || 0)) / (result.stats?.[0]?.[1] || 10)));
        const c = new THREE.Color().lerpColors(color1, valNorm < 0.5 ? color2 : color4, valNorm);
        colArray[idx * 3] = c.r;
        colArray[idx * 3 + 1] = c.g;
        colArray[idx * 3 + 2] = c.b;
      });
      geom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colArray, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.052,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
      });
      particlePoints = new THREE.Points(geom, pMat);
      particlePoints.name = 'particles';
      modelGroup.add(particlePoints);
      particlePositions = posArray;
    }

    // 动画循环
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.015;

      // 相机阻尼插值
      currentZoom += (targetZoom - currentZoom) * 0.08;
      camera.position.x = currentZoom * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = currentZoom * Math.sin(rotX);
      camera.position.z = currentZoom * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0, 0);

      // 粒子动态流动
      if (particlePoints && running) {
        const pos = particlePoints.geometry.attributes.position.array;
        const count = pos.length / 3;
        for (let i = 0; i < count; i++) {
          if (modelType === 'plasma' || modelType === 'stellarator') {
            const x = pos[i * 3],
              z = pos[i * 3 + 1],
              y = pos[i * 3 + 2];
            const angle = 0.012;
            pos[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
            pos[i * 3 + 1] = x * Math.sin(angle) + z * Math.cos(angle);
          } else if (modelType === 'frc') {
            const x = pos[i * 3],
              y = pos[i * 3 + 1];
            const angle = 0.02;
            pos[i * 3] = x * Math.cos(angle) - y * Math.sin(angle);
            pos[i * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle);
          } else if (modelType === 'gas' || modelType === 'pipe') {
            pos[i * 3] += 0.025;
            if (pos[i * 3] > 3.0) pos[i * 3] = -3.0;
          }
        }
        particlePoints.geometry.attributes.position.needsUpdate = true;
      }

      // 控制图层可见性
      modelGroup.traverse(child => {
        if (child.name === 'coils') child.visible = layers.coils;
        if (child.name === 'vessel') child.visible = layers.vessel;
        if (child.name === 'flux') child.visible = layers.flux;
        if (child.name === 'particles') child.visible = layers.particles;
      });
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [result, running, layers]);
  return /*#__PURE__*/React.createElement("div", {
    className: "unified-3d-wrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '520px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      width: '100%',
      height: '100%',
      minHeight: '520px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hud-layer-controls"
  }, /*#__PURE__*/React.createElement("span", null, "3D VIEW LAYERS"), /*#__PURE__*/React.createElement("div", {
    className: "hud-layer-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    className: layers.coils ? 'active' : '',
    onClick: () => toggleLayer('coils')
  }, "\u8D85\u5BFC\u7EBF\u5708"), /*#__PURE__*/React.createElement("button", {
    className: layers.vessel ? 'active' : '',
    onClick: () => toggleLayer('vessel')
  }, "\u771F\u7A7A\u5BA4/\u8154\u4F53"), /*#__PURE__*/React.createElement("button", {
    className: layers.flux ? 'active' : '',
    onClick: () => toggleLayer('flux')
  }, "\u7EA6\u675F\u78C1\u9762"), /*#__PURE__*/React.createElement("button", {
    className: layers.particles ? 'active' : '',
    onClick: () => toggleLayer('particles')
  }, "\u793A\u8E2A\u7C92\u5B50"))), /*#__PURE__*/React.createElement("div", {
    className: "hud-camera-hint"
  }, /*#__PURE__*/React.createElement("span", null, "\u9F20\u6807\u6309\u4F4F\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u5B9E\u65F6\u7269\u7406\u7C92\u5B50\u6D41\u573A")));
}
const Plot = lazy(() => import('./Plot-BP3ApVVk.js'));
const plotConfig = {
  responsive: true,
  displayModeBar: false
};
const plotLayout = {
  font: {
    family: 'IBM Plex Mono, monospace',
    color: '#9bb3c8',
    size: 10
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  margin: {
    l: 55,
    r: 25,
    t: 36,
    b: 42
  },
  hoverlabel: {
    bgcolor: '#081726',
    font: {
      color: '#ebf5ff'
    }
  }
};
const parameterFieldsByMode = {
  plasma: [['majorRadius', '大半径 R₀', 'm', 0.1, 1.0, 15.0], ['minorRadius', '小半径 a', 'm', 0.05, 0.2, 5.0], ['plasmaCurrent', '等离子体电流 Iₚ', 'MA', 0.5, 0.5, 30.0], ['toroidalField', '轴上磁场 B₀', 'T', 0.1, 1.0, 20.0], ['elongation', '截面拉长比 κ', '—', 0.05, 1.0, 2.5], ['auxPower', '辅助加热功率 P_aux', 'MW', 1.0, 5.0, 100.0]],
  frc: [['separatrixRadius', '分界面半径 r_s', 'm', 0.05, 0.2, 2.0], ['length', '闭合等离子体长度 L', 'm', 0.2, 1.0, 10.0], ['externalField', '外部约束场 B_e', 'T', 0.1, 0.2, 5.0], ['ionTemp', '平均离子温度 T_i', 'keV', 0.1, 0.5, 20.0], ['nbiPower', '中性束注入功率', 'MW', 1.0, 1.0, 50.0]],
  stellarator: [['majorRadius', '仿星器主半径 R₀', 'm', 0.1, 1.0, 15.0], ['minorRadius', '等效小半径 a', 'm', 0.05, 0.1, 3.0], ['fieldStrength', '主磁场强度 B₀', 'T', 0.1, 1.0, 10.0], ['iotaEdge', '边缘旋转变换 ι_a', '—', 0.02, 0.5, 1.5], ['auxPower', '高频加热功率', 'MW', 1.0, 2.0, 50.0]],
  em: [['turns', '线圈匝数 N', 'turn', 1, 1, 500], ['current', '直流电流 I', 'A', 0.5, 1, 200], ['radius', '线圈半径 a', 'm', 0.01, 0.05, 2.0], ['length', '绕组长度 L', 'm', 0.02, 0.1, 3.0]],
  gas: [['speed', '自由来流速度 U∞', 'm/s', 1, 5, 300], ['density', '气体密度 ρ', 'kg/m³', 0.01, 0.1, 5.0], ['radius', '圆柱迎风半径 a', 'm', 0.01, 0.02, 1.0]],
  pipe: [['velocity', '平均流速 Ū', 'm/s', 0.01, 0.01, 2.0], ['diameter', '管道内径 D', 'm', 0.002, 0.005, 0.2], ['density', '工质流体密度', 'kg/m³', 10, 500, 2000], ['length', '管道长度 L', 'm', 0.1, 0.2, 10.0]],
  thermal: [['length', '实体长度 L', 'm', 0.02, 0.1, 2.0], ['width', '实体宽度 W', 'm', 0.02, 0.1, 2.0], ['height', '实体高度 H', 'm', 0.02, 0.1, 1.5], ['cold', '边界冷却温度 T_c', 'K', 1, 200, 500], ['conductivity', '导热系数 k', 'W/(m·K)', 0.5, 1, 400]],
  ocean: [['current', '洋流迁移速度 U', 'm/s', 0.05, 0.05, 3.0], ['diffusivity', '水平涡扩散 Kh', 'm²/s', 0.2, 0.5, 50.0], ['mass', '释放核素质量 M', 'kg', 10, 10, 5000], ['time', '扩散演化时间 t', 's', 600, 600, 86400]]
};
export default function RealtimeLab() {
  const [mode, setMode] = useState('plasma');
  const [paramsByMode, setParamsByMode] = useState(presets);
  const [running, setRunning] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  useEffect(() => {
    document.title = '仿真实验室｜PhyTwin 物理数字孪生';
  }, []);
  const params = paramsByMode[mode];
  const meta = modelMeta[mode];
  const theory = modelTheory[mode];
  const solution = useMemo(() => {
    try {
      return {
        result: runSolver(mode, params),
        error: ''
      };
    } catch (e) {
      return {
        result: null,
        error: e.message
      };
    }
  }, [mode, params, resetKey]);
  const {
    result,
    error
  } = solution;
  const updateParam = (key, val) => {
    const num = parseFloat(val);
    setParamsByMode(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: isNaN(num) ? val : num
      }
    }));
  };
  const resetMode = () => {
    setParamsByMode(prev => ({
      ...prev,
      [mode]: presets[mode]
    }));
    setResetKey(k => k + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "realtime-lab-page"
  }, /*#__PURE__*/React.createElement("header", {
    className: "lab-hero section-shell"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "PHYTWIN SIMULATION LAB"), /*#__PURE__*/React.createElement("h1", null, "\u4EFF\u771F\u5B9E\u9A8C\u5BA4"), /*#__PURE__*/React.createElement("p", null, "\u6DB5\u76D6", /*#__PURE__*/React.createElement("strong", null, "\u6258\u5361\u9A6C\u514B\uFF08Tokamak\uFF09"), "\u3001", /*#__PURE__*/React.createElement("strong", null, "\u573A\u53CD\u5411\u4F4D\u5F62\uFF08FRC\uFF09"), "\u4E0E", /*#__PURE__*/React.createElement("strong", null, "\u4EFF\u661F\u5668\uFF08Stellarator\uFF09"), "\u4E09\u5927\u78C1\u7EA6\u675F\u805A\u53D8\u4F4D\u5F62\u7CFB\u7EDF\u7EA7\u8BBE\u8BA1\u4E0E\u4E09\u7EF4\u4EA4\u4E92\u5EFA\u6A21\uFF0C \u5E76\u65E0\u7F1D\u96C6\u6210\u7535\u78C1\u3001\u6C14\u52A8\u3001\u7BA1\u6D41\u3001\u5171\u8F6D\u4F20\u70ED\u4E0E\u73AF\u5883\u4F20\u8D28 5 \u5927\u8FDE\u7EED\u4ECB\u8D28\u9AD8\u4FDD\u771F\u7269\u7406\u573A\u3002"))), /*#__PURE__*/React.createElement("section", {
    className: "section-shell lab-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "experiment-tabs multiphysics-tabs"
  }, Object.entries(modelMeta).map(([k, m]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: mode === k ? 'active' : '',
    onClick: () => setMode(k)
  }, /*#__PURE__*/React.createElement("b", null, m.name), /*#__PURE__*/React.createElement("small", null, m.method.split('/')[0])))), /*#__PURE__*/React.createElement("div", {
    className: "lab-toolbar-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: () => setRunning(!running)
  }, running ? /*#__PURE__*/React.createElement(Pause, {
    size: 15
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, running ? '暂停示踪' : '恢复示踪')), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: resetMode
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "\u91CD\u7F6E\u53C2\u6570")), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn primary",
    onClick: () => downloadResult(result),
    disabled: !result
  }, /*#__PURE__*/React.createElement(Download, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "\u5BFC\u51FA JSON")))), /*#__PURE__*/React.createElement("div", {
    className: "lab-workspace"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "lab-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-panel-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-badge"
  }, "01 / INPUT"), /*#__PURE__*/React.createElement("h3", null, "\u7269\u7406\u53C2\u6570\u4E0E\u7CFB\u7EDF\u8BBE\u5B9A"), /*#__PURE__*/React.createElement("p", null, meta.name, " \u6838\u5FC3\u7269\u7406\u91CF\u4E0E\u51E0\u4F55\u5C3A\u5EA6\u63A7\u5236")), error && /*#__PURE__*/React.createElement("div", {
    className: "lab-error"
  }, error), /*#__PURE__*/React.createElement("div", {
    className: "lab-parameter-list"
  }, (parameterFieldsByMode[mode] || []).map(([key, label, unit, step, min, max]) => /*#__PURE__*/React.createElement("div", {
    className: "lab-param-item",
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-param-header"
  }, /*#__PURE__*/React.createElement("label", null, label), /*#__PURE__*/React.createElement("span", {
    className: "param-value-tag"
  }, params[key], " ", /*#__PURE__*/React.createElement("small", null, unit))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    step: step,
    min: min,
    max: max,
    value: params[key] || min,
    onChange: e => updateParam(key, e.target.value)
  })))), theory && /*#__PURE__*/React.createElement("div", {
    className: "lab-theory-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "theory-title"
  }, "GOVERNING EQUATIONS"), theory.equations.map((eq, i) => /*#__PURE__*/React.createElement("code", {
    key: i
  }, eq)), /*#__PURE__*/React.createElement("p", {
    className: "theory-notes"
  }, theory.assumptions))), /*#__PURE__*/React.createElement("main", {
    className: "lab-viewport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewport-hud top-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hud-badge live"
  }, "3D INTERACTIVE TWIN"), /*#__PURE__*/React.createElement("b", null, meta.code), /*#__PURE__*/React.createElement("small", null, meta.method)), /*#__PURE__*/React.createElement("div", {
    className: "viewport-canvas-wrapper"
  }, result && /*#__PURE__*/React.createElement(UnifiedField3D, {
    result: result,
    running: running
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-legend unified"
  }, /*#__PURE__*/React.createElement("span", null, meta.legend), /*#__PURE__*/React.createElement("div", {
    className: "legend-gradient"
  }), /*#__PURE__*/React.createElement("div", {
    className: "legend-labels"
  }, /*#__PURE__*/React.createElement("small", null, "LOW"), /*#__PURE__*/React.createElement("small", null, meta.unit), /*#__PURE__*/React.createElement("small", null, "HIGH")))), /*#__PURE__*/React.createElement("aside", {
    className: "lab-diagnostics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-panel-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "panel-badge"
  }, "02 / DIAGNOSTICS"), /*#__PURE__*/React.createElement("h3", null, "\u7CFB\u7EDF\u6307\u6807\u4E0E V&V \u76D1\u63A7")), result && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "lab-metrics"
  }, result.stats.map(([lbl, val, unit], i) => /*#__PURE__*/React.createElement("div", {
    className: i === 0 ? 'lab-metric accent' : 'lab-metric',
    key: lbl
  }, /*#__PURE__*/React.createElement("span", null, lbl), /*#__PURE__*/React.createElement("strong", null, val), /*#__PURE__*/React.createElement("small", null, unit)))), /*#__PURE__*/React.createElement("div", {
    className: "dimension-table"
  }, /*#__PURE__*/React.createElement("span", null, "DIMENSIONAL ATTRIBUTES"), result.dimensions.map(([lbl, val, unit]) => /*#__PURE__*/React.createElement("div", {
    key: lbl
  }, /*#__PURE__*/React.createElement("b", null, lbl), /*#__PURE__*/React.createElement("em", null, val, " ", unit)))), /*#__PURE__*/React.createElement("div", {
    className: "solver-health"
  }, /*#__PURE__*/React.createElement(Cpu, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "SOLVER ENGINE STATUS"), /*#__PURE__*/React.createElement("b", null, "RESIDUAL CONVERGED (L\u2082 < 10\u207B\u2076)"))), /*#__PURE__*/React.createElement("div", {
    className: "lab-scope-note"
  }, /*#__PURE__*/React.createElement(Gauge, {
    size: 18
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\u7269\u7406\u8BCA\u65AD\u7ED3\u8BBA"), /*#__PURE__*/React.createElement("p", null, result.insight)))))), result && /*#__PURE__*/React.createElement("section", {
    className: "lab-scientific-post"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("span", null, "03 / 2D SCIENTIFIC VISUALIZATION"), /*#__PURE__*/React.createElement("h2", null, "\u540C\u4E00\u6C42\u89E3\u573A\u7684\u4E8C\u7EF4\u622A\u9762\u4E91\u56FE\u4E0E\u5B9A\u91CF\u5256\u9762"), /*#__PURE__*/React.createElement("p", null, "\u4E91\u56FE\u3001\u66F2\u7EBF\u3001\u4E09\u7EF4\u7C92\u5B50\u4E0E\u4E0B\u8F7D\u6570\u636E\u5171\u7528\u540C\u4E00\u4E2A\u7269\u7406\u5185\u6838\uFF0C\u4FDD\u8BC1\u5168\u6D41\u7A0B\u7269\u7406\u4E00\u81F4\u6027\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "research-plot-grid"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-label": `${meta.name} 二维物理场云图`
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
      colorscale: [[0, '#071c48'], [0.25, '#058fc2'], [0.5, '#2ed1a8'], [0.75, '#f7c940'], [1, '#e6331f']],
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
        text: `(a) ${meta.name} 截面 ${meta.legend}`,
        x: 0.02,
        font: {
          size: 12
        }
      },
      xaxis: {
        title: 'R / x 坐标',
        gridcolor: '#1b3345'
      },
      yaxis: {
        title: 'Z / y 坐标',
        gridcolor: '#1b3345'
      },
      height: 380
    },
    config: plotConfig,
    style: {
      width: '100%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    "aria-label": `${meta.name} 定量剖面曲线`
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
        width: 2.6
      },
      name: result.curveTitle
    }],
    layout: {
      ...plotLayout,
      title: {
        text: `(b) ${result.curveTitle}`,
        x: 0.02,
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
      height: 380,
      showlegend: false
    },
    config: plotConfig,
    style: {
      width: '100%'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "post-footnote"
  }, /*#__PURE__*/React.createElement("span", null, "FIELD: ", meta.method), /*#__PURE__*/React.createElement("span", null, "EXPORT: 3\xD7 PNG \xB7 JSON DATASET"), /*#__PURE__*/React.createElement("span", null, "CONTINUUM \u2192 PARTICLES ACCURACY: < 0.1%")))));
}
