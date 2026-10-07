import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { getIndustry, industries } from "@/data/industries";
import { getService } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params) {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  return pageMetadata({ title: `Technology Solutions for ${ind.title}`, description: `${ind.summary} ${ind.description}`.slice(0, 300), path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: Params) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;
  const svcs = ind.relatedServices.map(getService).filter((s) => s !== undefined);
  // engagements in this industry first, then ones using the same services
  const studies = [
    ...caseStudies.filter((c) => c.industry === ind.slug),
    ...caseStudies.filter((c) => c.industry !== ind.slug && c.services.some((s) => ind.relatedServices.includes(s))),
  ].slice(0, 3);
  const others = industries.filter((x) => x.slug !== ind.slug);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }, { name: ind.title, href: path }]}
        title={`Technology for ${ind.title}`}
        lede={ind.description}
        actions={<><ButtonLink href="/contact" size="lg" arrow>Talk to an industry expert</ButtonLink><ButtonLink href="/industries" size="lg" variant="secondary">All industries</ButtonLink></>}
      />

      <section className="section" aria-labelledby="help-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="help-heading" className="h-section">Where we help</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed">{ind.summary}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ind.focusAreas.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-[10px] border border-line bg-white p-5 text-[1rem] font-semibold text-ink">
                <Icon name={ind.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {svcs.length > 0 && (
        <section className="section bg-mist" aria-labelledby="services-heading">
          <div className="container-x">
            <SectionHeader id="services-heading" title={`Services for ${ind.shortTitle}`} intro="The practices we most often bring together for organizations in this sector." action={<ArrowLink href="/services">All services</ArrowLink>} />
            <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line shadow-[var(--shadow-card)] md:grid-cols-2 lg:grid-cols-3">
              {svcs.map((s) => <li key={s.slug}><ServiceCard service={s} /></li>)}
            </ul>
          </div>
        </section>
      )}

      {studies.length > 0 && (
        <section className="section" aria-labelledby="cases-heading">
          <div className="container-x">
            <SectionHeader id="cases-heading" title={studies[0].industry === ind.slug ? "Example engagements" : "Related engagements"} action={<ArrowLink href="/case-studies">All case studies</ArrowLink>} />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((c) => <li key={c.slug}><CaseStudyCard study={c} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-mist py-14" aria-labelledby="other-heading">
        <div className="container-x">
          <h2 id="other-heading" className="text-[1.25rem]">Other industries</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="group inline-flex h-10 items-center gap-2 rounded-[8px] border border-line bg-white px-4 text-sm font-medium text-ink-2 hover:border-accent hover:text-accent">
                  {o.title}
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 text-line-strong group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={`Working in ${ind.shortTitle}?`}
        text="We design for your sector’s regulations, security needs and existing systems from day one. Let’s talk about your context."
      />
      <JsonLd data={serviceSchema({ name: `Technology services for ${ind.title}`, serviceType: "IT consulting and software engineering", description: ind.description, path, audience: ind.title })} />
    </>
  );
}
