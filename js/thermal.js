(() => {
  const PRESETS = {
    plate: { k: 45, Q: 0, Tl: 100, Tr: 20, Tt: 50, Tb: 50, N: 48, it: 400 },
    hotspot: { k: 16, Q: 50, Tl: 25, Tr: 25, Tt: 25, Tb: 25, N: 56, it: 600 },
    gradient: { k: 30, Q: 0, Tl: 80, Tr: 10, Tt: 60, Tb: 30, N: 48, it: 350 },
  };

  function read() {
    return {
      k: Number(document.getElementById("p-k").value),
      Q: Number(document.getElementById("p-Q").value) * 1e3,
      Tl: Number(document.getElementById("p-Tl").value),
      Tr: Number(document.getElementById("p-Tr").value),
      Tt: Number(document.getElementById("p-Tt").value),
      Tb: Number(document.getElementById("p-Tb").value),
      N: Number(document.getElementById("p-N").value),
      it: Number(document.getElementById("p-it").value),
    };
  }

  function applyPreset(k) {
    const p = PRESETS[k];
    if (!p) return;
    document.getElementById("p-k").value = p.k;
    document.getElementById("p-Q").value = p.Q;
    document.getElementById("p-Tl").value = p.Tl;
    document.getElementById("p-Tr").value = p.Tr;
    document.getElementById("p-Tt").value = p.Tt;
    document.getElementById("p-Tb").value = p.Tb;
    document.getElementById("p-N").value = p.N;
    document.getElementById("p-it").value = p.it;
  }

  function solve(p) {
    const n = Math.min(80, Math.max(20, p.N));
    const T = Array.from({ length: n }, () => Array(n).fill(0));
    for (let j = 0; j < n; j += 1) {
      for (let i = 0; i < n; i += 1) {
        T[j][i] = (p.Tl + p.Tr + p.Tt + p.Tb) / 4;
      }
    }
    const dx = 1;
    const src = p.Q / p.k;
    let res = 0;

    for (let iter = 0; iter < p.it; iter += 1) {
      const next = T.map((row) => row.slice());
      res = 0;
      for (let j = 1; j < n - 1; j += 1) {
        for (let i = 1; i < n - 1; i += 1) {
          const v = 0.25 * (T[j + 1][i] + T[j - 1][i] + T[j][i + 1] + T[j][i - 1] - src * dx * dx);
          res = Math.max(res, Math.abs(v - T[j][i]));
          next[j][i] = v;
        }
      }
      for (let j = 0; j < n; j += 1) {
        next[j][0] = p.Tl;
        next[j][n - 1] = p.Tr;
      }
      for (let i = 0; i < n; i += 1) {
        next[0][i] = p.Tt;
        next[n - 1][i] = p.Tb;
      }
      for (let j = 0; j < n; j += 1) T[j] = next[j];
    }

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let cnt = 0;
    for (const row of T) {
      for (const v of row) {
        min = Math.min(min, v);
        max = Math.max(max, v);
        sum += v;
        cnt += 1;
      }
    }
    const mid = Math.floor(n / 2);
    const profile = T[mid].slice();
    const x = profile.map((_, i) => i / (n - 1));

    return { T, min, max, avg: sum / cnt, res, x, profile };
  }

  function run() {
    const t0 = performance.now();
    const p = read();
    const r = solve(p);
    const ms = (performance.now() - t0).toFixed(1);

    document.getElementById("m-max").textContent = `${r.max.toFixed(1)} °C`;
    document.getElementById("m-min").textContent = `${r.min.toFixed(1)} °C`;
    document.getElementById("m-avg").textContent = `${r.avg.toFixed(1)} °C`;
    document.getElementById("m-res").textContent = r.res.toExponential(2);
    document.getElementById("m-time").textContent = `${ms} ms`;

    PhyChart.heatmap(document.getElementById("chart-field"), r.T);
    PhyChart.line(document.getElementById("chart-profile"), [{ x: r.x, y: r.profile }], { xlabel: "x", ylabel: "T (°C)" });

    const st = document.getElementById("run-status");
    st.textContent = "热场求解完成";
    st.className = "studio-status ok";
  }

  document.getElementById("preset").addEventListener("change", (e) => applyPreset(e.target.value));
  document.getElementById("btn-run").addEventListener("click", run);
  run();
})();
