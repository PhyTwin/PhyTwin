(() => {
  const PRESETS = {
    beam: { E: 200, sy: 250, L: 2, b: 0.08, h: 0.12, nu: 0.3, F: 15, K: 2, bc: "fixed-free" },
    column: { E: 210, sy: 355, L: 3, b: 0.1, h: 0.1, nu: 0.3, F: 120, K: 1, bc: "pinned-pinned" },
    plate: { E: 70, sy: 160, L: 1.5, b: 0.5, h: 0.02, nu: 0.33, F: 8, K: 1, bc: "fixed-fixed" },
  };

  const bcFactor = { "fixed-free": Math.PI, "pinned-pinned": Math.PI, "fixed-fixed": 2 * Math.PI };

  document.querySelectorAll(".studio-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".studio-tab").forEach((t) => t.classList.toggle("is-active", t === tab));
      document.getElementById("pane-geom").hidden = tab.dataset.tab !== "geom";
      document.getElementById("pane-load").hidden = tab.dataset.tab !== "load";
    });
  });

  function readParams() {
    return {
      E: Number(document.getElementById("p-E").value) * 1e9,
      sy: Number(document.getElementById("p-sy").value) * 1e6,
      L: Number(document.getElementById("p-L").value),
      b: Number(document.getElementById("p-b").value),
      h: Number(document.getElementById("p-h").value),
      nu: Number(document.getElementById("p-nu").value),
      F: Number(document.getElementById("p-F").value) * 1e3,
      K: Number(document.getElementById("p-K").value),
      bc: document.getElementById("p-bc").value,
    };
  }

  function applyPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    Object.entries(p).forEach(([k, v]) => {
      const el = document.getElementById(`p-${k === "sy" ? "sy" : k}`);
      if (el) el.value = v;
    });
  }

  function solve(p) {
    const I = (p.b * p.h ** 3) / 12;
    const A = p.b * p.h;
    const sigma = (p.F * p.L * p.h / 2) / I; // 悬臂近似
    const sf = p.sy / Math.abs(sigma);
    const kEff = bcFactor[p.bc] || Math.PI;
    const Pcr = (Math.PI ** 2 * p.E * I) / (p.K * p.L) ** 2 * (kEff / Math.PI) ** 2;
    const stable = p.F < Pcr && sf > 1;

    const n = 80;
    const x = Array.from({ length: n }, (_, i) => (i / (n - 1)) * p.L);
    const stress = x.map((xi) => sigma * (xi / p.L));
    const deflect = x.map((xi) => (p.F * xi ** 2) / (6 * p.E * I) * (3 * p.L - xi));
    const mode = x.map((xi) => Math.sin((Math.PI * xi) / p.L));

    const scanL = Array.from({ length: 40 }, (_, i) => 0.5 + (i / 39) * (p.L * 2));
    const scanSF = scanL.map((L) => {
      const sig = (p.F * L * p.h / 2) / I;
      return p.sy / Math.abs(sig);
    });

    return { sigma, sf, Pcr, stable, x, stress, deflect, mode, scanL, scanSF, I, A };
  }

  function drawMode(canvas, x, mode) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    const pad = 30;
    const amp = 40;
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();
    x.forEach((xi, i) => {
      const px = pad + (xi / x[x.length - 1]) * (w - 2 * pad);
      const py = h / 2 - mode[i] * amp;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.strokeStyle = "#94a3b8";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad, h / 2);
    ctx.lineTo(w - pad, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function run() {
    const t0 = performance.now();
    const p = readParams();
    const r = solve(p);
    const ms = (performance.now() - t0).toFixed(1);

    document.getElementById("m-sigma").textContent = `${(r.sigma / 1e6).toFixed(2)} MPa`;
    document.getElementById("m-sf").textContent = r.sf.toFixed(2);
    document.getElementById("m-pcr").textContent = `${(r.Pcr / 1e3).toFixed(1)} kN`;
    document.getElementById("m-stable").textContent = r.stable ? "稳定 ✓" : "失稳 ✗";
    document.getElementById("m-stable").style.color = r.stable ? "#059669" : "#dc2626";
    document.getElementById("m-time").textContent = `${ms} ms`;

    PhyChart.line(document.getElementById("chart-stress"), [{ x: r.x, y: r.stress.map((v) => v / 1e6) }], { xlabel: "x (m)", ylabel: "σ (MPa)" });
    PhyChart.line(document.getElementById("chart-deflect"), [{ x: r.x, y: r.deflect }], { xlabel: "x (m)", ylabel: "w (m)" });
    drawMode(document.getElementById("chart-mode"), r.x, r.mode);
    PhyChart.line(document.getElementById("chart-scan"), [{ x: r.scanL, y: r.scanSF }], { xlabel: "L (m)", ylabel: "SF" });

    const st = document.getElementById("run-status");
    st.textContent = r.stable ? "求解完成 · 结构稳定" : "求解完成 · 存在失稳或强度不足风险";
    st.className = `studio-status ${r.stable ? "ok" : "err"}`;
  }

  document.getElementById("preset").addEventListener("change", (e) => applyPreset(e.target.value));
  document.getElementById("btn-run").addEventListener("click", run);
  document.getElementById("btn-clear").addEventListener("click", () => {
    ["m-sigma", "m-sf", "m-pcr", "m-stable", "m-time"].forEach((id) => {
      document.getElementById(id).textContent = "—";
    });
    document.getElementById("run-status").textContent = "已清除";
    document.getElementById("run-status").className = "studio-status";
  });

  run();
})();
