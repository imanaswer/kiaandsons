"use client";

import { useState } from "react";
import { consultationModes, consultationTimes, projectTypes, company } from "@/lib/content";

type Data = {
  mode: string;
  time: string;
  projectType: string;
  name: string;
  phone: string;
  email: string;
  location: string;
};

const empty: Data = {
  mode: "",
  time: "",
  projectType: "",
  name: "",
  phone: "",
  email: "",
  location: "",
};

export default function BookingForm() {
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof Data, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = async () => {
    const e: Record<string, boolean> = {};
    if (!data.mode) e.mode = true;
    if (data.name.trim().length < 2) e.name = true;
    if (!/^[+\d][\d\s-]{7,}$/.test(data.phone.trim())) e.phone = true;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = true;
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-start">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bone">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="font-display mt-6 text-4xl tracking-tight text-ink">
          Your consultation is requested.
        </h2>
        <p className="mt-4 max-w-md text-concrete">
          Thanks, {data.name.split(" ")[0] || "there"} — we&apos;ll confirm a{" "}
          <span className="text-ink">{data.mode.toLowerCase()}</span>
          {data.time ? ` (${data.time.toLowerCase()})` : ""} and be in touch shortly.
          Prefer to talk now?
        </p>
        <a
          href={`tel:${company.phoneQuote.replace(/\s/g, "")}`}
          className="mt-6 text-lg font-medium text-ink underline decoration-accent decoration-2 underline-offset-4"
        >
          {company.phoneQuote}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Mode */}
      <fieldset>
        <legend className="text-xs uppercase tracking-[0.16em] text-concrete">
          How would you like to meet? <span className="text-accent">*</span>
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {consultationModes.map((m) => {
            const active = data.mode === m.label;
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => set("mode", m.label)}
                className={`rounded-sm border px-5 py-4 text-left transition-colors ${
                  active ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink/50"
                }`}
              >
                <span className="block text-sm font-medium">{m.label}</span>
                <span className={`mt-0.5 block text-xs ${active ? "text-bone/70" : "text-concrete"}`}>
                  {m.note}
                </span>
              </button>
            );
          })}
        </div>
        {errors.mode && <p className="mt-3 text-sm text-accent">Please choose how to meet.</p>}
      </fieldset>

      {/* Time + project type */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.16em] text-concrete">Preferred timing</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {consultationTimes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("time", t)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  data.time === t ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.16em] text-concrete">About</label>
          <select
            value={data.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            className="field mt-3 appearance-none"
          >
            <option value="">Select a project type…</option>
            {projectTypes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-concrete">
            Name <span className="text-accent">*</span>
          </span>
          <input value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="field" />
          {errors.name && <span className="mt-1 block text-xs text-accent">Please enter your name.</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-concrete">
            Phone <span className="text-accent">*</span>
          </span>
          <input value={data.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" inputMode="tel" className="field" />
          {errors.phone && <span className="mt-1 block text-xs text-accent">Please enter a valid phone.</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-concrete">Email</span>
          <input value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" inputMode="email" className="field" />
          {errors.email && <span className="mt-1 block text-xs text-accent">Please check your email.</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-concrete">Location</span>
          <input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Kochi" className="field" />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-5 text-sm text-accent">
          Something went wrong. Please call us on {company.phoneQuote}.
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Requesting…" : "Book my consultation"}
        <svg viewBox="0 0 16 14" className="h-3.5 w-4 transition-transform duration-300 group-hover:translate-x-1">
          <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="mt-4 text-xs text-concrete">Free, and with no obligation.</p>
    </div>
  );
}
