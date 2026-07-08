// layout.mjs — the HTML shell every page renders into. Carries head/SEO,
// self-hosted fonts, the Three.js import map, GSAP (vendored UMD), and the
// entry module. Vanilla: no framework, no hydration.

const ORIGIN = 'https://waltburge.com';

export function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param {object} o
 * @param {string} o.title            full <title>
 * @param {string} o.description      meta description
 * @param {string} o.path             route path, e.g. "/blog" ("/" for home)
 * @param {string} [o.ogTitle]
 * @param {string} [o.ogDescription]
 * @param {object|object[]} [o.jsonLd] JSON-LD block(s)
 * @param {string} [o.bodyClass]
 * @param {string} o.main             inner HTML for <body> (nav/main/footer)
 */
export function layout(o) {
  const url = `${ORIGIN}${o.path === '/' ? '/' : o.path}`;
  const ogTitle = o.ogTitle || o.title;
  const ogDesc = o.ogDescription || o.description;
  const ld = o.jsonLd ? (Array.isArray(o.jsonLd) ? o.jsonLd : [o.jsonLd]) : [];
  const ldBlocks = ld
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${esc(o.title)}</title>
    <meta name="description" content="${esc(o.description)}" />
    <meta name="author" content="Walt Burge" />
    <meta name="theme-color" content="#F8F5EE" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="${o.ogType || 'website'}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(ogTitle)}" />
    <meta property="og:description" content="${esc(ogDesc)}" />
    <meta property="og:image" content="${ORIGIN}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Walt Burge" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${esc(ogTitle)}" />
    <meta name="twitter:description" content="${esc(ogDesc)}" />
    <meta name="twitter:image" content="${ORIGIN}/og-image.png" />

    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/jbm-var-latin.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/assets/site.css" />

    <script src="/vendor/gsap.min.js" defer></script>
    <script src="/vendor/ScrollTrigger.min.js" defer></script>
    <script type="module" src="/assets/main.js"></script>
    ${ldBlocks}
  </head>
  <body${o.bodyClass ? ` class="${o.bodyClass}"` : ''}>
    <div class="scroll-progress" aria-hidden="true"></div>
${o.main}
  </body>
</html>
`;
}

/** Shared site nav. `active` highlights the current top-level section. */
export function nav() {
  return `    <header class="nav">
      <a class="nav__brand" href="/">Walt Burge<span class="dot">.</span></a>
      <nav class="nav__links" aria-label="Primary">
        <a href="/#work">Work</a>
        <a href="/services">Services</a>
        <a href="/shop">Shop</a>
        <a href="/blog">Blog</a>
        <a href="/resume">Résumé</a>
      </nav>
      <a class="nav__cta btn btn--primary btn--sm" href="/#contact">Book a free call</a>
    </header>`;
}

/** Shared footer. */
export function footer() {
  const year = 2026;
  return `    <footer class="footer">
      <div class="wrap footer__grid">
        <div>
          <a class="nav__brand" href="/" style="font-size:1.15rem">Walt Burge<span class="dot">.</span></a>
          <p style="color:var(--secondary);font-size:0.9rem;margin-top:0.6rem;max-width:22rem">
            Websites, automations, and custom AI for local business. Built to own, not rent — Oxford, Mississippi.
          </p>
        </div>
        <nav aria-label="Footer" style="display:flex;gap:2.5rem;flex-wrap:wrap">
          <div style="display:flex;flex-direction:column;gap:0.55rem">
            <a href="/#work">Work</a>
            <a href="/services">Services</a>
            <a href="/shop">Shop</a>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.55rem">
            <a href="/blog">Blog</a>
            <a href="/resume">Résumé</a>
            <a href="/audit">Free audit</a>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.55rem">
            <a href="mailto:jamesburge.mcm@gmail.com">Email</a>
            <a href="tel:+16622925533">(662) 292-5533</a>
            <a href="https://github.com/Aphrodine-wq" rel="noopener">GitHub</a>
          </div>
        </nav>
      </div>
      <div class="wrap footer__meta">© ${year} Walt Burge · Oxford, MS · 34.3665° N 89.5192° W</div>
    </footer>`;
}
