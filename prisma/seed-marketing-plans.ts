/**
 * Upsert investment plans from marketing `/investments` page.
 */
import { loadEnvConfig } from "@next/env";
import { PrismaClient } from "../src/generated/prisma";
import { syncMarketingInvestmentPlans } from "../src/lib/investment/sync-marketing-plans";

loadEnvConfig(process.cwd());

const dbUrl = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
const db = new PrismaClient(
  dbUrl ? { datasources: { db: { url: dbUrl } } } : undefined,
);

async function main() {
  const { upserted, removed } = await syncMarketingInvestmentPlans(db, {
    removeUnused: true,
  });
  console.log(`Upserted ${upserted.length} marketing plan(s):`);
  for (const p of upserted) {
    console.log(` - [${p.id}] ${p.name}`);
  }
  if (removed > 0) {
    console.log(`Removed ${removed} unused legacy plan(s) with no members.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
