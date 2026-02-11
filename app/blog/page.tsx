import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/strapi';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'ACCA Study Guides & Exam Tips | Blog',
  description:
    'Expert ACCA study guides, exam tips, and preparation strategies. Learn how to pass your ACCA exams with our comprehensive blog articles.',
  path: '/blog',
});

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const blogData = await getBlogPosts(1, 12);
  const posts = blogData.data;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            ACCA Study Blog
          </h1>
          <p className="text-xl text-primary-100">
            Expert study guides, exam tips, and strategies to help you pass your
            ACCA exams.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-lg border border-secondary-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <Link href={`/blog/${post.attributes.slug}`}>
                  <div className="p-6">
                    <div className="mb-3 text-sm text-secondary-500">
                      {new Date(post.attributes.publishedAt).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </div>
                    <h2 className="mb-3 text-xl font-semibold text-secondary-900 group-hover:text-primary-600">
                      {post.attributes.title}
                    </h2>
                    <p className="mb-4 text-secondary-600 line-clamp-3">
                      {post.attributes.excerpt}
                    </p>
                    <span className="inline-flex items-center text-primary-600 group-hover:text-primary-700">
                      Read More
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="rounded-lg bg-secondary-50 p-12 text-center">
              <h3 className="mb-2 text-xl font-semibold text-secondary-900">
                Coming Soon!
              </h3>
              <p className="text-secondary-600">
                We're working on creating comprehensive study guides and exam tips
                for you.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
