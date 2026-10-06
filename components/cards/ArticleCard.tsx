import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { CoverArt } from "@/components/visuals/CoverArt";
import { formatDate, cn } from "@/lib/utils";
import type { Article } from "@/types";

export function ArticleCover({ article, className, priority }: { article: Article; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden bg-accent-soft", className)}>
      {article.image ? (
        <Image src={article.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        <CoverArt seed={article.slug} category={article.category} />
      )}
    </div>
  );
}

export function ArticleCard({ article, headingLevel = "h3", showExcerpt = true }: { article: Article; headingLevel?: "h2" | "h3"; showExcerpt?: boolean }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <ArticleCover article={article} className="transition-transform duration-500 [&_svg]:transition-transform [&_svg]:duration-500 group-hover:[&_svg]:scale-[1.03]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted">
          <span className="font-semibold text-accent">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="inline-flex items-center gap-1"><Clock aria-hidden className="h-3.5 w-3.5" />{article.readingTime} min read</span>
        </div>
        <H className="mt-3 text-[1.1875rem] leading-snug">
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-accent-strong">
            {article.title}
          </Link>
        </H>
        {showExcerpt && <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{article.excerpt}</p>}
        <span className="mt-5 text-[0.9375rem] font-semibold text-accent" aria-hidden>Read more</span>
      </div>
    </article>
  );
}
