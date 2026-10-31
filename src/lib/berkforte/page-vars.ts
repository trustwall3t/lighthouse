import { applyMarketingHtmlFixes } from "@/lib/berkforte/marketing-html-fixes";
import type { HomeStats } from "@/types/site";

type InjectOptions = {
  logoUrl: string;
  siteName: string;
  contactEmail?: string | null;
  stats?: HomeStats | null;
  verifyCaptcha?: string;
};

export function injectBerkfortePageVars(html: string, opts: InjectOptions): string {
  const siteName = opts.siteName || "Light House Wealth";
  const contactEmail = opts.contactEmail?.trim() || "support@lighthousewealth.com";

  let out = html.replaceAll("{{LOGO_URL}}", opts.logoUrl).replaceAll("{{SITE_NAME}}", siteName);

  const stats = opts.stats;
  const totalUsers = (stats?.totalUsers ?? 0) + 89650;
  const totalDeposits = (stats?.totalDeposits ?? 0) + 338400989;
  const totalWithdrawals = (stats?.totalWithdrawals ?? 0) + 101689885;
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - yearStart.getTime()) / 86400000);
  const daysInWork = dayOfYear + 2000;

  out = out
    .replaceAll("{{STAT_TOTAL_USERS}}", String(totalUsers))
    .replaceAll("{{STAT_TOTAL_DEPOSITS}}", String(totalDeposits))
    .replaceAll("{{STAT_TOTAL_WITHDRAWALS}}", String(totalWithdrawals))
    .replaceAll("{{STAT_DAYS_IN_WORK}}", String(daysInWork));

  if (opts.verifyCaptcha) {
    out = out.replaceAll("{{VERIFY_CAPTCHA}}", opts.verifyCaptcha);
  }

  out = applyMarketingHtmlFixes(out, {
    siteName,
    logoUrl: opts.logoUrl,
    contactEmail,
  });

  return out;
}
