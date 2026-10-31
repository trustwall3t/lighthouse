# Database setup

Use Supabase (or any PostgreSQL) with Prisma. Set `DATABASE_URL` (pooler) and `DIRECT_URL` (direct) in `.env`.

## Apply schema

```bash
ALLOW_DB_PUSH=1 npm run db:push
```

## Seed data

```bash
npm run db:seed              # site settings, copy-trading catalog
npm run db:seed-admin        # admin user (see prisma/seed-admin.ts)
npm run db:seed-marketing-plans
```

## Cron / ROI

Daily on Vercel (`vercel.json`). Local test: `curl http://localhost:3000/api/cron/run-all` (dev may allow without `CRON_SECRET`).
