import type { Metadata } from 'next';
import Link from 'next/link';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Strata Software Group | Free Consultation | Oxford, MS',
  description:
    'Get a free consultation for your software project. Custom development, AI solutions, or web design in Oxford, Mississippi.',
  alternates: {
    canonical: 'https://waltburge.com/contact',
  },
};

const breadcrumbJsonLd = {
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
      name: 'Contact',
      item: 'https://waltburge.com/contact',
    },
  ],
};

const steps = [
  {
    number: '01',
    title: 'Tell us about your project',
    description:
      'Fill out the form below with the details of what you need built.',
  },
  {
    number: '02',
    title: "We'll respond within 24 hours",
    description:
      "You'll get a real reply from a real developer, not a chatbot or a sales pitch.",
  },
  {
    number: '03',
    title: 'Free 30-minute discovery call',
    description:
      "We'll talk through your project, scope, and timeline -- no obligation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Nav bar */}
      <nav className="sticky top-0 z-50 px-6 h-16 md:h-20 flex items-center bg-brand-base/95 backdrop-blur border-b border-brand-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Home
        </Link>
      </nav>

      <main className="min-h-screen bg-brand-base">
        {/* What to Expect */}
        <section className="py-16 md:py-24 px-4 md:px-6 border-b border-brand-border/10">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-5 mb-12">
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-px bg-brand-accent" />
                Get Started
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
                What to Expect
              </h1>
              <div className="h-1 w-24 bg-brand-accent rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="p-6 md:p-8 rounded-2xl bg-brand-surface border border-brand-primary/5"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm mb-5">
                    {step.number}
                  </div>
                  <h2 className="text-lg font-bold text-brand-primary mb-2">
                    {step.title}
                  </h2>
                  <p className="text-sm text-brand-secondary leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <Contact />

        {/* Location info */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="pt-8 border-t border-brand-primary/5 text-center">
            <p className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
              Based in Oxford, Mississippi | Serving Nationwide
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
