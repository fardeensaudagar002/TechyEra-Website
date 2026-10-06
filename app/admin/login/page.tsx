import { redirect } from "next/navigation";
import { LogoMark } from "@/components/layout/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/server/session";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <div className="rounded-[16px] border border-line bg-white p-8 shadow-[var(--shadow-card)]">
        <LogoMark className="h-10 w-10" />
        <h1 className="mt-5 text-[1.5rem]">Techyera Admin</h1>
        <p className="mt-1.5 text-[0.9375rem] text-muted">Sign in to view job applications and enquiries.</p>
        <LoginForm />
      </div>
    </div>
  );
}
