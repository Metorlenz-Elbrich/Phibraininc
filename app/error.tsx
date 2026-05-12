"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, hook this into your observability pipeline (Sentry, etc.)
    // We log only the digest server-side — never the raw error message
    // (it may contain user-supplied data or secrets).
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[error-boundary]", error.digest, error.message);
    }
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden pt-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Something went wrong.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            An unexpected error occurred. Our team has been notified — you can
            try again, or head back to the home page.
          </p>
          {error.digest ? (
            <p className="mt-3 font-mono text-xs text-muted-foreground/70">
              Reference: {error.digest}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={reset} size="lg">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
