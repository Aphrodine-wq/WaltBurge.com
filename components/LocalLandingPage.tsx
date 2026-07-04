import React, { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { LocalPage, websitePages, townForSlug } from '../lib/local';
import { getSystem } from '../lib/shop';
import { workItems } from '../lib/work';
import { NavLinks } from './NavLinks';
import { Testimonials } from './Testimonials';

// Portfolio pieces shown on the website-design town pages — real sites, not
// the AI product cards the industry pages feature.
const WEBSITE_WORK_SLUGS = ['lifebalanceoxford', 'mshomepros', 'fairtradeworker'];

interface LocalLandingPageProps {
  page: LocalPage;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onOpenSystem: (slug: string) => void;
}

export const LocalLandingPage: React.FC<LocalLandingPageProps> = ({ page, onBack, onNavigate, onOpenSystem }) => {
  const [open, setOpen] = useState<number | null>(0);
  const featured = page.systemSlugs.map(getSystem).filter(Boolean) as NonNullable<ReturnType<typeof getSystem>>[];
  const isWebsitePage = page.slug.startsWith('website-design-');
  const town = townForSlug(page.slug);
  const featuredWork = workItems.filter(w => WEBSITE_WORK_SLUGS.includes(w.slug ?? ''));
  const siblingTowns = isWebsitePage ? websitePages.filter(p => p.slug !== page.slug) : [];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${page.seoTitle} | Walt Burge`;
    window.scrollTo(0, 0);

    const setMeta = (sel: string, val: string) => {
      const el = document.querySelector<HTMLMetaElement>(sel);
      const prev = el?.getAttribute('content') ?? null;
      el?.setAttribute('content', val);
      return () => { if (el && prev !== null) el.setAttribute('content', prev); };
    };
    const restorers = [
      setMeta('meta[name="description"]', page.seoDescription),
      setMeta('meta[property="og:title"]', page.seoTitle),
      setMeta('meta[property="og:description"]', page.seoDescription),
    ];

    const url = `https://waltburge.com/${page.slug}`;
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
        name: page.h1,
        description: page.seoDescription,
        provider: { '@type': 'Organization', name: 'Walt Builds', url: 'https://waltburge.com' },
        areaServed: [
          { '@type': 'City', name: 'Oxford', containedInPlace: { '@type': 'State', name: 'Mississippi' } },
          { '@type': 'City', name: 'Tupelo' },
          { '@type': 'City', name: 'Batesville' },
          { '@type': 'AdministrativeArea', name: 'North Mississippi' },
        ],
        url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(f => ({
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
  }, [page.slug, page.seoTitle, page.seoDescription, page.h1]);

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

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-mono text-xs text-brand-accent uppercase tracking-[0.22em] flex items-center gap-3">
            <span className="w-8 h-px bg-brand-accent" /> {isWebsitePage ? `Website Design · ${town ?? 'North'}, MS` : 'AI Consultant · Oxford, MS'}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-brand-primary tracking-tighter leading-[0.95]">
            {page.h1}<span className="text-brand-accent">.</span>
          </h1>
          <p className="mt-5 text-brand-secondary text-base md:text-lg max-w-2xl leading-relaxed">{page.intro}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
            >
              Book a free call
            </button>
            <button
              onClick={() => onNavigate('audit')}
              className="px-8 py-4 border border-brand-border hover:border-brand-accent bg-brand-surface text-brand-primary text-sm font-semibold tracking-wide transition-colors"
            >
              Get a free audit
            </button>
          </div>
        </motion.div>

        {/* Featured: real websites on the town pages, AI systems on the industry pages */}
        <section className="mt-16">
          <div className="flex items-baseline gap-4 border-b border-brand-border pb-3">
            <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">
              {isWebsitePage ? 'Recent websites I’ve built' : `What I build for ${page.industry.toLowerCase()}`}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-brand-border border border-brand-border mt-6">
            {isWebsitePage ? featuredWork.map(w => (
              <a
                key={w.slug}
                href={`/work/${w.slug}`}
                className="group relative block text-left bg-brand-base p-6 hover:bg-brand-surface transition-colors"
              >
                <span className="absolute top-0 left-0 w-0.5 h-full bg-brand-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                <h3 className="font-black text-brand-primary tracking-tight group-hover:text-brand-accent transition-colors">{w.title}</h3>
                <p className="mt-2 text-brand-secondary text-[15px] leading-relaxed">{w.summary || w.description}</p>
              </a>
            )) : featured.map(s => (
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
        </section>

        {isWebsitePage && <Testimonials />}

        {/* Local FAQ */}
        <section className="mt-16">
          <div className="flex items-baseline gap-4 border-b border-brand-border pb-3 mb-2">
            <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">Questions</h2>
          </div>
          {page.faqs.map((f, i) => {
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
        </section>

        {/* CTA + links */}
        <div className="mt-16 pt-10 border-t border-brand-border">
          <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">Let's build something in {town ?? 'North Mississippi'}.</h3>
          <p className="mt-3 text-brand-secondary max-w-xl">
            Tell me the problem. The call and the estimate are free — and I'm {town === 'Oxford' ? 'right here in town' : 'just up the road in Oxford'}.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold tracking-wide transition-colors"
            >
              Book a free call
            </button>
            <button
              onClick={() => onNavigate('audit')}
              className="px-8 py-4 border border-brand-border hover:border-brand-accent bg-brand-surface text-brand-primary text-sm font-semibold tracking-wide transition-colors"
            >
              Get a free audit
            </button>
          </div>
          <p className="mt-6 text-sm text-brand-secondary flex flex-wrap gap-x-6 gap-y-2">
            {isWebsitePage ? (
              <a href="/work" className="inline-flex items-center gap-1.5 text-brand-accent font-semibold hover:underline">
                See all my work <ArrowRight size={14} />
              </a>
            ) : (
              <button onClick={() => onOpenSystem(featured[0]?.slug)} className="inline-flex items-center gap-1.5 text-brand-accent font-semibold hover:underline">
                Browse all AI systems <ArrowRight size={14} />
              </button>
            )}
            {isWebsitePage && (
              <a href="/services" className="inline-flex items-center gap-1.5 text-brand-accent font-semibold hover:underline">
                See the full service menu <ArrowRight size={14} />
              </a>
            )}
            {!isWebsitePage && page.servicesSlug && (
              <a href={`/services/${page.servicesSlug}`} className="inline-flex items-center gap-1.5 text-brand-accent font-semibold hover:underline">
                See the full service menu <ArrowRight size={14} />
              </a>
            )}
          </p>

          {/* Town cross-links keep the local pages one hop from each other for
              crawlers and for visitors a county over. */}
          {siblingTowns.length > 0 && (
            <p className="mt-8 pt-6 border-t border-brand-border text-sm text-brand-secondary">
              <span className="font-semibold text-brand-primary">Also building websites in: </span>
              {siblingTowns.map((p, i) => (
                <React.Fragment key={p.slug}>
                  {i > 0 && ' · '}
                  <a href={`/${p.slug}`} className="text-brand-accent hover:underline">{townForSlug(p.slug)}</a>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
