import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { industries } from "@/data/industries";
import { getService } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Technology solutions for banking, healthcare, retail, manufacturing, insurance, telecom, logistics, travel, technology and energy organizations.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        title="Technology Built for Your Industry"
        lede="We combine engineering depth with an understanding of how each sector works — its regulations, legacy systems, customers and competitive pressures."
        actions={<ButtonLink href="/contact" size="lg" arrow>Talk to an industry expert</ButtonLink>}
      />

      <section className="section bg-mist" aria-label="Industries we serve">
        <div className="container-x">
          <nav aria-label="Jump to industry" className="mb-12">
            <ul className="flex flex-wrap gap-2">
              {industries.map((i) => (
                <li key={i.slug}>
                  <a href={`#${i.slug}`} className="inline-flex h-9 items-center rounded-[7px] border border-line bg-white px-3.5 text-sm font-medium text-ink-2 hover:border-accent hover:text-accent">
                    {i.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-6 lg:grid-cols-2">
            {industries.map((ind) => {
              const study = caseStudies.find((c) => c.industry === ind.slug);
              return (
                <article key={ind.slug} id={ind.slug} className="scroll-mt-28 flex flex-col rounded-[14px] border border-line bg-white p-7 md:p-9">
                  <div className="flex items-start gap-4">
                    <IconTile name={ind.icon} />
                    <div>
                      <h2 className="text-[1.5rem] leading-tight">
                        <Link href={`/industries/${ind.slug}`} className="hover:text-accent-strong">{ind.title}</Link>
                      </h2>
                      <p className="mt-1.5 text-[0.9375rem] text-muted">{ind.summary}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[1rem] leading-relaxed">{ind.description}</p>
                  <h3 className="mt-7 text-sm font-semibold text-ink">Where we help</h3>
                  <ul className="mt-3 grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
                    {ind.focusAreas.map((f) => (
                      <li key={f} className="flex gap-2.5"><span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5 text-sm">
                      <span className="mr-1 text-muted">Related services:</span>
                      {ind.relatedServices.map((slug) => {
                        const s = getService(slug)!;
                        return (
                          <Link key={slug} href={`/services/${slug}`} className="rounded-[6px] bg-mist px-2.5 py-1 font-medium text-ink-2 hover:bg-accent-soft hover:text-accent-strong">
                            {s.shortTitle}
                          </Link>
                        );
                      })}
                      <span className="ml-auto flex flex-wrap gap-x-5 gap-y-1">
                        {study && (
                          <Link href={`/case-studies/${study.slug}`} className="font-semibold text-accent hover:text-accent-strong">
                            See an example engagement
                          </Link>
                        )}
                        <Link href={`/industries/${ind.slug}`} className="font-semibold text-accent hover:text-accent-strong">
                          Learn more<span className="sr-only"> about {ind.title}</span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection title="Working in a regulated or complex industry?" text="We design for compliance, security and integration with existing systems from day one. Let’s talk about your context." />
    </>
  );
}
