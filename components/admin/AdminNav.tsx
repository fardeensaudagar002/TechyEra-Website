"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminNav({ items }: { items: { href: string; label: string; count?: number }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="order-last flex w-full min-w-0 gap-1 overflow-x-auto md:order-none md:w-auto">
      {items.map((i) => {
        const active = i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined}
            className={cn("inline-flex h-9 shrink-0 items-center gap-2 rounded-[7px] px-3 text-sm font-semibold", active ? "bg-ink text-white" : "text-ink-2 hover:bg-mist")}>
            {i.label}
            {!!i.count && <span className={cn("rounded-full px-1.5 text-[0.75rem]", active ? "bg-white/20" : "bg-accent text-white")}>{i.count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
