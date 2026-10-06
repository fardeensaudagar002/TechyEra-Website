import { site } from "@/data/site";
import type { Article, Job } from "@/types";

const abs = (path: string) => new URL(path, site.url).toString();

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: abs("/icon.svg"),
  slogan: site.tagline,
  description: site.description,
  email: site.contact.email,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: Object.values(site.social),
});

export const articleSchema = (a: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.excerpt,
  datePublished: a.date,
  dateModified: a.date,
  articleSection: a.category,
  author: { "@type": "Organization", name: `${a.author.name}, ${site.name}` },
  publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: abs("/icon.svg") } },
  mainEntityOfPage: abs(`/insights/${a.slug}`),
});

export const jobPostingSchema = (j: Job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: j.title,
  description: [...j.about, "Responsibilities: " + j.responsibilities.join("; "), "Required skills: " + j.requiredSkills.join("; ")]
    .map((p) => `<p>${p}</p>`)
    .join(""),
  datePosted: j.datePosted,
  validThrough: j.validThrough + "T23:59:59+05:30",
  employmentType: j.employmentType === "Full Time" ? "FULL_TIME" : j.employmentType === "Contract" ? "CONTRACTOR" : "INTERN",
  hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: abs("/icon.svg") },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "IN" } },
  ...(j.workMode === "Remote" ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } } : {}),
  skills: j.skills.join(", "),
  industry: "Information Technology",
  directApply: true,
});

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href) })),
});
