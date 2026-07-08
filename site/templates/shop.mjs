// shop.mjs — /shop catalog (engines, tools by category, digital) + per-system
// detail pages. Systems come from content/shop/systems.json.
import { nav, footer, esc } from './layout.mjs';

const ORIGIN = 'https://waltburge.com';
const AUTHOR = { '@type': 'Person', name: 'Walt Burge', url: ORIGIN };

const industryMenuSlug = { law: 'legal-business', construction: 'construction' };

// Reusable system card — used on /shop, and to feature systems on local/practice.
export function systemCard(s) {
  return `        <a class="sys-card reveal" href="/shop/${esc(s.slug)}" data-cursor="hover">
          <div class="sys-card__top">
            <span class="card__kicker">${esc(s.category || s.kind)}</span>
            ${s.priceFrom ? `<span class="sys-card__price">${esc(s.priceFrom)}</span>` : ''}
          </div>
          <h3 class="sys-card__name">${esc(s.name)}</h3>
          <p class="sys-card__tagline">${esc(s.tagline || s.summary || '')}</p>
        </a>`;
}

export function shopIndexPage({ engines, toolsByCategory, digital }) {
  const section = (title, cards) => cards
    ? `      <section class="shop-section">
        <h2 class="shop-section__title">${esc(title)}</h2>
        <div class="sys-grid">
${cards}
        </div>
      </section>`
    : '';

  const engineCards = engines.map(systemCard).join('\n');
  const digitalCards = digital.map(systemCard).join('\n');
  const toolBlocks = toolsByCategory.map(({ category, items }) =>
    `      <section class="shop-section">
        <h2 class="shop-section__title">${esc(category)}</h2>
        <div class="sys-grid">
${items.map(systemCard).join('\n')}
        </div>
      </section>`).join('\n');

  const main = `${nav()}
    <main class="shop">
      <div class="wrap">
        <header class="section__head reveal">
          <span class="eyebrow">Shop</span>
          <h1 class="section__title">AI systems you can buy.</h1>
          <p class="section__lead">Productized AI, built and installed for your business — receptionists, intake, estimating, drafting, and more. Owned by you, not rented.</p>
        </header>
${engineCards ? section('Engines', engineCards) : ''}
${toolBlocks}
${digitalCards ? section('Open Source & Digital', digitalCards) : ''}
      </div>
    </main>
${footer()}`;

  return {
    title: 'Shop — AI Systems You Can Buy | Walt Burge',
    description: 'Productized AI systems built and installed for your business: AI receptionists, intake, estimating, document drafting, and more. Walt Builds, Oxford MS.',
    path: '/shop',
    ogTitle: 'Shop — AI Systems You Can Buy',
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI Systems', url: `${ORIGIN}/shop` },
    main,
  };
}

export function shopDetailPage(s) {
  const route = `/shop/${s.slug}`;
  const list = (title, items) => Array.isArray(items) && items.length
    ? `          <div class="sys-block">
            <h3 class="sys-block__title">${esc(title)}</h3>
            <ul class="sys-list">
${items.map((i) => `              <li>${esc(i)}</li>`).join('\n')}
            </ul>
          </div>`
    : '';
  const menuSlug = industryMenuSlug[s.industry];

  const main = `${nav()}
    <main class="sys-detail">
      <div class="wrap-narrow">
        <a class="svc-back" href="/shop" data-cursor="hover">&larr; All systems</a>
        <header class="sys-detail__head">
          <span class="eyebrow">${esc(s.category || s.kind)}</span>
          <h1 class="sys-detail__title">${esc(s.name)}</h1>
          <p class="sys-detail__tagline">${esc(s.tagline || '')}</p>
          ${s.priceFrom ? `<div class="sys-detail__price">From <strong>${esc(s.priceFrom)}</strong></div>` : ''}
        </header>
        <p class="sys-detail__summary">${esc(s.summary || '')}</p>
${list('What it includes', s.includes)}
${list('What you get out of it', s.outcomes)}
        <div class="sys-detail__cta">
          <a class="btn btn--primary" href="/#contact" data-cursor="hover">Book a free call</a>
          ${s.link ? `<a class="btn btn--ghost" href="${esc(s.link)}" target="_blank" rel="noopener" data-cursor="hover">View project &rarr;</a>` : ''}
          ${menuSlug ? `<a class="btn btn--ghost" href="/services/${menuSlug}" data-cursor="hover">See the ${esc(s.industry)} menu</a>` : ''}
        </div>
      </div>
    </main>
${footer()}`;

  return {
    title: `${esc(s.seoTitle || s.name)} | Walt Burge`,
    description: s.seoDescription || s.summary || '',
    path: route,
    ogTitle: s.name,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: s.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud',
        description: s.seoDescription || s.summary || '',
        author: AUTHOR,
        url: `${ORIGIN}${route}`,
        ...(s.priceFrom ? { offers: { '@type': 'Offer', price: s.priceFrom.replace(/[^0-9]/g, ''), priceCurrency: 'USD' } } : {}),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${ORIGIN}/shop` },
          { '@type': 'ListItem', position: 3, name: s.name, item: `${ORIGIN}${route}` },
        ],
      },
    ],
    main,
  };
}
