import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | Build Log',
  description:
    'Notes on building software, training AI models, and construction technology.',
  alternates: {
    canonical: 'https://waltburge.com/blog',
  },
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
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
      name: 'Blog',
      item: 'https://waltburge.com/blog',
    },
  ],
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);

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
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Home
        </Link>
      </nav>

      <main className="min-h-screen bg-brand-base py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <div className="space-y-5">
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
                Writing
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
                From the{' '}
                <span className="text-brand-secondary opacity-60">
                  Build Log
                </span>
              </h1>
              <div className="h-1 w-24 bg-brand-accent rounded-full" />
              <p className="text-brand-secondary text-lg max-w-lg leading-relaxed">
                Notes on building products, training models, and figuring out
                software engineering from scratch.
              </p>
            </div>
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.id}`} className="block group mb-12 md:mb-16">
              <article className="p-10 md:p-16 rounded-3xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/30 transition-all">
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs uppercase tracking-wider text-brand-accent font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                  {featured.featured && (
                    <span className="px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs uppercase tracking-wider text-brand-purple font-mono">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight mb-6 group-hover:text-brand-accent transition-colors leading-tight max-w-4xl">
                  {featured.title}
                </h2>

                <p className="text-brand-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-brand-border/30">
                  <div className="flex items-center gap-6 text-sm text-brand-secondary font-mono">
                    <span>{formatDate(featured.date)}</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
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
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                <article className="p-8 md:p-10 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/30 transition-all flex flex-col justify-between min-h-[280px] h-full">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-brand-base border border-brand-border text-[11px] uppercase tracking-wider text-brand-secondary font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-brand-border/50">
                    <div className="flex items-center gap-4 text-xs text-brand-secondary font-mono">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span className="flex items-center gap-2 text-xs text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Read
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
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
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
