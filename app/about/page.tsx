import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { approachSteps, values } from "@/data/company";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Techyera Consultancy Services is a technology consulting and software engineering company helping organizations solve complex business challenges through technology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", href: "/about" }]}
        title="Engineering the Future Through Technology"
        lede="We are engineers, architects and consultants who help organizations build, modernize and scale the technology their business depends on."
        actions={<><ButtonLink href="/contact" size="lg" arrow>Talk to Our Experts</ButtonLink><ButtonLink href="/careers" size="lg" variant="secondary">Join our team</ButtonLink></>}
      />

      {/* Who we are */}
      <section className="section" aria-labelledby="who-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <h2 id="who-heading" className="h-section">Who We Are</h2>
          <div className="space-y-5 text-[1.0938rem] leading-[1.75]">
            <p>
              Techyera Consultancy Services is a technology services company based in India, working with organizations that need to move faster
              with technology — whether that means building a new digital product, modernizing a legacy platform, or putting data and AI to work.
            </p>
            <p>
              Our teams cover the full lifecycle: {services.map((s) => s.title.toLowerCase()).slice(0, -1).join(", ")} and {services[services.length - 1].title.toLowerCase()}.
              That breadth lets us take responsibility for outcomes end to end, rather than handing problems from one vendor to the next.
            </p>
            <p>
              We work as an extension of our clients’ teams — transparent about progress, candid about risks and focused on leaving behind systems
              and skills that last.
            </p>
          </div>
        </div>
        <div className="container-x mt-16"><StatsSection /></div>
      </section>

      {/* Mission & vision */}
      <section className="section bg-mist" aria-label="Mission and vision">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { t: "Our Mission", q: "To help organizations solve complex business challenges through technology.", icon: "target" as const },
            { t: "Our Vision", q: "To become a trusted technology partner for organizations building the future.", icon: "eye" as const },
          ].map((m) => (
            <div key={m.t} className="rounded-[16px] border border-line bg-white p-8 md:p-12">
              <Icon name={m.icon} className="h-7 w-7 text-accent" />
              <h2 className="mt-6 text-base font-semibold text-muted">{m.t}</h2>
              <p className="mt-3 text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">{m.q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container-x">
          <SectionHeader id="values-heading" title="Our Values" intro="The principles that guide how we work with clients and with each other." />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="border-t border-line-strong pt-6">
                <Icon name={v.icon} className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-[1.125rem]">{v.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach timeline */}
      <section className="section bg-ink text-white" aria-labelledby="approach-heading">
        <div className="container-x">
          <div className="mb-14 max-w-2xl">
            <h2 id="approach-heading" className="h-section text-white">Our Approach</h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-white/70">
              A delivery lifecycle that keeps business goals, quality and risk in view from the first workshop to continuous improvement.
            </p>
          </div>
          <ol className="relative grid gap-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            <div aria-hidden className="absolute left-[19px] top-0 h-full w-px bg-white/15 md:hidden lg:left-0 lg:top-[19px] lg:block lg:h-px lg:w-full" />
            {approachSteps.map((s, i) => (
              <li key={s.title} className="relative pl-14 md:pl-0">
                <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-ink text-sm font-semibold text-white md:relative">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.25rem] text-white md:mt-6">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-14 inline-flex items-center gap-2 text-sm text-white/60">
            <span aria-hidden className="h-px w-8 bg-white/30" /> Evolve feeds the next Discover — delivery is a continuous loop.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
