"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminConfigured, checkPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/server/auth";
import { requireAdmin } from "@/lib/server/session";
import { query } from "@/lib/server/db";
import { applicationStatuses, enquiryStatuses, getApplication } from "@/lib/server/submissions";
import { emailConfigured, sendEmail, sendTestEmail } from "@/lib/server/email";
import { after } from "next/server";
import { applicationStatusEmail, testEmail } from "@/lib/server/email-templates";

const MAX_ATTEMPTS = 8; // failed sign-ins allowed per IP in 15 minutes

export async function login(_prev: { error: string }, form: FormData): Promise<{ error: string }> {
  if (!adminConfigured()) return { error: "The admin panel is not set up yet. Set ADMIN_PASSWORD (8+ characters) in the site’s environment variables." };
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const [{ n }] = await query<{ n: number }>("SELECT count(*)::int AS n FROM login_attempts WHERE ip = $1 AND created_at > now() - interval '15 minutes'", [ip]);
  if (n >= MAX_ATTEMPTS) return { error: "Too many attempts. Please wait 15 minutes and try again." };

  if (!(await checkPassword(String(form.get("password") ?? "")))) {
    await query("INSERT INTO login_attempts (ip) VALUES ($1)", [ip]);
    await query("DELETE FROM login_attempts WHERE created_at < now() - interval '1 day'");
    return { error: "Incorrect password." };
  }
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions);
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function updateApplication(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  const status = String(form.get("status"));
  if (!Number.isInteger(id) || !(applicationStatuses as readonly string[]).includes(status)) return;
  const before = await getApplication(id);
  if (!before) return;
  await query("UPDATE applications SET status = $1, notes = $2 WHERE id = $3", [status, String(form.get("notes") ?? "").slice(0, 5000), id]);

  // Email the candidate only when asked, and only when the status actually changed to one with a template
  let email = "";
  const content = form.get("notifyCandidate") === "on" && status !== before.status
    ? applicationStatusEmail(status, { fullName: before.full_name, jobTitle: before.job_title })
    : null;
  if (content) {
    const send = () => sendEmail(before.email, content, { kind: `status:${status}`, refType: "application", refId: id });
    // mail servers can be slow to answer, so a real send happens in the background after the page reloads
    if (emailConfigured()) { after(send); email = "queued"; }
    else email = await send();
  }

  revalidatePath("/admin", "layout");
  redirect(`/admin/applications/${id}?saved=1${email ? `&email=${email}` : ""}`);
}

export async function sendTestEmailAction(form: FormData) {
  await requireAdmin();
  const to = String(form.get("to") ?? "").trim();
  const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)
    ? await sendTestEmail(to, testEmail())
    : { ok: false, message: "Enter a valid email address to send the test to." };
  redirect(`/admin/emails?test=${result.ok ? "ok" : "fail"}&to=${encodeURIComponent(to)}&msg=${encodeURIComponent(result.message)}`);
}

export async function deleteApplication(form: FormData) {
  await requireAdmin();
  await query("DELETE FROM applications WHERE id = $1", [Number(form.get("id"))]);
  await query("DELETE FROM email_log WHERE ref_type = 'application' AND ref_id = $1", [Number(form.get("id"))]);
  revalidatePath("/admin", "layout");
  redirect("/admin/applications");
}

export async function updateEnquiry(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  const status = String(form.get("status"));
  if (!Number.isInteger(id) || !(enquiryStatuses as readonly string[]).includes(status)) return;
  await query("UPDATE enquiries SET status = $1, notes = $2 WHERE id = $3", [status, String(form.get("notes") ?? "").slice(0, 5000), id]);
  revalidatePath("/admin", "layout");
  redirect(`/admin/enquiries/${id}?saved=1`);
}

export async function deleteEnquiry(form: FormData) {
  await requireAdmin();
  await query("DELETE FROM enquiries WHERE id = $1", [Number(form.get("id"))]);
  await query("DELETE FROM email_log WHERE ref_type = 'enquiry' AND ref_id = $1", [Number(form.get("id"))]);
  revalidatePath("/admin", "layout");
  redirect("/admin/enquiries");
}
