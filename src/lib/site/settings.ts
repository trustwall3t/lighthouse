import { db } from "@/lib/db";
import type { SiteSettings } from "@/generated/prisma";
import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";

/** Prisma defaults when `SiteSettings` row `default` is missing. */
export const DEFAULT_SITE_SETTINGS: Omit<
  SiteSettings,
  "updatedAt"
> = {
  id: "default",
  siteName: DEFAULT_SITE_NAME,
  currency: "$",
  welcomeMessage: "",
  enableKyc: true,
  enable2fa: false,
  enableWithdrawals: true,
  googleTranslate: false,
  enableCopyTrading: true,
  enableSelfTrade: true,
  enableInvestmentPlans: true,
  enableMarketQuotes: true,
  tradeMode: true,
  weekendTrade: true,
  returnCapital: true,
  contactEmail: null,
  siteAddress: null,
  logoUrl: null,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await db.siteSettings.findUnique({ where: { id: "default" } });
  if (row) return row;
  return { ...DEFAULT_SITE_SETTINGS, updatedAt: new Date() };
}

export function isGlobalTradingEnabled(
  settings: Pick<SiteSettings, "tradeMode"> | null | undefined,
): boolean {
  return settings?.tradeMode ?? DEFAULT_SITE_SETTINGS.tradeMode;
}

export function isSelfTradeEnabled(
  settings: Pick<SiteSettings, "enableSelfTrade"> | null | undefined,
): boolean {
  return settings?.enableSelfTrade ?? DEFAULT_SITE_SETTINGS.enableSelfTrade;
}

export function isCopyTradingEnabled(
  settings: Pick<SiteSettings, "enableCopyTrading"> | null | undefined,
): boolean {
  return settings?.enableCopyTrading ?? DEFAULT_SITE_SETTINGS.enableCopyTrading;
}
