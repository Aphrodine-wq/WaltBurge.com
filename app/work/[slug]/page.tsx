import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { caseStudies, getCaseStudy, getAllSlugs } from '@/lib/case-studies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  return {
    title: `${cs.client} | Case Study`,
    description: cs.headline,
    openGraph: {
      title: `${cs.client} Case Study | Walt Burge`,
      description: cs.headline,
      type: 'article',
      url: `https://waltburge.com/work/${cs.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${cs.client} Case Study`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cs.client} Case Study | Walt Burge`,
      description: cs.headline,
    },
    alternates: {
      canonical: `https://waltburge.com/work/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.headline,
    description: cs.challenge,
    author: {
      '@type': 'Person',
      name: 'James Walton',
      alternateName: 'Walt Burge',
      url: 'https://waltburge.com/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Walt Burge',
      url: 'https://waltburge.com',
    },
    url: `https://waltburge.com/work/${cs.slug}`,
    mainEntityOfPage: `https://waltburge.com/work/${cs.slug}`,
    about: {
      '@type': 'Organization',
      name: cs.client,
    },
    keywords: [cs.industry, ...cs.techStack].join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://waltburge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: 'https://waltburge.com/work',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cs.client,
        item: `https://waltburge.com/work/${cs.slug}`,
      },
    ],
  };

  // Find other case studies for "More Work" section
  const otherStudies = caseStudies.filter((s) => s.slug !== cs.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-brand-base">
        {/* Nav bar */}
        <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center bg-brand-base/95 backdrop-blur border-b border-brand-border">
          <Link
            href="/work"
            className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm"
          >
            <ArrowLeft size={16} /> All Work
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28">
          <nav className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-brand-accent transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-brand-primary">{cs.client}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-accent border border-brand-accent/30 rounded-full mb-6">
              {cs.industry}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              {cs.client}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-brand-secondary max-w-3xl leading-snug font-bold tracking-tight">
              {cs.headline}
            </p>
          </div>
        </section>

        {/* The Challenge */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. The Challenge
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            The Problem
          </h2>
          <p className="text-brand-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            {cs.challenge}
          </p>
        </section>

        {/* The Solution */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. The Solution
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            What I Built
          </h2>
          <p className="text-brand-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            {cs.solution}
          </p>
        </section>

        {/* Results */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. The Results
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {cs.results.map((result) => (
              <div
                key={result.label}
                className="p-5 md:p-6 rounded-2xl bg-brand-surface/30 border border-brand-accent/20 text-center hover:border-brand-accent/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-2">
                  {result.metric}
                </div>
                <div className="text-[10px] md:text-xs text-brand-accent uppercase tracking-widest font-mono">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            04. Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Built With
          </h2>
          <div className="flex flex-wrap gap-3">
            {cs.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-mono text-brand-primary bg-brand-surface/50 border border-brand-border/50 hover:border-brand-accent/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="p-8 md:p-12 rounded-2xl border border-brand-border/40 bg-brand-surface/20 relative">
            <Quote className="w-10 h-10 text-brand-accent/20 absolute top-6 left-6 md:top-8 md:left-8" />
            <div className="pl-0 md:pl-8 pt-8 md:pt-4">
              <p className="text-brand-secondary text-lg md:text-xl leading-relaxed italic mb-6">
                &ldquo;{cs.testimonial}&rdquo;
              </p>
              <div className="text-sm font-mono text-brand-accent uppercase tracking-widest">
                &mdash; {cs.client}
              </div>
            </div>
          </div>
        </section>

        {/* Related Service CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="p-8 md:p-12 rounded-2xl border border-brand-accent/30 bg-brand-accent/5">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
              Related Service
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter mb-4">
              Need Something Similar?
            </h3>
            <p className="text-brand-secondary text-lg leading-relaxed mb-6 max-w-2xl">
              This project was built under my{' '}
              <strong className="text-brand-primary">{cs.relatedService.label}</strong>{' '}
              service. If you are facing a similar challenge, I can help.
            </p>
            <Link
              href={cs.relatedService.href}
              className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider hover:gap-3 transition-all"
            >
              See {cs.relatedService.label} <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* More Work */}
        {otherStudies.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
              More Work
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
              Other Case Studies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherStudies.map((other) => (
                <Link
                  key={other.slug}
                  href={`/work/${other.slug}`}
                  className="group p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-brand-accent border border-brand-accent/30 rounded-full mb-3">
                    {other.industry}
                  </span>
                  <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {other.client}
                  </h3>
                  <p className="text-brand-secondary text-sm leading-relaxed mb-4">
                    {other.headline}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read More <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Let&apos;s Build Something Like This
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Every project on this page started with a conversation. Tell me
              what you need — I will tell you exactly how I would build it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
