import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Users,
  Smartphone,
  FileText,
  CreditCard,
  Radio,
  Briefcase,
  HardHat,
  Home,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'FairTradeWorker | AI-Powered Construction Marketplace Platform',
  description:
    'Three-sided construction marketplace with AI-powered cost estimation. Homeowners get fair prices. Contractors win more bids. Subcontractors get fair rates. Powered by ConstructionAI.',
  openGraph: {
    title: 'FairTradeWorker | AI-Powered Construction Marketplace Platform | Walt Burge',
    description:
      'Three-sided construction marketplace with AI-powered cost estimation. Homeowners get fair prices. Contractors win more bids. Subcontractors get fair rates. Powered by ConstructionAI.',
  },
  alternates: {
    canonical: 'https://waltburge.com/products/fairtradeworker',
  },
};

const problemCards = [
  {
    icon: Home,
    role: 'Homeowners',
    problem:
      "Can't tell if a bid is fair. No baseline. Overpay or pick the cheapest (and regret it).",
  },
  {
    icon: HardHat,
    role: 'Contractors',
    problem:
      'Lose bids because estimation takes days. Competitors who guess faster win the job.',
  },
  {
    icon: Briefcase,
    role: 'Subcontractors',
    problem:
      'Get squeezed on rates. No direct access to jobs. Dependent on GCs.',
  },
];

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Estimation',
    description:
      'ConstructionAI generates line-item estimates in seconds. 18,000+ training examples.',
  },
  {
    icon: Radio,
    title: 'Real-Time Bidding',
    description:
      'WebSocket-powered live bidding. Homeowners see bids come in real-time.',
  },
  {
    icon: CreditCard,
    title: 'QuickBooks Integration',
    description:
      'Native payment flows. Invoicing, payouts, and accounting in one system.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: '30+ screen React Native app for contractors on the go.',
  },
  {
    icon: Users,
    title: 'Three-Role System',
    description:
      'Homeowner, contractor, and subcontractor portals with role-specific workflows.',
  },
  {
    icon: FileText,
    title: 'Professional Proposals',
    description:
      'AI-generated estimates convert to branded PDF proposals in one click.',
  },
];

const revenueStreams = [
  { number: '01', title: 'Transaction Fees', description: '2-3% on payments processed through the platform' },
  { number: '02', title: 'Contractor Subscription', description: '$299/month for premium tools and priority placement' },
  { number: '03', title: 'Premium Listings', description: 'Featured placement and promoted contractor profiles' },
  { number: '04', title: 'White-Label Licensing', description: 'License the platform to other regional markets' },
  { number: '05', title: 'ConstructionAI API', description: 'Sell AI estimation as a standalone API to construction software' },
  { number: '06', title: 'Lead Generation', description: 'Qualified homeowner leads delivered to contractors' },
];

const tractionMetrics = [
  { value: 'Live', label: 'In Production', detail: 'MHP Construction, Oxford MS' },
  { value: '18,000+', label: 'AI Training Examples', detail: 'Scaling to 500K+' },
  { value: '30+', label: 'Mobile App Screens', detail: 'React Native, cross-platform' },
  { value: '3', label: 'Integrated Platforms', detail: 'Web, mobile, API' },
];

const techStack = [
  'Next.js',
  'TypeScript',
  'Kotlin',
  'Spring Boot',
  'React Native',
  'PostgreSQL',
  'QuickBooks API',
  'WebSocket',
  'Python',
  'PyTorch',
  'Llama 3.1',
  'RunPod',
];

export default function FairTradeWorkerPage() {
  return (
    <>
      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'FairTradeWorker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, iOS, Android',
            description:
              'Three-sided construction marketplace with AI-powered cost estimation. Homeowners get fair prices. Contractors win more bids. Subcontractors get fair rates.',
            url: 'https://waltburge.com/products/fairtradeworker',
            offers: {
              '@type': 'Offer',
              name: 'Contractor Subscription',
              price: '299',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '299',
                priceCurrency: 'USD',
                referenceQuantity: {
                  '@type': 'QuantitativeValue',
                  value: '1',
                  unitCode: 'MON',
                },
              },
              description:
                'Full platform access with AI estimation, real-time bidding, QuickBooks integration, and mobile app.',
            },
          }),
        }}
      />

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
              {
                '@type': 'ListItem',
                position: 3,
                name: 'FairTradeWorker',
                item: 'https://waltburge.com/products/fairtradeworker',
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
            <Link href="/products" className="hover:text-brand-accent transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-brand-primary">FairTradeWorker</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Product
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-4">
              FairTradeWorker
            </h1>
            <p className="text-lg md:text-xl text-brand-accent font-mono tracking-tight mb-6">
              The Construction Marketplace That&apos;s Fair for Everyone
            </p>
            <p className="text-brand-secondary text-lg max-w-3xl leading-relaxed mb-8">
              Homeowners get instant fair-price estimates before contractors bid. Contractors
              generate professional estimates in seconds, not days. Subcontractors get fair
              rates and consistent work. AI-powered. QuickBooks-native. Built by a builder.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
              >
                Request a Demo <ArrowRight size={16} />
              </Link>
              <a
                href="https://fair-trade-worker.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
              >
                View Platform <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Three Sides. Three Problems. Zero Good Solutions.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {problemCards.map((card) => (
              <div
                key={card.role}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{card.role}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                  {card.problem}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            The Solution
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            One Platform. All Three Sides. AI at the Core.
          </h2>
          <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30">
            <p className="text-brand-secondary text-lg leading-relaxed">
              FairTradeWorker solves all three sides at once. AI-powered estimation gives
              homeowners a fair-price baseline instantly. Contractors generate professional
              estimates in seconds, win more bids, and manage jobs from one platform.
              Subcontractors access jobs directly and get fair rates.
            </p>
          </div>
        </section>

        {/* Platform Features */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Everything a Construction Business Needs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{feature.title}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Model */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Revenue Model
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            6 Revenue Streams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {revenueStreams.map((stream) => (
              <div
                key={stream.number}
                className="p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="text-brand-accent font-mono text-sm font-bold mb-3">
                  {stream.number}
                </div>
                <h3 className="text-lg font-bold text-brand-primary mb-2">{stream.title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {stream.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Traction */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Traction
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Built and Deployed. Not a Prototype.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tractionMetrics.map((metric) => (
              <div
                key={metric.label}
                className="text-center p-5 md:p-6 rounded-xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-brand-primary font-mono mt-1 font-bold">
                  {metric.label}
                </div>
                <div className="text-[10px] md:text-xs text-brand-secondary font-mono mt-1">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* For Investors & Partners */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            For Investors &amp; Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            A $1.8 Trillion Market. Still Running on Spreadsheets.
          </h2>
          <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30 mb-8">
            <p className="text-brand-secondary text-lg leading-relaxed mb-6">
              FairTradeWorker is seeking strategic partners, investors, and acquirers. The
              construction industry is $1.8 trillion in the US alone -- and most of it still
              runs on spreadsheets and phone calls.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-base/50 border border-brand-border/30">
              <Shield className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" />
              <p className="text-brand-secondary leading-relaxed">
                Our AI estimation engine (ConstructionAI) is a defensible moat -- 18,000+
                curated training examples that took months to build. A competitor starting
                from scratch needs 6-12 months just to reach our current baseline.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Request Investor Materials <ArrowRight size={16} />
            </Link>
            <Link
              href="/work/fairtradeworker"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
            >
              View Technical Case Study <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Production-Grade Engineering
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-brand-surface border border-brand-border/40 text-sm font-mono text-brand-secondary hover:border-brand-accent/40 hover:text-brand-accent transition-colors"
              >
                {tech}
              </span>
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

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to See It in Action?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Request a demo and see how FairTradeWorker is changing construction for
              homeowners, contractors, and subcontractors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
              >
                Request a Demo <ArrowRight size={18} />
              </Link>
              <a
                href="https://fair-trade-worker.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
              >
                View Live Platform <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
