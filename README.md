# Techyera Consultancy Services — Corporate Website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · React Hook Form + Zod · Lucide icons

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Public pages are pre-rendered as static HTML. The admin panel and form endpoints run on the server, so the host must run Node.js (Vercel recommended) and provide a PostgreSQL database.

## Where to change things

| What | File |
|---|---|
| Company name, email, phone, address, map, social links, **statistics** | `data/site.ts` |
| Services (capabilities, technologies, benefits) | `data/services.ts` |
| Industries | `data/industries.ts` |
| Solutions (Problem → Approach → Technology → Outcome) | `data/solutions.ts` |
| Case studies | `data/case-studies.ts` |
| Insights / blog articles | `data/insights.ts` |
| Jobs | `data/jobs.ts` |
| Leadership, client logos, testimonials, technologies, values, careers benefits | `data/company.ts` |
| Admin panel pages | `app/admin/*` |
| Form endpoints and database | `app/api/*`, `lib/server/*` |
| Brand colours, radius, shadows (design tokens) | `app/globals.css` → `@theme` |
| Content types (mirror a future CMS/API) | `types/index.ts` |

Every file in `/data` returns plain typed objects, so you can swap any of them for a CMS or API call later without touching the components.

## Placeholders to replace before launch

- **Statistics** (`data/site.ts → stats`): the 50+ / 100+ / 20+ / 10+ figures come from the brief. Confirm them, or set `showStats: false` to hide them.
- **Phone**: set `contact.phone` and `contact.phoneHref`.
- **Office address and map**: set `contact.address` and `contact.mapEmbedUrl` (from Google Maps → Share → Embed). Until then, a placeholder map is shown.
- **Client logos**: add files to `/public/clients` and set `logo` in `data/company.ts`.
- **Leadership**: fill in `name`, `bio`, `photo` and `linkedin` in `data/company.ts`.
- **Case studies**: all six are labelled *Illustrative*. Replace them with approved client stories and set `illustrative: false`.
- **Testimonials**: this list is empty on purpose. The section appears only once you add real, approved quotes.
- **Life at Techyera photos**: set `image` in `lifeTiles` (`app/careers/page.tsx`).
- **Legal pages**: these are drafts and need review by legal counsel. Fill in the bracketed items (retention period, grievance officer, jurisdiction city).
- **Social URLs**: currently point to each platform's home page.

## Forms and the admin panel

Every job application and contact enquiry is saved to a database and shown in a private admin panel.

- **Sign in:** `https://www.techyera.co.in/admin` with the password you set in `ADMIN_PASSWORD`.
- **Job applications:** filter by position and status, search by name, email or city, download each resume, set a status (new, reviewing, shortlisted, interview, hired, rejected) and keep internal notes.
- **Enquiries:** read each message, reply by email, set a status and keep notes.
- **Download CSV** on either list opens in Excel or Google Sheets.
- **Email alerts (optional):** set `RESEND_API_KEY` and `NOTIFY_EMAIL` to get an email for each new submission.

On your own computer no setup is needed: `npm run dev` stores submissions in a `.data` folder. Create `.env.local` with `ADMIN_PASSWORD=some-long-password` to sign in.

Protections built in: server-side validation of every field, resume type checked by file content (PDF/Word only, 4 MB max), a hidden spam-trap field, sign-in attempt limits, HTTP-only signed session cookie, and `/admin` excluded from search engines.

## Going live on Vercel with techyera.co.in

1. Put this project in a GitHub repository and import it at vercel.com (New Project).
2. In the Vercel project, open **Storage** and add a **Postgres** database (Neon). This sets `DATABASE_URL` for you. Tables are created automatically on first use.
3. In **Settings → Environment Variables** add `ADMIN_PASSWORD`, `SESSION_SECRET` and `NEXT_PUBLIC_SITE_URL=https://www.techyera.co.in` (see `.env.example`), then redeploy.
4. In **Settings → Domains** add `techyera.co.in` and `www.techyera.co.in`. Vercel shows the DNS records to create; add them in the DNS settings of the company where you bought the domain.
5. Open `/admin`, sign in, and send a test enquiry and a test application.

Any other host that runs Node.js and offers PostgreSQL works the same way: set the same environment variables.

Email addresses such as `hello@techyera.co.in` and `careers@techyera.co.in` appear on the site. Create these mailboxes with an email provider (for example Google Workspace or Zoho Mail) so messages sent to them arrive.

## Built in

- SEO: per-page titles and descriptions, canonical URLs, Open Graph and X cards, a generated OG image, `sitemap.xml` and `robots.txt`
- Structured data: Organization, Article, JobPosting and BreadcrumbList schema (JSON-LD)
- Accessibility: skip link, landmarks, keyboard-trappable mobile menu (Esc closes it), visible focus, labelled fields with linked errors, `prefers-reduced-motion` support
- Performance: self-hosted variable font, SVG-only illustrations (no stock images), static pre-rendering, about 103 kB of shared JS
>>>>>>> ebb4899 (first commit of this website)
