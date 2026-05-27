'use client';

import { useRouter } from 'next/navigation';
import { BlogPostDetail } from '@/components/BlogPostDetail';
import { BlogPost } from '@/types';

export function BlogPostClient({ post }: { post: BlogPost }) {
  const router = useRouter();
  return <BlogPostDetail post={post} onBack={() => router.push('/blog')} />;
}
