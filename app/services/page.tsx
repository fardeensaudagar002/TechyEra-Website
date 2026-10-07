import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { InPageNav } from "@/components/sections/InPageNav";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
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
                <h2 id={`${s.slug}-title`} className="h-section mt-6">
                  <Link href={`/services/${s.slug}`} className="hover:text-accent-strong">{s.title}</Link>
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed">{s.description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <ButtonLink href={`/contact?service=${s.slug}#contact-form`} variant="dark" arrow>Discuss your project</ButtonLink>
                  <ArrowLink href={`/services/${s.slug}`} srLabel={`about ${s.title}`}>Learn more</ArrowLink>
                  {related[0] && <ArrowLink href={`/solutions#${related[0].slug}`}>Related solution</ArrowLink>}
                </div>
              </div>

              <ServiceDetails service={s} />
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
