import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Brain,
  Layout,
  MapPin,
  HardHat,
  Users,
  Code2,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'Software Developer in Oxford, MS | Custom Apps & Web Development',
  description:
    'Software developer in Oxford, Mississippi building custom web apps, mobile apps, AI solutions, and websites for local businesses. Serving Oxford, Lafayette County, Ole Miss area, and North Mississippi.',
  keywords: [
    'software developer Oxford MS',
    'web developer Oxford Mississippi',
    'app developer near me Oxford',
    'software developer near me',
    'Oxford MS web developer',
    'Lafayette County software developer',
    'custom software Oxford Mississippi',
    'mobile app developer Oxford MS',
    'freelance developer Oxford MS',
    'website developer Oxford Mississippi',
  ],
  openGraph: {
    title: 'Software Developer in Oxford, MS | Custom Apps & Web Development | Walt Burge',
    description:
      'Custom web apps, mobile apps, AI solutions, and websites for businesses in Oxford, Mississippi. Local developer serving Lafayette County and North Mississippi.',
  },
  alternates: {
    canonical: 'https://waltburge.com/services/software-developer-oxford-ms',
  },
};

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description:
      'Full-featured web applications built with Next.js, React, and TypeScript. From contractor management platforms to customer portals — custom software that fits your Oxford business workflow.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Cross-platform mobile applications for iOS and Android. Service businesses, restaurants, retailers — if your Oxford customers need an app, I build it native-quality from a single codebase.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Custom AI models and intelligent automation for businesses ready to leverage artificial intelligence. From AI-powered cost estimation to smart chatbots trained on your business data.',
  },
  {
    icon: Layout,
    title: 'Professional Websites',
    description:
      'High-performance, SEO-optimized websites that put your Oxford business in front of the right customers. Mobile-friendly, fast-loading, and built to convert visitors into calls.',
  },
];

const localProof = [
  {
    metric: '12+',
    label: 'Projects Shipped',
    description: 'Production software for real businesses',
  },
  {
    metric: '18K+',
    label: 'AI Training Examples',
    description: 'Custom dataset built for a local Oxford contractor',
  },
  {
    metric: '6+',
    label: 'Clients Served',
    description: 'Including MHP Construction in Oxford, MS',
  },
  {
    metric: '1',
    label: 'Custom LLM',
    description: 'Fine-tuned AI model trained and deployed in production',
  },
];

const faqs = [
  {
    question: 'Is there a software developer in Oxford, MS?',
    answer:
      'Yes. Walt Burge is a full-stack software developer and AI engineer based in Oxford, Mississippi. I build custom web applications, mobile apps, AI solutions, and professional websites for local businesses in Oxford, Lafayette County, and across North Mississippi. Working with a local developer means face-to-face meetings, faster communication, and someone who understands the Oxford business community.',
  },
  {
    question: 'How much does custom software cost in Mississippi?',
    answer:
      'Custom software projects in Mississippi vary based on scope and complexity. A professional business website typically starts at $1,500-$5,000. A custom web application or mobile app MVP starts at $5,000-$25,000. AI-powered systems range from $8,000-$75,000+ depending on whether you need a simple integration or a fully custom-trained model. I scope every project honestly and provide a fixed price before work begins — no surprises and no hidden fees.',
  },
  {
    question: 'Do you work with small businesses in Oxford?',
    answer:
      'Absolutely. Small businesses are the backbone of Oxford and Lafayette County, and they deserve professional-quality software. Whether you are a restaurant on the Square, a service business near Ole Miss, or a contractor in Lafayette County, I build technology solutions scaled to your needs and your budget. My first production client was a small construction company right here in Oxford, MS.',
  },
  {
    question: 'Can you build mobile apps?',
    answer:
      'Yes. I build cross-platform mobile applications using React Native that run natively on both iOS and Android from a single codebase. This means your Oxford business gets a professional mobile app at a fraction of the cost of building two separate native apps. I handle everything from design to App Store deployment.',
  },
];

export default function SoftwareDeveloperOxfordMSPage() {
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
              '@type': 'City',
              name: 'Oxford',
              containedInPlace: {
                '@type': 'State',
                name: 'Mississippi',
              },
            },
            description:
              'Custom software development, web applications, mobile apps, and AI solutions for businesses in Oxford, Mississippi and Lafayette County.',
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
                name: 'Software Developer in Oxford, MS',
                item: 'https://waltburge.com/services/software-developer-oxford-ms',
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
            <span className="text-brand-primary">Software Developer in Oxford, MS</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Oxford, Mississippi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Software Developer in Oxford, Mississippi
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Custom web apps, mobile apps, AI solutions, and professional websites for
              businesses in Oxford, MS. A local developer who understands Lafayette County,
              the Ole Miss community, and what it takes to build software that actually works
              for small and mid-size businesses.
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

        {/* Local Focus */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border p-3 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-brand-accent" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
                Your Local Oxford Software Developer
              </h2>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Oxford, Mississippi is home to a vibrant business community — from the shops
                and restaurants around the Square to the contractors, service businesses, and
                startups that make Lafayette County run. I am a software developer based right
                here in Oxford, and I build custom technology solutions for businesses that
                need more than a template website or off-the-shelf software.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Working with a local developer in Oxford means you get face-to-face meetings
                when you need them, someone who understands the local market and the Ole Miss
                community, and a direct line to the person writing your code. No agencies, no
                middlemen, no outsourcing overseas.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg">
                My first production client was{' '}
                <strong className="text-brand-primary">MHP Construction in Oxford, MS</strong>{' '}
                — a local contractor who needed an AI-powered estimation platform. I built it
                from the ground up, deployed it in production, and they use it on real bids
                every day. That is the standard I hold for every project, whether you are a
                small business on the Square or a company serving the entire state.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What I Build for Oxford Businesses
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {services.map((item) => (
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
            02. Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-4">
            Proven Results for Local Businesses
          </h2>
          <p className="text-brand-secondary text-lg max-w-2xl leading-relaxed mb-12">
            From Oxford, Mississippi to clients nationwide — real software shipped for real
            businesses, including local contractors, insurance companies, and organizations
            right here in Lafayette County.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {localProof.map((item) => (
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

        {/* Case Study */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Local Client
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            Built for Oxford, MS
          </h2>
          <div className="p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent bg-brand-surface/30 border border-brand-border/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-base border border-brand-border flex items-center justify-center">
                <HardHat className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-brand-primary font-bold">MHP Construction</div>
                <div className="text-brand-secondary text-xs font-mono">Oxford, Mississippi</div>
              </div>
            </div>
            <p className="text-brand-secondary leading-relaxed mb-4">
              MHP Construction is a general contractor based in Oxford, MS. They needed faster,
              more consistent estimates without hiring a full-time estimator. I built
              ConstructionAI — a custom fine-tuned language model trained on 18,000+ real
              project examples — and deployed it as a production tool their team uses daily.
            </p>
            <p className="text-brand-secondary leading-relaxed">
              Estimates that used to take hours now take seconds. The AI catches line items
              that get missed under time pressure, and the cost per estimate dropped to
              fractions of a penny. This is what happens when a local Oxford developer builds
              custom software for a local Oxford business — real problems get real solutions.
            </p>
          </div>
        </section>

        {/* Who I Work With */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-8">
            Who I Work With in Oxford
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: HardHat,
                title: 'Contractors & Trades',
                description:
                  'Estimation tools, job tracking, contractor platforms, and digital workflows built by someone who spent years on job sites before writing code.',
              },
              {
                icon: Users,
                title: 'Local Businesses',
                description:
                  'Restaurants, retailers, service businesses, and professional firms in Oxford and Lafayette County that need a professional online presence or custom tools.',
              },
              {
                icon: Code2,
                title: 'Startups & Growing Companies',
                description:
                  'Businesses in the Ole Miss ecosystem and beyond that need custom software, MVPs, or AI-powered products built by a serious engineer.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-base border border-brand-border p-2 mb-4 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary mb-2">{item.title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{item.description}</p>
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
              title: 'Custom Software Development',
              href: '/services/custom-software',
              description:
                'Full-stack custom software — web apps, mobile apps, SaaS platforms, and internal tools built for your specific business needs.',
            },
            {
              title: 'Web Design & Development',
              href: '/services/web-design',
              description:
                'Professional, SEO-optimized websites for Oxford businesses. Mobile-friendly, fast-loading, and built to convert visitors into customers.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Custom AI models, chatbots, and intelligent automation for businesses ready to leverage artificial intelligence.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Need a Developer in Oxford, MS?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell me what your business needs. I will give you an honest assessment, a clear
              scope, and a fixed price — no surprises.
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
