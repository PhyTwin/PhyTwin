/** 2D canvas charts for PhyTwin studios */
window.PhyChart = {
  heatmap(canvas, field, opts = {}) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const rows = field.length;
    const cols = (field[0] && field[0].length) || 0;
    let min = Infinity;
    let max = -Infinity;
    for (const row of field) {
      for (const v of row) {
        if (Number.isFinite(v)) {
          min = Math.min(min, v);
          max = Math.max(max, v);
        }
      }
    }
    if (min === max) { min -= 1; max += 1; }
    const img = ctx.createImageData(w, h);
    for (let j = 0; j < h; j += 1) {
      const r = Math.floor((j / h) * rows);
      for (let i = 0; i < w; i += 1) {
        const c = Math.floor((i / w) * cols);
        const v = (field[r] && field[r][c] !== undefined) ? field[r][c] : 0;
        const t = (v - min) / (max - min);
        const idx = (j * w + i) * 4;
        const color = PhyChart._jet(t);
        img.data[idx] = color[0];
        img.data[idx + 1] = color[1];
        img.data[idx + 2] = color[2];
        img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    if (opts.title) {
      ctx.fillStyle = "#5c6b7a";
      ctx.font = "12px IBM Plex Sans, sans-serif";
      ctx.fillText(opts.title, 8, 16);
    }
    return { min, max };
  },

  _jet(t) {
    const r = Math.max(0, Math.min(1, t));
    const hue = 0.72 - r * 0.72;
    const c = { h: hue, s: 0.85, l: 0.35 + r * 0.25 };
    // hsl to rgb
    const a = c.s * Math.min(c.l, 1 - c.l);
    const f = (n) => {
      const k = (n + c.h * 12) % 12;
      return Math.round(255 * (c.l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
    };
    return [f(0), f(8), f(4)];
  },

  line(canvas, series, opts = {}) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const pad = 28;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#d8e0ea";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const allY = series.flatMap((s) => s.y);
    let yMin = Math.min(...allY);
    let yMax = Math.max(...allY);
    if (yMin === yMax) { yMin -= 1; yMax += 1; }

    const colors = ["#2563eb", "#059669", "#d97706", "#dc2626"];
    series.forEach((s, si) => {
      ctx.strokeStyle = colors[si % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();
      s.x.forEach((x, i) => {
        const px = pad + (x - s.x[0]) / (s.x[s.x.length - 1] - s.x[0] || 1) * (w - 2 * pad);
        const py = h - pad - ((s.y[i] - yMin) / (yMax - yMin)) * (h - 2 * pad);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    });

    if (opts.xlabel) {
      ctx.fillStyle = "#5c6b7a";
      ctx.font = "11px IBM Plex Sans";
      ctx.fillText(opts.xlabel, w / 2 - 20, h - 6);
    }
    if (opts.ylabel) {
      ctx.save();
      ctx.translate(12, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(opts.ylabel, 0, 0);
      ctx.restore();
    }
  },

  vectors(canvas, u, v, opts = {}) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, w, h);
    const rows = u.length;
    const cols = (u[0] && u[0].length) || 0;
    let maxMag = 0;
    for (let j = 0; j < rows; j += 1) {
      for (let i = 0; i < cols; i += 1) {
        maxMag = Math.max(maxMag, Math.hypot(u[j][i], v[j][i]));
      }
    }
    const step = opts.step || 4;
    for (let j = 0; j < rows; j += step) {
      for (let i = 0; i < cols; i += step) {
        const mag = Math.hypot(u[j][i], v[j][i]);
        const t = mag / (maxMag || 1);
        const px = (i / cols) * w;
        const py = (j / rows) * h;
        const len = 8 + t * 14;
        const angle = Math.atan2(v[j][i], u[j][i]);
        ctx.strokeStyle = `hsla(${200 - t * 120}, 80%, 60%, 0.85)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.cos(angle) * len, py + Math.sin(angle) * len);
        ctx.stroke();
      }
    }
    if (opts.obstacle) {
      const { cx, cy, r } = opts.obstacle;
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.arc(cx * w, cy * h, r * Math.min(w, h), 0, Math.PI * 2);
      ctx.fill();
    }
  },
};
