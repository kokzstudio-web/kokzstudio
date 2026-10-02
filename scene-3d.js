async function startScene() {
  const host = document.querySelector('.landing-scene');
  if (!host) return;
  const [THREE, { OrbitControls }, { RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
    import('three'),
    import('three/addons/controls/OrbitControls.js'),
    import('three/addons/geometries/RoundedBoxGeometry.js'),
    import('three/addons/environments/RoomEnvironment.js')
  ]);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x0c0c0c, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', '회전 가능한 카메라, 슬레이트, 편집 타임라인 3D 모델');
  canvas.dataset.interactions = '0';
  host.prepend(canvas);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.8;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x55503a, 2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 4);
  keyLight.position.set(-3, 5, 6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffec97, 2);
  rimLight.position.set(4, 2, -4);
  scene.add(rimLight);
  const material = (color, metalness = 0.2, roughness = 0.35) => new THREE.MeshStandardMaterial({color, metalness, roughness});
  const black = material(0x17191c, 0.35, 0.28);
  const rubber = material(0x080a0c, 0.1, 0.6);
  const yellow = material(0xf5e642, 0.25, 0.3);
  const silver = material(0xb5b9bc, 0.8, 0.2);
  const white = material(0xf4f4ec, 0.15, 0.3);
  const darkGlass = new THREE.MeshPhysicalMaterial({color:0x173744, metalness:0.65, roughness:0.08, clearcoat:1});
  const root = new THREE.Group();
  scene.add(root);
  function box(parent, dimensions, position, mat, radius = 0.06) {
    const safeRadius = Math.min(radius, Math.min(...dimensions) / 2);
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...dimensions, 3, safeRadius), mat);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  }
  function cylinder(parent, radius, depth, position, mat) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 48), mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  }
  function ring(parent, radius, tube, position, mat) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 64), mat);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  }
  const cameraModel = new THREE.Group();
  root.add(cameraModel);
  cameraModel.position.set(-0.1, 0, 0);
  box(cameraModel, [1.85, 1.3, 1.05], [0, 0, 0], black, 0.14);
  box(cameraModel, [0.16, 1.16, 0.93], [0.91, 0.02, 0], yellow, 0.07);
  box(cameraModel, [0.5, 1.1, 0.88], [-0.82, -0.05, -0.05], rubber, 0.16);
  box(cameraModel, [1.6, 0.17, 0.7], [0, -0.72, 0.03], silver);
  box(cameraModel, [0.17, 0.65, 0.2], [-0.45, 0.94, 0], black);
  box(cameraModel, [0.17, 0.65, 0.2], [0.45, 0.94, 0], black);
  box(cameraModel, [1.12, 0.2, 0.26], [0, 1.25, 0], rubber);
  box(cameraModel, [0.48, 0.45, 0.45], [0.5, 0.82, -0.36], black);
  box(cameraModel, [0.3, 0.23, 0.02], [0.5, 0.86, -0.6], darkGlass);
  const lensX = -0.38;
  cylinder(cameraModel, 0.55, 0.77, [lensX, 0, 0.85], rubber);
  cylinder(cameraModel, 0.65, 0.22, [lensX, 0, 1.3], black);
  cylinder(cameraModel, 0.53, 0.035, [lensX, 0, 1.43], darkGlass);
  ring(cameraModel, 0.61, 0.034, [lensX, 0, 1.44], silver);
  ring(cameraModel, 0.49, 0.024, [lensX, 0, 1.46], black);
  ring(cameraModel, 0.57, 0.025, [lensX, 0, 0.69], yellow);
  for (let i = 0; i < 9; i++) ring(cameraModel, 0.55, 0.011, [lensX, 0, 0.75 + i * 0.045], black);
  for (let i = 0; i < 4; i++) cylinder(cameraModel, 0.045, 0.02, [0.46 + i * 0.105, -0.4, 0.55], i === 0 ? yellow : silver);
  const backDisplay = box(cameraModel, [1.05, 0.68, 0.06], [0, 0, -0.56], darkGlass);
  backDisplay.rotation.y = Math.PI;
  const logoTexture = new THREE.TextureLoader().load('assets/kokz-studio-logo-yellow.png');
  logoTexture.colorSpace = THREE.SRGBColorSpace;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.67, 0.335), new THREE.MeshBasicMaterial({map:logoTexture, transparent:true, depthWrite:false}));
  logo.position.set(0.49, 0.18, 0.532);
  cameraModel.add(logo);

  const slate = new THREE.Group();
  slate.position.set(1.22, 1.23, -0.6);
  slate.rotation.z = -0.12;
  root.add(slate);
  box(slate, [1.42, 0.96, 0.16], [0, 0, 0], black);
  box(slate, [1.42, 0.2, 0.17], [0, 0.57, 0], yellow, 0.025);
  for (let i = 0; i < 4; i++) box(slate, [0.22, 0.2, 0.015], [-0.53 + i * 0.35, 0.57, 0.091], black, 0.005).rotation.z = -0.35;
  for (let i = 0; i < 3; i++) box(slate, [1.08, 0.018, 0.01], [0, -0.05 - i * 0.17, 0.089], silver, 0.003);
  const hinge = new THREE.Group();
  hinge.position.set(-0.63, 0.67, 0);
  slate.add(hinge);
  box(hinge, [1.42, 0.22, 0.18], [0.63, 0.1, 0], black, 0.03);
  for (let i = 0; i < 4; i++) box(hinge, [0.21, 0.2, 0.02], [0.13 + i * 0.35, 0.1, 0.1], yellow, 0.005).rotation.z = -0.35;
  cylinder(slate, 0.075, 0.19, [-0.63, 0.65, 0.02], silver);
  hinge.rotation.z = 0.3;

  const editor = new THREE.Group();
  editor.position.set(-0.5, -1.28, 0.76);
  editor.rotation.set(-0.12, -0.18, -0.1);
  root.add(editor);
  box(editor, [1.95, 0.98, 0.16], [0, 0, 0], black, 0.1);
  box(editor, [1.7, 0.75, 0.035], [0.03, 0, 0.09], rubber, 0.04);
  const gray = material(0x60646a, 0.25, 0.5);
  for (let row = 0; row < 3; row++) {
    box(editor, [1.5, 0.013, 0.02], [0.05, 0.22 - row * 0.24, 0.117], gray, 0.002);
    for (let col = 0; col < 4; col++) box(editor, [0.24 + (col % 2) * 0.055, 0.145, 0.055], [-0.52 + col * 0.35, 0.26 - row * 0.23, 0.14], (row + col) % 3 === 0 ? gray : yellow, 0.015);
  }
  const playhead = box(editor, [0.018, 0.72, 0.025], [-0.07, 0, 0.19], white, 0.002);
  for (let i = 0; i < 14; i++) box(editor, [0.01, 0.04, 0.01], [-0.71 + i * 0.11, 0.4, 0.1], silver, 0.001);
  const bounds = new THREE.Box3().setFromObject(root);
  const sphere = bounds.getBoundingSphere(new THREE.Sphere());
  const center = sphere.center.clone();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(center);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = 0.7;
  controls.autoRotateSpeed = 0.5;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.9;
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.ROTATE;
  const homeDirection = new THREE.Vector3(3.3, 2.1, 6.3).normalize();
  let distance = 8;
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const direction = camera.position.clone().sub(controls.target).normalize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
    distance = sphere.radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2) * 1.04;
    camera.position.copy(center).addScaledVector(direction.lengthSq() ? direction : homeDirection, distance);
    renderer.setSize(width, height, false);
    controls.update();
  }
  camera.position.copy(center).addScaledVector(homeDirection, distance);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let lastInteraction = -Infinity;
  let tapStart = -Infinity;
  let visible = true;
  let failed = false;
  const motionButton = host.querySelector('[data-scene-motion]');
  function updateMotionButton() {
    const label = paused ? '자동 회전 재생' : '자동 회전 정지';
    motionButton.title = label;
    motionButton.setAttribute('aria-label', label);
    motionButton.innerHTML = `<i data-lucide="${paused ? 'play' : 'pause'}"></i>`;
    window.lucide?.createIcons();
  }
  updateMotionButton();
  motionButton.addEventListener('click', () => { paused = !paused; updateMotionButton(); });
  function reset() {
    root.rotation.set(0, 0, 0);
    camera.position.copy(center).addScaledVector(homeDirection, distance);
    controls.target.copy(center);
    lastInteraction = performance.now();
    controls.update();
  }
  host.querySelector('[data-scene-reset]').addEventListener('click', reset);
  controls.addEventListener('start', () => {
    lastInteraction = performance.now();
    canvas.dataset.interactions = String(Number(canvas.dataset.interactions) + 1);
  });
  controls.addEventListener('end', () => { lastInteraction = performance.now(); });
  let pointerStart;
  canvas.addEventListener('pointerdown', event => { pointerStart = {x:event.clientX, y:event.clientY, time:performance.now()}; });
  canvas.addEventListener('pointerup', event => {
    if (pointerStart && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) < 8 && performance.now() - pointerStart.time < 500) tapStart = performance.now();
    pointerStart = null;
  });
  canvas.addEventListener('keydown', event => {
    const step = 0.12;
    if (event.key === 'ArrowLeft') root.rotation.y -= step;
    else if (event.key === 'ArrowRight') root.rotation.y += step;
    else if (event.key === 'ArrowUp') root.rotation.x -= step;
    else if (event.key === 'ArrowDown') root.rotation.x += step;
    else if (event.key === 'Home') reset();
    else return;
    event.preventDefault();
    lastInteraction = performance.now();
  });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    failed = true;
    delete host.dataset.ready;
    host.querySelector('.scene-controls').hidden = true;
    renderer.setAnimationLoop(null);
  });
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  observer.observe(host);
  let lastFrame = 0;
  renderer.setAnimationLoop(now => {
    if (failed || !visible || document.hidden || now - lastFrame < 30) return;
    const delta = Math.min((now - lastFrame) / 1000, 0.1);
    lastFrame = now;
    controls.autoRotate = !paused && now - lastInteraction > 5000;
    controls.update(delta);
    const tapTime = (now - tapStart) / 1000;
    hinge.rotation.z = tapTime < 0.8 ? 0.05 + Math.abs(Math.sin(tapTime * Math.PI * 3)) * 0.55 : 0.3;
    root.position.y = !paused ? Math.sin(now * 0.001) * 0.035 : 0;
    playhead.position.x = !paused ? -0.07 + Math.sin(now * 0.0008) * 0.5 : -0.07;
    renderer.render(scene, camera);
    canvas.dataset.view = camera.position.toArray().map(value => value.toFixed(3)).join(',');
    if (!host.dataset.ready) {
      host.dataset.ready = 'true';
      host.querySelector('.scene-controls').hidden = false;
    }
  });
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    observer.disconnect();
    controls.dispose();
    scene.traverse(object => {
      object.geometry?.dispose();
      if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(mat => mat.dispose());
    });
    logoTexture.dispose();
    environment.dispose();
    renderer.dispose();
  });
}
startScene().catch(error => {
  console.warn('3D scene unavailable; displaying fallback artwork.', error);
  const host = document.querySelector('.landing-scene');
  if (host) {
    host.querySelector('canvas')?.remove();
    delete host.dataset.ready;
    host.querySelector('.scene-controls').hidden = true;
  }
});
