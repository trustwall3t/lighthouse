import { EMAIL_BRAND, emailMoney } from "@/lib/email/brand";
import {
  getAdminNotificationEmail,
  getAppUrl,
  getEmailSiteName,
} from "@/lib/email/config";
import { escapeHtml } from "@/lib/email/escape";
import { renderAppEmailLayout } from "@/lib/email/layout";

export type EmailTemplate = {
  subject: string;
  html: string;
};

const { primary, primarySoft, success } = EMAIL_BRAND;

function codeBlock(token: string): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:16px 0 20px;">
    <tr>
      <td align="center" style="padding:18px 24px;background:${primarySoft};border-radius:10px;border:1px dashed ${primary};">
        <span style="font-size:30px;font-weight:800;letter-spacing:0.22em;color:${primary};font-family:ui-monospace,'SF Mono',Consolas,monospace;">${escapeHtml(token)}</span>
      </td>
    </tr>
  </table>`;
}

function highlightAmount(amount: number): string {
  return `<strong style="color:${primary};">${emailMoney(amount)}</strong>`;
}

const site = () => getEmailSiteName();
const verifyUrl = (email: string) =>
  `${getAppUrl()}/auth/verify?email=${encodeURIComponent(email)}`;

export const emailTemplates = {
  welcome: (name: string, email: string, token: string): EmailTemplate => ({
    subject: `Welcome to ${site()}`,
    html: renderAppEmailLayout({
      badge: "Welcome",
      preheader: `Your verification code is ${token}`,
      headline: `Welcome, ${name.split(" ")[0] || name}`,
      bodyHtml: `
        <p style="margin:0 0 16px;">Thanks for joining <strong>${escapeHtml(site())}</strong>. Verify your email to access your wallet, investment plans, and trading tools.</p>
        <p style="margin:0 0 8px;font-size:14px;color:${EMAIL_BRAND.textMuted};">Your verification code:</p>
        ${codeBlock(token)}
        <p style="margin:0;">This code expires in 10 minutes. If you did not create an account, ignore this message.</p>
      `,
      cta: { label: "Verify email", href: verifyUrl(email) },
    }),
  }),

  resetPassword: (data: { link: string }): EmailTemplate => ({
    subject: "Reset your password",
    html: renderAppEmailLayout({
      badge: "Security",
      preheader: "Password reset request for your account",
      headline: "Password reset",
      bodyHtml: `
        <p style="margin:0 0 16px;">We received a request to reset the password for your ${escapeHtml(site())} account.</p>
        <p style="margin:0;">If you made this request, use the button below. Otherwise, ignore this email — your password will not change.</p>
      `,
      cta: { label: "Reset password", href: data.link },
    }),
  }),

  deposit: (data: { amount: number }): EmailTemplate => ({
    subject: "Deposit request received",
    html: renderAppEmailLayout({
      badge: "Deposit",
      preheader: `Deposit request for ${emailMoney(data.amount)}`,
      headline: "Deposit request submitted",
      bodyHtml: `
        <p style="margin:0 0 16px;">We received your request to deposit ${highlightAmount(data.amount)}.</p>
        <p style="margin:0;">Our team will review and confirm the transaction. You will receive another email once it is processed.</p>
      `,
      cta: { label: "View dashboard", href: `${getAppUrl()}/dashboard/deposit` },
    }),
  }),

  confirmDeposit: (data: { amount: number }): EmailTemplate => ({
    subject: "Deposit confirmed",
    html: renderAppEmailLayout({
      badge: "Deposit",
      preheader: `Your deposit of ${emailMoney(data.amount)} was confirmed`,
      headline: "Deposit confirmed",
      bodyHtml: `
        <p style="margin:0 0 16px;">Your deposit of ${highlightAmount(data.amount)} has been credited to your account.</p>
        <p style="margin:0;">Review your updated balance and transaction history in the client area.</p>
      `,
      cta: { label: "Open dashboard", href: `${getAppUrl()}/dashboard` },
    }),
  }),

  withdraw: (data: { amount: number }): EmailTemplate => ({
    subject: "Withdrawal request received",
    html: renderAppEmailLayout({
      badge: "Withdrawal",
      preheader: `Withdrawal request for ${emailMoney(data.amount)}`,
      headline: "Withdrawal request submitted",
      bodyHtml: `
        <p style="margin:0 0 16px;">We received your request to withdraw ${highlightAmount(data.amount)}.</p>
        <p style="margin:0;">Processing times may vary while we verify the request. We will notify you when it is complete.</p>
      `,
      cta: { label: "Track withdrawal", href: `${getAppUrl()}/dashboard/withdraw` },
    }),
  }),

  confirmWithdraw: (data: { amount: number }): EmailTemplate => ({
    subject: "Withdrawal processed",
    html: renderAppEmailLayout({
      badge: "Withdrawal",
      preheader: `Withdrawal of ${emailMoney(data.amount)} processed`,
      headline: "Withdrawal confirmed",
      bodyHtml: `
        <p style="margin:0 0 16px;">Your withdrawal of ${highlightAmount(data.amount)} has been processed.</p>
        <p style="margin:0;">If you did not authorize this withdrawal, contact support immediately.</p>
      `,
      cta: { label: "Transaction history", href: `${getAppUrl()}/dashboard/transaction-history` },
    }),
  }),

  trade: (data: { amount: number; symbol: string; type: string }): EmailTemplate => ({
    subject: `Trade executed: ${data.symbol}`,
    html: renderAppEmailLayout({
      badge: "Trading",
      preheader: `${data.type} order on ${data.symbol}`,
      headline: "Trade confirmation",
      bodyHtml: `
        <p style="margin:0 0 16px;">Your <strong>${escapeHtml(data.type)}</strong> order on <strong>${escapeHtml(data.symbol)}</strong> for ${highlightAmount(data.amount)} has been executed.</p>
        <p style="margin:0;">Review open positions and history in your trading dashboard.</p>
      `,
      cta: { label: "View trades", href: `${getAppUrl()}/dashboard/trading-history` },
    }),
  }),

  AdminNotification: (data: {
    amount: number;
    type: "deposit" | "withdraw";
  }): EmailTemplate => ({
    subject: `[Admin] New ${data.type}: ${emailMoney(data.amount)}`,
    html: renderAppEmailLayout({
      badge: "Admin",
      preheader: `User ${data.type} pending review`,
      headline: `${data.type === "deposit" ? "Deposit" : "Withdrawal"} notification`,
      bodyHtml: `
        <p style="margin:0 0 16px;">A client submitted a <strong>${escapeHtml(data.type)}</strong> of ${highlightAmount(data.amount)}.</p>
        <p style="margin:0;">Sign in to the admin panel to approve or decline the request.</p>
      `,
      cta: {
        label: "Open admin",
        href: `${getAppUrl()}/admin/dashboard/transactions`,
      },
      footnote: "Internal operations notice. Not sent to clients.",
    }),
  }),

  referralBonus: (data: { amount: number }): EmailTemplate => ({
    subject: "Referral bonus credited",
    html: renderAppEmailLayout({
      badge: "Rewards",
      preheader: `You earned ${emailMoney(data.amount)} referral bonus`,
      headline: "Referral reward",
      bodyHtml: `
        <p style="margin:0 0 16px;">A referral bonus of <strong style="color:${success};">${emailMoney(data.amount)}</strong> has been added to your account.</p>
        <p style="margin:0;">Thank you for growing the ${escapeHtml(site())} community.</p>
      `,
      cta: { label: "Invite friends", href: `${getAppUrl()}/dashboard/invite-friends` },
    }),
  }),

  resendToken: (data: { token: string; email: string }): EmailTemplate => ({
    subject: "Your verification code",
    html: renderAppEmailLayout({
      badge: "Security",
      preheader: `Verification code ${data.token}`,
      headline: "Verify your email",
      bodyHtml: `
        <p style="margin:0 0 8px;">Use this code to verify <strong>${escapeHtml(data.email)}</strong>:</p>
        ${codeBlock(data.token)}
        <p style="margin:0;">The code expires in 10 minutes.</p>
      `,
      cta: { label: "Continue verification", href: verifyUrl(data.email) },
    }),
  }),
};

export type EmailData = {
  welcome: { name: string; email: string; token: string };
  resetPassword: { link: string };
  deposit: { amount: number };
  confirmDeposit: { amount: number };
  withdraw: { amount: number };
  confirmWithdraw: { amount: number };
  trade: { amount: number; symbol: string; type: string };
  AdminNotification: { amount: number; type: "deposit" | "withdraw" };
  referralBonus: { amount: number };
  resendToken: { token: string; email: string };
};

export function resolveEmailTemplate<T extends keyof EmailData>(
  template: T,
  data: EmailData[T],
): EmailTemplate {
  switch (template) {
    case "welcome": {
      const d = data as EmailData["welcome"];
      return emailTemplates.welcome(d.name, d.email, d.token);
    }
    case "resetPassword":
      return emailTemplates.resetPassword(data as EmailData["resetPassword"]);
    case "deposit":
      return emailTemplates.deposit(data as EmailData["deposit"]);
    case "confirmDeposit":
      return emailTemplates.confirmDeposit(data as EmailData["confirmDeposit"]);
    case "withdraw":
      return emailTemplates.withdraw(data as EmailData["withdraw"]);
    case "confirmWithdraw":
      return emailTemplates.confirmWithdraw(data as EmailData["confirmWithdraw"]);
    case "trade":
      return emailTemplates.trade(data as EmailData["trade"]);
    case "AdminNotification":
      return emailTemplates.AdminNotification(data as EmailData["AdminNotification"]);
    case "referralBonus":
      return emailTemplates.referralBonus(data as EmailData["referralBonus"]);
    case "resendToken": {
      const d = data as EmailData["resendToken"];
      return emailTemplates.resendToken(d);
    }
    default:
      throw new Error(`Unsupported email template: ${String(template)}`);
  }
}

export function getAdminInbox(): string | undefined {
  return getAdminNotificationEmail();
}
