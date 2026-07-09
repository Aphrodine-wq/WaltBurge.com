// home.mjs — the homepage. Motion-forward, low-text: hero object → marquee →
// work (the proof) → a kinetic statement → an interactive service list →
// animated numbers → book. Copy is deliberately terse; the feeling comes from
// movement (see site/js/scroll.js).
import { nav, footer, esc } from './layout.mjs';

// What I do — one word, one line. The list is oversized + interactive, not a card grid.
const DO = [
  { n: '01', name: 'Websites', desc: 'Fast, modern, yours to keep.' },
  { n: '02', name: 'AI receptionist', desc: 'Answers every call, 24/7.' },
  { n: '03', name: 'Automation', desc: 'Kills the busywork for good.' },
  { n: '04', name: 'Custom AI', desc: 'Built for you. Owned by you.' },
];

// Marquee tokens — repeated twice in markup for a seamless loop.
const TICKER = ['Websites', 'AI receptionists', 'Automation', 'Custom AI', 'Owned, not rented'];

const STATS = [
  { num: 7, suffix: ' mo', label: 'self-taught to a shipped LLM' },
  { num: 11, suffix: '', label: 'systems shipped, start to finish' },
  { num: 100, suffix: '%', label: 'of what I build, you own' },
  { text: '24/7', label: 'AI that answers when you can’t' },
];

function workCard(w, i) {
  const tags = (w.tags || []).slice(0, 2).map((t) => `<span>${esc(t)}</span>`).join('');
  const media = w.imageUrl
    ? `<img class="workcard__img" data-parallax src="${esc(w.imageUrl)}" alt="${esc(w.title)}" loading="lazy" />`
    : `<div class="workcard__mono" aria-hidden="true">${esc((w.title || '?').slice(0, 1))}</div>`;
  return `        <a class="workcard reveal" href="/work/${esc(w.slug)}" data-cursor="hover" style="--i:${i}">
          <div class="workcard__media">${media}<span class="workcard__go">View &rarr;</span></div>
          <div class="workcard__body">
            <div class="workcard__meta"><span class="card__kicker">${esc(w.category || 'Work')}</span><span>${esc(w.year || '')}</span></div>
            <h3 class="workcard__title">${esc(w.title)}</h3>
            <div class="workcard__tags">${tags}</div>
          </div>
        </a>`;
}

function tickerRun() {
  return TICKER.map((t) => `<span class="mq__item">${esc(t)}</span><span class="mq__dot" aria-hidden="true">&bull;</span>`).join('');
}

function statTile(s) {
  // Render the FINAL value so it's correct with JS off; count-up (scroll.js)
  // resets to 0 on enter and animates up as progressive enhancement.
  const val = s.money
    ? `<span class="num" data-count="${s.num}" data-prefix="$">$${s.num}</span>`
    : s.text
      ? `<span class="num">${esc(s.text)}</span>`
      : `<span class="num" data-count="${s.num}" data-suffix="${esc(s.suffix || '')}">${s.num}${esc(s.suffix || '')}</span>`;
  return `          <div class="stat reveal"><span class="stat__num">${val}</span><span class="stat__label">${esc(s.label)}</span></div>`;
}

export function homePage({ workItems = [] }) {
  const featured = workItems.filter((w) => !w.draft).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://waltburge.com/#business',
    name: 'Walt Builds',
    parentOrganization: { '@id': 'https://waltburge.com/#org' },
    founder: { '@type': 'Person', name: 'Walt Burge', url: 'https://waltburge.com' },
    description: 'Websites, automations, and custom AI for local business in Oxford and North Mississippi.',
    url: 'https://waltburge.com/',
    telephone: '+1-662-292-5533',
    email: 'jamesburge.mcm@gmail.com',
    areaServed: { '@type': 'State', name: 'Mississippi' },
    address: { '@type': 'PostalAddress', addressLocality: 'Oxford', addressRegion: 'MS', addressCountry: 'US' },
  };

  const main = `${nav()}
    <main id="top">
      <!-- HERO -->
      <section class="hero" id="hero">
        <div class="hero__grid wrap">
          <div class="hero__inner">
            <h1 class="hero__title">
              <span class="reveal-mask"><span>Never miss another</span></span>
              <span class="reveal-mask"><span>customer<span class="dot">.</span></span></span>
            </h1>
            <p class="hero__sub">Custom <strong>software</strong> for local business. Owned by you, not rented.</p>
            <div class="hero__cta">
              <a class="btn btn--primary" data-magnetic href="/#contact" data-cursor="hover">Book a free call</a>
              <a class="btn btn--ghost" data-magnetic href="/#work" data-cursor="hover">See the work</a>
            </div>
          </div>
          <div class="hero__object">
            <div class="hero__canvas" aria-hidden="true"></div>
          </div>
        </div>
        <div class="hero__scroll" aria-hidden="true"><span>Scroll</span></div>
      </section>

      <!-- MARQUEE -->
      <section class="mq" aria-hidden="true">
        <div class="mq__track" data-marquee>
          <div class="mq__run">${tickerRun()}</div>
          <div class="mq__run">${tickerRun()}</div>
        </div>
      </section>

      <!-- WORK — the proof -->
      <section class="section work" id="work">
        <div class="wrap">
          <div class="work__head">
            <span class="eyebrow reveal">Selected work</span>
            <h2 class="big reveal-lines"><span>Shipped, live,</span><span>and earning<span class="dot">.</span></span></h2>
          </div>
          <div class="workgrid">
${featured.map(workCard).join('\n')}
          </div>
        </div>
      </section>

      <!-- STATEMENT -->
      <section class="statement">
        <div class="wrap">
          <p class="statement__line reveal-lines">
            <span>Every missed call is a</span>
            <span>customer who called</span>
            <span>someone else<span class="dot">.</span></span>
          </p>
          <a class="statement__cta" data-magnetic href="/#contact" data-cursor="hover">Fix that &rarr;</a>
        </div>
      </section>

      <!-- WHAT I DO — interactive, oversized, low-text -->
      <section class="section do" id="do">
        <div class="wrap">
          <span class="eyebrow reveal">What I do</span>
          <ul class="dolist">
${DO.map((d) => `            <li class="doitem" data-cursor="hover">
              <span class="doitem__idx">${d.n}</span>
              <span class="doitem__name">${esc(d.name)}</span>
              <span class="doitem__desc">${esc(d.desc)}</span>
              <span class="doitem__arrow" aria-hidden="true">&rarr;</span>
            </li>`).join('\n')}
          </ul>
          <a class="do__more reveal" href="/services" data-cursor="hover">Full menu &rarr;</a>
        </div>
      </section>

      <!-- NUMBERS -->
      <section class="section section--muted stats" id="why">
        <div class="wrap">
          <div class="statgrid" data-stagger>
${STATS.map(statTile).join('\n')}
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="section contact" id="contact">
        <div class="wrap">
          <h2 class="big reveal-lines"><span>Let’s build</span><span>something<span class="dot">.</span></span></h2>
          <p class="contact__sub reveal">First call and estimate are free.</p>
          <div class="contact__cta">
            <a class="btn btn--primary" data-magnetic href="mailto:jamesburge.mcm@gmail.com" data-cursor="hover">Email me</a>
            <a class="btn btn--ghost" data-magnetic href="tel:+16622925533" data-cursor="hover">(662) 292-5533</a>
          </div>
        </div>
      </section>
    </main>
${footer()}`;

  return {
    title: 'Walt Burge — Websites & Custom Software for Local Business · Oxford, MS',
    description: 'Website design and custom software for Oxford and North Mississippi businesses — professional sites at one flat price, a 24/7 AI receptionist that answers every call, and tools you own, not rent. The first call and estimate are free.',
    path: '/',
    ogTitle: 'Walt Burge — AI & Software for Local Business · Oxford, MS',
    jsonLd,
    main,
  };
}
