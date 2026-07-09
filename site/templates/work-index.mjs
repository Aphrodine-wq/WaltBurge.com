// work-index.mjs — the /work listing of all shipped work (non-draft items).
import { nav, footer, esc } from './layout.mjs';

function card(w) {
  const tags = (w.tags || []).slice(0, 2).map((t) => `<span>${esc(t)}</span>`).join('');
  const media = w.imageUrl
    ? `<img class="workcard__img" src="${esc(w.imageUrl)}" alt="${esc(w.title)}" loading="lazy" />`
    : `<div class="workcard__mono" aria-hidden="true">${esc((w.title || '?').slice(0, 1))}</div>`;
  return `        <a class="workcard reveal" href="/work/${esc(w.slug)}" data-cursor="hover">
          <div class="workcard__media">${media}</div>
          <div class="workcard__body">
            <div class="workcard__meta"><span class="card__kicker">${esc(w.category || 'Work')}</span><span>${esc(w.year || '')}</span></div>
            <h3 class="workcard__title">${esc(w.title)}</h3>
            <p class="workcard__summary">${esc(w.summary || w.description || '')}</p>
            <div class="workcard__tags">${tags}</div>
          </div>
        </a>`;
}

export function workIndexPage({ workItems }) {
  const items = workItems.filter((w) => !w.draft);
  const main = `${nav()}
    <main class="section" style="padding-top:9rem">
      <div class="wrap">
        <header class="section__head reveal">
          <span class="eyebrow">Selected work</span>
          <h1 class="section__title">Products, platforms &amp; client builds.</h1>
          <p class="section__lead">Shipped end to end from Oxford, MS — construction marketplaces, custom AI, and websites that earn their keep.</p>
        </header>
        <div class="workgrid">
${items.map(card).join('\n')}
        </div>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Selected Work — Products, Platforms & AI | Walt Burge',
    description: 'Selected work by Walt Burge: construction marketplaces, custom AI models, developer platforms, and client builds — shipped end to end from Oxford, MS.',
    path: '/work',
    ogTitle: 'Selected Work — Walt Burge',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Selected Work',
      url: 'https://waltburge.com/work',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((w, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: w.title,
          url: `https://waltburge.com/work/${w.slug}`,
        })),
      },
    },
    main,
  };
}
