import type { Client, IconName, Leader, TechnologyGroup, Testimonial } from "@/types";

/* ---------------- Clients / partners ----------------
   Intentionally empty: add only clients who approved being named, e.g.
   { name: "Acme Corp", logo: "/clients/acme.svg" }. The strip hides when empty. */
export const clients: Client[] = [];

/* ---------------- Testimonials ----------------
   Intentionally empty: add only approved, attributable quotes. The section hides when empty. */
export const testimonials: Testimonial[] = [];

/* ---------------- Technologies ---------------- */
export const technologies: TechnologyGroup[] = [
  { category: "Frontend", icon: "code", items: ["React", "Angular", "Next.js", "TypeScript"] },
  { category: "Backend", icon: "stack", items: ["Java", "Spring Boot", "Python", "Node.js", ".NET"] },
  { category: "Data", icon: "database", items: ["SQL", "PostgreSQL", "Snowflake", "Databricks", "Spark"] },
  { category: "Cloud", icon: "cloud", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  { category: "DevOps", icon: "agile", items: ["Docker", "Kubernetes", "GitHub", "Jenkins", "Terraform"] },
  { category: "AI", icon: "brain", items: ["Python", "ML frameworks", "Generative AI", "LLM technologies"] },
];

/* ---------------- Leadership ----------------
   Fill in `name`, `bio`, `photo` (in /public/leadership) and `linkedin` once confirmed. */
export const leadership: Leader[] = [
  { role: "Founder & Chief Executive Officer", name: "", focus: "Strategy, client partnerships and company direction", bio: "" },
  { role: "Chief Technology Officer", name: "", focus: "Technology vision, architecture and engineering standards", bio: "" },
  { role: "Head of Engineering", name: "", focus: "Delivery excellence, engineering teams and practices", bio: "" },
  { role: "Head of Data & AI", name: "", focus: "Data platforms, analytics and applied AI", bio: "" },
];

/* ---------------- Why Techyera ---------------- */
export const differentiators: { title: string; text: string; icon: IconName }[] = [
  { title: "Engineering Excellence", text: "Code reviews, automated testing and documented architecture on every engagement.", icon: "code" },
  { title: "Business-Centric Approach", text: "Each technical decision is traced back to the outcome it is meant to improve.", icon: "target" },
  { title: "Modern Technology Stack", text: "Cloud-native, data and AI tooling chosen for longevity, not novelty.", icon: "stack" },
  { title: "Agile Delivery", text: "Short iterations, working software every sprint and visible progress.", icon: "agile" },
  { title: "Scalable Solutions", text: "Architectures that handle growth in users, data and teams.", icon: "scale" },
  { title: "Security by Design", text: "Threat modelling, least-privilege access and scanning built into delivery.", icon: "shield" },
  { title: "Transparent Communication", text: "Clear reporting, honest status and direct access to the people doing the work.", icon: "chat" },
  { title: "Long-Term Partnership", text: "We build your team's capability and stay accountable after go-live.", icon: "handshake" },
];

/* ---------------- About ---------------- */
export const values: { title: string; text: string; icon: IconName }[] = [
  { title: "Customer First", text: "We measure our work by the results our clients see.", icon: "target" },
  { title: "Integrity", text: "We say what we will do, do what we say and raise problems early.", icon: "integrity" },
  { title: "Innovation", text: "We look for better ways to solve problems, and test them carefully.", icon: "spark" },
  { title: "Excellence", text: "We hold our engineering and our communication to a high standard.", icon: "flag" },
  { title: "Collaboration", text: "We work as one team with our clients and with each other.", icon: "people" },
  { title: "Continuous Learning", text: "Technology changes quickly; we invest in learning every week.", icon: "learn" },
  { title: "Ownership", text: "We take responsibility for outcomes, not just tasks.", icon: "handshake" },
];

export const approachSteps = [
  { title: "Discover", text: "Understand goals, users, constraints and the current technology landscape." },
  { title: "Design", text: "Shape the architecture, experience and delivery plan with stakeholders." },
  { title: "Build", text: "Engineer in short iterations with working software at the end of each." },
  { title: "Validate", text: "Test functionality, performance and security against agreed criteria." },
  { title: "Deploy", text: "Release safely with automation, monitoring and rollback plans." },
  { title: "Evolve", text: "Measure outcomes, optimise and plan the next increment of value." },
];

/* ---------------- Careers ---------------- */
export const workBenefits: { title: string; text: string; icon: IconName }[] = [
  { title: "Learn & Grow", text: "Learning budgets, certifications and time set aside to build new skills.", icon: "learn" },
  { title: "Challenging Projects", text: "Real enterprise problems across cloud, data, AI and software engineering.", icon: "target" },
  { title: "Collaborative Culture", text: "Small teams, open discussion and colleagues who help each other.", icon: "people" },
  { title: "Modern Technology", text: "Work with current tools and practices, not legacy-only maintenance.", icon: "stack" },
  { title: "Career Development", text: "Clear growth paths for technical and leadership tracks.", icon: "growth" },
  { title: "Flexible Work Environment", text: "Hybrid working options that respect focus time and life outside work.", icon: "home" },
  { title: "Mentorship", text: "Senior engineers and architects who invest in your development.", icon: "mentor" },
  { title: "Innovation", text: "Space to propose ideas, run experiments and share what you learn.", icon: "spark" },
];

export const lifeMoments = [
  { title: "Team collaboration", text: "Design sessions where architecture is sketched together." },
  { title: "Developers at work", text: "Focused build time with pairing when it helps." },
  { title: "Planning & reviews", text: "Sprint reviews where teams demo working software." },
  { title: "Learning sessions", text: "Internal tech talks and certification study groups." },
  { title: "Company events", text: "Celebrating launches, milestones and each other." },
];
