// audit.mjs — /audit lead-magnet. "What you get" pillars + a form that runs an
// INSTANT mini-audit via /api/audit (same-origin proxy → walt-crm, which stores
// the lead then returns scores + verified gaps). Falls back to the classic
// "I'll send it within two business days" flow when the checks can't run.
import { nav, footer, esc } from './layout.mjs';

const ORIGIN = 'https://waltburge.com';

const INDUSTRIES = ['Therapy / Behavioral Health', 'Medical / Dental', 'Med Spa / Wellness', 'Contractor / Trades', 'Law Firm', 'Restaurant / Retail', 'Other'];

const PILLARS = [
  { title: 'Forms & patient data', body: 'If your website collects client or patient info, I check exactly where it goes — and whether that path is compliant. Most healthcare sites fail this without knowing.' },
  { title: 'Speed & search', body: 'How fast your site loads, whether Google can actually read it, and what your competitors rank for that you don’t.' },
  { title: 'Missed-lead paths', body: 'Where a ready-to-buy visitor gives up — dead forms, buried phone numbers, no way to book after hours.' },
];

export function auditPage() {
  const pillars = PILLARS.map((p) => `          <div class="pillar">
            <h3 class="pillar__title">${esc(p.title)}</h3>
            <p class="pillar__body">${esc(p.body)}</p>
          </div>`).join('\n');

  const options = INDUSTRIES.map((i) => `<option value="${esc(i)}">${esc(i)}</option>`).join('');

  const main = `${nav()}
    <main class="audit">
      <div class="wrap">
        <a class="svc-back" href="/" data-cursor="hover">&larr; Back</a>
        <header class="audit__head reveal">
          <span class="eyebrow">Walt Builds · Free Audit</span>
          <h1 class="section__title">Get your free audit<span class="dot">.</span></h1>
          <p class="section__lead">Drop your site in below — results show up on this page in about 30 seconds. Plain English, no strings.</p>
        </header>
        <div class="audit__grid">
          <div class="audit__pillars">
${pillars}
          </div>
          <form class="audit__form" data-audit novalidate>
            <div class="af">
              <label for="af-business">Business name</label>
              <input id="af-business" name="business" required autocomplete="organization" />
            </div>
            <div class="af">
              <label for="af-website">Website</label>
              <input id="af-website" name="website" required inputmode="url" placeholder="yourbusiness.com" />
            </div>
            <div class="af">
              <label for="af-industry">Industry</label>
              <select id="af-industry" name="industry"><option value="">Select…</option>${options}</select>
            </div>
            <div class="af">
              <label for="af-name">Your name</label>
              <input id="af-name" name="name" required autocomplete="name" />
            </div>
            <div class="af">
              <label for="af-email">Email</label>
              <input id="af-email" name="email" type="email" required autocomplete="email" />
            </div>
            <div class="af">
              <label for="af-phone">Phone <span class="af__opt">(optional)</span></label>
              <input id="af-phone" name="phone" type="tel" autocomplete="tel" />
            </div>
            <input type="text" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true" class="af__hp" />
            <button class="btn btn--primary audit__submit" type="submit">Run my free audit</button>
            <p class="audit__status" data-audit-status role="status" aria-live="polite"></p>
          </form>
        </div>
        <section class="audit__results" data-audit-results hidden>
          <h2 class="section__title audit__results-title">What I found<span class="dot">.</span></h2>
          <div class="audit__scores" data-audit-scores hidden>
            <div class="scorecard" data-audit-card-perf hidden>
              <span class="scorecard__num" data-audit-score-perf>0</span>
              <span class="scorecard__label">Mobile speed / 100</span>
            </div>
            <div class="scorecard" data-audit-card-seo hidden>
              <span class="scorecard__num" data-audit-score-seo>0</span>
              <span class="scorecard__label">Search readiness / 100</span>
            </div>
          </div>
          <ul class="audit__gaps" data-audit-gaps></ul>
          <div class="audit__cta">
            <p class="audit__cta-lead">That's the quick scan. The full report goes deeper — your Google listing, rankings, competitors, and exactly what I'd fix first, on one page. It's $349, and the $349 credits toward the fix if we work together within 30 days.</p>
            <a class="btn btn--primary" href="/#contact" data-cursor="hover">Get the full report — $349</a>
          </div>
        </section>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Free Website & Intake Audit — Oxford, MS | Walt Burge',
    description: 'Run a free instant audit of your business website from Walt Burge in Oxford, MS — speed and search checks in about 30 seconds, plus where you are losing leads. Plain English, no strings.',
    path: '/audit',
    ogTitle: 'Free Website & Intake Audit — Oxford, MS',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Free audit', item: `${ORIGIN}/audit` },
      ],
    },
    main,
  };
}
