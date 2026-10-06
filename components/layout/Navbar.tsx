"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navigation, primaryCta, site } from "@/data/site";
import { cn } from "@/lib/utils";

const desktopNav = navigation.filter((n) => n.href !== "/" && n.href !== "/contact");

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock scroll, trap focus and handle Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled ? "border-line bg-white/90 shadow-[0_6px_24px_-16px_rgb(11_27_52/0.25)] backdrop-blur-md" : "border-transparent bg-white",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className={cn("container-x flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-16" : "h-[78px]")}>
        <Logo compact={scrolled} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                    isActive(item.href) ? "text-ink" : "text-ink-2 hover:text-accent",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span aria-hidden className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-accent" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined} className={cn("text-[0.9375rem] font-medium hover:text-accent", isActive("/contact") ? "text-accent" : "text-ink-2")}>
            Contact Us
          </Link>
          <ButtonLink href={primaryCta.href} variant="dark" size={scrolled ? "sm" : "md"}>{primaryCta.label}</ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-mist lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </header>

      {/* Mobile slide-out — rendered outside the header so backdrop-filter doesn't trap position:fixed */}
      <div className={cn("fixed inset-0 z-[70] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
        <div className={cn("absolute inset-0 bg-ink/30 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[78px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-mist" tabIndex={open ? 0 : -1}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("flex items-center justify-between py-4 text-lg font-semibold", isActive(item.href) ? "text-accent" : "text-ink")}
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="h-4 w-4 text-line-strong" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-4 border-t border-line p-5">
            <ButtonLink href={primaryCta.href} size="lg" className="w-full" tabIndex={open ? 0 : -1}>{primaryCta.label}</ButtonLink>
            <a href={`mailto:${site.contact.email}`} tabIndex={open ? 0 : -1} className="flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-accent">
              <Mail aria-hidden className="h-4 w-4" /> {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
