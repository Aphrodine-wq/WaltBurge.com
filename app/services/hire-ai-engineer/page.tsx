import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cpu,
  Workflow,
  Mic,
  Phone,
  Hammer,
  Rocket,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Hire an AI Engineer | Custom Models, LLMs & Intelligent Systems',
  description:
    'Looking to hire an AI engineer? I build custom AI models, fine-tune LLMs, and deploy intelligent systems for production. Based in Oxford, MS — working with clients nationwide.',
  openGraph: {
    title: 'Hire an AI Engineer | Custom Models, LLMs & Intelligent Systems | Walt Burge',
    description:
      'Looking to hire an AI engineer? I build custom AI models, fine-tune LLMs, and deploy intelligent systems for production. Based in Oxford, MS — working with clients nationwide.',
  },
  alternates: {
    canonical: 'https://waltburge.com/services/hire-ai-engineer',
  },
};

const capabilities = [
  {
    icon: Brain,
    title: 'Custom Model Training',
    description:
      'Purpose-built AI models trained on your proprietary data. I handle data preparation, training pipeline, evaluation, and deployment — you own the model, not just an API subscription.',
  },
  {
    icon: Cpu,
    title: 'LLM Fine-Tuning',
    description:
      'Fine-tuned language models that understand your domain, your terminology, and your edge cases. Not prompt engineering on top of GPT — actual model training that produces a deployable asset.',
  },
  {
    icon: Workflow,
    title: 'AI-Powered Features & Products',
    description:
      'Intelligent features embedded into your existing software — smart search, automated classification, predictive analytics, and natural language interfaces that make your product smarter.',
  },
  {
    icon: Mic,
    title: 'Intelligent Automation',
    description:
      'AI systems that automate the expensive, repetitive work in your business. Document processing, data extraction, estimation, customer routing — anything with a pattern, AI can learn.',
  },
];

const proofPoints = [
  {
    metric: '18,000+',
    label: 'Training Examples',
    description: 'Custom dataset curated for ConstructionAI fine-tuned model',
  },
  {
    metric: '$0.002',
    label: 'Per Estimate',
    description: 'Cost per AI-generated construction estimate in production',
  },
  {
    metric: 'Seconds',
    label: 'Not Days',
    description: 'Estimate generation time vs. 3 days manually',
  },
  {
    metric: 'Live',
    label: 'In Production',
    description: 'Active clients using AI systems on real business data',
  },
];

const processSteps = [
  {
    icon: Phone,
    step: '01',
    title: 'Discovery Call',
    description:
      'We talk about your business, your data, and what you are trying to achieve. I will tell you honestly whether AI is the right solution — and if it is, what kind of model and infrastructure you need.',
  },
  {
    icon: Hammer,
    step: '02',
    title: 'Architecture & Build',
    description:
      'I design the data pipeline, train or fine-tune the model, build the integration layer, and test it against real-world scenarios. You see working demos throughout, not just a final reveal.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Deploy & Iterate',
    description:
      'The system goes live in production with monitoring, logging, and a feedback loop. AI gets better with real data — I stick around to tune performance and handle edge cases as they surface.',
  },
];

const faqs = [
  {
    question: 'What kind of AI engineer are you?',
    answer:
      'I am a full-stack AI engineer — I handle everything from data preparation and model training to building the web application that wraps the model and deploying it to production. You do not need to hire a separate data scientist, backend engineer, and frontend developer. I cover the full pipeline.',
  },
  {
    question: 'Do you build AI wrappers or actual custom models?',
    answer:
      'Both, depending on what the problem requires. If a well-prompted API call solves your problem, I will tell you that and save you money. But my specialty is custom model training and fine-tuning — building AI that understands your specific domain better than any generic model can.',
  },
  {
    question: 'What industries have you built AI for?',
    answer:
      'Construction (custom fine-tuned estimation model with 18,000+ training examples), insurance (AI-powered voice systems), and general business automation. The techniques transfer across industries — if your business has data and repetitive expert decisions, AI can learn them.',
  },
  {
    question: 'How much does it cost to hire an AI engineer?',
    answer:
      'It depends on the scope. A focused AI integration might start at $8,000-$15,000. A fully custom-trained model with dedicated infrastructure is a larger investment, typically $20,000-$75,000+. I scope every project honestly and give you a fixed price before work begins.',
  },
  {
    question: 'Can you work with my existing development team?',
    answer:
      'Absolutely. I can operate as an embedded AI engineer on your team, owning the model training and AI architecture while your developers handle the rest of the application. I document everything and build clean APIs so integration is straightforward.',
  },
  {
    question: 'How long does a typical AI project take?',
    answer:
      'A focused AI feature or integration typically takes 4-8 weeks. A custom-trained model with production deployment takes 8-16 weeks depending on data complexity and accuracy requirements. I set clear milestones so you see progress throughout.',
  },
];

export default function HireAIEngineerPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'AI Engineering & Custom Model Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
              url: 'https://waltburge.com',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Custom AI model training, LLM fine-tuning, and intelligent automation systems. Full-stack AI engineering from data preparation to production deployment.',
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
                name: 'Hire an AI Engineer',
                item: 'https://waltburge.com/services/hire-ai-engineer',
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
            <span className="text-brand-primary">Hire an AI Engineer</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              AI Engineering
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Hire an AI Engineer Who Ships
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Custom AI models, fine-tuned LLMs, and intelligent systems built for production — not
              demos. I train models on your data, build the infrastructure to serve them, and deploy
              systems your team actually uses. Based in Oxford, MS. Working with clients nationwide.
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

        {/* What I Build */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What I Build
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {capabilities.map((item) => (
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

        {/* Proof */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Real Models. Real Production. Real Clients.
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            I built ConstructionAI — a custom fine-tuned language model for construction cost
            estimation — from the ground up. I also built AI voice systems for Lafayette Insurance
            and delivered AI automation for businesses across multiple industries. These are not
            side projects. They are production systems used by real companies on real data.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {proofPoints.map((item) => (
              <div
                key={item.label}
                className="p-5 md:p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/40 text-center hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
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

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            How It Works
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
              Ready to Build Something Real?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about the problem you are solving. I will tell you honestly whether AI is the
              right answer — and if it is, exactly how I would build it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-brand-base font-bold rounded-full hover:bg-brand-accent/90 transition-colors"
            >
              Start a Conversation <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
