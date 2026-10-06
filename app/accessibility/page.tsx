import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Accessibility Statement", description: `${site.name}’s commitment to an accessible website.`, path: "/accessibility" });

export default function Page() {
  return (
    <LegalPage title="Accessibility Statement" path="/accessibility" updated="2026-10-01" intro="Our commitment to making this website usable by as many people as possible.">
      <h2>Our commitment</h2>
      <p>{site.name} aims to make this website accessible to everyone, including people with disabilities. We design and test against the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
      <h2>What we do</h2>
      <ul>
        <li>Semantic HTML with a logical heading structure and landmarks</li>
        <li>Full keyboard navigation with visible focus indicators and a skip-to-content link</li>
        <li>Colour contrast that meets AA ratios for text and interface elements</li>
        <li>Text alternatives for meaningful images and illustrations</li>
        <li>Labelled form fields with clear, specific error messages</li>
        <li>Respect for your system’s reduced-motion setting</li>
      </ul>
      <h2>Known limitations</h2>
      <p>We continually review the site. If you find content that is difficult to use, please tell us so we can improve it.</p>
      <h2>Feedback</h2>
      <p>Contact us at <a href={`mailto:${site.contact.email}`} className="text-accent underline">{site.contact.email}</a>. We aim to respond within five business days.</p>
    </LegalPage>
  );
}
