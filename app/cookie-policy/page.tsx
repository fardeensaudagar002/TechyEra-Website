import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: `How ${site.name} uses cookies and similar technologies.`, path: "/cookie-policy" });

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="2026-10-01" intro="What cookies are, which ones this website uses and how you can control them.">
      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help websites work, remember preferences and understand how they are used.</p>
      <h2>2. Cookies we use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for the website to function and be secure. These cannot be switched off.</li>
        <li><strong>Analytics</strong> — help us understand how visitors use the site so we can improve it. Used only with your consent where required.</li>
        <li><strong>Functional</strong> — remember choices such as preferences to improve your experience.</li>
      </ul>
      <p>A detailed list of cookies, their providers and durations will be published here once analytics and other tools are configured.</p>
      <h2>3. Managing cookies</h2>
      <p>You can control and delete cookies through your browser settings. Blocking some cookies may affect how the website works.</p>
      <h2>4. Contact</h2>
      <p>For questions about our use of cookies, email <a href={`mailto:${site.contact.email}`} className="text-accent underline">{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
