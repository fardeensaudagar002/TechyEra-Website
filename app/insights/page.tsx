import { PageHero } from "@/components/sections/PageHero";
import { InsightsExplorer } from "@/components/filters/InsightsExplorer";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles on AI, data engineering, cloud, software engineering, DevOps, digital transformation and technology strategy from Techyera Consultancy Services.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", href: "/insights" }]}
        title="Insights"
        lede="Practical perspectives on AI, data, cloud and software engineering — written by the practices that do the work."
      />
      <section className="section pt-12" aria-label="Articles">
        <div className="container-x">
          <InsightsExplorer />
        </div>
      </section>
      <CTASection title="Want to go deeper on a topic?" text="Our architects are happy to walk through how these ideas apply to your systems and roadmap." />
    </>
  );
}
