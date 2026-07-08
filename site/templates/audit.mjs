// audit.mjs — /audit lead-magnet. "What you get" pillars + a lead form that
// POSTs to /api/lead (the same serverless function the React app used).
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
          <p class="section__lead">One page, in plain English, within two business days. No strings.</p>
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
            <button class="btn btn--primary audit__submit" type="submit">Request my free audit</button>
            <p class="audit__status" data-audit-status role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Free Website & Intake Audit — Oxford, MS | Walt Burge',
    description: 'Get a free one-page audit of your business website from Walt Burge in Oxford, MS — forms and patient-data compliance, speed and search, and where you are losing leads. Plain English, two business days, no strings.',
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
