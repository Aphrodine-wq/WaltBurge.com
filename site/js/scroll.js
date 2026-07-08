// scroll.js — GSAP-driven motion. Replaces framer-motion:
//   · hero headline mask-reveal on load
//   · scroll-linked hero parallax + fade
//   · reveal-on-scroll for [.reveal] blocks (ScrollTrigger)
//   · top scroll-progress bar
//   · nav "scrolled" state
// GSAP + ScrollTrigger arrive as UMD globals (window.gsap / window.ScrollTrigger).
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

export function initScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- nav scrolled state + progress bar (always on, cheap) ---------------
  const nav = document.querySelector('.nav');
  const bar = document.querySelector('.scroll-progress');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);
    if (bar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const showHero = () => document.documentElement.classList.add('gsap-ready');

  if (!gsap) {
    // GSAP failed to load — reveal everything so nothing stays hidden.
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('.reveal-mask > span').forEach((el) => (el.style.transform = 'none'));
    showHero();
    return;
  }

  if (reduce) {
    // no motion — just make sure everything is visible
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('.reveal-mask > span').forEach((el) => (el.style.transform = 'none'));
    showHero();
    return;
  }

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    // Don't re-fire triggers when the mobile URL bar shows/hides (it changes
    // svh and would otherwise jump the scroll-linked hero fade).
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  // ---- hero intro (only on pages that have a hero) ------------------------
  const hero = document.querySelector('.hero');
  if (hero) {
    // fromTo (not to): the CSS start is translateY(115%), which the browser
    // resolves to a pixel matrix — GSAP can't recover the percent from that, so
    // a plain {yPercent:0} reads the start as 0 and no-ops. fromTo owns both ends.
    const heroLines = gsap.utils.toArray('.hero .reveal-mask > span');
    if (heroLines.length) {
      gsap.fromTo(heroLines,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, ease: 'power3.out', delay: 0.05, stagger: 0.08 },
      );
    }
    gsap.from('.hero__sub', { opacity: 0, duration: 0.7, delay: 0.28, ease: 'power2.out' });
    gsap.from('.hero__cta > *', { opacity: 0, y: 14, duration: 0.55, delay: 0.4, stagger: 0.08, ease: 'power2.out' });
    gsap.from('.hero__scroll', { opacity: 0, duration: 0.8, delay: 1.1, ease: 'power2.out' });

    if (ScrollTrigger) {
      gsap.to('.hero__inner', {
        yPercent: 22, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }
  // Un-hide the hero copy now that its start states are set (no-op off-hero).
  showHero();

  // ---- reveal-on-scroll (all pages) ---------------------------------------
  if (ScrollTrigger) {
    gsap.utils.toArray('.reveal').forEach((el) => {
      const delay = parseFloat(el.dataset.revealDelay || '0');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out', onStart: () => el.classList.add('is-in') });
        },
      });
    });

    // ---- staggered children (data-stagger container) -----------------------
    gsap.utils.toArray('[data-stagger]').forEach((wrap) => {
      const items = wrap.children;
      gsap.set(items, { opacity: 0, y: 22 });
      ScrollTrigger.create({
        trigger: wrap, start: 'top 82%', once: true,
        onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }),
      });
    });

    // ---- line-by-line mask reveal for big headings (.reveal-lines) ----------
    gsap.utils.toArray('.reveal-lines').forEach((el) => {
      const inners = [];
      el.querySelectorAll(':scope > span').forEach((line) => {
        line.style.display = 'block';
        line.style.overflow = 'hidden';
        const inner = document.createElement('span');
        inner.style.display = 'block';
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
        inners.push(inner);
      });
      gsap.set(inners, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el, start: 'top 82%', once: true,
        onEnter: () => gsap.to(inners, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }),
      });
    });

    // ---- count-up numbers ([data-count]) -----------------------------------
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => {
          const o = { v: 0 };
          gsap.to(o, {
            v: target, duration: 1.3, ease: 'power2.out',
            onUpdate: () => { el.textContent = prefix + Math.round(o.v) + suffix; },
          });
        },
      });
    });

    // ---- parallax on flagged media ([data-parallax]) -----------------------
    gsap.utils.toArray('[data-parallax]').forEach((img) => {
      gsap.fromTo(img, { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  // ---- marquee — seamless infinite scroll of the ticker -------------------
  const track = document.querySelector('[data-marquee]');
  if (track) gsap.to(track, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });

  // ---- magnetic buttons — a gentle pull toward the cursor -----------------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.5, duration: 0.4, ease: 'power3.out' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }));
    });
  }
}
