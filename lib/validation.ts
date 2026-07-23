import { z } from "zod";

/** Options for the "Plan of interest" select in the contact form. */
export const planOptions = [
  { value: "starter", label: "Starter — content done for you" },
  { value: "management", label: "Management — social media, fully managed" },
  { value: "funnel-takeover", label: "Funnel Takeover — we run your selling process" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type PlanValue = (typeof planOptions)[number]["value"];

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "That email address is too long."),
  company: z.string().trim().max(120, "Company name is too long.").optional().or(z.literal("")),
  plan: z.enum(["starter", "management", "funnel-takeover", "not-sure"], {
    errorMap: () => ({ message: "Please choose a plan." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your listing — at least 10 characters.")
    .max(2000, "Message is too long (max 2000 characters)."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept the privacy policy so we can respond to you.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
