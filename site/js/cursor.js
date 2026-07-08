// cursor.js — ink dot + cobalt ring that eases behind it. Fine-pointer only;
// hides the native cursor (via html.wb-cursor) once it's actually moving, so
// the page is never cursorless before JS runs.
export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let live = false;

  addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!live) { live = true; document.documentElement.classList.add('wb-cursor'); }
  }, { passive: true });

  // ring trails with a little lag
  (function frame() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(frame);
  })();

  // grow over interactive targets
  const hoverSel = 'a, button, [data-cursor="hover"]';
  addEventListener('pointerover', (e) => {
    if (e.target.closest(hoverSel)) ring.classList.add('is-hover');
  });
  addEventListener('pointerout', (e) => {
    if (e.target.closest(hoverSel)) ring.classList.remove('is-hover');
  });
}
