import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "secondary" | "light" | "ghost-light";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  dark: "bg-ink text-white hover:bg-accent",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink",
  light: "bg-white text-ink hover:bg-accent-soft",
  "ghost-light": "border border-white/30 text-white hover:bg-white/10",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", size = "md", className, arrow, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClass(variant, size, className), "group")} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

/** Inline text link with trailing arrow — "Explore service", "Read more", etc. */
export function ArrowLink({ href, children, className, srLabel }: { href: string; children: ReactNode; className?: string; srLabel?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent hover:text-accent-strong", className)}>
      {children}
      {srLabel && <span className="sr-only">{srLabel}</span>}
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
