import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/config/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us | Your ACCA Study Resource Hub',
  description:
    'Learn more about our mission to help ACCA students succeed with comprehensive study resources, syllabus downloads, and exam preparation guides.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="text-xl text-primary-100">
            Your trusted partner for ACCA exam preparation and success.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-secondary-900">
              Our Mission
            </h2>
            <div className="prose prose-lg prose-secondary max-w-none">
              <p>
                At {siteConfig.name}, we're dedicated to helping aspiring
                accountants succeed in their ACCA journey. We believe that
                access to quality study resources shouldn't be a barrier to
                achieving your professional goals.
              </p>
              <p>
                Our mission is to provide the most comprehensive, up-to-date, and
                accessible ACCA study resources on the web. From complete
                syllabus downloads to expert study guides and exam tips, we're
                here to support you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-secondary-50 py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary-900">
              What We Offer
            </h2>
            <p className="text-lg text-secondary-600">
              Everything you need to pass your ACCA exams
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Complete Syllabus Library
              </h3>
              <p className="text-secondary-600">
                Download the latest ACCA syllabus for all levels from F1 to P7.
                Always up-to-date with official ACCA releases.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Expert Study Guides
              </h3>
              <p className="text-secondary-600">
                Comprehensive study guides and exam tips written by experienced
                ACCA professionals and tutors.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Exam Timetables
              </h3>
              <p className="text-secondary-600">
                Stay on track with comprehensive exam timetables and registration
                deadlines for all ACCA exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-secondary-900">
              Why Choose Us?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="mb-1 font-semibold text-secondary-900">
                    Always Up-to-Date
                  </h3>
                  <p className="text-secondary-600">
                    We regularly update our resources to reflect the latest ACCA
                    syllabus changes and exam formats.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="mb-1 font-semibold text-secondary-900">
                    100% Free Resources
                  </h3>
                  <p className="text-secondary-600">
                    All syllabus downloads and study resources are completely
                    free. No hidden costs or subscriptions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3 className="mb-1 font-semibold text-secondary-900">
                    Trusted by Thousands
                  </h3>
                  <p className="text-secondary-600">
                    Join thousands of students who trust us for their ACCA
                    preparation and have successfully passed their exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Start Your ACCA Journey?
          </h2>
          <p className="mb-8 text-xl text-primary-100">
            Download the syllabus and begin your preparation today
          </p>
          <Link
            href="/syllabus"
            className="btn-primary bg-white text-primary-700 hover:bg-primary-50"
          >
            Browse Syllabus
          </Link>
        </div>
      </section>
    </div>
  );
}
