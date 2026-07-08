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
  initCalc();
  initAuditForm();

  // Three.js hero — only where a host exists and WebGL is available.
  const host = document.querySelector('.hero__canvas');
  if (host) {
    try {
      const { initHero } = await import('./hero-signal.js');
      initHero(host);
    } catch (err) {
      console.warn('[hero] signal canvas failed to init:', err);
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

// Lost-revenue calculator (practice pages) — recompute on input.
function initCalc() {
  const el = document.querySelector('[data-calc]');
  if (!el) return;
  const missed = el.querySelector('[data-calc-missed]');
  const value = el.querySelector('[data-calc-value]');
  const rate = el.querySelector('[data-calc-rate]');
  const moneyOut = el.querySelector('[data-calc-money]');
  const countOut = el.querySelector('[data-calc-count]');
  const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const compute = () => {
    const m = Math.max(0, +missed.value || 0);
    const v = Math.max(0, +value.value || 0);
    const r = Math.min(100, Math.max(0, +rate.value || 0)) / 100;
    const lostPerYear = m * 52 * r;
    moneyOut.textContent = money(lostPerYear * v);
    countOut.textContent = Math.round(lostPerYear).toLocaleString('en-US');
  };
  [missed, value, rate].forEach((i) => i.addEventListener('input', compute));
  compute();
}

// Audit lead form → POST /api/lead. Honeypot + client validation.
function initAuditForm() {
  const form = document.querySelector('[data-audit]');
  if (!form) return;
  const status = form.querySelector('[data-audit-status]');
  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = 'audit__status' + (kind ? ` is-${kind}` : '');
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form).entries());
    if (f._hp) return; // bot
    if (!f.business?.trim() || !f.website?.trim()) return setStatus('Business name and website are required.', 'err');
    if (!f.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email || '')) return setStatus('Your name and a valid email are required.', 'err');
    setStatus('Sending…');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email, phone: f.phone, company: f.business,
          subject: 'Free audit request',
          message: `Free audit requested for ${f.website}` + (f.industry ? ` (${f.industry})` : ''),
          vertical: f.industry || 'audit', sourcePage: '/audit', _hp: f._hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not send');
      form.reset();
      setStatus('Got it — I’ll send your audit within two business days.', 'ok');
    } catch (err) {
      setStatus('Could not send — email jamesburge.mcm@gmail.com', 'err');
    }
  });
}
