"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const BUDGETS = [
  { value: "under-25k", label: "Under $25k" },
  { value: "25k-50k", label: "$25k – $50k" },
  { value: "50k-150k", label: "$50k – $150k" },
  { value: "150k-plus", label: "$150k+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

function readCsrfCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]+)/);
  return match ? decodeURIComponent(match[1] ?? "") : "";
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const renderedAt = useMemo(() => Date.now(), []);
  const formRef = useRef<HTMLFormElement>(null);

  const [csrf, setCsrf] = useState<string>("");
  useEffect(() => {
    setCsrf(readCsrfCookie());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      budget: (formData.get("budget") || undefined) as string | undefined,
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      _hp: String(formData.get("_hp") ?? ""),
      _ts: renderedAt,
      csrf: readCsrfCookie() || csrf,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "fetch",
        },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrors(data.errors ?? {});
        setServerMessage(data.message ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setServerMessage(data.message ?? "Thanks — we'll be in touch.");
      form.reset();
    } catch {
      setStatus("error");
      setServerMessage("Network error — please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Message received.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {serverMessage}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={serverMessage ? "form-summary" : undefined}
      className="space-y-6"
    >
      {/* honeypot — visually hidden, off-screen, but reachable to bots scraping markup */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-0 w-0 overflow-hidden">
        <label>
          Don't fill this in
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      {/* CSRF token (also sent server-side via cookie) */}
      <input type="hidden" name="csrf" value={csrf} readOnly />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" id="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" id="company" error={errors.company}>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="Acme Inc."
          />
        </Field>
        <Field label="Budget" id="budget" error={errors.budget}>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="h-12 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm shadow-elevation-1 transition-all focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-foreground"
          >
            <option value="" disabled>
              Select a range…
            </option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="What are you working on?"
        id="message"
        error={errors.message}
        required
      >
        <Textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          placeholder="Tell us about your project — goals, audience, timing, anything that helps us prepare for a great first call."
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white/40 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-black/20 text-brand-500 focus:ring-brand-500"
        />
        <label
          htmlFor="consent"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          I agree to PhiBrain processing my message to respond to my enquiry,
          in line with the{" "}
          <a className="text-brand-500 underline-offset-4 hover:underline" href="#privacy">
            privacy policy
          </a>
          .
        </label>
      </div>
      {errors.consent ? <FieldError message={errors.consent} /> : null}

      {serverMessage && status === "error" ? (
        <div
          id="form-summary"
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{serverMessage}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brand-500">
            *
          </span>
        ) : null}
      </Label>
      <div className={cn(error && "ring-1 ring-red-500/40 rounded-xl")}>
        {children}
      </div>
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}
