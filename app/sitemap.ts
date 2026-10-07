import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { articles } from "@/data/insights";
import { jobs } from "@/data/jobs";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const now = new Date();
  const staticPages = ["", "/services", "/industries", "/solutions", "/case-studies", "/insights", "/careers", "/about", "/contact", "/privacy-policy", "/cookie-policy", "/terms-of-use", "/accessibility"];
  return [
    ...staticPages.map((p) => ({ url: u(p || "/"), lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: u(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...caseStudies.map((c) => ({ url: u(`/case-studies/${c.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: u(`/insights/${a.slug}`), lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...jobs.map((j) => ({ url: u(`/careers/${j.slug}`), lastModified: new Date(j.datePosted), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
