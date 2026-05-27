import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About James Walton | Walt Burge | Oxford, MS',
  description:
    'Full-stack developer and AI engineer in Oxford, Mississippi. Building construction technology, custom software, and intelligent automation.',
  alternates: {
    canonical: 'https://waltburge.com/about',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'James Walton',
  alternateName: 'Walt Burge',
  jobTitle: 'Full-Stack Developer & AI Engineer',
  url: 'https://waltburge.com/about',
  email: 'jamesburge.mcm@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Oxford',
    addressRegion: 'MS',
    postalCode: '38655',
    addressCountry: 'US',
  },
  sameAs: [
    'https://github.com/Aphrodine-wq',
    'https://www.facebook.com/walt.burge.1/',
    'https://www.instagram.com/walt.burge',
  ],
  knowsAbout: [
    'Custom Software Development',
    'AI Solutions',
    'Construction Technology',
    'Web Design',
    'Machine Learning',
    'Full-Stack Development',
  ],
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
      name: 'About',
      item: 'https://waltburge.com/about',
    },
  ],
};

const stats = [
  { value: '7mo', label: 'Self-Taught' },
  { value: '12+', label: 'Projects Shipped' },
  { value: '18K+', label: 'AI Training Examples' },
  { value: '1', label: 'Custom LLM Trained' },
];

const clients = [
  'MHP Construction',
  'Delta Stump',
  'First Choice Land Dev',
  'Lafayette Insurance',
  'M3A',
  'OM365 Forum',
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
        {/* Hero */}
        <section className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-5 mb-16">
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-px bg-brand-accent" />
                About
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter leading-[0.9]">
                About James Walton
              </h1>
              <p className="text-xl md:text-2xl text-brand-secondary font-light max-w-2xl">
                Full-Stack Developer & AI Engineer | Oxford, Mississippi
              </p>
              <div className="h-1 w-24 bg-brand-accent rounded-full" />
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 lg:gap-20 items-start">
              {/* Stats Column */}
              <div className="md:sticky md:top-32">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 md:p-5 bg-brand-surface rounded-xl border border-brand-primary/5"
                    >
                      <div className="text-2xl md:text-3xl font-black text-brand-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-brand-secondary uppercase tracking-widest font-mono">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Column */}
              <div className="space-y-12">
                {/* Pull quote */}
                <div className="p-6 md:p-10 rounded-2xl border-l-4 border-l-brand-accent bg-brand-surface/30 border border-brand-primary/5">
                  <p className="text-lg md:text-2xl leading-relaxed font-light text-brand-secondary">
                    "I came up on job sites, not in a CS program. I wrote my
                    first line of code about seven months ago. Since then I've
                    shipped a{' '}
                    <span className="text-brand-primary font-medium">
                      contractor marketplace
                    </span>
                    , trained a{' '}
                    <span className="text-brand-primary font-medium">
                      custom AI model
                    </span>{' '}
                    for construction estimation, and built the tools I use to
                    build everything else."
                  </p>
                </div>

                {/* The Construction Edge */}
                <div className="flex gap-4 md:gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm">
                      01
                    </div>
                    <div className="w-px h-full bg-brand-primary/10 my-2" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-brand-primary mb-3">
                      The Construction Edge
                    </h2>
                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                      Years of construction taught me how to scope a job, sequence
                      the work, and finish what I start -- and that a thing is
                      only done when it holds up under load. I build software the
                      same way I built houses: estimate honestly, sequence the
                      work, and ship something real. It's also why my
                      construction-tech actually fits the trade -- I've lived the
                      problems I'm solving.
                    </p>
                  </div>
                </div>

                {/* Self-Taught */}
                <div className="flex gap-4 md:gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-purple font-bold font-mono text-sm">
                      02
                    </div>
                    <div className="w-px h-full bg-brand-primary/10 my-2" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-brand-primary mb-3">
                      Self-Taught, Production-First
                    </h2>
                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                      I didn't learn from a curriculum -- I learned by shipping.
                      My first real project had a real client (
                      <strong className="text-brand-primary">
                        MHP Construction
                      </strong>{' '}
                      in Oxford, MS) using it in production. I'd rather build the
                      hard thing for someone who needs it tomorrow than work
                      through tutorials. That pressure is how I went from zero to
                      a working{' '}
                      <strong className="text-brand-primary">
                        AI estimation platform
                      </strong>{' '}
                      in months.
                    </p>
                  </div>
                </div>

                {/* Own Your Tools */}
                <div className="flex gap-4 md:gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-green-400 font-bold font-mono text-sm">
                      03
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-brand-primary mb-3">
                      Own Your Tools
                    </h2>
                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                      When the tool I needed didn't exist, I built it. Instead of
                      renting an AI API, I trained my own model --{' '}
                      <strong className="text-brand-primary">
                        ConstructionAI
                      </strong>
                      . Instead of wiring up five agent frameworks, I built a
                      language for it --{' '}
                      <strong className="text-brand-primary">Tessera</strong>. I'd
                      rather own the thing I depend on than be locked into someone
                      else's roadmap.
                    </p>
                  </div>
                </div>

                {/* Oxford Roots */}
                <div className="flex gap-4 md:gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-primary/10 flex items-center justify-center text-brand-accent font-bold font-mono text-sm">
                      04
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-brand-primary mb-3">
                      Oxford, Mississippi Roots
                    </h2>
                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed font-light">
                      Based in Oxford, MS -- a small town with outsized ambition.
                      I serve local businesses who need
                      technology that actually works for them, and companies
                      nationwide who need serious engineering done right. Whether
                      it's a contractor down the street or a client across the
                      country, the standard is the same: build it to hold up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working With Me */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-8 block">
              How I Work
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight mb-12">
              Working With Me
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: 'Limited clients, full attention',
                  description: 'I take on 2-3 clients at a time so every project gets my full attention. No juggling dozens of accounts. Your project is never on the back burner.',
                },
                {
                  title: 'Deep-dive before a single line of code',
                  description: 'Every engagement starts with a deep-dive into your business — not a template. I learn your domain, your constraints, and your goals before I architect anything.',
                },
                {
                  title: 'Production systems, not prototypes',
                  description: 'I build software that goes live and stays live. Real deployment, real monitoring, real users. If it is not production-grade, it is not done.',
                },
                {
                  title: 'You work directly with me',
                  description: 'No account managers, no handoffs, no game of telephone. You talk to the person writing the code. Every question gets an honest, technical answer.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 md:p-6 rounded-xl bg-brand-surface border border-brand-primary/5"
                >
                  <h3 className="text-base md:text-lg font-bold text-brand-primary mb-2">{item.title}</h3>
                  <p className="text-brand-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Clients */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-surface border-y border-brand-border/10">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-8 block">
              Our Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight mb-12">
              Companies We've Built For
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {clients.map((client) => (
                <div
                  key={client}
                  className="p-5 md:p-6 rounded-xl bg-brand-base border border-brand-primary/5 text-center"
                >
                  <span className="text-brand-primary font-bold text-sm md:text-base">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
              Let's Work Together
            </h2>
            <p className="text-brand-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you need custom software, an AI solution, or a website
              that actually works -- I'd love to hear about your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-brand-base font-bold py-3.5 px-8 rounded-lg transition-all text-base"
            >
              Get in Touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer line */}
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="pt-8 border-t border-brand-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
              Based in Oxford, Mississippi
            </div>
            <div className="font-mono text-xs text-brand-secondary uppercase tracking-widest">
              Serving Nationwide
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
