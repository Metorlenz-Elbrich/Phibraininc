import { NextResponse, type NextRequest } from "next/server";
import { ContactFormSchema, escapeHtml, flattenZodErrors } from "@/lib/validation";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { CSRF_COOKIE, constantTimeEquals } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024; // 64 KB — accommodates the extended form
const MIN_FILL_MS = 2_500; // sub-2.5s submissions are bots

/**
 * Secure contact endpoint — defence-in-depth pipeline:
 *
 *   1. Strict body-size cap                          (DoS / over-post)
 *   2. Content-Type allowlist                        (CSRF / browser confusion)
 *   3. CSRF double-submit cookie                     (cross-site forging)
 *   4. Per-IP rate limit (5 / hour)                  (abuse throttling)
 *   5. Per-IP+UA fingerprint rate limit (3 / 15 min) (bot mitigation)
 *   6. Time-on-page heuristic                        (bot mitigation)
 *   7. Honeypot field                                (bot mitigation)
 *   8. Zod schema validation + sanitization          (input validation)
 *   9. HTML-escape outputs before any rendering / email
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

  // 2. Restrict content type — browsers never send anything else from fetch.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unsupported content type." },
      { status: 415 },
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

  // 3. CSRF — cookie value must match submitted field
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

  // 4 + 5. Layered rate limit: a coarse per-IP bucket and a tighter
  // IP+User-Agent fingerprint bucket. The fingerprint catches single-IP
  // scripted abuse that rotates User-Agents far faster than the coarse limit.
  const ip = clientIpFromHeaders(req.headers);
  const ua = (req.headers.get("user-agent") ?? "anon").slice(0, 80);
  const fingerprint = `${ip}|${ua}`;

  const ipLimit = rateLimit(`contact:ip:${ip}`, 5, 60 * 60 * 1000);
  const fpLimit = rateLimit(`contact:fp:${fingerprint}`, 3, 15 * 60 * 1000);
  if (!ipLimit.success || !fpLimit.success) {
    const reset = Math.max(ipLimit.resetAt, fpLimit.resetAt);
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        },
      },
    );
  }

  // 6 + 7 + 8. Validate (honeypot + ts checks are inside the schema too)
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

  // Time-on-page heuristic — silently drop sub-threshold submissions.
  if (typeof data._ts === "number" && Date.now() - data._ts < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, message: "Thanks — we'll be in touch." });
  }

  // 9. Build the safe internal payload (e.g., for email / queue / DB)
  const safePayload = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: data.company ? escapeHtml(data.company) : null,
    phone: data.phone ?? null,
    service: data.service,
    projectType: data.projectType,
    companySize: data.companySize ?? null,
    budget: data.budget,
    timeline: data.timeline,
    preferredContact: data.preferredContact,
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
    message: "Thanks — a senior engineer will reply within one business day.",
  });
}

// Block every other method explicitly so attackers can't probe behaviour.
function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
