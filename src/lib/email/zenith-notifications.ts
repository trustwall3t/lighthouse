import { EMAIL_BRAND } from "@/lib/email/brand";
import { sendRawEmail } from "@/lib/email/send";
import { escapeHtml } from "@/lib/email/escape";

const accent = EMAIL_BRAND.primary;

async function canSend(): Promise<boolean> {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendRoiEmail(opts: {
  to: string;
  name: string;
  planName: string;
  amount: number;
  currency: string;
}) {
  if (!(await canSend())) return;

  const amount = `${escapeHtml(opts.currency)}${opts.amount.toLocaleString()}`;
  await sendRawEmail(
    opts.to,
    "Return on investment credited",
    `
      <p style="margin:0 0 16px;">Hi ${escapeHtml(opts.name)},</p>
      <p style="margin:0 0 16px;">Your plan <strong>${escapeHtml(opts.planName)}</strong> earned <strong style="color:${accent};">${amount}</strong>.</p>
      <p style="margin:0;">The payout is reflected in your dashboard balance.</p>
    `,
    { preheader: `ROI credited on ${opts.planName}` },
  );
}

export async function sendPlanClosedEmail(opts: {
  to: string;
  name: string;
  planName: string;
  amount: number;
  currency: string;
  siteName: string;
}) {
  if (!(await canSend())) return;

  const amount = `${escapeHtml(opts.currency)}${opts.amount.toLocaleString()}`;
  await sendRawEmail(
    opts.to,
    "Investment plan closed",
    `
      <p style="margin:0 0 16px;">Hi ${escapeHtml(opts.name)},</p>
      <p style="margin:0 0 16px;">Your investment plan <strong>${escapeHtml(opts.planName)}</strong> (${amount}) has closed.</p>
      <p style="margin:0;">Thank you for investing with ${escapeHtml(opts.siteName)}.</p>
    `,
    { preheader: `${opts.planName} has closed` },
  );
}

export async function sendCopyTradeOpened(opts: {
  to: string;
  symbol: string;
  direction: string;
  stake: number;
}) {
  if (!(await canSend())) return;

  await sendRawEmail(
    opts.to,
    "Copy trade opened",
    `
      <p style="margin:0 0 16px;">A new copy trade is active on <strong>${escapeHtml(opts.symbol)}</strong>.</p>
      <p style="margin:0;">Direction: <strong>${escapeHtml(opts.direction)}</strong> · Stake: <strong style="color:${accent};">$${opts.stake.toFixed(2)}</strong></p>
    `,
    { preheader: `Copy trade opened on ${opts.symbol}` },
  );
}

export async function sendCopyTradeClosed(opts: {
  to: string;
  symbol: string;
  status: string;
  profit: number;
}) {
  if (!(await canSend())) return;

  await sendRawEmail(
    opts.to,
    "Copy trade closed",
    `
      <p style="margin:0 0 16px;">Your <strong>${escapeHtml(opts.symbol)}</strong> copy trade closed as <strong>${escapeHtml(opts.status)}</strong>.</p>
      <p style="margin:0;">Profit / loss: <strong style="color:${accent};">$${opts.profit.toFixed(2)}</strong></p>
    `,
    { preheader: `${opts.symbol} copy trade closed` },
  );
}
