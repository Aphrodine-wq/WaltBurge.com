// hero-signal.js — the hero visual: incoming signals, caught.
// Neutral ink "signals" (calls / leads) drift in from the edges toward a central
// node; each one that arrives is CAUGHT — the node fires a cobalt pulse ring and
// the signal is absorbed. Nothing is ever missed. Pure 2D canvas (no WebGL),
// cheap enough to be free. Pauses off-screen / hidden tab; a static frame under
// reduced motion.

const INK = '26, 26, 26';       // rgb, composed with alpha
const COBALT = '37, 99, 235';

export function initHero(host) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  host.appendChild(canvas);

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, node = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };        // cursor-drift target for the node
  let maxR = 0;

  function resize() {
    W = host.clientWidth || 1;
    H = host.clientHeight || 1;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    node.x = target.x = W * 0.5;
    node.y = target.y = H * 0.5;
    maxR = Math.hypot(W, H) * 0.62;     // spawn radius — just past the corners
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- deterministic-ish PRNG (varied without Math.random dependence issues)
  let seed = 20260708;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

  // ---- entities ------------------------------------------------------------
  const signals = [];   // { ang, t, dur }  t: 0 at edge → 1 at node
  const pulses = [];    // { r, life, age }
  let nextSpawn = 0.4;

  function spawnSignal() {
    signals.push({ ang: rnd() * Math.PI * 2, t: 0, dur: 1.6 + rnd() * 1.4 });
  }

  // one steady already-caught pulse on load, so it opens with life
  function seedPulse() { pulses.push({ r: 0, life: 0.9, age: 0 }); }

  const pos = (ang, t) => {
    // ease-in: signals accelerate slightly as they're "answered"
    const e = t * t * (3 - 2 * t);
    const r = maxR * (1 - e);
    return { x: node.x + Math.cos(ang) * r, y: node.y + Math.sin(ang) * r };
  };

  function draw(dt, time) {
    ctx.clearRect(0, 0, W, H);

    // node drifts gently toward the cursor
    node.x += (target.x - node.x) * 0.05;
    node.y += (target.y - node.y) * 0.05;

    // ---- incoming signals: ink comet + short trailing line ----------------
    for (let i = signals.length - 1; i >= 0; i--) {
      const s = signals[i];
      s.t += dt / s.dur;
      if (s.t >= 1) { signals.splice(i, 1); pulses.push({ r: 0, life: 0.9, age: 0 }); continue; }
      const p = pos(s.ang, s.t);
      const tail = pos(s.ang, Math.max(0, s.t - 0.09));
      const fade = Math.min(1, s.t * 1.6) * (1 - s.t * 0.2);
      const grad = ctx.createLinearGradient(tail.x, tail.y, p.x, p.y);
      grad.addColorStop(0, `rgba(${INK}, 0)`);
      grad.addColorStop(1, `rgba(${INK}, ${0.5 * fade})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(tail.x, tail.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.fillStyle = `rgba(${INK}, ${0.75 * fade})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2); ctx.fill();
    }

    // ---- catch pulses: cobalt rings expanding out from the node -----------
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pu = pulses[i];
      pu.age += dt;
      const k = pu.age / pu.life;
      if (k >= 1) { pulses.splice(i, 1); continue; }
      const r = 6 + k * 130;
      ctx.strokeStyle = `rgba(${COBALT}, ${(1 - k) * 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2); ctx.stroke();
    }

    // ---- node: steady cobalt dot + a soft breathing ring ------------------
    const breathe = 13 + Math.sin(time * 1.6) * 2.2;
    ctx.strokeStyle = `rgba(${COBALT}, 0.28)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(node.x, node.y, breathe, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(${COBALT}, 1)`;
    ctx.beginPath(); ctx.arc(node.x, node.y, 5, 0, Math.PI * 2); ctx.fill();
  }

  // ---- pointer drift -------------------------------------------------------
  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    // pull the node ~18% of the way toward the cursor, clamped to the canvas
    target.x = W * 0.5 + (e.clientX - (r.left + r.width / 2)) * 0.18;
    target.y = H * 0.5 + (e.clientY - (r.top + r.height / 2)) * 0.18;
  }
  if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

  // ---- run / pause ---------------------------------------------------------
  let running = true, raf = 0, last = 0, t0 = 0;
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) { last = 0; loop(); } }, { threshold: 0 });
  io.observe(host);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = 0; loop(); } });

  function loop(now) {
    if (!running || document.hidden) { cancelAnimationFrame(raf); return; }
    raf = requestAnimationFrame(loop);
    now = now || performance.now();
    if (!t0) t0 = now;
    if (!last) last = now;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const time = (now - t0) / 1000;

    nextSpawn -= dt;
    if (nextSpawn <= 0 && signals.length < 4) { spawnSignal(); nextSpawn = 0.7 + rnd() * 1.0; }

    draw(dt, time);
  }

  if (reduce) { resize(); seedPulse(); draw(0, 0); }
  else { seedPulse(); loop(); }

  return {
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      canvas.remove();
    },
  };
}
