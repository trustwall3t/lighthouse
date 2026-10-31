/**
 * Upsert admin from env (safe to re-run).
 * Env: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME
 */
import { loadEnvConfig } from "@next/env";
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma";

loadEnvConfig(process.cwd());

/** Match the running app: pooler URL first; direct is for migrations only. */
const dbUrl = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
const db = new PrismaClient(
  dbUrl
    ? {
        datasources: { db: { url: dbUrl } },
      }
    : undefined,
);

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@example.com")
    .trim()
    .toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME ?? "Super Admin";

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await db.admin.upsert({
    where: { email },
    create: {
      email,
      name,
      password: passwordHash,
    },
    update: {
      name,
      password: passwordHash,
    },
  });

  console.log(`Upserted admin: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
