(() => {
  const viewport = document.getElementById("model-viewport");
  const statusEl = document.getElementById("model-status");
  const uploadZone = document.getElementById("upload-zone");
  const fileInput = document.getElementById("file-input");
  const clipSlider = document.getElementById("clip-slider");
  const clipVal = document.getElementById("clip-val");
  const infoPanel = document.getElementById("model-info");
  let currentImage = null;
  let meshGroup = null;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1628);
  scene.fog = new THREE.Fog(0x0a1628, 8, 24);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 2.5, 4.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.localClippingEnabled = true;
  viewport.insertBefore(renderer.domElement, viewport.firstChild);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0.3, 0);

  scene.add(new THREE.AmbientLight(0x8899bb, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x3ad6c1, 0.35);
  fill.position.set(-4, 2, -2);
  scene.add(fill);

  const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  function buildFromImage(img) {
    if (meshGroup) {
      scene.remove(meshGroup);
      meshGroup.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
    }

    const res = Number(document.getElementById("mesh-res").value) || 64;
    const hScale = Number(document.getElementById("height-scale").value) || 0.6;
    const wire = document.getElementById("show-wire").checked;

    const canvas = document.createElement("canvas");
    canvas.width = res;
    canvas.height = res;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, res, res);
    const data = ctx.getImageData(0, 0, res, res).data;

    const geo = new THREE.PlaneGeometry(3, 3, res - 1, res - 1);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i += 1) {
      const px = i % res;
      const py = Math.floor(i / res);
      const idx = (py * res + px) * 4;
      const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
      pos.setY(i, lum * hScale);
    }
    geo.computeVertexNormals();

    const colors = [];
    for (let i = 0; i < pos.count; i += 1) {
      const h = pos.getY(i) / hScale;
      const c = new THREE.Color().setHSL(0.55 - h * 0.35, 0.65, 0.35 + h * 0.25);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlane],
      wireframe: wire,
      shininess: 30,
    });

    meshGroup = new THREE.Group();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = "高度场主体";
    mesh.userData = {
      title: "高度场主体",
      desc: `由图片亮度生成 · 分辨率 ${res}×${res} · 高度缩放 ${hScale}`,
    };
    meshGroup.add(mesh);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.65, 0.08, 48),
      new THREE.MeshPhongMaterial({ color: 0x1e3a5f, clippingPlanes: [clipPlane] })
    );
    base.position.y = -0.04;
    base.name = "底座";
    base.userData = { title: "底座", desc: "托举模型的结构底座，可替换为你的装配约束。" };
    meshGroup.add(base);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.03, 8, 64),
      new THREE.MeshPhongMaterial({ color: 0x3ad6c1, emissive: 0x0a4038, clippingPlanes: [clipPlane] })
    );
    ring.position.y = 0.02;
    ring.name = "参考环";
    ring.userData = { title: "参考环", desc: "示意性磁约束环 / 框架，点击可查看。" };
    meshGroup.add(ring);

    scene.add(meshGroup);
    statusEl.textContent = `模型已生成 · ${img.width}×${img.height}px`;
    statusEl.className = "studio-status ok";
  }

  function updateClip() {
    const pct = Number(clipSlider.value);
    clipVal.textContent = `${pct}%`;
    clipPlane.constant = (pct / 100) * 1.2;
  }

  function onPointerDown(e) {
    if (!meshGroup) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(meshGroup.children, true);
    if (hits.length) {
      const obj = hits[0].object;
      document.getElementById("info-title").textContent = obj.userData.title || obj.name;
      document.getElementById("info-desc").textContent = obj.userData.desc || "—";
      infoPanel.classList.add("is-open");
    }
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

  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("is-drag");
  });
  uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("is-drag"));
  uploadZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    uploadZone.classList.remove("is-drag");
    const file = e.dataTransfer.files[0];
    if (file && file.type && file.type.startsWith("image/")) {
      currentImage = await loadImage(file);
      buildFromImage(currentImage);
    }
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (file) {
      currentImage = await loadImage(file);
      buildFromImage(currentImage);
    }
  });
  document.getElementById("btn-rebuild").addEventListener("click", () => {
    if (currentImage) buildFromImage(currentImage);
  });
  clipSlider.addEventListener("input", updateClip);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  updateClip();
  resize();
  animate();
  window.addEventListener("resize", resize);

  // 默认演示图（程序化）
  const demo = document.createElement("canvas");
  demo.width = demo.height = 128;
  const dctx = demo.getContext("2d");
  const g = dctx.createRadialGradient(64, 64, 10, 64, 64, 60);
  g.addColorStop(0, "#fff");
  g.addColorStop(0.5, "#3ad6c1");
  g.addColorStop(1, "#0a1628");
  dctx.fillStyle = g;
  dctx.fillRect(0, 0, 128, 128);
  const demoImg = new Image();
  demoImg.onload = () => {
    currentImage = demoImg;
    buildFromImage(demoImg);
  };
  demoImg.src = demo.toDataURL();
})();
