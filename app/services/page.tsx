import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { InPageNav } from "@/components/sections/InPageNav";
import { CTASection } from "@/components/sections/CTASection";
import { TechnologyBadge } from "@/components/sections/TechnologySection";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Technology Services",
  description:
    "Software engineering, data & analytics, cloud & DevOps, AI & machine learning, digital transformation and quality engineering services from Techyera Consultancy Services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        title="Technology Services That Create Business Impact"
        lede="From strategy and architecture to engineering, testing and operations — six practices that work independently or together to deliver outcomes you can measure."
        actions={<><ButtonLink href="/contact" size="lg" arrow>Talk to Our Experts</ButtonLink><ButtonLink href="/solutions" size="lg" variant="secondary">Browse solutions</ButtonLink></>}
      />
      <InPageNav label="Services" items={services.map((s) => ({ id: s.slug, label: s.shortTitle }))} />

      {services.map((s, idx) => {
        const related = solutions.filter((x) => x.relatedService === s.slug).slice(0, 2);
        return (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className={cn("section scroll-mt-28", idx % 2 === 1 && "bg-mist")}>
            <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
              <div className="lg:sticky lg:top-36 lg:self-start">
                <IconTile name={s.icon} />
                <h2 id={`${s.slug}-title`} className="h-section mt-6">{s.title}</h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed">{s.description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <ButtonLink href="/contact" variant="dark" arrow>Discuss your project</ButtonLink>
                  {related[0] && <ArrowLink href={`/solutions#${related[0].slug}`}>Related solution</ArrowLink>}
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[1.125rem]">Capabilities</h3>
                  <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-center gap-3 border-b border-line py-3.5 text-[1rem] font-medium text-ink">
                        <Check aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[1.125rem]">Technologies</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.technologies.map((t) => <li key={t}><TechnologyBadge name={t} /></li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[1.125rem]">Business benefits</h3>
                  <ul className="mt-5 grid gap-4 md:grid-cols-3">
                    {s.benefits.map((b) => (
                      <li key={b.title} className="rounded-[10px] border border-line bg-white p-5">
                        <p className="font-semibold text-ink">{b.title}</p>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{b.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Not sure which service fits?"
        text="Tell us about the problem you’re solving. We’ll recommend the right mix of capabilities — and be honest if we’re not the right partner."
      />
    </>
  );
}
