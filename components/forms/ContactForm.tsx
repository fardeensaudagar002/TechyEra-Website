"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "./fields";
import { FormError, FormSuccess } from "./FormStatus";
import { buttonClass } from "@/components/ui/Button";
import { budgetOptions, contactSchema, countryOptions, serviceOptions, submitForm, type ContactValues } from "@/lib/forms";
import { site } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", company: "", email: "", phone: "", country: "", service: "", budget: "", message: "" },
  });

  const onSubmit = async (values: ContactValues, e?: React.BaseSyntheticEvent) => {
    const website = ((e?.target as HTMLFormElement | undefined)?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus("idle");
    try {
      await submitForm(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact", { ...values, website });
      setStatus("success");
      reset();
    } catch (err) {
      setServerError(err instanceof Error && !/^Request failed/.test(err.message) && !/fetch/i.test(err.message) ? err.message : "");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Message sent"
        action={<button type="button" onClick={() => setStatus("idle")} className={buttonClass("secondary")}>Send another message</button>}
      >
        Thank you for reaching out. A member of our team will reply within one business day. For anything urgent, email{" "}
        <a className="font-semibold text-accent underline-offset-2 hover:underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-describedby="contact-required-note">
      {/* Honeypot: hidden from people, filled in by spam bots, rejected by the server */}
      <div aria-hidden="true" className="hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p id="contact-required-note" className="text-sm text-muted">Fields marked <span className="text-danger">*</span> are required.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name?.message}>
          <Input id="name" autoComplete="name" invalid={errors.name?.message} {...register("name")} />
        </Field>
        <Field id="company" label="Company" required error={errors.company?.message}>
          <Input id="company" autoComplete="organization" invalid={errors.company?.message} {...register("company")} />
        </Field>
        <Field id="email" label="Work email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" inputMode="email" invalid={errors.email?.message} {...register("email")} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" placeholder="+91" invalid={errors.phone?.message} {...register("phone")} />
        </Field>
        <Field id="country" label="Country" required error={errors.country?.message}>
          <Select id="country" options={countryOptions} placeholder="Select country" autoComplete="country-name" invalid={errors.country?.message} {...register("country")} />
        </Field>
        <Field id="service" label="Service interested in" required error={errors.service?.message}>
          <Select id="service" options={serviceOptions} placeholder="Select a service" invalid={errors.service?.message} {...register("service")} />
        </Field>
        <Field id="budget" label="Project budget" required error={errors.budget?.message} className="sm:col-span-2">
          <Select id="budget" options={budgetOptions} placeholder="Select an approximate range" invalid={errors.budget?.message} {...register("budget")} />
        </Field>
        <Field id="message" label="Message" required error={errors.message?.message} hint="Briefly describe your goals, timeline and current systems." className="sm:col-span-2">
          <Textarea id="message" rows={6} hasHint invalid={errors.message?.message} {...register("message")} />
        </Field>
      </div>

      {status === "error" && (
        <FormError>
          {serverError || "We couldn’t send your message. Check your connection and try again."} You can also email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="font-semibold underline">{site.contact.email}</a>.
        </FormError>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] text-muted">
          We use your details only to respond to this enquiry. See our <a href="/privacy-policy" className="font-medium text-accent hover:underline">Privacy Policy</a>.
        </p>
        <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "lg")}>
          {isSubmitting ? <><LoaderCircle aria-hidden className="h-4 w-4 animate-spin" /> Sending…</> : <>Send Message <Send aria-hidden className="h-4 w-4" /></>}
        </button>
      </div>
    </form>
  );
}
