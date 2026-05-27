import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Layout,
  ShoppingCart,
  AppWindow,
  Smartphone,
  Search,
  Zap,
  Award,
  MapPin,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQSection';
import { RelatedServices } from '@/components/RelatedServices';

export const metadata: Metadata = {
  title: 'Web Design & Development | High-Performance Sites | Oxford, MS',
  description:
    'High-performance websites and web applications for businesses that take their online presence seriously. Next.js, SEO-optimized, sub-second load times. Web development by Walt Burge in Oxford, MS.',
  openGraph: {
    title: 'Web Design & Development | High-Performance Sites | Oxford, MS | Walt Burge',
    description:
      'High-performance websites and web applications for businesses that take their online presence seriously. Next.js, SEO-optimized, sub-second load times.',
  },
};

const offerings = [
  {
    icon: Globe,
    title: 'Business Websites',
    description:
      'Professional websites that represent your brand, communicate what you do, and make it easy for customers to reach you. Clean design, clear messaging, and built to convert visitors into calls.',
  },
  {
    icon: Layout,
    title: 'Landing Pages',
    description:
      'Focused, high-converting pages designed for specific campaigns, promotions, or services. Optimized for search engines and built to drive action.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description:
      'Online stores that make it simple to sell your products. Secure payments, inventory management, and a shopping experience your customers will trust.',
  },
  {
    icon: AppWindow,
    title: 'Web Applications',
    description:
      'Interactive tools and portals beyond a basic website — booking systems, client dashboards, calculators, and any custom functionality your business requires.',
  },
];

const reasons = [
  {
    icon: Smartphone,
    title: 'Mobile-Friendly',
    description:
      'Over 60% of web traffic comes from mobile devices. Every site we build looks and works great on phones, tablets, and desktops — no pinching, no zooming, no frustration.',
  },
  {
    icon: Search,
    title: 'SEO-Optimized',
    description:
      'Built from the ground up with search engine optimization in mind. Proper heading structure, fast page speed, schema markup, and local SEO so customers in Oxford find you first.',
  },
  {
    icon: Zap,
    title: 'Fast-Loading',
    description:
      'Speed matters. A one-second delay in load time can drop conversions by 7%. We build with Next.js and modern tooling to deliver sub-second page loads that keep visitors engaged.',
  },
  {
    icon: Award,
    title: 'Professional Design',
    description:
      'A polished, modern design builds trust before a customer ever picks up the phone. We create websites that reflect the quality of your work — not a generic template.',
  },
];

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'A professional business website typically starts at $1,500-$5,000 depending on the number of pages, custom features, and design complexity. E-commerce and web applications are priced based on scope. We provide a detailed quote before any work begins so there are no surprises.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most business websites take 2-4 weeks from kickoff to launch. More complex sites with custom functionality or e-commerce can take 4-8 weeks. We set clear milestones and keep you updated at every step.',
  },
  {
    question: 'Will my website work on mobile?',
    answer:
      'Every website we build is fully responsive and tested across phones, tablets, and desktops. Mobile-first design is not an add-on — it is how we build from the start, because that is where most of your customers are browsing.',
  },
  {
    question: 'Do you offer website maintenance?',
    answer:
      'Yes. We offer monthly maintenance plans that include security updates, content changes, performance monitoring, and technical support. Your website is a living asset — it needs regular care to stay fast, secure, and effective.',
  },
];

export default function WebDesignPage() {
  return (
    <>
      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Web Design & Development',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Walt Burge',
            },
            areaServed: {
              '@type': 'City',
              name: 'Oxford',
              containedInPlace: { '@type': 'State', name: 'Mississippi' },
            },
            description:
              'Professional web design and development for businesses in Oxford, Mississippi. Mobile-friendly, SEO-optimized, fast-loading websites.',
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
                name: 'Web Design & Development',
                item: 'https://waltburge.com/services/web-design',
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
            <span className="text-brand-primary">Web Design & Development</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-6 block">
              Web Design & Development
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-[0.95] mb-8">
              Web Design & Development for Oxford, MS Businesses
            </h1>
            <p className="text-lg md:text-xl text-brand-secondary max-w-2xl leading-relaxed">
              Your business deserves a website that works as hard as you do. Professional,
              mobile-friendly, search-optimized websites built for local businesses in Oxford,
              Mississippi and across North Mississippi.
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

        {/* What We Build */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            01. Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            What We Build
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {offerings.map((item) => (
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

        {/* Why Your Business Needs a Website */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            02. The Why
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-12">
            Why Your Business Needs a Professional Website
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {reasons.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border p-2 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-primary mb-2">{item.title}</h3>
                  <p className="text-brand-secondary leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Focus */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
            03. Local Focus
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter mb-6">
            Built for Oxford & North Mississippi
          </h2>
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border p-3 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-brand-accent" />
            </div>
            <div>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                Walt Burge is based in Oxford, Mississippi. I understand the local
                market because we are part of it. When we build your website, we optimize it
                for the searches that matter to your business — "plumber in Oxford MS,"
                "restaurant near Ole Miss," "contractor in Lafayette County."
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg mb-4">
                We serve businesses across Oxford, Water Valley, Batesville, New Albany, and
                the broader North Mississippi region. Whether you are a restaurant on the
                Square, a contractor in Lafayette County, or a service business covering
                multiple counties, we build websites that put you in front of the right
                customers.
              </p>
              <p className="text-brand-secondary leading-relaxed text-lg">
                Working with a local developer means you get face-to-face meetings when you
                need them, faster turnaround, and someone who genuinely understands your
                community and customer base.
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
                'Need more than a website? Full-stack custom software — web apps, mobile apps, SaaS platforms, and internal tools.',
            },
            {
              title: 'All Services',
              href: '/services',
              description:
                'Explore the full range of services — AI engineering, custom software, construction technology, and web development.',
            },
            {
              title: 'AI & Machine Learning Solutions',
              href: '/services/ai-solutions',
              description:
                'Add intelligent features to your business — AI chatbots, automation, and custom-trained models.',
            },
          ]}
        />

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-brand-border/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Ready for a Website That Works?
            </h2>
            <p className="text-brand-secondary text-lg mb-8 max-w-lg mx-auto">
              Tell us about your business and we will show you what a professional website can
              do for you. Free consultation, no obligation.
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
