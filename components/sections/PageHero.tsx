import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

interface Props {
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

/** Shared hero for interior pages: breadcrumbs, H1, lede and a quiet blueprint field on the right. */
export function PageHero({ title, lede, crumbs, actions, aside, className }: Props) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line bg-white", className)}>
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-y-0 right-0 w-[55%] [mask-image:linear-gradient(to_left,black,transparent)]"
      />
      <div className="container-x relative pb-16 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[46rem]">
            <h1 className="text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.035em]">{title}</h1>
            {lede && <p className="lede mt-5 max-w-[40rem]">{lede}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
