
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

const STAGES = [{
  id: 'fluid',
  num: '01',
  title: '连续流场基底',
  subtitle: 'THE UNIFIED CONTINUOUS FLOW FIELD',
  badge: '动力学本构',
  icon: Waves,
  summary: '物理空间本质上是由内蕴可压缩流体连续介质构成，而非绝对虚空。真空能量涨落即是流场微观微扰。',
  mechanism: '连续介质满足广义纳维-斯托克斯与能量守恒方程，其流速场 \\vec{v}(\\vec{x},t) 与微压强密度 \\rho(\\vec{x},t) 构成所有物理现象的基础底层。',
  formula: '\\frac{\\partial \\vec{v}}{\\partial t} + (\\vec{v} \\cdot \\nabla)\\vec{v} = -\\frac{1}{\\rho}\\nabla P + \\nu \\nabla^2 \\vec{v} + \\vec{f}_{\\text{vac}}',
  points: ['流场不依赖外禀粒子，自身即是实体', '微观声速 $c$ 构成信息与能量传播的上限（光速）', '连续介质的非线性形变为拓扑结构的孕育提供基质']
}, {
  id: 'charge',
  num: '02',
  title: '电荷的拓扑构成',
  subtitle: 'CHARGE AS VORTEX CIRCULATION & CHIRALITY',
  badge: '拓扑环量',
  icon: Zap,
  summary: '“电荷”并非点状附着物，而是连续流场在三维空间中形成的自持闭合涡旋（Vortex Filament）的环量与手征性。',
  mechanism: '沿闭合回路的流速线积分定义拓扑环量 \\Gamma。正负电荷分别对应涡旋的右手征顺流与左手征逆流，库仑力即为涡环间的流体动力学吸斥效应。',
  formula: 'q = \\kappa \\oint_{\\mathcal{C}} \\vec{v} \\cdot d\\vec{l} = \\kappa \\iint_{\\mathcal{S}} (\\nabla \\times \\vec{v}) \\cdot d\\vec{A} = \\kappa \\Gamma',
  points: ['正电荷与负电荷：流场涡旋的右手螺旋与左手螺旋', '同种相斥、异种相吸：流场伯努利压力与涡旋干涉的必然结果', '电荷量子化：流场拓扑缠绕数（Winding Number）的离散整数约束']
}, {
  id: 'mass',
  num: '03',
  title: '质量的自禁闭涌现',
  subtitle: 'MASS AS LOCALISED CONFINED FIELD ENERGY',
  badge: '自禁闭能量',
  icon: Boxes,
  summary: '静止质量是局域非线性涡旋孤子在空间中高度自禁闭的动能与压强场空间积分，实现了场到“实体惯性”的跨越。',
  mechanism: '当流场形成自闭合环流时，动量密度在局域形成驻波禁闭。外界改变其位置需克服内部涡动量的进动阻力，从而在宏观上表现为惯性质性 $m = E_{\\text{confined}} / c^2$。',
  formula: 'm = \\frac{1}{c^2} \\iiint_{V} \\left[ \\frac{1}{2}\\rho |\\vec{v}|^2 + \\mathcal{U}_{\\text{int}}(\\rho) + \\frac{1}{2\\mu_0}|\\nabla \\times \\vec{v}|^2 \\right] dV',
  points: ['惯性起源：改变自旋流场空间位置所需的陀螺反作用力矩', '质能等价：质量就是被束缚在极小空间内的流场环形流动动能', '引力效应：质量中心对周围背景连续介质造成的向心压力梯度']
}, {
  id: 'nucleus',
  num: '04',
  title: '原子核的纽结形成',
  subtitle: 'NUCLEAR SYNTHESIS VIA HOPF VORTEX KNOTS',
  badge: '核子纽结',
  icon: Atom,
  summary: '质子与中子是多重复合的流体孤子纽结（Hopf Solitons），多个核子在伯努利超低压槽中紧密交织，凝聚成原子核。',
  mechanism: '短距离下，核子流场间形成剧烈的局部相长干涉与流速急升，产生巨大的负压吸力（表现为强相互作用核力），抵消了同号电荷的宏观排斥。',
  formula: 'F_{\\text{strong}} = -\\nabla \\left( \\frac{1}{2}\\rho v_{\\text{overlap}}^2 \\right) \\implies E_{\\text{binding}} = \\Delta m c^2',
  points: ['强核力本质：两个涡环近距离同相旋转时流速陡增引发的超强伯努利负压', '中子构成：正反涡管拓扑对消净环量为零但保留局部涡旋自禁闭能量', '核壳层结构：多核子流场在三维球对称空间中的拓扑极小能量稳定几何']
}, {
  id: 'radiation',
  num: '05',
  title: '辐射与衰变机制',
  subtitle: 'RADIATION AS WAVE DISSIPATION & RECONNECTION',
  badge: '退激发波动',
  icon: Radio,
  summary: '辐射是原子核与激发态流场在拓扑重联（Reconnection）或能量跃迁时，向外界背景连续流场发射的球面高频波动。',
  mechanism: '当原子核流场处于高剪切不稳定构型时，局域涡线发生断裂与重新缝合（拓扑跃迁），损失的自禁闭动能化为连续介质的横向电磁波动（$\\gamma$ 辐射）或剥离独立微小涡环（$\\alpha/\\beta$ 粒子）。',
  formula: '\\mathcal{P}_{\\text{radiation}} = \\frac{\\mu_0}{6\\pi c} \\left( \\frac{d^2 \\Gamma}{dt^2} \\right)^2 + \\int_{\\partial V} \\vec{S}_{\\text{fluid}} \\cdot d\\vec{A}',
  points: ['$\\alpha$ 衰变：大原子核外围不稳定涡环团块发生流体动力学脱离', '$\\beta$ 衰变：中子内部零净环量涡对发生手征性翻转并释放微型副涡旋（反中微子）', '$\\gamma$ 辐射：原子核流场自振荡几何形态重排向背景真空释放的纯流场剪切应力波']
}];
function StreamlineCanvas({
  activeStage
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({
      length: 120
    }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      r: 30 + Math.random() * 120,
      theta: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      size: 1.5 + Math.random() * 2,
      hue: Math.random() * 40
    }));
    const render = () => {
      t += 0.02;
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // 背景网格与流场流动线
      ctx.strokeStyle = 'rgba(74, 115, 173, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 根据 stage 绘制不同特征的连续流场几何
      if (activeStage === 'fluid') {
        // 连续波动流场
        for (let i = 0; i < 9; i++) {
          ctx.beginPath();
          const offset = i * 28 - 110;
          ctx.strokeStyle = `rgba(100, 180, 255, ${0.12 + i % 3 * 0.08})`;
          ctx.lineWidth = 1.5;
          for (let px = 0; px < w; px += 8) {
            const py = cy + offset + Math.sin(px * 0.02 + t + i * 0.6) * 22 + Math.cos(px * 0.008 - t * 0.5) * 14;
            if (px === 0) ctx.moveTo(px, py);else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      } else if (activeStage === 'charge') {
        // 双涡旋偶极流场（正负环量）
        ;
        [-80, 80].forEach((ox, idx) => {
          const dir = idx === 0 ? 1 : -1;
          const color = idx === 0 ? '110, 200, 255' : '255, 140, 90';
          for (let r = 16; r < 90; r += 14) {
            ctx.beginPath();
            ctx.arc(cx + ox, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color}, ${0.15 + (1 - r / 90) * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          // 核心涡旋
          ctx.fillStyle = `rgb(${color})`;
          ctx.beginPath();
          ctx.arc(cx + ox, cy, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeStage === 'mass') {
        // 自禁闭环形流场与压力梯度
        const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
        grad.addColorStop(0, 'rgba(255, 215, 120, 0.45)');
        grad.addColorStop(0.4, 'rgba(95, 175, 255, 0.22)');
        grad.addColorStop(1, 'rgba(1, 2, 7, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 120, 0, Math.PI * 2);
        ctx.fill();
        for (let r = 24; r < 95; r += 12) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * 0.72, t * 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 230, 160, 0.4)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      } else if (activeStage === 'nucleus') {
        // 多核子复合纽结
        const centers = [[-28, -20], [28, -20], [0, 28]];
        centers.forEach(([ox, oy], i) => {
          const color = i % 2 === 0 ? '255, 130, 90' : '100, 200, 255';
          ctx.beginPath();
          ctx.arc(cx + ox, cy + oy, 24, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, 0.25)`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${color}, 0.8)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        // 纽结包络
        ctx.beginPath();
        ctx.arc(cx, cy, 65, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 215, 100, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (activeStage === 'radiation') {
        // 核心与发射出的球面辐射扩散波
        ctx.fillStyle = 'rgba(255, 120, 80, 0.9)';
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
        for (let k = 0; k < 6; k++) {
          const waveR = (t * 45 + k * 30) % 150 + 12;
          const alpha = Math.max(0, 1 - waveR / 160);
          ctx.beginPath();
          ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(130, 210, 255, ${alpha * 0.7})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 流动粒子示踪
      particles.forEach(p => {
        p.theta += p.speed;
        const px = cx + Math.cos(p.theta) * p.r;
        const py = cy + Math.sin(p.theta) * (p.r * 0.75);
        ctx.fillStyle = `rgba(170, 215, 255, 0.6)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeStage]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "field-theory-canvas"
  });
}
export default function NuclearFieldTheory() {
  const [activeStage, setActiveStage] = useState('fluid');
  const current = STAGES.find(s => s.id === activeStage) || STAGES[0];
  const IconComponent = current.icon;
  return /*#__PURE__*/React.createElement("section", {
    className: "nuclear-field-section",
    id: "nuclear-origin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-theory-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", null), "CONTINUOUS FLUID MECHANICS & NUCLEAR EMERGENCE"), /*#__PURE__*/React.createElement("h2", null, "\u63A2\u7D22\u539F\u5B50\u6838\u7684\u6765\u6E90\u4E0E\u8F90\u5C04\uFF1A", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "\u4ECE\u8FDE\u7EED\u6D41\u573A\u6784\u7B51\u7535\u8377\u3001\u8D28\u91CF\u5230\u539F\u5B50\u6838\u51DD\u805A")), /*#__PURE__*/React.createElement("p", null, "\u6211\u4EEC\u63CF\u8FF0\u4E86\u4E00\u79CD\u975E\u7EBF\u6027\u8FDE\u7EED\u6D41\u573A\uFF1A\u7A7A\u95F4\u901A\u8FC7\u5185\u8574\u62D3\u6251\u73AF\u91CF\u5F62\u6210\u7535\u8377\uFF0C\u901A\u8FC7\u81EA\u7981\u95ED\u9A7B\u6CE2\u80FD\u91CF\u6784\u7B51\u8D28\u91CF\uFF0C \u901A\u8FC7\u9AD8\u9636\u6DA1\u73AF\u7EBD\u7ED3\u4EA4\u7EC7\u51DD\u805A\u4E3A\u539F\u5B50\u6838\uFF0C\u5E76\u5728\u8DC3\u8FC1\u4E0E\u62D3\u6251\u65AD\u88C2\u4E2D\u91CA\u653E\u9AD8\u9891\u8F90\u5C04\u6CE2\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "field-stages-nav"
  }, STAGES.map(s => {
    const Icon = s.icon;
    const isActive = s.id === activeStage;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: `field-stage-tab ${isActive ? 'active' : ''}`,
      onClick: () => setActiveStage(s.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "stage-tab-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "stage-num"
    }, s.num), /*#__PURE__*/React.createElement("span", {
      className: "stage-badge"
    }, s.badge)), /*#__PURE__*/React.createElement("div", {
      className: "stage-tab-title"
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16
    }), /*#__PURE__*/React.createElement("b", null, s.title)), /*#__PURE__*/React.createElement("small", null, s.subtitle));
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-stage-showcase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-stage-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-content-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stage-index-tag"
  }, "STAGE / ", current.num), /*#__PURE__*/React.createElement("h3", null, current.title, /*#__PURE__*/React.createElement("small", null, current.subtitle))), /*#__PURE__*/React.createElement("p", {
    className: "mechanism-lead"
  }, current.summary), /*#__PURE__*/React.createElement("p", {
    className: "mechanism-body"
  }, current.mechanism), /*#__PURE__*/React.createElement("div", {
    className: "field-formula-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "formula-label"
  }, /*#__PURE__*/React.createElement(Cpu, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "\u63A7\u5236\u65B9\u7A0B / \u62D3\u6251\u6CDB\u51FD")), /*#__PURE__*/React.createElement("code", null, current.formula)), /*#__PURE__*/React.createElement("div", {
    className: "field-deductions"
  }, /*#__PURE__*/React.createElement("b", null, "\u6838\u5FC3\u7269\u7406\u63A8\u8BBA\u4E0E\u51E0\u4F55\u673A\u5236"), /*#__PURE__*/React.createElement("ul", null, current.points.map((pt, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, pt))))), /*#__PURE__*/React.createElement("div", {
    className: "field-actions"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/lab",
    className: "primary-link"
  }, "\u5728\u5B9E\u65F6\u5B9E\u9A8C\u5BA4\u9A8C\u8BC1\u6D41\u573A\u65B9\u7A0B ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: "field-stage-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "visual-hud-top"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Activity, {
    size: 13
  }), " STREAMLINE VISUALIZER"), /*#__PURE__*/React.createElement("em", null, current.badge)), /*#__PURE__*/React.createElement(StreamlineCanvas, {
    activeStage: activeStage
  }), /*#__PURE__*/React.createElement("div", {
    className: "visual-hud-bottom"
  }, /*#__PURE__*/React.createElement("small", null, "NONLINEAR TOPOLOGICAL FIELD FLUID SOLVER \xB7 REALTIME PREVIEW")))), /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-icon blue"
  }, /*#__PURE__*/React.createElement(Waves, {
    size: 20
  })), /*#__PURE__*/React.createElement("b", null, "01. \u8FDE\u7EED\u6D41\u573A"), /*#__PURE__*/React.createElement("p", null, "\u7A7A\u95F4\u5145\u6EE1\u5177\u6709\u53EF\u538B\u7F29\u6027\u4E0E\u5185\u8574\u5FAE\u538B\u5F3A\u7684\u8FDE\u7EED\u4ECB\u8D28\uFF0C\u5149\u901F\u5373\u4ECB\u8D28\u6781\u9650\u6270\u52A8\u6CE2\u901F\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-icon cyan"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 20
  })), /*#__PURE__*/React.createElement("b", null, "02. \u7535\u8377\u73AF\u91CF"), /*#__PURE__*/React.createElement("p", null, "\u6DA1\u65CB\u56DE\u8DEF\u73AF\u91CF $\\Gamma$ \u4E0E\u624B\u5F81\u6027\u884D\u751F\u51FA\u6B63\u8D1F\u7535\u8377\u4E0E\u5E93\u4ED1\u529B\u7684\u6D41\u4F53\u52A8\u529B\u5B66\u672C\u6784\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-icon amber"
  }, /*#__PURE__*/React.createElement(Boxes, {
    size: 20
  })), /*#__PURE__*/React.createElement("b", null, "03. \u8D28\u91CF\u7981\u95ED"), /*#__PURE__*/React.createElement("p", null, "\u5C40\u90E8\u95ED\u5408\u6DA1\u6D41\u7684\u9AD8\u5BC6\u5EA6\u52A8\u80FD\u4E0E\u9A7B\u6CE2\u81EA\u7981\u95ED\u4EA7\u751F\u5B8F\u89C2\u60EF\u6027\uFF0C\u7EDF\u4E00\u8D28\u80FD\u5173\u7CFB $E=mc^2$\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-icon orange"
  }, /*#__PURE__*/React.createElement(Atom, {
    size: 20
  })), /*#__PURE__*/React.createElement("b", null, "04. \u6838\u5B50\u7EBD\u7ED3"), /*#__PURE__*/React.createElement("p", null, "\u8D28\u5B50\u4E2D\u5B50\u4EE5 Hopf \u7EBD\u7ED3\u62D3\u6251\u7A33\u5B9A\u5B58\u5728\uFF0C\u6D41\u4F53\u4F2F\u52AA\u5229\u4F4E\u538B\u69FD\u6784\u6210\u6781\u5F3A\u77ED\u7A0B\u5438\u5F15\u529B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-summary-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-icon red"
  }, /*#__PURE__*/React.createElement(Radio, {
    size: 20
  })), /*#__PURE__*/React.createElement("b", null, "05. \u8F90\u5C04\u8017\u6563"), /*#__PURE__*/React.createElement("p", null, "\u4E0D\u7A33\u5B9A\u6838\u7ED3\u6784\u53D1\u751F\u62D3\u6251\u91CD\u8054\u65F6\uFF0C\u91CA\u653E\u5FAE\u578B\u5B64\u5B50\u6216\u5411\u80CC\u666F\u4ECB\u8D28\u8F90\u5C04\u526A\u5207\u5E94\u529B\u9AD8\u9891\u6CE2\u52A8\u3002")))));
}
