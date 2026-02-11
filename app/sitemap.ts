import { MetadataRoute } from 'next';
import { getBlogPosts, getSyllabi } from '@/lib/strapi';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/syllabus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/timetables`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  try {
    // Dynamic blog posts
    const blogData = await getBlogPosts(1, 100);
    const blogPages: MetadataRoute.Sitemap = blogData.data.map((post) => ({
      url: `${baseUrl}/blog/${post.attributes.slug}`,
      lastModified: new Date(post.attributes.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic syllabus pages
    const syllabusData = await getSyllabi();
    const syllabusPages: MetadataRoute.Sitemap = syllabusData.data.map(
      (syllabus) => ({
        url: `${baseUrl}/syllabus/${syllabus.attributes.level}`,
        lastModified: new Date(syllabus.attributes.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      })
    );

    return [...staticPages, ...blogPages, ...syllabusPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
