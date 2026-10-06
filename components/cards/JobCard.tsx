import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Job } from "@/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative grid gap-5 rounded-[12px] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-accent-line hover:shadow-[var(--shadow-card)] md:grid-cols-[1fr_auto] md:items-center md:p-7">
      <div>
        <p className="text-sm font-semibold text-accent">{job.department}</p>
        <h3 className="mt-1.5 text-[1.25rem]">
          <Link href={`/careers/${job.slug}`} className="after:absolute after:inset-0 after:rounded-[12px] focus-visible:outline-none">{job.title}</Link>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.9063rem] text-muted">
          <li className="inline-flex items-center gap-1.5"><MapPin aria-hidden className="h-4 w-4" />{job.location} / {job.workMode}</li>
          <li className="inline-flex items-center gap-1.5"><Briefcase aria-hidden className="h-4 w-4" />{job.experience}</li>
          <li className="inline-flex items-center gap-1.5"><Clock aria-hidden className="h-4 w-4" />{job.employmentType}</li>
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key skills">
          {job.skills.map((s) => <li key={s}><Badge>{s}</Badge></li>)}
        </ul>
      </div>
      <span className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-[8px] border border-line-strong px-5 text-[0.9375rem] font-semibold text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white md:self-center" aria-hidden>
        View Job <ArrowRight className="h-4 w-4" />
      </span>
    </article>
  );
}
