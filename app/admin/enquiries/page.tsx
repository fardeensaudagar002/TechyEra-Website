import Link from "next/link";
import { adminInput, Empty, FilterBar, FilterField, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/server/session";
import { enquiryStatuses, formatWhen, listEnquiries } from "@/lib/server/submissions";
import { serviceOptions } from "@/lib/forms";

export const metadata = { title: "Enquiries" };

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string; service?: string; q?: string }> }) {
  await requireAdmin();
  const f = await searchParams;
  const rows = await listEnquiries(f);
  const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-[1.75rem]">Enquiries</h1>
        <p className="text-sm text-muted">{rows.length} shown</p>
      </div>
      <FilterBar resetHref="/admin/enquiries" exportHref={`/api/admin/export?type=enquiries${qs ? "&" + qs : ""}`}>
        <FilterField label="Service">
          <select name="service" defaultValue={f.service ?? ""} className={adminInput}>
            <option value="">All services</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FilterField>
        <FilterField label="Status">
          <select name="status" defaultValue={f.status ?? ""} className={`${adminInput} capitalize`}>
            <option value="">Any status</option>
            {enquiryStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FilterField>
        <FilterField label="Search">
          <input name="q" type="search" defaultValue={f.q ?? ""} placeholder="Name, email or company" className={`${adminInput} w-56`} />
        </FilterField>
      </FilterBar>

      {rows.length === 0 ? (
        <Empty title="No enquiries found" text={qs ? "No enquiries match these filters." : "When someone sends a message through the Contact page, it appears here."} />
      ) : (
        <div className="relative overflow-x-auto rounded-[12px] border border-line bg-white">
          <table className="w-full min-w-[820px] text-left text-[0.9375rem]">
            <thead className="border-b border-line bg-mist/60 text-[0.8125rem] text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">From</th>
                <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                <th scope="col" className="px-4 py-3 font-semibold">Budget</th>
                <th scope="col" className="px-4 py-3 font-semibold">Message</th>
                <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((e) => (
                <tr key={e.id} className="hover:bg-mist/40">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/enquiries/${e.id}`} className="font-semibold text-ink hover:text-accent">{e.name}</Link>
                    <span className="block text-sm text-muted">{e.company} · {e.country}</span>
                  </td>
                  <td className="px-4 py-3.5 text-ink-2">{e.service}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-ink-2">{e.budget || <span className="text-muted">—</span>}</td>
                  <td className="max-w-[18rem] px-4 py-3.5 text-muted"><span className="line-clamp-2">{e.message}</span></td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted">{formatWhen(e.created_at)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
