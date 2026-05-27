import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Work | Client Projects & Case Studies',
  description:
    'Real projects, real clients, real results. Case studies from Walt Burge — AI engineering, custom software, and construction technology in Oxford, MS.',
  openGraph: {
    title: 'Work | Client Projects & Case Studies | Walt Burge',
    description:
      'Real projects, real clients, real results. Case studies from Walt Burge — AI engineering, custom software, and construction technology.',
  },
  alternates: {
    canonical: 'https://waltburge.com/work',
  },
};

export default function WorkPage() {
  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            ],
          }),
        }}
      />

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

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28">
          <nav className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-primary">Work</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Work
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Real projects. Real clients. Real results. Here&apos;s what I&apos;ve built.
            </p>
          </div>
        </section>

        {/* Case Study Grid */}
        <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {caseStudies.map((cs, index) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group relative p-8 md:p-10 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/60 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-brand-secondary/40 font-mono text-xs absolute top-6 right-6">
                  0{index + 1}
                </span>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-accent border border-brand-accent/30 rounded-full">
                    {cs.industry}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter mb-3 group-hover:text-brand-accent transition-colors">
                  {cs.client}
                </h2>

                <p className="text-brand-secondary leading-relaxed mb-6 text-sm md:text-base">
                  {cs.headline}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1.5 rounded-lg bg-brand-base border border-brand-border/60 text-center">
                    <div className="text-sm font-bold text-brand-primary">
                      {cs.results[0].metric}
                    </div>
                    <div className="text-[9px] text-brand-secondary uppercase tracking-wider font-mono">
                      {cs.results[0].label}
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-brand-base border border-brand-border/60 text-center">
                    <div className="text-sm font-bold text-brand-primary">
                      {cs.results[1].metric}
                    </div>
                    <div className="text-[9px] text-brand-secondary uppercase tracking-wider font-mono">
                      {cs.results[1].label}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read Case Study <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Be the Next Case Study?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about your project. I will tell you exactly how I would
              build it, what it will cost, and when it will ship.
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
