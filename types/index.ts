/**
 * Content models for Techyera.
 * These mirror what a CMS / backend would return, so the static files in /data
 * can be swapped for API calls without touching UI components.
 */

export type IconName =
  | "code"
  | "database"
  | "cloud"
  | "brain"
  | "transform"
  | "quality"
  | "bank"
  | "health"
  | "retail"
  | "factory"
  | "telecom"
  | "insurance"
  | "travel"
  | "logistics"
  | "tech"
  | "energy"
  | "growth"
  | "projects"
  | "people"
  | "stack"
  | "agile"
  | "scale"
  | "shield"
  | "chat"
  | "handshake"
  | "target"
  | "spark"
  | "compass"
  | "home"
  | "mentor"
  | "learn"
  | "integrity"
  | "flag"
  | "eye";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string; // card copy on home page
  description: string; // longer copy on services page
  capabilities: string[];
  technologies: string[];
  benefits: { title: string; text: string }[];
}

export interface Industry {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  description: string;
  focusAreas: string[];
  relatedServices: string[]; // service slugs
}

export interface Solution {
  slug: string;
  title: string;
  problem: string;
  approach: string[];
  technology: string[];
  outcome: string;
  relatedService: string; // service slug
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** true until the case study is replaced with an approved, real client story */
  illustrative: boolean;
  client: string;
  industry: string; // industry slug
  services: string[]; // service slugs
  technologies: string[];
  summary: string;
  challenge: string;
  existingEnvironment: string[];
  techChallenges: string[];
  approach: string[];
  architecture: { layer: string; components: string }[];
  implementation: { phase: string; detail: string }[];
  results: string[];
  businessImpact: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleCategory =
  | "AI"
  | "Data"
  | "Cloud"
  | "Software Engineering"
  | "DevOps"
  | "Digital Transformation"
  | "Technology Strategy";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  author: { name: string; role: string };
  date: string; // ISO yyyy-mm-dd
  readingTime: number; // minutes
  featured?: boolean;
  /** optional real image; when absent a generated cover is drawn */
  image?: string;
  content: ArticleBlock[];
}

export interface Job {
  slug: string;
  title: string;
  department: "Engineering" | "Data & AI" | "Cloud & DevOps" | "Quality Engineering" | "Consulting";
  location: string;
  workMode: "Hybrid" | "Remote" | "On-site";
  experience: string;
  experienceBand: "0–2 years" | "2–5 years" | "5+ years";
  employmentType: "Full Time" | "Contract" | "Internship";
  summary: string;
  skills: string[];
  about: string[];
  responsibilities: string[];
  requiredSkills: string[];
  goodToHave: string[];
  qualifications: string[];
  datePosted: string; // ISO
  validThrough: string; // ISO
}

export interface Leader {
  role: string;
  /** leave empty until the real name is confirmed */
  name: string;
  focus: string;
  bio: string;
  linkedin?: string;
  photo?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface TechnologyGroup {
  category: string;
  icon: IconName;
  items: string[];
}

export interface Client {
  name: string;
  /** path to an SVG/PNG logo in /public/clients; placeholder mark is drawn when absent */
  logo?: string;
  url?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
