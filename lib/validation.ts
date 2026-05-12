import { z } from "zod";

/**
 * Server-trustable validation layer for the contact form.
 *
 * Design rules:
 *  - Every field has bounded length (DoS / log-pollution defence).
 *  - Strings are trimmed and normalized server-side.
 *  - Control characters (0x00-0x1F, 0x7F) are rejected to mitigate
 *    header / log / control-byte injection vectors.
 *  - `_hp` is a honeypot: if filled, the submission is silently dropped.
 *  - `_ts` records when the form rendered; submissions in <2s are bots.
 */

// Built with `new RegExp` (rather than a literal) so source files stay
// free of raw control bytes.
const NO_CONTROL_CHARS = new RegExp("^[^\\u0000-\\u001F\\u007F]*$");

const trimmedString = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} is required.` })
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(min, `${label} must be at least ${min} characters.`)
        .max(max, `${label} must be at most ${max} characters.`)
        .regex(NO_CONTROL_CHARS, `${label} contains invalid characters.`),
    );

// Enum lists are kept here so the form + server share a single source of truth.
export const SERVICE_OPTIONS = [
  { value: "web", label: "Secure web platform" },
  { value: "mobile", label: "Cross-platform mobile" },
  { value: "design", label: "UI / UX design" },
  { value: "api", label: "Backend / API engineering" },
  { value: "cloud", label: "Cloud integration" },
  { value: "modernization", label: "Software modernization" },
  { value: "support", label: "Maintenance & support" },
  { value: "other", label: "Something else" },
] as const;

export const PROJECT_TYPE_OPTIONS = [
  { value: "new-product", label: "New product build" },
  { value: "redesign", label: "Redesign / re-platform" },
  { value: "modernization", label: "Legacy modernization" },
  { value: "augmentation", label: "Team augmentation" },
  { value: "audit", label: "Audit / consulting" },
] as const;

export const COMPANY_SIZE_OPTIONS = [
  { value: "solo", label: "Solo / founder" },
  { value: "small", label: "2 – 10 people" },
  { value: "mid", label: "11 – 50 people" },
  { value: "large", label: "51 – 250 people" },
  { value: "enterprise", label: "250+ people" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-25k", label: "Under $25k" },
  { value: "25k-50k", label: "$25k – $50k" },
  { value: "50k-150k", label: "$50k – $150k" },
  { value: "150k-plus", label: "$150k+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "In 1 – 3 months" },
  { value: "3-6-months", label: "In 3 – 6 months" },
  { value: "6-plus-months", label: "In 6+ months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const CONTACT_METHOD_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "video", label: "Video call" },
] as const;

const enumValues = <T extends ReadonlyArray<{ value: string }>>(arr: T) =>
  arr.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

// Lenient phone normalizer — keeps + and digits only.
const phoneSchema = z
  .string()
  .max(40, "Phone must be at most 40 characters.")
  .optional()
  .transform((v) => v?.replace(/[^\d+]/g, "").trim() || undefined)
  .pipe(
    z
      .string()
      .regex(/^\+?[\d]{6,20}$/u, "Please provide a valid phone number.")
      .optional(),
  );

export const ContactFormSchema = z.object({
  // Identity
  name: trimmedString(2, 80, "Name"),
  email: z
    .string({ required_error: "Email is required." })
    .transform((v) => v.trim().toLowerCase())
    .pipe(
      z
        .string()
        .min(5, "Email is too short.")
        .max(254, "Email is too long.")
        .email("Please provide a valid email address."),
    ),
  company: z
    .string()
    .max(120, "Company must be at most 120 characters.")
    .optional()
    .transform((v) => v?.trim() || undefined),
  phone: phoneSchema,

  // Qualification
  service: z.enum(enumValues(SERVICE_OPTIONS), {
    errorMap: () => ({ message: "Please select the capability you need." }),
  }),
  projectType: z.enum(enumValues(PROJECT_TYPE_OPTIONS), {
    errorMap: () => ({ message: "Please select a project type." }),
  }),
  companySize: z
    .enum(enumValues(COMPANY_SIZE_OPTIONS), {
      errorMap: () => ({ message: "Please select a company size." }),
    })
    .optional(),
  budget: z.enum(enumValues(BUDGET_OPTIONS), {
    errorMap: () => ({ message: "Please pick a budget range." }),
  }),
  timeline: z.enum(enumValues(TIMELINE_OPTIONS), {
    errorMap: () => ({ message: "Please pick a timeline." }),
  }),
  preferredContact: z
    .enum(enumValues(CONTACT_METHOD_OPTIONS), {
      errorMap: () => ({ message: "Please pick a contact method." }),
    })
    .optional()
    .default("email"),

  // Narrative
  message: trimmedString(20, 4000, "Project description"),

  // Hidden anti-spam fields
  _hp: z.string().max(0, "Spam detected.").optional().default(""),
  _ts: z.coerce.number().int().nonnegative().optional(),

  // CSRF token (double-submit cookie pattern)
  csrf: z.string().min(16, "Invalid request."),

  consent: z
    .boolean({
      required_error: "You must accept the privacy policy.",
      invalid_type_error: "You must accept the privacy policy.",
    })
    .refine((v) => v === true, {
      message: "You must accept the privacy policy.",
    }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/** Returns a flat `{ field: message }` record from a ZodError. */
export function flattenZodErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_form";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

/** Conservative HTML escaper — used before echoing user input into emails. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
