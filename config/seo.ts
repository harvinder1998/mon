import { Metadata } from 'next';
import { siteConfig } from './site';

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Complete ACCA Syllabus, Timetables & Study Resources`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ACCA syllabus',
    'ACCA syllabus download',
    'ACCA exam timetable',
    'ACCA study resources',
    'ACCA F1 syllabus',
    'ACCA P7 syllabus',
    'ACCA exam dates',
    'ACCA study guide',
    'ACCA exam preparation',
    'ACCA career',
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@accahub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generatePageMetadata({
  title,
  description,
  image,
  path = '',
}: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url: `${siteConfig.url}${path}`,
      images: image ? [image] : [siteConfig.ogImage],
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: image ? [image] : [siteConfig.ogImage],
    },
  };
}
