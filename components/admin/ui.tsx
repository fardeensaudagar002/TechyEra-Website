import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  new: "bg-accent-soft text-accent-strong",
  reviewing: "bg-[#fff4d6] text-[#7a5200]",
  "in discussion": "bg-[#fff4d6] text-[#7a5200]",
  shortlisted: "bg-success-soft text-success",
  interview: "bg-success-soft text-success",
  contacted: "bg-success-soft text-success",
  hired: "bg-success text-white",
  rejected: "bg-mist-2 text-muted",
  closed: "bg-mist-2 text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold capitalize", tones[status] ?? "bg-mist text-ink-2")}>{status}</span>;
}

export const adminInput = "h-10 rounded-[8px] border border-line-strong bg-white px-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

export function FilterBar({ children, resetHref, exportHref }: { children: ReactNode; resetHref: string; exportHref: string }) {
  return (
    <form method="get" className="mb-5 flex flex-wrap items-end gap-3 rounded-[12px] border border-line bg-white p-4">
      {children}
      <button type="submit" className="h-10 rounded-[8px] bg-ink px-4 text-sm font-semibold text-white hover:bg-accent">Apply</button>
      <Link href={resetHref} className="inline-flex h-10 items-center px-2 text-sm font-semibold text-muted hover:text-ink">Reset</Link>
      <a href={exportHref} className="ml-auto inline-flex h-10 items-center rounded-[8px] border border-line-strong px-4 text-sm font-semibold text-ink hover:border-ink">Download CSV</a>
    </form>
  );
}

export function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-[0.8125rem] font-semibold text-ink">
      {label}
      {children}
    </label>
  );
}

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[12px] border border-dashed border-line-strong bg-white px-6 py-16 text-center">
      <p className="text-[1.125rem] font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-[0.9375rem] text-muted">{text}</p>
    </div>
  );
}

export function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-3.5 last:border-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-[0.9688rem] text-ink">{children || <span className="text-muted">Not provided</span>}</dd>
    </div>
  );
}
