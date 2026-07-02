import React, { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { PracticeVertical } from '../lib/practice';
import { getSystem } from '../lib/shop';
import { RevenueCalculator } from './RevenueCalculator';
import { HowItWorks } from './HowItWorks';
import { WhyWaltBuilds } from './WhyWaltBuilds';
import { NavLinks } from './NavLinks';
import { setLeadContext } from '../lib/leadContext';
import { trackEvent } from '../lib/track';

interface PrivatePracticePageProps {
  vertical: PracticeVertical;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onOpenSystem: (slug: string) => void;
}

export const PrivatePracticePage: React.FC<PrivatePracticePageProps> = ({ vertical, onBack, onNavigate, onOpenSystem }) => {
  const [open, setOpen] = useState<number | null>(0);
  const systems = vertical.systemSlugs.map(getSystem).filter(Boolean) as NonNullable<ReturnType<typeof getSystem>>[];
  // Stamp the funnel context (which vertical, what page) so the lead arrives
  // tagged. 'for-doctors' → 'doctors' to match the Contact form's labels.
  const book = () => {
    setLeadContext({ vertical: vertical.slug.replace(/^for-/, ''), sourcePage: `/${vertical.slug}` });
    trackEvent('cta_click', { location: 'practice', vertical: vertical.slug });
    onNavigate('contact');
  };

  // Per-page SEO: title/meta/canonical + Service & FAQ JSON-LD. Mirrors
  // LocalLandingPage so a shared link previews this page, not the homepage.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${vertical.seoTitle} | Walt Burge`;
    window.scrollTo(0, 0);
    trackEvent('practice_page_view', { vertical: vertical.slug });

    const setMeta = (sel: string, val: string) => {
      const el = document.querySelector<HTMLMetaElement>(sel);
      const prev = el?.getAttribute('content') ?? null;
      el?.setAttribute('content', val);
      return () => { if (el && prev !== null) el.setAttribute('content', prev); };
    };
    const restorers = [
      setMeta('meta[name="description"]', vertical.seoDescription),
      setMeta('meta[property="og:title"]', vertical.seoTitle),
      setMeta('meta[property="og:description"]', vertical.seoDescription),
    ];

    const url = `https://waltburge.com/${vertical.slug}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const hadCanonical = !!canonical;
    const prevHref = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: vertical.seoTitle,
        description: vertical.seoDescription,
        provider: { '@type': 'Person', name: 'James Walton', url: 'https://waltburge.com' },
        areaServed: { '@type': 'AdministrativeArea', name: 'Mississippi' },
        url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: vertical.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]);
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      restorers.forEach(r => r());
      ld.remove();
      if (hadCanonical && prevHref !== null) canonical!.setAttribute('href', prevHref);
      else if (!hadCanonical) canonical!.remove();
    };
  }, [vertical.slug, vertical.seoTitle, vertical.seoDescription]);

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary pt-16 md:pt-20">
      {/* Bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center justify-between bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to site
        </button>
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em] flex items-center gap-3">
            <span className="w-8 h-px bg-brand-accent" /> {vertical.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.97] max-w-3xl">
            {vertical.h1}<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-6 text-brand-secondary text-lg md:text-xl max-w-2xl leading-relaxed">{vertical.intro}</p>
          <button
            onClick={book}
            className="group mt-8 inline-flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
          >
            Book a free call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Pain points */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border border border-brand-border">
          {vertical.painPoints.map(p => (
            <div key={p.label} className="bg-brand-base p-6">
              <div className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">{p.stat}</div>
              <p className="mt-2 text-sm text-brand-secondary leading-relaxed">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 mt-16 md:mt-20">
        <RevenueCalculator calc={vertical.calc} onBook={book} />
      </div>

      {/* How it works (full-bleed band) */}
      <div className="mt-16 md:mt-20">
        <HowItWorks />
      </div>

      {/* What I build */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="flex items-baseline gap-4 border-b border-brand-border pb-3">
          <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">What I build for you</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-brand-border border border-brand-border mt-6">
          {systems.map(s => (
            <button
              key={s.slug}
              onClick={() => onOpenSystem(s.slug)}
              className="group relative text-left bg-brand-base p-6 hover:bg-brand-surface transition-colors"
            >
              <span className="absolute top-0 left-0 w-0.5 h-full bg-brand-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              <h3 className="font-black text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors">{s.name}</h3>
              <p className="mt-2 text-brand-secondary text-[15px] leading-relaxed">{s.tagline}</p>
            </button>
          ))}
        </div>

        {/* Proof — MHP only, honest cross-vertical framing */}
        <div className="mt-12 border border-brand-border bg-brand-surface p-8 md:p-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent">Proof I ship</div>
          <p className="mt-4 text-lg md:text-xl text-brand-primary leading-relaxed max-w-3xl">
            I'm not a reseller plugging in someone else's software. I built and deployed a custom AI platform for a
            real Oxford business — <span className="font-bold">MHP Construction</span> — running in production today.
            Different trade, same playbook: a system built for one business, tuned to how they actually work, and
            owned by them.
          </p>
          <a
            href="/work/mhp-construction-case-study"
            className="mt-5 inline-flex items-center gap-1.5 text-brand-accent font-semibold hover:underline"
          >
            See the case study <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Objection FAQ */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
        <div className="flex items-baseline gap-4 border-b border-brand-border pb-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">Straight answers</h2>
        </div>
        {vertical.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-brand-border">
              <button onClick={() => setOpen(isOpen ? null : i)} className="group w-full flex items-start justify-between gap-6 text-left py-5" aria-expanded={isOpen}>
                <span className="font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{f.q}</span>
                <Plus size={18} className={`shrink-0 mt-1 text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="text-brand-secondary leading-relaxed pb-5 max-w-2xl">{f.a}</p></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why work with me (full-bleed band) */}
      <WhyWaltBuilds />

      {/* Final CTA */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter leading-[0.97]">
          Let's stop the leak<span className="text-brand-accent">.</span>
        </h2>
        <p className="mt-4 text-brand-secondary text-lg max-w-xl mx-auto leading-relaxed">
          Tell me where you're losing people. The first call and the estimate are free — and you'll talk to the
          person who builds it, not a sales rep.
        </p>
        <button
          onClick={book}
          className="group mt-8 inline-flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
        >
          Book a free call
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="mt-5 text-sm text-brand-secondary font-mono">
          or call / text <a href="tel:+16622925533" className="text-brand-accent hover:underline">(662) 292-5533</a>
        </p>
      </div>
    </div>
  );
};
