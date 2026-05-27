import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Walt Burge | Custom Software & AI Solutions | Oxford, MS',
  description:
    'Custom software development, AI solutions, and web design for businesses in Oxford, Mississippi. Construction technology, web apps, and AI automation by Walt Burge.',
  alternates: {
    canonical: 'https://waltburge.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
