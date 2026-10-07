import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcon, socialLabels, type SocialKey } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

const footerIndustries = ["banking-financial-services", "healthcare", "retail-ecommerce", "manufacturing", "telecom", "logistics-transportation"];

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: services.map((s) => ({ label: s.shortTitle, href: `/services#${s.slug}` })),
  },
  {
    title: "Industries",
    links: footerIndustries.map((slug) => {
      const i = industries.find((x) => x.slug === slug)!;
      return { label: i.shortTitle, href: `/industries#${i.slug}` };
    }),
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Solutions", href: "/solutions" },
      { label: "Careers", href: "/careers#open-positions" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/70" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-x pb-10 pt-16 md:pt-20">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo inverted />
            <p className="mt-5 text-[0.9375rem] leading-relaxed">
              {site.tagline} Software engineering, cloud, data, AI and digital transformation for organizations in India and worldwide.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li>
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                <Mail aria-hidden className="h-4 w-4 text-white/50" /> {site.contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <Phone aria-hidden className="h-4 w-4 text-white/50" />
              {site.contact.phoneHref ? <a href={`tel:${site.contact.phoneHref}`} className="hover:text-white">{site.contact.phone}</a> : site.contact.phone}
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin aria-hidden className="h-4 w-4 text-white/50" /> {site.contact.address || site.contact.country}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {(Object.keys(site.social) as SocialKey[]).map((k) => (
                <li key={k}>
                  <a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                    <SocialIcon name={k} className="h-4 w-4" />
                    {socialLabels[k]}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
            <li><Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/accessibility" className="hover:text-white">Accessibility</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
