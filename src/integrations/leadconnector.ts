import { z } from "zod";

/**
 * Enquiry schema, shared by the client form and the server route so
 * the two can never drift apart.
 *
 * Messages name the problem AND the recovery — "Enter an email we
 * can reply to" tells someone what to do; "Invalid email" does not.
 */
export const enquirySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Tell us your first name so we know who we are writing to."),
  lastName: z.string().trim().min(1, "Add your last name."),
  email: z
    .string()
    .trim()
    .min(1, "Add an email address so we can reply.")
    .email("That email looks incomplete — check for a typo."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 10,
      "A phone number needs at least 10 digits, or leave it blank.",
    ),
  groupSize: z.enum(["1-9", "10-19", "20-49", "50+", "not-sure"], {
    message: "Pick the closest group size — an estimate is fine.",
  }),
  occasion: z
    .string()
    .trim()
    .min(1, "What is the trip for? A few words is plenty."),
  message: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2,000 characters.")
    .optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const GROUP_SIZES: { value: EnquiryInput["groupSize"]; label: string }[] =
  [
    { value: "1-9", label: "Under 10 travellers" },
    { value: "10-19", label: "10 – 19 travellers" },
    { value: "20-49", label: "20 – 49 travellers" },
    { value: "50+", label: "50 or more" },
    { value: "not-sure", label: "Not sure yet" },
  ];
