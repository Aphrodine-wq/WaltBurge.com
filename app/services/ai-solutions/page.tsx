import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Cpu,
  Workflow,
  Calculator,
  Database,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI & Machine Learning Solutions | Chatbots & Automation | Mississippi',
  description:
    'AI chatbots, custom model training, workflow automation, and intelligent business tools. AI solutions built by Strata Software Group in Oxford, Mississippi.',
  openGraph: {
    title: 'AI & Machine Learning Solutions | Chatbots & Automation | Mississippi',
    description:
      'AI chatbots, custom model training, workflow automation, and intelligent business tools. AI solutions built by Strata Software Group in Oxford, Mississippi.',
  },
};

const offerings = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots & Assistants',
    description:
      'Custom conversational AI trained on your business data. Answer customer questions, qualify leads, and automate support around the clock without adding headcount.',
  },
  {
    icon: Cpu,
    title: 'Custom Model Training & Fine-Tuning',
    description:
      'Purpose-built AI models trained on your proprietary data. We handle data preparation, training, evaluation, and deployment so you own an AI asset — not just an API subscription.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Intelligent automation that connects your existing tools and eliminates repetitive manual work. From document processing to data entry, let AI handle the busywork.',
  },
  {
    icon: Calculator,
    title: 'AI-Powered Estimation',
    description:
      'Machine learning models that generate accurate cost estimates in seconds. Proven in construction, adaptable to any industry where pricing is complex and time-consuming.',
  },
];

const provenResults = [
  {
    metric: '18,000+',
    label: 'Training Examples',
    description: 'Custom dataset curated for ConstructionAI',
  },
  {
    metric: '$0.002',
    label: 'Per Estimate',
    description: 'Cost per AI-generated construction estimate',
  },
  {
    metric: 'Seconds',
    label: 'Not Hours',
    description: 'Time from input to accurate cost estimate',
  },
  {
    metric: '1',
    label: 'Custom LLM',
    description: 'Fine-tuned model built and deployed in production',
  },
];

const faqs = [
  {
    question: 'How can AI help my business?',
    answer:
      'AI can automate repetitive tasks, generate accurate estimates, power customer-facing chatbots, and surface insights buried in your data. The best use cases are the ones that save your team hours every week on work that is predictable but tedious.',
  },
  {
    question: 'Do you build custom AI models?',
    answer:
      'Yes. We train and fine-tune models on your proprietary data so they understand your business, your terminology, and your customers. A custom model outperforms generic AI on domain-specific tasks because it has been taught your world.',
  },
  {
    question: 'How much do AI solutions cost?',
    answer:
      'It depends on the scope. A chatbot integrated with your existing knowledge base might start at $3,000-$8,000. A fully custom-trained model with a dedicated inference pipeline is a larger investment. We scope every project honestly and give you a fixed price upfront.',
  },
  {
    question: 'Can you integrate AI into my existing systems?',
    answer:
      'Absolutely. Most of our AI work involves connecting intelligent components to the tools you already use — your CRM, your database, your internal workflows. We build the AI layer so it fits seamlessly into what your team already knows.',
  },
];

export default function AISolutionsPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'AI & Machine Learning Solutions',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Strata Software Group',
            },
            areaServed: { '@type': 'State', name: 'Mississippi' },
            description:
              'AI chatbots, custom model training, workflow automation, and intelligent business tools built by Strata Software Group in Oxford, Mississippi.',
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
                name: 'AI & Machine Learning Solutions',
                item: 'https://waltburge.com/services/ai-solutions',
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
            <span className="text-brand-primary">AI & Machine Learning Solutions</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
            AI & Machine Learning
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
            AI & Machine Learning Solutions for Business
          </h1>
          <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
            Intelligent automation, custom-trained models, and AI-powered tools that solve
            real business problems. Not AI for the sake of AI — practical systems that save
            time, cut costs, and give your team a measurable advantage.
          </p>
        </section>

        {/* What We Offer */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
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

        {/* Proven Results */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Proven Results with ConstructionAI
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            We built ConstructionAI — a custom fine-tuned language model for construction cost
            estimation — from the ground up. Curated 18,000+ training examples from real
            project data, trained the model, and deployed it in production for active
            contractors in Oxford, Mississippi.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {provenResults.map((item) => (
              <div
                key={item.label}
                className="p-5 md:p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/40 text-center"
              >
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

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="pb-8 border-b border-brand-border/20 last:border-b-0 last:pb-0"
              >
                <h3 className="text-lg md:text-xl font-bold text-brand-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-brand-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Put AI to Work?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell us about the problem you are trying to solve. We will show you where AI can
              make a real difference — and where it cannot.
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
