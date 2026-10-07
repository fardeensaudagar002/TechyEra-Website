import { notFound } from "next/navigation";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { TechnologyBadge } from "@/components/sections/TechnologySection";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { getIndustry } from "@/data/industries";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/case-studies/${c.slug}` });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const industry = getIndustry(c.industry);
  const related = caseStudies.filter((x) => x.slug !== c.slug && (x.industry === c.industry || x.services.some((s) => c.services.includes(s)))).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Case Studies", href: "/case-studies" }, { name: c.title, href: `/case-studies/${c.slug}` }]}
        title={c.title}
        lede={c.summary}
      />

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:py-20">
        <article className="min-w-0 space-y-14">
          {c.illustrative && (
            <p className="rounded-[10px] border border-line bg-mist p-4 text-[0.9375rem] text-muted">
              Illustrative engagement — describes the type of work we deliver; client details are withheld.
            </p>
          )}

          <Block title="Business challenge">
            <p className="text-[1.0625rem] leading-relaxed">{c.challenge}</p>
          </Block>

          <div className="grid gap-10 md:grid-cols-2">
            <Block title="Existing environment"><Bullets items={c.existingEnvironment} /></Block>
            <Block title="Technical challenges"><Bullets items={c.techChallenges} /></Block>
          </div>

          <Block title="Our approach">
            <ol className="space-y-4">
              {c.approach.map((a, i) => (
                <li key={a} className="flex gap-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent-strong">{i + 1}</span>
                  <span className="pt-0.5 text-[1rem] leading-relaxed">{a}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Architecture overview">
            <div className="blueprint rounded-[14px] border border-line bg-mist p-4 md:p-6">
              <ol className="space-y-0">
                {c.architecture.map((l, i) => (
                  <li key={l.layer}>
                    <div className="grid gap-1 rounded-[10px] border border-line bg-white px-5 py-4 shadow-[var(--shadow-card)] sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4">
                      <span className="text-sm font-semibold text-accent">{l.layer}</span>
                      <span className="text-[0.9688rem] text-ink">{l.components}</span>
                    </div>
                    {i < c.architecture.length - 1 && <div aria-hidden className="mx-auto h-5 w-px border-l-2 border-dashed border-accent-line" />}
                  </li>
                ))}
              </ol>
            </div>
          </Block>

          <Block title="Technologies used">
            <ul className="flex flex-wrap gap-2">{c.technologies.map((t) => <li key={t}><TechnologyBadge name={t} /></li>)}</ul>
          </Block>

          <Block title="Implementation">
            <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.implementation.map((p, i) => (
                <li key={p.phase} className="relative border-t-2 border-ink pt-4">
                  <span className="text-sm font-semibold text-muted">Phase {i + 1}</span>
                  <p className="mt-1 font-semibold text-ink">{p.phase}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.detail}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Results">
            <ul className="grid gap-3 sm:grid-cols-2">
              {c.results.map((r) => (
                <li key={r} className="flex gap-3 rounded-[10px] border border-line p-4 text-[0.9688rem] font-medium text-ink">
                  <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-success" />{r}
                </li>
              ))}
            </ul>
          </Block>

          <section className="rounded-[14px] bg-ink p-8 text-white md:p-10">
            <h2 className="text-[1.25rem] text-white">Business impact</h2>
            <p className="mt-3 text-[1.125rem] leading-relaxed text-white/80">{c.businessImpact}</p>
          </section>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Engagement summary">
          <dl className="divide-y divide-line rounded-[12px] border border-line bg-white text-[0.9375rem]">
            <Meta label="Client">{c.client}</Meta>
            <Meta label="Industry">
              {industry && <Link href={`/industries/${industry.slug}`} className="text-accent hover:underline">{industry.title}</Link>}
            </Meta>
            <Meta label="Services">
              <ul className="space-y-1">
                {c.services.map((s) => {
                  const svc = getService(s);
                  return svc ? <li key={s}><Link href={`/services/${s}`} className="text-accent hover:underline">{svc.title}</Link></li> : null;
                })}
              </ul>
            </Meta>
            <Meta label="Technology">{c.technologies.join(", ")}</Meta>
          </dl>
          <Link href="/contact" className="mt-4 flex h-11 items-center justify-center rounded-[8px] bg-accent font-semibold text-white hover:bg-accent-strong">
            Discuss a similar project
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section border-t border-line bg-mist" aria-labelledby="related-heading">
          <div className="container-x">
            <h2 id="related-heading" className="h-section mb-10">Related case studies</h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <li key={r.slug}><CaseStudyCard study={r} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-[1.5rem]">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[1rem] leading-relaxed"><span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{i}</li>
      ))}
    </ul>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <dt className="text-[0.8125rem] font-semibold text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  );
}
