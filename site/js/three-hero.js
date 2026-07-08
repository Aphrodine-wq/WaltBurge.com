// three-hero.js — the hero object: one clean, low-poly laptop. Graphite body,
// a single cobalt accent (the screen), soft studio light on the cream page.
// Gentle idle float + a few degrees of tilt toward the cursor. One small object
// (~a few hundred triangles) — cheap enough to hold 60fps anywhere. Pauses
// off-screen / hidden tab; one static frame under reduced motion.
import * as THREE from 'three';

const INK = 0x33353c;        // graphite body (light enough to read form on cream)
const BEZEL = 0x1c1d22;      // darker screen frame
const COBALT = 0x2563eb;     // the one accent — the screen

function buildLaptop() {
  const laptop = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.52, metalness: 0.22 });
  const bezelMat = new THREE.MeshStandardMaterial({ color: BEZEL, roughness: 0.5, metalness: 0.25 });
  const screenMat = new THREE.MeshStandardMaterial({
    color: COBALT, emissive: COBALT, emissiveIntensity: 0.3, roughness: 0.4, metalness: 0,
  });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 });

  const W = 3.4, BASE_D = 2.3, BASE_H = 0.14;

  // Base / keyboard deck
  const base = new THREE.Mesh(new THREE.BoxGeometry(W, BASE_H, BASE_D), bodyMat);
  base.position.y = BASE_H / 2;
  laptop.add(base, new THREE.LineSegments(new THREE.EdgesGeometry(base.geometry), edgeMat).translateY(BASE_H / 2));

  // Keyboard well + trackpad — subtle recessed detail
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.86, BASE_D * 0.62), bezelMat);
  deck.rotation.x = -Math.PI / 2;
  deck.position.set(0, BASE_H + 0.001, -BASE_D * 0.08);
  laptop.add(deck);
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.26, BASE_D * 0.2), bodyMat);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, BASE_H + 0.002, BASE_D * 0.34);
  laptop.add(pad);

  // Lid — hinged at the back edge of the base, opened past vertical
  const hinge = new THREE.Group();
  hinge.position.set(0, BASE_H, -BASE_D / 2 + 0.03);
  laptop.add(hinge);

  const LID_H = 2.15, LID_T = 0.09;
  const lid = new THREE.Mesh(new THREE.BoxGeometry(W, LID_H, LID_T), bezelMat);
  lid.position.y = LID_H / 2;
  hinge.add(lid, new THREE.LineSegments(new THREE.EdgesGeometry(lid.geometry), edgeMat).translateY(LID_H / 2));

  // The screen — the cobalt accent, inset into the lid, facing the viewer
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.9, LID_H * 0.82), screenMat);
  screen.position.set(0, LID_H / 2, LID_T / 2 + 0.006);
  hinge.add(screen);

  hinge.rotation.x = -0.28;   // lid ~106° open — stands up, leans slightly back

  laptop.rotation.y = -0.5;   // 3/4 view
  return laptop;
}

export function initHero(canvasHost) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75)); // cap for retina perf
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0.6, 2.0, 7.4);
  camera.lookAt(0, 0.7, 0);

  // Soft studio light — moderate ambient so the dark body keeps its shading
  // gradients (form) on the cream page, one key from upper-left, a cool fill.
  scene.add(new THREE.AmbientLight(0xffffff, 0.62));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(-4, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xdfe6ff, 0.55);
  fill.position.set(5, 2.5, 3);
  scene.add(fill);

  const laptop = buildLaptop();
  scene.add(laptop);

  const baseRotY = laptop.rotation.y;

  function resize() {
    const w = canvasHost.clientWidth || 1;
    const h = canvasHost.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Cursor tilt — a few degrees, eased
  const target = new THREE.Vector2(0, 0);
  function onMove(e) {
    const r = renderer.domElement.getBoundingClientRect();
    target.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  }
  if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

  let running = true, raf = 0, t0 = 0;
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }, { threshold: 0 });
  io.observe(canvasHost);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

  const curTilt = new THREE.Vector2(0, 0);

  function loop(now) {
    if (!running || document.hidden) { cancelAnimationFrame(raf); return; }
    raf = requestAnimationFrame(loop);
    now = now || performance.now();
    if (!t0) t0 = now;
    const t = (now - t0) / 1000;

    curTilt.lerp(target, 0.06);
    // idle float + slow sway, layered with cursor tilt
    laptop.rotation.y = baseRotY + Math.sin(t * 0.35) * 0.12 + curTilt.x * 0.35;
    laptop.rotation.x = curTilt.y * -0.12;
    laptop.position.y = Math.sin(t * 0.6) * 0.08;

    renderer.render(scene, camera);
  }

  if (reduce) renderer.render(scene, camera);
  else loop();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
