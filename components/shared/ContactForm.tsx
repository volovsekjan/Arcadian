"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { contactSchema, listingVolumeOptions, type ContactInput } from "@/lib/validation";

const fieldClasses =
  "w-full rounded-xl border border-ivory/25 bg-ivory/10 px-4 py-3 text-body-sm text-ivory placeholder:text-ivory/70 transition-colors focus-visible:ring-offset-midnight";

const labelClasses = "mb-2 block text-body-sm font-medium text-ivory/90";

const errorClasses = "mt-2 text-body-sm text-gold-soft";

type Status = "idle" | "error" | "success";

type ContactApiResponse = { ok: boolean; message: string };

/**
 * Shown when the request never reached the API. The API supplies its own
 * message for every other failure.
 *
 * No error names an alternative channel: the site publishes no inbox and no
 * messaging number, so "email us instead" would point nowhere. Every failure
 * state asks for a retry instead.
 */
const DEFAULT_ERROR = "Something went wrong sending your request. Please try again.";

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
    /*
     * Validate on submit, not on touch.
     *
     * `onTouched` showed "Please tell us your name." the moment focus left an
     * empty field, so simply tabbing through the form lit it up red before
     * anyone had tried to send anything.
     *
     * `reValidateMode` stays "onChange" on purpose: an error still cannot
     * appear until Send Request is pressed, but once one is on screen it
     * clears as the field is corrected, rather than persisting until the next
     * submit. If errors should freeze between submits, this becomes
     * "onSubmit" too.
     */
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
      listingUrl: "",
      listingsPerMonth: "not-sure",
      message: "",
      authorized: false,
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
      {status === "success" ? "Your request has been sent." : ""}
    </div>
  );

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ivory/25 bg-ivory/10 p-10 text-center">
        {liveRegion}
        <CheckCircle2 className="mx-auto h-8 w-8 text-gold" strokeWidth={1.75} aria-hidden="true" />
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 font-sans text-h3 font-medium text-ivory outline-none"
        >
          Thank you. Your request is on its way.
        </h3>
        <p className="mt-2 text-body-sm text-ivory/70">
          We will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-ivory/35 px-5 text-body-sm text-ivory transition-colors duration-300 ease-out-soft hover:border-ivory/70 focus-visible:ring-offset-midnight"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-ivory/20 p-6 sm:p-8"
    >
      {liveRegion}
      {status === "error" && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-body-sm text-ivory"
        >
          <p>{errorMessage}</p>
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
            Work email*
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@agency.com"
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
          <label htmlFor="contact-whatsapp" className={labelClasses}>
            WhatsApp number*
          </label>
          <input
            id="contact-whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined}
            className={fieldClasses}
            {...register("whatsapp")}
          />
          {errors.whatsapp && (
            <p id="contact-whatsapp-error" className={errorClasses}>
              {errors.whatsapp.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClasses}>
            Agency or company*
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder="Agency or company name"
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
          <label htmlFor="contact-listing-url" className={labelClasses}>
            Listing URL or photo link (optional)
          </label>
          <input
            id="contact-listing-url"
            type="text"
            placeholder="A portal listing link, or a Drive / WeTransfer link to the photos"
            aria-invalid={!!errors.listingUrl}
            aria-describedby={errors.listingUrl ? "contact-listing-url-error" : undefined}
            className={fieldClasses}
            {...register("listingUrl")}
          />
          {errors.listingUrl && (
            <p id="contact-listing-url-error" className={errorClasses}>
              {errors.listingUrl.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-volume" className={labelClasses}>
            New listings per month (approx.)*
          </label>
          <div className="relative">
            <select
              id="contact-volume"
              aria-invalid={!!errors.listingsPerMonth}
              aria-describedby={errors.listingsPerMonth ? "contact-volume-error" : undefined}
              className={cn(fieldClasses, "appearance-none pr-10")}
              {...register("listingsPerMonth")}
            >
              {listingVolumeOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-midnight text-ivory">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="icon-inline pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ivory/50"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>
          {errors.listingsPerMonth && (
            <p id="contact-volume-error" className={errorClasses}>
              {errors.listingsPerMonth.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClasses}>
            Message (optional)
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Anything we should know about the property or your accounts."
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
              id="contact-authorized"
              type="checkbox"
              aria-invalid={!!errors.authorized}
              aria-describedby={errors.authorized ? "contact-authorized-error" : undefined}
              className="icon-inline mt-0.5 accent-gold focus-visible:ring-offset-midnight"
              {...register("authorized")}
            />
            <label htmlFor="contact-authorized" className="text-body-sm text-ivory/85">
              I confirm that I am authorized to share these listing assets for the purpose of
              creating marketing content.
            </label>
          </div>
          {errors.authorized && (
            <p id="contact-authorized-error" className={errorClasses}>
              {errors.authorized.message}
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
              className="icon-inline mt-0.5 accent-gold focus-visible:ring-offset-midnight"
              {...register("consent")}
            />
            <label htmlFor="contact-consent" className="text-body-sm text-ivory/85">
              I agree that Arcadian may use my details to respond to this enquiry, as described in
              the{" "}
              <Link
                href="/privacy-policy"
                className="underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold focus-visible:ring-offset-midnight"
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
            className="w-full focus-visible:ring-offset-midnight sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="icon-inline animate-spin motion-reduce:animate-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
