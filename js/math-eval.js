/** Safe math expression evaluator (ES5) */
(function () {
  var CONSTS = { pi: Math.PI, e: Math.E };
  var FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    ln: Math.log, log: Math.log10, sqrt: Math.sqrt,
    abs: Math.abs, exp: Math.exp, min: Math.min, max: Math.max,
    pow: Math.pow
  };

  function tokenize(src) {
    var s = src.replace(/\s+/g, "")
      .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
      .replace(/π/g, "pi").replace(/\^/g, "**");
    var tokens = [];
    var i = 0;
    while (i < s.length) {
      var ch = s.charAt(i);
      if (/[0-9.]/.test(ch)) {
        var j = i + 1;
        while (j < s.length && /[0-9.]/.test(s.charAt(j))) j += 1;
        var num = s.slice(i, j);
        tokens.push({ type: "num", value: Number(num) });
        i = j;
        continue;
      }
      if (/[a-zA-Z_]/.test(ch)) {
        j = i + 1;
        while (j < s.length && /[a-zA-Z_0-9]/.test(s.charAt(j))) j += 1;
        tokens.push({ type: "id", value: s.slice(i, j).toLowerCase() });
        i = j;
        continue;
      }
      if (s.slice(i, i + 2) === "**") {
        tokens.push({ type: "op", value: "**" });
        i += 2;
        continue;
      }
      if ("+-*/(),.".indexOf(ch) >= 0) {
        tokens.push({ type: "op", value: ch });
        i += 1;
        continue;
      }
      throw new Error("无法识别: " + ch);
    }
    return tokens;
  }

  function parse(tokens) {
    var pos = 0;
    function peek() { return tokens[pos]; }
    function take() { return tokens[pos++]; }

    function parseExpr() {
      var node = parseTerm();
      var p = peek();
      while (p && p.type === "op" && (p.value === "+" || p.value === "-")) {
        var op = take().value;
        node = { type: "bin", op: op, left: node, right: parseTerm() };
        p = peek();
      }
      return node;
    }
    function parseTerm() {
      var node = parsePower();
      var p = peek();
      var op;
      while (p && p.type === "op" && (p.value === "*" || p.value === "/")) {
        op = take().value;
        node = { type: "bin", op: op, left: node, right: parsePower() };
        p = peek();
      }
      return node;
    }
    function parsePower() {
      var node = parseUnary();
      var p = peek();
      while (p && p.type === "op" && p.value === "**") {
        take();
        node = { type: "bin", op: "**", left: node, right: parsePower() };
        p = peek();
      }
      return node;
    }
    function parseUnary() {
      var p = peek();
      var op;
      if (p && p.type === "op" && (p.value === "+" || p.value === "-")) {
        op = take().value;
        return { type: "unary", op: op, arg: parseUnary() };
      }
      return parsePrimary();
    }
    function parsePrimary() {
      var t = peek();
      var p;
      if (!t) throw new Error("表达式不完整");
      if (t.type === "num") { take(); return { type: "num", value: t.value }; }
      if (t.type === "id") {
        var name = take().value;
        p = peek();
        if (p && p.type === "op" && p.value === "(") {
          take();
          var args = [];
          var p0 = peek();
          if (!(p0 && p0.type === "op" && p0.value === ")")) {
            args.push(parseExpr());
            p = peek();
            while (p && p.type === "op" && p.value === ",") {
              take(); args.push(parseExpr());
              p = peek();
            }
          }
          if (!(peek() && peek().type === "op" && peek().value === ")")) throw new Error("缺少 )");
          take();
          return { type: "call", name: name, args: args };
        }
        return { type: "var", name: name };
      }
      if (t.type === "op" && t.value === "(") {
        take();
        var node = parseExpr();
        if (!(peek() && peek().type === "op" && peek().value === ")")) throw new Error("缺少 )");
        take();
        return node;
      }
      throw new Error("语法错误");
    }

    var ast = parseExpr();
    if (pos !== tokens.length) throw new Error("多余输入");
    return ast;
  }

  function evaluate(node, vars) {
    if (!vars) vars = {};
    switch (node.type) {
      case "num": return node.value;
      case "var":
        if (!(node.name in vars) && !(node.name in CONSTS)) throw new Error("未知变量: " + node.name);
        return node.name in vars ? vars[node.name] : CONSTS[node.name];
      case "unary":
        var v = evaluate(node.arg, vars);
        return node.op === "-" ? -v : v;
      case "bin":
        var a = evaluate(node.left, vars);
        var b = evaluate(node.right, vars);
        if (node.op === "+") return a + b;
        if (node.op === "-") return a - b;
        if (node.op === "*") return a * b;
        if (node.op === "/") { if (b === 0) throw new Error("除以零"); return a / b; }
        if (node.op === "**") return Math.pow(a, b);
        throw new Error("未知运算符");
      case "call":
        var fn = FUNCS[node.name];
        if (!fn) throw new Error("未知函数: " + node.name);
        var outArgs = [];
        for (var ai = 0; ai < node.args.length; ai++) outArgs.push(evaluate(node.args[ai], vars));
        return fn.apply(null, outArgs);
      default: throw new Error("内部错误");
    }
  }

  function compile(src) {
    var ast = parse(tokenize(src));
    return function (vars) {
      var v = evaluate(ast, vars);
      if (!isFinite(v)) throw new Error("结果无效");
      return v;
    };
  }

  window.PhyMath = { compile: compile, evaluate: evaluate, parse: parse, tokenize: tokenize };
})();
