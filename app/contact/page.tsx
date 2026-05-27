import type { Metadata } from 'next';
import Link from 'next/link';
import ServiceRequestForm from './ServiceRequestForm';

export const metadata: Metadata = {
  title: 'Request a Service | Walt Burge | Oxford, MS',
  description:
    'Get a free consultation for your next software project. Use the live project scope builder to estimate complexity, timeline, and budget instantly. Custom software, AI solutions, and web design from Walt Burge in Oxford, Mississippi.',
  alternates: {
    canonical: 'https://waltburge.com/contact',
  },
  openGraph: {
    title: 'Request a Service | Walt Burge | Oxford, MS',
    description:
      'Build your project brief with a live scope estimator. Custom software, AI solutions, construction tech, and web design from Walt Burge.',
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
      name: 'Request a Service',
      item: 'https://waltburge.com/contact',
    },
  ],
};

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
        <ServiceRequestForm />

        {/* Location info */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="pt-8 border-t border-brand-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest">
              Based in Oxford, Mississippi
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-brand-secondary uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Serving Nationwide
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
