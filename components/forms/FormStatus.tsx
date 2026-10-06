import { CircleCheckBig, CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

export function FormSuccess({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className="rounded-[12px] border border-success/25 bg-success-soft p-8 text-center md:p-10">
      <CircleCheckBig aria-hidden className="mx-auto h-12 w-12 text-success" strokeWidth={1.5} />
      <h3 className="mt-5 text-[1.5rem]">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-[0.9688rem] leading-relaxed text-ink-2">{children}</div>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-[10px] border border-danger/25 bg-danger-soft p-4 text-[0.9375rem] text-danger">
      <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
