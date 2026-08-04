(() => {
  const viewport = document.getElementById("plot3d-viewport");
  const exprInput = document.getElementById("expr-f");
  const statusEl = document.getElementById("plot-status");
  let wireframe = false;
  let showEdges = true;
  let surfaceMesh = null;
  let edgeLines = null;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1016);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(6, 5, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  viewport.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const dir = new THREE.DirectionalLight(0xffffff, 0.85);
  dir.position.set(4, 8, 6);
  scene.add(dir);

  const axes = new THREE.AxesHelper(4);
  scene.add(axes);

  const grid = new THREE.GridHelper(8, 16, 0x3ac4c4, 0x1a2a33);
  grid.rotation.x = Math.PI / 2;
  scene.add(grid);

  function parseRange(str, fallback) {
    const parts = String(str).split(",").map((s) => Number(s.trim()));
    if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n))) return fallback;
    return parts;
  }

  function colorMap(t) {
    const c = new THREE.Color();
    c.setHSL(0.72 - t * 0.55, 0.75, 0.35 + t * 0.25);
    return c;
  }

  function buildSurface() {
    if (surfaceMesh) {
      scene.remove(surfaceMesh);
      surfaceMesh.geometry.dispose();
      surfaceMesh.material.dispose();
      surfaceMesh = null;
    }
    if (edgeLines) {
      scene.remove(edgeLines);
      edgeLines.geometry.dispose();
      edgeLines.material.dispose();
      edgeLines = null;
    }

    let fn;
    try {
      fn = PhyMath.compile(exprInput.value);
    } catch (err) {
      statusEl.textContent = `表达式错误: ${err.message}`;
      statusEl.className = "studio-status err";
      return;
    }

    const [xMin, xMax] = parseRange(document.getElementById("range-x").value, [-3, 3]);
    const [yMin, yMax] = parseRange(document.getElementById("range-y").value, [-3, 3]);
    const n = Math.min(120, Math.max(20, Number(document.getElementById("grid-n").value) || 60));
    const zScale = Number(document.getElementById("z-scale").value) || 1;

    const geo = new THREE.BufferGeometry();
    const verts = [];
    const colors = [];
    const indices = [];
    let zMin = Infinity;
    let zMax = -Infinity;
    const zGrid = [];

    for (let j = 0; j <= n; j += 1) {
      const row = [];
      const y = yMin + (j / n) * (yMax - yMin);
      for (let i = 0; i <= n; i += 1) {
        const x = xMin + (i / n) * (xMax - xMin);
        let z = 0;
        try {
          z = fn({ x, y }) * zScale;
        } catch {
          z = NaN;
        }
        row.push(z);
        if (Number.isFinite(z)) {
          zMin = Math.min(zMin, z);
          zMax = Math.max(zMax, z);
        }
      }
      zGrid.push(row);
    }

    for (let j = 0; j <= n; j += 1) {
      for (let i = 0; i <= n; i += 1) {
        const x = xMin + (i / n) * (xMax - xMin);
        const y = yMin + (j / n) * (yMax - yMin);
        const z = zGrid[j][i];
        const zv = Number.isFinite(z) ? z : 0;
        verts.push(x, y, zv);
        const t = zMax > zMin && Number.isFinite(z) ? (z - zMin) / (zMax - zMin) : 0.5;
        const c = colorMap(t);
        colors.push(c.r, c.g, c.b);
      }
    }

    for (let j = 0; j < n; j += 1) {
      for (let i = 0; i < n; i += 1) {
        const a = j * (n + 1) + i;
        const b = a + 1;
        const c = a + (n + 1);
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    const mat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      wireframe,
      shininess: 20,
    });
    surfaceMesh = new THREE.Mesh(geo, mat);
    scene.add(surfaceMesh);

    if (showEdges && !wireframe) {
      const edges = new THREE.EdgesGeometry(geo, 15);
      edgeLines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.25 })
      );
      scene.add(edgeLines);
    }

    statusEl.textContent = `已绘制 · z ∈ [${zMin.toFixed(3)}, ${zMax.toFixed(3)}] · 网格 ${n}×${n}`;
    statusEl.className = "studio-status ok";
  }

  function resize() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", resize);
  document.getElementById("btn-graph").addEventListener("click", buildSurface);
  exprInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buildSurface();
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    camera.position.set(6, 5, 7);
    controls.target.set(0, 0, 0);
    controls.update();
  });
  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    camera.position.multiplyScalar(0.85);
  });
  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    camera.position.multiplyScalar(1.15);
  });
  document.getElementById("btn-wire").addEventListener("click", () => {
    wireframe = !wireframe;
    buildSurface();
  });
  document.getElementById("btn-edges").addEventListener("click", () => {
    showEdges = !showEdges;
    buildSurface();
  });
  document.getElementById("btn-clear").addEventListener("click", () => {
    if (surfaceMesh) scene.remove(surfaceMesh);
    if (edgeLines) scene.remove(edgeLines);
    surfaceMesh = edgeLines = null;
    statusEl.textContent = "已清除";
    statusEl.className = "studio-status";
  });

  resize();
  buildSurface();
  animate();
})();
