(() => {
  const BREEZE = {
    1: { U: 1.0, label: "一级微风", range: "0.3–1.5 m/s" },
    2: { U: 2.5, label: "二级轻风", range: "1.6–3.3 m/s" },
    3: { U: 4.5, label: "三级微风", range: "3.4–5.4 m/s" },
  };

  let level = 1;

  document.querySelectorAll("#breeze-presets .preset-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#breeze-presets .preset-chip").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      level = Number(btn.dataset.level);
      const b = BREEZE[level];
      document.getElementById("p-U").value = b.U;
      run();
    });
  });

  function read() {
    return {
      U: Number(document.getElementById("p-U").value),
      dir: (Number(document.getElementById("p-dir").value) * Math.PI) / 180,
      r: Number(document.getElementById("p-r").value),
      ti: Number(document.getElementById("p-ti").value) / 100,
      N: Number(document.getElementById("p-N").value),
      z: Number(document.getElementById("p-z").value),
    };
  }

  function solve(p) {
    const n = Math.min(80, Math.max(24, p.N));
    const u = Array.from({ length: n }, () => Array(n).fill(0));
    const v = Array.from({ length: n }, () => Array(n).fill(0));
    const speed = Array.from({ length: n }, () => Array(n).fill(0));
    const cx = 0.5;
    const cy = 0.5;
    const R = p.r;
    const U0 = p.U;
    const ca = Math.cos(p.dir);
    const sa = Math.sin(p.dir);
    let uMax = 0;

    for (let j = 0; j < n; j += 1) {
      for (let i = 0; i < n; i += 1) {
        const x = i / (n - 1);
        const y = j / (n - 1);
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);
        let ux = U0 * ca;
        let vy = U0 * sa;
        if (dist > R * 1.05 && dist < 0.45) {
          const theta = Math.atan2(dy, dx);
          const pot = U0 * (1 + (R * R) / (dist * dist) * Math.cos(2 * theta));
          ux = pot * ca - (R * R / (dist * dist)) * U0 * Math.sin(2 * theta) * Math.sin(theta);
          vy = pot * sa + (R * R / (dist * dist)) * U0 * Math.sin(2 * theta) * Math.cos(theta);
        } else if (dist <= R * 1.05) {
          ux = vy = 0;
        }
        const turb = 1 + p.ti * (Math.random() - 0.5);
        ux *= turb;
        vy *= turb;
        u[j][i] = ux;
        v[j][i] = vy;
        speed[j][i] = Math.hypot(ux, vy);
        uMax = Math.max(uMax, speed[j][i]);
      }
    }

    const Cp = 1 - (uMax / (U0 || 1)) ** 2;
    const lvl = BREEZE[level] || BREEZE[1];

    return { u, v, speed, uMax, Cp, lvl, cx, cy, R };
  }

  function run() {
    const t0 = performance.now();
    const p = read();
    const r = solve(p);
    const ms = (performance.now() - t0).toFixed(1);

    document.getElementById("m-U").textContent = `${p.U.toFixed(2)} m/s`;
    document.getElementById("m-level").textContent = r.lvl.label;
    document.getElementById("m-umax").textContent = `${r.uMax.toFixed(2)} m/s`;
    document.getElementById("m-cp").textContent = r.Cp.toFixed(3);
    document.getElementById("m-time").textContent = `${ms} ms`;

    PhyChart.vectors(document.getElementById("chart-vec"), r.u, r.v, {
      step: 3,
      obstacle: { cx: r.cx, cy: r.cy, r: r.R },
    });
    PhyChart.heatmap(document.getElementById("chart-speed"), r.speed);

    const st = document.getElementById("run-status");
    st.textContent = `${r.lvl.label} · ${r.lvl.range} · 求解完成`;
    st.className = "studio-status ok";
  }

  document.getElementById("btn-run").addEventListener("click", run);
  run();
})();
