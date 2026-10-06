import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleCard, ArticleCover } from "@/components/cards/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { articles, getArticle, sortedArticles } from "@/data/insights";
import { site } from "@/data/site";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { ArticleBlock } from "@/types";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, type: "article", publishedTime: a.date });
}

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "h2": return <h2>{b.text}</h2>;
    case "h3": return <h3>{b.text}</h3>;
    case "ul": return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "quote": return <blockquote><p>{b.text}</p></blockquote>;
    default: return <p>{b.text}</p>;
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const url = new URL(`/insights/${a.slug}`, site.url).toString();
  const others = sortedArticles().filter((x) => x.slug !== a.slug);
  const related = [...others.filter((x) => x.category === a.category), ...others.filter((x) => x.category !== a.category)].slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(a)} />
      <article>
        <header className="border-b border-line">
          <div className="container-x max-w-[56rem] pb-10 pt-10 md:pt-14">
            <Breadcrumbs items={[{ name: "Insights", href: "/insights" }, { name: a.title, href: `/insights/${a.slug}` }]} />
            <p className="text-sm font-semibold text-accent">{a.category}</p>
            <h1 className="mt-3 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] tracking-[-0.035em]">{a.title}</h1>
            <p className="lede mt-5">{a.excerpt}</p>
            <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">T</span>
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-ink">{a.author.name}</p>
                  <p className="mt-1 flex flex-wrap gap-x-3 text-muted">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span className="inline-flex items-center gap-1"><Clock aria-hidden className="h-3.5 w-3.5" />{a.readingTime} min read</span>
                  </p>
                </div>
              </div>
              <ShareButtons url={url} title={a.title} />
            </div>
          </div>
        </header>

        <div className="container-x max-w-[56rem] py-10">
          <ArticleCover article={a} className="rounded-[14px] border border-line" priority />
        </div>

        <div className="container-x max-w-[44rem] pb-16">
          <div className="prose-article">
            {a.content.map((b, i) => <Block key={i} b={b} />)}
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Filed under <span className="font-semibold text-ink">{a.category}</span></p>
            <ShareButtons url={url} title={a.title} />
          </div>
        </div>
      </article>

      <section className="section border-t border-line bg-mist" aria-labelledby="related-heading">
        <div className="container-x">
          <h2 id="related-heading" className="h-section mb-10">Related articles</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((r) => <li key={r.slug}><ArticleCard article={r} /></li>)}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
