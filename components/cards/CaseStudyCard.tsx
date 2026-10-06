import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getIndustry } from "@/data/industries";
import type { CaseStudy } from "@/types";

export function CaseStudyCard({ study, headingLevel = "h3" }: { study: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const industry = getIndustry(study.industry);
  return (
    <article className="group relative flex h-full flex-col rounded-[12px] border border-line bg-white p-7 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <span className="text-sm font-semibold text-accent">{industry?.title}</span>
      <H className="mt-3 text-[1.3rem] leading-snug">
        <Link href={`/case-studies/${study.slug}`} className="after:absolute after:inset-0 after:rounded-[12px] focus-visible:outline-none">
          {study.title}
        </Link>
      </H>
      <dl className="mt-6 flex-1 space-y-4 border-t border-line pt-5 text-[0.9375rem]">
        <div>
          <dt className="font-semibold text-ink">Challenge</dt>
          <dd className="mt-1 text-muted line-clamp-3">{study.challenge}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Solution</dt>
          <dd className="mt-1 text-muted">{study.summary}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Result</dt>
          <dd className="mt-1 text-muted">{study.results.slice(0, 2).join(". ")}.</dd>
        </div>
      </dl>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
        {study.technologies.slice(0, 4).map((t) => <li key={t}><Badge>{t}</Badge></li>)}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent group-hover:text-accent-strong">
          View case study
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        {study.illustrative && <span className="text-[0.75rem] text-muted">Illustrative</span>}
      </div>
    </article>
  );
}
