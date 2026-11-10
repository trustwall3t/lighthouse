import { PrismaClient } from "../src/generated/prisma";
import { COPY_TRADING } from "../src/config/copy-trading";

const db = new PrismaClient();

async function main() {
  await db.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: "Pinnacle Wealth FX",
      currency: "$",
      welcomeMessage:
        "Welcome to Pinnacle Wealth FX — mirror trading and investment plans.",
      enableCopyTrading: true,
      enableSelfTrade: true,
      enableInvestmentPlans: true,
      enableKyc: true,
      tradeMode: true,
      weekendTrade: true,
      returnCapital: true,
    },
    update: {},
  });

  for (const asset of COPY_TRADING.assets) {
    await db.copyAsset.upsert({
      where: { symbol: asset.symbol },
      create: {
        symbol: asset.symbol,
        name: asset.name,
        market: asset.market,
        externalId: asset.externalId,
      },
      update: {
        name: asset.name,
        market: asset.market,
        externalId: asset.externalId,
      },
    });
  }

  for (const t of COPY_TRADING.traders) {
    const existing = await db.trader.findFirst({ where: { name: t.name } });
    if (existing) continue;
    await db.trader.create({
      data: {
        name: t.name,
        description: t.description,
        strategy: t.strategy,
        market: t.market,
        winRate: t.winRate,
        followers: t.followers,
        totalTrades: t.totalTrades,
        isActive: true,
      },
    });
  }

  const { syncMarketingInvestmentPlans } = await import(
    "../src/lib/investment/sync-marketing-plans"
  );
  await syncMarketingInvestmentPlans(db, { removeUnused: false });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
