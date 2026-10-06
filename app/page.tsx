import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon, IconTile } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/case-studies";
import { sortedArticles } from "@/data/insights";
import { jobs } from "@/data/jobs";
import { differentiators } from "@/data/company";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Techyera Consultancy Services | Software & Technology Solutions",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const latest = sortedArticles().slice(0, 4);
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[linear-gradient(180deg,#f6f8fd_0%,#ffffff_85%)]" />
        <div className="container-x relative grid items-center gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-2 shadow-[var(--shadow-card)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {site.tagline}
            </p>
            <h1 className="display mt-7 max-w-[14ch]">Transforming Ideas Into Digital Solutions</h1>
            <p className="lede mt-6 max-w-[34rem]">
              Techyera Consultancy Services helps organizations build, modernize, and scale technology solutions through software engineering, cloud,
              data, AI, and digital transformation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/services" size="lg" arrow>Explore Our Services</ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary">Talk to Our Experts</ButtonLink>
            </div>
            <ul className="mt-12 grid max-w-[34rem] gap-4 border-t border-line pt-6 text-sm text-muted sm:grid-cols-3 sm:gap-6">
              <li><span className="block text-[0.9375rem] font-semibold text-ink">Engineering-led</span>Architects and engineers on every engagement</li>
              <li><span className="block text-[0.9375rem] font-semibold text-ink">Outcome-focused</span>Work tied to measurable business goals</li>
              <li><span className="block text-[0.9375rem] font-semibold text-ink">Global delivery</span>India-based teams for clients worldwide</li>
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      <ClientStrip />

      {/* ---------------- About snapshot ---------------- */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 id="about-heading" className="h-section max-w-[18ch]">Technology Expertise That Moves Business Forward</h2>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
              <p>
                Techyera helps organizations solve complex technology problems — the legacy platform that slows every release, the data nobody fully
                trusts, the AI initiative that never left the pilot stage.
              </p>
              <p>
                We bring engineering depth and consulting discipline together: understanding the business problem first, designing the right
                architecture, and building modern digital platforms that your teams can run and extend with confidence.
              </p>
            </div>
            <ButtonLink href="/about" variant="dark" className="mt-9" arrow>Learn More About Us</ButtonLink>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid overflow-hidden rounded-[12px] border border-line sm:grid-cols-2">
              {services.map((s, i) => (
                <li key={s.slug} className={`border-line ${i < services.length - 1 ? "border-b" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} ${i >= services.length - 2 ? "sm:border-b-0" : ""}`}>
                  <Link href={`/services#${s.slug}`} className="group flex items-center gap-4 p-5 transition-colors hover:bg-mist md:p-6">
                    <IconTile name={s.icon} size="sm" />
                    <span className="flex-1 text-[1rem] font-semibold text-ink">{s.title}</span>
                    <ArrowRight aria-hidden className="h-4 w-4 text-line-strong transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section bg-mist" aria-labelledby="services-heading">
        <div className="container-x">
          <SectionHeader
            id="services-heading"
            title="What We Do"
            intro="Six practices, one delivery model. Engage a single capability or bring several together for end-to-end transformation."
            action={<ArrowLink href="/services">View all services</ArrowLink>}
          />
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line shadow-[var(--shadow-card)] md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}><ServiceCard service={s} /></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Industries ---------------- */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container-x">
          <SectionHeader
            id="industries-heading"
            title="Technology Built for Your Industry"
            intro="Every sector has its own regulations, systems and customer expectations. We bring patterns that work in your context."
            action={<ArrowLink href="/industries">Explore industries</ArrowLink>}
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {industries.map((ind) => (
              <li key={ind.slug}><IndustryCard industry={ind} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Why Techyera ---------------- */}
      <section className="section bg-mist" aria-labelledby="why-heading">
        <div className="container-x">
          <SectionHeader
            id="why-heading"
            title="Why Organizations Choose Techyera"
            intro="We are measured by what our software does for your business after launch — so that is what we design for from the first conversation."
          />
          <StatsSection className="mb-14" />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <li key={d.title} className="border-t border-line-strong pt-6">
                <Icon name={d.icon} className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-[1.0625rem]">{d.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TechnologySection />

      {/* ---------------- Case studies ---------------- */}
      <section className="section" aria-labelledby="cases-heading">
        <div className="container-x">
          <SectionHeader
            id="cases-heading"
            title="Case Studies"
            intro="How we approach typical modernization, data and AI challenges — from first assessment to measurable results."
            action={<ArrowLink href="/case-studies">All case studies</ArrowLink>}
          />
          <ul className="grid gap-6 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((c) => (
              <li key={c.slug}><CaseStudyCard study={c} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Insights ---------------- */}
      <section className="section border-t border-line" aria-labelledby="insights-heading">
        <div className="container-x">
          <SectionHeader
            id="insights-heading"
            title="Latest Insights"
            intro="Practical perspectives from our engineering, cloud and data teams."
            action={<ArrowLink href="/insights">View all insights</ArrowLink>}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+3)]:hidden sm:[&>li:nth-child(n+3)]:block">
            {latest.map((a) => (
              <li key={a.slug}><ArticleCard article={a} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Careers CTA ---------------- */}
      <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28" aria-labelledby="careers-heading">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.08)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 id="careers-heading" className="h-section text-white">Build Your Future With Techyera</h2>
            <p className="mt-5 max-w-[32rem] text-[1.125rem] leading-relaxed text-white/70">
              Work with passionate engineers, solve meaningful technology challenges, and grow your career in a collaborative environment.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/careers" size="lg" variant="light" arrow>Explore Careers</ButtonLink>
              <ButtonLink href="/careers#open-positions" size="lg" variant="ghost-light">{jobs.length} open positions</ButtonLink>
            </div>
          </div>
          <ul className="divide-y divide-white/10 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.03]">
            {jobs.slice(0, 4).map((j) => (
              <li key={j.slug}>
                <Link href={`/careers/${j.slug}`} className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.05]">
                  <span>
                    <span className="block text-[1.0625rem] font-semibold text-white">{j.title}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/60">
                      <MapPin aria-hidden className="h-3.5 w-3.5" />{j.location} / {j.workMode}<span aria-hidden className="mx-1">|</span>{j.experience}
                    </span>
                  </span>
                  <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
