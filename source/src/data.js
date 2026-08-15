export const capabilities = [
  { id: '01', key: 'PLASMA', title: '等离子体计算', subtitle: '放电 / 鞘层 / 输运 / MHD', metric: '10⁻⁶', label: '归一化残差', color: 'cobalt', description: '耦合带电粒子输运、电势与反应源项，追踪电子温度、密度和电离区演化。' },
  { id: '02', key: 'ELECTROMAGNETICS', title: '电磁场计算', subtitle: '静电 / 磁场 / 高频 / 电磁热', metric: '2-way', label: '电磁-热耦合', color: 'cyan', description: '求解 Maxwell 方程与材料本构，输出场强、磁通、损耗密度及耦合温升。' },
  { id: '03', key: 'GAS DYNAMICS', title: '气体计算', subtitle: '可压缩 / 湍流 / 激波 / 燃烧', metric: '10⁻⁵', label: '守恒残差', color: 'ember', description: '覆盖低速至可压缩气体流动，控制质量、动量、能量守恒和激波捕捉精度。' },
  { id: '04', key: 'LIQUID FLOW', title: '液体计算', subtitle: '内流 / 自由液面 / 多相 / 空化', metric: '≤ 0.3%', label: '质量不平衡', color: 'moss', description: '面向管路、泵阀与自由液面问题，分析压降、涡结构、界面和空化风险。' },
  { id: '05', key: 'HEAT TRANSFER', title: '热传输', subtitle: '导热 / 对流 / 辐射 / 相变', metric: '0.2 K', label: '能量闭合误差', color: 'ember', description: '统一处理稳态与瞬态传热、共轭换热和温度相关物性，定位热点与热流路径。' },
  { id: '06', key: 'MASS TRANSFER', title: '传质计算', subtitle: '扩散 / 对流 / 反应 / 多组分', metric: 'Pe / Da', label: '无量纲控制', color: 'cyan', description: '求解多组分对流扩散与反应源项，评估浓度边界层、混合效率和传质通量。' },
]

export const cases = [
  { type:'等离子体计算', title:'射频放电等离子体密度控制', tag:'PLASMA · DRIFT–DIFFUSION', result:'均匀性 +21%', detail:'耦合泊松方程、电子能量与粒子连续性方程，分析鞘层、电离区和功率沉积分布。', palette:'thermal', objective:'提升反应区密度均匀性并限制壁面离子通量', validation:'电荷守恒、时间步收敛、实验趋势对比', tools:'Python · FVM · Plasma kinetics' },
  { type:'电磁场计算', title:'感应线圈电磁热耦合优化', tag:'MAXWELL · EM-THERMAL', result:'热点 −18.6 K', detail:'计算交变磁场、涡流损耗与温升反馈，优化线圈间距和工作频率。', palette:'stress', objective:'提高目标区功率密度并抑制边缘热点', validation:'网格收敛、功率闭合、解析电感对比', tools:'Python · FEM · Maxwell' },
  { type:'气体计算', title:'超声速喷管激波结构控制', tag:'COMPRESSIBLE CFD', result:'推力 +7.8%', detail:'采用密度基可压缩求解与激波捕捉，评估膨胀波、分离和出口非均匀性。', palette:'flow', objective:'改善出口动量均匀性并降低激波损失', validation:'质量守恒、激波位置、网格无关性', tools:'Python · FVM · RANS' },
  { type:'液体计算', title:'离心泵叶轮空化风险评估', tag:'MULTIPHASE · CAVITATION', result:'NPSHr −9.4%', detail:'耦合旋转域、湍流与空化模型，追踪汽相体积分数和压力脉动。', palette:'flow', objective:'扩大无空化工作区并降低叶频压力脉动', validation:'扬程曲线、质量平衡、空化数扫描', tools:'Python · CFD · MRF' },
  { type:'热传输', title:'功率模块共轭散热优化', tag:'CHT · RADIATION', result:'结温 −12.7 K', detail:'固体导热、通道对流与表面辐射耦合，识别界面热阻和主导散热路径。', palette:'thermal', objective:'降低峰值结温并提高温度场均匀性', validation:'能量闭合、热阻对比、网格无关性', tools:'Python · FDM · CHT' },
  { type:'传质计算', title:'反应器多组分混合与传质', tag:'SPECIES TRANSPORT', result:'混合时间 −24%', detail:'求解对流扩散与有限速率反应，分析浓度边界层、停留时间和反应区覆盖率。', palette:'thermal', objective:'缩短混合时间并减少局部浓度过冲', validation:'组分守恒、Peclet 扫描、示踪实验对比', tools:'Python · FVM · Species' },
]

export const validations = [
  ['Euler–Bernoulli 梁挠度', '解析解 / 自研离散', '1.6%'],
  ['二维稳态导热', '能量守恒 / 网格加密', '0.2 K'],
  ['圆柱势流表面压力', '理论 Cp 分布', '2.3%'],
]
