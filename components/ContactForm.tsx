"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import type { Ref, SelectHTMLAttributes } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUDGET_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  ContactFormSchema,
  PROJECT_TYPE_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  type ContactFormData,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Option = { value: string; label: string };

const SELECT_CLASS =
  "flex h-12 w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm shadow-elevation-1 transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-foreground disabled:cursor-not-allowed disabled:opacity-50";

function readCsrfCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]+)/);
  return match ? decodeURIComponent(match[1] ?? "") : "";
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const renderedAt = useMemo(() => Date.now(), []);
  const [csrf, setCsrf] = useState<string>("");

  useEffect(() => {
    setCsrf(readCsrfCookie());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onBlur",
    defaultValues: {
      preferredContact: "email",
      consent: false,
      _hp: "",
      _ts: renderedAt,
      csrf: "",
    },
  });

  // Keep hidden CSRF + timestamp fields synced.
  useEffect(() => {
    setValue("csrf", csrf, { shouldValidate: false });
    setValue("_ts", renderedAt, { shouldValidate: false });
  }, [csrf, renderedAt, setValue]);

  const onSubmit: SubmitHandler<ContactFormData> = async (values) => {
    setStatus("submitting");
    setServerMessage("");
    setServerErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "fetch",
        },
        body: JSON.stringify({ ...values, csrf: csrf || readCsrfCookie() }),
        credentials: "same-origin",
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerErrors(data.errors ?? {});
        setServerMessage(data.message ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setServerMessage(data.message ?? "Thanks — we'll be in touch.");
      reset({
        preferredContact: "email",
        consent: false,
        _hp: "",
        _ts: Date.now(),
        csrf,
      });
    } catch {
      setStatus("error");
      setServerMessage("Network error — please try again in a moment.");
    }
  };

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

  const fieldError = (key: keyof ContactFormData) =>
    (errors[key]?.message as string | undefined) ?? serverErrors[key];

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-describedby={serverMessage ? "form-summary" : undefined}
      className="space-y-6"
    >
      {/* Honeypot — visually hidden but reachable to scrapers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] h-0 w-0 overflow-hidden"
      >
        <label>
          Don&apos;t fill this in
          <input type="text" tabIndex={-1} autoComplete="off" {...register("_hp")} />
        </label>
      </div>

      <input type="hidden" {...register("csrf")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />

      <Fieldset legend="About you">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full name" required error={fieldError("name")}>
            <Input
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder="Jane Doe"
              aria-invalid={!!fieldError("name")}
              {...register("name")}
            />
          </Field>
          <Field label="Work email" required error={fieldError("email")}>
            <Input
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="you@company.com"
              aria-invalid={!!fieldError("email")}
              {...register("email")}
            />
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Company" error={fieldError("company")}>
            <Input
              type="text"
              autoComplete="organization"
              maxLength={120}
              placeholder="Acme Inc."
              {...register("company")}
            />
          </Field>
          <Field label="Phone (optional)" error={fieldError("phone")}>
            <Input
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="+1 555 123 4567"
              {...register("phone")}
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Project context">
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Service needed"
            required
            options={SERVICE_OPTIONS as ReadonlyArray<Option>}
            error={fieldError("service")}
            {...register("service")}
          />
          <SelectField
            label="Project type"
            required
            options={PROJECT_TYPE_OPTIONS as ReadonlyArray<Option>}
            error={fieldError("projectType")}
            {...register("projectType")}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <SelectField
            label="Company size"
            options={COMPANY_SIZE_OPTIONS as ReadonlyArray<Option>}
            error={fieldError("companySize")}
            {...register("companySize")}
          />
          <SelectField
            label="Estimated budget"
            required
            options={BUDGET_OPTIONS as ReadonlyArray<Option>}
            error={fieldError("budget")}
            {...register("budget")}
          />
          <SelectField
            label="Estimated timeline"
            required
            options={TIMELINE_OPTIONS as ReadonlyArray<Option>}
            error={fieldError("timeline")}
            {...register("timeline")}
          />
        </div>
        <SelectField
          label="Preferred contact method"
          options={CONTACT_METHOD_OPTIONS as ReadonlyArray<Option>}
          error={fieldError("preferredContact")}
          {...register("preferredContact")}
        />
      </Fieldset>

      <Fieldset legend="Project description">
        <Field
          label="Tell us about your project"
          required
          error={fieldError("message")}
          hint="Goals, audience, timing, current systems — anything that helps us prepare for a great first call."
        >
          <Textarea
            minLength={20}
            maxLength={4000}
            placeholder="What are you building, what problem are you solving, and what would success look like in 6 months?"
            aria-invalid={!!fieldError("message")}
            {...register("message")}
          />
        </Field>
      </Fieldset>

      <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white/40 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-black/20 text-brand-500 focus:ring-brand-500"
          {...register("consent")}
        />
        <label
          htmlFor="consent"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          I agree to PhiBrain processing my message to respond to my enquiry,
          in line with the{" "}
          <a className="text-brand-500 underline-offset-4 hover:underline" href="/privacy">
            privacy policy
          </a>
          .
        </label>
      </div>
      {fieldError("consent") ? <FieldError message={fieldError("consent")!} /> : null}

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
        disabled={isSubmitting || status === "submitting"}
        className="w-full sm:w-auto"
      >
        {isSubmitting || status === "submitting" ? (
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

/* ────────────────────────────────────────────────────────────────────────── */

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {legend}
      </legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
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
      {hint && !error ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  required?: boolean;
  options: ReadonlyArray<Option>;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    { label, required, options, error, ...rest }: SelectFieldProps,
    ref: Ref<HTMLSelectElement>,
  ) {
    return (
      <Field label={label} required={required} error={error}>
        <select
          ref={ref}
          defaultValue=""
          className={SELECT_CLASS}
          aria-invalid={!!error}
          {...rest}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
    );
  },
);

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}
