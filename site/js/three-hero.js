// ============================================================================
// three-hero.js — the survey-drawing terrain, rebuilt in Three.js.
// A wireframe mesh displaced by fbm noise: ink contour lines on cream paper,
// drifting toward the viewer, tilting a few degrees toward the cursor, with a
// cobalt surveyor's-lamp glow that follows the pointer. On load it draws itself
// in from the foreground toward the horizon. Pauses off-screen / hidden tab /
// under reduced motion.
// ============================================================================
import * as THREE from 'three';

const INK = new THREE.Color(0x1a1a1a);
const COBALT = new THREE.Color(0x2563eb);

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uTilt;     // lerped pointer, [-1,1]
  uniform float uReveal;   // 0..1 draw-in sweep, foreground -> horizon
  varying float vDepth;    // 0 near .. 1 far
  varying float vHeight;
  varying vec2  vNdc;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main(){
    // geometry arrives in the XZ plane: position.x in [-14,14], position.z in [0,26]
    float depth01 = clamp(position.z / 26.0, 0.0, 1.0);
    vDepth = depth01;

    // terrain scrolls toward the viewer
    vec2 field = vec2(position.x * 0.16, (position.z + uTime * 0.55) * 0.16);
    float h = fbm(field);
    // flatten the foreground so lines never crowd the headline
    float relief = smoothstep(0.05, 0.75, depth01);
    float y = (h - 0.42) * 5.2 * relief;
    vHeight = h;

    vec3 pos = vec3(position.x, y, -position.z);
    // cursor parallax — a gentle shear, stronger toward the horizon
    pos.x += uTilt.x * depth01 * 1.4;
    pos.y += uTilt.y * depth01 * 0.7;

    // draw-in: rows past the reveal front are pushed down + hidden (alpha in frag)
    float front = uReveal * 1.15;
    float hidden = smoothstep(front, front + 0.12, depth01);
    pos.y -= hidden * 6.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    vNdc = gl_Position.xy / gl_Position.w;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec3  uInk;
  uniform vec3  uCobalt;
  uniform vec2  uMouse;    // pointer in NDC [-1,1]
  uniform float uReveal;
  varying float vDepth;
  varying float vHeight;
  varying vec2  vNdc;

  void main(){
    // ink lines fade toward the horizon
    float fade = 1.0 - smoothstep(0.15, 1.0, vDepth);
    float alpha = fade * 0.55;

    // hide rows beyond the draw-in front
    float front = uReveal * 1.15;
    alpha *= 1.0 - smoothstep(front, front + 0.12, vDepth);

    // cobalt surveyor's lamp following the cursor
    float d = distance(vNdc, uMouse);
    float glow = smoothstep(0.55, 0.0, d);
    vec3 col = mix(uInk, uCobalt, glow * 0.9);
    alpha += glow * 0.28 * fade;

    // ridge lines pick up a touch of cobalt on the peaks
    col = mix(col, uCobalt, smoothstep(0.62, 0.9, vHeight) * 0.25);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function initHeroTerrain(canvasHost) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // cream page shows through
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
  camera.position.set(0, 3.4, 8.0);
  camera.rotation.x = -0.26; // pitch down toward the field

  // grid plane in XZ: x[-14,14], z[0,26], well subdivided for smooth contours
  const geo = new THREE.PlaneGeometry(28, 26, 120, 90);
  geo.rotateX(-Math.PI / 2);           // lie flat
  geo.translate(0, 0, 13);             // z from 0 (near) to 26 (far)

  const uniforms = {
    uTime:   { value: 0 },
    uTilt:   { value: new THREE.Vector2(0, 0) },
    uReveal: { value: reduce ? 1 : 0 },
    uInk:    { value: INK },
    uCobalt: { value: COBALT },
    uMouse:  { value: new THREE.Vector2(0.4, -0.2) },
  };

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    wireframe: true,
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // ---- sizing --------------------------------------------------------------
  function resize() {
    const w = canvasHost.clientWidth || window.innerWidth;
    const h = canvasHost.clientHeight || Math.round(window.innerHeight * 0.68);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- pointer parallax + lamp --------------------------------------------
  const target = new THREE.Vector2(0, 0);
  const mouseNdc = new THREE.Vector2(0.4, -0.2);
  function onMove(e) {
    const r = renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    target.set(nx, ny);
    mouseNdc.set(nx, ny);
  }
  if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

  // ---- run/pause -----------------------------------------------------------
  let running = true, raf = 0, t0 = 0, revealStart = -1;
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }, { threshold: 0 });
  io.observe(canvasHost);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) loop();
  });

  function loop(now) {
    if (!running || document.hidden) { cancelAnimationFrame(raf); return; }
    raf = requestAnimationFrame(loop);
    now = now || performance.now();
    if (!t0) t0 = now;
    const t = (now - t0) / 1000;
    uniforms.uTime.value = t;

    // ease the pointer tilt + lamp
    uniforms.uTilt.value.lerp(target, 0.05);
    uniforms.uMouse.value.lerp(mouseNdc, 0.08);

    // draw-in over ~1.6s
    if (!reduce) {
      if (revealStart < 0) revealStart = now;
      uniforms.uReveal.value = Math.min(1, (now - revealStart) / 1600);
    }
    renderer.render(scene, camera);
  }

  if (reduce) { renderer.render(scene, camera); }   // one static frame
  else loop();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      geo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
