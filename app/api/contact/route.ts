import { NextResponse, type NextRequest } from "next/server";
import { ContactFormSchema, escapeHtml, flattenZodErrors } from "@/lib/validation";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { CSRF_COOKIE, constantTimeEquals } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024; // 32 KB — generous but bounded
const MIN_FILL_MS = 2_000; // sub-2-second submissions are bots

/**
 * Secure contact endpoint.
 *
 * Defence-in-depth pipeline:
 *   1. Strict body-size cap
 *   2. CSRF (double-submit cookie) check
 *   3. Per-IP rate limit (5 / hour)
 *   4. Time-on-page heuristic
 *   5. Honeypot field
 *   6. Zod schema validation + sanitization
 *   7. HTML-escape outputs before any rendering / email
 */
export async function POST(req: NextRequest) {
  // 1. Bound payload size
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Payload too large." },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
  }

  // 2. CSRF — cookie value must match submitted field
  const cookieToken = req.cookies.get(CSRF_COOKIE)?.value ?? "";
  const submittedToken =
    raw && typeof raw === "object" && "csrf" in raw
      ? String((raw as Record<string, unknown>).csrf ?? "")
      : "";
  if (!cookieToken || !submittedToken || !constantTimeEquals(cookieToken, submittedToken)) {
    return NextResponse.json(
      { ok: false, message: "Invalid CSRF token." },
      { status: 403 },
    );
  }

  // 3. Per-IP rate limit
  const ip = clientIpFromHeaders(req.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // 4 + 5 + 6. Validate (honeypot + ts checks are inside the schema too)
  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some fields are invalid.",
        errors: flattenZodErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Time-on-page heuristic
  if (
    typeof data._ts === "number" &&
    Date.now() - data._ts < MIN_FILL_MS
  ) {
    // Pretend success — never tell a bot how it was detected
    return NextResponse.json({ ok: true, message: "Thanks — we'll be in touch." });
  }

  // 7. Build the safe internal payload (e.g., for email / queue / DB)
  const safePayload = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: data.company ? escapeHtml(data.company) : null,
    budget: data.budget ?? null,
    message: escapeHtml(data.message),
    submittedAt: new Date().toISOString(),
    ip,
  };

  // In production, replace this with your transactional email / queue.
  // We intentionally avoid third-party SDKs here so the demo runs offline.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[contact] new submission", safePayload);
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — we'll get back to you within one business day.",
  });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
