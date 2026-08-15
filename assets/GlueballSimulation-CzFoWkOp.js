
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
const MODES = [{
  id: 'scalar',
  name: '标量基态胶球 0⁺⁺',
  latin: 'Scalar Glueball · Ground State',
  mass: '≈ 1.5–1.7 GeV/c²',
  spin: 'Jᴾᶜ = 0⁺⁺',
  desc: '纯杨-米尔斯规范场在红外强耦合区自禁闭形成的基态闭合色通量环。两个非阿贝尔胶子色场通过自吸引形成球对称致密驻波。',
  color1: 0xff3b30,
  color2: 0x34c759,
  color3: 0x007aff,
  knotP: 2,
  knotQ: 3,
  scale: 1.1,
  tension: '1.02 GeV/fm'
}, {
  id: 'tensor',
  name: '张量激发态 2⁺⁺',
  latin: 'Tensor Glueball · Excited State',
  mass: '≈ 2.2–2.4 GeV/c²',
  spin: 'Jᴾᶜ = 2⁺⁺',
  desc: '具有轨道角动量的激发态胶球，色通量管呈椭圆四极形自振荡，是北京正负电子对撞机（BESIII）与 LHCb 重点搜寻的高阶奇特态。',
  color1: 0xff9500,
  color2: 0xaf52de,
  color3: 0x5856d6,
  knotP: 3,
  knotQ: 4,
  scale: 1.35,
  tension: '1.25 GeV/fm'
}, {
  id: 'pseudoscalar',
  name: '赝标量拓扑结 0⁻⁺',
  latin: 'Pseudoscalar · Oddball / Trefoil',
  mass: '≈ 2.5–2.6 GeV/c²',
  spin: 'Jᴾᶜ = 0⁻⁺',
  desc: '带有非平凡第二陈数（Chern Number）拓扑荷的色通量纽结，具有空间手征奇偶性反演特征，与轴子（Axion）反常耦合机制密切相关。',
  color1: 0xff2d55,
  color2: 0x5ac8fa,
  color3: 0xffcc00,
  knotP: 2,
  knotQ: 5,
  scale: 1.2,
  tension: '1.40 GeV/fm'
}, {
  id: 'qgp',
  name: '高温解禁闭等离子体 (QGP)',
  latin: 'Quark-Gluon Plasma Deconfinement',
  mass: '渐近自由连续谱',
  spin: 'Free Gluons',
  desc: '在极高能密度（T > 170 MeV）下，色通量管断裂融化，色荷进入渐近自由态，胶子在介质中形成自由弱耦合弱阻尼流体。',
  color1: 0xff3b30,
  color2: 0xff9500,
  color3: 0x00c7be,
  knotP: 1,
  knotQ: 1,
  scale: 1.9,
  tension: '0.08 GeV/fm'
}];
function GlueballCanvas({
  mode,
  alphaS,
  autoRotate,
  speed
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x01030a, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x01030a, 0.025);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0, 5.2);

    // 灯光
    scene.add(new THREE.AmbientLight(0x7695d6, 1.6));
    const pLight1 = new THREE.PointLight(0xff453a, 4, 10);
    pLight1.position.set(2, 3, 2);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x0a84ff, 4, 10);
    pLight2.position.set(-2, -3, 2);
    scene.add(pLight2);
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 核心发光自禁闭致密球
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x62a8ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 外层脉动能量晕
    const haloGeo = new THREE.SphereGeometry(0.95, 24, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xff6644,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    rootGroup.add(haloMesh);

    // 3 条缠绕的非阿贝尔 SU(3) 色通量管（红、绿、蓝主色荷）
    const tubeColors = [mode.color1, mode.color2, mode.color3];
    const tubeMeshes = [];
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    // 生成环面纽结曲线
    const p = mode.knotP;
    const q = mode.knotQ;
    const rBase = mode.id === 'qgp' ? 1.6 : 0.88 * mode.scale;
    for (let k = 0; k < 3; k++) {
      const phaseOffset = k * Math.PI * 2 / 3;
      const points = [];
      const segs = 180;
      for (let i = 0; i <= segs; i++) {
        const u = i / segs * Math.PI * 2 * p + phaseOffset;
        const rKnot = rBase * (0.8 + 0.3 * Math.cos(q * u / p));
        const x = rKnot * Math.cos(u);
        const y = rKnot * Math.sin(u);
        const z = rBase * 0.45 * Math.sin(q * u / p);
        points.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(curve, 140, mode.id === 'qgp' ? 0.025 : 0.065, 12, true);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: tubeColors[k],
        emissive: tubeColors[k],
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: mode.id === 'qgp' ? 0.5 : 0.88
      });
      const mesh = new THREE.Mesh(tubeGeo, tubeMat);
      mesh.userData = {
        curve,
        phaseOffset
      };
      rootGroup.add(mesh);
      tubeMeshes.push(mesh);
    }

    // 周围色荷胶子粒子云
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const rad = 0.4 + Math.pow(Math.random(), 1.5) * (mode.id === 'qgp' ? 2.2 : 1.4);
      particlePos[i * 3] = Math.cos(u) * rad;
      particlePos[i * 3 + 1] = Math.sin(u) * rad * (0.6 + Math.random() * 0.4);
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      const col = new THREE.Color(tubeColors[i % 3]);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // 响应式大小
    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // 交互拖拽
    let isDown = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0.3;
    let rotY = 0.2;
    const onPointerDown = e => {
      isDown = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = e => {
      if (!isDown) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => {
      isDown = false;
    };
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    let animId;
    let t = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      const dt = 0.016 * speed;
      t += dt;
      if (autoRotate && !isDown) {
        rotY += 0.006 * speed;
        rotX = 0.25 + Math.sin(t * 0.5) * 0.15;
      }
      rootGroup.rotation.x = rotX;
      rootGroup.rotation.y = rotY;

      // 核心脉动（呼吸模式）
      const pulse = 1 + Math.sin(t * 3.5 * alphaS) * (0.08 * alphaS);
      coreMesh.scale.setScalar(pulse * (mode.id === 'qgp' ? 0.4 : 1));
      haloMesh.scale.setScalar((1 + Math.cos(t * 2.2) * 0.12) * (mode.id === 'qgp' ? 1.5 : 1));

      // 通量管自旋波动
      tubeMeshes.forEach((mesh, idx) => {
        mesh.rotation.z = t * (0.4 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1);
      });

      // 粒子自旋
      particleSystem.rotation.z = -t * 0.35;
      renderer.render(scene, camera);
    };
    render();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [mode, alphaS, autoRotate, speed]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "glueball-3d-canvas"
  });
}
export default function GlueballSimulation() {
  const [activeModeId, setActiveModeId] = useState('scalar');
  const [alphaS, setAlphaS] = useState(1.18); // 强相互作用耦合常数
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [showFormula, setShowFormula] = useState(true);
  const activeMode = MODES.find(m => m.id === activeModeId) || MODES[0];
  return /*#__PURE__*/React.createElement("section", {
    className: "glueball-section",
    id: "glueball-origin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glueball-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", null), "QUANTUM CHROMODYNAMICS & NON-ABELIAN VORTEX CONFINEMENT"), /*#__PURE__*/React.createElement("h2", null, "\u5F3A\u76F8\u4E92\u4F5C\u7528\u4E0E\u80F6\u7403\uFF08Glueball\uFF09\u81EA\u675F\u7F1A\uFF1A", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "\u65E0\u5938\u514B\u53C2\u4E0E\u7684\u7EAF\u89C4\u8303\u573A\u975E\u7EBF\u6027\u8D28\u91CF\u51DD\u805A")), /*#__PURE__*/React.createElement("p", null, "\u5728\u91CF\u5B50\u8272\u52A8\u529B\u5B66\uFF08QCD\uFF09\u4E0E\u62D3\u6251\u6D41\u573A\u7406\u8BBA\u4E2D\uFF0C\u80F6\u5B50\u4E0D\u4EC5\u4F20\u9012\u5F3A\u76F8\u4E92\u4F5C\u7528\uFF0C\u81EA\u8EAB\u66F4\u643A\u5E26\u975E\u963F\u8D1D\u5C14 $SU(3)$ \u8272\u8377\u3002 \u5728\u4F4E\u80FD\u7EA2\u5916\u533A\uFF0C\u8272\u901A\u91CF\u7BA1\u81EA\u76F8\u4E92\u5438\u5F15\u3001\u7F20\u7ED5\u5E76\u95ED\u5408\u4E3A\u81EA\u7981\u95ED\u5B64\u5B50\u7EBD\u7ED3\u2014\u2014\u8FD9\u5C31\u662F\u7269\u7406\u5B66\u4E2D\u5B8C\u5168\u7531\u7EAF\u8272\u573A\u81EA\u675F\u7F1A\u6784\u6210\u7684\u795E\u79D8\u7C92\u5B50\uFF1A", /*#__PURE__*/React.createElement("strong", null, "\u80F6\u7403\uFF08Glueball\uFF09"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "glueball-workbench"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glueball-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "\u80F6\u5B50\u573A\u62D3\u6251\u6001\u4E0E\u80FD\u7EA7\u9009\u62E9")), /*#__PURE__*/React.createElement("div", {
    className: "mode-selector-list"
  }, MODES.map(m => {
    const isActive = m.id === activeModeId;
    return /*#__PURE__*/React.createElement("button", {
      key: m.id,
      className: `mode-card-btn ${isActive ? 'active' : ''}`,
      onClick: () => setActiveModeId(m.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "mode-card-head"
    }, /*#__PURE__*/React.createElement("b", null, m.name), /*#__PURE__*/React.createElement("span", {
      className: "mass-tag"
    }, m.mass)), /*#__PURE__*/React.createElement("small", null, m.latin, " \xB7 ", m.spin), /*#__PURE__*/React.createElement("p", null, m.desc), /*#__PURE__*/React.createElement("div", {
      className: "mode-metric-row"
    }, /*#__PURE__*/React.createElement("span", null, "\u5F26\u5F20\u529B: ", /*#__PURE__*/React.createElement("strong", null, m.tension)), /*#__PURE__*/React.createElement("span", {
      className: "color-dots"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        background: `#${m.color1.toString(16).padStart(6, '0')}`
      }
    }), /*#__PURE__*/React.createElement("i", {
      style: {
        background: `#${m.color2.toString(16).padStart(6, '0')}`
      }
    }), /*#__PURE__*/React.createElement("i", {
      style: {
        background: `#${m.color3.toString(16).padStart(6, '0')}`
      }
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "glueball-sliders"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u5F3A\u8026\u5408\u5E38\u6570 $\\alpha_s(Q^2)$"), /*#__PURE__*/React.createElement("b", null, alphaS.toFixed(2))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.3",
    max: "2.0",
    step: "0.05",
    value: alphaS,
    onChange: e => setAlphaS(parseFloat(e.target.value))
  }), /*#__PURE__*/React.createElement("div", {
    className: "slider-hints"
  }, /*#__PURE__*/React.createElement("small", null, "\u6E10\u8FD1\u81EA\u7531 (\u9AD8\u80FD)"), /*#__PURE__*/React.createElement("small", null, "\u7EA2\u5916\u8272\u7981\u95ED (\u4F4E\u80FD)"))), /*#__PURE__*/React.createElement("div", {
    className: "slider-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u62D3\u6251\u6DA1\u52A8\u4E0E\u81EA\u65CB\u6D41\u901F"), /*#__PURE__*/React.createElement("b", null, speed.toFixed(1), "x")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.2",
    max: "2.5",
    step: "0.1",
    value: speed,
    onChange: e => setSpeed(parseFloat(e.target.value))
  })), /*#__PURE__*/React.createElement("div", {
    className: "button-actions-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-action-btn",
    onClick: () => setAutoRotate(!autoRotate)
  }, /*#__PURE__*/React.createElement(Rotate3D, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, autoRotate ? '暂停自转' : '开启自转')), /*#__PURE__*/React.createElement("button", {
    className: "icon-action-btn",
    onClick: () => {
      setAlphaS(1.18);
      setSpeed(1.0);
      setActiveModeId('scalar');
    }
  }, /*#__PURE__*/React.createElement(RefreshCw, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "\u91CD\u7F6E\u57FA\u51C6\u6001"))))), /*#__PURE__*/React.createElement("div", {
    className: "glueball-viewport-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viewport-hud-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "live-pill"
  }, /*#__PURE__*/React.createElement("span", null), "QCD FLUX TUBE SIMULATOR"), /*#__PURE__*/React.createElement("b", null, activeMode.name)), /*#__PURE__*/React.createElement("div", {
    className: "hud-metrics"
  }, /*#__PURE__*/React.createElement("span", null, "\u81EA\u65CB\u5B87\u79F0: ", /*#__PURE__*/React.createElement("strong", null, activeMode.spin)), /*#__PURE__*/React.createElement("span", null, "\u9884\u6D4B\u8D28\u80FD: ", /*#__PURE__*/React.createElement("strong", null, activeMode.mass)))), /*#__PURE__*/React.createElement(GlueballCanvas, {
    mode: activeMode,
    alphaS: alphaS,
    autoRotate: autoRotate,
    speed: speed
  }), /*#__PURE__*/React.createElement("div", {
    className: "viewport-hud-footer"
  }, /*#__PURE__*/React.createElement("small", null, "\u62D6\u52A8\u9F20\u6807\u503E\u659C\u65CB\u8F6C \xB7 \u89C2\u5BDF\u975E\u963F\u8D1D\u5C14\u8272\u901A\u91CF\u7BA1\u7684\u4E09\u7EF4\u7A7A\u95F4\u62D3\u6251\u95ED\u5408\u4E0E\u81EA\u5438\u5F15\u6536\u7F29")))), /*#__PURE__*/React.createElement("div", {
    className: "glueball-theory-deck"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Cpu, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "1. \u975E\u963F\u8D1D\u5C14\u89C4\u8303\u573A\u81EA\u76F8\u4E92\u4F5C\u7528")), /*#__PURE__*/React.createElement("code", null, "G_{μν}^a = ∂_μ A_ν^a - ∂_ν A_μ^a + g f^{abc} A_μ^b A_ν^c"), /*#__PURE__*/React.createElement("p", null, "\u4E0D\u540C\u4E8E\u5149\u5B50\uFF08\u4E0D\u5E26\u7535\u8377\u3001\u573A\u65B9\u7A0B\u7EBF\u6027\uFF09\uFF0CQCD \u80F6\u5B50\u573A\u81EA\u8EAB\u643A\u5E26\u8272\u8377\uFF08SU(3) \u751F\u6210\u5143\uFF09\uFF0C\u4E09\u80F6\u5B50\u4E0E\u56DB\u80F6\u5B50\u81EA\u8026\u5408\u9879\u4EA7\u751F\u6781\u5F3A\u7684\u975E\u7EBF\u6027\u805A\u96C6\u6548\u5E94\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "2. \u8272\u901A\u91CF\u7BA1\u6536\u7F29\u4E0E\u7EBF\u6027\u7981\u95ED\u52BF")), /*#__PURE__*/React.createElement("code", null, "V_{QCD}(r) = -(4/3)(α_s / r) + σ r  (σ ≈ 1 GeV/fm)"), /*#__PURE__*/React.createElement("p", null, "\u5F53\u4E24\u4E2A\u8272\u6E90\u88AB\u62C9\u5F00\u65F6\uFF0C\u771F\u7A7A\u8D85\u5BFC\u6548\u5E94\u4F7F\u8272\u7535\u573A\u7EBF\u88AB\u538B\u7F29\u6210\u4E00\u7EF4\u81F4\u5BC6\u201C\u901A\u91CF\u7BA1\u201D\uFF08Flux Tube\uFF09\uFF0C\u80FD\u91CF\u968F\u8DDD\u79BB\u7EBF\u6027\u589E\u52A0\uFF0C\u4FC3\u4F7F\u95ED\u5408\u5F62\u6210\u5B64\u5B50\u7EBD\u7ED3\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "theory-deck-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "deck-head"
  }, /*#__PURE__*/React.createElement(Atom, {
    size: 16
  }), /*#__PURE__*/React.createElement("b", null, "3. \u8D28\u91CF\u51DD\u805A\uFF08\u65E0\u5938\u514B\u7684\u7EAF\u573A\u8D28\u91CF\uFF09")), /*#__PURE__*/React.createElement("code", null, "M_{glueball} = ⟨0 | Θ_μ^μ | 0⟩_{anomaly} = [β(g)/(2g)] ⟨G^2⟩ ≈ 1.7 GeV/c²"), /*#__PURE__*/React.createElement("p", null, "\u80F6\u7403\u6CA1\u6709\u4EFB\u4F55\u6784\u6210\u5938\u514B\uFF08\u5373\u6CA1\u6709\u5938\u514B\u9759\u6B62\u8D28\u91CF\uFF09\uFF0C\u5176\u5168\u90E8 1.7 GeV/c\xB2 \u8D28\u91CF\u5747\u6E90\u81EA\u975E\u963F\u8D1D\u5C14\u8272\u573A\u7684\u52A8\u529B\u5B66\u81EA\u7981\u95ED\u52A8\u80FD\u4E0E\u91CF\u5B50\u5FAE\u5546\u53CD\u5E38\u3002")))));
}
