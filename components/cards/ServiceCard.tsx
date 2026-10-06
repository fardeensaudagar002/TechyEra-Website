import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/Icon";
import type { Service } from "@/types";

/** A cell in the shared-border services grid. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col bg-white p-7 transition-colors duration-200 hover:bg-mist/70 md:p-8"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <IconTile name={service.icon} />
      <h3 className="mt-6 text-[1.25rem]">{service.title}</h3>
      <p className="mt-3 flex-1 text-[0.9688rem] leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent">
        Explore service
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
