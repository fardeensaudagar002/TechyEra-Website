import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ title, text, action }: { title: string; text: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-[14px] border border-dashed border-line-strong bg-white px-6 py-16 text-center" role="status">
      <SearchX aria-hidden className="mx-auto h-10 w-10 text-line-strong" strokeWidth={1.5} />
      <h3 className="mt-4 text-[1.25rem]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[0.9688rem] text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
