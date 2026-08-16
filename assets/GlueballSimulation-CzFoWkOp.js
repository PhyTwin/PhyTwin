
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

// 强相互作用与胶球演化 4 大阶段示意数据
const EVOLUTION_STAGES = [{
  step: '01',
  id: 'asymptotic',
  title: '高能渐近自由',
  subtitle: 'Asymptotic Freedom (Q² ≫ Λ²_QCD)',
  energy: 'T > 200 MeV · r < 0.1 fm',
  state: '非束缚自由胶子气',
  equation: 'α_s(Q^2) = \\frac{12\\pi}{(33 - 2n_f) \\ln(Q^2/\\Lambda^2)} \\to 0',
  desc: '在高能短距离尺度下，QCD 负 β 函数使强耦合常数趋近于零。胶子携带 8 种 SU(3) 色荷自由运动，色电场向外平滑发散，尚无法形成稳定聚集态。',
  visualType: 'free-gluons',
  color: '#3a86ff',
  metrics: [['耦合常数 α_s', '< 0.18 (极弱)'], ['相互作用势', '库仑型 -α_s / r'], ['微观状态', '夸克-胶子等离子体 (QGP)']]
}, {
  step: '02',
  id: 'fluxtube',
  title: '色通量管收缩',
  subtitle: 'Color Flux Tube Formation',
  energy: 'r ≈ 0.3–0.8 fm',
  state: '一维致密色电弦',
  equation: 'V_{QCD}(r) = -\\frac{4}{3}\\frac{\\alpha_s}{r} + \\sigma r \\quad (\\sigma \\approx 1.0\\text{ GeV/fm})',
  desc: '随着距离增大，真空非阿贝尔反屏蔽效应占据主导。QCD 真空对色电场的排斥产生双重超导效应，将发散的色电力线强行压缩成截面仅 0.2 fm² 的准一维致密“色通量管”。',
  visualType: 'flux-tube',
  color: '#06d6a0',
  metrics: [['通量弦张力 σ', '≈ 1.02 GeV/fm (16 吨力)'], ['禁闭机制', '对偶 Meissner 效应'], ['能量密度', '线性随距离增加 (σ·r)']]
}, {
  step: '03',
  id: 'knotting',
  title: '非线性拓扑纽结',
  subtitle: 'Topological Knotting & Self-Attraction',
  energy: 'r ≈ 1.0 fm',
  state: 'SU(3) 闭合环面纽结孤子',
  equation: 'G_{\\mu\\nu}^a = \\partial_\\mu A_\\nu^a - \\partial_\\nu A_\\mu^a + g f^{abc} A_\\mu^b A_\\nu^c',
  desc: '不同于无带电的光子，胶子自身携带非阿贝尔色荷，具有三胶子与四胶子自相互作用项。色通量管受到自身强大自引力与拓扑扭曲驱动，首尾自闭合并缠绕为稳定的三维孤子纽结。',
  visualType: 'knot-torus',
  color: '#ffd166',
  metrics: [['纽结拓扑荷 Q', '第二陈数 c₂ = 1'], ['自相互作用项', 'g f^{abc} A_μ^b A_ν^c (非线性)'], ['几何构型', '环面纽结 (Torus Knot)']]
}, {
  step: '04',
  id: 'glueball',
  title: '纯场质量凝聚（胶球）',
  subtitle: 'Glueball Mass Condensation',
  energy: '基态静止质能 M ≈ 1.5–1.7 GeV/c²',
  state: '标量基态粒子 0⁺⁺',
  equation: 'M_{glueball} = \\langle 0 | \\Theta_\\mu^\\mu | 0 \\rangle = \\frac{\\beta(g)}{2g} \\langle G_{\\mu\\nu}^a G^{a\\mu\\nu} \\rangle',
  desc: '通过量子微商反常（Trace Anomaly），完全没有夸克参与的纯色场自束缚体系在真空中凝聚出宏观静止质量，形成标准模型预测的纯胶子粒子——标量胶球（0⁺⁺）与张量胶球（2⁺⁺）。',
  visualType: 'condensed-ball',
  color: '#ef476f',
  metrics: [['基态质量 (0⁺⁺)', '≈ 1.71 GeV/c² (Lattice QCD)'], ['自旋与宇称 Jᴾᶜ', '0⁺⁺ (标量) / 2⁺⁺ (张量)'], ['实验寻找依托', 'BESIII (北京) / LHCb (CERN)']]
}];

// 静态矢量示意演化图渲染器（纯 SVG / CSS，绝对零闪烁、零 GPU 资源占用）
function StaticEvolutionGraphic({
  activeStage
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "glueball-static-diagram-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 760 380",
    className: "glueball-svg-canvas",
    "aria-label": "\u5F3A\u76F8\u4E92\u4F5C\u7528\u80F6\u7403\u6F14\u53D8\u5386\u7A0B\u793A\u610F\u56FE"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "bgGlow",
    cx: "50%",
    cy: "50%",
    r: "60%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#132b45",
    stopOpacity: "0.8"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#040b14",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "fluxGrad",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ff3b30"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#34c759"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#007aff"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "glowFilter",
    x: "-30%",
    y: "-30%",
    width: "160%",
    height: "160%"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "5",
    result: "blur"
  }), /*#__PURE__*/React.createElement("feComposite", {
    in: "SourceGraphic",
    in2: "blur",
    operator: "over"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "760",
    height: "380",
    fill: "url(#bgGlow)"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#1b334a",
    strokeWidth: "0.75",
    strokeDasharray: "3 3",
    opacity: "0.4"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "95",
    x2: "720",
    y2: "95"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "190",
    x2: "720",
    y2: "190"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "285",
    x2: "720",
    y2: "285"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "190",
    y1: "30",
    x2: "190",
    y2: "350"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "380",
    y1: "30",
    x2: "380",
    y2: "350"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "570",
    y1: "30",
    x2: "570",
    y2: "350"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(100, 190)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "65",
    fill: "#0c1d30",
    stroke: "#254a6e",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-76",
    textAnchor: "middle",
    fill: "#62d9ff",
    fontSize: "11",
    fontWeight: "600",
    fontFamily: "IBM Plex Mono"
  }, "STAGE 01"), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "82",
    textAnchor: "middle",
    fill: "#8baac7",
    fontSize: "11",
    fontWeight: "500"
  }, "\u9AD8\u80FD\u6E10\u8FD1\u81EA\u7531"), /*#__PURE__*/React.createElement("circle", {
    cx: "-25",
    cy: "-20",
    r: "6",
    fill: "#ff4d4f"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "30",
    cy: "-15",
    r: "6",
    fill: "#52c41a"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "-10",
    cy: "28",
    r: "6",
    fill: "#1890ff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "22",
    r: "5",
    fill: "#faad14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-25,-20 L-45,-40",
    stroke: "#ff4d4f",
    strokeWidth: "1.5",
    strokeDasharray: "2 2",
    markerEnd: "url(#arrow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30,-15 L50,-30",
    stroke: "#52c41a",
    strokeWidth: "1.5",
    strokeDasharray: "2 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-10,28 L-25,48",
    stroke: "#1890ff",
    strokeWidth: "1.5",
    strokeDasharray: "2 2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,22 L42,38",
    stroke: "#faad14",
    strokeWidth: "1.5",
    strokeDasharray: "2 2"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M175,190 L215,190",
    stroke: "#3d6285",
    strokeWidth: "2",
    strokeDasharray: "4 2"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(285, 190)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "65",
    fill: "#0c1d30",
    stroke: "#254a6e",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-76",
    textAnchor: "middle",
    fill: "#06d6a0",
    fontSize: "11",
    fontWeight: "600",
    fontFamily: "IBM Plex Mono"
  }, "STAGE 02"), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "82",
    textAnchor: "middle",
    fill: "#8baac7",
    fontSize: "11",
    fontWeight: "500"
  }, "\u8272\u901A\u91CF\u7BA1\u51DD\u805A"), /*#__PURE__*/React.createElement("path", {
    d: "M-45,0 C-20,-18 20,-18 45,0 C20,18 -20,18 -45,0 Z",
    fill: "none",
    stroke: "#06d6a0",
    strokeWidth: "3.5",
    filter: "url(#glowFilter)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-45,0 L45,0",
    stroke: "#ff5e7e",
    strokeWidth: "2",
    strokeDasharray: "3 2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "-45",
    cy: "0",
    r: "7",
    fill: "#ff4d4f"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45",
    cy: "0",
    r: "7",
    fill: "#1890ff"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "4",
    textAnchor: "middle",
    fill: "#ffffff",
    fontSize: "9",
    fontWeight: "700"
  }, "\u03C3\u22481GeV/fm")), /*#__PURE__*/React.createElement("path", {
    d: "M360,190 L400,190",
    stroke: "#3d6285",
    strokeWidth: "2",
    strokeDasharray: "4 2"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(470, 190)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "65",
    fill: "#0c1d30",
    stroke: "#254a6e",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-76",
    textAnchor: "middle",
    fill: "#ffd166",
    fontSize: "11",
    fontWeight: "600",
    fontFamily: "IBM Plex Mono"
  }, "STAGE 03"), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "82",
    textAnchor: "middle",
    fill: "#8baac7",
    fontSize: "11",
    fontWeight: "500"
  }, "\u62D3\u6251\u5B64\u5B50\u7EBD\u7ED3"), /*#__PURE__*/React.createElement("path", {
    d: "M-28,-22 C-5,-42 35,-35 28,-10 C20,18 -35,5 -30,25 C-25,42 18,38 32,15 C42,-12 10,-30 -10,-28",
    fill: "none",
    stroke: "#ffd166",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    filter: "url(#glowFilter)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "14",
    fill: "#3a86ff",
    opacity: "0.3"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M545,190 L585,190",
    stroke: "#3d6285",
    strokeWidth: "2",
    strokeDasharray: "4 2"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(655, 190)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "68",
    fill: "#150818",
    stroke: "#ef476f",
    strokeWidth: "2.5",
    filter: "url(#glowFilter)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "-76",
    textAnchor: "middle",
    fill: "#ef476f",
    fontSize: "11",
    fontWeight: "700",
    fontFamily: "IBM Plex Mono"
  }, "STAGE 04 (FINAL)"), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "82",
    textAnchor: "middle",
    fill: "#ff758f",
    fontSize: "11",
    fontWeight: "600"
  }, "\u6807\u91CF\u57FA\u6001\u80F6\u7403 0\u207A\u207A"), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "32",
    fill: "#ef476f",
    fillOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "22",
    fill: "#ff5e7e",
    fillOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "12",
    fill: "#ffffff",
    filter: "url(#glowFilter)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "0",
    cy: "0",
    rx: "44",
    ry: "18",
    fill: "none",
    stroke: "#ff3b30",
    strokeWidth: "2.5",
    transform: "rotate(-30)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "0",
    cy: "0",
    rx: "44",
    ry: "18",
    fill: "none",
    stroke: "#34c759",
    strokeWidth: "2.5",
    transform: "rotate(30)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "0",
    cy: "0",
    rx: "44",
    ry: "18",
    fill: "none",
    stroke: "#007aff",
    strokeWidth: "2.5",
    transform: "rotate(90)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "3",
    textAnchor: "middle",
    fill: "#040b14",
    fontSize: "8",
    fontWeight: "800"
  }, "1.7 GeV"))));
}
export default function GlueballSimulation() {
  const [selectedStageIdx, setSelectedStageIdx] = useState(3); // 默认选中胶球生成最终态

  const activeStage = EVOLUTION_STAGES[selectedStageIdx];
  return /*#__PURE__*/React.createElement("section", {
    className: "glueball-section",
    id: "glueball-origin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glueball-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", null), "QUANTUM CHROMODYNAMICS & NON-ABELIAN FIELD SELF-BINDING"), /*#__PURE__*/React.createElement("h2", null, "\u5F3A\u76F8\u4E92\u4F5C\u7528\u4E0E\u80F6\u7403\uFF08Glueball\uFF09\u81EA\u675F\u7F1A\u6F14\u53D8\u793A\u610F", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "\u65E0\u5938\u514B\u53C2\u4E0E\u7684\u7EAF\u975E\u963F\u8D1D\u5C14\u89C4\u8303\u573A\u975E\u7EBF\u6027\u8D28\u91CF\u51DD\u805A")), /*#__PURE__*/React.createElement("p", null, "\u91CF\u5B50\u8272\u52A8\u529B\u5B66\uFF08QCD\uFF09\u4E2D\uFF0C\u80F6\u5B50\u4E0D\u4EC5\u4F20\u9012\u5F3A\u76F8\u4E92\u4F5C\u7528\uFF0C\u5176\u81EA\u8EAB\u643A\u5E26\u975E\u963F\u8D1D\u5C14 $SU(3)$ \u8272\u8377\u3002 \u5728\u7EA2\u5916\u5F3A\u8026\u5408\u533A\uFF0C\u8272\u901A\u91CF\u7EBF\u53D7\u771F\u7A7A\u5BF9\u5076 Meissner \u6548\u5E94\u538B\u7F29\u4E3A\u81F4\u5BC6\u901A\u91CF\u5F26\uFF0C\u5E76\u901A\u8FC7\u975E\u7EBF\u6027\u81EA\u5438\u5F15\u7F20\u7ED5\u4E3A\u81EA\u7981\u95ED\u5B64\u5B50\u7EBD\u7ED3\u2014\u2014\u5F62\u6210\u4E86\u5B8C\u5168\u7531\u7EAF\u8272\u573A\u51DD\u805A\u6784\u6210\u7684\u795E\u79D8\u7C92\u5B50\uFF1A", /*#__PURE__*/React.createElement("strong", null, "\u80F6\u7403\uFF08Glueball\uFF09"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "glueball-static-overview-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview-title-tag"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "\u5F3A\u76F8\u4E92\u4F5C\u7528\u8272\u901A\u91CF\u6F14\u5316\u4E0E\u80F6\u7403\u751F\u6210 4 \u9636\u6BB5\u89E3\u6790")), /*#__PURE__*/React.createElement("span", {
    className: "static-tag"
  }, "\u9759\u6001\u793A\u610F \xB7 \u7269\u7406\u4E00\u81F4")), /*#__PURE__*/React.createElement(StaticEvolutionGraphic, {
    activeStage: activeStage
  })), /*#__PURE__*/React.createElement("div", {
    className: "evolution-stage-cards-grid"
  }, EVOLUTION_STAGES.map((st, idx) => {
    const isSelected = idx === selectedStageIdx;
    return /*#__PURE__*/React.createElement("div", {
      key: st.id,
      className: `stage-card ${isSelected ? 'active' : ''}`,
      onClick: () => setSelectedStageIdx(idx),
      role: "button",
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("div", {
      className: "stage-card-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "step-num"
    }, st.step), /*#__PURE__*/React.createElement("span", {
      className: "stage-state-tag",
      style: {
        color: st.color
      }
    }, st.state)), /*#__PURE__*/React.createElement("h3", null, st.title), /*#__PURE__*/React.createElement("small", {
      className: "stage-subtitle"
    }, st.subtitle), /*#__PURE__*/React.createElement("p", {
      className: "stage-desc"
    }, st.desc), /*#__PURE__*/React.createElement("div", {
      className: "stage-equation-box"
    }, /*#__PURE__*/React.createElement("code", null, st.equation)), /*#__PURE__*/React.createElement("div", {
      className: "stage-metrics-list"
    }, st.metrics.map(([label, val]) => /*#__PURE__*/React.createElement("div", {
      className: "metric-row",
      key: label
    }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("strong", null, val)))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "glueball-theory-deck"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Cpu, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "1. \u975E\u963F\u8D1D\u5C14\u6768-\u7C73\u5C14\u65AF\u81EA\u76F8\u4E92\u4F5C\u7528")), /*#__PURE__*/React.createElement("code", null, "G_{μν}^a = ∂_μ A_ν^a - ∂_ν A_μ^a + g f^{abc} A_μ^b A_ν^c"), /*#__PURE__*/React.createElement("p", null, "\u5149\u5B50\u4E0D\u5E26\u7535\u4E14\u573A\u65B9\u7A0B\u7EBF\u6027\uFF1B\u800C QCD \u80F6\u5B50\u81EA\u8EAB\u5E26\u8272\u8377\uFF0C\u4E09\u80F6\u5B50\u4E0E\u56DB\u80F6\u5B50\u975E\u7EBF\u6027\u8026\u5408\u4EA7\u751F\u6781\u5F3A\u7684\u81EA\u5438\u5F15\u805A\u96C6\u529B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "2. \u8272\u901A\u91CF\u7BA1\u4E0E\u7EBF\u6027\u7981\u95ED\u5F26")), /*#__PURE__*/React.createElement("code", null, "V_{QCD}(r) = -(4/3)(α_s / r) + σ r  (σ ≈ 1.02 GeV/fm)"), /*#__PURE__*/React.createElement("p", null, "\u771F\u7A7A\u8D85\u5BFC\u6548\u5E94\u6392\u65A5\u8272\u7535\u573A\uFF0C\u8FEB\u4F7F\u7535\u529B\u7EBF\u538B\u7F29\u4E3A\u6A2A\u622A\u9762\u7EA6 0.2 fm\xB2 \u7684\u81F4\u5BC6\u901A\u91CF\u7BA1\uFF0C\u5F20\u529B\u9AD8\u8FBE 16 \u5428\u529B\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Atom, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "3. \u7EAF\u89C4\u8303\u573A\u80FD\u91CF\u8D28\u91CF\u51DD\u805A")), /*#__PURE__*/React.createElement("code", null, "M_{glueball} = ⟨0 | Θ_μ^μ | 0⟩ = [β(g)/(2g)] ⟨G^2⟩ ≈ 1.7 GeV/c²"), /*#__PURE__*/React.createElement("p", null, "\u80F6\u7403\u4E0D\u542B\u4EFB\u4F55\u5938\u514B\u9759\u6B62\u8D28\u91CF\uFF0C\u5168\u90E8 1.7 GeV/c\xB2 \u8D28\u80FD\u5747\u6E90\u81EA\u7EAF\u80F6\u5B50\u573A\u52A8\u80FD\u4E0E\u91CF\u5B50\u5FAE\u5546\u53CD\u5E38\uFF08Trace Anomaly\uFF09\u3002")))));
}
