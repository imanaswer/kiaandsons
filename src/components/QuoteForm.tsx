"use client";

import { useState } from "react";
import { projectTypes, company } from "@/lib/content";

type Data = {
  projectType: string;
  details: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  location: string;
};

const empty: Data = {
  projectType: "",
  details: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  location: "",
};

const steps = ["What are you building?", "About the project", "Your details", "Done"];
const budgets = ["Under ₹25L", "₹25L – ₹75L", "₹75L – ₹2Cr", "₹2Cr +", "Not sure yet"];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof Data, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const validateStep = () => {
    const e: Record<string, boolean> = {};
    if (step === 0 && !data.projectType) e.projectType = true;
    if (step === 2) {
      if (data.name.trim().length < 2) e.name = true;
      if (!/^[+\d][\d\s-]{7,}$/.test(data.phone.trim())) e.phone = true;
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step === 2) return submit();
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setStep(3);
    } catch {
      setStatus("error");
    }
  };

  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-10 flex items-center gap-4">
        <span className="font-mono text-xs text-concrete">
          0{Math.min(step + 1, steps.length)} / 0{steps.length}
        </span>
        <div className="h-px flex-1 bg-ink/12">
          <div
            className="h-full bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs uppercase tracking-[0.16em] text-concrete">
          {steps[step]}
        </span>
      </div>

      <div key={step} className="anim-fade-up min-h-[22rem]">
        {/* Step 1 — type */}
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              What are you building?
            </legend>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projectTypes.map((t) => {
                const active = data.projectType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("projectType", t)}
                    className={`flex items-center justify-between rounded-sm border px-5 py-4 text-left text-sm transition-colors ${
                      active
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/20 text-ink hover:border-ink/50"
                    }`}
                  >
                    {t}
                    <span
                      className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                        active ? "border-accent bg-accent" : "border-ink/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {errors.projectType && (
              <p className="mt-4 text-sm text-accent">Please choose a project type.</p>
            )}
          </fieldset>
        )}

        {/* Step 2 — details */}
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              Tell us about the project.
            </legend>
            <label className="mt-8 block text-xs uppercase tracking-[0.16em] text-concrete">
              What do you have in mind?
            </label>
            <textarea
              value={data.details}
              onChange={(e) => set("details", e.target.value)}
              rows={4}
              placeholder="Plot size, location, what you'd like to build, any references…"
              className="mt-2 w-full resize-none rounded-sm border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none transition-colors placeholder:text-concrete/70 focus:border-ink"
            />
            <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-concrete">
              Indicative budget (optional)
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => set("budget", b)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    data.budget === b
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/20 text-ink hover:border-ink/50"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 3 — your details */}
        {step === 2 && (
          <fieldset>
            <legend className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              Your details.
            </legend>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Name" required error={errors.name}>
                <input
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  autoComplete="name"
                  className="field"
                />
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <input
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  className="field"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  className="field"
                />
              </Field>
              <Field label="Location">
                <input
                  value={data.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Kochi"
                  className="field"
                />
              </Field>
            </div>
            {status === "error" && (
              <p className="mt-4 text-sm text-accent">
                Something went wrong. Please call us on {company.phoneQuote}.
              </p>
            )}
          </fieldset>
        )}

        {/* Step 4 — done */}
        {step === 3 && (
          <div className="flex flex-col items-start">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bone">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="font-display mt-6 text-4xl tracking-tight text-ink">
              Thank you — we&apos;ll be in touch.
            </h2>
            <p className="mt-4 max-w-md text-concrete">
              We&apos;ve received your enquiry about{" "}
              <span className="text-ink">{data.projectType || "your project"}</span>. Our
              team will reach out shortly. Prefer to talk now?
            </p>
            <a
              href={`tel:${company.phoneQuote.replace(/\s/g, "")}`}
              className="mt-6 text-lg font-medium text-ink underline decoration-accent decoration-2 underline-offset-4"
            >
              {company.phoneQuote}
            </a>
          </div>
        )}
      </div>

      {/* Controls */}
      {step < 3 && (
        <div className="mt-10 flex items-center justify-between border-t border-ink/12 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="text-sm text-concrete transition-colors enabled:hover:text-ink disabled:opacity-0"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={status === "sending"}
            data-cursor={step === 2 ? "Send" : "Next"}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-accent disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending…"
              : step === 2
                ? "Start the conversation"
                : "Continue"}
            <svg viewBox="0 0 16 14" className="h-3.5 w-4 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-concrete">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent">Please check this field.</span>}
    </label>
  );
}
