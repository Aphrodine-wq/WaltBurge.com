// main.js — entry module. Wires the custom cursor, GSAP scroll motion, and the
// Three.js hero terrain. Everything degrades gracefully: no WebGL → no canvas,
// no GSAP → CSS reveals, reduced-motion → static.
import { initCursor } from './cursor.js';
import { initScroll } from './scroll.js';

// The page ships with class="no-js"; swap it to "js" the moment the module runs
// so JS-only states (pre-reveal hidden hero, real motion) engage and the dead-JS
// fallbacks stand down.
document.documentElement.classList.replace('no-js', 'js');

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(async () => {
  initCursor();
  initScroll();
  initBlogFilter();
  initShare();
  initPrint();

  // Three.js hero — only where a host exists and WebGL is available.
  const host = document.querySelector('.hero__canvas');
  if (host && hasWebGL()) {
    try {
      const { initHeroTerrain } = await import('./three-hero.js');
      initHeroTerrain(host);
    } catch (err) {
      console.warn('[hero] terrain failed to init:', err);
    }
  }
});

// Blog index: filter the rows/feature by category, client-side, no reload.
function initBlogFilter() {
  const bar = document.querySelector('[data-blog-filter]');
  if (!bar) return;
  const items = document.querySelectorAll('.feature[data-cat], .postrow[data-cat]');
  const empty = document.querySelector('.blog__empty');
  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const cat = chip.dataset.cat || '';
    bar.querySelectorAll('.chip').forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    let shown = 0;
    items.forEach((el) => {
      const match = !cat || el.dataset.cat === cat;
      el.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  });
}

// Share button — copy the post URL to the clipboard, flash "Copied".
function initShare() {
  document.querySelectorAll('[data-share]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || location.href;
      try {
        if (navigator.share) { await navigator.share({ url }); return; }
        await navigator.clipboard.writeText(url);
        const prev = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = prev), 1600);
      } catch { /* dismissed / unavailable — no-op */ }
    });
  });
}

// Résumé "Save as PDF" → the browser print dialog.
function initPrint() {
  document.querySelectorAll('[data-print]').forEach((btn) =>
    btn.addEventListener('click', () => window.print()),
  );
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}
