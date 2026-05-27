import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hire Walt Burge | AI Engineer & Full-Stack Developer',
  description:
    'Production AI engineer and full-stack developer available for hire. Custom LLM training, SaaS development, and AI automation. View portfolio, case studies, and pricing.',
  openGraph: {
    title: 'Hire Walt Burge | AI Engineer & Full-Stack Developer',
    description:
      'Production AI engineer and full-stack developer available for hire. Custom LLM training, SaaS development, and AI automation. View portfolio, case studies, and pricing.',
  },
  alternates: {
    canonical: 'https://waltburge.com/hire',
  },
};

const stats = [
  { value: '18,000+', label: 'AI Training Examples' },
  { value: '$0.002', label: 'Per AI Inference' },
  { value: '6+', label: 'Production Clients' },
  { value: '7', label: 'Months Self-Taught to Production' },
];

const services = [
  {
    title: 'Custom LLM Fine-Tuning',
    description: 'Domain-specific models you own. Not API wrappers.',
    href: '/services/custom-llm-training',
  },
  {
    title: 'SaaS Platforms',
    description: 'Full-stack from auth to billing to deployment.',
    href: '/services/saas-development',
  },
  {
    title: 'AI Automation',
    description: 'Replace expensive manual processes with AI that runs 24/7.',
    href: '/services/ai-automation',
  },
  {
    title: 'Construction Technology',
    description: 'AI estimation, contractor platforms, job tracking.',
    href: '/services/construction-technology',
  },
  {
    title: 'Web Applications',
    description: 'Next.js, TypeScript, PostgreSQL. Production-grade.',
    href: '/services/custom-software',
  },
  {
    title: 'Technical Leadership',
    description: 'Fractional CTO. Architecture, hiring, strategy.',
    href: '/services/fractional-cto',
  },
];

const caseStudies = [
  {
    name: 'MHP Construction',
    result: 'AI estimation: 3 days \u2192 seconds',
    href: '/work/mhp-construction',
  },
  {
    name: 'Lafayette Insurance',
    result: 'AI voice: 60%+ calls automated',
    href: '/work/lafayette-insurance',
  },
  {
    name: 'FairTradeWorker',
    result: '3-sided marketplace from zero',
    href: '/work/fairtradeworker',
  },
  {
    name: 'ConstructionAI',
    result: 'Custom LLM: 18K+ examples, ~88% accuracy',
    href: '/work/constructionai',
  },
];

const techStack = [
  'Next.js',
  'TypeScript',
  'React',
  'React Native',
  'Python',
  'PyTorch',
  'Kotlin',
  'Spring Boot',
  'PostgreSQL',
  'Rust',
  'Tailwind',
  'Vercel',
  'RunPod',
  'AWS',
];

const pricing = [
  { service: 'Web Design', range: '$2K\u2013$8K' },
  { service: 'Custom Software', range: '$5K\u2013$25K' },
  { service: 'AI Automation', range: '$15K\u2013$75K' },
  { service: 'SaaS Platform', range: '$25K\u2013$150K+' },
  { service: 'Custom LLM Training', range: '$25K\u2013$100K' },
  { service: 'Fractional CTO', range: '$5K\u2013$15K/month' },
];

export default function HirePage() {
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
                name: 'Hire',
                item: 'https://waltburge.com/hire',
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
        <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-28">
          <nav className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-primary">Hire</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-4">
            Walt Burge
          </h1>
          <p className="text-lg md:text-xl text-brand-accent font-mono tracking-tight mb-6">
            AI Engineer & Full-Stack Developer | Oxford, MS
          </p>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-8">
            I build custom AI models, production SaaS platforms, and intelligent
            automation. Not wrappers — real engineering.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              View Scope Builder <ArrowRight size={16} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border text-brand-primary font-bold rounded-full hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
            >
              See Case Studies
            </Link>
          </div>
        </section>

        {/* Proof Bar */}
        <section className="max-w-4xl mx-auto px-6 pb-12 md:pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 md:p-6 rounded-xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="text-2xl md:text-3xl font-black text-brand-accent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-brand-secondary font-mono mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/40 to-transparent" />
        </div>

        {/* What I Build */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            What I Build
          </span>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group p-6 rounded-xl border border-brand-border/40 bg-brand-surface/20 hover:border-brand-accent/60 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-brand-primary tracking-tight mb-2 group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/40 to-transparent" />
        </div>

        {/* Case Studies */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Case Studies
          </span>
          <div className="space-y-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.href}
                href={cs.href}
                className="group flex items-center justify-between p-4 md:p-5 rounded-xl border border-brand-border/30 bg-brand-surface/20 hover:border-brand-accent/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-brand-primary font-bold tracking-tight group-hover:text-brand-accent transition-colors whitespace-nowrap">
                    {cs.name}
                  </span>
                  <span className="hidden md:inline text-brand-secondary text-sm">
                    &mdash;
                  </span>
                  <span className="hidden md:inline text-brand-secondary text-sm truncate">
                    {cs.result}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className="text-brand-secondary group-hover:text-brand-accent transition-colors flex-shrink-0 ml-4"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/40 to-transparent" />
        </div>

        {/* Tech Stack */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono text-brand-secondary bg-brand-surface/40 border border-brand-border/40 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/40 to-transparent" />
        </div>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            Pricing
          </span>
          <div className="grid md:grid-cols-2 gap-3">
            {pricing.map((item) => (
              <div
                key={item.service}
                className="flex items-center justify-between p-4 rounded-xl border border-brand-border/30 bg-brand-surface/20"
              >
                <span className="text-brand-primary font-medium">
                  {item.service}
                </span>
                <span className="text-brand-accent font-mono text-sm font-bold">
                  {item.range}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/40 to-transparent" />
        </div>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to start?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Use my{' '}
              <Link href="/contact" className="text-brand-accent hover:underline">
                Project Scope Builder
              </Link>{' '}
              to get a live estimate, or email me directly at{' '}
              <a
                href="mailto:jamesburge.mcm@gmail.com"
                className="text-brand-accent hover:underline"
              >
                jamesburge.mcm@gmail.com
              </a>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Open Scope Builder <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
