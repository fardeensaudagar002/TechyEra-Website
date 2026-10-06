"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { JobCard } from "@/components/cards/JobCard";
import { FilterSelect } from "./FilterSelect";
import { EmptyState } from "./EmptyState";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { jobFilterOptions, jobs } from "@/data/jobs";
import { site } from "@/data/site";

const toOpts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

export function JobExplorer() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (!department || j.department === department) &&
          (!experience || j.experienceBand === experience) &&
          (!location || `${j.location} / ${j.workMode}` === location) &&
          (!type || j.employmentType === type) &&
          (!q || `${j.title} ${j.department} ${j.skills.join(" ")} ${j.summary}`.toLowerCase().includes(q)),
      ),
    [q, department, experience, location, type],
  );
  const active = !!(q || department || experience || location || type);
  const clear = () => { setQuery(""); setDepartment(""); setExperience(""); setLocation(""); setType(""); };

  return (
    <div>
      <div className="rounded-[14px] border border-line bg-white p-5 md:p-6">
        <div className="relative">
          <label htmlFor="job-search" className="sr-only">Search jobs by title or skill</label>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            id="job-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title or skill, e.g. Java, Spark, React"
            className="h-12 w-full rounded-[8px] border border-line-strong bg-white pl-12 pr-11 text-base text-ink placeholder:text-[#8a94a8] focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-mist">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect id="j-dept" label="Department" value={department} onChange={setDepartment} options={toOpts(jobFilterOptions.department)} allLabel="All departments" />
          <FilterSelect id="j-exp" label="Experience" value={experience} onChange={setExperience} options={toOpts(jobFilterOptions.experience)} allLabel="Any experience" />
          <FilterSelect id="j-loc" label="Location" value={location} onChange={setLocation} options={toOpts(jobFilterOptions.location)} allLabel="All locations" />
          <FilterSelect id="j-type" label="Employment type" value={type} onChange={setType} options={toOpts(jobFilterOptions.employmentType)} allLabel="All types" />
        </div>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between gap-4">
        <p className="text-[0.9375rem] text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "open position" : "open positions"}
        </p>
        {active && <button type="button" onClick={clear} className="text-sm font-semibold text-accent hover:text-accent-strong">Clear all filters</button>}
      </div>

      {results.length ? (
        <ul className="space-y-4">
          {results.map((j) => <li key={j.slug}><JobCard job={j} /></li>)}
        </ul>
      ) : (
        <EmptyState
          title="No roles match your search"
          text={<>Try different filters, or send your resume to <a className="font-semibold text-accent" href={`mailto:${site.contact.careersEmail}`}>{site.contact.careersEmail}</a> and we’ll contact you when a suitable role opens.</>}
          action={<div className="flex flex-wrap justify-center gap-3"><button type="button" onClick={clear} className={buttonClass("dark")}>Clear filters</button><ButtonLink href={`mailto:${site.contact.careersEmail}`} variant="secondary">Send your resume</ButtonLink></div>}
        />
      )}
    </div>
  );
}
