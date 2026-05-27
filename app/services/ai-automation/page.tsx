import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  MessageSquare,
  Filter,
  FileSpreadsheet,
  Package,
  BarChart3,
  Clock,
  TrendingDown,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'AI-Powered Business Automation | Intelligent Process Automation',
  description:
    'AI-powered business automation that replaces expensive manual processes. Document processing, customer support, lead routing, and more. $15K-$75K. Built by Walt Burge.',
  openGraph: {
    title: 'AI-Powered Business Automation | Intelligent Process Automation | Walt Burge',
    description:
      'Stop paying people to do what AI can do faster, cheaper, and 24/7. Intelligent automation systems that replace expensive manual processes with AI that actually works.',
  },
};

const automationAreas = [
  {
    icon: FileText,
    title: 'Document Processing & Data Extraction',
    description:
      'Invoices, contracts, applications, and forms — automatically parsed, validated, and routed to your systems. No more manual data entry or copy-paste workflows.',
  },
  {
    icon: MessageSquare,
    title: 'Customer Support & Chatbots',
    description:
      'AI-powered support that handles 80% of incoming questions instantly. Trained on your knowledge base, escalates to humans when it should, and learns from every interaction.',
  },
  {
    icon: Filter,
    title: 'Lead Qualification & Routing',
    description:
      'Automatically score, qualify, and route inbound leads to the right salesperson. No leads slip through the cracks, and your team focuses on prospects that convert.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Proposal & Estimate Generation',
    description:
      'Turn requirements into professional proposals and cost estimates in minutes instead of hours. Consistent formatting, accurate pricing, and zero missed line items.',
  },
  {
    icon: Package,
    title: 'Inventory & Supply Chain Optimization',
    description:
      'Demand forecasting, reorder point optimization, and supplier management. AI spots patterns in your data that spreadsheets never will.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics Dashboards',
    description:
      'Automated reports that pull from all your data sources, surface key insights, and deliver them to stakeholders on schedule. No analyst required.',
  },
];

const roiMetrics = [
  {
    icon: Clock,
    metric: '10-40 hrs/week',
    label: 'Time Saved',
    description: 'Per automated process',
  },
  {
    icon: TrendingDown,
    metric: '60-90%',
    label: 'Cost Reduction',
    description: 'Vs. manual processing',
  },
  {
    icon: RefreshCw,
    metric: '24/7',
    label: 'Always On',
    description: 'Zero overtime costs',
  },
  {
    icon: Zap,
    metric: 'Days',
    label: 'Not Months',
    description: 'To deploy and see ROI',
  },
];

const faqs = [
  {
    question: 'How do I know if my process can be automated with AI?',
    answer:
      'If a process follows a pattern, involves structured or semi-structured data, and a human can explain the rules, AI can automate it. I offer a free process audit where I identify your highest-ROI automation opportunities and give you a concrete implementation plan.',
  },
  {
    question: "What's the ROI on AI automation?",
    answer:
      'Most automations pay for themselves within 3-6 months. A process that costs $5K/month in labor and takes 2 weeks to automate at $15K generates a positive ROI by month four. I always build a detailed ROI projection before starting so you know exactly what to expect.',
  },
  {
    question: 'How long does it take to build?',
    answer:
      'Simple automations (document processing, data extraction) take 2-4 weeks. Complex systems with multiple integrations and custom AI models take 6-12 weeks. I scope every project with clear milestones and deliver working automation incrementally.',
  },
  {
    question: 'Will it replace my employees?',
    answer:
      'AI automation handles the repetitive, time-consuming parts of your team\'s work — not the parts that require judgment, creativity, and relationships. The goal is to free your people to do higher-value work, not to eliminate positions.',
  },
];

export default function AIAutomationPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'AI-Powered Business Automation',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Intelligent process automation powered by AI. Document processing, customer support, lead routing, and business workflow automation.',
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
                name: 'AI-Powered Business Automation',
                item: 'https://waltburge.com/services/ai-automation',
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
            <span className="text-brand-primary">AI-Powered Business Automation</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              AI Automation
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              AI-Powered Business Automation
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Stop paying people to do what AI can do faster, cheaper, and 24/7. I build
              intelligent automation systems that replace expensive manual processes with AI that
              actually works.
            </p>
          </div>
        </section>

        {/* What I Automate */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What I Automate
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {automationAreas.map((item) => (
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

        {/* The ROI Case */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            The ROI Case
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            AI automation is not about replacing people — it is about eliminating the expensive,
            repetitive work that eats your margins and burns out your team.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {roiMetrics.map((item) => (
              <div
                key={item.label}
                className="p-5 md:p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/40 text-center hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-base border border-brand-border p-2 mb-4 flex items-center justify-center mx-auto">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">
                  {item.metric}
                </div>
                <div className="text-[10px] md:text-xs text-brand-accent uppercase tracking-widest font-mono mb-2">
                  {item.label}
                </div>
                <div className="text-xs text-brand-secondary">{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Example */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Real Example: ConstructionAI
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-8">
            I built ConstructionAI to automate construction cost estimation — a process that
            previously took experienced estimators 2-3 days per project.
          </p>
          <div className="p-8 rounded-2xl border border-brand-accent/30 bg-brand-accent/5">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Before
                </div>
                <div className="text-xl font-bold text-brand-primary">2-3 days</div>
                <p className="text-brand-secondary text-sm">Per estimate, manually</p>
              </div>
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  After
                </div>
                <div className="text-xl font-bold text-brand-primary">Seconds</div>
                <p className="text-brand-secondary text-sm">Per AI-generated estimate</p>
              </div>
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Cost
                </div>
                <div className="text-xl font-bold text-brand-primary">$0.002</div>
                <p className="text-brand-secondary text-sm">Per estimate via fine-tuned model</p>
              </div>
            </div>
            <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
              Custom Llama 3.1 8B model fine-tuned on 18,000+ real construction project examples.
              The model understands materials, labor costs, regional pricing, and project
              complexity — producing detailed estimates that previously required a senior
              estimator and days of work. Now scaling to 500K+ training examples.
            </p>
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
            Pricing depends on the complexity of the process and the integrations required. Every
            project includes a detailed ROI projection.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Single Process
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$15K-$30K</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                One automated workflow — document processing, chatbot, lead routing, or report
                generation. Includes integration with your existing tools and 30 days of
                post-launch support.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-accent/40 bg-brand-surface/30 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-accent text-brand-base text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                Best Value
              </div>
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Multi-Process
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$30K-$50K</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Multiple connected automations that work together. End-to-end workflow
                transformation with custom AI models, dashboards, and integrations across your
                tool stack.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Enterprise
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$50K-$75K+</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Organization-wide automation strategy with custom AI models, advanced
                integrations, compliance requirements, and ongoing optimization. Includes
                training and change management support.
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
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Custom AI models, intelligent chatbots, and machine learning solutions for business applications.',
            },
            {
              title: 'Custom Software Development',
              href: '/services/custom-software',
              description:
                'Full-stack web applications and platforms that integrate with your automated workflows.',
            },
            {
              title: 'Hire an AI Engineer',
              href: '/services/hire-ai-engineer',
              description:
                'Dedicated AI engineering for model training, fine-tuning, and production deployment.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Automate?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about the process that is eating your time and money. I will show you
              exactly how AI can fix it — and what the ROI looks like.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Get a Free Process Audit <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
