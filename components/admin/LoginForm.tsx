"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: "" });
  return (
    <form action={action} className="mt-7 space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">Password</label>
        <input
          id="password" name="password" type="password" required autoFocus autoComplete="current-password"
          aria-invalid={!!state.error} aria-describedby={state.error ? "login-error" : undefined}
          className="h-11 w-full rounded-[8px] border border-line-strong px-3.5 text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
        />
      </div>
      {state.error && <p id="login-error" role="alert" className="rounded-[8px] bg-danger-soft px-3.5 py-2.5 text-sm font-medium text-danger">{state.error}</p>}
      <button type="submit" disabled={pending} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-ink font-semibold text-white hover:bg-accent disabled:opacity-60">
        {pending && <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />} Sign in
      </button>
    </form>
  );
}
