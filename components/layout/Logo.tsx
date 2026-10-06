import Link from "next/link";
import { cn } from "@/lib/utils";

/** The Techyera mark: a "T" drawn as a connected node graph. */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7.5" fill={inverted ? "#ffffff" : "var(--color-ink)"} />
      <path d="M8.5 10.5h15M16 10.5v11.5" stroke={inverted ? "var(--color-ink)" : "#fff"} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="8.5" cy="10.5" r="2.4" fill={inverted ? "var(--color-ink)" : "#fff"} />
      <circle cx="23.5" cy="10.5" r="2.4" fill={inverted ? "var(--color-ink)" : "#fff"} />
      <circle cx="16" cy="23" r="3" fill="#6f8bff" />
    </svg>
  );
}

export function Logo({ inverted = false, compact = false, className }: { inverted?: boolean; compact?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Techyera Consultancy Services — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark inverted={inverted} className={cn("transition-[width,height] duration-300", compact ? "h-8 w-8" : "h-9 w-9")} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.19rem] font-bold tracking-[-0.03em]", inverted ? "text-white" : "text-ink")}>Techyera</span>
        <span className={cn("mt-[3px] text-[0.66rem] font-medium tracking-[0.02em]", inverted ? "text-white/60" : "text-muted")}>
          Consultancy Services
        </span>
      </span>
    </Link>
  );
}
