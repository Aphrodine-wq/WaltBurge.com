import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, Landmark, Shield, CheckCircle, Brain, Workflow, Crown, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Solutions & Government Contracts',
  description:
    'Custom AI systems, enterprise software development, and government IT solutions. Based in Oxford, Mississippi. Available for contracts $50K-$500K+.',
  openGraph: {
    title: 'Enterprise Solutions & Government Contracts | Walt Burge',
    description:
      'Custom AI systems, enterprise software development, and government IT solutions. Based in Oxford, Mississippi. Available for contracts $50K-$500K+.',
  },
  alternates: {
    canonical: 'https://waltburge.com/enterprise',
  },
};

const enterpriseServices = [
  {
    icon: Brain,
    title: 'Custom AI Model Development',
    price: '$50K-$300K',
    description:
      'Domain-specific language models fine-tuned on your data. Production deployment, API integration, and ongoing model improvement. Not prompt engineering -- real model training.',
  },
  {
    icon: Code2,
    title: 'Enterprise Platform Engineering',
    price: '$100K-$500K',
    description:
      'Full-stack platform development from architecture through deployment. Multi-tenant SaaS, internal tools, customer-facing applications, and complex integrations.',
  },
  {
    icon: Workflow,
    title: 'AI-Powered Process Automation',
    price: '$50K-$200K',
    description:
      'Replace expensive manual workflows with intelligent automation. Document processing, estimation engines, decision support systems, and operational AI.',
  },
  {
    icon: Crown,
    title: 'Fractional CTO & Technical Leadership',
    price: '$60K-$180K/year',
    description:
      'Executive-level engineering leadership on a fractional basis. Architecture decisions, team building, vendor evaluation, and hands-on technical strategy.',
  },
];

const governmentCapabilities = [
  'Software systems development and modernization',
  'AI/ML solutions for government agencies',
  'Data pipeline and analytics platform development',
  'Web application and portal development',
  'Available through standard RFP/RFQ processes',
  'SAM.gov registration (in progress)',
];

const whyWaltBurge = [
  {
    title: 'Production AI Systems',
    description: 'Real deployed AI, not PowerPoint consultants. ConstructionAI has 18,000+ training examples and runs in production at $0.002/inference.',
  },
  {
    title: 'Mississippi-Based',
    description: 'In-state preference for Mississippi government contracts. Based in Oxford, MS with deep local knowledge.',
  },
  {
    title: 'Direct Communication',
    description: 'No layers of account managers, project coordinators, or offshore handoffs. You work directly with the engineer building your system.',
  },
  {
    title: 'Transparent Pricing',
    description: 'Fixed-bid available on scoped projects. No surprise invoices, no scope creep billing. You know exactly what you are paying for.',
  },
];

export default function EnterprisePage() {
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
                name: 'Enterprise',
                item: 'https://waltburge.com/enterprise',
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Enterprise AI & Software Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
              url: 'https://waltburge.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Oxford',
                addressRegion: 'MS',
                postalCode: '38655',
                addressCountry: 'US',
              },
            },
            areaServed: [
              { '@type': 'State', name: 'Mississippi' },
              { '@type': 'Country', name: 'United States' },
            ],
            description:
              'Custom AI systems, enterprise software development, and government IT solutions. Available for contracts $50K-$500K+.',
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
            <span className="text-brand-primary">Enterprise</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Enterprise & Government
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Enterprise & Government Solutions
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed mb-4">
              Custom AI systems and production software for organizations that need more than a
              vendor -- they need an engineer.
            </p>
            <p className="text-brand-accent font-mono text-sm tracking-tight">
              Based in Mississippi. Available for state, federal, and enterprise contracts.
            </p>
          </div>
        </section>

        {/* For Enterprise Clients */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-brand-accent" />
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest">
              Enterprise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            For Enterprise Clients
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {enterpriseServices.map((service) => (
              <div
                key={service.title}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-brand-accent" />
                  </div>
                  <span className="text-brand-accent/80 font-mono text-sm font-bold">
                    {service.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{service.title}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* For Government */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="flex items-center gap-3 mb-4">
            <Landmark className="w-6 h-6 text-brand-accent" />
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest">
              Government
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            For Government Agencies
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Mississippi-based IT vendor available for state and federal contracts. Experience with
            software systems development, AI/ML solutions, and enterprise platform engineering.
          </p>
          <div className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 mb-8">
            <h3 className="text-xl font-bold text-brand-primary mb-6">Capabilities</h3>
            <ul className="space-y-3">
              {governmentCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-brand-accent mt-0.5 shrink-0" />
                  <span className="text-brand-secondary text-sm md:text-base">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/30">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-brand-accent" />
              <h3 className="text-lg font-bold text-brand-primary">Procurement</h3>
            </div>
            <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
              Contact me for capability statements and past performance documentation. Available
              through standard RFP/RFQ processes. Mississippi in-state vendor preference applies.
            </p>
          </div>
        </section>

        {/* Why Walt Burge */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            Why Walt Burge
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What Makes This Different
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {whyWaltBurge.map((item) => (
              <div
                key={item.title}
                className="p-5 md:p-6 rounded-xl border border-brand-border/30 bg-brand-surface/20"
              >
                <h3 className="text-base md:text-lg font-bold text-brand-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
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

        {/* CTAs */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Request a Capability Statement
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Whether you are evaluating vendors for an enterprise project or responding to a
              government RFP, I am available for a direct conversation about your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
              >
                Request Capability Statement <ArrowRight size={18} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-8 py-4 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
