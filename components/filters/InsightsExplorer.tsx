"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Search, X } from "lucide-react";
import { ArticleCard, ArticleCover } from "@/components/cards/ArticleCard";
import { EmptyState } from "./EmptyState";
import { buttonClass } from "@/components/ui/Button";
import { articleCategories, sortedArticles } from "@/data/insights";
import { cn, formatDate } from "@/lib/utils";

const PAGE_SIZE = 6;

export function InsightsExplorer() {
  const all = useMemo(() => sortedArticles(), []);
  const featured = all.find((a) => a.featured) ?? all[0];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const listTop = useRef<HTMLDivElement>(null);

  const browsing = !query && !category;
  const pool = browsing ? all.filter((a) => a.slug !== featured.slug) : all;
  const q = query.trim().toLowerCase();
  const results = pool.filter(
    (a) => (!category || a.category === category) && (!q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)),
  );
  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [query, category]);

  const goTo = (p: number) => {
    setPage(p);
    listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col-reverse gap-5">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap">
          {["", ...articleCategories].map((c) => (
            <button
              key={c || "all"}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-9 shrink-0 rounded-[7px] border px-3.5 text-sm font-medium transition-colors",
                category === c ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2 hover:border-line-strong",
              )}
            >
              {c || "All"}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-md">
          <label htmlFor="insight-search" className="sr-only">Search insights</label>
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="insight-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="h-11 w-full rounded-[8px] border border-line-strong bg-white pl-10 pr-10 text-[0.9375rem] text-ink placeholder:text-[#8a94a8] focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* featured */}
      {browsing && page === 1 && (
        <article className="group relative mt-10 grid overflow-hidden rounded-[16px] border border-line bg-white transition-shadow hover:shadow-[var(--shadow-lift)] lg:grid-cols-[1.15fr_1fr]">
          <ArticleCover article={featured} className="aspect-[16/9] lg:aspect-auto lg:min-h-[360px]" priority />
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="text-sm font-semibold text-accent">Featured · {featured.category}</p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15]">
              <Link href={`/insights/${featured.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-accent-strong">{featured.title}</Link>
            </h2>
            <p className="mt-4 text-[1.0313rem] leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="font-medium text-ink">{featured.author.name}</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span className="inline-flex items-center gap-1"><Clock aria-hidden className="h-3.5 w-3.5" />{featured.readingTime} min read</span>
            </p>
          </div>
        </article>
      )}

      <div ref={listTop} className="scroll-mt-28 pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[1.5rem]">{browsing ? "Latest articles" : category ? `${category} articles` : "Search results"}</h2>
          <p className="text-sm text-muted" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"}</p>
        </div>

        {visible.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a) => <li key={a.slug}><ArticleCard article={a} /></li>)}
          </ul>
        ) : (
          <EmptyState
            title="No articles found"
            text={query ? <>Nothing matches “{query}”{category ? ` in ${category}` : ""}. Try a broader term or another category.</> : "There are no articles in this category yet. Check back soon."}
            action={<button type="button" onClick={() => { setQuery(""); setCategory(""); }} className={buttonClass("dark")}>Show all articles</button>}
          />
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1.5">
            <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className="inline-flex h-10 items-center gap-1 rounded-[8px] border border-line px-3 text-sm font-medium text-ink hover:border-line-strong disabled:opacity-40">
              <ChevronLeft aria-hidden className="h-4 w-4" />Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => goTo(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={cn("h-10 w-10 rounded-[8px] text-sm font-semibold", p === page ? "bg-ink text-white" : "text-ink hover:bg-mist")}
              >
                {p}
              </button>
            ))}
            <button type="button" onClick={() => goTo(page + 1)} disabled={page === pages} className="inline-flex h-10 items-center gap-1 rounded-[8px] border border-line px-3 text-sm font-medium text-ink hover:border-line-strong disabled:opacity-40">
              Next<ChevronRight aria-hidden className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
