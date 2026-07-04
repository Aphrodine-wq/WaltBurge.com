import React, { useEffect, useRef } from 'react';

/**
 * TerrainField — a survey-drawing landscape, rendered in raw WebGL.
 * Zero dependencies (~11KB). Ink/cobalt on the cream page, drifting slowly,
 * tilting a few degrees toward the cursor. Three layers give it depth:
 * the wireframe mesh, topographic contour lines cut through the same height
 * field, and a cobalt surveyor's-lamp glow that follows the cursor. On load
 * the drawing sketches itself in from the foreground toward the horizon.
 * Static frame under reduced motion; paused while off-screen or hidden tab.
 */

const VERT = `
attribute vec2 aGrid;            // grid position in [-1,1] x [0,1] (x, depth)
uniform float uAspect;
uniform float uTime;
uniform vec2 uTilt;              // lerped mouse, [-1,1]
varying float vHeight;
varying float vDepth;

// value noise + fbm — cheap, stable across mobile GPUs
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  // world: x spans [-14,14], z runs away from camera [0,26]
  float x = aGrid.x * 14.0;
  float z = aGrid.y * 26.0;
  // terrain scrolls toward the viewer, very slowly
  vec2 field = vec2(x * 0.16, (z + uTime * 0.55) * 0.16);
  float h = fbm(field);
  // flatten the foreground so lines never crowd the headline
  float relief = smoothstep(0.05, 0.75, aGrid.y);
  float y = (h - 0.42) * 5.2 * relief;

  vHeight = h;
  vDepth = aGrid.y;

  vec3 pos = vec3(x, y, -z);
  // cursor parallax — a couple of degrees, applied as a shear so it stays cheap
  pos.x += uTilt.x * aGrid.y * 1.4;
  pos.y += uTilt.y * aGrid.y * 0.7;

  // camera, spelled out: translate to eye, pitch down, perspective-project
  vec3 p = pos - vec3(0.0, 3.4, 4.0);
  float ca = cos(0.26), sa = sin(0.26);
  p = vec3(p.x, ca * p.y - sa * p.z, sa * p.y + ca * p.z);
  float f = 1.0 / tan(0.31);       // ~35.5deg vertical fov
  float near = 0.1, far = 60.0;
  gl_Position = vec4(
    p.x * f / uAspect,
    p.y * f,
    ((far + near) * p.z + 2.0 * far * near) / (near - far),
    -p.z
  );
}
`;

// Fragment shader is assembled at init: contour-line width uses hardware
// derivatives when the extension exists, a fixed width when it doesn't.
const frag = (hasDeriv: boolean) => `
${hasDeriv ? '#extension GL_OES_standard_derivatives : enable' : ''}
precision mediump float;
uniform vec3 uInk;
uniform vec3 uCobalt;
uniform float uMode;    // 0 = wireframe pass, 1 = contour pass
uniform float uReveal;  // load sweep, foreground -> horizon, 0..1.2
uniform vec2 uSpot;     // cursor spotlight in device px (y up); x < 0 = off
uniform float uSpotR;   // spotlight radius in device px
varying float vHeight;
varying float vDepth;

void main() {
  // ridges pick up cobalt; valleys stay ink
  vec3 color = mix(uInk, uCobalt, smoothstep(0.42, 0.64, vHeight));
  // fade with distance (into the cream page) and slightly at the near edge
  float fade = (1.0 - smoothstep(0.55, 1.0, vDepth)) * smoothstep(0.0, 0.12, vDepth);
  // the drawing sketches itself in, front to back, on load
  fade *= smoothstep(vDepth - 0.16, vDepth + 0.02, uReveal);

  float alpha;
  if (uMode < 0.5) {
    alpha = fade * 0.30;
  } else {
    // topographic iso-lines cut through the height field at fixed elevations
    float bands = vHeight * 14.0;
    float t = abs(fract(bands + 0.5) - 0.5);
    ${hasDeriv
      ? 'float w = fwidth(bands);\n    float line = 1.0 - smoothstep(w * 0.7, w * 1.8, t);'
      : 'float line = 1.0 - smoothstep(0.02, 0.07, t);'}
    alpha = line * fade * 0.5;
  }

  // surveyor's lamp — a cobalt pool of light under the cursor
  if (uSpot.x >= 0.0) {
    float d = distance(gl_FragCoord.xy, uSpot) / uSpotR;
    float g = exp(-d * d * 2.5);
    color = mix(color, uCobalt, g * 0.55);
    alpha *= 1.0 + g * 1.4;
  }

  gl_FragColor = vec4(color, alpha);
}
`;

export const TerrainField: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      // high-Hz friendly: no compositor sync stalls, no power-save throttling
      desynchronized: true,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) { console.warn('[terrain] WebGL unavailable — skipping hero background'); return; }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const COLS = coarse ? 72 : 120;
    const ROWS = coarse ? 44 : 70;

    const deriv = gl.getExtension('OES_standard_derivatives');

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.warn('[terrain] shader compile failed:', gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag(!!deriv)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[terrain] program link failed:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // grid vertices + line indices (rows and columns → the survey mesh)
    const verts = new Float32Array(COLS * ROWS * 2);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        verts[(r * COLS + c) * 2] = (c / (COLS - 1)) * 2 - 1;
        verts[(r * COLS + c) * 2 + 1] = r / (ROWS - 1);
      }
    const idx: number[] = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS - 1; c++) idx.push(r * COLS + c, r * COLS + c + 1);
    for (let c = 0; c < COLS; c++)
      for (let r = 0; r < ROWS - 1; r++) idx.push(r * COLS + c, (r + 1) * COLS + c);
    const indices = new Uint32Array(idx);
    // triangle indices for the contour pass — same grid, filled
    const tidx: number[] = [];
    for (let r = 0; r < ROWS - 1; r++)
      for (let c = 0; c < COLS - 1; c++) {
        const i = r * COLS + c;
        tidx.push(i, i + 1, i + COLS, i + 1, i + COLS + 1, i + COLS);
      }
    const triIndices = new Uint32Array(tidx);
    const ext = gl.getExtension('OES_element_index_uint'); // universal since ~2013
    if (!ext) { console.warn('[terrain] uint index extension missing'); return; }

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    const tibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triIndices, gl.STATIC_DRAW);

    const aGrid = gl.getAttribLocation(prog, 'aGrid');
    gl.enableVertexAttribArray(aGrid);
    gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0);

    const uAspect = gl.getUniformLocation(prog, 'uAspect');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uTilt = gl.getUniformLocation(prog, 'uTilt');
    const uMode = gl.getUniformLocation(prog, 'uMode');
    const uReveal = gl.getUniformLocation(prog, 'uReveal');
    const uSpot = gl.getUniformLocation(prog, 'uSpot');
    const uSpotR = gl.getUniformLocation(prog, 'uSpotR');
    gl.uniform3f(gl.getUniformLocation(prog, 'uInk'), 0.10, 0.10, 0.10); // #1A1A1A
    gl.uniform3f(gl.getUniformLocation(prog, 'uCobalt'), 0.145, 0.388, 0.922); // #2563EB
    gl.uniform2f(uSpot, -1, -1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Size handling lives in a ResizeObserver — the render loop never touches
    // the DOM (clientWidth reads per frame force layout and murder high-Hz).
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform1f(uAspect, w / h);
        gl.uniform1f(uSpotR, h * 0.32);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const mousePx = { x: -1, y: -1 };
    const spot = { x: -1, y: -1 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      // spotlight target in device px, y up (gl_FragCoord space)
      const r = canvas.getBoundingClientRect();
      mousePx.x = (e.clientX - r.left) * dpr;
      mousePx.y = (r.height - (e.clientY - r.top)) * dpr;
      if (spot.x < 0) { spot.x = mousePx.x; spot.y = mousePx.y; } // no fly-in on first move
    };
    if (!coarse && !reducedMotion) window.addEventListener('mousemove', onMouse, { passive: true });

    gl.clearColor(0, 0, 0, 0); // static state — set once, not per frame

    let raf = 0;
    let running = false;
    let start = performance.now();
    let last = start;
    const frame = (now: number) => {
      // dt-normalized smoothing: identical cursor feel at 60Hz and 240Hz+
      const dt = Math.min(now - last, 100);
      last = now;
      const k = 1 - Math.exp(-dt * 0.0028);
      tilt.x += (mouse.x - tilt.x) * k;
      tilt.y += (-mouse.y * 0.6 - tilt.y) * k;
      if (mousePx.x >= 0) {
        const ks = 1 - Math.exp(-dt * 0.006);
        spot.x += (mousePx.x - spot.x) * ks;
        spot.y += (mousePx.y - spot.y) * ks;
      }
      // draw-in: ease-out sweep over ~1.6s, front of the field to the horizon
      const tr = reducedMotion ? 1 : Math.min(1, (now - start) / 1600);
      const reveal = 1.2 * (1 - Math.pow(1 - tr, 3));
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uTilt, tilt.x, tilt.y);
      gl.uniform1f(uReveal, reveal);
      gl.uniform2f(uSpot, spot.x, spot.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // contour fill first, wireframe over it
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tibo);
      gl.uniform1f(uMode, 1);
      gl.drawElements(gl.TRIANGLES, triIndices.length, gl.UNSIGNED_INT, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.uniform1f(uMode, 0);
      gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_INT, 0);
      if (running) raf = requestAnimationFrame(frame);
    };

    const setRunning = (on: boolean) => {
      if (on === running) return;
      running = on;
      if (on) { last = performance.now(); raf = requestAnimationFrame(frame); }
      else cancelAnimationFrame(raf);
    };

    canvas.style.opacity = '1'; // fade in via the CSS transition below
    if (reducedMotion) {
      frame(start); // one static frame, no loop
    } else {
      // animate only while visible AND the tab is foreground
      let onScreen = true;
      const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; setRunning(onScreen && !document.hidden); });
      io.observe(canvas);
      const onVis = () => setRunning(onScreen && !document.hidden);
      document.addEventListener('visibilitychange', onVis);
      setRunning(true);
      return () => {
        io.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('mousemove', onMouse);
        setRunning(false);
        gl.deleteBuffer(vbo); gl.deleteBuffer(ibo); gl.deleteBuffer(tibo); gl.deleteProgram(prog);
      };
    }
    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      gl.deleteBuffer(vbo); gl.deleteBuffer(ibo); gl.deleteBuffer(tibo); gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity: 0, transition: 'opacity 1.4s ease 0.15s', width: '100%', height: '100%', display: 'block' }}
    />
  );
};
