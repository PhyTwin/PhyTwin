const form = document.getElementById("compute-form");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const base = document.getElementById("api-base").value.replace(/\/$/, "");
  const key = document.getElementById("api-key").value.trim() || "phytwin-dev";
  const payload = {
    a: Number(document.getElementById("param-a").value),
    b: Number(document.getElementById("param-b").value),
    mode: document.getElementById("param-mode").value,
  };

  statusEl.className = "hint";
  statusEl.textContent = "请求中…";
  resultEl.textContent = "…";

  try {
    const res = await fetch(`${base}/v1/compute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": key,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    statusEl.className = "hint ok";
    statusEl.textContent = `成功 · worker=${data.worker || "local"} · ${data.elapsed_ms ?? "?"} ms`;
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    statusEl.className = "hint error";
    statusEl.textContent =
      "失败：连不上本地 API。请先运行 python local-api/server.py，或检查 API 地址 / CORS / Key。";
    resultEl.textContent = String(err.message || err);
  }
});
