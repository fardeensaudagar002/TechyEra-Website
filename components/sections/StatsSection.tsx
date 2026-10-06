import { Counter } from "@/components/ui/Counter";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Animated statistics. Values come from data/site.ts. */
export function StatsSection({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  if (!site.showStats) return null;
  return (
    <dl className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border lg:grid-cols-4", tone === "dark" ? "border-white/10 bg-white/10" : "border-line bg-line", className)}>
      {site.stats.map((s) => (
        <div key={s.label} className={cn("flex flex-col-reverse gap-1 p-6 md:p-8", tone === "dark" ? "bg-ink" : "bg-white")}>
          <dt className={cn("text-[0.9375rem]", tone === "dark" ? "text-white/65" : "text-muted")}>{s.label}</dt>
          <dd className={cn("text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums", tone === "dark" ? "text-white" : "text-ink")}>
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
