# PhyTwin

对外计算门户 + 在线计算器。静态站点，可挂到 `phytwin.com`；重计算可接本机 API。

## 功能

- **在线计算器**（`calculator.html`）：表达式 / 单位换算 / 物理公式，纯前端
- **产品页**（`products.html`）
- **本机求解演示**（`workbench.html` + `local-api/server.py`）

## 本地预览

```bash
python -m http.server 5500
```

打开 http://127.0.0.1:5500/calculator.html

## 部署

见 [docs/deploy.html](docs/deploy.html)。Cloudflare Pages 免费托管，阿里云域名解析免费挂上。
