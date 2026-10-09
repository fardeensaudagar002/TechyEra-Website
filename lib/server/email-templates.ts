import { site } from "@/data/site";

/**
 * Email templates. Each template is built from simple parts and rendered twice — as table-based HTML
 * with inline styles (what email clients need) and as plain text — so both versions always match.
 * All visitor-supplied text is escaped. Wrap words in **double asterisks** to make them bold.
 */

export interface EmailContent { subject: string; html: string; text: string; replyTo?: string }

type Part =
  | { p: string }
  | { details: [string, string][] }
  | { quote: string }
  | { steps: string[] };

interface Layout {
  subject: string;
  preheader: string;
  heading: string;
  parts: Part[];
  cta?: { label: string; href: string };
  footer: string;
  replyTo?: string;
}

const C = { ink: "#0b1b34", body: "#34425a", muted: "#5f6b82", line: "#e1e6ee", mist: "#f4f6fa", accent: "#2447d6", soft: "#edf1fe" };
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const rich = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong style=\"color:" + C.ink + "\">$1</strong>").replace(/\n/g, "<br>");
const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1");
const url = (path: string) => new URL(path, site.url).toString();
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
/** Removes the ** markers from visitor text so it can't add bold formatting of its own. */
const clean = (s: string) => s.replace(/\*\*/g, "");

function renderHtml(l: Layout) {
  const part = (x: Part) => {
    if ("p" in x) return `<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:${C.body}">${rich(x.p)}</p>`;
    if ("quote" in x)
      return `<div style="margin:0 0 20px;padding:14px 16px;border-left:3px solid ${C.accent};background:${C.mist};font-size:14px;line-height:22px;color:${C.ink}">${esc(x.quote).replace(/\n/g, "<br>")}</div>`;
    if ("steps" in x)
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px">${x.steps
        .map((s, i) => `<tr><td valign="top" style="width:30px;padding:0 0 10px"><div style="width:22px;height:22px;border-radius:11px;background:${C.soft};color:${C.accent};font-size:12px;font-weight:700;line-height:22px;text-align:center">${i + 1}</div></td><td style="padding:1px 0 10px;font-size:15px;line-height:22px;color:${C.body}">${rich(s)}</td></tr>`)
        .join("")}</table>`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid ${C.line};border-radius:8px;border-collapse:separate">${x.details
      .filter(([, v]) => v)
      .map(([k, v], i) => `<tr><td valign="top" style="width:150px;padding:10px 14px;font-size:13px;color:${C.muted};${i ? `border-top:1px solid ${C.line};` : ""}">${esc(k)}</td><td style="padding:10px 14px;font-size:14px;color:${C.ink};word-break:break-word;${i ? `border-top:1px solid ${C.line};` : ""}">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`;
  };
  const cta = l.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 8px"><tr><td style="border-radius:8px;background:${C.accent}"><a href="${esc(l.cta.href)}" style="display:inline-block;padding:12px 22px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px">${esc(l.cta.label)}</a></td></tr></table>`
    : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(l.subject)}</title></head>
<body style="margin:0;padding:0;background:${C.mist};font-family:${FONT}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(l.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.mist}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">
<tr><td style="padding:0 4px 18px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="width:34px;height:34px;border-radius:8px;background:${C.ink};color:#ffffff;font-size:18px;font-weight:700;text-align:center;line-height:34px">T</td>
<td style="padding-left:10px;font-size:17px;font-weight:700;color:${C.ink};line-height:18px">${esc(site.shortName)}<br><span style="font-size:11px;font-weight:500;color:${C.muted}">Consultancy Services</span></td>
</tr></table></td></tr>
<tr><td style="background:#ffffff;border:1px solid ${C.line};border-radius:12px;padding:32px 28px">
<h1 style="margin:0 0 18px;font-size:22px;line-height:30px;font-weight:700;color:${C.ink}">${esc(l.heading)}</h1>
${l.parts.map(part).join("\n")}
${cta}
</td></tr>
<tr><td style="padding:20px 8px 0;font-size:12px;line-height:19px;color:${C.muted};text-align:center">
${rich(l.footer)}<br>${esc(site.name)} · ${esc(site.contact.country)} · <a href="mailto:${site.contact.email}" style="color:${C.muted}">${site.contact.email}</a> · <a href="${site.url}" style="color:${C.muted}">${esc(new URL(site.url).host)}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

function renderText(l: Layout) {
  const part = (x: Part) => {
    if ("p" in x) return plain(x.p);
    if ("quote" in x) return x.quote.split("\n").map((s) => `> ${s}`).join("\n");
    if ("steps" in x) return x.steps.map((s, i) => `${i + 1}. ${plain(s)}`).join("\n");
    return x.details.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  };
  return [l.heading, "", ...l.parts.map(part).flatMap((s) => [s, ""]), ...(l.cta ? [`${l.cta.label}: ${l.cta.href}`, ""] : []), "—", plain(l.footer), `${site.name} · ${site.contact.email} · ${site.url}`].join("\n");
}

const build = (l: Layout): EmailContent => ({ subject: l.subject, html: renderHtml(l), text: renderText(l), replyTo: l.replyTo });

/* ------------------------------------------------------------------ */
/* Internal alerts (to the support inbox). Reply goes to the visitor. */
/* ------------------------------------------------------------------ */

export interface EnquiryData { id: number; name: string; company: string; email: string; phone: string; country: string; service: string; budget: string; message: string }
export interface ApplicationData { id: number; jobTitle: string; jobSlug: string; fullName: string; email: string; phone: string; location: string; experience: string; linkedin: string; portfolio: string; coverLetter: string; resumeName: string }

export const enquiryAlert = (e: EnquiryData) =>
  build({
    subject: `New enquiry: ${e.name} (${e.company}) — ${e.service}`,
    preheader: `${e.service}${e.budget ? ` · ${e.budget}` : ""} · ${e.country}`,
    heading: "New enquiry from the website",
    parts: [
      { details: [["Name", e.name], ["Company", e.company], ["Email", e.email], ["Phone", e.phone], ["Country", e.country], ["Service", e.service], ["Budget", e.budget || "Not specified"]] },
      { quote: e.message },
      { p: "Reply to this email to answer the enquirer directly." },
    ],
    cta: { label: "Open in admin panel", href: url(`/admin/enquiries/${e.id}`) },
    footer: "Internal notification from the website contact form.",
    replyTo: e.email,
  });

export const applicationAlert = (a: ApplicationData) =>
  build({
    subject: `New application: ${a.jobTitle} — ${a.fullName}`,
    preheader: `${a.experience} · ${a.location}`,
    heading: `New application for ${a.jobTitle}`,
    parts: [
      { details: [["Name", a.fullName], ["Email", a.email], ["Phone", a.phone], ["Location", a.location], ["Experience", a.experience], ["LinkedIn", a.linkedin], ["Portfolio", a.portfolio], ["Resume", a.resumeName]] },
      ...(a.coverLetter ? [{ quote: a.coverLetter }] : []),
      { p: "Download the resume and set the application status in the admin panel." },
    ],
    cta: { label: "Review application", href: url(`/admin/applications/${a.id}`) },
    footer: "Internal notification from the website careers page.",
    replyTo: a.email,
  });

/* ------------------------------------------------------------------ */
/* Confirmations (to the visitor). Reply goes to the support inbox.   */
/* ------------------------------------------------------------------ */

export const enquiryReceived = (e: EnquiryData) =>
  build({
    subject: "We’ve received your message — Techyera",
    preheader: "A member of our team will reply within one business day.",
    heading: `Thanks for getting in touch, ${clean(firstName(e.name))}`,
    parts: [
      { p: `We’ve received your enquiry about **${e.service}**. A member of our team will review it and reply within one business day (${site.contact.hours}).` },
      { p: "Here’s a copy of your message for your records:" },
      { quote: e.message },
      { p: "If you’d like to add anything — timelines, documents or the people we should include — simply reply to this email." },
    ],
    cta: { label: "Explore our services", href: url("/services") },
    footer: "You’re receiving this email because you contacted us through our website. If this wasn’t you, you can safely ignore it.",
  });

export const applicationReceived = (a: ApplicationData) =>
  build({
    subject: `Application received: ${a.jobTitle}`,
    preheader: `Thanks for applying to Techyera. Here’s what happens next.`,
    heading: `Thanks for applying, ${clean(firstName(a.fullName))}`,
    parts: [
      { p: `We’ve received your application for **${clean(a.jobTitle)}**, including your resume (${clean(a.resumeName)}).` },
      { p: "Here’s what happens next:" },
      { steps: ["Our talent team reviews every application against the role’s requirements.", "If your profile is a good match, we’ll contact you to arrange the next steps.", "We’ll keep you updated by email as your application progresses."] },
      { p: "If you need to update your details, reply to this email." },
    ],
    cta: { label: "View other open positions", href: url("/careers#open-positions") },
    footer: "You’re receiving this email because you applied for a role on our website. If this wasn’t you, you can safely ignore it.",
  });

/* ------------------------------------------------------------------ */
/* Application status updates (sent from the admin panel on request). */
/* ------------------------------------------------------------------ */

const statusCopy: Record<string, { subject: string; heading: string; parts: (job: string) => Part[]; cta?: Layout["cta"] }> = {
  shortlisted: {
    subject: "Your application has been shortlisted",
    heading: "Good news — you’ve been shortlisted",
    parts: (job) => [
      { p: `Thank you for your interest in the **${job}** role. We’re pleased to let you know that your application has been shortlisted.` },
      { p: "A member of our team will be in touch shortly about the next steps. There’s nothing you need to do right now." },
    ],
  },
  interview: {
    subject: "Interview invitation",
    heading: "We’d like to invite you to an interview",
    parts: (job) => [
      { p: `We enjoyed reading your application for the **${job}** role and would like to invite you to an interview.` },
      { p: "A member of our team will contact you within the next few business days to arrange a convenient time. If you have dates when you’re unavailable, please reply to this email and let us know." },
    ],
  },
  hired: {
    subject: "Congratulations — you’ve been selected",
    heading: "Congratulations!",
    parts: (job) => [
      { p: `We’re delighted to let you know that you’ve been selected for the **${job}** role.` },
      { p: "Our team will contact you shortly with your offer details and the next steps. We look forward to welcoming you to Techyera." },
    ],
  },
  rejected: {
    subject: "An update on your application",
    heading: "An update on your application",
    parts: (job) => [
      { p: `Thank you for your interest in the **${job}** role and for the time you put into your application.` },
      { p: "After careful review, we’ve decided not to move forward with your application for this position. This decision reflects the specific needs of the role and is not a judgement of your abilities." },
      { p: "We’d be glad to see you apply for future openings that match your skills." },
    ],
    cta: { label: "View open positions", href: url("/careers#open-positions") },
  },
};

/** Statuses that have a candidate email. */
export const emailableStatuses = Object.keys(statusCopy);

export function applicationStatusEmail(status: string, a: { fullName: string; jobTitle: string }) {
  const copy = statusCopy[status];
  if (!copy) return null;
  const job = clean(a.jobTitle);
  return build({
    subject: `${copy.subject}: ${a.jobTitle}`,
    preheader: `An update on your application for ${a.jobTitle} at Techyera.`,
    heading: copy.heading,
    parts: [{ p: `Hi ${clean(firstName(a.fullName))},` }, ...copy.parts(job), { p: "Best regards,\nThe Techyera Talent Team" }],
    cta: copy.cta,
    footer: `You’re receiving this email about your application for ${job} at ${site.name}.`,
  });
}
