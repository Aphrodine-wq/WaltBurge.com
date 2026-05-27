import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, FileText, CheckCircle, Building2, Wrench, Users } from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'ConstructionAI | AI-Powered Construction Cost Estimation API',
  description:
    'Fine-tuned AI model that generates detailed construction cost estimates in seconds. 18,000+ training examples. $0.002 per estimate. API access for contractors, estimators, and construction software companies.',
  openGraph: {
    title: 'ConstructionAI | AI-Powered Construction Cost Estimation API | Walt Burge',
    description:
      'Fine-tuned AI model that generates detailed construction cost estimates in seconds. 18,000+ training examples. $0.002 per estimate. API access for contractors, estimators, and construction software companies.',
  },
  alternates: {
    canonical: 'https://waltburge.com/products/construction-ai',
  },
};

const metrics = [
  { value: '18,000+', label: 'Training Examples' },
  { value: '$0.002', label: 'Per Estimate' },
  { value: 'Seconds', label: 'Not Days' },
  { value: '~88%', label: 'Accuracy on Held-Out Jobs' },
  { value: '500K+', label: 'Scaling To' },
  { value: 'Live', label: 'In Production' },
];

const contractorFeatures = [
  'Instant line-item estimates',
  'Material quantities and waste factors',
  'Labor hours by trade',
  'Market-adjusted pricing',
  'Professional proposal-ready output',
];

const enterpriseFeatures = [
  'REST API integration',
  'White-label estimation engine',
  'Bulk pricing for high volume',
  'Custom model fine-tuning on your data',
  'Dedicated support',
];

const pricingTiers = [
  {
    name: 'Contractor',
    price: '$299',
    period: '/month',
    features: [
      'Up to 100 estimates/month',
      'Web interface',
      'PDF export',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$799',
    period: '/month',
    features: [
      'Up to 500 estimates/month',
      'API access',
      'Team accounts',
      'Priority support',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise / White-Label',
    price: 'Custom',
    period: ' pricing',
    features: [
      'Unlimited estimates',
      'API + white-label',
      'Custom fine-tuning on your data',
      'Dedicated support',
      'SLA',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'How accurate is ConstructionAI?',
    answer:
      '~88% accuracy on held-out real jobs. It is trained on 18,000+ real construction projects, not generic internet data.',
  },
  {
    question: 'Can I fine-tune it on my company\'s data?',
    answer:
      'Yes. Enterprise plans include custom fine-tuning on your historical estimates.',
  },
  {
    question: 'How does pricing compare to manual estimation?',
    answer:
      'A human estimator costs $60K-$100K/year. ConstructionAI costs $299-$799/month and works 24/7.',
  },
  {
    question: 'What trades does it cover?',
    answer:
      'Residential and commercial across all major trades -- framing, electrical, plumbing, HVAC, roofing, concrete, drywall, painting, flooring, and more.',
  },
];

export default function ConstructionAIProductPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'AI-Powered Construction Cost Estimation',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
              url: 'https://waltburge.com',
            },
            name: 'ConstructionAI',
            description:
              'Fine-tuned AI model that generates detailed construction cost estimates in seconds. Trained on 18,000+ real construction projects.',
            areaServed: { '@type': 'Country', name: 'United States' },
            url: 'https://waltburge.com/products/construction-ai',
          }),
        }}
      />

      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ConstructionAI',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, API',
            description:
              'AI-powered construction cost estimation platform. Fine-tuned Llama 3.1 8B model trained on 18,000+ real construction projects.',
            url: 'https://waltburge.com/products/construction-ai',
            offers: [
              {
                '@type': 'Offer',
                name: 'Contractor Plan',
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
                description: 'Up to 100 estimates/month, web interface, PDF export, email support',
              },
              {
                '@type': 'Offer',
                name: 'Business Plan',
                price: '799',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '799',
                  priceCurrency: 'USD',
                  referenceQuantity: {
                    '@type': 'QuantitativeValue',
                    value: '1',
                    unitCode: 'MON',
                  },
                },
                description: 'Up to 500 estimates/month, API access, team accounts, priority support, custom branding',
              },
              {
                '@type': 'Offer',
                name: 'Enterprise / White-Label Plan',
                price: '0',
                priceCurrency: 'USD',
                description: 'Unlimited estimates, API + white-label, custom fine-tuning, dedicated support, SLA. Contact for pricing.',
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
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
                name: 'ConstructionAI',
                item: 'https://waltburge.com/products/construction-ai',
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
            <span className="text-brand-primary">ConstructionAI</span>
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
              ConstructionAI
            </h1>
            <p className="text-lg md:text-xl text-brand-accent font-mono tracking-tight mb-6">
              AI-Powered Construction Cost Estimation
            </p>
            <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-8">
              Detailed line-item estimates in seconds, not days. Trained on 18,000+ real
              construction projects. Deployed in production for real contractors.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
              >
                See Pricing <ArrowRight size={16} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
              >
                Request API Access
              </Link>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Generic AI Does Not Know Construction
          </h2>
          <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
            <p className="text-brand-secondary text-lg leading-relaxed">
              Ask ChatGPT to estimate a bathroom remodel and it hallucinates line items, invents
              prices, and has no concept of regional labor rates. Contractors need accuracy, not
              confident-sounding nonsense.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Three Steps to an Estimate
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FileText,
                step: '01',
                title: 'Describe the Project',
                description:
                  'Upload specs, describe the scope, or use the chat interface.',
              },
              {
                icon: Zap,
                step: '02',
                title: 'AI Generates the Estimate',
                description:
                  'Line items with materials, labor, quantities, waste factors, and market-adjusted pricing.',
              },
              {
                icon: CheckCircle,
                step: '03',
                title: 'Review and Send',
                description:
                  'Professional estimate ready to bid or present to clients.',
              },
            ].map((step) => (
              <div
                key={step.step}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-base border border-brand-border flex items-center justify-center text-brand-accent font-mono text-sm font-bold mb-5">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{step.title}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* By The Numbers */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Production-Ready Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="text-center p-4 md:p-6 rounded-xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-brand-secondary font-mono mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            What You Get
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Built for Two Audiences
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Contractors & Estimators */}
            <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-6">
                For Contractors & Estimators
              </h3>
              <ul className="space-y-3">
                {contractorFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-accent mt-0.5 shrink-0" />
                    <span className="text-brand-secondary text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Companies */}
            <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30">
              <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-accent/30 p-2.5 mb-5 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-2xl font-black text-brand-primary tracking-tighter mb-6">
                For Construction Software Companies
              </h3>
              <ul className="space-y-3">
                {enterpriseFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-accent mt-0.5 shrink-0" />
                    <span className="text-brand-secondary text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-brand-secondary text-lg mb-12">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-6 md:p-8 rounded-2xl border ${
                  tier.highlighted
                    ? 'border-brand-accent/60 bg-brand-surface/50 ring-1 ring-brand-accent/20'
                    : 'border-brand-border/40 bg-brand-surface/30'
                } flex flex-col`}
              >
                {tier.highlighted && (
                  <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-brand-primary mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl md:text-4xl font-black text-brand-accent tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-brand-secondary text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-brand-accent mt-0.5 shrink-0" />
                      <span className="text-brand-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-full transition-colors text-center ${
                    tier.highlighted
                      ? 'bg-brand-accent text-brand-base hover:bg-brand-accent/90'
                      : 'border border-brand-border text-brand-primary hover:border-brand-accent/60 hover:text-brand-accent'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Frequently Asked Questions
          </h2>
          <FAQSection items={faqs} />
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
              Start Your Free Trial
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              14 days free. No credit card required. See how ConstructionAI can transform
              your estimation workflow.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
