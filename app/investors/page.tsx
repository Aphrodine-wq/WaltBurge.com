import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Shield, Cpu, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investors & Partners | FairTradeWorker + ConstructionAI',
  description:
    'Investment and partnership opportunities in FairTradeWorker and ConstructionAI -- AI-powered construction technology.',
  robots: { index: false },
  openGraph: {
    title: 'Investors & Partners | FairTradeWorker + ConstructionAI',
    description:
      'Investment and partnership opportunities in FairTradeWorker and ConstructionAI -- AI-powered construction technology.',
  },
};

const keyMetrics = [
  { value: '$1.8T', label: 'US Construction Market' },
  { value: '18,000+', label: 'AI Training Examples' },
  { value: '$0.002', label: 'Per AI Estimate' },
  { value: '6', label: 'Revenue Streams' },
  { value: '30+', label: 'Mobile App Screens' },
  { value: '1', label: 'Production Client (with pipeline)' },
];

const seekingItems = [
  {
    title: 'Seed Investment ($1-3M)',
    description: 'To scale go-to-market, expand the sales team, and accelerate ConstructionAI training data to 500K+ examples.',
  },
  {
    title: 'Strategic Partnership',
    description: 'With established construction platforms seeking AI estimation capabilities or marketplace distribution.',
  },
  {
    title: 'Acquisition',
    description: 'By a construction tech company looking to add AI estimation, a three-sided marketplace, or a curated training dataset.',
  },
  {
    title: 'White-Label Licensing',
    description: 'Deals with regional construction marketplaces that want AI-powered estimation and bidding infrastructure.',
  },
];

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-brand-base">
      {/* Nav bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center bg-brand-base/95 backdrop-blur border-b border-brand-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 pt-28 md:pt-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Confidential
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-4">
            Investment &amp; Partnership Opportunities
          </h1>
          <p className="text-lg md:text-xl text-brand-accent font-mono tracking-tight">
            FairTradeWorker + ConstructionAI
          </p>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          The Opportunity
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
          $1.8 Trillion Market. Still on Spreadsheets.
        </h2>
        <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30">
          <p className="text-brand-secondary text-lg leading-relaxed">
            Construction is a $1.8 trillion market in the US. Most contractors still estimate
            by hand, bid by phone, and track jobs on spreadsheets. We built the platform that
            replaces all of it -- with AI at the core.
          </p>
        </div>
      </section>

      {/* What We've Built */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          What We&apos;ve Built
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
          Two Products. One Integrated Platform.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* FairTradeWorker Card */}
          <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-4">
              FairTradeWorker
            </h3>
            <p className="text-brand-secondary leading-relaxed mb-4">
              3-sided construction marketplace. Homeowners, contractors, subcontractors.
              AI estimation, real-time bidding, QuickBooks payments, mobile app.
            </p>
            <Link
              href="/products/fairtradeworker"
              className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider hover:underline"
            >
              View Product <ArrowRight size={14} />
            </Link>
          </div>

          {/* ConstructionAI Card */}
          <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-4">
              ConstructionAI
            </h3>
            <p className="text-brand-secondary leading-relaxed mb-4">
              Fine-tuned Llama 3.1 8B. 18,000+ training examples. $0.002/inference.
              Production deployed. Scaling to 500K+ examples.
            </p>
            <Link
              href="/products/construction-ai"
              className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider hover:underline"
            >
              View Product <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          Key Metrics
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
          By The Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center p-5 md:p-8 rounded-xl border border-brand-border/40 bg-brand-surface/30"
            >
              <div className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-brand-secondary font-mono mt-2">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Moat */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          The Moat
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
          Data Is the Defensible Advantage
        </h2>
        <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-brand-accent shrink-0 mt-1" />
            <p className="text-brand-secondary text-lg leading-relaxed">
              Our training data is our moat. 18,000+ curated construction project examples --
              distilled, validated, and refined. This dataset took months to build. A competitor
              starting from scratch needs 6-12 months just to reach our current baseline. And
              we&apos;re scaling to 500K+.
            </p>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          What We&apos;re Looking For
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
          Partnership Opportunities
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {seekingItems.map((item) => (
            <div
              key={item.title}
              className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
            >
              <h3 className="text-xl font-bold text-brand-primary mb-3">{item.title}</h3>
              <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          Team
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
          Built by a Builder
        </h2>
        <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
          <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-4">
            Walt Burge
          </h3>
          <p className="text-brand-accent font-mono text-sm mb-4">
            Founder, AI Engineer &amp; Full-Stack Developer
          </p>
          <p className="text-brand-secondary text-lg leading-relaxed">
            Built every line of code. Former construction worker who understands the industry
            from the inside. Based in Oxford, Mississippi.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-border/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mx-4" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-border/30" />
        </div>
      </div>

      {/* Contact CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
            Let&apos;s Talk
          </h2>
          <p className="text-brand-secondary text-lg mb-2 max-w-lg mx-auto">
            To request a demo, pitch deck, or discuss partnership:
          </p>
          <a
            href="mailto:jamesburge.mcm@gmail.com"
            className="text-brand-accent font-mono text-lg hover:underline mb-8 inline-block"
          >
            jamesburge.mcm@gmail.com
          </a>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Request Investor Materials <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
