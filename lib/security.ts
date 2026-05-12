import "server-only";

/**
 * CSRF protection — double-submit cookie pattern.
 *
 * 1. A random token is set in a `csrf-token` cookie (readable by the client
 *    JS so it can be echoed back in the form payload).
 * 2. On submission, the server checks that the cookie value matches the
 *    submitted field value, using a timing-safe comparison.
 *
 * Edge-Runtime compatible: this module uses only the Web Crypto API
 * (`globalThis.crypto.getRandomValues`) and standard JavaScript built-ins.
 * No Node-only modules (`crypto`, `Buffer`, `fs`, …) are imported, so the
 * file is safe to consume from both Edge middleware AND Node.js route
 * handlers.
 *
 * Threat model:
 *  - The CSRF token is bound to the transport (cookie + form field). Stealing
 *    it requires same-site access, which is mitigated by `SameSite=Lax` on
 *    the cookie and our strict Content-Security-Policy.
 */

export const CSRF_COOKIE = "csrf-token";

/** Token length in bytes (24 bytes → 32 base64url chars). */
const TOKEN_BYTES = 24;

/**
 * Generate a cryptographically secure CSRF token.
 *
 * Uses the Web Crypto API (`crypto.getRandomValues`) which is available
 * on Edge Runtime, Node.js ≥ 19 and all modern browsers. The result is
 * base64url-encoded for safe transport in cookies, headers and JSON.
 */
export function generateCsrfToken(): string {
  const bytes = new Uint8Array(TOKEN_BYTES);
  // `crypto` is the global Web Crypto object — available on Edge & Node.
  crypto.getRandomValues(bytes);
  return uint8ArrayToBase64Url(bytes);
}

/**
 * Constant-time string comparison — does NOT short-circuit on first mismatch.
 *
 * Implemented in pure JavaScript so it works on Edge Runtime. The function
 * iterates `max(len(a), len(b))` characters and accumulates XORed code-point
 * differences into a single integer — the runtime is independent of where
 * the first mismatch occurs.
 *
 * Returns `false` if lengths differ (after still walking both strings, so
 * we don't leak a length-comparison timing channel).
 */
export function constantTimeEquals(a: string, b: string): boolean {
  // We compare byte-equivalent strings; CSRF tokens are ASCII (base64url),
  // so `charCodeAt` is sufficient and avoids TextEncoder allocations on the
  // hot path.
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    diff |= ca ^ cb;
  }
  return diff === 0;
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Internal helpers                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Edge-safe base64url encoder for a `Uint8Array`.
 *
 * `btoa` exists on Edge Runtime and in modern Node.js. We feed it a binary
 * string built via `String.fromCharCode`, then transform the standard
 * base64 alphabet into base64url (`+` → `-`, `/` → `_`) and strip padding.
 */
function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  // Build a binary string without using Buffer. `Array.from` + `fromCharCode`
  // is allocation-light and avoids `noUncheckedIndexedAccess` issues.
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
