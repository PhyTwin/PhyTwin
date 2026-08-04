(() => {
  const resultEl = document.getElementById("calc-result");
  const historyEl = document.getElementById("calc-history");
  const exprInput = document.getElementById("expr-input");
  const exprHint = document.getElementById("expr-hint");

  const history = [];

  function pushHistory(title, detail) {
    history.unshift({ title, detail, at: new Date().toLocaleTimeString() });
    if (history.length > 12) history.pop();
    historyEl.innerHTML = history
      .map(
        (h) =>
          `<li><strong>${escapeHtml(h.title)}</strong><span>${escapeHtml(h.detail)}</span><em>${escapeHtml(h.at)}</em></li>`
      )
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function showResult(text, ok = true) {
    resultEl.textContent = text;
    resultEl.classList.toggle("is-error", !ok);
  }

  // ---- Safe expression evaluator (no eval / Function) ----
  function tokenize(src) {
    const s = src.replace(/\s+/g, "").replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-").replaceAll("π", "pi");
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/[0-9.]/.test(ch)) {
        let j = i + 1;
        while (j < s.length && /[0-9.]/.test(s[j])) j += 1;
        const num = s.slice(i, j);
        if ((num.match(/\./g) || []).length > 1) throw new Error("数字格式错误");
        tokens.push({ type: "num", value: Number(num) });
        i = j;
        continue;
      }
      if (/[a-zA-Z_]/.test(ch)) {
        let j = i + 1;
        while (j < s.length && /[a-zA-Z_0-9]/.test(s[j])) j += 1;
        tokens.push({ type: "id", value: s.slice(i, j).toLowerCase() });
        i = j;
        continue;
      }
      if ("+-*/^(),".includes(ch)) {
        tokens.push({ type: "op", value: ch });
        i += 1;
        continue;
      }
      throw new Error(`无法识别的字符: ${ch}`);
    }
    return tokens;
  }

  function parse(tokens) {
    let pos = 0;
    const peek = () => tokens[pos];
    const take = () => tokens[pos++];

    function parseExpr() {
      let node = parseTerm();
      while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
        const op = take().value;
        node = { type: "bin", op, left: node, right: parseTerm() };
      }
      return node;
    }

    function parseTerm() {
      let node = parsePower();
      while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
        const op = take().value;
        node = { type: "bin", op, left: node, right: parsePower() };
      }
      return node;
    }

    function parsePower() {
      let node = parseUnary();
      if (peek() && peek().type === "op" && peek().value === "^") {
        take();
        node = { type: "bin", op: "^", left: node, right: parsePower() };
      }
      return node;
    }

    function parseUnary() {
      if (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
        const op = take().value;
        return { type: "unary", op, arg: parseUnary() };
      }
      return parsePrimary();
    }

    function parsePrimary() {
      const t = peek();
      if (!t) throw new Error("表达式不完整");
      if (t.type === "num") {
        take();
        return { type: "num", value: t.value };
      }
      if (t.type === "id") {
        const name = take().value;
        if (peek() && peek().type === "op" && peek().value === "(") {
          take();
          const args = [];
          if (!(peek() && peek().type === "op" && peek().value === ")")) {
            args.push(parseExpr());
            while (peek() && peek().type === "op" && peek().value === ",") {
              take();
              args.push(parseExpr());
            }
          }
          if (!(peek() && peek().type === "op" && peek().value === ")")) throw new Error("缺少 )");
          take();
          return { type: "call", name, args };
        }
        return { type: "const", name };
      }
      if (t.type === "op" && t.value === "(") {
        take();
        const node = parseExpr();
        if (!(peek() && peek().type === "op" && peek().value === ")")) throw new Error("缺少 )");
        take();
        return node;
      }
      throw new Error("语法错误");
    }

    const ast = parseExpr();
    if (pos !== tokens.length) throw new Error("多余的输入");
    return ast;
  }

  const CONSTS = { pi: Math.PI, e: Math.E };
  const FUNCS = {
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x),
    asin: (x) => Math.asin(x),
    acos: (x) => Math.acos(x),
    atan: (x) => Math.atan(x),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    sqrt: (x) => Math.sqrt(x),
    abs: (x) => Math.abs(x),
    exp: (x) => Math.exp(x),
  };

  function evaluate(node) {
    switch (node.type) {
      case "num":
        return node.value;
      case "const": {
        if (!(node.name in CONSTS)) throw new Error(`未知常量: ${node.name}`);
        return CONSTS[node.name];
      }
      case "unary": {
        const v = evaluate(node.arg);
        return node.op === "-" ? -v : v;
      }
      case "bin": {
        const a = evaluate(node.left);
        const b = evaluate(node.right);
        if (node.op === "+") return a + b;
        if (node.op === "-") return a - b;
        if (node.op === "*") return a * b;
        if (node.op === "/") {
          if (b === 0) throw new Error("除以零");
          return a / b;
        }
        if (node.op === "^") return Math.pow(a, b);
        throw new Error("未知运算符");
      }
      case "call": {
        const fn = FUNCS[node.name];
        if (!fn) throw new Error(`未知函数: ${node.name}`);
        if (node.args.length !== 1) throw new Error(`${node.name} 需要 1 个参数`);
        return fn(evaluate(node.args[0]));
      }
      default:
        throw new Error("内部错误");
    }
  }

  function evalExpr(src) {
    const ast = parse(tokenize(src));
    const value = evaluate(ast);
    if (!Number.isFinite(value)) throw new Error("结果无效");
    return value;
  }

  function formatNumber(n) {
    if (Number.isInteger(n)) return String(n);
    return Number(n.toPrecision(12)).toString();
  }

  function runExpr() {
    const src = exprInput.value.trim();
    if (!src) {
      showResult("请输入表达式", false);
      return;
    }
    try {
      const value = evalExpr(src);
      const out = formatNumber(value);
      showResult(`${src}\n= ${out}`);
      exprHint.textContent = "计算成功";
      exprHint.className = "hint ok";
      pushHistory(out, src);
    } catch (err) {
      showResult(String(err.message || err), false);
      exprHint.textContent = "计算失败";
      exprHint.className = "hint error";
    }
  }

  document.getElementById("expr-keys").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.k) {
      exprInput.value += btn.dataset.k === "pi" ? "pi" : btn.dataset.k;
      exprInput.focus();
      return;
    }
    if (btn.dataset.fn) {
      exprInput.value += `${btn.dataset.fn}(`;
      exprInput.focus();
      return;
    }
    if (btn.dataset.action === "clear") {
      exprInput.value = "";
      showResult("等待输入…");
      return;
    }
    if (btn.dataset.action === "back") {
      exprInput.value = exprInput.value.slice(0, -1);
      return;
    }
    if (btn.dataset.action === "eval") runExpr();
  });

  exprInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runExpr();
    }
  });

  // ---- Tabs ----
  document.querySelectorAll(".calc-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".calc-tab").forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      document.querySelectorAll(".calc-pane").forEach((pane) => {
        const on = pane.dataset.pane === tab.dataset.tab;
        pane.classList.toggle("is-active", on);
        pane.hidden = !on;
      });
    });
  });

  // ---- Unit converter ----
  const UNITS = {
    长度: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      um: 1e-6,
      nm: 1e-9,
      mile: 1609.344,
      ft: 0.3048,
      in: 0.0254,
    },
    质量: {
      kg: 1,
      g: 0.001,
      mg: 1e-6,
      t: 1000,
      lb: 0.45359237,
    },
    时间: {
      s: 1,
      ms: 0.001,
      min: 60,
      h: 3600,
      day: 86400,
    },
    能量: {
      J: 1,
      kJ: 1000,
      eV: 1.602176634e-19,
      cal: 4.184,
      kWh: 3.6e6,
    },
    温度: "temperature",
  };

  const catSel = document.getElementById("unit-category");
  const fromSel = document.getElementById("unit-from");
  const toSel = document.getElementById("unit-to");
  const unitValue = document.getElementById("unit-value");
  const unitHint = document.getElementById("unit-hint");

  Object.keys(UNITS).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    catSel.appendChild(opt);
  });

  function fillUnitSelects() {
    const cat = catSel.value;
    fromSel.innerHTML = "";
    toSel.innerHTML = "";
    const names =
      UNITS[cat] === "temperature"
        ? ["C", "K", "F"]
        : Object.keys(UNITS[cat]);
    names.forEach((u, i) => {
      const a = document.createElement("option");
      a.value = u;
      a.textContent = u;
      fromSel.appendChild(a);
      const b = document.createElement("option");
      b.value = u;
      b.textContent = u;
      if (i === 1) b.selected = true;
      toSel.appendChild(b);
    });
  }

  function convertTemp(v, from, to) {
    let c;
    if (from === "C") c = v;
    else if (from === "K") c = v - 273.15;
    else if (from === "F") c = ((v - 32) * 5) / 9;
    else throw new Error("未知温度单位");
    if (to === "C") return c;
    if (to === "K") return c + 273.15;
    if (to === "F") return (c * 9) / 5 + 32;
    throw new Error("未知温度单位");
  }

  function runUnit() {
    const cat = catSel.value;
    const v = Number(unitValue.value);
    const from = fromSel.value;
    const to = toSel.value;
    if (!Number.isFinite(v)) {
      showResult("请输入有效数值", false);
      return;
    }
    let out;
    if (UNITS[cat] === "temperature") {
      out = convertTemp(v, from, to);
    } else {
      const table = UNITS[cat];
      out = (v * table[from]) / table[to];
    }
    const text = `${formatNumber(v)} ${from} = ${formatNumber(out)} ${to}`;
    showResult(text);
    unitHint.textContent = "换算成功";
    unitHint.className = "hint ok";
    pushHistory(formatNumber(out), text);
  }

  catSel.addEventListener("change", fillUnitSelects);
  fillUnitSelects();
  document.getElementById("unit-convert").addEventListener("click", runUnit);

  // ---- Physics formulas ----
  const FORMULAS = [
    {
      id: "kinetic",
      name: "动能 ½mv²",
      fields: [
        { id: "m", label: "质量 m (kg)", value: 1 },
        { id: "v", label: "速度 v (m/s)", value: 10 },
      ],
      run: ({ m, v }) => ({ value: 0.5 * m * v * v, unit: "J", note: "E_k = 1/2 m v^2" }),
    },
    {
      id: "grav",
      name: "重力势能 mgh",
      fields: [
        { id: "m", label: "质量 m (kg)", value: 1 },
        { id: "g", label: "重力加速度 g", value: 9.80665 },
        { id: "h", label: "高度 h (m)", value: 2 },
      ],
      run: ({ m, g, h }) => ({ value: m * g * h, unit: "J", note: "E_p = m g h" }),
    },
    {
      id: "ohm",
      name: "欧姆定律 V=IR",
      fields: [
        { id: "i", label: "电流 I (A)", value: 2 },
        { id: "r", label: "电阻 R (Ω)", value: 5 },
      ],
      run: ({ i, r }) => ({ value: i * r, unit: "V", note: "V = I R" }),
    },
    {
      id: "period",
      name: "单摆周期 2π√(L/g)",
      fields: [
        { id: "L", label: "摆长 L (m)", value: 1 },
        { id: "g", label: "重力加速度 g", value: 9.80665 },
      ],
      run: ({ L, g }) => ({ value: 2 * Math.PI * Math.sqrt(L / g), unit: "s", note: "T = 2π√(L/g)" }),
    },
    {
      id: "ideal",
      name: "理想气体 pV=nRT",
      fields: [
        { id: "n", label: "物质的量 n (mol)", value: 1 },
        { id: "T", label: "温度 T (K)", value: 298.15 },
        { id: "V", label: "体积 V (m³)", value: 0.024 },
        { id: "R", label: "气体常数 R", value: 8.314462618 },
      ],
      run: ({ n, T, V, R }) => ({ value: (n * R * T) / V, unit: "Pa", note: "p = nRT / V" }),
    },
  ];

  const physSel = document.getElementById("phys-formula");
  const physFields = document.getElementById("phys-fields");
  const physHint = document.getElementById("phys-hint");

  FORMULAS.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.name;
    physSel.appendChild(opt);
  });

  function renderPhysFields() {
    const f = FORMULAS.find((x) => x.id === physSel.value);
    physFields.innerHTML = f.fields
      .map(
        (field) =>
          `<label>${escapeHtml(field.label)}<input data-fid="${escapeHtml(field.id)}" type="number" step="any" value="${field.value}" /></label>`
      )
      .join("");
  }

  function runPhys() {
    const f = FORMULAS.find((x) => x.id === physSel.value);
    const params = {};
    physFields.querySelectorAll("input").forEach((input) => {
      params[input.dataset.fid] = Number(input.value);
    });
    for (const [k, v] of Object.entries(params)) {
      if (!Number.isFinite(v)) {
        showResult(`参数 ${k} 无效`, false);
        return;
      }
    }
    try {
      const out = f.run(params);
      const text = `${f.name}\n${out.note}\n= ${formatNumber(out.value)} ${out.unit}`;
      showResult(text);
      physHint.textContent = "计算成功";
      physHint.className = "hint ok";
      pushHistory(`${formatNumber(out.value)} ${out.unit}`, f.name);
    } catch (err) {
      showResult(String(err.message || err), false);
      physHint.className = "hint error";
    }
  }

  physSel.addEventListener("change", renderPhysFields);
  renderPhysFields();
  document.getElementById("phys-run").addEventListener("click", runPhys);
})();
