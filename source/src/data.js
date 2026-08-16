// PhyTwin 物理数字孪生数据字典：仿真技术、真实工程装置与 V&V 验证基准

export const capabilities = [
  {
    id: '01',
    key: 'MAGNETOHYDRODYNAMICS',
    title: '磁流体动力学 (MHD / Extended MHD)',
    subtitle: '平衡 / 撕裂模 / ELM 边界局域模 / 破裂演化',
    metric: '10⁻⁷',
    label: 'Grad–Shafranov 残差',
    color: 'cobalt',
    description: '求解非线性扩展磁流体力学方程组与广义欧姆定律，覆盖轴对称托卡马克平衡、三维仿星器磁面重构、宏观电阻撕裂模与等离子体破裂（VDE）电磁瞬态载荷计算。'
  },
  {
    id: '02',
    key: 'ELECTROMAGNETICS',
    title: '高场电磁与超导磁体计算',
    subtitle: 'Biot–Savart / 涡流损耗 / 超导失超 / 洛伦兹力',
    metric: '20 T+',
    label: '峰值背景磁场',
    color: 'cyan',
    description: '求解三维 Maxwell 方程与高温超导材料（REBCO / CICC）电磁-热-力本构，精确输出极向与环向场线圈复杂空间场分布、交流损耗、应力集中与失超热保护响应。'
  },
  {
    id: '03',
    key: 'COMPRESSIBLE CFD',
    title: '可压缩气体动力学与激波捕捉',
    subtitle: '高超声速 / 激波-边界层 / 气动热 / 喷管膨胀',
    metric: 'Ma 0.3–6.0',
    label: '马赫数覆盖范围',
    color: 'ember',
    description: '采用高精度有限体积法（FVM）与二阶/三阶激波捕捉格式，精确求解 Navier–Stokes 方程，控制激波位置、分离泡尺度、壁面摩擦阻力与气动热通量。'
  },
  {
    id: '04',
    key: 'LIQUID METAL & THERMAL-HYDRAULICS',
    title: '液态金属与热工水力管流',
    subtitle: '铅铋 (LBE) / 磁流体热对流 / 空化 / 湍流传热',
    metric: '≤ 0.1%',
    label: '质量与能量闭合度',
    color: 'moss',
    description: '面向先进核能冷却回路与聚变包层，处理低普朗特数液态金属（LBE / LiPb）流动、MHD 压降抑制效应、离心泵内流空化与多相界面演化。'
  },
  {
    id: '05',
    key: 'CONJUGATE HEAT TRANSFER',
    title: '超高热负荷共轭传热 (CHT)',
    subtitle: '偏滤器靶板 / 电子束测试 / 微通道相变 / 热应力',
    metric: '20 MW/m²',
    label: '极限稳态热通量',
    color: 'ember',
    description: '统一固体各向异性导热、微通道超临界流体对流换热与表面高温辐射，准确定位钨铜复合装甲结构热点、界面接触热阻与热应力疲劳寿命。'
  },
  {
    id: '06',
    key: 'SPECIES TRANSPORT & DISPERSION',
    title: '多组分反应与海洋环境传质',
    subtitle: '同位素扩散 / 潮汐洋流输运 / 一阶衰变 / 烟羽漂移',
    metric: '3D Green',
    label: '时空解析解核',
    color: 'cyan',
    description: '求解多组分对流–扩散–反应–衰变控制方程，结合深远海三维潮汐流场与风浪条件，精准评估氚扩散、放射性核素迁移与环境介质稀释速率。'
  },
]

export const devices = [
  {
    id: '01',
    name: 'EAST 全超导托卡马克实验装置',
    latin: 'Experimental Advanced Superconducting Tokamak',
    category: '聚变等离子体重大装置',
    facility: '中国科学院合肥物质科学研究院等离子体物理研究所 (ASIPP)',
    location: '中国 · 合肥',
    status: '在运 · 国家重大科技基础设施',
    imageTag: 'TOKAMAK · 1056s H-MODE',
    specs: [
      ['大半径 R₀', '1.85 m'],
      ['小半径 a', '0.45 m'],
      ['轴上磁场 B₀', '3.5 T'],
      ['等离子体电流 Iₚ', '1.0 MA'],
      ['稳态高约束模运行', '1056 s (世界纪录)'],
      ['辅助加热总功率', '30 MW (NBI+LHW+ICRF+ECRH)']
    ],
    highlight: '世界上第一个非圆截面全超导托卡马克，实现了千秒量级长脉冲高约束模等离子体稳态运行，为未来聚变反应堆的稳态燃烧控制奠定了核心物理基础。',
    simScope: '三维全超导磁场重构、射频波加热电流驱动（LHW/ICRF）、高热负荷钨偏滤器粒子排除与等离子体破裂瞬态电磁力。'
  },
  {
    id: '02',
    name: 'HL-3（中国环流三号）托卡马克装置',
    latin: 'HL-3 Advanced Divertor Tokamak Facility',
    category: '先进磁约束聚变装置',
    facility: '核工业西南物理研究院 (SWIP)',
    location: '中国 · 成都',
    status: '在运 · 新一代先进磁约束装置',
    imageTag: 'HIGH CURRENT · 1.15 MA H-MODE',
    specs: [
      ['大半径 R₀', '1.78 m'],
      ['小半径 a', '0.65 m'],
      ['轴上磁场 B₀', '2.2 T (升级可达 3.0 T)'],
      ['等离子体电流 Iₚ', '2.5 MA (设计能力)'],
      ['截面拉长比 κ', '1.8–2.0'],
      ['最高离子温度', '> 1.6 亿度 (15 keV)']
    ],
    highlight: '我国自主设计建造的先进偏滤器托卡马克装置，2023年成功实现 100 万安培等离子体电流下的高约束模（H模）运行，具有高度灵活的先进双零/雪花偏滤器位形控制能力。',
    simScope: '雪花偏滤器拓扑分界线磁场结构、ELM 边界局域模非线性抑制、芯部高参数杂质输运与破裂逃逸电子减缓。'
  },
  {
    id: '03',
    name: 'BEST 紧凑型聚变能实验装置',
    latin: 'Burning Experimental Small Tokamak',
    category: '紧凑型燃烧等离子体装置',
    facility: '合肥综合性国家科学中心能源研究院 / ASIPP',
    location: '中国 · 合肥',
    status: '建设中 · 紧凑高场燃烧前瞻装置',
    imageTag: 'BURNING PLASMA · Q ≥ 1~5',
    specs: [
      ['大半径 R₀', '≈ 3.6 m'],
      ['小半径 a', '≈ 1.1 m'],
      ['轴上磁场 B₀', '≈ 6.5–7.0 T'],
      ['等离子体电流 Iₚ', '≈ 7.0–8.0 MA'],
      ['目标聚变增益 Q', 'Q ≥ 1 (破圈) ~ 5'],
      ['聚变功率 P_fus', '50–200 MW (D-T 燃烧)']
    ],
    highlight: '中国新一代高场紧凑型燃烧等离子体实验装置，致力于率先在紧凑几何尺度下实现氘-氚（D-T）等离子体自持燃烧（Q > 1），验证阿尔法粒子自加热物理与氚自持循环系统。',
    simScope: '高场高密度自持燃烧等离子体输运、阿尔法粒子不稳定性诱发损失、超大热流偏滤器脱靶控制与超导磁体 CICC 极低温水力学。'
  },
  {
    id: '04',
    name: 'ITER 国际热核聚变实验堆',
    latin: 'International Thermonuclear Experimental Reactor',
    category: '国际特大型国际大科学工程',
    facility: 'ITER Organization (中、欧、美、俄、日、韩、印七方共建)',
    location: '法国 · 圣保罗-莱-杜朗斯 (Cadarache)',
    status: '总装集成中 · 人类最大托卡马克',
    imageTag: '500 MW OUTPUT · Q = 10',
    specs: [
      ['大半径 R₀', '6.2 m'],
      ['小半径 a', '2.0 m'],
      ['等离子体体积 V_p', '840 m³'],
      ['轴上磁场 B₀', '5.3 T (超导储能 51 GJ)'],
      ['等离子体电流 Iₚ', '15.0 MA'],
      ['设计聚变增益 Q', 'Q = 10 (输出 500 MW / 注入 50 MW)']
    ],
    highlight: '全球规模最大、技术最复杂的磁约束聚变实验堆，目标是首次全面证实聚变能源的科学与工程可行性，验证 500 MW 热功率输出与工程级包层增殖。',
    simScope: '跨尺度回旋动理学微观湍流（GENE/GTC）、SOLPS-ITER 偏滤器脱靶边界层、全堆电磁结构解耦与巨型低温杜瓦冷损分析。'
  },
  {
    id: '05',
    name: 'Wendelstein 7-X (W7-X) 优化仿星器',
    latin: 'Max Planck IPP Modular Stellarator',
    category: '稳态无破裂先进仿星器',
    facility: '德国马克斯·普朗克等离子体物理研究所 (IPP Garching/Greifswald)',
    location: '德国 · 格赖夫斯瓦尔德',
    status: '在运 · 全球最大先进超导仿星器',
    imageTag: 'STEADY STATE · 3D TWISTED COILS',
    specs: [
      ['大半径 R₀', '5.5 m'],
      ['小半径 a', '0.53 m'],
      ['非平面超导线圈', '50 个 (空间扭曲造型)'],
      ['平面辅助线圈', '20 个 (磁场微调)'],
      ['轴上磁场 B₀', '2.5–3.0 T (五重环向周期)'],
      ['稳态放电时间', '长达 30 分钟 (水冷岛偏滤器)']
    ],
    highlight: '世界最顶尖的五周期准等动力学优化超导仿星器，完全无需等离子体自驱动环向净电流即可实现固有稳态磁场约束，彻底免除电流破裂风险。',
    simScope: '三维非对称磁平衡（VMEC）、新经典径向电场与输运优化、非平面超导线圈空间复杂洛伦兹力解析与岛偏滤器热排除。'
  },
  {
    id: '06',
    name: 'TAE C-2W (Norman) 场反向位形装置',
    latin: 'TAE Technologies Advanced Beam-Driven FRC',
    category: '先进紧凑型聚变商业探索装置',
    facility: 'TAE Technologies (美国独角兽聚变企业)',
    location: '美国 · 加利福尼亚 Foothill Ranch',
    status: '在运 · 先进束流驱动 FRC',
    imageTag: 'HIGH-BETA FRC · 3000万度',
    specs: [
      ['装置总长度 L', '≈ 25 m'],
      ['等离子体中心 β', 'β ≈ 0.8–1.0 (超高磁效率)'],
      ['中性束注入功率', '13 MW (8 台大功率 NBI)'],
      ['芯部电子/离子温度', '> 3 keV (> 3000 万开尔文)'],
      ['约束位形特征', '场反向闭合磁面 + 开放端部刮削层'],
      ['燃料路线规划', 'p-¹¹B (氢-硼无中子洁净聚变)']
    ],
    highlight: '全球领先的先进束流驱动场反向位形（FRC）装置，利用两团对撞等离子体环合并后注入大功率快中性束维持闭合磁涡旋，探索高磁场利用率与无中子聚变可行性。',
    simScope: '刚体转子平衡、动理学大轨道离子束稳定化机制、端部磁镜静电粒子直接能量回收与刮削层高速轴向对流。'
  },
  {
    id: '07',
    name: '15T+ 聚变高场超导磁体综合测试平台',
    latin: 'High-Field Superconducting Magnet Testing Rig',
    category: '强磁场与超导极端工程装备',
    facility: '国家超导磁体工程中心 / 聚变装备联合实验室',
    location: '中国 · 合肥 / 西安',
    status: '在运 · 极端电磁热力综合试验台',
    imageTag: '15T–20T · 100 kA CICC',
    specs: [
      ['最高中心背景磁场', '15.0–20.5 T'],
      ['最大超导通流能力', '100 kA (脉冲 / 稳态直流)'],
      ['极低温操作环境', '4.2 K 液氦浸泡 / 4.5 K 超临界氦'],
      ['测试口径通道', 'Φ 800 mm 净空间孔径'],
      ['最大抗弯洛伦兹力', '> 12,000 kN/m']
    ],
    highlight: '用于新一代高温超导（REBCO）与 Nb3Sn 聚变 CICC 导体的百千安级大电流强磁场全尺寸性能测试，模拟聚变堆启停工况下的高交变应力与绝缘疲劳。',
    simScope: '三维各向异性非线性弹塑性结构应力、超导电缆横向挤压接触热阻、绝热失超瞬态传播方程与大容量低温回路充氦流动。'
  },
  {
    id: '08',
    name: '2.4米 连续式跨/超声速气动风洞试验段',
    latin: '2.4m Continuous Transonic–Supersonic Wind Tunnel',
    category: '流体力学与航天航空大型装备',
    facility: '中国空气动力研究与发展中心 (CARDC)',
    location: '中国 · 绵阳',
    status: '在运 · 国家空气动力战略重器',
    imageTag: 'Ma 0.3–2.5 · CONTINUOUS',
    specs: [
      ['试验段截面尺寸', '2.4 m × 2.4 m'],
      ['工作马赫数范围', 'Ma 0.3–2.5 (无级连续可调)'],
      ['总压控制精度', '≤ 0.05%'],
      ['最大驱动功率', '80 MW 大型轴流主风机'],
      ['流场动压范围', 'q = 10–120 kPa']
    ],
    highlight: '我国最大的大型连续式跨声速风洞，具有极低的气流湍流度和极高的测力测压精度，广泛服务于各类飞机、高超声速飞行器及气动部件的气动力/气动弹性实验。',
    simScope: '复杂几何绕流激波-边界层干扰（SBLI）、跨声速翼剖面抖振失速非定常流动、伴随拓扑形状阻力优化与全尺寸风洞壁干扰修正。'
  },
  {
    id: '09',
    name: '铅铋合金 (LBE) 液态金属热工水力循环测试回路',
    latin: 'Liquid Lead-Bismuth Eutectic (LBE) Thermal Loop',
    category: '先进核能与反应堆冷却装备',
    facility: '核工业先进反应堆工程技术中心',
    location: '中国 · 北京 / 成都',
    status: '在运 · 液态重金属热力工况台',
    imageTag: 'LBE 450°C · 3.5 MPa',
    specs: [
      ['主回路工作介质', '铅铋共晶合金 (44.5% Pb - 55.5% Bi)'],
      ['最高设计工作温度', '450–550 °C'],
      ['回路最大循环流量', '35 m³/h'],
      ['驱动方式', '电磁感应永磁电磁泵 (无机械轴封)'],
      ['氧浓度控制精度', '10⁻⁶–10⁻⁴ wt% (抑制结构钢腐蚀)']
    ],
    highlight: '针对第四代先进铅冷快堆（LFR）和聚变包层冷却研发的全尺寸重金属工质综合台架，精确测量液态金属低普朗特数流动传热特征与自然循环衰变热导出能力。',
    simScope: '低 Pr 数对流换热模型标定、三维强浮力驱动非定常自然对流、电磁泵感应洛伦兹力场流动与重金属冲刷腐蚀质量迁移。'
  },
  {
    id: '10',
    name: '聚变反应堆偏滤器 10~20 MW/m² 高热负荷靶板测试台',
    latin: 'Divertor High Heat Flux Testing Facility (HHFT)',
    category: '聚变第一壁与等离子体相互作用装备',
    facility: '核工业西南物理研究院 / 中科院 ASIPP',
    location: '中国 · 成都 / 合肥',
    status: '在运 · 电子束高热流极限测试台',
    imageTag: '20 MW/m² · ELECTRON BEAM',
    specs: [
      ['电子束枪加速电压', '60–120 kV'],
      ['电子束最大总功率', '800 kW (多枪扫描组合)'],
      ['稳态施加热通量', '10–20 MW/m² (稳态长脉冲)'],
      ['瞬态热冲击峰值', '0.5–1.5 GW/m² (模拟 ELM 热猝灭)'],
      ['冷却工质条件', '高压过冷水 (15 MPa / 250 °C / 12 m/s)']
    ],
    highlight: '聚变堆内部承受最极端热流轰击的关键部件考核装备，利用高功率电子束对钨/铜合金复合装甲偏滤器单体进行循环热疲劳试验，验证兆瓦级强对流传热极限。',
    simScope: '钨-铜界面高梯度瞬态热传导、过冷沸腾气泡成核微观机理、弹塑性热蠕变应力集中与热疲劳裂纹扩展寿命预测。'
  },
  {
    id: '11',
    name: '多尺度海洋核素与环境污染物弥散模拟水槽系统',
    latin: 'Multi-scale Marine Environmental Dispersion Basin',
    category: '海洋水动力与环境安全工程装备',
    facility: '国家海洋工程重点实验室 / 环境科学研究院',
    location: '中国 · 青岛 / 上海',
    status: '在运 · 大型多功能海洋动力水槽',
    imageTag: 'WAVE-CURRENT-TIDE · 3D TRACE',
    specs: [
      ['主实验水槽尺寸', '60 m × 40 m × 1.8 m (长×宽×深)'],
      ['造流系统最大流速', '1.2 m/s (双向潮汐流调控)'],
      ['多向不规则波造波机', '80 单元推板造波（波高 0.4 m）'],
      ['激光诱导荧光 LIF', '全场浓度二维/三维瞬态层析成像'],
      ['声学多普勒流速仪 ADV', '三维微观湍流脉动测量 (200 Hz)']
    ],
    highlight: '结合三维风浪流综合动力场的高精度水动力实验装置，利用荧光同位素示踪与激光诱导技术，精确重现浅水潮汐、洋流与海床边界层中的物质非各向同性扩散。',
    simScope: '三维浅水潮汐对流-扩散数值解、深海浮力排污烟羽混合、沉积物二次吸附释放与放射性核素海洋食物链扩散评估。'
  }
]

export const validations = [
  ['Grad–Shafranov 托卡马克 Solov\'ev 平衡解', '解析解 vs 有限体积网格', '0.4%'],
  ['Biot–Savart 空间多匝螺线管磁场轴线积分', '解析椭圆积分公式', '0.1%'],
  ['不可压缩圆柱势流表面无量纲压力系数 Cp', '理论 1 - 4sin²θ 解析解', '0.2%'],
  ['Hagen–Poiseuille 圆管充分发展速度剖面与压降', 'Navier–Stokes 抛物线解', '0.05%'],
  ['三维有限差分稳态泊松传热核心峰值温度', '精确级数解析解', '0.15 K'],
  ['三维海洋均匀流对流扩散衰减瞬态质量守恒', 'Green 积分核守恒检验', '0.02%'],
  ['Euler–Bernoulli 弹性悬臂梁集中载荷端部挠度', '结构力学理论解析解', '0.3%'],
]
