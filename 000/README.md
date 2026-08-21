# OrthoMagTherm 正交 Galerkin 热磁流体计算软件

OrthoMagTherm 是一个从零实现的二维多物理场研究型求解器。软件同时计算不可压缩流体、磁流体和温度扰动，以流函数—涡量、磁势—电流密度形式组织方程，并用矩形域正交正弦基执行 Galerkin 离散。

软件还包含二维机翼剖面自动设计闭环：外壳生成、外流场计算、标准评价、几何反馈修改和重复求解。

> 版本：1.0.0　建议登记名称：**正交模态热磁流体多物理场数值计算软件 V1.0**

## 核心能力

- 流体：二维不可压缩 Navier–Stokes 涡量方程；
- 磁场：二维电阻磁流体感应方程和洛伦兹力反馈；
- 温度：热扩散、背景温度梯度、对流换热和可选高斯热源；
- 空间离散：连续归一化正交正弦基、加密网格非线性积分、Galerkin 回投影；
- 时间离散：首步隐式 Euler，后续可变步长 CNAB2；
- 稳定控制：CFL 步长、自适应失败步回退、跨物理场同步模态尾能过滤；
- 输出：模态系数、重构场、CSV 诊断、NPZ 快照、可选 PNG 总览图。

## 快速开始

```powershell
cd C:\Users\searo\Documents\Codex\OrthoMagTherm
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[plot]"
omt-sim run examples\quick_demo.json
```

如果系统没有 `py` 命令，也可以用已安装的 Python 3.10 及以上版本执行相同步骤。仅数值计算只依赖 NumPy；没有安装 Matplotlib 时会跳过 PNG 绘图，不影响结果文件。

也可以不安装包，直接运行仓库根目录的脚本：

```powershell
python run_demo.py examples\quick_demo.json
```

## 飞机翼型自动设计闭环

```powershell
omt-aero run examples\aero_auto_design.json
```

或者不安装包：

```powershell
$env:PYTHONPATH="src"
python -m orthomagtherm.aero run examples\aero_auto_design.json
```

闭环流程为：

```text
参数化翼型外壳 → Hess–Smith 面板流场 → 气动标准评价
       ▲                                      │
       └── 流场敏感度修改弯度/位置/厚度 ←─────┘
```

程序按升力、俯仰力矩、吸力峰值、厚度和阻力代理量判定。未达标时，对三个几何变量执行实际流场扰动计算，形成有限差分敏感度，再通过投影梯度、回溯线搜索和模式搜索修改模型。输出包括每轮表面压力、最终外形、二维速度/压力场、设计历史和机器可读报告。

该模块是二维不可压缩无黏势流概念设计工具；经验阻力指标在结果中明确标记。它不包含三维诱导效应、黏性边界层、分离、激波、颤振和结构强度，不能替代 RANS/LES、风洞或适航验证。

运行结果默认进入 `results/quick_demo/`：

- `resolved_config.json`：本次实际配置；
- `diagnostics.csv`：能量、热流、尾模态比例等时间序列；
- `snapshots/*.npz`：阶段模态快照；
- `final_state.npz`：末态模态系数与物理场；
- `final_fields.png`：末态涡量、磁场模和温度图（可选）。

## 方程概要

定义速度与磁场

```text
u = (∂ψ/∂y, -∂ψ/∂x),     ω = -Δψ
B = (∂a/∂y, B₀-∂a/∂x),   j = -Δa
```

求解的无量纲方程为

```text
∂ω/∂t = J(ψ,ω) + νΔω + Cb ∂θ/∂x + Cm[J(j,a)+B₀∂j/∂y]
∂a/∂t = J(ψ,a) + B₀∂ψ/∂y + ηΔa
∂θ/∂t = J(ψ,θ) - G∂ψ/∂x + κΔθ + Q
```

其中 `J(f,g)=f_x g_y-f_y g_x`。边界采用正弦基自然给出的定值条件；速度解释为不可穿透自由滑移边界，温度扰动和磁势扰动在边界为零。

## 配置建议

- 快速检查：`examples/quick_demo.json`，通常数秒内结束；
- 研究算例：`examples/thermal_mhd_cell.json`，提高了模态数与模拟时间；
- 若 `filter_strength` 经常达到上限，应提高 `modes_x/modes_y` 或减小 `max_dt`；
- 若高模态尾能始终极低，可降低模态数以节约计算时间；
- 物理量均为无量纲量，工程单位问题应先选定参考长度、速度、温差和磁感应强度再换算。

## 验证

```powershell
python -m unittest discover -s tests -v
```

整理带行号的自主源程序和文件哈希清单：

```powershell
python tools\export_registration_materials.py
```

该脚本只辅助汇总实际代码，不替代登记机构要求的正式材料格式。

运行三种模态控制策略的消融实验：

```powershell
python tools\run_filter_ablation.py examples\quick_demo.json
```

结果写入 `results/filter_ablation/ablation_summary.csv`。专利论证时应另行使用更长时间、更高分辨率和统一参考解的正式实验，快速算例只能验证流程。

测试覆盖正交投影、势函数散度约束、静止解和短时耦合算例。正式科研或工程使用还应针对目标问题进行网格/模态收敛性、时间步收敛性以及基准算例对比。

## 知识产权提示

代码为本项目的独立工程实现，并设置了“跨场同步模态尾能控制”等可区分的软件功能。**这不等于法律上的新颖性、创造性或可专利性已经成立**。申请发明专利前，应以 `docs/专利技术交底书草案.md` 为起点，由代理师进行现有技术检索、权利要求收敛和发明人确认。软著材料应填入真实的软件名称、版本、开发完成日期和著作权人信息。
