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

// Audit form → POST /api/audit (instant mini-audit; the CRM stores the lead
// server-side either way). Renders scores + verified gaps inline, or falls
// back to the classic "I'll send it" message when checks can't run.
function initAuditForm() {
  const form = document.querySelector('[data-audit]');
  if (!form) return;
  const status = form.querySelector('[data-audit-status]');
  const submit = form.querySelector('.audit__submit');
  const results = document.querySelector('[data-audit-results]');
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
    setStatus('Running your audit — about 30 seconds…');
    submit.disabled = true;
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: f.business, website: f.website, industry: f.industry,
          name: f.name, email: f.email, phone: f.phone, _hp: f._hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not run the audit');
      form.reset();
      const hasResults = !data.queued &&
        (data.gaps?.length || data.scores?.performance != null || data.scores?.seo != null);
      if (hasResults && results) {
        renderAuditResults(results, data);
        setStatus('Done — your results are below.', 'ok');
        results.hidden = false;
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setStatus('Got it — I’ll send your audit within two business days.', 'ok');
      }
    } catch (err) {
      setStatus(err.message || 'Could not send — email jamesburge.mcm@gmail.com', 'err');
    } finally {
      submit.disabled = false;
    }
  });
}

// Fill the results section. All content comes from our own API's fixed
// strings, but everything lands via textContent anyway — never innerHTML.
function renderAuditResults(root, data) {
  const scoresRow = root.querySelector('[data-audit-scores]');
  const cardPerf = root.querySelector('[data-audit-card-perf]');
  const cardSeo = root.querySelector('[data-audit-card-seo]');
  const perf = data.scores?.performance;
  const seo = data.scores?.seo;
  const showScores = perf != null || seo != null;
  scoresRow.hidden = !showScores;
  if (cardPerf) cardPerf.hidden = perf == null;
  if (cardSeo) cardSeo.hidden = seo == null;
  if (perf != null) countUp(root.querySelector('[data-audit-score-perf]'), perf);
  if (seo != null) countUp(root.querySelector('[data-audit-score-seo]'), seo);

  const list = root.querySelector('[data-audit-gaps]');
  list.textContent = '';
  const gaps = Array.isArray(data.gaps) ? data.gaps : [];
  if (!gaps.length) {
    const li = document.createElement('li');
    li.className = 'gap';
    const body = document.createElement('div');
    const t = document.createElement('strong');
    t.className = 'gap__title';
    t.textContent = 'Nothing urgent in the quick scan';
    const d = document.createElement('p');
    d.className = 'gap__detail';
    d.textContent = 'The basics check out. The full report digs into the parts a scan can’t see — rankings, your Google listing, and competitors.';
    body.append(t, d);
    li.append(body);
    list.append(li);
    return;
  }
  for (const g of gaps) {
    const li = document.createElement('li');
    li.className = 'gap';
    const sev = document.createElement('span');
    sev.className = 'gap__sev' + (g.severity === 'HIGH' ? ' gap__sev--high' : '');
    sev.textContent = g.severity === 'HIGH' ? 'HIGH' : 'MED';
    const body = document.createElement('div');
    const t = document.createElement('strong');
    t.className = 'gap__title';
    t.textContent = g.title || '';
    const d = document.createElement('p');
    d.className = 'gap__detail';
    d.textContent = g.detail || '';
    body.append(t, d);
    li.append(sev, body);
    list.append(li);
  }
}

// Small self-contained count-up (the GSAP [data-count] pattern binds at page
// init, before this content is revealed — so roll our own here).
function countUp(el, target) {
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { el.textContent = String(target); return; }
  const dur = 800;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
