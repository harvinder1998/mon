import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSyllabusByLevel, getSyllabi } from '@/lib/strapi';
import DownloadButton from '@/components/syllabus/DownloadButton';
import { generatePageMetadata } from '@/config/seo';

interface PageProps {
  params: Promise<{ level: string }>;
}

export async function generateStaticParams() {
  const syllabusData = await getSyllabi();
  return syllabusData.data.map((syllabus) => ({
    level: syllabus.attributes.level,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params;
  const syllabus = await getSyllabusByLevel(level);

  if (!syllabus) {
    return {};
  }

  const { title, description } = syllabus.attributes;

  return generatePageMetadata({
    title: `${title} - ACCA ${level.toUpperCase()} Syllabus`,
    description: description || `Download the complete syllabus for ACCA ${level.toUpperCase()} - ${title}`,
    path: `/syllabus/${level}`,
  });
}

export const revalidate = 86400; // Revalidate every 24 hours

export default async function SyllabusDetailPage({ params }: PageProps) {
  const { level } = await params;
  const syllabus = await getSyllabusByLevel(level);

  if (!syllabus) {
    notFound();
  }

  const { title, description, version, updatedAt } = syllabus.attributes;

  // Get related syllabi (same level category)
  const allSyllabi = await getSyllabi();
  const levelNumber = parseInt(level.substring(1));
  const relatedSyllabi = allSyllabi.data
    .filter((s) => {
      const relatedLevel = s.attributes.level;
      const relatedNumber = parseInt(relatedLevel.substring(1));
      return relatedLevel !== level && Math.abs(relatedNumber - levelNumber) <= 2;
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
        <div className="container-custom">
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-primary-200 hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/syllabus" className="text-primary-200 hover:text-white">
              Syllabus
            </Link>
            <span className="mx-2">/</span>
            <span className="uppercase">{level}</span>
          </nav>

          <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase">
            {level}
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mb-6 text-xl text-primary-100">{description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <DownloadButton level={level} title={title} size="lg" />
            <Link
              href="/timetables"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-medium text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              View Exam Timetable
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-secondary-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-secondary-900">
                  About This Exam
                </h2>

                <div className="prose prose-secondary max-w-none">
                  <p className="text-lg">{description}</p>

                  <h3>What You'll Learn</h3>
                  <p>
                    This syllabus covers the key topics and learning outcomes
                    required to pass the {title} exam. The document includes:
                  </p>
                  <ul>
                    <li>Detailed exam structure and format</li>
                    <li>Learning outcomes and competencies</li>
                    <li>Topic areas and coverage</li>
                    <li>Recommended study approach</li>
                    <li>Assessment criteria and grading</li>
                  </ul>

                  <h3>How to Use This Syllabus</h3>
                  <p>
                    Download the syllabus document to understand what topics
                    will be covered in your exam. Use it to create a structured
                    study plan and ensure you cover all required areas.
                  </p>

                  <div className="mt-8 rounded-lg bg-primary-50 p-6">
                    <h4 className="text-lg font-semibold text-primary-900">
                      Ready to Start?
                    </h4>
                    <p className="mb-4 text-primary-800">
                      Download the complete syllabus and begin your preparation
                      today.
                    </p>
                    <DownloadButton
                      level={level}
                      title="Syllabus PDF"
                      variant="primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Syllabus Info Card */}
              <div className="rounded-lg border border-secondary-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-secondary-900">
                  Syllabus Information
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-secondary-500">Version</dt>
                    <dd className="text-secondary-900">{version}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-secondary-500">
                      Last Updated
                    </dt>
                    <dd className="text-secondary-900">
                      {new Date(updatedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-secondary-500">Format</dt>
                    <dd className="text-secondary-900">PDF</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-secondary-500">Cost</dt>
                    <dd className="font-semibold text-green-600">Free</dd>
                  </div>
                </dl>
              </div>

              {/* Related Syllabi */}
              {relatedSyllabi.length > 0 && (
                <div className="rounded-lg border border-secondary-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-secondary-900">
                    Related Syllabi
                  </h3>
                  <ul className="space-y-3">
                    {relatedSyllabi.map((related) => (
                      <li key={related.id}>
                        <Link
                          href={`/syllabus/${related.attributes.level}`}
                          className="group block"
                        >
                          <div className="mb-1 text-sm font-semibold uppercase text-primary-600 group-hover:text-primary-700">
                            {related.attributes.level}
                          </div>
                          <div className="text-sm text-secondary-700 group-hover:text-secondary-900">
                            {related.attributes.title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Card */}
              <div className="rounded-lg bg-primary-600 p-6 text-white shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">Need Study Tips?</h3>
                <p className="mb-4 text-sm text-primary-100">
                  Check out our blog for expert study guides and exam
                  preparation tips.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-semibold text-white hover:text-primary-100"
                >
                  Read Blog Posts →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
