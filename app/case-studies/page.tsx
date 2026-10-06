import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyExplorer } from "@/components/filters/CaseStudyExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description: "How Techyera approaches data platform modernization, cloud-native engineering, generative AI, predictive maintenance and quality engineering challenges.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Case Studies", href: "/case-studies" }]}
        title="Case Studies"
        lede="A closer look at how we take on modernization, data, cloud and AI challenges — the context, our approach, the architecture and the results."
      />
      <section className="section bg-mist" aria-label="Case study library">
        <div className="container-x">
          <p className="mb-8 flex items-start gap-3 rounded-[10px] border border-accent-line/70 bg-white p-4 text-[0.9375rem] text-ink-2">
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            The engagements below are illustrative and describe the type of work we deliver. Client names are not disclosed, and named client stories will be published with each client’s approval.
          </p>
          <CaseStudyExplorer />
        </div>
      </section>
      <CTASection title="Facing a similar challenge?" />
    </>
  );
}
