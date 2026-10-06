import type { ReactNode } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { PageHero } from "./PageHero";
import { formatDate } from "@/lib/utils";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

export function LegalPage({ title, path, updated, intro, children }: { title: string; path: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} lede={intro} />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[15rem_1fr] lg:gap-16 lg:py-20">
        <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === path ? "page" : undefined}
                  className={`block rounded-[7px] px-3 py-2 text-sm font-medium ${l.href === path ? "bg-mist text-ink" : "text-muted hover:text-accent"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="legal max-w-[46rem] text-[1rem] text-ink-2">
          <p className="text-sm text-muted">Last updated: <time dateTime={updated}>{formatDate(updated)}</time></p>
          <p className="mt-5 flex items-start gap-3 rounded-[10px] border border-line bg-mist p-4 text-[0.9375rem]">
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            This document is provided as a working draft and should be reviewed by qualified legal counsel before it is relied upon.
          </p>
          {children}
        </article>
      </div>
    </>
  );
}
