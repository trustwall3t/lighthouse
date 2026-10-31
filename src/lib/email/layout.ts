import { EMAIL_BRAND } from "@/lib/email/brand";
import {
  getAppUrl,
  getEmailLogoUrl,
  getEmailRiskDisclaimer,
  getEmailSiteName,
} from "@/lib/email/config";
import { escapeHtml } from "@/lib/email/escape";

export type EmailCta = {
  label: string;
  href: string;
};

export type AppEmailLayoutOptions = {
  preheader?: string;
  headline: string;
  bodyHtml: string;
  cta?: EmailCta;
  footnote?: string;
  /** Short label in header chip (e.g. "Security", "Deposit"). */
  badge?: string;
};

/** Table-based HTML for Light House Wealth client & admin emails. */
export function renderAppEmailLayout(options: AppEmailLayoutOptions): string {
  const siteName = escapeHtml(getEmailSiteName());
  const logoUrl = escapeHtml(getEmailLogoUrl());
  const appUrl = escapeHtml(getAppUrl());
  const headline = escapeHtml(options.headline);
  const preheader = options.preheader ? escapeHtml(options.preheader) : headline;
  const footnote = options.footnote
    ? escapeHtml(options.footnote)
    : escapeHtml(getEmailRiskDisclaimer());
  const badge = escapeHtml(options.badge ?? "Notification");

  const ctaBlock = options.cta
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:20px 0 8px;">
        <tr>
          <td style="border-radius:8px;background:${EMAIL_BRAND.primary};">
            <a href="${escapeHtml(options.cta.href)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;line-height:1;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(options.cta.label)}</a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${headline}</title>
  <style>
    @media (max-width: 620px) {
      .lh-shell { width: 100% !important; }
      .lh-pad { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.canvas};font-family:'Segoe UI',system-ui,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${EMAIL_BRAND.canvas};padding:36px 16px;">
    <tr>
      <td align="center">
        <table class="lh-shell" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;background:${EMAIL_BRAND.card};border-radius:14px;overflow:hidden;border:1px solid ${EMAIL_BRAND.border};box-shadow:0 8px 32px rgba(14,65,82,0.1);">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, ${EMAIL_BRAND.primary} 0%, ${EMAIL_BRAND.navy} 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="lh-pad" style="padding:28px 32px 20px;border-bottom:1px solid ${EMAIL_BRAND.border};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logoUrl}" alt="${siteName}" width="148" style="display:block;max-width:148px;height:auto;border:0;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:6px 12px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.primary};background:${EMAIL_BRAND.primarySoft};border-radius:999px;">${badge}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="lh-pad" style="padding:28px 32px 8px;">
              <h1 style="margin:0 0 18px;font-size:26px;line-height:1.3;color:${EMAIL_BRAND.navy};font-weight:800;letter-spacing:-0.02em;">${headline}</h1>
              <div style="font-size:16px;line-height:1.65;color:${EMAIL_BRAND.text};">${options.bodyHtml}</div>
            </td>
          </tr>
          ${
            ctaBlock
              ? `<tr><td class="lh-pad" style="padding:0 32px 8px;">${ctaBlock}</td></tr>`
              : ""
          }
          <tr>
            <td class="lh-pad" style="padding:12px 32px 28px;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
              <p style="margin:0 0 12px;">Questions? Reply to this email or open your dashboard anytime.</p>
              <p style="margin:0;font-size:12px;line-height:1.55;color:${EMAIL_BRAND.textFaint};">${footnote}</p>
            </td>
          </tr>
          <tr>
            <td style="background:${EMAIL_BRAND.primarySoft};border-top:1px solid ${EMAIL_BRAND.border};padding:22px 32px;" class="lh-pad">
              <p style="margin:0 0 6px;font-size:14px;color:${EMAIL_BRAND.navy};font-weight:700;">${siteName}</p>
              <p style="margin:0;font-size:12px;color:${EMAIL_BRAND.textMuted};">
                <a href="${appUrl}" style="color:${EMAIL_BRAND.primary};text-decoration:none;font-weight:600;">${appUrl.replace(/^https?:\/\//, "")}</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:${EMAIL_BRAND.textFaint};text-align:center;">You received this because you have an account with ${siteName}.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** @deprecated Use renderAppEmailLayout */
export const renderHanaEmailLayout = renderAppEmailLayout;

export type HanaEmailLayoutOptions = AppEmailLayoutOptions;
