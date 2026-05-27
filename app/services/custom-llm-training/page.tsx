import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Lock,
  DollarSign,
  Link2Off,
  Database,
  FlaskConical,
  BarChart3,
  Server,
  RefreshCw,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'Custom LLM Training & Fine-Tuning | Domain-Specific AI Models',
  description:
    'Custom LLM training and fine-tuning on your domain data. Llama, Mistral, Qwen models you own and control. Starting at $25K. Built by Walt Burge.',
  openGraph: {
    title: 'Custom LLM Training & Fine-Tuning | Domain-Specific AI Models | Walt Burge',
    description:
      'Generic AI doesn\'t know your industry. Domain-specific language models trained on your data — not prompt engineering hacks, but real fine-tuned models you own and control.',
  },
};

const whyCustom = [
  {
    icon: AlertTriangle,
    title: 'Generic LLMs Hallucinate Industry Knowledge',
    description:
      'GPT and Claude are brilliant generalists, but they make things up when asked about your specific domain. A fine-tuned model trained on your data produces accurate, reliable outputs because it has actually learned your industry.',
  },
  {
    icon: Lock,
    title: 'You Don\'t Own the Model or the Data',
    description:
      'Every query to OpenAI or Anthropic sends your proprietary data through their servers. A custom model runs on your infrastructure, keeps your data private, and gives you full control over the asset.',
  },
  {
    icon: DollarSign,
    title: 'Per-Token Costs Add Up Fast',
    description:
      'At scale, API costs for GPT-4 class models become a significant line item. A fine-tuned 8B parameter model running on your own infrastructure costs a fraction per inference — $0.002 vs. $0.03+ per request.',
  },
  {
    icon: Link2Off,
    title: 'API Dependencies Create Vendor Lock-In',
    description:
      'When your product depends on a third-party API, you are at the mercy of their pricing changes, rate limits, and deprecation decisions. A model you own cannot be taken away from you.',
  },
];

const whatIBuild = [
  {
    icon: Database,
    title: 'Domain-Specific Fine-Tuned Models',
    description:
      'Llama, Mistral, and Qwen models fine-tuned on your proprietary data. These are not prompt-engineered wrappers — they are real models that have learned your domain through training.',
  },
  {
    icon: FlaskConical,
    title: 'Custom Training Data Pipelines',
    description:
      'Data collection, cleaning, formatting, and augmentation pipelines that turn your raw business data into high-quality training examples. The quality of the training data determines the quality of the model.',
  },
  {
    icon: BarChart3,
    title: 'Model Evaluation & Benchmarking',
    description:
      'Rigorous evaluation against your specific use cases with custom benchmarks. I do not ship a model until it demonstrably outperforms the baseline on the metrics that matter to your business.',
  },
  {
    icon: Server,
    title: 'Production Deployment',
    description:
      'Deployed on RunPod, AWS, or your own infrastructure with proper monitoring, scaling, and failover. Your model runs where you need it — cloud, on-prem, or edge.',
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Retraining & Improvement',
    description:
      'Models improve with more data. I build retraining pipelines that incorporate new examples, track performance over time, and ensure your model gets better as your dataset grows.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Data Audit & Curation',
    duration: '2-4 weeks',
    description:
      'I assess your existing data, identify gaps, and build a curation pipeline. Raw data becomes structured training examples — cleaned, formatted, and validated. This phase determines 80% of the model\'s eventual quality.',
  },
  {
    step: '02',
    title: 'Training Pipeline',
    duration: '2-3 weeks',
    description:
      'Build the full training infrastructure — data loading, preprocessing, fine-tuning configuration, and hyperparameter optimization. Multiple training runs with different configurations to find the optimal model.',
  },
  {
    step: '03',
    title: 'Evaluation & Iteration',
    duration: '1-2 weeks',
    description:
      'Systematic evaluation against your custom benchmarks. Side-by-side comparison with baseline models. Identify failure modes, add targeted training data, and retrain until the model meets your quality bar.',
  },
  {
    step: '04',
    title: 'Production Deployment',
    duration: '1 week',
    description:
      'Deploy to your production infrastructure with monitoring, logging, and performance baselines. API endpoints, rate limiting, and integration with your existing systems.',
  },
];

const faqs = [
  {
    question: "What's the difference between fine-tuning and prompt engineering?",
    answer:
      'Prompt engineering gives instructions to a generic model at query time. Fine-tuning actually changes the model\'s weights by training it on your data, so it inherently understands your domain. Fine-tuned models are faster, cheaper per inference, more accurate on domain tasks, and do not require long system prompts.',
  },
  {
    question: 'What data do you need from us?',
    answer:
      'The ideal starting point is examples of inputs and desired outputs from your domain — documents, Q&A pairs, reports, estimates, or any structured knowledge. I work with whatever you have and build the data pipeline to transform it into training-ready format.',
  },
  {
    question: 'How much training data is required?',
    answer:
      'Meaningful fine-tuning starts at around 1,000-5,000 high-quality examples. For production-grade models, 10,000-50,000 examples produce significantly better results. I help you build the data generation pipeline if you are starting with less.',
  },
  {
    question: 'Do we own the model?',
    answer:
      'Yes. The base models I fine-tune (Llama, Mistral, Qwen) are open-weight, and the fine-tuned weights belong entirely to you. You can deploy, modify, and distribute the model as you see fit. No licensing fees, no vendor lock-in.',
  },
];

export default function CustomLLMTrainingPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Custom LLM Training & Fine-Tuning',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Custom language model training and fine-tuning on domain-specific data. Production deployment of models you own and control.',
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
                name: 'Custom LLM Training & Fine-Tuning',
                item: 'https://waltburge.com/services/custom-llm-training',
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
            <span className="text-brand-primary">Custom LLM Training & Fine-Tuning</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Custom AI Models
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Custom LLM Training &<br />Fine-Tuning
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Generic AI does not know your industry. I build domain-specific language models
              trained on your data — not prompt engineering hacks, but real fine-tuned models you
              own and control.
            </p>
          </div>
        </section>

        {/* Why Custom Models */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Why Custom Models
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {whyCustom.map((item) => (
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

        {/* What I Build */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What I Build
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {whatIBuild.map((item) => (
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

        {/* Proof: ConstructionAI */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Case Study: ConstructionAI
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-8">
            I did not just read about fine-tuning — I built and shipped a production fine-tuned
            model for the construction industry.
          </p>
          <div className="p-8 rounded-2xl border border-brand-accent/30 bg-brand-accent/5">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Base Model
                </div>
                <div className="text-xl font-bold text-brand-primary">Llama 3.1 8B</div>
                <p className="text-brand-secondary text-sm">Fine-tuned, not prompted</p>
              </div>
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Training Data
                </div>
                <div className="text-xl font-bold text-brand-primary">18,000+</div>
                <p className="text-brand-secondary text-sm">Curated examples</p>
              </div>
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Inference Cost
                </div>
                <div className="text-xl font-bold text-brand-primary">$0.002</div>
                <p className="text-brand-secondary text-sm">Per estimate</p>
              </div>
              <div>
                <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-2">
                  Scaling To
                </div>
                <div className="text-xl font-bold text-brand-primary">500K+</div>
                <p className="text-brand-secondary text-sm">Training examples</p>
              </div>
            </div>
            <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
              Built a complete data pipeline, curated 18,000+ construction estimation examples
              from real project data, fine-tuned a Llama 3.1 8B model, and deployed it in
              production. The model generates detailed construction cost estimates in seconds —
              replacing a 2-3 day manual process at a fraction of the cost.
            </p>
          </div>
        </section>

        {/* The Process */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            04. Process
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

        {/* Pricing */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            05. Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Investment
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Custom model training is a serious investment that produces a serious asset. You own
            the model, the training pipeline, and the competitive advantage.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Single Model
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$25K-$50K</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                One fine-tuned model with a complete training pipeline, evaluation framework, and
                production deployment. Includes data curation, training, and deployment to your
                infrastructure.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-accent/40 bg-brand-surface/30 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-accent text-brand-base text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                Full Package
              </div>
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Enterprise
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$50K-$100K</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Multiple domain-specific models, advanced training infrastructure, comprehensive
                evaluation suite, and enterprise-grade deployment with monitoring and failover.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
              <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
                Ongoing Retrain
              </div>
              <div className="text-3xl font-black text-brand-primary mb-2">$3K-$8K</div>
              <div className="text-sm text-brand-secondary mb-2">/month</div>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Continuous model improvement with new training data, performance monitoring,
                periodic retraining, and model version management.
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
                'Broader AI solutions including chatbots, automation, and AI-powered estimation tools.',
            },
            {
              title: 'AI-Powered Business Automation',
              href: '/services/ai-automation',
              description:
                'Intelligent process automation that integrates with your custom models to automate business workflows.',
            },
            {
              title: 'Hire an AI Engineer',
              href: '/services/hire-ai-engineer',
              description:
                'Dedicated AI engineering for ongoing model development, training, and production deployment.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Own Your AI?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about your domain and your data. I will assess whether fine-tuning makes
              sense for your use case — and give you an honest answer if it does not.
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
