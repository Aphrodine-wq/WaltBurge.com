import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Brain, HardHat, Globe, Rocket, Crown, Workflow, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Development Services | Oxford, MS',
  description:
    'Custom software development, AI & machine learning solutions, construction technology, and web design services from Walt Burge in Oxford, Mississippi.',
  openGraph: {
    title: 'Software Development Services | Oxford, MS',
    description:
      'Custom software development, AI & machine learning solutions, construction technology, and web design services from Walt Burge in Oxford, Mississippi.',
  },
};

const coreServices = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    href: '/services/custom-software',
    description:
      'Web applications, mobile apps, and SaaS platforms engineered for your specific business needs. From concept through launch and beyond.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning Solutions',
    href: '/services/ai-solutions',
    description:
      'AI chatbots, custom model training, workflow automation, and intelligent systems that give your business a measurable edge.',
  },
  {
    icon: HardHat,
    title: 'Construction Technology',
    href: '/services/construction-technology',
    description:
      'AI-powered cost estimation, contractor management platforms, and digital job tracking built by someone who has worked the trades.',
  },
  {
    icon: Globe,
    title: 'Web Design & Development',
    href: '/services/web-design',
    description:
      'Fast, mobile-friendly, SEO-optimized websites for local businesses in Oxford, MS and North Mississippi.',
  },
];

const premiumServices = [
  {
    icon: Rocket,
    title: 'SaaS Product Development',
    href: '/services/saas-development',
    price: 'From $25K',
    description:
      'Full-stack SaaS platforms from zero to production — architecture, billing, auth, dashboard, API, and deployment. Built to scale, not to demo.',
  },
  {
    icon: Crown,
    title: 'Fractional CTO & Technical Leadership',
    href: '/services/fractional-cto',
    price: '$5K-$15K/mo',
    description:
      'Senior technical leadership at a fraction of the cost. Architecture decisions, team building, tech stack strategy, and hands-on engineering.',
  },
  {
    icon: Workflow,
    title: 'AI-Powered Business Automation',
    href: '/services/ai-automation',
    price: 'From $15K',
    description:
      'Intelligent automation that replaces expensive manual processes with AI that works 24/7. Document processing, support bots, lead routing, and more.',
  },
  {
    icon: Cpu,
    title: 'Custom LLM Training & Fine-Tuning',
    href: '/services/custom-llm-training',
    price: 'From $25K',
    description:
      'Domain-specific language models trained on your data. Real fine-tuned models you own and control — not prompt engineering wrappers.',
  },
];

export default function ServicesPage() {
  return (
    <>
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
                name: 'Services',
                item: 'https://waltburge.com/services',
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
            <span className="text-brand-primary">Services</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Walt Burge
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
            Software Development Services
          </h1>
          <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
            Full-stack software development, AI engineering, and digital solutions for
            businesses in Oxford, Mississippi and nationwide. From custom platforms to
            intelligent automation, we build the tools your business runs on.
          </p>
        </section>

        {/* Core Service Cards */}
        <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Core Services
          </span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {coreServices.map((service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative p-8 md:p-10 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/60 transition-all duration-300"
              >
                <span className="text-brand-secondary/40 font-mono text-xs absolute top-6 right-6">
                  0{index + 1}
                </span>
                <div className="w-14 h-14 rounded-xl bg-brand-base border border-brand-border p-3 mb-6 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                  <service.icon className="w-7 h-7 text-brand-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter mb-4 group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-brand-secondary leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ArrowRight size={14} />
                </span>
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

        {/* Premium Service Cards */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            High-Impact Engagements
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Premium Services
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Larger-scope engagements for businesses ready to invest in serious technical infrastructure,
            AI capabilities, or executive-level engineering leadership.
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {premiumServices.map((service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative p-8 md:p-10 rounded-2xl border border-brand-accent/20 bg-brand-surface/30 hover:border-brand-accent/60 transition-all duration-300"
              >
                <span className="text-brand-accent/60 font-mono text-xs absolute top-6 right-6">
                  {service.price}
                </span>
                <div className="w-14 h-14 rounded-xl bg-brand-base border border-brand-accent/30 p-3 mb-6 flex items-center justify-center group-hover:border-brand-accent/50 transition-colors">
                  <service.icon className="w-7 h-7 text-brand-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter mb-4 group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-brand-secondary leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-mono text-brand-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell us about your idea and get a free consultation. No commitment, no pressure
              — just a straight conversation about what is possible.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
