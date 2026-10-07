import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { solutions } from "@/data/solutions";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "Business-focused technology solutions: application and legacy modernization, cloud transformation, data platforms, generative AI, automation, DevOps and enterprise integration.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", href: "/solutions" }]}
        title="Solutions Designed Around Business Problems"
        lede="Start from the challenge you’re facing. Each solution shows how we approach it, the technology we typically use and the outcome it is designed to deliver."
        actions={<ButtonLink href="/contact" size="lg" arrow>Discuss your challenge</ButtonLink>}
      />

      <section className="section" aria-label="Solutions">
        <div className="container-x">
          <div className="space-y-6">
            {solutions.map((s) => {
              const svc = getService(s.relatedService);
              return (
                <article key={s.slug} id={s.slug} className="scroll-mt-28 rounded-[14px] border border-line bg-white p-7 md:p-9">
                  <header className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="text-[1.5rem] leading-snug">{s.title}</h2>
                    {svc && <ArrowLink href={`/services/${svc.slug}`} className="text-sm">{svc.title}</ArrowLink>}
                  </header>
                  <ol className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_0.9fr_1fr] lg:gap-10">
                    <Stage n={1} title="Problem"><p>{s.problem}</p></Stage>
                    <Stage n={2} title="Approach">
                      <ul className="space-y-1.5">{s.approach.map((a) => <li key={a} className="flex gap-2"><span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted" />{a}</li>)}</ul>
                    </Stage>
                    <Stage n={3} title="Technology">
                      <ul className="flex flex-wrap gap-1.5">{s.technology.map((t) => <li key={t}><Badge>{t}</Badge></li>)}</ul>
                    </Stage>
                    <Stage n={4} title="Business outcome" highlight><p>{s.outcome}</p></Stage>
                  </ol>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Stage({ n, title, children, highlight }: { n: number; title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <li className={highlight ? "self-start rounded-[10px] bg-accent-soft p-5" : ""}>
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line-strong text-[0.75rem]">{n}</span>
        {title}
      </p>
      <div className={`mt-3 text-[0.9375rem] leading-relaxed ${highlight ? "font-medium text-ink" : "text-ink-2"}`}>{children}</div>
    </li>
  );
}
