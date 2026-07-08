// home.mjs — the homepage. Returns a page descriptor { title, description,
// path, jsonLd, main } that build.mjs feeds to layout(). Services-first funnel:
// hook → what I build → how it works → proof → cost of nothing → book.
import { nav, footer, esc } from './layout.mjs';

const SPECIALTIES = [
  { k: 'Websites', t: 'Sites that actually sell', b: 'Fast, modern websites built on real engineering — not a page builder you rent forever. One flat price, yours to keep.' },
  { k: 'AI receptionist', t: 'Never miss a call', b: 'A 24/7 AI front desk that answers, books, and follows up while you’re on the job. Every missed call is a missed customer.' },
  { k: 'Automation', t: 'Kill the busywork', b: 'Lead follow-up, intake, scheduling, invoicing — wired together so the repetitive parts run themselves.' },
  { k: 'Custom AI', t: 'Tools you own', b: 'Custom models and internal tools built for your business and installed on your terms. Bought, not subscribed.' },
];

const STEPS = [
  { n: '01', t: 'Free call', b: 'We talk through where you’re losing time and leads. No pitch deck, no pressure — just a plan.' },
  { n: '02', t: 'Flat quote', b: 'One clear price for the whole build. You know the number before anything starts.' },
  { n: '03', t: 'Built to own', b: 'I build it, install it, and hand you the keys. It’s your asset — no monthly rent on your own tools.' },
];

function workCard(w) {
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

export function homePage({ workItems = [] }) {
  const featured = workItems.filter((w) => !w.draft).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Walt Builds',
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
        <div class="hero__canvas" aria-hidden="true"></div>
        <div class="hero__inner">
          <h1 class="hero__title">
            <span class="reveal-mask"><span>Never miss another</span></span>
            <span class="reveal-mask"><span>customer<span class="dot">.</span></span></span>
          </h1>
          <p class="hero__sub">Custom <strong>software</strong> for local business. Owned by you, not rented.</p>
          <div class="hero__cta">
            <a class="btn btn--primary" href="/#contact" data-cursor="hover">Book a free call</a>
            <a class="btn btn--ghost" href="/#work" data-cursor="hover">See the work</a>
          </div>
        </div>
        <div class="hero__caption">
          <div class="wrap">
            <div class="row">
              <span>34.3665&deg; N &middot; 89.5192&deg; W</span>
              <span class="hide-sm">Oxford, Mississippi &middot; Elev 500 ft</span>
              <span class="only-sm">Oxford, MS</span>
            </div>
            <div class="rule"></div>
          </div>
        </div>
      </section>

      <!-- WHAT I BUILD -->
      <section class="section" id="services">
        <div class="wrap">
          <div class="section__head reveal">
            <span class="eyebrow">What I build</span>
            <h2 class="section__title">Four ways to stop leaving money on the table.</h2>
            <p class="section__lead">Every business loses leads somewhere — a call that rang out, a form nobody answered, an afternoon spent on data entry. I build the piece that fixes it.</p>
          </div>
          <div class="grid grid--2 grid--4" data-stagger>
            ${SPECIALTIES.map((s) => `<article class="card">
              <div class="card__kicker">${esc(s.k)}</div>
              <h3 class="card__title">${esc(s.t)}</h3>
              <p class="card__body">${esc(s.b)}</p>
            </article>`).join('\n            ')}
          </div>
          <div class="reveal" style="margin-top:2rem">
            <a class="btn btn--ghost" href="/services" data-cursor="hover">See the full service menu</a>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="section section--muted" id="how">
        <div class="wrap">
          <div class="section__head reveal">
            <span class="eyebrow">How it works</span>
            <h2 class="section__title">Three steps. No jargon, no lock-in.</h2>
          </div>
          <div class="grid grid--3" data-stagger>
            ${STEPS.map((s) => `<div class="step">
              <div class="step__n">${esc(s.n)}</div>
              <h3 class="step__t">${esc(s.t)}</h3>
              <p class="step__b">${esc(s.b)}</p>
            </div>`).join('\n            ')}
          </div>
        </div>
      </section>

      <!-- SELECTED WORK -->
      <section class="section" id="work">
        <div class="wrap">
          <div class="section__head reveal">
            <span class="eyebrow">Selected work</span>
            <h2 class="section__title">Shipped, live, and earning.</h2>
            <p class="section__lead">Real builds for real businesses — from a psychiatric clinic’s booking site to a two-sided construction marketplace.</p>
          </div>
          <div class="workgrid">
${featured.map(workCard).join('\n')}
          </div>
        </div>
      </section>

      <!-- COST OF DOING NOTHING -->
      <section class="section section--muted" id="cost">
        <div class="wrap-narrow reveal" style="text-align:center">
          <span class="eyebrow">The cost of doing nothing</span>
          <h2 class="section__title" style="margin-inline:auto">A missed call is a customer who called your competitor next.</h2>
          <p class="section__lead" style="margin-inline:auto">Most local businesses miss 1 in 4 calls. At a few hundred dollars a job, that’s real money walking out the door every week — quietly, without a single angry email to warn you.</p>
          <div class="hero__cta" style="justify-content:center;margin-top:2rem">
            <a class="btn btn--primary" href="/#contact" data-cursor="hover">Get the free call</a>
            <a class="btn btn--ghost" href="/audit" data-cursor="hover">Free website audit</a>
          </div>
        </div>
      </section>

      <!-- WHY -->
      <section class="section" id="why">
        <div class="wrap">
          <div class="grid grid--2" style="align-items:center;gap:3rem">
            <div class="reveal">
              <span class="eyebrow">Why Walt Builds</span>
              <h2 class="section__title">Built by someone who ran the job site.</h2>
              <p class="section__lead">I came up in construction before I came up in code — so I build for how a working business actually runs, not how a demo looks. Everything I ship, you own. No rented platforms, no surprise price hikes on your own tools.</p>
              <div style="margin-top:1.75rem">
                <a class="btn btn--ghost" href="/resume" data-cursor="hover">See the r&eacute;sum&eacute;</a>
              </div>
            </div>
            <div class="reveal proofgrid" data-reveal-delay="0.1">
              <div class="proof"><div class="proof__n">7 mo</div><div class="proof__l">self-taught to shipping a custom LLM</div></div>
              <div class="proof"><div class="proof__n">1 price</div><div class="proof__l">flat, up front, no deposit games</div></div>
              <div class="proof"><div class="proof__n">100%</div><div class="proof__l">of what I build, you own</div></div>
              <div class="proof"><div class="proof__n">24/7</div><div class="proof__l">AI that answers when you can’t</div></div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="section section--muted" id="contact">
        <div class="wrap-narrow reveal" style="text-align:center">
          <span class="eyebrow">Book a free call</span>
          <h2 class="section__title" style="margin-inline:auto">Tell me where you’re losing leads. I’ll tell you what I’d build.</h2>
          <p class="section__lead" style="margin-inline:auto">First call and estimate are free. No pressure, no jargon — just a straight answer on whether I can help.</p>
          <div class="hero__cta" style="justify-content:center;margin-top:2rem">
            <a class="btn btn--primary" href="mailto:jamesburge.mcm@gmail.com" data-cursor="hover">Email me</a>
            <a class="btn btn--ghost" href="tel:+16622925533" data-cursor="hover">(662) 292-5533</a>
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
