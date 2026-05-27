import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cpu,
  Mic,
  MapPin,
  Building2,
  Workflow,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'AI Engineer in Mississippi | Custom AI Models & LLM Development',
  description:
    'Looking for an AI engineer in Mississippi? Walt Burge builds custom AI models, fine-tuned LLMs, and intelligent automation for businesses across Mississippi. Based in Oxford, MS — serving Tupelo, Jackson, Hattiesburg, and the Memphis metro.',
  keywords: [
    'AI engineer Mississippi',
    'AI developer Mississippi',
    'machine learning developer MS',
    'AI engineer near me',
    'hire AI engineer Mississippi',
    'custom AI models Mississippi',
    'LLM developer Mississippi',
    'AI automation Mississippi',
    'artificial intelligence Oxford MS',
    'ML engineer Mississippi',
  ],
  openGraph: {
    title: 'AI Engineer in Mississippi | Custom AI Models & LLM Development | Walt Burge',
    description:
      'Custom AI models, fine-tuned LLMs, and intelligent automation for Mississippi businesses. Based in Oxford, MS — serving the entire state and Memphis metro area.',
  },
  alternates: {
    canonical: 'https://waltburge.com/services/ai-engineer-mississippi',
  },
};

const capabilities = [
  {
    icon: Brain,
    title: 'Custom AI Model Training',
    description:
      'Purpose-built AI models trained on your proprietary data. Whether you are a Mississippi manufacturer, healthcare provider, or service business, I build models that understand your specific domain and deliver measurable results.',
  },
  {
    icon: Cpu,
    title: 'LLM Fine-Tuning & Deployment',
    description:
      'Fine-tuned language models that go beyond generic ChatGPT responses. I train models on your terminology, your processes, and your data — then deploy them in production with monitoring and iteration.',
  },
  {
    icon: Workflow,
    title: 'AI-Powered Automation',
    description:
      'Intelligent automation systems that eliminate repetitive, expensive manual work. Document processing, data extraction, cost estimation, and customer routing — any pattern-based task AI can learn.',
  },
  {
    icon: Mic,
    title: 'AI Voice & Communication Systems',
    description:
      'Custom AI voice agents and communication systems for businesses that handle high call volumes. Trained on your scripts, your policies, and your brand voice — not generic hold music and menus.',
  },
];

const proofPoints = [
  {
    metric: '18,000+',
    label: 'Training Examples',
    description: 'Custom dataset for ConstructionAI model — built right here in Mississippi',
  },
  {
    metric: '$0.002',
    label: 'Per Estimate',
    description: 'Cost per AI-generated construction estimate in production',
  },
  {
    metric: 'Seconds',
    label: 'Not Days',
    description: 'Estimate generation time vs. 3 days of manual work',
  },
  {
    metric: 'Live',
    label: 'Production Clients',
    description: 'Mississippi businesses running AI systems on real data',
  },
];

const faqs = [
  {
    question: 'Are there AI engineers in Mississippi?',
    answer:
      'Yes. Walt Burge is an AI engineer based in Oxford, Mississippi who builds custom AI models, fine-tunes LLMs, and deploys intelligent automation systems for businesses across the state. While most AI talent is concentrated in Silicon Valley or New York, having a local AI engineer in Mississippi means you get someone who understands the regional business landscape, can meet face-to-face, and delivers the same caliber of AI engineering you would find at a major tech company.',
  },
  {
    question: 'How much does it cost to hire an AI engineer in Mississippi?',
    answer:
      'AI engineering projects vary based on scope. A focused AI integration or chatbot might start at $8,000-$15,000. A fully custom-trained model with dedicated infrastructure typically runs $20,000-$75,000+. Mississippi businesses benefit from working with a local AI engineer who provides honest, fixed-price scoping — no surprise invoices and no Bay Area overhead baked into the rate.',
  },
  {
    question: 'Can you work with my Mississippi-based business remotely?',
    answer:
      'Absolutely. While I am based in Oxford, Mississippi, I work with businesses across the entire state — Tupelo, Jackson, Hattiesburg, the Gulf Coast, and everywhere in between. For clients in the Oxford, Tupelo, and Memphis metro area, in-person meetings are easy to arrange. For clients statewide and nationwide, I work through video calls, shared project management tools, and regular demos. The quality of the work is identical regardless of location.',
  },
  {
    question: 'What AI projects have you done in Mississippi?',
    answer:
      'My flagship Mississippi project is ConstructionAI — a custom fine-tuned language model built for construction cost estimation, developed in Oxford, MS for MHP Construction. I curated 18,000+ training examples from real project data, trained the model, and deployed it in production where it generates detailed estimates in seconds at $0.002 per estimate. I also built AI-powered voice systems for Lafayette Insurance and delivered intelligent automation for multiple Mississippi and regional businesses.',
  },
];

export default function AIEngineerMississippiPage() {
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
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Oxford',
                addressRegion: 'MS',
                postalCode: '38655',
                addressCountry: 'US',
              },
            },
            areaServed: {
              '@type': 'State',
              name: 'Mississippi',
              containedInPlace: { '@type': 'Country', name: 'United States' },
            },
            description:
              'Custom AI model training, LLM fine-tuning, and intelligent automation for Mississippi businesses. Based in Oxford, MS.',
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
                name: 'AI Engineer in Mississippi',
                item: 'https://waltburge.com/services/ai-engineer-mississippi',
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
            <span className="text-brand-primary">AI Engineer in Mississippi</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              AI Engineering -- Mississippi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              AI Engineer in Mississippi
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Custom AI models, fine-tuned LLMs, and intelligent automation for Mississippi
              businesses. Based in Oxford, MS — serving Oxford, Tupelo, Jackson, Hattiesburg,
              the Memphis metro area, and clients nationwide. Real AI engineering, not prompt
              engineering.
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

        {/* Serving Mississippi */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border p-3 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-brand-accent" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
                AI Engineering for Mississippi Businesses
              </h2>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Mississippi businesses deserve access to the same caliber of AI engineering that
                companies in Silicon Valley and New York have. I am an AI engineer based in
                Oxford, Mississippi, and I build custom AI solutions for businesses across the
                state — from the Memphis metro and North Mississippi to Jackson, Hattiesburg,
                and the Gulf Coast.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Whether you are a construction company in Tupelo looking for AI-powered cost
                estimation, a healthcare provider in Jackson that needs intelligent document
                processing, or a manufacturer in Hattiesburg exploring predictive maintenance,
                I bring production-grade AI engineering to your business without the overhead of
                a Bay Area consultancy.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg">
                For clients in the Oxford, Tupelo, and greater Memphis metro area, in-person
                meetings and on-site discovery sessions are standard. For businesses across
                Mississippi and nationwide, I deliver the same quality remotely through video
                calls, regular demos, and transparent project management.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What I Build for Mississippi Clients
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
            Built in Mississippi. Running in Production.
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            ConstructionAI — a custom fine-tuned language model for construction cost estimation —
            was built right here in Oxford, Mississippi for MHP Construction. I also developed
            AI-powered voice systems for Lafayette Insurance. These are not research papers or
            prototypes. They are production systems used by Mississippi businesses every day.
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

        {/* Service Area */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Service Area
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            AI Engineering Across Mississippi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: MapPin,
                region: 'North Mississippi & Memphis Metro',
                cities: 'Oxford, Tupelo, Corinth, New Albany, Southaven, Olive Branch, Memphis TN',
                note: 'In-person meetings available',
              },
              {
                icon: Building2,
                region: 'Central & South Mississippi',
                cities: 'Jackson, Hattiesburg, Meridian, Vicksburg, Laurel, Biloxi, Gulfport',
                note: 'Remote + periodic on-site visits',
              },
            ].map((area) => (
              <div
                key={area.region}
                className="p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-base border border-brand-border p-2 flex items-center justify-center">
                    <area.icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary">{area.region}</h3>
                </div>
                <p className="text-brand-secondary text-sm leading-relaxed mb-2">{area.cities}</p>
                <p className="text-brand-accent text-xs font-mono uppercase tracking-wider">
                  {area.note}
                </p>
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

        {/* Related Services */}
        <RelatedServices
          items={[
            {
              title: 'Hire an AI Engineer',
              href: '/services/hire-ai-engineer',
              description:
                'Detailed overview of AI engineering capabilities — custom model training, LLM fine-tuning, and production deployment.',
            },
            {
              title: 'AI Developer for Hire',
              href: '/services/ai-developer-for-hire',
              description:
                'Engagement models for hiring a freelance AI engineer — project-based, retainer, or embedded on your team.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Full suite of AI solutions including chatbots, workflow automation, and AI-powered estimation tools.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready to Bring AI to Your Mississippi Business?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me about the problem you are solving. I will tell you honestly whether AI is
              the right answer — and if it is, exactly how I would build it for your business.
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
