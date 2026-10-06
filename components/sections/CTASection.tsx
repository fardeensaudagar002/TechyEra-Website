import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

interface Props {
  title?: ReactNode;
  text?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTASection({
  title = "Have a Technology Challenge?",
  text = "Let’s discuss how Techyera can help you build, modernize, and scale your technology ecosystem.",
  primary = { label: "Talk to Our Experts", href: "/contact" },
  secondary = { label: "Contact Us", href: "/contact#contact-form" },
}: Props) {
  return (
    <section className="section bg-white" aria-labelledby="cta-heading">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[20px] border border-accent-line/70 bg-accent-soft px-6 py-14 md:px-14 md:py-20">
          <div aria-hidden className="blueprint absolute inset-0 [mask-image:radial-gradient(70%_90%_at_100%_50%,black,transparent)]" />
          <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className="absolute right-6 top-0 hidden h-full w-[38%] lg:block" fill="none">
            <path d="M40 150 C 120 150, 120 60, 200 60 S 280 150, 360 150" stroke="var(--color-accent)" strokeOpacity=".35" strokeWidth="1.5" />
            <path d="M40 150 C 120 150, 120 240, 200 240 S 280 150, 360 150" stroke="var(--color-accent)" strokeOpacity=".35" strokeWidth="1.5" />
            <path d="M40 150 H 360" stroke="var(--color-accent)" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash motion-reduce:hidden" />
            {[[40, 150], [200, 60], [200, 240], [200, 150], [360, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 4 ? 9 : 6} fill={i === 4 ? "var(--color-accent)" : "#fff"} stroke="var(--color-accent)" strokeWidth="1.5" />
            ))}
          </svg>
          <div className="relative max-w-2xl lg:max-w-[55%]">
            <h2 id="cta-heading" className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.035em]">{title}</h2>
            <p className="lede mt-5 text-ink-2">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg" arrow>{primary.label}</ButtonLink>
              <ButtonLink href={secondary.href} size="lg" variant="secondary">{secondary.label}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
