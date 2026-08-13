export const capabilities = [
  { id: '01', key: 'STRUCTURAL', title: '结构力学', subtitle: '静力 / 屈曲 / 接触 / 疲劳', metric: '≤ 2.8%', label: '基准误差', color: 'cobalt', description: '从载荷路径、网格收敛到失效判据，建立可审查、可复现的有限元分析闭环。' },
  { id: '02', key: 'CFD', title: '流体仿真', subtitle: '内流 / 外流 / 湍流 / 多相流', metric: '10⁻⁵', label: '残差阈值', color: 'cyan', description: '覆盖守恒方程离散、边界层处理、收敛监控与压降/流量工程指标提取。' },
  { id: '03', key: 'THERMAL', title: '热仿真', subtitle: '稳态 / 瞬态 / 共轭传热', metric: '0.2 K', label: '能量平衡误差', color: 'ember', description: '支持导热、对流、热源与温度相关材料属性，输出温度场和热流密度。' },
  { id: '04', key: 'MULTIPHYSICS', title: '多物理耦合', subtitle: '热-固 / 流-固 / 电-热', metric: '2-way', label: '双向耦合', color: 'moss', description: '设计变量、场量映射与耦合收敛统一管理，用系统级指标解释局部场响应。' },
  { id: '05', key: 'FEM', title: '有限元分析', subtitle: '单元 / 网格 / 非线性', metric: 'p95', label: '质量审查', color: 'cobalt', description: '自研轻量求解器与商业软件互证，记录单元选择、奇异性与网格无关性。' },
  { id: '06', key: 'OPTIMIZATION', title: '参数化优化', subtitle: 'DOE / 灵敏度 / 鲁棒优化', metric: '−18%', label: '典型减重', color: 'cyan', description: '以响应面和多目标权衡连接仿真与设计决策，避免只展示“好看的云图”。' },
]

export const cases = [
  { type: '结构可靠性', title: '薄壁支架屈曲与轻量化', tag: 'NONLINEAR FEA', result: '质量 −18.4%', detail: '几何非线性、初始缺陷与材料塑性联合建模；DOE 约束一阶屈曲因子与峰值等效应力。', palette: 'stress' },
  { type: '共轭传热', title: '功率模块散热路径优化', tag: 'CHT', result: '结温 −12.7 K', detail: '固体导热与通道对流耦合；通过能量闭合检查和网格无关性评估保证可信度。', palette: 'thermal' },
  { type: '外流空气动力学', title: '钝体绕流与尾迹控制', tag: 'RANS · k-ω SST', result: 'Cd −9.6%', detail: 'y+ 受控的近壁网格、残差/力系数双收敛监控，分析分离点与尾迹动量亏损。', palette: 'flow' },
]

export const validations = [
  ['Euler–Bernoulli 梁挠度', '解析解 / 自研离散', '1.6%'],
  ['二维稳态导热', '能量守恒 / 网格加密', '0.2 K'],
  ['圆柱势流表面压力', '理论 Cp 分布', '2.3%'],
]
