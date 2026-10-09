import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { adminInput, Detail, EmailHistory, StatusBadge } from "@/components/admin/ui";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { requireAdmin } from "@/lib/server/session";
import { enquiryStatuses, formatWhen, getEnquiry, listEmails } from "@/lib/server/submissions";
import { emailConfigured } from "@/lib/server/email";
import { deleteEnquiry, updateEnquiry } from "../../actions";

export const metadata = { title: "Enquiry" };

export default async function EnquiryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const e = await getEnquiry(Number((await params).id));
  if (!e) notFound();
  const { saved } = await searchParams;
  const emails = await listEmails("enquiry", e.id);

  return (
    <>
      <Link href="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft aria-hidden className="h-4 w-4" />All enquiries</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[1.75rem]">{e.name}</h1>
        <StatusBadge status={e.status} />
      </div>
      <p className="mt-1 text-muted">{e.company} · received {formatWhen(e.created_at)}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="rounded-[12px] border border-line bg-white p-6">
            <h2 className="text-base">Message</h2>
            <p className="mt-3 whitespace-pre-wrap text-[1rem] leading-relaxed text-ink-2">{e.message}</p>
          </section>
          <section className="rounded-[12px] border border-line bg-white px-6 py-2">
            <dl>
              <Detail label="Work email"><a href={`mailto:${e.email}`} className="text-accent hover:underline">{e.email}</a></Detail>
              <Detail label="Phone">{e.phone && <a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">{e.phone}</a>}</Detail>
              <Detail label="Company">{e.company}</Detail>
              <Detail label="Country">{e.country}</Detail>
              <Detail label="Service interested in">{e.service}</Detail>
              <Detail label="Project budget">{e.budget}</Detail>
            </dl>
          </section>
        </div>

        <aside className="space-y-6">
          <a href={`mailto:${e.email}?subject=${encodeURIComponent("Re: your enquiry to Techyera")}`} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-accent text-sm font-semibold text-white hover:bg-accent-strong">
            <Mail aria-hidden className="h-4 w-4" />Reply by email
          </a>
          <form action={updateEnquiry} className="rounded-[12px] border border-line bg-white p-6">
            <input type="hidden" name="id" value={e.id} />
            <h2 className="text-base">Follow-up</h2>
            {saved && <p role="status" className="mt-3 rounded-[8px] bg-success-soft px-3 py-2 text-sm font-medium text-success">Changes saved.</p>}
            <label className="mt-4 block text-sm font-semibold text-ink" htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={e.status} className={`${adminInput} mt-1.5 w-full capitalize`}>
              {enquiryStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label className="mt-4 block text-sm font-semibold text-ink" htmlFor="notes">Internal notes</label>
            <textarea id="notes" name="notes" rows={5} defaultValue={e.notes} placeholder="Call summary, next steps…" className={`${adminInput} mt-1.5 h-auto w-full py-2.5`} />
            <button type="submit" className="mt-4 h-10 w-full rounded-[8px] bg-ink text-sm font-semibold text-white hover:bg-accent">Save changes</button>
          </form>
          <EmailHistory configured={emailConfigured()} emails={emails.map((m) => ({ id: m.id, when: formatWhen(m.created_at), kind: m.kind, to: m.to_email, subject: m.subject, status: m.status, error: m.error }))} />
          <form action={deleteEnquiry}>
            <input type="hidden" name="id" value={e.id} />
            <ConfirmSubmit message={`Permanently delete the enquiry from ${e.name}?`} className="text-sm font-semibold text-danger hover:underline">Delete this enquiry</ConfirmSubmit>
          </form>
        </aside>
      </div>
    </>
  );
}
