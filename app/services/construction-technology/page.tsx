import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Users,
  ClipboardList,
  FileText,
  HardHat,
  Hammer,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Construction Technology | AI Estimation & Contractor Platforms | Mississippi',
  description:
    'AI-powered construction cost estimation, contractor management platforms, and digital job tracking built for Mississippi contractors by a former builder.',
  openGraph: {
    title: 'Construction Technology | AI Estimation & Contractor Platforms | Mississippi',
    description:
      'AI-powered construction cost estimation, contractor management platforms, and digital job tracking built for Mississippi contractors by a former builder.',
  },
};

const solutions = [
  {
    icon: Calculator,
    title: 'AI Cost Estimation',
    description:
      'Machine learning models trained on real project data generate detailed cost estimates in seconds. Material takeoffs, labor projections, and accurate totals — without the hours of spreadsheet work.',
  },
  {
    icon: Users,
    title: 'Contractor Management Platforms',
    description:
      'Custom platforms that connect general contractors with subs, manage bids, track certifications, and streamline communication across every job.',
  },
  {
    icon: ClipboardList,
    title: 'Digital Job Tracking',
    description:
      'Real-time project dashboards that replace whiteboards and text threads. Track progress by trade, manage change orders, and keep every stakeholder on the same page.',
  },
  {
    icon: FileText,
    title: 'Professional Proposals',
    description:
      'Automated proposal generation that pulls from your estimates, adds your branding, and delivers a polished PDF to clients — turning estimates into signed contracts faster.',
  },
];

const faqs = [
  {
    question: 'How does AI construction estimation work?',
    answer:
      'Our AI model is trained on thousands of real construction project examples — materials, labor rates, scope details, and final costs. You describe the job in plain language and the model generates a detailed, itemized estimate based on patterns it has learned from actual projects.',
  },
  {
    question: 'Can this replace my current estimating process?',
    answer:
      'It is designed to accelerate your process, not replace your judgment. The AI gives you a strong first draft in seconds that you can refine and adjust. Estimators who use it report cutting their estimation time by 60-80% while catching line items they might have missed.',
  },
  {
    question: 'Do you work with small contractors?',
    answer:
      'Yes. In fact, small and mid-size contractors are who we built this for. We understand the tight margins and time pressure that come with running a crew, because our founder spent years on job sites before writing a single line of code.',
  },
  {
    question: 'How accurate is the AI estimation?',
    answer:
      'Accuracy depends on the quality and specificity of the input, but our model consistently lands within 10-15% of experienced human estimators on residential and light commercial projects. With refinement based on your local market data, accuracy improves over time.',
  },
];

export default function ConstructionTechnologyPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Construction Technology',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'State', name: 'Mississippi' },
            description:
              'AI-powered construction cost estimation, contractor management platforms, and digital job tracking built for Mississippi contractors.',
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
                name: 'Construction Technology',
                item: 'https://waltburge.com/services/construction-technology',
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
            <span className="text-brand-primary">Construction Technology</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Construction Technology
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Construction Technology Solutions for Mississippi Contractors
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              AI-powered estimation, digital job tracking, and contractor management platforms
              built by someone who has swung a hammer. Technology that fits how builders
              actually work — not how software companies think they should.
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

        {/* Our Construction Solutions */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Our Construction Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {solutions.map((item) => (
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

        {/* Proven with Real Contractors */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            Proven with Real Contractors
          </h2>
          <div className="p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent bg-brand-surface/30 border border-brand-border/40 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-base border border-brand-border flex items-center justify-center">
                <HardHat className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-brand-primary font-bold">MHP Construction</div>
                <div className="text-brand-secondary text-xs font-mono">
                  Oxford, Mississippi
                </div>
              </div>
            </div>
            <p className="text-brand-secondary leading-relaxed mb-4">
              MHP Construction in Oxford, MS was our first production client. They needed
              faster, more consistent estimates without hiring a full-time estimator. We built
              an AI estimation platform trained on their actual project data — materials,
              labor rates, scope patterns — and deployed it as a tool their team uses daily.
            </p>
            <p className="text-brand-secondary leading-relaxed">
              The result: estimates that used to take hours now take seconds. The AI catches
              line items that get missed under time pressure, and the cost per estimate
              dropped to fractions of a penny. This is not a demo project — it is a working
              tool used by a real contractor on real bids.
            </p>
          </div>
        </section>

        {/* By a Builder, For Builders */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Our Edge
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            By a Builder, For Builders
          </h2>
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border p-3 flex items-center justify-center">
              <Hammer className="w-7 h-7 text-brand-accent" />
            </div>
            <div>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Most construction software is built by people who have never been on a job
                site. I'm different. I spent years in construction before writing my first
                line of code — framing houses, managing crews, and learning the trade from
                the ground up in Oxford, Mississippi.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                That background shapes everything we build. We know what it is like to
                estimate a job at 10 PM after a full day on site. We know why contractors
                ignore apps that require twenty taps to log a task. We know the difference
                between software that looks good in a demo and software that survives a
                Tuesday morning.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg">
                If you are a contractor in Mississippi looking for technology that actually
                fits your workflow, you are in the right place.
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

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Modernize Your Operation?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Whether you need faster estimates, better job tracking, or a full contractor
              platform — let us show you what is possible for your business.
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
