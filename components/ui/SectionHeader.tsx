import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  as?: "h2" | "h1";
  id?: string;
}

export function SectionHeader({ title, intro, align = "left", action, className, as: Tag = "h2", id }: Props) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-[44rem]", align === "center" && "mx-auto")}>
        <Tag id={id} className="h-section">{title}</Tag>
        {intro && <p className="lede mt-4">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
