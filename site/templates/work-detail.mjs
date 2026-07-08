// work-detail.mjs — a /work/:slug case study. Hero banner (image or clean
// survey grid), overview, challenge/solution, key features, and a meta sidebar
// (tech, details, links). Static adaptation of the React ProjectDetail.
import { nav, footer, esc } from './layout.mjs';

const kindLabel = { client: 'Client Work', product: 'Product', platform: 'Platform', tool: 'Tool', experiment: 'Experiment' };

export function workDetailPage(w) {
  const route = `/work/${w.slug}`;
  const hasImage = !!w.imageUrl;
  const badge = w.kind ? (kindLabel[w.kind] || w.category) : w.category;

  const hero = `      <div class="wd-hero ${hasImage ? 'wd-hero--image' : 'wd-hero--grid'}">
        ${hasImage ? `<img class="wd-hero__img" src="${esc(w.imageUrl)}" alt="${esc(w.title)}" />
        <div class="wd-hero__scrim" aria-hidden="true"></div>` : ''}
        <div class="wd-hero__overlay">
          <div class="wrap">
            <span class="wd-hero__badge">${esc(badge)}</span>
            <h1 class="wd-hero__title">${esc(w.title)}</h1>
            <p class="wd-hero__summary">${esc(w.summary || w.description || '')}</p>
          </div>
        </div>
      </div>`;

  const challengeSolution = (w.challenge || w.solution)
    ? `          <div class="wd-cs">
${w.challenge ? `            <div class="wd-cs__card wd-cs__card--challenge">
              <h3 class="wd-cs__title">The Challenge</h3>
              <p>${esc(w.challenge)}</p>
            </div>` : ''}
${w.solution ? `            <div class="wd-cs__card wd-cs__card--solution">
              <h3 class="wd-cs__title">The Solution</h3>
              <p>${esc(w.solution)}</p>
            </div>` : ''}
          </div>`
    : '';

  const features = Array.isArray(w.features) && w.features.length
    ? `          <div class="wd-block">
            <h3 class="wd-h3">Key features</h3>
            <div class="wd-features">
${w.features.map((f) => `              <div class="wd-feature"><span class="wd-feature__tick">&check;</span><span>${esc(f)}</span></div>`).join('\n')}
            </div>
          </div>`
    : '';

  const tech = (w.techStack || []).map((t) => `<span class="wd-chip">${esc(t)}</span>`).join('');

  const detailRow = (label, value) => value
    ? `                <div class="wd-detail"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`
    : '';
  const clientVal = w.client ? `${w.client.name}${w.client.location ? ` · ${w.client.location}` : ''}` : '';

  const liveLink = w.link
    ? `              <a class="wd-link wd-link--primary" href="${esc(w.link)}" target="_blank" rel="noopener noreferrer" data-cursor="hover">View live deployment &rarr;</a>`
    : `              <span class="wd-link wd-link--off">Deployment offline</span>`;
  const repoLink = w.repositoryUrl
    ? `              <a class="wd-link" href="${esc(w.repositoryUrl)}" target="_blank" rel="noopener noreferrer" data-cursor="hover">Source code &rarr;</a>`
    : `              <span class="wd-link wd-link--off">Source private</span>`;

  const main = `${nav()}
    <main class="wd">
      <a class="wd-back wrap" href="/work" data-cursor="hover">&larr; Back to work</a>
${hero}
      <div class="wrap wd-body">
        <div class="wd-main">
          <div class="wd-block">
            <h2 class="wd-h2">Overview</h2>
            <p class="wd-lead">${esc(w.fullDescription || w.description || `A ${w.category} project.`)}</p>
          </div>
${challengeSolution}
${features}
        </div>
        <aside class="wd-side">
          <div class="wd-card">
            ${tech ? `<h3 class="wd-side__label">Technologies</h3><div class="wd-chips">${tech}</div>` : ''}
            <h3 class="wd-side__label">Details</h3>
            <dl class="wd-details">
${detailRow('Status', w.status)}
${detailRow('Year', w.year)}
${detailRow('Type', w.kind ? kindLabel[w.kind] : '')}
${detailRow('Client', clientVal)}
            </dl>
            <h3 class="wd-side__label">Links</h3>
            <div class="wd-links">
${liveLink}
${repoLink}
            </div>
          </div>
        </aside>
      </div>
    </main>
${footer()}`;

  return {
    title: `${esc(w.seoTitle || w.title)} | Walt Burge`,
    description: w.seoDescription || w.summary || w.description || '',
    path: route,
    ogTitle: w.title,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://waltburge.com/' },
        { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://waltburge.com/work' },
        { '@type': 'ListItem', position: 3, name: w.title, item: `https://waltburge.com${route}` },
      ],
    },
    main,
  };
}
