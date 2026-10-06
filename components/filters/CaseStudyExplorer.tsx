"use client";

import { useMemo, useState } from "react";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { FilterSelect } from "./FilterSelect";
import { EmptyState } from "./EmptyState";
import { buttonClass } from "@/components/ui/Button";
import { caseStudies } from "@/data/case-studies";
import { industries } from "@/data/industries";
import { services } from "@/data/services";

export function CaseStudyExplorer() {
  const [industry, setIndustry] = useState("");
  const [tech, setTech] = useState("");
  const [service, setService] = useState("");

  const industryOpts = useMemo(
    () => industries.filter((i) => caseStudies.some((c) => c.industry === i.slug)).map((i) => ({ value: i.slug, label: i.title })),
    [],
  );
  const techOpts = useMemo(
    () => Array.from(new Set(caseStudies.flatMap((c) => c.technologies))).sort().map((t) => ({ value: t, label: t })),
    [],
  );
  const serviceOpts = services.map((s) => ({ value: s.slug, label: s.title }));

  const results = caseStudies.filter(
    (c) => (!industry || c.industry === industry) && (!tech || c.technologies.includes(tech)) && (!service || c.services.includes(service)),
  );
  const filtered = industry || tech || service;
  const clear = () => { setIndustry(""); setTech(""); setService(""); };

  return (
    <div>
      <div className="mb-10 grid gap-4 rounded-[12px] border border-line bg-white p-5 sm:grid-cols-3 md:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <FilterSelect id="f-industry" label="Industry" value={industry} onChange={setIndustry} options={industryOpts} allLabel="All industries" />
        <FilterSelect id="f-tech" label="Technology" value={tech} onChange={setTech} options={techOpts} allLabel="All technologies" />
        <FilterSelect id="f-service" label="Service" value={service} onChange={setService} options={serviceOpts} allLabel="All services" />
        <button type="button" onClick={clear} disabled={!filtered} className={buttonClass("secondary", "md", "sm:col-span-3 lg:col-span-1")}>Clear filters</button>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        Showing {results.length} of {caseStudies.length} case studies
      </p>

      {results.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => <li key={c.slug}><CaseStudyCard study={c} headingLevel="h2" /></li>)}
        </ul>
      ) : (
        <EmptyState
          title="No case studies match these filters"
          text="Try removing a filter, or contact us to discuss a similar challenge."
          action={<button type="button" onClick={clear} className={buttonClass("dark")}>Clear filters</button>}
        />
      )}
    </div>
  );
}
