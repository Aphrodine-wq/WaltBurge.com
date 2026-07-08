// practice.mjs — conversion landing pages for /for-doctors and /for-lawyers.
// pain → quantified cost (live calculator) → systems → FAQ → book.
import { nav, footer, esc } from './layout.mjs';
import { systemCard } from './shop.mjs';
import { faqBlock } from './local.mjs';

const ORIGIN = 'https://waltburge.com';

export function practicePage({ vertical: v, getSystem }) {
  const route = `/${v.slug}`;
  const systems = (v.systemSlugs || []).map(getSystem).filter(Boolean);

  const pains = v.painPoints.map((p) => `          <div class="pain">
            <div class="pain__stat">${esc(p.stat)}</div>
            <div class="pain__label">${esc(p.label)}</div>
          </div>`).join('\n');

  // Calculator — inputs carry defaults + data hooks; JS computes on input.
  const c = v.calc;
  const calc = `        <section class="calc" data-calc
          data-noun="${esc(c.resultNoun)}">
          <h2 class="calc__heading">${esc(c.heading)}</h2>
          <div class="calc__grid">
            <label class="calc__field">
              <span>${esc(c.unitLabel)}</span>
              <input type="number" min="0" data-calc-missed value="${c.defaultMissed}" />
            </label>
            <label class="calc__field">
              <span>${esc(c.valueLabel)}</span>
              <input type="number" min="0" data-calc-value value="${c.defaultValue}" />
            </label>
            <label class="calc__field">
              <span>${esc(c.rateLabel)}</span>
              <input type="number" min="0" max="100" data-calc-rate value="${c.defaultRate}" />
            </label>
          </div>
          <p class="calc__hint">${esc(c.valueHint)}</p>
          <div class="calc__result">
            <div>
              <span class="calc__result-num" data-calc-money>$0</span>
              <span class="calc__result-label">walking out the door a year</span>
            </div>
            <div>
              <span class="calc__result-num" data-calc-count>0</span>
              <span class="calc__result-label">${esc(c.resultNoun)} lost a year</span>
            </div>
          </div>
          <a class="btn btn--primary" href="/#contact" data-cursor="hover">Stop the leak — book a free call</a>
        </section>`;

  const featured = systems.length
    ? `        <section class="local__systems">
          <h2 class="local__systems-title">What I'd install for you</h2>
          <div class="sys-grid">
${systems.map(systemCard).join('\n')}
          </div>
        </section>`
    : '';

  const main = `${nav()}
    <main class="practice">
      <header class="local__hero">
        <div class="wrap-narrow">
          <span class="eyebrow">${esc(v.eyebrow)}</span>
          <h1 class="local__h1">${esc(v.h1)}</h1>
          <p class="local__intro">${esc(v.intro)}</p>
          <div class="hero__cta" style="margin-top:2rem">
            <a class="btn btn--primary" href="/#contact" data-cursor="hover">Book a free call</a>
            <a class="btn btn--ghost" href="/services/${esc(v.servicesSlug)}" data-cursor="hover">See the menu</a>
          </div>
        </div>
      </header>
      <div class="wrap-narrow local__body">
        <section class="pains">
${pains}
        </section>
${calc}
${featured}
${faqBlock(v.faqs)}
      </div>
    </main>
${footer()}`;

  return {
    title: `${esc(v.seoTitle)} | Walt Burge`,
    description: v.seoDescription,
    path: route,
    ogTitle: v.seoTitle,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: v.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: v.eyebrow, item: `${ORIGIN}${route}` },
        ],
      },
    ],
    main,
  };
}
