This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Onboarding answer storage

Onboarding answers are saved for the signed-in Clerk user in Supabase.

1. Run `supabase/migrations/20261125130000_create_onboarding_responses.sql` in the Supabase SQL Editor.
2. Add these server-only values to `.env.local`:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=your-secret-key
   ```

3. Restart the Next.js development server.

Keep `SUPABASE_SECRET_KEY` private and do not prefix it with `NEXT_PUBLIC_`. The API checks the signed-in Clerk user and uses that user ID as the row key; browser clients do not get direct table access.

## Mock exam database

Mock exam data and signed-in users' attempts are managed by Drizzle ORM through Supabase PostgreSQL.

1. Run `supabase/migrations/20261126213000_create_mock_exam_tables.sql` in the Supabase SQL Editor.
2. Add the PostgreSQL connection string from the Supabase project's **Connect → Shared Pooler** panel to `.env.local`:

   ```env
   DATABASE_URL=postgresql://...
   ```

3. Keep `DATABASE_URL` server-only. Do not add a `NEXT_PUBLIC_` prefix. Restart the Next.js server.

The exam grading API requires a signed-in Clerk user and saves the attempt, selected answers, and result in one database transaction. The initial 2011 science paper index and answer key are synchronized on the first submitted attempt.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
