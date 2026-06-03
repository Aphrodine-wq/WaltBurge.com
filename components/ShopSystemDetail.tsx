import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { AISystem, systems, industryMenuSlug } from '../lib/shop';
import { NavLinks } from './NavLinks';

interface ShopSystemDetailProps {
  system: AISystem;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onOpenSystem: (slug: string) => void;
}

export const ShopSystemDetail: React.FC<ShopSystemDetailProps> = ({ system, onBack, onNavigate, onOpenSystem }) => {
  const related = systems.filter(s => s.slug !== system.slug && s.category === system.category).slice(0, 3);
  const menuSlug = industryMenuSlug[system.industry];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${system.seoTitle} | Walt Burge`;
    window.scrollTo(0, 0);

    const setMeta = (sel: string, val: string) => {
      const el = document.querySelector<HTMLMetaElement>(sel);
      const prev = el?.getAttribute('content') ?? null;
      el?.setAttribute('content', val);
      return () => { if (el && prev !== null) el.setAttribute('content', prev); };
    };
    const restorers = [
      setMeta('meta[name="description"]', system.seoDescription),
      setMeta('meta[property="og:title"]', system.seoTitle),
      setMeta('meta[property="og:description"]', system.seoDescription),
      setMeta('meta[property="og:type"]', 'product'),
    ];

    const url = `https://waltburge.com/shop/${system.slug}`;
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
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: system.name,
      serviceType: system.name,
      description: system.seoDescription,
      areaServed: 'US',
      provider: { '@type': 'Person', name: 'James Walton', url: 'https://waltburge.com' },
      url,
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      restorers.forEach(r => r());
      ld.remove();
      if (hadCanonical && prevHref !== null) canonical!.setAttribute('href', prevHref);
      else if (!hadCanonical) canonical!.remove();
    };
  }, [system.slug, system.seoTitle, system.seoDescription, system.name, system.industry]);

  return (
    <div className="min-h-screen bg-brand-base text-brand-primary pt-16 md:pt-20">
      {/* Bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-5 md:px-8 h-16 md:h-20 flex items-center justify-between bg-brand-base/85 backdrop-blur-md border-b border-brand-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to shop
        </button>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em]">
            {system.kind === 'engine' ? 'Engine' : system.kind === 'digital' ? 'Self-Serve' : system.category}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            {system.name}<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light text-brand-primary leading-snug">{system.tagline}</p>
          <p className="mt-5 text-brand-secondary text-base md:text-lg leading-relaxed">{system.summary}</p>
          <div className="mt-6 font-mono text-sm text-brand-accent">{system.priceFrom}</div>
        </motion.div>

        {/* What's included */}
        <section className="mt-12 pt-10 border-t border-brand-border">
          <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight mb-5">What's included</h2>
          <ul className="space-y-3">
            {system.includes.map(item => (
              <li key={item} className="flex gap-3 text-brand-secondary leading-relaxed">
                <Check size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes */}
        {system.outcomes && system.outcomes.length > 0 && (
          <section className="mt-12 pt-10 border-t border-brand-border">
            <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight mb-5">What you get out of it</h2>
            <ul className="space-y-3">
              {system.outcomes.map(o => (
                <li key={o} className="flex gap-3 text-brand-secondary leading-relaxed">
                  <ArrowRight size={18} className="text-brand-accent shrink-0 mt-0.5" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 pt-10 border-t border-brand-border">
          {system.link ? (
            <a
              href={system.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
            >
              Get it on GitHub <ArrowUpRight size={16} />
            </a>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">Want {system.name} in your business?</h3>
              <p className="mt-3 text-brand-secondary max-w-xl">Book a free call. I'll scope it to what you actually need and give you a real number — no obligation.</p>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-6 px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Book a call about {system.name}
              </button>
            </>
          )}
          {menuSlug && (
            <p className="mt-6 text-sm text-brand-secondary">
              See the full{' '}
              <a href={`/services/${menuSlug}`} className="text-brand-accent font-semibold hover:underline">
                {system.industry === 'law' ? 'legal & business' : system.industry} service menu
              </a>{' '}
              for everything else I build.
            </p>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-brand-border">
            <h2 className="font-mono text-xs uppercase tracking-widest text-brand-faint mb-5">More in {system.category}</h2>
            <div className="grid sm:grid-cols-3 gap-px bg-brand-border border border-brand-border">
              {related.map(r => (
                <button
                  key={r.slug}
                  onClick={() => onOpenSystem(r.slug)}
                  className="group text-left bg-brand-base p-5 hover:bg-brand-surface transition-colors"
                >
                  <div className="font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{r.name}</div>
                  <div className="mt-1 text-sm text-brand-secondary">{r.tagline}</div>
                  <div className="mt-2 font-mono text-xs text-brand-accent">{r.priceFrom}</div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
