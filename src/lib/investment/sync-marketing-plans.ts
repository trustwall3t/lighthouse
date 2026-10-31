import type { PrismaClient } from "@/generated/prisma";
import { MARKETING_INVESTMENT_PLANS } from "@/lib/berkforte/marketing-investment-plans";

export async function syncMarketingInvestmentPlans(
  db: Pick<PrismaClient, "investmentPlan">,
  options?: { removeUnused?: boolean },
) {
  const names = MARKETING_INVESTMENT_PLANS.map((p) => p.name);
  const upserted: { id: number; name: string }[] = [];

  for (const plan of MARKETING_INVESTMENT_PLANS) {
    const existing = await db.investmentPlan.findFirst({
      where: { name: plan.name },
    });

    if (existing) {
      const updated = await db.investmentPlan.update({
        where: { id: existing.id },
        data: plan,
      });
      upserted.push({ id: updated.id, name: updated.name });
    } else {
      const created = await db.investmentPlan.create({ data: plan });
      upserted.push({ id: created.id, name: created.name });
    }
  }

  let removed = 0;
  if (options?.removeUnused) {
    const extras = await db.investmentPlan.findMany({
      where: { name: { notIn: names } },
      include: { _count: { select: { userPlans: true } } },
    });
    for (const row of extras) {
      if (row._count.userPlans === 0) {
        await db.investmentPlan.delete({ where: { id: row.id } });
        removed += 1;
      }
    }
  }

  return { upserted, removed };
}
