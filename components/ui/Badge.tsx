import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "accent" | "outline"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2.5 py-1 text-[0.8125rem] font-medium leading-tight",
        tone === "neutral" && "bg-mist text-ink-2",
        tone === "accent" && "bg-accent-soft text-accent-strong",
        tone === "outline" && "border border-line bg-white text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
