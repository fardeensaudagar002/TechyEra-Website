import { Check } from "lucide-react";
import { TechnologyBadge } from "@/components/sections/TechnologySection";
import type { Service } from "@/types";

/** Capabilities, technologies and business benefits of a service. Shared by /services and /services/[slug]. */
export function ServiceDetails({ service: s }: { service: Service }) {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[1.125rem]">Capabilities</h3>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
          {s.capabilities.map((c) => (
            <li key={c} className="flex items-center gap-3 border-b border-line py-3.5 text-[1rem] font-medium text-ink">
              <Check aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-[1.125rem]">Technologies</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {s.technologies.map((t) => <li key={t}><TechnologyBadge name={t} /></li>)}
        </ul>
      </div>
      <div>
        <h3 className="text-[1.125rem]">Business benefits</h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {s.benefits.map((b) => (
            <li key={b.title} className="rounded-[10px] border border-line bg-white p-5">
              <p className="font-semibold text-ink">{b.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
