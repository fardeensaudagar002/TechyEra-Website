import { z } from "zod";

export const serviceOptions = [
  "Software Development",
  "Data & Analytics",
  "Cloud",
  "AI/ML",
  "Digital Transformation",
  "QA",
  "Other",
] as const;

/** Pre-selects the contact form's service when linked from a service page: /contact?service=<slug> */
export const serviceOptionBySlug: Record<string, (typeof serviceOptions)[number]> = {
  "software-engineering": "Software Development",
  "data-analytics": "Data & Analytics",
  "cloud-devops": "Cloud",
  "ai-machine-learning": "AI/ML",
  "digital-transformation": "Digital Transformation",
  "quality-engineering": "QA",
};

export const budgetOptions = [
  "Not sure yet",
  "Under $10k",
  "$10k – $50k",
  "$50k – $150k",
  "$150k+",
] as const;

export const countryOptions = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Singapore",
  "Australia",
  "Canada",
  "Germany",
  "Saudi Arabia",
  "Other",
] as const;

const phoneRegex = /^[+()\-\s\d]{7,20}$/;
const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/[^\s.]+\.[^\s]{2,}/i.test(v), "Enter a full URL starting with https://");

/** A select value that must be one of the listed options (the server rejects anything else). */
const oneOf = (options: readonly string[], message: string) => z.string().refine((v) => options.includes(v), message);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  company: z.string().trim().min(2, "Enter your company name"),
  email: z.string().trim().min(1, "Enter your work email").email("Enter a valid email, like name@company.com"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || phoneRegex.test(v), "Enter a valid phone number with country code"),
  country: oneOf(countryOptions, "Select your country"),
  service: oneOf(serviceOptions, "Select the service you're interested in"),
  budget: z.string().refine((v) => v === "" || (budgetOptions as readonly string[]).includes(v), "Select a budget range from the list"),
  message: z.string().trim().min(20, "Tell us a little more — at least 20 characters").max(3000, "Keep your message under 3,000 characters"),
});
export type ContactValues = z.infer<typeof contactSchema>;

/** 4 MB — stays under the request-size limit of serverless hosts such as Vercel (4.5 MB) */
export const MAX_RESUME_BYTES = 4 * 1024 * 1024;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Enter your phone number").regex(phoneRegex, "Enter a valid phone number with country code"),
  location: z.string().trim().min(2, "Enter your current city"),
  experience: z.string().min(1, "Select your years of experience"),
  linkedin: optionalUrl.refine((v) => v === "" || /linkedin\.com/i.test(v), "Enter a LinkedIn profile URL"),
  portfolio: optionalUrl,
  resume: z
    .custom<FileList>()
    .refine((f) => typeof FileList !== "undefined" && f instanceof FileList && f.length > 0, "Attach your resume")
    .refine((f) => !(f instanceof FileList) || !f[0] || RESUME_TYPES.includes(f[0].type) || /\.(pdf|docx?)$/i.test(f[0].name), "Upload a PDF or Word document")
    .refine((f) => !(f instanceof FileList) || !f[0] || f[0].size <= MAX_RESUME_BYTES, "Resume must be 4 MB or smaller"),
  coverLetter: z.string().trim().max(3000, "Keep your cover letter under 3,000 characters"),
  consent: z.boolean().refine((v) => v, "Please confirm consent so we can process your application"),
});
export type ApplicationValues = z.infer<typeof applicationSchema>;

export const experienceOptions = ["0–1 years", "1–2 years", "2–3 years", "3–5 years", "5–8 years", "8+ years"] as const;

/**
 * Sends a form as multipart/form-data to this site's own API (or to an external endpoint
 * if one is configured). Throws with a readable message when the server rejects it.
 */
export async function submitForm(endpoint: string, data: Record<string, unknown>) {
  const body = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (typeof FileList !== "undefined" && value instanceof FileList) {
      if (value[0]) body.append(key, value[0]);
    } else if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  }
  const res = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
  if (!res.ok) {
    let message = "";
    try { message = (await res.json()).error ?? ""; } catch { /* non-JSON response */ }
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return { ok: true as const };
}
