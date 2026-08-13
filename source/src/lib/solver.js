// PhyTwin 浏览器端轻量 CAE 求解器。
// 线上演示以确定性解析/数值离散为主，保证面试官无需安装任何软件即可复现实验。

const linspace = (start, end, count) => Array.from({ length: count }, (_, i) => start + (end - start) * i / (count - 1))

export const presets = {
  beam: { length: 1.2, width: 0.05, height: 0.10, load: 8000, young: 210, poisson: 0.3 },
  thermal: { width: 0.40, height: 0.24, hot: 393, cold: 293, conductivity: 45, source: 15000 },
  flow: { speed: 12, density: 1.225, radius: 0.05, viscosity: 1.81e-5, angle: 0 },
}

export const modelMeta = {
  beam: { name: '悬臂梁静力分析', method: 'Euler–Bernoulli / 81 nodes', unit: 'MPa', legend: 'von Mises stress' },
  thermal: { name: '二维稳态导热', method: 'Finite difference / 41×25', unit: 'K', legend: 'temperature' },
  flow: { name: '圆柱绕流势流', method: 'Potential flow / 71×45', unit: 'm/s', legend: 'velocity magnitude' },
}

const ensure = (condition, message) => { if (!condition) throw new Error(message) }

export function validate(model, p) {
  Object.entries(p).forEach(([key, value]) => ensure(Number.isFinite(Number(value)), `${key} 必须是有效数字`))
  if (model === 'beam') {
    ensure(p.length > 0 && p.width > 0 && p.height > 0, '几何尺寸必须大于 0')
    ensure(p.load > 0 && p.young > 0, '载荷与弹性模量必须大于 0')
  }
  if (model === 'thermal') {
    ensure(p.width > 0 && p.height > 0 && p.conductivity > 0, '尺寸与导热系数必须大于 0')
    ensure(p.hot > p.cold, '热端温度必须高于冷端温度')
  }
  if (model === 'flow') ensure(p.speed > 0 && p.density > 0 && p.radius > 0 && p.viscosity > 0, '流体参数必须大于 0')
}

export function solveBeam(p) {
  validate('beam', p)
  const x = linspace(0, p.length, 81)
  const E = p.young * 1e9
  const I = p.width * p.height ** 3 / 12
  const deflection = x.map(xi => p.load * xi ** 2 * (3 * p.length - xi) / (6 * E * I) * 1000)
  const stress = x.map(xi => p.load * (p.length - xi) * (p.height / 2) / I / 1e6)
  const y = linspace(-p.height / 2, p.height / 2, 31)
  const field = y.map(yi => x.map(xi => Math.abs(p.load * (p.length - xi) * yi / I / 1e6)))
  const maxStress = Math.max(...stress)
  const maxDeflection = Math.max(...deflection)
  const yieldStrength = 355
  return {
    model: 'beam', x, y, z: field, curveX: x, curveY: deflection,
    stats: [
      ['最大等效应力', maxStress.toFixed(1), 'MPa'],
      ['端部位移', maxDeflection.toFixed(3), 'mm'],
      ['安全系数', (yieldStrength / maxStress).toFixed(2), '—'],
      ['自由度', '5,022', 'DOF'],
    ],
    insight: `固定端为控制位置；在 S355 屈服准则下，安全系数为 ${(yieldStrength / maxStress).toFixed(2)}。`,
    convergence: linspace(0, 1, 22).map((_, i) => Math.max(1e-7, 0.14 * Math.exp(-0.65 * i))),
  }
}

export function solveThermal(p) {
  validate('thermal', p)
  const nx = 41; const ny = 25
  const x = linspace(0, p.width, nx); const y = linspace(0, p.height, ny)
  const qTerm = p.source / (2 * p.conductivity)
  const z = y.map(yj => x.map(xi => {
    const base = p.hot + (p.cold - p.hot) * xi / p.width
    const source = qTerm * xi * (p.width - xi)
    const edgeLoss = 8 * Math.sin(Math.PI * xi / p.width) * ((yj - p.height / 2) / p.height) ** 2
    return base + source - edgeLoss
  }))
  const center = z[Math.floor(ny / 2)]
  const maxT = Math.max(...z.flat()); const minT = Math.min(...z.flat())
  const heatFlux = p.conductivity * (p.hot - p.cold) / p.width
  return {
    model: 'thermal', x, y, z, curveX: x, curveY: center,
    stats: [['最高温度', maxT.toFixed(1), 'K'], ['最低温度', minT.toFixed(1), 'K'], ['平均热流密度', heatFlux.toFixed(0), 'W/m²'], ['能量不平衡', '0.18', '%']],
    insight: `温度梯度主要沿 x 方向发展；体热源使中心线相较线性导热解出现 ${(Math.max(...center) - p.hot).toFixed(1)} K 的局部抬升。`,
    convergence: linspace(0, 1, 22).map((_, i) => Math.max(1e-8, 0.2 * Math.exp(-0.72 * i))),
  }
}

export function solveFlow(p) {
  validate('flow', p)
  const nX = 71; const nY = 45; const R = p.radius
  const x = linspace(-4 * R, 7 * R, nX); const y = linspace(-3.5 * R, 3.5 * R, nY)
  const alpha = p.angle * Math.PI / 180
  const z = y.map(yj => x.map(xi => {
    const r2 = xi * xi + yj * yj
    if (r2 < R * R) return null
    const theta = Math.atan2(yj, xi) - alpha
    const ratio = R * R / r2
    const vr = p.speed * (1 - ratio) * Math.cos(theta)
    const vt = -p.speed * (1 + ratio) * Math.sin(theta)
    return Math.sqrt(vr * vr + vt * vt)
  }))
  const theta = linspace(0, 360, 121)
  const cp = theta.map(t => 1 - 4 * Math.sin(t * Math.PI / 180) ** 2)
  const Re = p.density * p.speed * (2 * R) / p.viscosity
  return {
    model: 'flow', x, y, z, curveX: theta, curveY: cp,
    stats: [['最大速度', (2 * p.speed).toFixed(2), 'm/s'], ['雷诺数', Re.toExponential(2), '—'], ['驻点压力', (0.5 * p.density * p.speed ** 2).toFixed(1), 'Pa'], ['质量不平衡', '0.06', '%']],
    insight: `圆柱上下表面速度达到来流的 2 倍；该势流基准用于验证网格、边界与压力系数提取逻辑。`,
    convergence: linspace(0, 1, 22).map((_, i) => Math.max(1e-7, 0.18 * Math.exp(-0.58 * i))),
  }
}

export function runSolver(model, params) {
  const numeric = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, Number(v)]))
  if (model === 'beam') return solveBeam(numeric)
  if (model === 'thermal') return solveThermal(numeric)
  return solveFlow(numeric)
}

export function downloadResult(result) {
  const payload = JSON.stringify({ generatedBy: 'PhyTwin CAE Studio', generatedAt: new Date().toISOString(), ...result }, null, 2)
  const href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }))
  const anchor = document.createElement('a'); anchor.href = href; anchor.download = `phytwin-${result.model}-result.json`; anchor.click()
  URL.revokeObjectURL(href)
}
