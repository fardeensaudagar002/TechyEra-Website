import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge, Empty } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/server/session";
import { counts, formatWhen, listApplications, listEnquiries } from "@/lib/server/submissions";

export const metadata = { title: "Overview" };

export default async function AdminHome() {
  await requireAdmin();
  const [c, apps, enqs] = await Promise.all([counts(), listApplications(), listEnquiries()]);
  const cards = [
    { label: "New applications", value: c.applications.fresh, href: "/admin/applications?status=new" },
    { label: "All applications", value: c.applications.total, href: "/admin/applications" },
    { label: "New enquiries", value: c.enquiries.fresh, href: "/admin/enquiries?status=new" },
    { label: "All enquiries", value: c.enquiries.total, href: "/admin/enquiries" },
  ];
  return (
    <>
      <h1 className="text-[1.75rem]">Overview</h1>
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((k) => (
          <li key={k.label}>
            <Link href={k.href} className="block rounded-[12px] border border-line bg-white p-5 hover:border-accent-line">
              <span className="text-sm text-muted">{k.label}</span>
              <span className="mt-1 block text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">{k.value}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Recent title="Latest job applications" href="/admin/applications" empty="Applications submitted on the Careers pages will appear here.">
          {apps.slice(0, 6).map((a) => (
            <Row key={a.id} href={`/admin/applications/${a.id}`} title={a.full_name} sub={a.job_title} when={formatWhen(a.created_at)} status={a.status} />
          ))}
        </Recent>
        <Recent title="Latest enquiries" href="/admin/enquiries" empty="Messages sent through the Contact page will appear here.">
          {enqs.slice(0, 6).map((e) => (
            <Row key={e.id} href={`/admin/enquiries/${e.id}`} title={`${e.name} · ${e.company}`} sub={e.service} when={formatWhen(e.created_at)} status={e.status} />
          ))}
        </Recent>
      </div>
    </>
  );
}

function Recent({ title, href, empty, children }: { title: string; href: string; empty: string; children: React.ReactNode[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[1.125rem]">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-accent">View all <ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </div>
      {children.length ? <ul className="divide-y divide-line overflow-hidden rounded-[12px] border border-line bg-white">{children}</ul> : <Empty title="Nothing yet" text={empty} />}
    </section>
  );
}

function Row({ href, title, sub, when, status }: { href: string; title: string; sub: string; when: string; status: string }) {
  return (
    <li>
      <Link href={href} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-mist/60">
        <span className="min-w-0">
          <span className="block truncate font-semibold text-ink">{title}</span>
          <span className="block truncate text-sm text-muted">{sub} · {when}</span>
        </span>
        <StatusBadge status={status} />
      </Link>
    </li>
  );
}
