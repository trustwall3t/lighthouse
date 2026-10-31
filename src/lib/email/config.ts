import { DEFAULT_SITE_NAME } from "@/lib/site/default-brand";
import { FOOTER_RISK_WARNING } from "@/lib/public/homepage-content";

/** Public site URL for links in email (runtime env; avoid marking as a Netlify "secret"). */
export function getAppUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromPublic) return fromPublic;

  const netlify =
    process.env.URL?.replace(/\/$/, "") ||
    process.env.DEPLOY_PRIME_URL?.replace(/\/$/, "");
  if (netlify) return netlify;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

/** Display name in email footers — prefer admin Site Settings in DB; no secret env var. */
export function getEmailSiteName(): string {
  return DEFAULT_SITE_NAME;
}

export function getEmailLogoUrl(): string {
  const custom = process.env.EMAIL_LOGO_URL?.trim();
  if (custom) return custom;
  return `${getAppUrl()}/logo.png`;
}

export function getFromAddress(): string {
  const from = process.env.EMAIL_FROM?.trim().replace(/^['"]|['"]$/g, "");
  if (from) return from;
  const site = getEmailSiteName();
  return `${site} <onboarding@resend.dev>`;
}

export function getReplyToAddress(): string | undefined {
  return process.env.EMAIL_REPLY_TO?.trim() || process.env.EMAIL_FROM?.trim();
}

export function getAdminNotificationEmail(): string | undefined {
  return process.env.ADMIN_NOTIFICATION_EMAIL?.trim();
}

export function getEmailRiskDisclaimer(): string {
  return process.env.EMAIL_RISK_DISCLAIMER?.trim() || FOOTER_RISK_WARNING;
}
