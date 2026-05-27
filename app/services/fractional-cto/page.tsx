import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Map,
  Layers,
  Users,
  FileCheck,
  ShieldCheck,
  LineChart,
  Search,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'Fractional CTO | Technical Leadership for Startups & Growing Companies',
  description:
    'Senior technical leadership at a fraction of the cost. Architecture decisions, team building, tech stack strategy, and hands-on engineering. $5K-$15K/month. Walt Burge.',
  openGraph: {
    title: 'Fractional CTO | Technical Leadership for Startups & Growing Companies | Walt Burge',
    description:
      'Senior technical leadership at a fraction of the cost. Architecture decisions, team building, tech stack strategy, and hands-on engineering — without the $300K salary.',
  },
};

const responsibilities = [
  {
    icon: Map,
    title: 'Technical Strategy & Roadmap',
    description:
      'A clear, prioritized technical roadmap aligned with your business goals. No guessing about what to build next or which technology to adopt.',
  },
  {
    icon: Layers,
    title: 'Architecture Decisions',
    description:
      'System design, database architecture, API strategy, and infrastructure planning. The decisions that are expensive to get wrong and impossible to undo later.',
  },
  {
    icon: Users,
    title: 'Hiring & Team Building',
    description:
      'Job descriptions, technical screening, interview processes, and onboarding. I help you build an engineering team that ships, not one that debates.',
  },
  {
    icon: FileCheck,
    title: 'Code Review & Quality Standards',
    description:
      'Establish coding standards, review processes, testing requirements, and deployment practices. Your codebase stays clean as your team grows.',
  },
  {
    icon: Search,
    title: 'Vendor Evaluation',
    description:
      'Objective assessment of tools, platforms, and services. I have no vendor partnerships or referral fees — my only incentive is what is right for your business.',
  },
  {
    icon: LineChart,
    title: 'Investor-Ready Technical Documentation',
    description:
      'Architecture diagrams, security audits, scalability plans, and technical due diligence preparation. Show investors your tech is built on solid ground.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Infrastructure Planning',
    description:
      'Security posture assessment, compliance planning, disaster recovery, and infrastructure strategy. Protect your product and your customers from day one.',
  },
];

const audienceCards = [
  {
    title: 'Pre-Seed Startups',
    description:
      'You have the domain expertise and the market insight but no technical cofounder. I become your technical partner — building the product, making architecture decisions, and preparing for your first hire.',
  },
  {
    title: 'Series A Companies Scaling Engineering',
    description:
      'You are past MVP and need to build a real engineering team. I establish the processes, standards, and culture that let you scale from 2 engineers to 20 without the codebase falling apart.',
  },
  {
    title: 'Non-Technical Founders',
    description:
      'You need someone who translates business goals into technical decisions and holds your development team accountable. I am your trusted technical advisor — no jargon, no hand-waving.',
  },
  {
    title: 'Interim CTO Replacement',
    description:
      'Your CTO left and you need leadership continuity while you search for a permanent replacement. I step in immediately, maintain team velocity, and help you find the right long-term hire.',
  },
];

const faqs = [
  {
    question: "What's the difference between a fractional CTO and a consultant?",
    answer:
      'A consultant gives you advice and leaves. A fractional CTO is embedded in your company — attending standups, reviewing PRs, making architecture decisions, and being accountable for outcomes. I am part of your team, not an outsider writing reports.',
  },
  {
    question: 'How long do engagements typically last?',
    answer:
      'Most engagements run 6-18 months. Some companies need me through a fundraising round, others through a major product launch or until they hire a full-time CTO. There is no long-term contract required — engagements are month-to-month.',
  },
  {
    question: 'Can you help us hire our own CTO eventually?',
    answer:
      'Absolutely. That is often the goal. I help define the role, screen candidates, run technical interviews, and ensure a smooth handoff. My job is to make myself unnecessary by setting your company up for long-term technical success.',
  },
  {
    question: 'Do you write code or just advise?',
    answer:
      'Both. I am a hands-on engineer, not a slide-deck consultant. Depending on the engagement model, I write production code, review pull requests, architect systems, and mentor your developers. The split between strategy and execution depends on what your company needs.',
  },
];

export default function FractionalCTOPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Fractional CTO & Technical Leadership',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Fractional CTO services for startups and growing companies. Technical strategy, architecture decisions, team building, and hands-on engineering leadership.',
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
                name: 'Fractional CTO',
                item: 'https://waltburge.com/services/fractional-cto',
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
            <span className="text-brand-primary">Fractional CTO</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Technical Leadership
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Fractional CTO &<br />Technical Leadership
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Senior technical leadership at a fraction of the cost. Architecture decisions, team
              building, tech stack strategy, and hands-on engineering — without the $300K salary.
            </p>
          </div>
        </section>

        {/* What a Fractional CTO Does */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Responsibilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What a Fractional CTO Does
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {responsibilities.map((item) => (
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

        {/* Who This Is For */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Ideal Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {audienceCards.map((item) => (
              <div
                key={item.title}
                className="p-5 md:p-6 rounded-xl border border-brand-border/30 bg-brand-surface/20"
              >
                <h3 className="text-base md:text-lg font-bold text-brand-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models / Pricing */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Engagement Models
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Month-to-month engagements. No long-term contracts. Scale up or down as your needs
            change.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Part-Time
              </div>
              <div className="text-3xl font-black text-brand-primary mb-1">$5K-$8K</div>
              <div className="text-sm text-brand-secondary mb-4">/month</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                10-15 hours per week. Architecture guidance, code review, technical strategy, and
                weekly syncs. Ideal for early-stage startups establishing their technical
                foundation.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-accent/40 bg-brand-surface/30 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-accent text-brand-base text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Half-Time
              </div>
              <div className="text-3xl font-black text-brand-primary mb-1">$8K-$12K</div>
              <div className="text-sm text-brand-secondary mb-4">/month</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                20 hours per week. Hands-on development, team leadership, hiring support, and
                daily availability. The sweet spot for Series A companies scaling their team.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Full Embedded
              </div>
              <div className="text-3xl font-black text-brand-primary mb-1">$12K-$15K</div>
              <div className="text-sm text-brand-secondary mb-4">/month</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                30+ hours per week. Full CTO-level engagement — technical leadership, product
                strategy, team management, and significant hands-on development. For companies
                that need a CTO now.
              </p>
            </div>
          </div>
        </section>

        {/* Why Not Just Hire a CTO? */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            04. The Math
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Why Not Just Hire a CTO?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl border border-red-500/30 bg-red-500/5">
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
                Full-Time CTO
              </div>
              <div className="text-3xl font-black text-brand-primary mb-4">$250K-$400K/yr</div>
              <ul className="space-y-3 text-brand-secondary text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Base salary $180K-$250K+ in competitive markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Equity dilution of 2-5% for a senior hire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Benefits, PTO, and overhead add 30-40%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>3-6 month hiring process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Risk of a bad hire is catastrophic</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-brand-accent/40 bg-brand-accent/5">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Fractional CTO
              </div>
              <div className="text-3xl font-black text-brand-primary mb-4">$60K-$180K/yr</div>
              <ul className="space-y-3 text-brand-secondary text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">+</span>
                  <span>Scale engagement up or down monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">+</span>
                  <span>Zero equity required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">+</span>
                  <span>No benefits, PTO, or overhead costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">+</span>
                  <span>Start in days, not months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent mt-0.5">+</span>
                  <span>Month-to-month — no risk of a bad long-term hire</span>
                </li>
              </ul>
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
              title: 'SaaS Product Development',
              href: '/services/saas-development',
              description:
                'Full-stack SaaS platform engineering from architecture to production. Billing, auth, and admin tools included.',
            },
            {
              title: 'Custom Software Development',
              href: '/services/custom-software',
              description:
                'Web applications, mobile apps, and internal tools built for your specific business needs.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Custom AI models, intelligent automation, and machine learning solutions for business.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Need Technical Leadership?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Let us talk about where your company is and where it needs to go. I will tell you
              honestly whether a fractional CTO is the right move — or if there is a better path.
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
