import { NextResponse, type NextRequest } from "next/server";
import { CSRF_COOKIE, generateCsrfToken } from "@/lib/security";

/**
 * Edge middleware — responsible for:
 *
 *  1. Issuing a per-session CSRF token cookie when none exists.
 *  2. Emitting a per-request Content-Security-Policy that is compatible
 *     with the Next.js App Router runtime AND with our React + Framer
 *     Motion stack, while still defending against XSS and clickjacking.
 *  3. Reinforcing the baseline security headers declared in `next.config.mjs`.
 *
 * Why CSP is split into dev vs production policies:
 *
 *  - In production, the policy is **nonce-based**: every HTML response gets
 *    a fresh random nonce, the nonce is forwarded to the app via the
 *    `x-nonce` request header, and the CSP is published on both the request
 *    *and* response headers. Setting CSP on the request header is what
 *    triggers Next.js's automatic nonce-stamping of its hydration scripts
 *    (see https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy).
 *    We intentionally do **not** use `'strict-dynamic'` — it conflicts with
 *    Next.js's runtime chunk loading from `'self'`, which was the root cause
 *    of the violations being reported.
 *
 *  - In development, React Fast Refresh and the Next.js dev runtime rely on
 *    `eval`, on inline scripts injected without a nonce, and on a WebSocket
 *    to localhost. A nonce-only policy would break HMR, so we relax to
 *    `'unsafe-inline' 'unsafe-eval'` and allow `ws:` to localhost. Dev DX
 *    is not a security concern because dev builds are never user-facing.
 */

const isProd = process.env.NODE_ENV === "production";

function buildCspHeader(nonce: string): string {
  // Directives shared between dev & prod.
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
    "img-src": ["'self'", "data:", "blob:", "https:"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    "manifest-src": ["'self'"],
  };

  // Standalone CSP keywords (no value list) — emitted as bare tokens.
  const standalone: string[] = [];

  if (isProd) {
    // Strict, nonce-based policy. We intentionally omit `'strict-dynamic'`
    // because it disables the allowlist semantics that Next.js's
    // same-origin chunk loading relies on.
    directives["script-src"] = ["'self'", `'nonce-${nonce}'`];
    directives["connect-src"] = ["'self'"];
    standalone.push("upgrade-insecure-requests");
  } else {
    // Permissive dev policy — required by React Fast Refresh (eval-based
    // HMR) and the Next.js dev runtime, which injects bootstrap scripts
    // without nonces and opens a WebSocket to localhost.
    directives["script-src"] = [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
    ];
    directives["connect-src"] = [
      "'self'",
      "ws:",
      "wss:",
      "http://localhost:*",
      "http://127.0.0.1:*",
    ];
  }

  const parts = Object.entries(directives).map(
    ([key, values]) => `${key} ${values.join(" ")}`,
  );
  parts.push(...standalone);
  return parts.join("; ");
}

/** Edge-safe nonce generator (Web Crypto). */
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary).replace(/=+$/, "");
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCspHeader(nonce);

  // Forward the nonce + CSP to the app via request headers so:
  //  - Next.js can stamp its own inline scripts with this nonce.
  //  - Our root layout can read it via `headers().get('x-nonce')` and apply
  //    it to any inline <script> we author (e.g. JSON-LD).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Publish the same policy on the response so the browser actually enforces
  // it. (Without this, only Next.js sees the policy — the browser doesn't.)
  response.headers.set("Content-Security-Policy", csp);

  // Reinforce baseline headers in case `next.config.mjs` isn't applied
  // (e.g. when serving from a custom host).
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  );

  // Mint a CSRF token cookie if missing. Idempotent — won't overwrite an
  // existing token, so route prefetches and concurrent requests are safe.
  if (!request.cookies.get(CSRF_COOKIE)) {
    response.cookies.set({
      name: CSRF_COOKIE,
      value: generateCsrfToken(),
      httpOnly: false, // the client must read the cookie to echo it back
      sameSite: "lax",
      secure: isProd,
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
     *  - Next.js internals  (`_next/static`, `_next/image`)
     *  - API routes         (no HTML, no CSP needed)
     *  - Static public files (favicon, svgs, images)
     *  - Route prefetches    (avoid spurious CSP/cookie churn)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.avif$|.*\\.ico$|.*\\.txt$|.*\\.xml$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
