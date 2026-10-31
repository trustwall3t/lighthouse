import { getFromAddress, getReplyToAddress } from "@/lib/email/config";
import { renderAppEmailLayout } from "@/lib/email/layout";
import {
  type EmailData,
  resolveEmailTemplate,
} from "@/lib/email/templates";
import { Resend } from "resend";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

async function deliverEmail(to: string, subject: string, html: string) {
  const resend = getResend();
  const replyTo = getReplyToAddress();

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    ...(replyTo ? { replyTo } : {}),
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendRawEmail(
  to: string,
  subject: string,
  bodyHtml: string,
  options?: { headline?: string; preheader?: string },
) {
  try {
    const html = renderAppEmailLayout({
      headline: options?.headline ?? subject,
      preheader: options?.preheader ?? subject,
      bodyHtml,
    });
    const info = await deliverEmail(to, subject, html);
    return { success: true as const, info };
  } catch (error) {
    console.error("sendRawEmail failed:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export async function sendEmail<T extends keyof EmailData>(
  to: string,
  template: T,
  data: EmailData[T],
) {
  try {
    const { subject, html } = resolveEmailTemplate(template, data);
    const info = await deliverEmail(to, subject, html);
    return { success: true, info };
  } catch (error) {
    console.error("sendEmail failed:", {
      template,
      error: error instanceof Error ? error.message : error,
    });
    return {
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
