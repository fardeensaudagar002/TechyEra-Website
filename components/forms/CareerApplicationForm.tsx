"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, LoaderCircle, Upload, X } from "lucide-react";
import { Field, Input, Select, Textarea } from "./fields";
import { FormError, FormSuccess } from "./FormStatus";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { applicationSchema, experienceOptions, submitForm, type ApplicationValues } from "@/lib/forms";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function CareerApplicationForm({ jobTitle, jobSlug }: { jobTitle: string; jobSlug: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", location: "", experience: "", linkedin: "", portfolio: "", coverLetter: "", consent: false },
  });

  const resume = watch("resume");
  const file = resume && resume.length ? resume[0] : null;
  const coverLen = watch("coverLetter")?.length ?? 0;

  const onSubmit = async (values: ApplicationValues, e?: React.BaseSyntheticEvent) => {
    const website = ((e?.target as HTMLFormElement | undefined)?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus("idle");
    try {
      await submitForm(process.env.NEXT_PUBLIC_CAREERS_ENDPOINT || "/api/applications", { ...values, job: jobSlug, jobTitle, website });
      setStatus("success");
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setServerError(err instanceof Error && !/^Request failed/.test(err.message) && !/fetch/i.test(err.message) ? err.message : "");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess title="Application submitted" action={<ButtonLink href="/careers#open-positions" variant="secondary">View other open positions</ButtonLink>}>
        Thank you for applying for <strong className="text-ink">{jobTitle}</strong>. Our talent team reviews every application and will contact you
        if your profile matches the role. You’ll hear from us at the email address you provided.
      </FormSuccess>
    );
  }

  const resumeReg = register("resume");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, filled in by spam bots, rejected by the server */}
      <div aria-hidden="true" className="hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="text-sm text-muted">Fields marked <span className="text-danger">*</span> are required.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" invalid={errors.fullName?.message} {...register("fullName")} />
        </Field>
        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" inputMode="email" invalid={errors.email?.message} {...register("email")} />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" placeholder="+91" invalid={errors.phone?.message} {...register("phone")} />
        </Field>
        <Field id="location" label="Current location" required error={errors.location?.message}>
          <Input id="location" autoComplete="address-level2" placeholder="City" invalid={errors.location?.message} {...register("location")} />
        </Field>
        <Field id="experience" label="Years of experience" required error={errors.experience?.message} className="sm:col-span-2">
          <Select id="experience" options={experienceOptions} placeholder="Select experience" invalid={errors.experience?.message} {...register("experience")} />
        </Field>
        <Field id="linkedin" label="LinkedIn URL" error={errors.linkedin?.message}>
          <Input id="linkedin" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/…" invalid={errors.linkedin?.message} {...register("linkedin")} />
        </Field>
        <Field id="portfolio" label="Portfolio / GitHub URL" error={errors.portfolio?.message}>
          <Input id="portfolio" type="url" inputMode="url" placeholder="https://" invalid={errors.portfolio?.message} {...register("portfolio")} />
        </Field>

        <Field id="resume" label="Resume" required error={errors.resume?.message as string | undefined} hint="PDF or Word document, up to 4 MB." className="sm:col-span-2">
          <label
            htmlFor="resume"
            className={cn(
              "flex cursor-pointer items-center gap-4 rounded-[10px] border border-dashed p-5 transition-colors focus-within:ring-4 focus-within:ring-accent/15",
              errors.resume ? "border-danger bg-danger-soft/40" : file ? "border-accent-line bg-accent-soft/50" : "border-line-strong hover:border-accent hover:bg-mist",
            )}
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-accent shadow-[var(--shadow-card)]">
              {file ? <FileText aria-hidden className="h-5 w-5" /> : <Upload aria-hidden className="h-5 w-5" />}
            </span>
            <span className="min-w-0 flex-1">
              {file ? (
                <>
                  <span className="block truncate text-[0.9375rem] font-semibold text-ink">{file.name}</span>
                  <span className="text-[0.8125rem] text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB · click to replace</span>
                </>
              ) : (
                <>
                  <span className="block text-[0.9375rem] font-semibold text-ink">Choose a file to upload</span>
                  <span className="text-[0.8125rem] text-muted">Browse your device</span>
                </>
              )}
            </span>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              aria-invalid={!!errors.resume}
              aria-describedby={errors.resume ? "resume-error" : "resume-hint"}
              {...resumeReg}
            />
          </label>
          {file && (
            <button type="button" onClick={() => resetField("resume")} className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-muted hover:text-danger">
              <X aria-hidden className="h-3.5 w-3.5" /> Remove file
            </button>
          )}
        </Field>

        <Field id="coverLetter" label="Cover letter" error={errors.coverLetter?.message} hint={`Tell us why this role interests you. ${coverLen}/3000`} className="sm:col-span-2">
          <Textarea id="coverLetter" rows={6} hasHint invalid={errors.coverLetter?.message} {...register("coverLetter")} />
        </Field>
      </div>

      <div>
        <label className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
          <input
            type="checkbox"
            className="mt-1 h-[18px] w-[18px] shrink-0 rounded border-line-strong accent-[var(--color-accent)]"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I consent to {site.name} storing and processing my personal data to evaluate my application, as described in the{" "}
            <a href="/privacy-policy" className="font-medium text-accent hover:underline">Privacy Policy</a>. <span className="text-danger" aria-hidden>*</span>
          </span>
        </label>
        {errors.consent && <p id="consent-error" role="alert" className="mt-1.5 pl-[30px] text-[0.8125rem] font-medium text-danger">{errors.consent.message}</p>}
      </div>

      {status === "error" && (
        <FormError>
          {serverError || "We couldn’t submit your application. Check your connection and try again."} You can also email your resume to{" "}
          <a href={`mailto:${site.contact.careersEmail}`} className="font-semibold underline">{site.contact.careersEmail}</a>.
        </FormError>
      )}

      <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
        {isSubmitting ? <><LoaderCircle aria-hidden className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit Application"}
      </button>
    </form>
  );
}
