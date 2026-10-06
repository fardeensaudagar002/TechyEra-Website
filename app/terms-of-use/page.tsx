import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms of Use", description: `Terms governing use of the ${site.name} website.`, path: "/terms-of-use" });

export default function Page() {
  return (
    <LegalPage title="Terms of Use" path="/terms-of-use" updated="2026-10-01" intro="The terms that apply when you access and use this website.">
      <h2>1. Acceptance</h2>
      <p>By accessing this website you agree to these Terms of Use. If you do not agree, please do not use the website.</p>
      <h2>2. Use of the website</h2>
      <p>You may use this website for lawful purposes only. You must not attempt to gain unauthorised access, interfere with its operation or use it to transmit harmful code.</p>
      <h2>3. Intellectual property</h2>
      <p>Unless otherwise stated, content on this website — including text, graphics, logos and design — belongs to {site.name} and is protected by intellectual property laws. You may view and print pages for personal, non-commercial use.</p>
      <h2>4. Information only</h2>
      <p>Content on this website, including insights and case studies, is provided for general information. It does not constitute professional advice, and case studies marked as illustrative describe representative engagements rather than specific named clients.</p>
      <h2>5. Third-party links</h2>
      <p>Links to third-party websites are provided for convenience. We are not responsible for their content or practices.</p>
      <h2>6. Limitation of liability</h2>
      <p>To the extent permitted by law, {site.name} is not liable for any loss arising from use of, or inability to use, this website.</p>
      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at [city to be confirmed] shall have exclusive jurisdiction.</p>
      <h2>8. Changes</h2>
      <p>We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms.</p>
    </LegalPage>
  );
}
