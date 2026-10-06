import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JobExplorer } from "@/components/filters/JobExplorer";
import { CoverArt } from "@/components/visuals/CoverArt";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { lifeMoments, workBenefits } from "@/data/company";
import { jobs } from "@/data/jobs";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career with Techyera. Explore open roles in software engineering, data, cloud, quality engineering and consulting in India.",
  path: "/careers",
});

const hiringSteps = [
  { title: "Apply", text: "Submit your application online. We read every one." },
  { title: "Intro call", text: "A 30-minute conversation about your experience and goals." },
  { title: "Technical round", text: "A practical discussion or exercise based on real work — no trick questions." },
  { title: "Team conversation", text: "Meet the people you’d work with and ask anything." },
  { title: "Offer", text: "A clear offer and a planned first week." },
];

// Replace `image` with paths in /public/careers once real photography is available.
const lifeTiles: { image?: string; motif: "people" | "grid" | "steps" | "rings" | "network" }[] = [
  { motif: "people" }, { motif: "grid" }, { motif: "steps" }, { motif: "rings" }, { motif: "network" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", href: "/careers" }]}
        title="Build Your Career With Techyera"
        lede="Join a team of engineers, architects, analysts, and technology professionals working on meaningful digital solutions."
        actions={<><ButtonLink href="#open-positions" size="lg" arrow>View Open Positions</ButtonLink><ButtonLink href="#life" size="lg" variant="secondary">Life at Techyera</ButtonLink></>}
        aside={
          <dl className="hidden grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-line bg-line lg:grid">
            <div className="bg-white p-5"><dt className="text-sm text-muted">Open roles</dt><dd className="mt-1 text-[2rem] font-semibold leading-none text-ink">{jobs.length}</dd></div>
            <div className="bg-white p-5"><dt className="text-sm text-muted">Work mode</dt><dd className="mt-1 text-[1.25rem] font-semibold leading-tight text-ink">Hybrid</dd></div>
          </dl>
        }
      />

      {/* Why work with us */}
      <section className="section" aria-labelledby="why-work-heading">
        <div className="container-x">
          <SectionHeader id="why-work-heading" title="Why Work With Us" intro="We hire curious people and give them real problems, good mentors and the room to grow." />
          <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {workBenefits.map((b) => (
              <li key={b.title} className="bg-white p-7">
                <IconTile name={b.icon} size="sm" />
                <h3 className="mt-5 text-[1.0625rem]">{b.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Life at Techyera */}
      <section id="life" className="section scroll-mt-20 bg-mist" aria-labelledby="life-heading">
        <div className="container-x">
          <SectionHeader id="life-heading" title="Life at Techyera" intro="How we work day to day: building together, learning constantly and celebrating progress." />
          <ul className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
            {lifeMoments.map((m, i) => {
              const tile = lifeTiles[i];
              return (
                <li key={m.title} className={cn("group relative overflow-hidden rounded-[14px] border border-line bg-white", i === 0 && "sm:col-span-2 lg:row-span-2")}>
                  {tile.image ? (
                    <Image src={tile.image} alt={m.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <CoverArt seed={`life-${i}`} motif={tile.motif} tone={i === 0 ? "dark" : "light"} className="absolute inset-0" />
                  )}
                  <div className={cn("absolute inset-x-0 bottom-0 p-5", i === 0 ? "bg-gradient-to-t from-ink/90 to-transparent pt-16" : "bg-gradient-to-t from-white via-white/95 to-transparent pt-14")}>
                    <h3 className={cn("text-[1.0625rem]", i === 0 && "text-[1.375rem] text-white")}>{m.title}</h3>
                    <p className={cn("mt-1 text-[0.9063rem]", i === 0 ? "text-white/75" : "text-muted")}>{m.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="section scroll-mt-20" aria-labelledby="positions-heading">
        <div className="container-x">
          <SectionHeader id="positions-heading" title="Open Positions" intro="Find a role that matches your skills. Every application is reviewed by our talent and engineering teams." />
          <JobExplorer />
        </div>
      </section>

      {/* Hiring process */}
      <section className="section border-t border-line bg-white" aria-labelledby="process-heading">
        <div className="container-x">
          <SectionHeader id="process-heading" title="Our hiring process" intro="Straightforward and respectful of your time. Most processes complete within two to three weeks." />
          <ol className="grid gap-6 md:grid-cols-5">
            {hiringSteps.map((s, i) => (
              <li key={s.title} className="relative border-t-2 border-line pt-5 first:border-ink">
                <span className="text-sm font-semibold text-accent">Step {i + 1}</span>
                <h3 className="mt-1 text-[1.0625rem]">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Don’t see the right role?"
        text={`We’re always glad to hear from talented engineers, analysts and consultants. Send your resume to ${site.contact.careersEmail} and tell us what you’d like to work on.`}
        primary={{ label: "Email your resume", href: `mailto:${site.contact.careersEmail}` }}
        secondary={{ label: "Learn about Techyera", href: "/about" }}
      />
    </>
  );
}
