import { Metadata } from 'next';
import Link from 'next/link';
import { getTimetables } from '@/lib/strapi';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'ACCA Exam Timetables 2026 | Registration Deadlines',
  description:
    'View ACCA exam timetables for 2026. Find exam dates, registration deadlines, and important dates for all ACCA qualification levels.',
  path: '/timetables',
});

export const revalidate = 21600; // Revalidate every 6 hours

export default async function TimetablesPage() {
  const timetableData = await getTimetables();
  const timetables = timetableData.data;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            ACCA Exam Timetables
          </h1>
          <p className="text-xl text-primary-100">
            Plan your ACCA exam preparation with our comprehensive timetables and
            important dates.
          </p>
        </div>
      </section>

      {/* Timetables Section */}
      <section className="py-16">
        <div className="container-custom">
          {timetables.map((timetable, index) => {
            const { examSession, registrationDeadline, subjects } =
              timetable.attributes;

            return (
              <div
                key={timetable.id}
                className={`mb-12 ${index !== 0 ? 'mt-16' : ''}`}
              >
                <div className="mb-6">
                  <h2 className="mb-2 text-3xl font-bold text-secondary-900">
                    {examSession}
                  </h2>
                  <p className="text-lg text-secondary-600">
                    Registration Deadline:{' '}
                    <span className="font-semibold text-primary-700">
                      {new Date(registrationDeadline).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </p>
                </div>

                <div className="overflow-x-auto rounded-lg border border-secondary-200 shadow-sm">
                  <table className="w-full">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-secondary-700">
                          Exam Level
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-secondary-700">
                          Exam Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase text-secondary-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200 bg-white">
                      {subjects.map((subject, idx) => (
                        <tr
                          key={idx}
                          className="transition-colors hover:bg-secondary-50"
                        >
                          <td className="px-6 py-4">
                            <span className="inline-block rounded bg-primary-100 px-2 py-1 text-sm font-semibold uppercase text-primary-700">
                              {subject.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-secondary-900">
                            {new Date(subject.examDate).toLocaleDateString(
                              'en-GB',
                              {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/syllabus/${subject.level.toLowerCase()}`}
                              className="text-primary-600 hover:text-primary-700 hover:underline"
                            >
                              View Syllabus
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Info Section */}
      <section className="bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-secondary-900">
              Important Information
            </h3>
            <div className="space-y-4 text-secondary-700">
              <p>
                <strong>Registration Deadlines:</strong> Make sure to register
                before the deadline to secure your exam slot. Late registrations
                may incur additional fees.
              </p>
              <p>
                <strong>Exam Dates:</strong> Exam dates are subject to change.
                Always verify with the official ACCA website for the most
                up-to-date information.
              </p>
              <p>
                <strong>Preparation Time:</strong> We recommend starting your
                preparation at least 3-6 months before your exam date.
              </p>
            </div>

            <div className="mt-6">
              <Link href="/syllabus" className="btn-primary">
                Download Syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
