// services.mjs — /services menu index + per-industry menu pages. The industry
// bodies are the printed Walt Builds menus, rendered from content/services/*.md.
import { nav, footer, esc } from './layout.mjs';

const ORIGIN = 'https://waltburge.com';
const AUTHOR = { '@type': 'Person', name: 'Walt Burge', url: ORIGIN };

export function servicesIndexPage({ menus }) {
  const cards = menus.map((m) => `        <a class="svc-card reveal" href="/services/${esc(m.slug)}" data-cursor="hover">
          <h3 class="svc-card__title">${esc(m.industry)}</h3>
          <span class="svc-card__cta">View the menu &rarr;</span>
        </a>`).join('\n');

  const main = `${nav()}
    <main class="section" style="padding-top:9rem">
      <div class="wrap">
        <header class="section__head reveal">
          <span class="eyebrow">Service menu</span>
          <h1 class="section__title">Software &amp; AI, priced by industry.</h1>
          <p class="section__lead">Websites, automations, integrations, and custom AI systems — quoted flat and built to own. Pick your industry for the full menu.</p>
        </header>
        <div class="svc-grid" data-stagger>
${cards}
        </div>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Service Menu — Software & AI by Industry | Walt Burge',
    description: 'Full Walt Builds service menu: websites, automations, integrations, and custom AI systems, priced and built to own. Healthcare, law, construction, and more — Oxford, MS.',
    path: '/services',
    ogTitle: 'Service Menu — Walt Burge',
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Service Menu', url: `${ORIGIN}/services` },
    main,
  };
}

export function serviceDetailPage(menu) {
  const route = `/services/${menu.slug}`;
  const desc = `Custom software and AI for ${menu.industry.toLowerCase()} — websites, automations, integrations, and AI systems, built and owned. Walt Builds, Oxford MS.`;

  const main = `${nav()}
    <main class="svc-detail">
      <div class="wrap-narrow">
        <a class="svc-back" href="/services" data-cursor="hover">&larr; All industries</a>
        <header class="svc-detail__head">
          <span class="eyebrow">Service menu</span>
          <h1 class="svc-detail__title">${esc(menu.industry)}<span class="dot">.</span></h1>
        </header>
        <div class="article-body svc-menu">
${menu.html}
        </div>
        <div class="svc-detail__cta">
          <p>Every line above is quoted flat and built to own. Not sure where to start?</p>
          <a class="btn btn--primary" href="/#contact" data-cursor="hover">Book a free call</a>
        </div>
      </div>
    </main>
${footer()}`;

  return {
    title: `${esc(menu.industry)} Software & AI Services | Walt Burge`,
    description: desc,
    path: route,
    ogTitle: `${menu.industry} Software & AI Services`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${menu.industry} Software & AI Services`,
        description: desc,
        serviceType: `${menu.industry} AI & software`,
        provider: AUTHOR,
        areaServed: { '@type': 'State', name: 'Mississippi' },
        url: `${ORIGIN}${route}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/services` },
          { '@type': 'ListItem', position: 3, name: menu.industry, item: `${ORIGIN}${route}` },
        ],
      },
    ],
    main,
  };
}
