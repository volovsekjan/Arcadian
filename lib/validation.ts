import { z } from "zod";

/** Options for the approximate number of new listings per month. */
export const listingVolumeOptions = [
  { value: "1-5", label: "1-5" },
  { value: "6-15", label: "6-15" },
  { value: "16-30", label: "16-30" },
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
  // No phone or WhatsApp field. The form does not collect a number at this
  // stage, so there is nothing to validate; /api/contact still sends the key
  // to n8n as an empty string, in the same way it sends `plan`.
  company: z
    .string()
    .trim()
    .min(2, "Please tell us your agency or company.")
    .max(120, "Company name is too long."),
  // A portal listing link, or a Drive/WeTransfer-style link to the photos.
  listingUrl: z.string().trim().max(500, "That link is too long.").optional().or(z.literal("")),
  listingsPerMonth: z.enum(["1-5", "6-15", "16-30", "30-plus", "not-sure"], {
    errorMap: () => ({ message: "Please choose an approximate volume." }),
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
