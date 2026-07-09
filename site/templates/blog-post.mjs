// blog-post.mjs — a single /blog/:slug article. Rendered markdown body, byline,
// prev/next, related, comments placeholder, and BlogPosting + Breadcrumb JSON-LD.
import { nav, footer, esc } from './layout.mjs';
import { formatDate } from './blog-index.mjs';

const ORIGIN = 'https://waltburge.com';
const SUFFIX = ' | Walt Burge';

function relatedCard(p) {
  return `          <a class="relcard" href="/blog/${esc(p.slug)}" data-cursor="hover">
            <span class="card__kicker">${esc(p.category)}</span>
            <h3 class="relcard__title">${esc(p.title)}</h3>
            <p class="relcard__excerpt">${esc(p.excerpt)}</p>
          </a>`;
}

export function blogPostPage({ post, prev, next, related }) {
  const route = `/blog/${post.slug}`;
  const url = `${ORIGIN}${route}`;

  const tags = post.tags.map((t) => `<span class="post__tag">${esc(t)}</span>`).join('');

  const adjacent = (prev || next)
    ? `        <nav class="post__adjacent">
${prev ? `          <a class="post__adj post__adj--prev" href="/blog/${esc(prev.slug)}" data-cursor="hover">
            <span class="post__adj-label">&larr; Older</span>
            <span class="post__adj-title">${esc(prev.title)}</span>
          </a>` : '<span></span>'}
${next ? `          <a class="post__adj post__adj--next" href="/blog/${esc(next.slug)}" data-cursor="hover">
            <span class="post__adj-label">Newer &rarr;</span>
            <span class="post__adj-title">${esc(next.title)}</span>
          </a>` : '<span></span>'}
        </nav>`
    : '';

  const relatedSection = related.length
    ? `      <section class="post__related section--muted">
        <div class="wrap">
          <h2 class="section__title">Keep reading<span class="dot">.</span></h2>
          <div class="relgrid">
${related.map(relatedCard).join('\n')}
          </div>
        </div>
      </section>`
    : '';

  const main = `${nav()}
    <main class="post">
      <article class="post__article wrap-narrow">
        <a class="post__back" href="/blog" data-cursor="hover">&larr; Back to the Build Log</a>
        <header class="post__header">
          <div class="post__tags">${tags}</div>
          <h1 class="post__title">${esc(post.title)}</h1>
          <div class="post__byline">
            <span class="post__author">${esc(post.author)}</span>
            <span>${esc(formatDate(post.date))}</span>
            <span>${esc(post.readTime)}</span>
            <button class="post__share" data-share data-url="${url}" type="button">Share</button>
          </div>
          <div class="rule"></div>
        </header>
        <div class="article-body">
${post.html || `<p><em>${esc(post.excerpt)}</em></p>`}
        </div>
        <div class="post__sig">
          Written by <strong>${esc(post.author)}</strong> — building FairTradeWorker, ConstructionAI, and the tools around them.
        </div>
${adjacent}
        <div class="post__comments">
          <h3 class="post__comments-title">Comments<span class="dot">.</span></h3>
          <p class="post__comments-soon">Comments are coming soon.</p>
        </div>
      </article>
${relatedSection}
    </main>
${footer()}`;

  const postImage = post.ogImage ? `${ORIGIN}${post.ogImage}` : `${ORIGIN}/og-image.png`;

  return {
    title: `${post.title}${SUFFIX}`,
    description: post.excerpt,
    path: route,
    ogType: 'article',
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogImage: postImage,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(post.date ? { datePublished: post.date, dateModified: post.updated || post.date } : {}),
        articleSection: post.category,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: post.author, url: ORIGIN },
        publisher: { '@type': 'Person', name: 'Walt Burge', url: ORIGIN },
        image: postImage,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
    main,
  };
}
