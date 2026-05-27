import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://waltburge.com'),
  title: {
    template: '%s | Walt Burge',
    default: 'Walt Burge | AI Engineer & Custom Software Developer',
  },
  description:
    'Custom AI models, fine-tuned LLMs, and production-grade software for businesses that need real engineering. Construction technology, intelligent automation, and full-stack development by Walt Burge in Oxford, MS.',
  keywords: [
    'Walt Burge',
    'custom AI model',
    'hire AI engineer',
    'custom LLM',
    'full-stack developer for hire',
    'construction technology developer',
    'AI automation',
    'custom software consultant',
    'custom software development',
    'AI solutions',
    'Oxford Mississippi',
    'construction technology',
    'machine learning development',
    'fractional CTO',
    'James Walton',
  ],
  openGraph: {
    type: 'website',
    url: 'https://waltburge.com',
    title: 'Walt Burge | AI Engineer & Custom Software Developer',
    description:
      'Custom AI models, fine-tuned LLMs, and production-grade software for businesses that need real engineering. Construction technology, intelligent automation, and full-stack development.',
    siteName: 'Walt Burge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Walt Burge',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walt Burge | AI Engineer & Custom Software Developer',
    description:
      'Custom AI models, fine-tuned LLMs, and production-grade software. Construction technology, intelligent automation, and full-stack development.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Walt Burge',
  url: 'https://waltburge.com',
  email: 'jamesburge.mcm@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Oxford',
    addressRegion: 'MS',
    postalCode: '38655',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.3665,
    longitude: -89.5193,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Oxford',
      containedInPlace: { '@type': 'State', name: 'Mississippi' },
    },
    { '@type': 'State', name: 'Mississippi' },
  ],
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
    'Custom AI Model Training',
    'LLM Fine-Tuning',
    'Machine Learning',
    'Intelligent Automation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent transition-colors duration-300 font-sans">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
