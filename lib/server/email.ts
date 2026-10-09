import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/data/site";
import { query } from "./db";
import type { EmailContent } from "./email-templates";

/**
 * Sends email through the first configured provider:
 *
 * 1. SMTP — the support mailbox's own server. For GoDaddy Professional Email (Titan):
 *    SMTP_HOST=smtp.titan.email  SMTP_PORT=465  SMTP_USER=support@techyera.co.in  SMTP_PASS=<mailbox password>
 * 2. Resend (https://resend.com) — RESEND_API_KEY
 *
 * - From:      NOTIFY_FROM, default "Techyera <SMTP_USER or support@techyera.co.in>"
 * - Alerts to: NOTIFY_EMAIL, default support@techyera.co.in (comma-separate several addresses)
 * - Reply-To:  the visitor on internal alerts; otherwise the public contact address, so replies reach the support inbox
 *
 * Never throws: a failed email must not fail a form submission or an admin action.
 * Every attempt is recorded in the email_log table and shown in the admin panel.
 */

export type EmailStatus = "sent" | "failed" | "skipped";
export interface EmailRef { kind: string; refType: "enquiry" | "application"; refId: number }

const smtpConfigured = () => !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
export const emailProvider = (): "SMTP" | "Resend" | null => (smtpConfigured() ? "SMTP" : process.env.RESEND_API_KEY ? "Resend" : null);
export const emailConfigured = () => emailProvider() !== null;
export const adminRecipients = () => (process.env.NOTIFY_EMAIL || site.contact.email).split(",").map((s) => s.trim()).filter(Boolean);
export const fromAddress = () => process.env.NOTIFY_FROM || `${site.shortName} <${process.env.SMTP_USER || site.contact.email}>`;

// one SMTP transporter per server process; it connects per message, which suits serverless hosts
const g = globalThis as unknown as { __techyeraSmtp?: Transporter };
function smtp() {
  if (!g.__techyeraSmtp) {
    const port = Number(process.env.SMTP_PORT || 465);
    g.__techyeraSmtp = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = TLS from the start; 587 upgrades with STARTTLS
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // Titan's servers can wait 15–30 s before greeting (an anti-spam delay); emails are sent in the background
      connectionTimeout: 15000,
      greetingTimeout: 35000,
      socketTimeout: 35000,
    });
  }
  return g.__techyeraSmtp;
}

async function deliver(provider: "SMTP" | "Resend", to: string[], content: EmailContent) {
  const replyTo = content.replyTo || site.contact.email;
  if (provider === "SMTP") {
    await smtp().sendMail({ from: fromAddress(), to, replyTo, subject: content.subject, html: content.html, text: content.text });
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: fromAddress(), to, reply_to: replyTo, subject: content.subject, html: content.html, text: content.text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
}

export async function sendEmail(to: string | string[], content: EmailContent, ref: EmailRef): Promise<EmailStatus> {
  const recipients = Array.isArray(to) ? to : [to];
  const provider = emailProvider();
  let status: EmailStatus = "skipped";
  let error = "";

  if (provider) {
    try {
      await deliver(provider, recipients, content);
      status = "sent";
    } catch (e) {
      status = "failed";
      error = `${provider}: ${(e instanceof Error ? e.message : String(e)).slice(0, 300)}`;
      console.error(`Email "${content.subject}" to ${recipients.join(", ")} failed — ${error}`);
    }
  }

  try {
    await query(
      "INSERT INTO email_log (kind, ref_type, ref_id, to_email, subject, status, error) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [ref.kind, ref.refType, ref.refId, recipients.join(", "), content.subject, status, error],
    );
  } catch (e) {
    console.error("Could not record email in email_log", e);
  }
  return status;
}
