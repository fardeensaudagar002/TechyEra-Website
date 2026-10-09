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

/** Reads a setting, ignoring stray spaces/newlines and quotes pasted around the value in a hosting dashboard. */
const env = (name: string) => (process.env[name] ?? "").trim().replace(/^(["'])(.*)\1$/s, "$2");

const smtpSettings = () => ({ host: env("SMTP_HOST"), port: Number(env("SMTP_PORT") || 465), user: env("SMTP_USER"), pass: env("SMTP_PASS") });
const smtpConfigured = () => { const s = smtpSettings(); return !!(s.host && s.user && s.pass); };
export const emailProvider = (): "SMTP" | "Resend" | null => (smtpConfigured() ? "SMTP" : env("RESEND_API_KEY") ? "Resend" : null);
export const emailConfigured = () => emailProvider() !== null;
export const adminRecipients = () => (env("NOTIFY_EMAIL") || site.contact.email).split(",").map((s) => s.trim()).filter(Boolean);
export const fromAddress = () => env("NOTIFY_FROM") || `${site.shortName} <${env("SMTP_USER") || site.contact.email}>`;

// one SMTP transporter per server process; it connects per message, which suits serverless hosts
const g = globalThis as unknown as { __techyeraSmtp?: Transporter };
function smtp() {
  if (!g.__techyeraSmtp) {
    const { host, port, user, pass } = smtpSettings();
    g.__techyeraSmtp = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = TLS from the start; 587 upgrades with STARTTLS
      auth: { user, pass },
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
    headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: fromAddress(), to, reply_to: replyTo, subject: content.subject, html: content.html, text: content.text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
}

/** What the site will connect with — for the admin diagnostics. Never includes the password itself. */
export function emailConnectionInfo() {
  const provider = emailProvider();
  if (provider !== "SMTP") return provider === "Resend" ? "Resend API" : "";
  const s = smtpSettings();
  return `${s.host}, port ${s.port}, signing in as ${s.user} (password: ${s.pass.length} characters)`;
}

/** Admin diagnostics: checks the sign-in, then sends a real test message. Not recorded in email_log. */
export async function sendTestEmail(to: string, content: EmailContent): Promise<{ ok: boolean; message: string }> {
  const provider = emailProvider();
  if (!provider) return { ok: false, message: "Email sending isn’t set up: add the SMTP_* settings (or RESEND_API_KEY) and redeploy." };
  try {
    if (provider === "SMTP") await smtp().verify();
    await deliver(provider, [to], content);
    return { ok: true, message: `Test email sent to ${to}. Check that inbox (and its spam folder).` };
  } catch (e) {
    const err = (e instanceof Error ? e.message : String(e)).replace(/[\s:.]+$/, "");
    const hint = /535|auth|login/i.test(err)
      ? " The mail server rejected the username/password. Check SMTP_USER and SMTP_PASS in your hosting settings, then redeploy."
      : /greeting|timeout|ETIMEDOUT|ECONNREFUSED/i.test(err) ? " The mail server did not respond in time. Check SMTP_HOST and SMTP_PORT." : "";
    return { ok: false, message: `${provider}: ${err.slice(0, 300)}.${hint}` };
  }
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
