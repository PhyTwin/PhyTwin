# PhyTwin

物理数字孪生计算门户 · [phytwin.com](https://phytwin.com)

深色终端风格门户（对齐 VeloAlpha opensource 视觉语言）+ 科学计算器、CalcPlot3D、图纸转模型、力学/热场/风场设计台。

## 本地预览

```bash
# PowerShell / any static server
python -m http.server 5500
```

打开 http://127.0.0.1:5500/

## 部署到 phytwin.com（Cloudflare Pages，免费）

1. 本仓库已推送到 GitHub：`Sam-Messiah/PhyTwin`
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect GitHub repo
3. Build 命令留空，Output directory 填 `/`（或留空根目录）
4. Custom domains → 添加 `phytwin.com` 与 `www.phytwin.com`
5. 在阿里云 DNS 按 Cloudflare 提示加 CNAME / Nameserver

## 模块

| 路径 | 功能 |
|---|---|
| `/calculator.html` | 科学计算器 |
| `/plot3d.html` | 3D 函数绘图 |
| `/model.html` | 图纸转交互模型 |
| `/stability.html` | 力学稳定性 |
| `/thermal.html` | 热场 |
| `/wind.html` | 迎面风场（微风 1–3 级） |
