# ACCA Study Hub

Your complete source for ACCA syllabus downloads, exam timetables, and comprehensive study resources.

## Features

- 📚 **Complete ACCA Syllabus Downloads** - Download syllabus for all ACCA levels (F1-P7)
- 📅 **Exam Timetables** - Stay updated with exam dates and registration deadlines
- ✍️ **Study Guides & Blog** - Expert tips and strategies to pass your exams
- 🔒 **Smart Lead Capture** - Gated downloads with one-time lead form (GDPR compliant)
- 🚀 **SEO Optimized** - Built for maximum visibility and fast performance
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Strapi (self-hosted)
- **Database**: PostgreSQL
- **File Storage**: Cloudflare R2
- **Email**: Mailchimp/ConvertKit integration
- **Hosting**: Vercel (frontend) + Railway (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (for Strapi)
- Cloudflare R2 account (for file storage)
- Mailchimp or ConvertKit account (for email marketing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mon
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ACCA Study Hub
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# ... add other variables
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/mon
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── syllabus/           # Syllabus pages
│   ├── blog/               # Blog pages
│   ├── timetables/         # Timetables page
│   └── api/                # API routes
├── components/             # React components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── ui/                 # UI components (Button, Modal, etc.)
│   ├── lead-form/          # Lead capture components
│   └── seo/                # SEO components
├── config/                 # Configuration files
│   ├── site.ts             # Site configuration
│   └── seo.ts              # SEO configuration
├── lib/                    # Utility functions
│   ├── strapi.ts           # Strapi API client
│   ├── r2.ts               # Cloudflare R2 client
│   ├── email.ts            # Email integration
│   └── tracking.ts         # Lead tracking
├── types/                  # TypeScript type definitions
└── cms/                    # Strapi CMS (separate deployment)
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway)

1. Create a new project on Railway
2. Add PostgreSQL database
3. Deploy Strapi from `/cms` directory
4. Configure environment variables

## Environment Variables

See `.env.example` for all required environment variables.

## Development Roadmap

- [x] Phase 1: Next.js foundation setup
- [ ] Phase 2: Strapi CMS setup
- [ ] Phase 3: Smart lead capture system
- [ ] Phase 4: File storage & downloads
- [ ] Phase 5: Syllabus pages
- [ ] Phase 6: Blog system
- [ ] Phase 7: Timetables & additional pages
- [ ] Phase 8: SEO optimization
- [ ] Phase 9: UI/UX polish
- [ ] Phase 10: Testing & deployment

## License

© 2026 ACCA Study Hub. All rights reserved.

## Support

For issues and questions, please open an issue on GitHub.
