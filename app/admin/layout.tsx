import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { isAdmin } from "@/lib/server/session";
import { counts } from "@/lib/server/submissions";
import { logout } from "./actions";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Techyera Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();
  const c = authed ? await counts() : null;
  return (
    <div className="min-h-screen bg-mist">
      {authed && c && (
        <header className="sticky top-0 z-30 border-b border-line bg-white">
          <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
            <Link href="/admin" className="inline-flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="font-bold tracking-[-0.02em] text-ink">Techyera <span className="font-medium text-muted">Admin</span></span>
            </Link>
            <AdminNav items={[
              { href: "/admin", label: "Overview" },
              { href: "/admin/applications", label: "Job applications", count: c.applications.fresh },
              { href: "/admin/enquiries", label: "Enquiries", count: c.enquiries.fresh },
              { href: "/admin/emails", label: "Email templates" },
            ]} />
            <div className="ml-auto flex items-center gap-4 text-sm font-medium">
              <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">View website <ExternalLink aria-hidden className="h-3.5 w-3.5" /></Link>
              <form action={logout}><button type="submit" className="inline-flex items-center gap-1.5 text-muted hover:text-danger"><LogOut aria-hidden className="h-4 w-4" />Sign out</button></form>
            </div>
          </div>
        </header>
      )}
      <div className="container-x py-8 md:py-10">{children}</div>
    </div>
  );
}
