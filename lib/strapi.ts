// Strapi API client
// TODO: Connect to actual Strapi instance once deployed

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  };

  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
}

// Blog Posts
export async function getBlogPosts(page = 1, limit = 10) {
  try {
    const data = await fetchAPI(
      `/api/blog-posts?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    return data;
  } catch (error) {
    // Return mock data if Strapi not available
    return {
      data: [
        {
          id: 1,
          attributes: {
            title: 'How to Pass ACCA F1: Complete Study Guide',
            slug: 'how-to-pass-acca-f1',
            excerpt: 'Everything you need to know to ace your ACCA F1 exam',
            content: 'Detailed study guide content here...',
            publishedAt: new Date().toISOString(),
          },
        },
        {
          id: 2,
          attributes: {
            title: 'ACCA Exam Tips: Time Management Strategies',
            slug: 'acca-exam-time-management',
            excerpt: 'Master time management for your ACCA exams',
            content: 'Time management tips here...',
            publishedAt: new Date().toISOString(),
          },
        },
      ],
      meta: { pagination: { page: 1, pageSize: 10, total: 2 } },
    };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await fetchAPI(
      `/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    return data.data[0];
  } catch (error) {
    return null;
  }
}

export async function getRelatedPosts(currentSlug: string, limit = 3) {
  try {
    const data = await fetchAPI(
      `/api/blog-posts?filters[slug][$ne]=${currentSlug}&pagination[limit]=${limit}&populate=*`,
      { next: { revalidate: 3600 } }
    );
    return data.data;
  } catch (error) {
    return [];
  }
}

// Syllabus
export async function getSyllabi() {
  try {
    const data = await fetchAPI('/api/syllabi?populate=*', {
      next: { revalidate: 86400 }, // Revalidate every day
    });
    return data;
  } catch (error) {
    // Return mock ACCA syllabus data
    return {
      data: [
        {
          id: 1,
          attributes: {
            level: 'f1',
            title: 'Accountant in Business (AB/FAB)',
            description:
              'Introduces the role of accounting within business, covering business organization, corporate governance, human resources, and accounting systems.',
            fileKey: 'syllabus/f1-accountant-in-business.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 2,
          attributes: {
            level: 'f2',
            title: 'Management Accounting (MA/FMA)',
            description:
              'Covers the fundamentals of management accounting including costing, budgeting, and performance measurement.',
            fileKey: 'syllabus/f2-management-accounting.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 3,
          attributes: {
            level: 'f3',
            title: 'Financial Accounting (FA/FFA)',
            description:
              'Introduces financial accounting principles, double-entry bookkeeping, and preparation of basic financial statements.',
            fileKey: 'syllabus/f3-financial-accounting.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 4,
          attributes: {
            level: 'f5',
            title: 'Performance Management (PM)',
            description:
              'Advanced management accounting covering performance measurement, budgeting, and strategic performance management.',
            fileKey: 'syllabus/f5-performance-management.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 5,
          attributes: {
            level: 'f7',
            title: 'Financial Reporting (FR)',
            description:
              'Advanced financial accounting and reporting, including consolidated financial statements and analysis.',
            fileKey: 'syllabus/f7-financial-reporting.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 6,
          attributes: {
            level: 'p1',
            title: 'Governance, Risk and Ethics (SBL)',
            description:
              'Strategic level paper covering corporate governance, risk management, and professional ethics.',
            fileKey: 'syllabus/p1-governance-risk-ethics.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
        {
          id: 7,
          attributes: {
            level: 'p7',
            title: 'Advanced Audit and Assurance (AAA)',
            description:
              'Advanced auditing covering complex audits, regulatory environment, and professional responsibilities.',
            fileKey: 'syllabus/p7-advanced-audit-assurance.pdf',
            version: '2024-2025',
            updatedAt: '2024-09-01',
          },
        },
      ],
    };
  }
}

export async function getSyllabusByLevel(level: string) {
  try {
    const data = await fetchAPI(
      `/api/syllabi?filters[level][$eq]=${level}&populate=*`,
      { next: { revalidate: 86400 } }
    );
    return data.data[0];
  } catch (error) {
    const mockData = await getSyllabi();
    return mockData.data.find((s) => s.attributes.level === level);
  }
}

// Timetables
export async function getTimetables(session?: string) {
  try {
    const queryParams = session
      ? `?filters[examSession][$eq]=${session}&populate=*`
      : '?populate=*';
    const data = await fetchAPI(`/api/timetables${queryParams}`, {
      next: { revalidate: 21600 }, // Revalidate every 6 hours
    });
    return data;
  } catch (error) {
    // Return mock timetable data
    return {
      data: [
        {
          id: 1,
          attributes: {
            examSession: 'June 2026',
            registrationDeadline: '2026-04-30',
            subjects: [
              { level: 'F1', examDate: '2026-06-01' },
              { level: 'F2', examDate: '2026-06-03' },
              { level: 'F3', examDate: '2026-06-05' },
              { level: 'F5', examDate: '2026-06-08' },
              { level: 'F7', examDate: '2026-06-10' },
            ],
          },
        },
        {
          id: 2,
          attributes: {
            examSession: 'December 2026',
            registrationDeadline: '2026-10-31',
            subjects: [
              { level: 'F1', examDate: '2026-12-01' },
              { level: 'F2', examDate: '2026-12-03' },
              { level: 'F3', examDate: '2026-12-05' },
              { level: 'P1', examDate: '2026-12-08' },
              { level: 'P7', examDate: '2026-12-10' },
            ],
          },
        },
      ],
    };
  }
}
