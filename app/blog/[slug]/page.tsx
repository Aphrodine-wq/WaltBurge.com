import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '@/lib/blog-data';
import { BlogPostClient } from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.id === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://waltburge.com/blog/${post.id}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://waltburge.com/blog/${post.id}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'James Walton',
      alternateName: 'Walt Burge',
      url: 'https://waltburge.com/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Walt Burge',
      url: 'https://waltburge.com',
    },
    url: `https://waltburge.com/blog/${post.id}`,
    mainEntityOfPage: `https://waltburge.com/blog/${post.id}`,
    keywords: post.tags.join(', '),
    wordCount: post.content ? post.content.split(/\s+/).length : undefined,
    articleSection: post.tags[0],
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://waltburge.com/blog/${post.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient post={post} />

      <section className="max-w-3xl mx-auto px-5 md:px-6 py-12 border-t border-brand-border/30">
        <div className="p-8 rounded-2xl border border-brand-accent/20 bg-brand-surface/50 text-center">
          <h3 className="text-xl font-bold text-brand-primary mb-2">Free AI Readiness Checklist</h3>
          <p className="text-brand-secondary text-sm mb-4">15 questions to find out if AI can save your business time and money.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-full text-sm hover:bg-brand-accent/90 transition-colors">
            Get It Free
          </a>
        </div>
      </section>
    </>
  );
}
