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

/**
 * The checklist opt-in on the homepage.
 *
 * Its own schema rather than a reuse of `enquirySchema`: this form
 * asks for a trip shape (type, destination, dates) that the group
 * enquiry does not, and one name field instead of two because that
 * is what the GHL form it replaces asked for.
 *
 * `consent` is required and unticked by default. A pre-ticked box is
 * not consent, and this form hands an email address to a CRM.
 */
export const TRAVEL_TYPES = [
  "Wellness retreat",
  "Milestone celebration",
  "Corporate or team trip",
  "Family reunion",
  "Friends' group trip",
  "Cruise",
  "Not sure yet",
] as const;

export const checklistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Tell us your name so we know who we are writing to."),
  email: z
    .string()
    .trim()
    .min(1, "Add an email address — the checklist is sent there.")
    .email("That email looks incomplete — check for a typo."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 10,
      "A phone number needs at least 10 digits, or leave it blank.",
    ),
  travelType: z.enum(TRAVEL_TYPES, {
    message: "Pick the closest kind of trip — you can change your mind later.",
  }),
  groupSize: z.enum(["1-9", "10-19", "20-49", "50+", "not-sure"], {
    message: "Pick the closest group size — an estimate is fine.",
  }),
  destination: z.string().trim().max(200).optional(),
  dates: z.string().trim().max(200).optional(),
  extraordinary: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2,000 characters.")
    .optional(),
  consent: z.literal(true, {
    message: "We need your agreement before we can email you.",
  }),
});

export type ChecklistInput = z.infer<typeof checklistSchema>;
