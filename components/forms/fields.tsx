import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { CircleAlert, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-[8px] border bg-white px-3.5 text-[0.9688rem] text-ink placeholder:text-[#8a94a8] transition-[border-color,box-shadow] focus:outline-none focus:ring-4";
const ok = "border-line-strong focus:border-accent focus:ring-accent/15";
const bad = "border-danger focus:border-danger focus:ring-danger/15";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-danger" aria-hidden> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] font-medium text-danger">
          <CircleAlert aria-hidden className="mt-[1px] h-3.5 w-3.5 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: boolean) =>
  [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: string; hasHint?: boolean };
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ invalid, hasHint, className, id, ...p }, ref) {
  return (
    <input ref={ref} id={id} aria-invalid={!!invalid} aria-describedby={describedBy(id!, invalid, hasHint)} className={cn(control, "h-11", invalid ? bad : ok, className)} {...p} />
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: string; options: readonly string[]; placeholder?: string };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ invalid, options, placeholder = "Select…", className, id, ...p }, ref) {
  return (
    <div className="relative">
      <select ref={ref} id={id} aria-invalid={!!invalid} aria-describedby={describedBy(id!, invalid)} className={cn(control, "h-11 appearance-none pr-10", invalid ? bad : ok, className)} defaultValue="" {...p}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: string; hasHint?: boolean };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, hasHint, className, id, ...p }, ref) {
  return (
    <textarea ref={ref} id={id} aria-invalid={!!invalid} aria-describedby={describedBy(id!, invalid, hasHint)} className={cn(control, "min-h-[140px] py-3 leading-relaxed", invalid ? bad : ok, className)} {...p} />
  );
});
