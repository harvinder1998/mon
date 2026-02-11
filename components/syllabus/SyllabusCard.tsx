import Link from 'next/link';
import DownloadButton from './DownloadButton';
import type { Syllabus } from '@/types/syllabus';

interface SyllabusCardProps {
  syllabus: Syllabus;
}

export default function SyllabusCard({ syllabus }: SyllabusCardProps) {
  const { level, title, description, version, updatedAt } = syllabus.attributes;

  return (
    <div className="group rounded-lg border border-secondary-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Level Badge */}
      <div className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold uppercase text-primary-700">
        {level}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-secondary-900 group-hover:text-primary-600">
        <Link href={`/syllabus/${level}`}>{title}</Link>
      </h3>

      {/* Description */}
      <p className="mb-4 text-secondary-600 line-clamp-3">{description}</p>

      {/* Meta Info */}
      <div className="mb-4 flex items-center gap-4 text-sm text-secondary-500">
        <span className="flex items-center">
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Version: {version}
        </span>
        <span className="flex items-center">
          <svg
            className="mr-1 h-4 w-4"
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
          Updated: {new Date(updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <DownloadButton
          level={level}
          title={title}
          variant="primary"
          size="sm"
        />
        <Link
          href={`/syllabus/${level}`}
          className="inline-flex items-center justify-center rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-medium text-primary-600 transition-all hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
