# PhyTwin · CAE 在线实时仿真作品集

[www.phytwin.com](https://www.phytwin.com) 面向仿真研发客户、力学/流体/多物理场技术负责人的在线计算平台。网站以“可复现的计算”为核心，包含俯视旋臂银河系与太阳系/星座交互探索、交互式翼型风洞、Three.js 三维热羽流、结构/热/流体浏览器端求解、科研级 Plotly 可视化，以及 ODE/PDE 与三维数学工具资源目录。

## 架构概览

```mermaid
flowchart LR
  A[首页 / 能力 / 案例 / 关于] --> B[React 交互层]
  B --> C[浏览器 CAE 求解器]
  B --> D[FastAPI 计算接口]
  C --> E[Plotly 科研可视化]
  D --> E
  E --> F[云图 / 曲线 / 残差 / JSON 导出]
```

详细架构、页面流程和接口说明见 [`ARCHITECTURE.md`](./ARCHITECTURE.md)。

## 本地运行

```bash
# 前端（Node.js 20+）
cd source
npm install
npm run dev

# 生产构建
npm run build
npm run preview
```

打开 `http://localhost:5173`。线上 GitHub Pages 版本默认使用浏览器端求解器，因此无需启动后端。

## 可选 Python 计算接口

```bash
cd ..  # 如果刚运行过前端命令，先回到仓库根目录
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8787
```

- 健康检查：`GET http://127.0.0.1:8787/health`
- 仿真接口：`POST http://127.0.0.1:8787/api/v1/simulate`
- API 文档：`http://127.0.0.1:8787/docs`

## 联系

- 网站：[https://www.phytwin.com](https://www.phytwin.com)
- GitHub：[https://github.com/PhyTwin/PhyTwin](https://github.com/PhyTwin/PhyTwin)
- 邮箱：[phytwin@outlook.com](mailto:phytwin@outlook.com)

本项目为公开作品展示，许可约束见 [`LICENSE`](./LICENSE)。
