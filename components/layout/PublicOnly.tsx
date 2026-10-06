"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides public site chrome (navbar, footer) inside the admin panel. */
export function PublicOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
