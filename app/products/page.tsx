import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'AI-powered products by Walt Burge. ConstructionAI: fine-tuned construction cost estimation API with 18,000+ training examples.',
  openGraph: {
    title: 'Products | Walt Burge',
    description:
      'AI-powered products by Walt Burge. ConstructionAI: fine-tuned construction cost estimation API with 18,000+ training examples.',
  },
  alternates: {
    canonical: 'https://waltburge.com/products',
  },
};

const products = [
  {
    icon: Cpu,
    title: 'ConstructionAI',
    href: '/products/construction-ai',
    tagline: 'AI-Powered Construction Cost Estimation',
    description:
      'Fine-tuned Llama 3.1 8B model trained on 18,000+ real construction projects. Generates detailed line-item estimates with materials, labor, waste factors, and market-adjusted pricing in seconds. $0.002 per estimate. Live in production.',
    stats: [
      { value: '18K+', label: 'Training Examples' },
      { value: '$0.002', label: 'Per Estimate' },
      { value: '~88%', label: 'Accuracy' },
    ],
  },
];

export default function ProductsPage() {
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
                name: 'Products',
                item: 'https://waltburge.com/products',
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
            <span className="text-brand-primary">Products</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Walt Burge
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
            Products
          </h1>
          <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
            AI-powered products built for industries that need accuracy, speed, and real
            production deployment -- not demos.
          </p>
        </section>

        {/* Product Cards */}
        <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          <div className="space-y-6">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group block p-8 md:p-10 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/60 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-xl bg-brand-base border border-brand-border p-3 mb-6 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                      <product.icon className="w-7 h-7 text-brand-accent" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter mb-2 group-hover:text-brand-accent transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-brand-accent font-mono text-sm mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-brand-secondary leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider">
                      View Product <ArrowRight size={14} />
                    </span>
                  </div>
                  <div className="flex md:flex-col gap-4 md:gap-3">
                    {product.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-3 md:p-4 rounded-xl border border-brand-border/40 bg-brand-base/50 min-w-[100px]"
                      >
                        <div className="text-lg md:text-xl font-black text-brand-accent tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-brand-secondary font-mono mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
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

        {/* Custom Products */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Custom Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            Need Something Similar for Your Industry?
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-8">
            I also build custom AI products for clients. If you want something similar built
            for your industry -- a fine-tuned model, an estimation engine, an automation
            platform -- see my services.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              View Services <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
