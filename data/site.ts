import type { Stat } from "@/types";

/**
 * Central site configuration.
 * Update company details, contact information, statistics and social links here.
 */
export const site = {
  name: "Techyera Consultancy Services",
  shortName: "Techyera",
  tagline: "Engineering Technology. Enabling Growth.",
  description:
    "Techyera Consultancy Services delivers software engineering, cloud, data, AI, and digital transformation solutions for modern businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.techyera.co.in",
  locale: "en_IN",
  foundedYear: undefined as number | undefined,

  contact: {
    email: "support@techyera.co.in",
    /** Shown on careers pages. Uses the support inbox until a dedicated careers mailbox exists. */
    careersEmail: "support@techyera.co.in",
    /** Replace with the real number — displayed as-is and used for tel: links when valid */
    phone: "+91 8770160684",
    phoneHref: "+918770160684", // digits only, used for tap-to-call links
    country: "India",
    /** Leave empty until the registered office address is confirmed */
    address: "",
    /** Google Maps embed URL (Share → Embed a map → copy the src). Empty hides the map. */
    mapEmbedUrl: "",
    hours: "Monday – Friday, 9:30 am – 6:30 pm IST",
    /** Calendly / Cal.com / Google booking page link. Empty hides the "Book a call" button. */
    bookingUrl: "",
    /** WhatsApp Business number, digits with country code, e.g. "918770160684". Empty hides the button. */
    whatsapp: "",
  },

  /** Company profile URLs. Leave a platform empty to hide it from the footer and structured data. */
  social: {
    linkedin: "",
    x: "",
    instagram: "",
    youtube: "",
  },

  /**
   * Headline statistics shown with animated counters.
   * Figures supplied in the website brief — confirm before launch.
   * Set `showStats` to false to hide the strip entirely.
   */
  showStats: true,
  stats: [
    { value: 500, suffix: "+", label: "Technology professionals" },
    { value: 300, suffix: "+", label: "Projects delivered" },
    { value: 90, suffix: "+", label: "Technology skills" },
    { value: 15, suffix: "+", label: "Industries served" },
  ] satisfies Stat[],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Solutions", href: "/solutions" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const primaryCta = { label: "Talk to Our Experts", href: "/contact" } as const;
