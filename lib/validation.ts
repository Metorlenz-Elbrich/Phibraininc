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
const NO_CONTROL_CHARS = new RegExp(
  "^[^\\u0000-\\u001F\\u007F]*$",
);

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

export const ContactFormSchema = z.object({
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
  budget: z
    .enum(["under-25k", "25k-50k", "50k-150k", "150k-plus", "not-sure"], {
      errorMap: () => ({ message: "Please pick a budget range." }),
    })
    .optional(),
  message: trimmedString(20, 4000, "Message"),

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
