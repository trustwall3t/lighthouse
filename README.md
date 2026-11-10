# Pinnacle Wealth FX (parkins-trader)

Next.js app: marketing site, client dashboard (`/dashboard`), admin (`/admin`), auth (`/auth`). PostgreSQL via Prisma (Supabase).

## Getting started

```bash
npm install
npm run dev
``` 

Open [http://localhost:3000](http://localhost:3000).

## Database

See [docs/DATABASE_SETUP.md](docs/DATABASE_SETUP.md).

```bash
ALLOW_DB_PUSH=1 npm run db:push
npm run db:seed
npm run db:seed-admin
npm run db:seed-marketing-plans
```

## Marketing HTML (optional)

When updating pages from the legacy Berk Forte Laravel export:

```bash
npm run build:berkforte-marketing   # requires BERKFORTE_ROOT
npm run sync:berkforte-public
```

## Vercel Hobby (12 serverless functions)

This app is structured to stay under Vercel’s **12 function** limit:

- One **`/api/[[...path]]`** handler (session, upload, cron, etc.)
- One **`/dashboard/[[...segments]]`** router for all member pages
- One **`/admin/dashboard/[[...segments]]`** router for admin pages
- Marketing routes are **static/SSG** (no per-page lambdas)

If you add new API routes or `page.tsx` files under `dashboard/`, use the existing catch-all routers instead.

## Netlify deploy

- Install the [Next.js plugin](https://docs.netlify.com/integrations/frameworks/next-js/) (`@netlify/plugin-nextjs`); `netlify.toml` is included.
- Do **not** mark `NEXT_PUBLIC_APP_URL` or `EMAIL_SITE_NAME` as **secret** env vars (they are public site config). Prefer Netlify’s automatic `URL` for the app origin and set the display name in **Admin → Site settings** (or the default in code).
- If secrets scanning still flags them, `netlify.toml` sets `SECRETS_SCAN_OMIT_KEYS` for those keys.

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` / `dev:turbo` | Development server |
| `build` / `start` | Production |
| `db:push` | Push Prisma schema (requires `ALLOW_DB_PUSH=1`) |
| `db:seed*` | Seed site, admin, investment plans |
| `db:up` / `db:down` | Local Docker Postgres |
