import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Cloud,
  Wrench,
  Search,
  Palette,
  Code2,
  Rocket,
  LifeBuoy,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Custom Software Development | Web & Mobile Apps | Oxford, MS',
  description:
    'Custom web applications, mobile apps, and SaaS platforms for your business. Full-stack development based in Oxford, Mississippi.',
  openGraph: {
    title: 'Custom Software Development | Web & Mobile Apps | Oxford, MS',
    description:
      'Custom web applications, mobile apps, and SaaS platforms for your business. Full-stack development based in Oxford, Mississippi.',
  },
};

const offerings = [
  {
    icon: Globe,
    title: 'Web Applications',
    description:
      'Full-featured web apps built with Next.js, React, and TypeScript. Responsive, fast, and designed around your business workflows.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Cross-platform mobile applications using React Native and Kotlin. Deliver a native experience on both iOS and Android from a single codebase.',
  },
  {
    icon: Cloud,
    title: 'SaaS Platforms',
    description:
      'Multi-tenant SaaS products with user management, billing integration, analytics dashboards, and the scalability to grow with your customer base.',
  },
  {
    icon: Wrench,
    title: 'Internal Tools',
    description:
      'Custom admin panels, CRMs, inventory systems, and workflow automation tools that eliminate manual processes and reduce overhead.',
  },
];

const processSteps = [
  {
    icon: Search,
    step: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business, users, and goals. No assumptions — just clear questions and honest scoping.',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Design',
    description:
      'Wireframes, prototypes, and user flows before a single line of code is written. You see exactly what you are getting.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Development',
    description:
      'Agile sprints with regular demos. You stay in the loop and can course-correct as the product takes shape.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch',
    description:
      'Thorough testing, performance optimization, and a smooth deployment to production. Your software goes live with confidence.',
  },
  {
    icon: LifeBuoy,
    step: '05',
    title: 'Support',
    description:
      'Ongoing maintenance, monitoring, and feature development. We do not disappear after launch — your software keeps improving.',
  },
];

const technologies = [
  'Next.js',
  'React',
  'React Native',
  'TypeScript',
  'Kotlin',
  'Spring Boot',
  'PostgreSQL',
  'Node.js',
  'Tailwind CSS',
  'Vercel',
  'Docker',
  'REST / GraphQL',
];

const faqs = [
  {
    question: 'How much does custom software cost?',
    answer:
      'Every project is different, but most custom software engagements start in the $5,000-$25,000 range for an MVP. We scope every project before quoting, so you know exactly what you are paying for. There are no hidden fees and no surprise invoices.',
  },
  {
    question: 'How long does it take to build custom software?',
    answer:
      'A focused MVP typically takes 6-12 weeks from kickoff to launch. Larger platforms with complex integrations can take 3-6 months. We break every project into milestones so you see measurable progress along the way.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'Our core stack is Next.js, React, TypeScript, and PostgreSQL for web applications, and React Native or Kotlin for mobile. We choose technologies based on what is right for the project, not what is trendy.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Every project includes a support period after launch, and we offer monthly maintenance plans for businesses that need ongoing development, monitoring, and updates. Your software is never orphaned.',
  },
];

export default function CustomSoftwarePage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Custom Software Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'State', name: 'Mississippi' },
            description:
              'Custom web applications, mobile apps, and SaaS platforms built for businesses in Oxford, Mississippi and nationwide.',
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
                name: 'Services',
                item: 'https://waltburge.com/services',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Custom Software Development',
                item: 'https://waltburge.com/services/custom-software',
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
            <Link href="/services" className="hover:text-brand-accent transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-brand-primary">Custom Software Development</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Custom Software
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Custom Software Development
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Web applications, mobile apps, and SaaS platforms built for your specific business
              needs. Full-stack development from a team based in Oxford, Mississippi that ships
              real software for real businesses.
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

        {/* What We Build */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What We Build
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{item.title}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            How We Work
          </h2>
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent font-mono text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="w-px h-8 bg-brand-border/40 mt-2" />
                </div>
                <div className="flex-1 pb-2">
                  <span className="md:hidden text-brand-accent font-mono text-xs mr-2">
                    {step.step}.
                  </span>
                  <h3 className="text-xl font-bold text-brand-primary mb-2 inline md:block">
                    {step.title}
                  </h3>
                  <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Technologies We Use
          </h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-brand-surface/50 border border-brand-border text-brand-secondary font-mono text-sm hover:border-brand-accent/50 hover:text-brand-accent transition-colors"
              >
                {tech}
              </span>
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

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Start Your Project
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell us what you need built and get a free, no-obligation consultation. We will
              scope the work, give you an honest estimate, and show you what is possible.
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
