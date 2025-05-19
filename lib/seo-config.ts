import { Metadata } from 'next';

type SeoConfig = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    creator?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-image-preview'?: string;
    };
  };
};

type SeoOptions = Partial<SeoConfig>;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const defaultSeoConfig: SeoConfig = {
  title: 'Next.js Starter Template',
  description: 'A beautiful, feature-rich Next.js starter template with Tailwind CSS and shadcn/ui',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Starter Template'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'BASE_URL',
    siteName: 'Next.js Starter Template',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Next.js Featured Starter Template',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@lifeofsoumya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export function getSeoMetadata(options: SeoOptions = {}): Metadata {
  const config = { ...defaultSeoConfig, ...options };
  
  // Deep merge for nested objects like openGraph
  if (options.openGraph) {
    config.openGraph = { ...defaultSeoConfig.openGraph, ...options.openGraph };
  }
  
  if (options.twitter) {
    config.twitter = { ...defaultSeoConfig.twitter, ...options.twitter };
  }
  
  if (options.robots) {
    config.robots = { ...defaultSeoConfig.robots, ...options.robots };
  }

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: config.openGraph,
    twitter: config.twitter,
    metadataBase: new URL(BASE_URL),
  };
}