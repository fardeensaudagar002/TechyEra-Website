import { Mail, Phone, MapPin, Clock, Briefcase, ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Talk to Techyera’s technology experts about software engineering, cloud, data, AI and digital transformation projects.",
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact Us", href: "/contact" }]}
        title="Let’s Build Something Great Together"
        lede="Tell us about your project, challenge or idea. A senior member of our team will get back to you within one business day."
      />

      <section className="section bg-mist pt-14" aria-label="Contact options">
        <div className="container-x grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div id="contact-form" className="scroll-mt-24 rounded-[16px] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
            <h2 className="text-[1.625rem]">Send us a message</h2>
            <p className="mb-8 mt-2 text-muted">Share as much context as you can — it helps us connect you with the right specialist.</p>
            <ContactForm />
          </div>

          <aside className="space-y-6" aria-label="Contact details">
            <div className="rounded-[16px] border border-line bg-white p-6 md:p-8">
              <h2 className="text-[1.25rem]">Contact details</h2>
              <ul className="mt-6 space-y-6">
                <Detail icon={<Mail className="h-5 w-5" />} label="Email">
                  <a href={`mailto:${c.email}`} className="font-semibold text-accent hover:underline">{c.email}</a>
                </Detail>
                {c.phone && (
                  <Detail icon={<Phone className="h-5 w-5" />} label="Phone">
                    {c.phoneHref ? <a href={`tel:${c.phoneHref}`} className="font-semibold text-ink hover:text-accent">{c.phone}</a> : <span className="font-semibold text-ink">{c.phone}</span>}
                  </Detail>
                )}
                <Detail icon={<MapPin className="h-5 w-5" />} label="Office">
                  <span className="font-semibold text-ink">{c.address || c.country}</span>
                </Detail>
                <Detail icon={<Clock className="h-5 w-5" />} label="Business hours">
                  <span className="text-ink">{c.hours}</span>
                </Detail>
              </ul>
            </div>
            {(c.bookingUrl || c.whatsapp) && (
              <div className="rounded-[16px] border border-line bg-white p-6 md:p-8">
                <h2 className="text-[1.25rem]">Prefer to talk?</h2>
                <p className="mt-2 text-[0.9375rem] text-muted">Skip the form and speak to a specialist directly.</p>
                <div className="mt-5 flex flex-col gap-3">
                  {c.bookingUrl && (
                    <a href={c.bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "w-full")}>
                      <CalendarDays aria-hidden className="h-4 w-4" /> Book a 30-minute call<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {c.whatsapp && (
                    <a href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent("Hi Techyera, I'd like to discuss a project.")}`} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "md", "w-full")}>
                      <MessageCircle aria-hidden className="h-4 w-4" /> Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            )}
            <Link href="/careers" className="group flex items-center gap-4 rounded-[16px] border border-line bg-white p-6 transition-colors hover:border-accent-line">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-accent-soft text-accent"><Briefcase aria-hidden className="h-5 w-5" /></span>
              <span className="flex-1">
                <span className="block font-semibold text-ink">Looking for a job?</span>
                <span className="text-sm text-muted">See open positions and apply online</span>
              </span>
              <ArrowRight aria-hidden className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
            <MapPlaceholder />
          </aside>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-mist text-accent">{icon}</span>
      <div>
        <p className="text-[0.8125rem] text-muted">{label}</p>
        <div className="mt-0.5 break-words">{children}</div>
      </div>
    </li>
  );
}
