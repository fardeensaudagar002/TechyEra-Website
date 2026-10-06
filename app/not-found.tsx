import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

const helpful = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="blueprint absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <svg aria-hidden viewBox="0 0 220 60" className="h-14 w-auto">
          <path d="M20 30 H 90" stroke="var(--color-line-strong)" strokeWidth="2" />
          <path d="M130 30 H 200" stroke="var(--color-line-strong)" strokeWidth="2" />
          <path d="M98 22 l 24 16 M122 22 l -24 16" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="30" r="7" fill="#fff" stroke="var(--color-accent)" strokeWidth="2" />
          <circle cx="200" cy="30" r="7" fill="#fff" stroke="var(--color-line-strong)" strokeWidth="2" />
        </svg>
        <p className="mt-8 text-sm font-semibold text-accent">Error 404</p>
        <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.035em]">This page couldn’t be found</h1>
        <p className="lede mt-4 max-w-lg">The link may be broken or the page may have moved. Head back home or try one of these sections.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg" arrow>Go to homepage</ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">Contact us</ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9375rem]">
          {helpful.map((h) => <li key={h.href}><Link href={h.href} className="font-medium text-ink-2 hover:text-accent">{h.label}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
