/**
 * Blocks `prisma db push` unless you explicitly opt in.
 * Prevents accidental schema pushes against the wrong database.
 */
if (process.env.ALLOW_DB_PUSH !== "1" && process.env.ALLOW_ZENITH_DB_PUSH !== "1") {
  console.error(`
Refusing to run prisma db push.

Confirm DATABASE_URL and DIRECT_URL point at the intended database, then run:

  ALLOW_DB_PUSH=1 npm run db:push
`);
  process.exit(1);
}
