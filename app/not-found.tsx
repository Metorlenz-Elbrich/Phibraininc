import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/effects/GridBackground";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden pt-24">
      <GridBackground fade="radial" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(41,171,226,0.30), transparent 70%)",
        }}
      />
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="font-display text-[8rem] font-semibold leading-none tracking-tighter gradient-text">
            404
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            We can't find that page.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            The link may be broken, or the page may have moved. Let's get you
            back somewhere useful.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Contact us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
