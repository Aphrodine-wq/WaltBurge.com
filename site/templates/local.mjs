// local.mjs — local SEO landing pages at /:slug (e.g. /ai-for-law-firms-oxford-ms).
// h1 + intro, featured Shop systems, FAQ, CTA. LocalBusiness + FAQ + Breadcrumb.
import { nav, footer, esc } from './layout.mjs';
import { systemCard } from './shop.mjs';

const ORIGIN = 'https://waltburge.com';
const AUTHOR = { '@type': 'Person', name: 'Walt Burge', url: ORIGIN };

export function faqBlock(faqs) {
  if (!Array.isArray(faqs) || !faqs.length) return '';
  return `        <section class="faq">
          <h2 class="faq__title">Questions<span class="dot">.</span></h2>
          <div class="faq__list">
${faqs.map((f) => `            <details class="faq__item">
              <summary class="faq__q">${esc(f.q)}</summary>
              <div class="faq__a">${esc(f.a)}</div>
            </details>`).join('\n')}
          </div>
        </section>`;
}

export function localPage({ page, getSystem, town }) {
  const route = `/${page.slug}`;
  const systems = (page.systemSlugs || []).map(getSystem).filter(Boolean);
  const serviceLabel = page.slug.startsWith('website-design-') ? 'Website Design' : `AI for ${page.industry}`;

  const featured = systems.length
    ? `        <section class="local__systems">
          <h2 class="local__systems-title">What I'd build for you</h2>
          <div class="sys-grid">
${systems.map(systemCard).join('\n')}
          </div>
        </section>`
    : '';

  const main = `${nav()}
    <main class="local">
      <header class="local__hero">
        <div class="wrap-narrow">
          <span class="eyebrow">Walt Builds${town ? ` &middot; ${esc(town.name)}, MS` : ' &middot; North Mississippi'}</span>
          <h1 class="local__h1">${esc(page.h1)}</h1>
          <p class="local__intro">${esc(page.intro)}</p>
          <div class="hero__cta" style="margin-top:2rem">
            <a class="btn btn--primary" href="/#contact" data-cursor="hover">Book a free call</a>
            <a class="btn btn--ghost" href="/audit" data-cursor="hover">Free audit</a>
          </div>
        </div>
      </header>
      <div class="wrap-narrow local__body">
${featured}
${faqBlock(page.faqs)}
        <section class="local__cta">
          <h2 class="section__title">Built here, for here.</h2>
          <p>The person who writes the code answers your call. Let's talk about what you're losing and what I'd build to fix it.</p>
          <a class="btn btn--primary" href="/#contact" data-cursor="hover">Get the free call</a>
        </section>
      </div>
    </main>
${footer()}`;

  const localBiz = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Walt Builds — ${serviceLabel}${town ? `, ${town.name} MS` : ''}`,
    description: page.seoDescription,
    url: `${ORIGIN}${route}`,
    telephone: '+1-662-292-5533',
    email: 'jamesburge.mcm@gmail.com',
    priceRange: '$$',
    founder: AUTHOR,
    address: { '@type': 'PostalAddress', addressLocality: town ? town.name : 'Oxford', addressRegion: 'MS', addressCountry: 'US' },
    areaServed: town ? { '@type': 'City', name: `${town.name}, Mississippi` } : { '@type': 'State', name: 'Mississippi' },
    ...(town ? { geo: { '@type': 'GeoCoordinates', latitude: town.lat, longitude: town.lng } } : {}),
  };
  const jsonLd = [localBiz];
  if (Array.isArray(page.faqs) && page.faqs.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: page.h1, item: `${ORIGIN}${route}` },
    ],
  });

  return {
    title: `${esc(page.seoTitle)} | Walt Burge`,
    description: page.seoDescription,
    path: route,
    ogTitle: page.seoTitle,
    jsonLd,
    main,
  };
}
