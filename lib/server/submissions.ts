import "server-only";
import { query } from "./db";

export const applicationStatuses = ["new", "reviewing", "shortlisted", "interview", "hired", "rejected"] as const;
export const enquiryStatuses = ["new", "contacted", "in discussion", "closed"] as const;
export type ApplicationStatus = (typeof applicationStatuses)[number];
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export interface ApplicationRow {
  id: number; created_at: Date; job_slug: string; job_title: string; full_name: string; email: string; phone: string;
  location: string; experience: string; linkedin: string; portfolio: string; cover_letter: string;
  resume_name: string; resume_type: string; resume_size: number; status: string; notes: string;
}
export interface EnquiryRow {
  id: number; created_at: Date; name: string; company: string; email: string; phone: string; country: string;
  service: string; budget: string; message: string; status: string; notes: string;
}

const APP_COLS = "id, created_at, job_slug, job_title, full_name, email, phone, location, experience, linkedin, portfolio, cover_letter, resume_name, resume_type, resume_size, status, notes";

export async function listApplications(f: { job?: string; status?: string; q?: string } = {}) {
  const where: string[] = []; const p: unknown[] = [];
  if (f.job) { p.push(f.job); where.push(`job_slug = $${p.length}`); }
  if (f.status) { p.push(f.status); where.push(`status = $${p.length}`); }
  if (f.q) { p.push(`%${f.q.toLowerCase()}%`); where.push(`(lower(full_name) LIKE $${p.length} OR lower(email) LIKE $${p.length} OR lower(location) LIKE $${p.length})`); }
  return query<ApplicationRow>(`SELECT ${APP_COLS} FROM applications ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC LIMIT 500`, p);
}
export const getApplication = async (id: number) => (await query<ApplicationRow>(`SELECT ${APP_COLS} FROM applications WHERE id = $1`, [id]))[0];
export const getResume = async (id: number) =>
  (await query<{ resume_name: string; resume_type: string; resume_data: Uint8Array }>("SELECT resume_name, resume_type, resume_data FROM applications WHERE id = $1", [id]))[0];
export const applicationJobs = () => query<{ job_slug: string; job_title: string; n: number }>("SELECT job_slug, max(job_title) AS job_title, count(*)::int AS n FROM applications GROUP BY job_slug ORDER BY 2");

export async function listEnquiries(f: { status?: string; service?: string; q?: string } = {}) {
  const where: string[] = []; const p: unknown[] = [];
  if (f.status) { p.push(f.status); where.push(`status = $${p.length}`); }
  if (f.service) { p.push(f.service); where.push(`service = $${p.length}`); }
  if (f.q) { p.push(`%${f.q.toLowerCase()}%`); where.push(`(lower(name) LIKE $${p.length} OR lower(email) LIKE $${p.length} OR lower(company) LIKE $${p.length})`); }
  return query<EnquiryRow>(`SELECT * FROM enquiries ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC LIMIT 500`, p);
}
export const getEnquiry = async (id: number) => (await query<EnquiryRow>("SELECT * FROM enquiries WHERE id = $1", [id]))[0];

export interface EmailLogRow { id: number; created_at: Date; kind: string; to_email: string; subject: string; status: string; error: string }
export const listEmails = (refType: "enquiry" | "application", refId: number) =>
  query<EmailLogRow>("SELECT id, created_at, kind, to_email, subject, status, error FROM email_log WHERE ref_type = $1 AND ref_id = $2 ORDER BY created_at DESC, id DESC", [refType, refId]);

export async function counts() {
  const [a] = await query<{ total: number; fresh: number }>("SELECT count(*)::int AS total, count(*) FILTER (WHERE status = 'new')::int AS fresh FROM applications");
  const [e] = await query<{ total: number; fresh: number }>("SELECT count(*)::int AS total, count(*) FILTER (WHERE status = 'new')::int AS fresh FROM enquiries");
  return { applications: a, enquiries: e };
}

export const formatWhen = (d: Date | string) =>
  new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
