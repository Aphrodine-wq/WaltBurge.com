// blog-index.mjs — the /blog "Build Log": header, category filters, a featured
// post, then editorial rows. Real <a> links (no SPA); filtering is progressive.
import { nav, footer, esc } from './layout.mjs';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDate(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-').map(Number);
  if (!y || !m) return d;
  return `${MONTHS[m - 1]} ${day}, ${y}`;
}

function featureCard(p) {
  return `      <a class="feature reveal" href="/blog/${esc(p.slug)}" data-cat="${esc(p.category)}" data-cursor="hover">
        <div class="feature__meta">
          <span class="card__kicker">Featured</span>
          <span>${esc(formatDate(p.date))} &middot; ${esc(p.readTime)}</span>
        </div>
        <h2 class="feature__title">${esc(p.title)}</h2>
        <p class="feature__excerpt">${esc(p.excerpt)}</p>
        <span class="feature__cta">Read article &rarr;</span>
      </a>`;
}

function postRow(p) {
  return `        <a class="postrow" href="/blog/${esc(p.slug)}" data-cat="${esc(p.category)}" data-cursor="hover">
          <div class="postrow__meta">
            <span>${esc(formatDate(p.date))}</span>
            <span class="postrow__tag">${esc(p.tags[0] || p.category)}</span>
            <span>${esc(p.readTime)}</span>
          </div>
          <div class="postrow__main">
            <h3 class="postrow__title">${esc(p.title)}</h3>
            <p class="postrow__excerpt">${esc(p.excerpt)}</p>
            <span class="postrow__cta">Read article &rarr;</span>
          </div>
        </a>`;
}

export function blogIndexPage({ posts, sections }) {
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);

  const filters = [
    `<button class="chip is-active" data-cat="" aria-pressed="true">All <span>${posts.length}</span></button>`,
    ...sections.map((s) => `<button class="chip" data-cat="${esc(s.category)}" aria-pressed="false">${esc(s.category)} <span>${s.count}</span></button>`),
  ].join('\n            ');

  const main = `${nav()}
    <main class="blog">
      <div class="wrap">
        <header class="blog__head reveal">
          <span class="eyebrow">The Build Log</span>
          <h1 class="blog__title">Writing<span class="dot">.</span></h1>
          <p class="blog__lead">Notes on building products and training models — in public, as I go.</p>
          <div class="blog__filters" data-blog-filter>
            ${filters}
          </div>
        </header>
${featured ? featureCard(featured) : ''}
        <div class="blog__list">
${rest.map(postRow).join('\n')}
        </div>
        <p class="blog__empty" hidden>Nothing in that section yet.</p>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Blog — Notes on Building AI | Walt Burge',
    description: 'Essays on AI, custom models, and building software from the job site up. By Walt Burge, AI developer in Oxford, MS.',
    path: '/blog',
    ogTitle: 'The Build Log — Walt Burge',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'The Build Log',
      url: 'https://waltburge.com/blog',
      author: { '@type': 'Person', name: 'Walt Burge', url: 'https://waltburge.com' },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://waltburge.com/blog/${p.slug}`,
        ...(p.date ? { datePublished: p.date } : {}),
      })),
    },
    main,
  };
}
