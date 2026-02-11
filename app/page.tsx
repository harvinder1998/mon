import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Your Complete ACCA Study Resource
            </h1>
            <p className="mb-8 text-xl text-primary-100 md:text-2xl">
              Download ACCA syllabus for all levels, access exam timetables, and explore comprehensive study resources to ace your exams.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/syllabus" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                Download Syllabus
              </Link>
              <Link href="/blog" className="btn-secondary bg-primary-700 text-white hover:bg-primary-800">
                Read Study Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-secondary-900">
              Everything You Need to Pass ACCA
            </h2>
            <p className="text-xl text-secondary-600">
              Access comprehensive resources designed to help you succeed
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-secondary-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Complete Syllabus Downloads
              </h3>
              <p className="text-secondary-600">
                Download the latest ACCA syllabus for all levels from F1 to P7. Always up-to-date with official ACCA releases.
              </p>
              <Link href="/syllabus" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
                Browse Syllabus →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-secondary-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Exam Timetables
              </h3>
              <p className="text-secondary-600">
                Stay on track with comprehensive exam timetables, registration deadlines, and important dates for all ACCA exams.
              </p>
              <Link href="/timetables" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
                View Timetables →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-secondary-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-secondary-900">
                Study Guides & Tips
              </h3>
              <p className="text-secondary-600">
                Expert study guides, exam tips, and strategies to help you prepare effectively and pass your ACCA exams.
              </p>
              <Link href="/blog" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
                Read Blog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACCA Levels Overview */}
      <section className="bg-secondary-50 py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-secondary-900">
              ACCA Qualification Structure
            </h2>
            <p className="text-xl text-secondary-600">
              Download syllabus for any ACCA exam level
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Applied Knowledge */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-secondary-900">
                Applied Knowledge (F1-F3)
              </h3>
              <p className="mb-4 text-secondary-600">
                Foundation level exams covering business principles, management accounting, and financial accounting.
              </p>
              <ul className="space-y-2 text-secondary-700">
                <li>• F1 - Accountant in Business</li>
                <li>• F2 - Management Accounting</li>
                <li>• F3 - Financial Accounting</li>
              </ul>
            </div>

            {/* Applied Skills */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-secondary-900">
                Applied Skills (F4-F9)
              </h3>
              <p className="mb-4 text-secondary-600">
                Skill level exams covering corporate law, performance management, taxation, and more.
              </p>
              <ul className="space-y-2 text-secondary-700">
                <li>• F4 - Corporate and Business Law</li>
                <li>• F5 - Performance Management</li>
                <li>• F6 - Taxation</li>
                <li>• F7 - Financial Reporting</li>
                <li>• F8 - Audit and Assurance</li>
                <li>• F9 - Financial Management</li>
              </ul>
            </div>

            {/* Strategic Professional */}
            <div className="col-span-full rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-secondary-900">
                Strategic Professional (P1-P7)
              </h3>
              <p className="mb-4 text-secondary-600">
                Professional level exams for strategic business leadership and advanced technical skills.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <ul className="space-y-2 text-secondary-700">
                  <li>• P1 - Governance, Risk and Ethics</li>
                  <li>• P2 - Corporate Reporting</li>
                  <li>• P3 - Business Analysis</li>
                </ul>
                <ul className="space-y-2 text-secondary-700">
                  <li>• P4 - Advanced Financial Management</li>
                  <li>• P5 - Advanced Performance Management</li>
                  <li>• P6 - Advanced Taxation</li>
                  <li>• P7 - Advanced Audit and Assurance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/syllabus" className="btn-primary">
              Download All Syllabus
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Start Your ACCA Journey Today
          </h2>
          <p className="mb-8 text-xl text-primary-100">
            Join thousands of students who trust us for their ACCA preparation
          </p>
          <Link href="/syllabus" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
