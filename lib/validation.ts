import { z } from "zod";

/** Options for the "Service of interest" select in the contact form. */
export const serviceOptions = [
  { value: "content", label: "Content" },
  { value: "managed-content", label: "Managed Content" },
  { value: "funnel-takeover", label: "Funnel Takeover" },
  { value: "paid-pilot", label: "Paid pilot" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ServiceValue = (typeof serviceOptions)[number]["value"];

/** Options for the approximate number of new listings per month. */
export const listingVolumeOptions = [
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-30", label: "16–30" },
  { value: "30-plus", label: "More than 30" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ListingVolumeValue = (typeof listingVolumeOptions)[number]["value"];

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "That email address is too long."),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Please enter your WhatsApp number.")
    .max(20, "That number is too long.")
    .regex(/^\+?[0-9()\-\s]+$/, "Please enter a valid phone number."),
  company: z
    .string()
    .trim()
    .min(2, "Please tell us your agency or company.")
    .max(120, "Company name is too long."),
  // A portal listing link, or a Drive/WeTransfer-style link to the photos.
  listingUrl: z
    .string()
    .trim()
    .max(500, "That link is too long.")
    .optional()
    .or(z.literal("")),
  listingsPerMonth: z.enum(["1-5", "6-15", "16-30", "30-plus", "not-sure"], {
    errorMap: () => ({ message: "Please choose an approximate volume." }),
  }),
  service: z.enum(["content", "managed-content", "funnel-takeover", "paid-pilot", "not-sure"], {
    errorMap: () => ({ message: "Please choose a service." }),
  }),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long (max 2000 characters).")
    .optional()
    .or(z.literal("")),
  authorized: z.boolean().refine((value) => value === true, {
    message: "Please confirm you are authorized to share these listing assets.",
  }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept the privacy policy so we can respond to you.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
