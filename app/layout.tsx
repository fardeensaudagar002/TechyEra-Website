import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PublicOnly } from "@/components/layout/PublicOnly";
import { BackToTop } from "@/components/layout/BackToTop";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/data/site";

// Manrope variable font (SIL Open Font License), self-hosted for performance and privacy
const manrope = localFont({
  src: "./fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Techyera Consultancy Services | Software & Technology Solutions",
    template: "%s | Techyera Consultancy Services",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["software development company India", "IT consulting", "cloud consulting", "data engineering", "AI solutions", "digital transformation", "quality engineering"],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <PublicOnly><Navbar /></PublicOnly>
        <main id="main" className="flex-1">{children}</main>
        <PublicOnly><Footer /><BackToTop /></PublicOnly>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
