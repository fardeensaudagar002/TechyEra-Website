import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Industry } from "@/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full flex-col rounded-[10px] border border-line bg-white p-4 sm:p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent-line hover:shadow-[var(--shadow-card)]"
    >
      <Icon name={industry.icon} className="h-6 w-6 text-accent" />
      <h3 className="mt-3 text-[0.9688rem] leading-snug sm:mt-4 sm:text-[1.0625rem] group-hover:text-accent-strong">{industry.title}</h3>
      <p className="mt-2 hidden text-[0.9063rem] leading-relaxed text-muted sm:block">{industry.summary}</p>
    </Link>
  );
}
