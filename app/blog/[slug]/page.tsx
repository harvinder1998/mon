import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/strapi';
import { generatePageMetadata } from '@/config/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogData = await getBlogPosts(1, 100);
  return blogData.data.map((post) => ({
    slug: post.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const { title, excerpt } = post.attributes;

  return generatePageMetadata({
    title: `${title} | ACCA Study Blog`,
    description: excerpt || title,
    path: `/blog/${slug}`,
  });
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, content, publishedAt, excerpt } = post.attributes;
  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary-50 py-16">
        <div className="container-custom">
          <nav className="mb-6 text-sm text-secondary-600">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-600">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </nav>

          <div className="mx-auto max-w-4xl">
            <div className="mb-4 text-sm text-secondary-500">
              {new Date(publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-secondary-900 md:text-5xl">
              {title}
            </h1>
            {excerpt && (
              <p className="text-xl text-secondary-600">{excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-lg prose-secondary max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>

            {/* CTA Section */}
            <div className="mt-12 rounded-lg bg-primary-50 p-8">
              <h3 className="mb-4 text-2xl font-semibold text-primary-900">
                Ready to Download the Syllabus?
              </h3>
              <p className="mb-6 text-primary-800">
                Get the complete ACCA syllabus and start your preparation today.
              </p>
              <Link href="/syllabus" className="btn-primary">
                Browse Syllabus
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="mb-8 text-2xl font-semibold text-secondary-900">
                  Related Articles
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.attributes.slug}`}
                      className="group rounded-lg border border-secondary-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <h4 className="mb-2 font-semibold text-secondary-900 group-hover:text-primary-600">
                        {related.attributes.title}
                      </h4>
                      <p className="text-sm text-secondary-600 line-clamp-2">
                        {related.attributes.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
