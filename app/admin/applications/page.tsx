import Link from "next/link";
import { Download } from "lucide-react";
import { adminInput, Empty, FilterBar, FilterField, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/server/session";
import { applicationJobs, applicationStatuses, formatWhen, listApplications } from "@/lib/server/submissions";
import { jobs } from "@/data/jobs";

export const metadata = { title: "Job applications" };

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ job?: string; status?: string; q?: string }> }) {
  await requireAdmin();
  const f = await searchParams;
  const [rows, applied] = await Promise.all([listApplications(f), applicationJobs()]);
  // every open job, plus closed jobs that still have applications
  const jobOptions = [...jobs.map((j) => ({ slug: j.slug, title: j.title })), ...applied.filter((a) => !jobs.some((j) => j.slug === a.job_slug)).map((a) => ({ slug: a.job_slug, title: `${a.job_title} (closed)` }))];
  const countFor = (slug: string) => applied.find((a) => a.job_slug === slug)?.n ?? 0;
  const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-[1.75rem]">Job applications</h1>
        <p className="text-sm text-muted">{rows.length} shown</p>
      </div>
      <FilterBar resetHref="/admin/applications" exportHref={`/api/admin/export?type=applications${qs ? "&" + qs : ""}`}>
        <FilterField label="Position">
          <select name="job" defaultValue={f.job ?? ""} className={adminInput}>
            <option value="">All positions</option>
            {jobOptions.map((j) => <option key={j.slug} value={j.slug}>{j.title} ({countFor(j.slug)})</option>)}
          </select>
        </FilterField>
        <FilterField label="Status">
          <select name="status" defaultValue={f.status ?? ""} className={`${adminInput} capitalize`}>
            <option value="">Any status</option>
            {applicationStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FilterField>
        <FilterField label="Search">
          <input name="q" type="search" defaultValue={f.q ?? ""} placeholder="Name, email or city" className={`${adminInput} w-56`} />
        </FilterField>
      </FilterBar>

      {rows.length === 0 ? (
        <Empty title="No applications found" text={qs ? "No applications match these filters." : "When someone applies for a position on the website, their application appears here."} />
      ) : (
        <div className="relative overflow-x-auto rounded-[12px] border border-line bg-white">
          <table className="w-full min-w-[820px] text-left text-[0.9375rem]">
            <thead className="border-b border-line bg-mist/60 text-[0.8125rem] text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Candidate</th>
                <th scope="col" className="px-4 py-3 font-semibold">Position</th>
                <th scope="col" className="px-4 py-3 font-semibold">Experience</th>
                <th scope="col" className="px-4 py-3 font-semibold">Applied</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 font-semibold">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-mist/40">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/applications/${a.id}`} className="font-semibold text-ink hover:text-accent">{a.full_name}</Link>
                    <span className="block text-sm text-muted">{a.email} · {a.location}</span>
                  </td>
                  <td className="px-4 py-3.5 text-ink-2">{a.job_title}</td>
                  <td className="px-4 py-3.5 text-ink-2">{a.experience}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted">{formatWhen(a.created_at)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3.5">
                    <a href={`/api/admin/resume/${a.id}`} download className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-strong">
                      <Download aria-hidden className="h-4 w-4" />Download<span className="sr-only"> resume of {a.full_name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
