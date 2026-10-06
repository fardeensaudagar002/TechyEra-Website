import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { adminInput, Detail, StatusBadge } from "@/components/admin/ui";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { requireAdmin } from "@/lib/server/session";
import { applicationStatuses, formatWhen, getApplication } from "@/lib/server/submissions";
import { deleteApplication, updateApplication } from "../../actions";

export const metadata = { title: "Application" };

export default async function ApplicationPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const a = await getApplication(Number((await params).id));
  if (!a) notFound();
  const { saved } = await searchParams;
  const ext = (u: string) => <a href={u} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{u}</a>;

  return (
    <>
      <Link href="/admin/applications" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft aria-hidden className="h-4 w-4" />All applications</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[1.75rem]">{a.full_name}</h1>
        <StatusBadge status={a.status} />
      </div>
      <p className="mt-1 text-muted">Applied for <span className="font-semibold text-ink">{a.job_title}</span> on {formatWhen(a.created_at)}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="rounded-[12px] border border-line bg-white px-6 py-2">
            <dl>
              <Detail label="Email"><a href={`mailto:${a.email}`} className="text-accent hover:underline">{a.email}</a></Detail>
              <Detail label="Phone"><a href={`tel:${a.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">{a.phone}</a></Detail>
              <Detail label="Current location">{a.location}</Detail>
              <Detail label="Experience">{a.experience}</Detail>
              <Detail label="LinkedIn">{a.linkedin && ext(a.linkedin)}</Detail>
              <Detail label="Portfolio / GitHub">{a.portfolio && ext(a.portfolio)}</Detail>
            </dl>
          </section>
          <section className="rounded-[12px] border border-line bg-white p-6">
            <h2 className="text-base">Cover letter</h2>
            <p className="mt-3 whitespace-pre-wrap text-[0.9688rem] leading-relaxed text-ink-2">{a.cover_letter || <span className="text-muted">No cover letter provided.</span>}</p>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[12px] border border-line bg-white p-6">
            <h2 className="text-base">Resume</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-accent-soft text-accent"><FileText aria-hidden className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{a.resume_name}</span>
                <span className="text-[0.8125rem] text-muted">{(a.resume_size / 1024 / 1024).toFixed(2)} MB</span>
              </span>
            </div>
            <a href={`/api/admin/resume/${a.id}`} download className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-accent text-sm font-semibold text-white hover:bg-accent-strong">
              <Download aria-hidden className="h-4 w-4" />Download resume
            </a>
          </section>

          <form action={updateApplication} className="rounded-[12px] border border-line bg-white p-6">
            <input type="hidden" name="id" value={a.id} />
            <h2 className="text-base">Review</h2>
            {saved && <p role="status" className="mt-3 rounded-[8px] bg-success-soft px-3 py-2 text-sm font-medium text-success">Changes saved.</p>}
            <label className="mt-4 block text-sm font-semibold text-ink" htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={a.status} className={`${adminInput} mt-1.5 w-full capitalize`}>
              {applicationStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label className="mt-4 block text-sm font-semibold text-ink" htmlFor="notes">Internal notes</label>
            <textarea id="notes" name="notes" rows={5} defaultValue={a.notes} placeholder="Interview feedback, next steps…" className={`${adminInput} mt-1.5 h-auto w-full py-2.5`} />
            <button type="submit" className="mt-4 h-10 w-full rounded-[8px] bg-ink text-sm font-semibold text-white hover:bg-accent">Save changes</button>
          </form>

          <form action={deleteApplication}>
            <input type="hidden" name="id" value={a.id} />
            <ConfirmSubmit message={`Permanently delete the application from ${a.full_name}, including the resume?`} className="text-sm font-semibold text-danger hover:underline">
              Delete this application
            </ConfirmSubmit>
          </form>
        </aside>
      </div>
    </>
  );
}
