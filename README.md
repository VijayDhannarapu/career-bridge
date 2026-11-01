# Career-Bridge

Career-Bridge is a full-stack job portal built with Next.js, Prisma, PostgreSQL, Clerk authentication, and Cloudinary. It connects job seekers and recruiters in a single platform where users can create professional profiles, upload resumes, browse jobs, and apply, while recruiters can post jobs, manage visibility, and track applicant status.

This project is designed as a modern hiring platform with role-based experiences for:
- Job seekers
- Recruiters
- Admin-like workflow automation via Clerk and server actions

## Features

### For Job Seekers
- User onboarding with profile creation
- Resume upload in PDF format
- Skills, education, branch, and graduation details
- Job browsing and listing with search support
- Job details view
- Apply for jobs
- View applied jobs
- Withdraw pending applications

### For Recruiters
- Recruiter onboarding and company profile creation
- Company logo upload
- Post jobs with role/location/category details
- Manage job visibility (active/inactive)
- Review applications
- Update candidate application statuses
- Filter applications by category and location

### Platform Infrastructure
- Clerk authentication and role-based access
- PostgreSQL database with Prisma ORM
- Cloudinary storage for resumes and recruiter logos
- Server-side actions for secure business logic
- Webhooks for Clerk user creation events

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS
- Authentication: Clerk
- Database: PostgreSQL (Neon)
- ORM: Prisma
- Media Storage: Cloudinary
- API/Webhooks: Next.js App Router
- Local Webhook Testing: ngrok
- Deployment: Vercel-ready

## Project Structure

```bash
career-bridge/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── clerk/
│   │   ├── components/
│   │   ├── recruiter/
│   │   ├── user/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── cloudinary.ts
│   │   └── prisma.ts
│   ├── generated/
│   └── proxy.ts
├── types/
│   └── globals.d.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma7.config.ts
├── README.md
├── tsconfig.json
└── package-lock.json
```

## Core Workflow

### Candidate Journey
1. Sign up via Clerk
2. Complete user profile
3. Upload resume
4. Browse available jobs
5. Open job details
6. Apply for a role
7. Monitor applied jobs

### Recruiter Journey
1. Sign up and choose recruiter role
2. Complete company profile
3. Upload company logo
4. Add new job openings
5. Review applications
6. Update applicant stages
7. Manage job visibility and hiring pipeline

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm or pnpm
- PostgreSQL database (Neon recommended)
- Clerk account
- Cloudinary account
- ngrok account (for local webhook testing)

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```bash
# PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/career_bridge"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_WEBHOOK_SIGNING_SECRET="your_clerk_webhook_signing_secret"

# Optional but commonly used for Clerk routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## Installation

```bash
git clone https://github.com/VijayDhannarapu/career-bridge.git
cd career-bridge
npm install
```

## Database Setup

This project uses Prisma with PostgreSQL.

```bash
npx prisma generate
npx prisma db push
```

If you want to inspect the database schema:

```bash
npx prisma studio
```

## Run Locally

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Clerk Webhook Setup

The project includes a Clerk webhook route at:

```bash
src/app/api/webhooks/clerk/route.ts
```

This route listens for `user.created` events, verifies incoming webhook signatures, and automatically creates the corresponding record in the Prisma database for either:
- a normal user
- a recruiter

For recruiter accounts, the recruiter role is also synchronized to Clerk public metadata.

Make sure your Clerk webhook endpoint is configured in the Clerk dashboard to point to:

```bash
https://your-domain.com/api/webhooks/clerk
```

## Local Webhook Testing with ngrok

During local development, ngrok exposes the local Next.js server to the internet so Clerk can send webhook events to your local application.

1. Start the Next.js development server:

```bash
npm run dev
```

2. Open another terminal and start ngrok:

```bash
ngrok http 3000
```

3. Copy the HTTPS forwarding URL generated by ngrok.

4. Configure your Clerk webhook endpoint using:

```bash
https://your-ngrok-domain.ngrok-free.dev/api/webhooks/clerk
```

5. Copy the signing secret from your Clerk webhook endpoint and add it to `.env.local`.

**Note:** The ngrok URL may change when the tunnel restarts. Update the Clerk webhook endpoint whenever the URL changes.

ngrok is used only for local webhook testing. In production, Clerk should send webhook events directly to your deployed application's HTTPS endpoint.

## Prisma Schema Highlights

The project includes these key Prisma models:

- `User`
- `Recruiter`
- `PostJob`
- `Application`

These are defined in:

```bash
prisma/schema.prisma
```

Key relationships:
- User can apply to many jobs
- Recruiter can post many jobs
- Each application connects a user to a job posting and tracks status

## Important Notes

- Resume uploads are stored in Cloudinary as PDF files.
- Recruiter logos are stored in Cloudinary.
- Clerk public metadata is used to differentiate recruiter role from regular user role.
- Clerk webhooks synchronize newly registered accounts with the database.
- ngrok is used to expose the local development server for Clerk webhook testing.
- The app is structured as a multi-role portal and is ready for expansion with analytics, AI matching, interview workflow, and notifications.

## Future Enhancements

This project is a strong base for adding:
- AI job matching
- recruiter analytics dashboard
- saved searches and notifications
- interview scheduling
- advanced resume parsing
- employer brand pages
- admin moderation and reporting

## License

This project is currently unlicensed unless specified otherwise.

## Author

Vijay Dhannarapu

## Repository

https://github.com/VijayDhannarapu/career-bridge
