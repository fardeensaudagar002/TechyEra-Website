import "server-only";
import { site } from "@/data/site";

/**
 * Optional email alert for each new submission, sent through Resend (https://resend.com).
 * Active only when RESEND_API_KEY and NOTIFY_EMAIL are set. Never blocks or fails a submission.
 */
export async function notify(subject: string, lines: [string, string][], adminPath: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const link = new URL(adminPath, site.url).toString();
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${lines
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="color:#5f6b82;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px"><a href="${link}">Open in the admin panel</a></p>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.NOTIFY_FROM || `${site.shortName} Website <onboarding@resend.dev>`, to: to.split(",").map((s) => s.trim()), subject, html }),
      signal: AbortSignal.timeout(6000),
    });
  } catch (e) {
    console.error("Email notification failed", e);
  }
}
