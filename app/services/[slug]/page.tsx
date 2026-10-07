import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, services } from "@/data/services";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.title} Services`, description: `${s.summary} ${s.description}`.slice(0, 300), path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const related = solutions.filter((x) => x.relatedService === s.slug);
  const forIndustries = industries.filter((i) => i.relatedServices.includes(s.slug));
  const studies = caseStudies.filter((c) => c.services.includes(s.slug)).slice(0, 3);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }, { name: s.title, href: path }]}
        title={s.title}
        lede={s.description}
        actions={<><ButtonLink href={`/contact?service=${s.slug}#contact-form`} size="lg" arrow>Discuss your project</ButtonLink><ButtonLink href="/services" size="lg" variant="secondary">All services</ButtonLink></>}
      />

      <section className="section" aria-labelledby="what-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="what-heading" className="h-section">What we deliver</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed">{s.summary}</p>
            <ButtonLink href={`/contact?service=${s.slug}#contact-form`} variant="dark" className="mt-8" arrow>Talk to a {s.shortTitle} expert</ButtonLink>
          </div>
          <ServiceDetails service={s} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-mist" aria-labelledby="solutions-heading">
          <div className="container-x">
            <SectionHeader id="solutions-heading" title="How we solve common problems" intro="Typical challenges we address with this service, and the outcome we design for." action={<ArrowLink href="/solutions">All solutions</ArrowLink>} />
            <ul className="grid gap-6 md:grid-cols-2">
              {related.map((x) => (
                <li key={x.slug} className="flex flex-col rounded-[14px] border border-line bg-white p-7 md:p-8">
                  <h3 className="text-[1.3rem] leading-snug">{x.title}</h3>
                  <p className="mt-4 text-sm font-semibold text-ink">The problem</p>
                  <p className="mt-1 text-[0.9688rem] leading-relaxed text-muted">{x.problem}</p>
                  <p className="mt-5 rounded-[10px] bg-accent-soft p-4 text-[0.9688rem] font-medium leading-relaxed text-ink">{x.outcome}</p>
                  <ArrowLink href={`/solutions#${x.slug}`} className="mt-6">See the approach</ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {studies.length > 0 && (
        <section className="section" aria-labelledby="cases-heading">
          <div className="container-x">
            <SectionHeader id="cases-heading" title="Example engagements" action={<ArrowLink href="/case-studies">All case studies</ArrowLink>} />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((c) => <li key={c.slug}><CaseStudyCard study={c} /></li>)}
            </ul>
          </div>
        </section>
      )}

      {forIndustries.length > 0 && (
        <section className="section border-t border-line" aria-labelledby="industries-heading">
          <div className="container-x">
            <SectionHeader id="industries-heading" title="Industries we deliver this for" action={<ArrowLink href="/industries">All industries</ArrowLink>} />
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {forIndustries.map((i) => <li key={i.slug}><IndustryCard industry={i} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-mist py-14" aria-labelledby="other-heading">
        <div className="container-x">
          <h2 id="other-heading" className="text-[1.25rem]">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex h-full items-center gap-3 rounded-[10px] border border-line bg-white p-4 font-semibold text-ink transition-colors hover:border-accent-line">
                  <IconTile name={o.icon} size="sm" />
                  <span className="flex-1 text-[0.9375rem] leading-snug">{o.title}</span>
                  <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-line-strong transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={`Planning a ${s.shortTitle} initiative?`}
        text="Tell us where you are today and what you need to achieve. We’ll suggest a practical first step — and be honest if we’re not the right partner."
      />
      <JsonLd data={serviceSchema({ name: s.title, serviceType: s.title, description: s.description, path })} />
    </>
  );
}
