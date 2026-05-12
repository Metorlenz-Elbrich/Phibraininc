/**
 * In-memory rate limiter — fixed window, per-key.
 *
 * Designed for single-instance deployments. For multi-region deployments,
 * swap the Map for a Redis/Upstash-backed implementation (the public
 * signature stays the same).
 *
 * Key choice strategy is up to the caller (typically `ip:route`).
 */

type Bucket = { count: number; resetAt: number };

const STORE: Map<string, Bucket> = (globalThis as unknown as {
  __phibrain_ratelimit__?: Map<string, Bucket>;
}).__phibrain_ratelimit__ ?? new Map<string, Bucket>();

(globalThis as unknown as { __phibrain_ratelimit__: Map<string, Bucket> })
  .__phibrain_ratelimit__ = STORE;

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = STORE.get(key);

  if (!bucket || bucket.resetAt < now) {
    const resetAt = now + windowMs;
    STORE.set(key, { count: 1, resetAt });
    return { success: true, remaining: max - 1, resetAt };
  }

  if (bucket.count >= max) {
    return { success: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    success: true,
    remaining: max - bucket.count,
    resetAt: bucket.resetAt,
  };
}

/** Extracts a stable client IP from headers, with X-Forwarded-For handling. */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
