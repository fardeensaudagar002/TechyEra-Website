import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Building2, CalendarDays, Clock, MapPin, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/ui/JsonLd";
import { JobCard } from "@/components/cards/JobCard";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import { careerBenefits, getJob, jobs } from "@/data/jobs";
import { jobPostingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) return {};
  return pageMetadata({
    title: `${j.title} — ${j.location} / ${j.workMode}`,
    description: `${j.summary} ${j.experience} experience. ${j.employmentType}. Apply to Techyera Consultancy Services.`,
    path: `/careers/${j.slug}`,
  });
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const others = jobs.filter((j) => j.slug !== job.slug).slice(0, 2);

  const facts = [
    { icon: MapPin, label: "Location", value: `${job.location} / ${job.workMode}` },
    { icon: Briefcase, label: "Experience", value: job.experience },
    { icon: Clock, label: "Employment type", value: job.employmentType },
    { icon: Building2, label: "Department", value: job.department },
  ];

  return (
    <>
      <JsonLd data={jobPostingSchema(job)} />

      <section className="border-b border-line bg-white">
        <div className="container-x pb-12 pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Careers", href: "/careers" }, { name: job.title, href: `/careers/${job.slug}` }]} />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-accent">{job.department}</p>
              <h1 className="mt-2 text-[clamp(2.125rem,4.4vw,3.4rem)] leading-[1.06] tracking-[-0.035em]">{job.title}</h1>
              <p className="lede mt-4">{job.summary}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="#apply" size="lg" arrow>Apply Now</ButtonLink>
              <ButtonLink href="/careers#open-positions" size="lg" variant="secondary">All positions</ButtonLink>
            </div>
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-3.5 bg-white p-5">
                <f.icon aria-hidden className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <dt className="text-[0.8125rem] text-muted">{f.label}</dt>
                  <dd className="font-semibold text-ink">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-x grid gap-14 py-16 lg:grid-cols-[1fr_21rem] lg:gap-16 lg:py-20">
        <div className="min-w-0 space-y-12">
          <JobBlock title="About the Role">
            <div className="space-y-4 text-[1.0625rem] leading-relaxed">{job.about.map((p) => <p key={p}>{p}</p>)}</div>
          </JobBlock>
          <JobBlock title="Responsibilities"><List items={job.responsibilities} /></JobBlock>
          <JobBlock title="Required Skills"><List items={job.requiredSkills} /></JobBlock>
          <JobBlock title="Good to Have"><List items={job.goodToHave} muted /></JobBlock>
          <JobBlock title="Qualifications"><List items={job.qualifications} /></JobBlock>
          <JobBlock title="What We Offer">
            <ul className="grid gap-3 sm:grid-cols-2">
              {careerBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-[10px] bg-mist px-4 py-3.5 font-medium text-ink">
                  <Check aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />{b}
                </li>
              ))}
            </ul>
          </JobBlock>

          <section id="apply" className="scroll-mt-24 rounded-[16px] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10" aria-labelledby="apply-heading">
            <h2 id="apply-heading" className="text-[1.75rem]">Apply Now</h2>
            <p className="mb-8 mt-2 text-muted">Applying for <span className="font-semibold text-ink">{job.title}</span> · {job.location} / {job.workMode}</p>
            <CareerApplicationForm jobTitle={job.title} jobSlug={job.slug} />
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Role summary">
          <div className="rounded-[12px] border border-line bg-white p-6">
            <h2 className="text-base">Key skills</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">{job.skills.map((s) => <li key={s}><Badge tone="accent">{s}</Badge></li>)}</ul>
            <div className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-muted">
              <p className="flex items-center gap-2"><CalendarDays aria-hidden className="h-4 w-4" />Posted <time dateTime={job.datePosted}>{formatDate(job.datePosted)}</time></p>
            </div>
            <ButtonLink href="#apply" className="mt-6 w-full">Apply for this role</ButtonLink>
          </div>
          <Link href="/careers#open-positions" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Back to all positions
          </Link>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="section border-t border-line bg-mist" aria-labelledby="other-roles">
          <div className="container-x">
            <h2 id="other-roles" className="h-section mb-10">Other open positions</h2>
            <ul className="space-y-4">{others.map((j) => <li key={j.slug}><JobCard job={j} /></li>)}</ul>
          </div>
        </section>
      )}
    </>
  );
}

function JobBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-[1.5rem]">{title}</h2>
      {children}
    </section>
  );
}

function List({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[1rem] leading-relaxed">
          <span aria-hidden className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${muted ? "bg-line-strong" : "bg-accent"}`} />
          {i}
        </li>
      ))}
    </ul>
  );
}
