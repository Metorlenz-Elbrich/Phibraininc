import { NextResponse, type NextRequest } from "next/server";
import { CSRF_COOKIE, generateCsrfToken } from "@/lib/security";

/**
 * Edge middleware — responsible for:
 *
 *  1. Issuing a per-session CSRF token cookie if none exists.
 *  2. Generating a strict, nonce-based Content-Security-Policy header on
 *     every HTML response.
 *  3. Setting a baseline of secure response headers that complement the
 *     headers declared in `next.config.mjs`.
 *
 * Static asset traffic is excluded via the matcher below to keep things fast.
 */

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    isDev ? "'unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  // Per-request CSP nonce
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Set CSP (Report-Only could be wired here for staged rollouts)
  response.headers.set("Content-Security-Policy", buildCspHeader(nonce));

  // Anti-MIME-sniff & clickjacking already in next.config; reinforce a few:
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  // Ensure a CSRF cookie exists. The client mirrors its value into the form.
  if (!request.cookies.get(CSRF_COOKIE)) {
    response.cookies.set({
      name: CSRF_COOKIE,
      value: generateCsrfToken(),
      httpOnly: false, // client must read it to submit the form
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every request except:
     *  - Next.js internals (_next/static, _next/image)
     *  - Static assets in /public (favicon, svgs, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$).*)",
  ],
};
