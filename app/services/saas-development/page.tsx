import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  CreditCard,
  ShieldCheck,
  LayoutDashboard,
  Code2,
  Rocket,
  Server,
  GitBranch,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'SaaS Product Development | Full-Stack Platform Engineering',
  description:
    'Full-stack SaaS product development from zero to production. Architecture, billing, auth, dashboard, API, and deployment. Starting at $25K. Built by Walt Burge.',
  openGraph: {
    title: 'SaaS Product Development | Full-Stack Platform Engineering | Walt Burge',
    description:
      'From zero to a production SaaS platform — architecture, billing, auth, dashboard, API, and deployment. Not an MVP that falls apart — a real product built to grow.',
  },
};

const deliverables = [
  {
    icon: Layers,
    title: 'Full Product Architecture',
    description:
      'Database schema, API design, service boundaries, and infrastructure planning. Every decision documented and justified before a line of code is written.',
  },
  {
    icon: Server,
    title: 'Multi-Tenant Infrastructure',
    description:
      'Proper tenant isolation, data partitioning, and per-tenant configuration. Your SaaS handles one customer or ten thousand with the same codebase.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Billing & Subscriptions',
    description:
      'Plans, pricing tiers, usage-based billing, trials, upgrades, downgrades, and dunning. Revenue flows from day one with zero manual invoicing.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentication & User Management',
    description:
      'Secure auth with email/password, OAuth, magic links, and role-based access control. Invite flows, team management, and admin impersonation built in.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    description:
      'A real admin panel — user management, subscription oversight, analytics, and system health. You run your business from your own product.',
  },
  {
    icon: Code2,
    title: 'API Design',
    description:
      'Clean, documented REST or GraphQL APIs. Rate limiting, versioning, and webhook support so your platform plays well with the rest of the world.',
  },
  {
    icon: GitBranch,
    title: 'CI/CD Pipeline',
    description:
      'Automated testing, staging environments, and zero-downtime deployments. Push to main and your changes are live in minutes, not hours.',
  },
  {
    icon: Rocket,
    title: 'Production Deployment',
    description:
      'Deployed on Vercel, AWS, or your infrastructure of choice. Monitoring, error tracking, and performance baselines from launch day.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    duration: '2 weeks',
    description:
      'Deep dive into your product vision, target users, and business model. I produce a full technical architecture document, database schema, and project roadmap. You know exactly what you are getting before development starts.',
  },
  {
    step: '02',
    title: 'Core Build',
    duration: '6-10 weeks',
    description:
      'Rapid, focused development of the core platform. Auth, billing, the primary user workflows, and the admin dashboard. Weekly demos so you see real progress and can steer the product as it takes shape.',
  },
  {
    step: '03',
    title: 'Polish & Launch',
    duration: '2-4 weeks',
    description:
      'Edge case handling, performance optimization, security hardening, and launch preparation. Onboarding flows, transactional emails, and everything needed to put real users on the platform.',
  },
  {
    step: '04',
    title: 'Post-Launch Iteration',
    duration: 'Ongoing',
    description:
      'Real users generate real feedback. I stay engaged to ship improvements, fix what needs fixing, and build the features your first customers are asking for.',
  },
];

const technologies = [
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Stripe',
  'Auth.js',
  'Prisma',
  'Tailwind CSS',
  'Vercel',
  'AWS',
  'Redis',
  'Docker',
  'GitHub Actions',
];

const faqs = [
  {
    question: 'How much does it cost to build a SaaS?',
    answer:
      'An MVP starts at $25,000 and takes 8-12 weeks. A full-featured platform with advanced billing, team management, and integrations runs $50K-$100K. Enterprise multi-tenant platforms with custom requirements start at $100K+. I scope every project in detail before quoting so there are no surprises.',
  },
  {
    question: 'How long does it take?',
    answer:
      'A production-ready MVP takes 10-16 weeks from kickoff to launch. A full platform with billing, admin tools, and integrations takes 4-6 months. I break every project into two-week milestones with working demos, so you see progress constantly.',
  },
  {
    question: 'Do you handle billing and subscriptions?',
    answer:
      'Yes. I build full Stripe integration — plans, pricing pages, checkout flows, subscription management, usage tracking, invoices, and dunning. Your SaaS collects revenue from day one without you touching a spreadsheet.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'I offer ongoing development retainers starting at $5K/month for post-launch iteration. Most SaaS products need their biggest improvements in the first 90 days after real users arrive. I stay engaged to ship fast based on actual user feedback.',
  },
];

export default function SaasDevelopmentPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'SaaS Product Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Full-stack SaaS product development from architecture through production deployment. Multi-tenant platforms with billing, auth, and admin tools.',
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
                name: 'SaaS Product Development',
                item: 'https://waltburge.com/services/saas-development',
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
            <span className="text-brand-primary">SaaS Product Development</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              SaaS Development
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              SaaS Product Development
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              From zero to a production SaaS platform — architecture, billing, auth, dashboard,
              API, and deployment. Not an MVP that falls apart — a real product built to grow.
            </p>
          </div>
        </section>

        {/* What You Get */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Deliverables
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {deliverables.map((item) => (
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

        {/* The Process */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            The Process
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
                  <h3 className="text-xl font-bold text-brand-primary mb-1 inline md:block">
                    {step.title}
                  </h3>
                  <span className="text-brand-accent font-mono text-xs ml-2 md:ml-0">
                    {step.duration}
                  </span>
                  <p className="text-brand-secondary leading-relaxed text-sm md:text-base mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Tech Stack
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

        {/* Pricing */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            04. Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Investment
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Transparent pricing based on scope. Every project is scoped in detail before a dollar
            changes hands.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                MVP
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$25K+</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Core product with auth, billing, primary user workflows, and production deployment.
                Get to market fast with a real product, not a prototype.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-accent/40 bg-brand-surface/30 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-accent text-brand-base text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Full Platform
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$50K-$100K</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Complete SaaS platform with advanced billing, team management, admin dashboard,
                API, integrations, and CI/CD. Built to scale from 10 to 10,000 users.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Enterprise
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$100K+</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Enterprise-grade multi-tenant platform with custom integrations, SSO, advanced
                analytics, compliance requirements, and dedicated infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Frequently Asked Questions
          </h2>
          <FAQSection items={faqs} />
        </section>

        {/* Related Services */}
        <RelatedServices
          items={[
            {
              title: 'Custom Software Development',
              href: '/services/custom-software',
              description:
                'Web applications, mobile apps, and internal tools built for your specific business needs. Full-stack development from concept to production.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Add intelligent features to your SaaS — chatbots, automation, custom-trained models, and AI-powered analytics.',
            },
            {
              title: 'Fractional CTO & Technical Leadership',
              href: '/services/fractional-cto',
              description:
                'Senior technical leadership for your startup. Architecture decisions, team building, and hands-on engineering.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Build Your SaaS?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about your product idea. I will give you an honest assessment of what it
              takes to build, what it costs, and how long it takes.
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
