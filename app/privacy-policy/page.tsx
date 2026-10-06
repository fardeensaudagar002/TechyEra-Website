import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects personal data.`, path: "/privacy-policy" });

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="2026-10-01" intro={`How ${site.name} collects, uses and protects your personal data.`}>
      <h2>1. Who we are</h2>
      <p>{site.name} (“Techyera”, “we”, “us”) provides software engineering and technology consulting services. This policy explains how we handle personal data collected through this website and in connection with enquiries and job applications.</p>
      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Enquiry data</strong> — name, company, work email, phone, country, service of interest, budget range and message when you use our contact form.</li>
        <li><strong>Application data</strong> — name, contact details, location, experience, profile links, resume and cover letter when you apply for a role.</li>
        <li><strong>Technical data</strong> — IP address, browser type, device information and pages visited, collected through cookies and similar technologies (see our Cookie Policy).</li>
      </ul>
      <h2>3. How we use information</h2>
      <ul>
        <li>To respond to enquiries and provide information about our services</li>
        <li>To evaluate job applications and communicate with candidates</li>
        <li>To operate, secure and improve this website</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2>4. Legal basis and consent</h2>
      <p>We process personal data on the basis of your consent, our legitimate interests in responding to you and running our business, and compliance with applicable law, including India’s Digital Personal Data Protection Act, 2023 and, where applicable, the EU/UK GDPR.</p>
      <h2>5. Sharing</h2>
      <p>We do not sell personal data. We share it only with service providers who help us operate the website, email and recruitment systems, under contractual confidentiality and security obligations, or where required by law.</p>
      <h2>6. Retention</h2>
      <p>Enquiry data is kept for as long as needed to respond and maintain our business relationship. Candidate data is retained for up to [retention period] after a recruitment decision unless you ask us to delete it sooner.</p>
      <h2>7. Your rights</h2>
      <p>Depending on your location, you may have the right to access, correct, update or erase your personal data, withdraw consent and raise a grievance. To exercise these rights, email <a href={`mailto:${site.contact.email}`} className="text-accent underline">{site.contact.email}</a>.</p>
      <h2>8. Security</h2>
      <p>We use reasonable technical and organisational measures to protect personal data, including encryption in transit and access controls. No method of transmission over the internet is completely secure.</p>
      <h2>9. Contact and grievance officer</h2>
      <p>Questions about this policy can be sent to <a href={`mailto:${site.contact.email}`} className="text-accent underline">{site.contact.email}</a>. Grievance officer details: [name and contact to be added].</p>
    </LegalPage>
  );
}
