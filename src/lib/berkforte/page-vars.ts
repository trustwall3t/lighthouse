import { applyMarketingHtmlFixes } from "@/lib/berkforte/marketing-html-fixes";
import {
  formatMarketingDaysDisplay,
  formatMarketingUsersDisplay,
  getMarketingDaysOnline,
  getMarketingTotalUsers,
  MARKETING_DEPOSITS_OFFSET,
  MARKETING_WITHDRAWALS_OFFSET,
} from "@/lib/berkforte/marketing-public-stats";
import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";
import type { HomeStats } from "@/types/site";

type InjectOptions = {
  logoUrl: string;
  siteName: string;
  contactEmail?: string | null;
  stats?: HomeStats | null;
  verifyCaptcha?: string;
};

/** SSR + `data-fallback` for Porto counters (users & days). */
function patchHomeCounterBlocks(
  html: string,
  usersDisplay: string,
  daysDisplay: string,
): string {
  let out = html;

  out = out.replace(
    /(<strong[\s\S]*?data-to=")(\d+)("[\s\S]*?data-append="\+"[\s\S]*?)>[\s\S]*?(<\/strong[\s\S]*?>\s*<label>TOTAL USERS)/gi,
    `$1$2$3 data-fallback="${usersDisplay}">${usersDisplay}$4`,
  );

  out = out.replace(
    /(<strong[\s\S]*?data-to=")(\d+)("[\s\S]*?)>[\s\S]*?(<\/strong[\s\S]*?>\s*<label>DAYS ONLINE)/gi,
    `$1$2$3 data-fallback="${daysDisplay}">${daysDisplay}$4`,
  );

  return out;
}

export function injectBerkfortePageVars(html: string, opts: InjectOptions): string {
  const siteName = opts.siteName || DEFAULT_SITE_NAME;
  const contactEmail = opts.contactEmail?.trim() || "support@pinnaclewealthfx.com";

  let out = html.replaceAll("{{LOGO_URL}}", opts.logoUrl).replaceAll("{{SITE_NAME}}", siteName);

  const stats = opts.stats;
  const totalUsers = getMarketingTotalUsers(stats?.totalUsers);
  const totalDeposits = (stats?.totalDeposits ?? 0) + MARKETING_DEPOSITS_OFFSET;
  const totalWithdrawals = (stats?.totalWithdrawals ?? 0) + MARKETING_WITHDRAWALS_OFFSET;
  const daysInWork = getMarketingDaysOnline();

  const usersDisplay = formatMarketingUsersDisplay(totalUsers);
  const daysDisplay = formatMarketingDaysDisplay(daysInWork);

  out = out
    .replaceAll("{{STAT_TOTAL_USERS}}", String(totalUsers))
    .replaceAll("{{STAT_TOTAL_DEPOSITS}}", String(totalDeposits))
    .replaceAll("{{STAT_TOTAL_WITHDRAWALS}}", String(totalWithdrawals))
    .replaceAll("{{STAT_DAYS_IN_WORK}}", String(daysInWork));

  out = patchHomeCounterBlocks(out, usersDisplay, daysDisplay);

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
