import React, { useEffect, useRef } from 'react';

/**
 * TerrainField — a wireframe survey-drawing landscape, rendered in raw WebGL.
 * Zero dependencies (~9KB). Ink/cobalt lines on the cream page, drifting slowly,
 * tilting a few degrees toward the cursor. Static frame under reduced motion;
 * paused while off-screen or in a hidden tab.
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

const FRAG = `
precision mediump float;
uniform vec3 uInk;
uniform vec3 uCobalt;
varying float vHeight;
varying float vDepth;

void main() {
  // ridges pick up cobalt; valleys stay ink
  vec3 color = mix(uInk, uCobalt, smoothstep(0.40, 0.66, vHeight));
  // fade with distance (into the cream page) and slightly at the near edge
  float alpha = (1.0 - smoothstep(0.55, 1.0, vDepth)) * smoothstep(0.0, 0.12, vDepth);
  gl_FragColor = vec4(color, alpha * 0.5);
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
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
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
    const ext = gl.getExtension('OES_element_index_uint'); // universal since ~2013
    if (!ext) { console.warn('[terrain] uint index extension missing'); return; }

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const aGrid = gl.getAttribLocation(prog, 'aGrid');
    gl.enableVertexAttribArray(aGrid);
    gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0);

    const uAspect = gl.getUniformLocation(prog, 'uAspect');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uTilt = gl.getUniformLocation(prog, 'uTilt');
    gl.uniform3f(gl.getUniformLocation(prog, 'uInk'), 0.10, 0.10, 0.10); // #1A1A1A
    gl.uniform3f(gl.getUniformLocation(prog, 'uCobalt'), 0.145, 0.388, 0.922); // #2563EB

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Size handling lives in a ResizeObserver — the render loop never touches
    // the DOM (clientWidth reads per frame force layout and murder high-Hz).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform1f(uAspect, w / h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
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
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uTilt, tilt.x, tilt.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
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
        gl.deleteBuffer(vbo); gl.deleteBuffer(ibo); gl.deleteProgram(prog);
      };
    }
    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      gl.deleteBuffer(vbo); gl.deleteBuffer(ibo); gl.deleteProgram(prog);
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
