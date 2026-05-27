import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cpu,
  Workflow,
  Mic,
  Briefcase,
  Clock,
  UserCheck,
  Target,
  Wrench,
  Shield,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'AI Developer for Hire | Freelance AI Engineer | Custom Models & Automation',
  description:
    'Hire a freelance AI developer who builds custom models, fine-tunes LLMs, and deploys production AI systems. Project-based, retainer, or embedded on your team. Not an API wrapper shop — real AI engineering.',
  keywords: [
    'AI developer for hire',
    'freelance AI engineer',
    'contract AI developer',
    'hire ML engineer',
    'hire machine learning developer',
    'freelance machine learning engineer',
    'AI engineer for hire',
    'contract machine learning developer',
    'fractional AI engineer',
    'embedded AI developer',
  ],
  openGraph: {
    title: 'AI Developer for Hire | Freelance AI Engineer | Custom Models & Automation | Walt Burge',
    description:
      'Hire a freelance AI developer who builds custom models and deploys production AI systems. Project-based, retainer, or embedded.',
  },
  alternates: {
    canonical: 'https://waltburge.com/services/ai-developer-for-hire',
  },
};

const engagementModels = [
  {
    icon: Target,
    title: 'Project-Based',
    description:
      'A defined scope, a fixed price, and a clear deliverable. Best for: a specific AI feature, a custom model, a proof of concept, or a production system with known requirements. I scope it, price it, build it, and deploy it.',
    ideal: 'One-time AI projects with clear objectives',
  },
  {
    icon: Clock,
    title: 'Monthly Retainer',
    description:
      'Ongoing AI engineering capacity reserved for your business. Best for: companies that need continuous AI development, model iteration, new feature builds, and technical guidance on an ongoing basis. Predictable monthly cost, dedicated availability.',
    ideal: 'Ongoing AI development and iteration',
  },
  {
    icon: UserCheck,
    title: 'Embedded / Fractional',
    description:
      'I operate as part of your team — attending standups, reviewing PRs, and owning the AI engineering layer while your developers handle the rest of the stack. Best for: teams that need senior AI expertise but cannot justify a full-time hire.',
    ideal: 'Teams needing senior AI expertise on staff',
  },
];

const differentiators = [
  {
    icon: Brain,
    title: 'Actually Builds Custom Models',
    description:
      'Most "AI developers" call an API and wrap it in a prompt. I train and fine-tune models on your data. I built ConstructionAI from 18,000+ training examples — curated the dataset, ran the training pipeline, evaluated the model, and deployed it in production. That is a fundamentally different skillset than prompt engineering.',
  },
  {
    icon: Wrench,
    title: 'Construction Domain Expertise',
    description:
      'I spent years in construction before writing code. That domain expertise means I do not just understand AI technically — I understand the real-world problems AI is supposed to solve. If you are in construction, manufacturing, trades, or any industry where the people who know the domain are not the people building the software, that matters.',
  },
  {
    icon: Shield,
    title: 'Ships Production Systems',
    description:
      'I do not build demos. Every AI system I deliver is production-grade — with monitoring, error handling, feedback loops, and the infrastructure to handle real traffic from real users. You get a deployed system, not a Jupyter notebook.',
  },
  {
    icon: Cpu,
    title: 'Full-Stack AI Engineering',
    description:
      'I handle the entire pipeline: data preparation, model training, API development, frontend integration, deployment, and monitoring. You do not need to hire a data scientist, a backend engineer, and a frontend developer separately. I cover the full stack.',
  },
];

const proofPoints = [
  {
    metric: '18,000+',
    label: 'Training Examples',
    description: 'Custom dataset for ConstructionAI fine-tuned model',
  },
  {
    metric: '$0.002',
    label: 'Per Estimate',
    description: 'Production cost per AI-generated construction estimate',
  },
  {
    metric: 'Seconds',
    label: 'Not Days',
    description: 'Estimate generation vs. 3 days of manual work',
  },
  {
    metric: 'Live',
    label: 'Production Systems',
    description: 'Active clients using AI on real business data',
  },
];

const faqs = [
  {
    question: "What's the difference between an AI developer and someone who uses ChatGPT APIs?",
    answer:
      'An AI developer who uses ChatGPT APIs is building a wrapper — they send your data to OpenAI, get a response back, and display it. That has its place for simple use cases. What I do is fundamentally different: I train custom models on your proprietary data, fine-tune existing models to understand your specific domain, build data pipelines, evaluate model performance, and deploy production inference infrastructure. The result is an AI asset you own that is specifically tuned to your business, not a generic model behind a prompt.',
  },
  {
    question: 'How do you price AI projects?',
    answer:
      'I offer three engagement models. Project-based work starts with a thorough scoping phase and you get a fixed price before work begins — typically $8,000-$15,000 for focused integrations and $20,000-$75,000+ for custom-trained models. Monthly retainers provide dedicated AI engineering capacity at a predictable cost. Embedded/fractional arrangements are priced based on the time commitment. Every engagement starts with a free discovery call where I assess the problem and recommend the right approach.',
  },
  {
    question: 'Can you work as an embedded AI engineer on my team?',
    answer:
      'Yes. I operate as a fractional or embedded AI engineer for teams that need senior AI expertise without the cost of a full-time hire. In this model, I attend your standups, participate in sprint planning, review code, and own the AI/ML layer of your product while your existing developers handle the rest of the stack. I document everything, build clean APIs, and ensure knowledge transfer so your team is never dependent on a single person.',
  },
  {
    question: 'What AI frameworks and tools do you use?',
    answer:
      'My core AI stack includes PyTorch and Hugging Face Transformers for model training and fine-tuning, LangChain for LLM application development, Python for data pipelines, and Next.js/TypeScript for the application layer. For deployment, I use Docker, Vercel, and cloud GPU infrastructure depending on the model size and inference requirements. I choose tools based on what the problem requires, not what is trending — and I am framework-agnostic when it comes to solving the actual engineering challenge.',
  },
];

export default function AIDeveloperForHirePage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Freelance AI Engineering & Custom Model Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
              url: 'https://waltburge.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Oxford',
                addressRegion: 'MS',
                postalCode: '38655',
                addressCountry: 'US',
              },
            },
            areaServed: { '@type': 'Country', name: 'United States' },
            description:
              'Freelance AI developer available for hire. Custom model training, LLM fine-tuning, and production AI systems. Project-based, retainer, or embedded engagement models.',
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
                name: 'AI Developer for Hire',
                item: 'https://waltburge.com/services/ai-developer-for-hire',
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
            <span className="text-brand-primary">AI Developer for Hire</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Freelance AI Engineering
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              AI Developer for Hire
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              A freelance AI engineer who builds custom models, fine-tunes LLMs, and deploys
              production systems — not an agency that sends you a ChatGPT wrapper. Available
              project-based, on retainer, or embedded on your team. Based in Oxford, MS.
              Working with clients nationwide.
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

        {/* Engagement Models */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Engagement Models
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            How to Hire Me
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            Every business has different needs. I offer three engagement models so you get the
            right level of AI engineering support without paying for more than you need.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="p-6 md:p-8 rounded-2xl border border-brand-border/40 bg-brand-surface/30 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border p-2.5 mb-5 flex items-center justify-center">
                  <model.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{model.title}</h3>
                <p className="text-brand-secondary leading-relaxed text-sm md:text-base mb-4 flex-1">
                  {model.description}
                </p>
                <div className="pt-4 border-t border-brand-border/20">
                  <span className="text-xs font-mono text-brand-accent uppercase tracking-wider">
                    Best for: {model.ideal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Makes Me Different */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. The Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Not Your Typical AI Developer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {differentiators.map((item) => (
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
            03. Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Real Models. Real Production. Real Results.
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            I built ConstructionAI — a custom fine-tuned language model for construction cost
            estimation — from the ground up. I also built AI voice systems for Lafayette
            Insurance and delivered intelligent automation for businesses across multiple
            industries. These are not side projects or demos.
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

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            04. Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Tools & Frameworks
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              'PyTorch',
              'Hugging Face Transformers',
              'LangChain',
              'Python',
              'Next.js',
              'TypeScript',
              'React',
              'Node.js',
              'PostgreSQL',
              'Docker',
              'Vercel',
              'REST / GraphQL',
              'OpenAI API',
              'Anthropic API',
              'Vector Databases',
              'RAG Pipelines',
            ].map((tech) => (
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

        {/* Related Services */}
        <RelatedServices
          items={[
            {
              title: 'Hire an AI Engineer',
              href: '/services/hire-ai-engineer',
              description:
                'Deep dive into AI engineering capabilities — custom model training, LLM fine-tuning, and intelligent automation.',
            },
            {
              title: 'AI Engineer in Mississippi',
              href: '/services/ai-engineer-mississippi',
              description:
                'Local AI engineering for Mississippi businesses. Serving Oxford, Tupelo, Jackson, Hattiesburg, and the Memphis metro.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Full suite of AI solutions including chatbots, workflow automation, custom model training, and AI-powered estimation.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Hire an AI Developer?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about the problem you are solving. I will tell you honestly whether AI is
              the right answer, which engagement model fits, and exactly how I would build it.
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
