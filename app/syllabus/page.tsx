import { Metadata } from 'next';
import Link from 'next/link';
import { getSyllabi } from '@/lib/strapi';
import SyllabusCard from '@/components/syllabus/SyllabusCard';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'ACCA Syllabus Downloads | All Levels F1-P7',
  description:
    'Download complete ACCA syllabus for all levels. Get the latest syllabus for Applied Knowledge (F1-F3), Applied Skills (F4-F9), and Strategic Professional (P1-P7) exams.',
  path: '/syllabus',
});

export const revalidate = 86400; // Revalidate every 24 hours

export default async function SyllabusPage() {
  const syllabusData = await getSyllabi();
  const syllabi = syllabusData.data;

  // Group syllabi by category
  const appliedKnowledge = syllabi.filter((s) =>
    ['f1', 'f2', 'f3'].includes(s.attributes.level)
  );
  const appliedSkills = syllabi.filter((s) =>
    ['f4', 'f5', 'f6', 'f7', 'f8', 'f9'].includes(s.attributes.level)
  );
  const strategicProfessional = syllabi.filter((s) =>
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].includes(s.attributes.level)
  );

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
            <span>Syllabus</span>
          </nav>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            ACCA Syllabus Downloads
          </h1>
          <p className="text-xl text-primary-100">
            Download the complete syllabus for all ACCA qualification levels.
            Always up-to-date with official ACCA releases.
          </p>
        </div>
      </section>

      {/* Applied Knowledge Section */}
      <section className="py-16" id="applied-knowledge">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold text-secondary-900">
              Applied Knowledge (F1-F3)
            </h2>
            <p className="text-lg text-secondary-600">
              Foundation level exams covering business principles, management
              accounting, and financial accounting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appliedKnowledge.map((syllabus) => (
              <SyllabusCard key={syllabus.id} syllabus={syllabus} />
            ))}
          </div>
        </div>
      </section>

      {/* Applied Skills Section */}
      <section className="bg-secondary-50 py-16" id="applied-skills">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold text-secondary-900">
              Applied Skills (F4-F9)
            </h2>
            <p className="text-lg text-secondary-600">
              Skill level exams covering corporate law, performance management,
              taxation, financial reporting, and audit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appliedSkills.map((syllabus) => (
              <SyllabusCard key={syllabus.id} syllabus={syllabus} />
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Professional Section */}
      <section className="py-16" id="strategic-professional">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold text-secondary-900">
              Strategic Professional (P1-P7)
            </h2>
            <p className="text-lg text-secondary-600">
              Professional level exams for strategic business leadership and
              advanced technical skills.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strategicProfessional.map((syllabus) => (
              <SyllabusCard key={syllabus.id} syllabus={syllabus} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-primary-50 py-12">
        <div className="container-custom">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-secondary-900">
              About ACCA Syllabus
            </h3>
            <div className="space-y-4 text-secondary-700">
              <p>
                The ACCA (Association of Chartered Certified Accountants)
                syllabus is updated regularly to ensure relevance with current
                business practices and accounting standards.
              </p>
              <p>
                Each syllabus document outlines the exam structure, learning
                outcomes, and recommended study resources. We provide the latest
                official syllabus documents for all ACCA qualification levels.
              </p>
              <p className="font-semibold text-primary-700">
                All syllabus documents are free to download. Simply click the
                download button to get started with your ACCA preparation!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
