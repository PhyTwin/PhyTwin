# PhyTwin 网站整体架构与页面流程

## 1. 分层架构

| 层级 | 目录 | 职责 |
|---|---|---|
| 前端 UI | `source/src/App.jsx`, `source/src/styles.css` | React 多页面路由、ChatGPT 式交互、Apple 式动效与响应式布局 |
| 实时实验室 | `source/src/pages/RealtimeLab.jsx`, `source/src/components/*Canvas*`, `ThermalPlume3D.jsx` | Canvas 翼型粒子对流、Three.js 三维热羽流、鼠标扰动与实时工程指标 |
| 浏览器仿真 | `source/src/lib/solver.js` | 结构梁、二维导热、圆柱势流的确定性求解与输入校验 |
| 数据可视化 | `Plotly.js CDN + React 适配层` | 场云图、剖面曲线、对数残差、交互提示和高清 PNG 导出 |
| 后端计算 | `backend/app.py` | FastAPI 统一计算协议，可替换为更高保真 FEM/CFD 内核 |
| 发布 | `根目录静态产物` + `CNAME` | Vite 构建结果通过 GitHub Pages 服务 `www.phytwin.com` |

## 2. 页面流程图

```mermaid
flowchart TD
  H[首页：专业定位与能力总览] --> C[CAE 能力：方法、精度、V&V]
  H --> L[实时实验室：翼型风洞 / 三维热羽流]
  H --> S[在线仿真：模型与参数]
  H --> P[项目案例：目标、方法、结论]
  H --> A[关于我：求职向技术简介]
  C --> S
  L --> S
  P --> S
  S --> V[场云图 / 剖面 / 残差]
  V --> D[下载结果 / 保存方案]
  A --> M[邮件联系]
  H -. 面试官快捷模式 .-> S
```

## 3. 在线仿真数据流

```mermaid
sequenceDiagram
  participant U as 访客
  participant R as React 参数面板
  participant K as CAE 求解内核
  participant P as Plotly
  U->>R: 选择模型并输入边界/材料/几何
  R->>R: 数值与物理范围校验
  R->>K: 结构化参数
  K-->>R: 场量、曲线、指标、收敛历史
  R->>P: 科研绘图配置
  P-->>U: 云图、剖面、残差与高清导出
```

## 4. 已实现求解模型

1. **交互式 NACA 翼型风洞**：修正薄翼理论输出升阻力指标，势流粒子对流显示速度、压力和涡量趋势，支持鼠标注入瞬态涡扰动。
2. **Three.js 三维热羽流**：浮力粒子输运、温度衰减、湍动扰动与横向来流，支持旋转和缩放观察。
3. **悬臂梁静力分析**：Euler–Bernoulli 梁基准，输出位移、弯曲应力、安全系数。
4. **二维稳态导热**：温度边界与体热源，输出温度场、中心剖面、热流指标。
5. **圆柱势流**：不可压无旋理论解，输出速度场、表面压力系数与雷诺数。

实时实验室用于趋势探索与物理直觉展示，不冒充 RANS / LES、燃烧化学或辐射耦合 CFD。线上求解模型用于展示完整计算链路；实际工程必须补充材料标定、网格无关性、实验验证和不确定性分析。

## 5. UI 与可视化原则

- 低饱和暖灰背景与高对比石墨文本，钴蓝仅用于关键状态与操作。
- 所有图表包含单位、坐标轴、色标、科学配色与悬停读数。
- Plotly 工具栏提供 3× 比例 PNG 导出；结果数据支持 JSON 下载。
- `prefers-reduced-motion`、键盘焦点、移动端布局和触控尺寸均有适配。
- 面试官模式隐藏复杂参数，保留一键运行、工程判断与成果指标。
