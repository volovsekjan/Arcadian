"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { contactSchema, planOptions, type ContactInput } from "@/lib/validation";

const fieldClasses =
  "w-full rounded-xl border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder:text-ivory/60 transition-colors focus-visible:ring-offset-espresso";

const labelClasses = "mb-2 block text-sm font-medium text-ivory/90";

const errorClasses = "mt-2 text-sm text-gold-soft";

type Status = "idle" | "error" | "success";

type ContactApiResponse = { ok: boolean; message: string };

const DEFAULT_ERROR =
  "Something went wrong sending your message. Please try again, or email us directly.";

/**
 * Contact form on the espresso CTA band — React Hook Form + Zod,
 * posts JSON to /api/contact without native form navigation.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>(DEFAULT_ERROR);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Move keyboard/AT focus onto the confirmation once the form unmounts.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      plan: "not-sure",
      message: "",
      consent: false,
    },
  });

  // RHF keeps isSubmitting true for the whole async submit and the submit
  // button is disabled meanwhile, so repeated clicks / Enter can't double-submit.
  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as ContactApiResponse | null;

      // Success only when the internal API confirms n8n accepted the request.
      if (res.ok && data?.ok) {
        setStatus("success");
        reset(); // reset only after a confirmed success — failures keep the input
        return;
      }

      // Prefer the server's user-friendly message; never surface technical detail.
      setErrorMessage(data?.message ? data.message : DEFAULT_ERROR);
      setStatus("error");
    } catch {
      // Network error (request never completed).
      setErrorMessage(DEFAULT_ERROR);
      setStatus("error");
    }
  };

  // The live region stays mounted across both states so screen readers
  // reliably announce the confirmation when its content appears.
  const liveRegion = (
    <div aria-live="polite" className="sr-only">
      {status === "success" ? "Your message has been sent." : ""}
    </div>
  );

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ivory/15 bg-ivory/5 p-10 text-center">
        {liveRegion}
        <CheckCircle2 className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} aria-hidden="true" />
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 font-display text-xl font-medium text-ivory outline-none"
        >
          Thank you — your message is on its way.
        </h3>
        <p className="mt-2 text-sm text-ivory/70">
          We will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-ivory/25 px-5 text-sm text-ivory transition-colors duration-300 ease-out-soft hover:border-ivory/60 focus-visible:ring-offset-espresso"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-ivory/10 p-6 sm:p-8"
    >
      {liveRegion}
      {status === "error" && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ivory"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name*
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClasses}
            {...register("name")}
          />
          {errors.name && (
            <p id="contact-name-error" className={errorClasses}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email*
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClasses}
            {...register("email")}
          />
          {errors.email && (
            <p id="contact-email-error" className={errorClasses}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClasses}>
            Company (optional)
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder="Company or brokerage"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            className={fieldClasses}
            {...register("company")}
          />
          {errors.company && (
            <p id="contact-company-error" className={errorClasses}>
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-plan" className={labelClasses}>
            Plan of interest*
          </label>
          <div className="relative">
            <select
              id="contact-plan"
              aria-invalid={!!errors.plan}
              aria-describedby={errors.plan ? "contact-plan-error" : undefined}
              className={cn(fieldClasses, "appearance-none pr-10")}
              {...register("plan")}
            >
              {planOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-espresso text-ivory">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/50"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          {errors.plan && (
            <p id="contact-plan-error" className={errorClasses}>
              {errors.plan.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClasses}>
            Message*
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell us about the listing — a link or address, and what you would like made."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={fieldClasses}
            {...register("message")}
          />
          {errors.message && (
            <p id="contact-message-error" className={errorClasses}>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="contact-consent"
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "contact-consent-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-gold focus-visible:ring-offset-espresso"
              {...register("consent")}
            />
            <label htmlFor="contact-consent" className="text-sm text-ivory/70">
              I agree that Arcadian may use my details to respond to this enquiry, as described in
              the{" "}
              <Link
                href="/privacy-policy"
                className="underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold focus-visible:ring-offset-espresso"
              >
                privacy policy
              </Link>
              .
            </label>
          </div>
          {errors.consent && (
            <p id="contact-consent-error" className={errorClasses}>
              {errors.consent.message}
            </p>
          )}
        </div>

        <div className="mt-2 sm:col-span-2">
          {/* Only disable while submitting: a submit on an invalid form lets
              RHF render every field error and focus the first invalid input,
              instead of presenting a silently dead button. */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto focus-visible:ring-offset-espresso"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin motion-reduce:animate-none"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
