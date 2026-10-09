import { requireAdmin } from "@/lib/server/session";
import { adminRecipients, emailConfigured, emailProvider, fromAddress } from "@/lib/server/email";
import {
  applicationAlert, applicationReceived, applicationStatusEmail, emailableStatuses, enquiryAlert, enquiryReceived,
  type ApplicationData, type EmailContent, type EnquiryData,
} from "@/lib/server/email-templates";
import { site } from "@/data/site";

export const metadata = { title: "Email templates" };

const enquiry: EnquiryData = {
  id: 0, name: "Priya Sharma", company: "Acme Retail Pvt Ltd", email: "priya@example.com", phone: "+91 98765 43210", country: "India",
  service: "Cloud", budget: "$10k – $50k",
  message: "We're planning to move our e-commerce platform from on-premise servers to AWS before the festive season.\nCan we set up a call next week?",
};
const application: ApplicationData = {
  id: 0, jobTitle: "Software Engineer – Java", jobSlug: "software-engineer-java", fullName: "Rahul Verma", email: "rahul@example.com", phone: "+91 91234 56789",
  location: "Pune", experience: "3–5 years", linkedin: "https://www.linkedin.com/in/example", portfolio: "", coverLetter: "I've spent four years building Spring Boot microservices for a fintech platform.",
  resumeName: "Rahul_Verma_Resume.pdf",
};

export default async function EmailTemplatesPage() {
  await requireAdmin();
  const groups: { title: string; note: string; items: { name: string; to: string; content: EmailContent }[] }[] = [
    {
      title: "Contact form",
      note: "Sent automatically when someone submits the contact form.",
      items: [
        { name: "Team alert", to: adminRecipients().join(", "), content: enquiryAlert(enquiry) },
        { name: "Confirmation to the enquirer", to: enquiry.email, content: enquiryReceived(enquiry) },
      ],
    },
    {
      title: "Job applications",
      note: "Sent automatically when someone applies for a job.",
      items: [
        { name: "Team alert", to: adminRecipients().join(", "), content: applicationAlert(application) },
        { name: "Confirmation to the applicant", to: application.email, content: applicationReceived(application) },
      ],
    },
    {
      title: "Application status updates",
      note: "Sent only when you tick “Email the candidate” while changing an application’s status.",
      items: emailableStatuses.map((s) => ({ name: `Status: ${s}`, to: application.email, content: applicationStatusEmail(s, application)! })),
    },
  ];

  const configured = emailConfigured();
  const provider = emailProvider();
  return (
    <>
      <h1 className="text-[1.75rem]">Email templates</h1>
      <p className="mt-1 max-w-2xl text-muted">Every email the website sends, shown with sample data. Wording lives in <code className="text-ink">lib/server/email-templates.ts</code>.</p>

      <section className="mt-6 rounded-[12px] border border-line bg-white p-6">
        <h2 className="text-base">Sending setup</h2>
        <dl className="mt-3 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-[10rem_1fr]">
          <dt className="text-muted">Status</dt>
          <dd className={configured ? "font-semibold text-success" : "font-semibold text-[#7a5200]"}>
            {configured ? `Active — sending through ${provider === "SMTP" ? `SMTP (${process.env.SMTP_HOST})` : "Resend"}` : "Not set up — emails are recorded but not delivered (add the SMTP_* settings)"}
          </dd>
          <dt className="text-muted">Sent from</dt>
          <dd className="text-ink">{fromAddress()}</dd>
          <dt className="text-muted">Team alerts go to</dt>
          <dd className="text-ink">{adminRecipients().join(", ")}</dd>
          <dt className="text-muted">Replies go to</dt>
          <dd className="text-ink">{site.contact.email} <span className="text-muted">(team alerts reply straight to the visitor)</span></dd>
        </dl>
      </section>

      {groups.map((g) => (
        <section key={g.title} className="mt-10">
          <h2 className="text-[1.25rem]">{g.title}</h2>
          <p className="mt-1 text-sm text-muted">{g.note}</p>
          <div className="mt-4 grid gap-6 xl:grid-cols-2">
            {g.items.map((it) => (
              <article key={it.name} className="overflow-hidden rounded-[12px] border border-line bg-white">
                <header className="border-b border-line px-5 py-3.5">
                  <p className="text-sm font-semibold text-ink">{it.name}</p>
                  <p className="mt-0.5 break-words text-[0.8125rem] text-muted">To {it.to} · Subject: <span className="text-ink">{it.content.subject}</span></p>
                </header>
                <iframe title={`${it.name} preview`} srcDoc={it.content.html} sandbox="" className="block h-[640px] w-full bg-mist" />
                <details className="border-t border-line px-5 py-3 text-sm">
                  <summary className="cursor-pointer font-semibold text-ink">Plain-text version</summary>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-[0.8125rem] leading-relaxed text-ink-2">{it.content.text}</pre>
                </details>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
