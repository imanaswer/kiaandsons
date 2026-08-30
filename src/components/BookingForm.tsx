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

    const waPhone = company.phoneQuote.replace(/[^\d]/g, "");
    const waText = [
      `*Consultation Booking Request — ${company.name}*`,
      `• *Name:* ${data.name.trim()}`,
      `• *Phone:* ${data.phone.trim()}`,
      data.email.trim() ? `• *Email:* ${data.email.trim()}` : null,
      `• *Consultation Mode:* ${data.mode}`,
      data.time ? `• *Preferred Timing:* ${data.time}` : null,
      data.projectType ? `• *Project Type:* ${data.projectType}` : null,
      data.location.trim() ? `• *Location:* ${data.location.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Handled gracefully
    }

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  if (status === "done") {
    const waPhone = company.phoneQuote.replace(/[^\d]/g, "");
    const waText = [
      `*Consultation Booking Request — ${company.name}*`,
      `• *Name:* ${data.name.trim()}`,
      `• *Phone:* ${data.phone.trim()}`,
      data.email.trim() ? `• *Email:* ${data.email.trim()}` : null,
      `• *Consultation Mode:* ${data.mode}`,
      data.time ? `• *Preferred Timing:* ${data.time}` : null,
      data.projectType ? `• *Project Type:* ${data.projectType}` : null,
      data.location.trim() ? `• *Location:* ${data.location.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

    const mailSubject = `Consultation Booking Request: ${data.mode} — ${data.name}`;
    const mailBody = [
      `Consultation Booking Request for ${company.name}:`,
      ``,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email || "Not provided"}`,
      `Consultation Mode: ${data.mode}`,
      `Preferred Timing: ${data.time || "Flexible"}`,
      `Project Type: ${data.projectType || "General"}`,
      `Location: ${data.location || "Not specified"}`,
    ].join("\n");
    const mailtoUrl = `mailto:${company.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-start anim-fade-up">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bone shadow-sm">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="font-display mt-6 text-3xl md:text-4xl tracking-tight text-ink">
          Consultation Request Ready.
        </h2>
        <p className="mt-4 max-w-md text-concrete leading-relaxed">
          Thanks, {data.name.split(" ")[0] || "there"} — we&apos;ve formatted your consultation request for a{" "}
          <span className="text-ink font-medium">{data.mode.toLowerCase()}</span>
          {data.time ? ` (${data.time.toLowerCase()})` : ""}. Send it directly to our team via WhatsApp or Email:
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.02a9.44 9.44 0 01-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.45 9.45 0 01-1.45-5.03c0-5.22 4.26-9.47 9.5-9.47a9.44 9.44 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.26 9.46-9.5 9.46zm8.06-17.5A11.36 11.36 0 0012.05.6C5.8.6.72 5.68.72 11.92c0 2.04.53 4.03 1.55 5.79L.62 23.4l5.83-1.53a11.34 11.34 0 005.6 1.45h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
            </svg>
            <span>Send on WhatsApp</span>
          </a>

          <a
            href={mailtoUrl}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 bg-transparent px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Send via Email</span>
          </a>
        </div>

        <div className="mt-8 border-t border-ink/10 pt-6 text-sm text-concrete">
          <span>Or call us directly on </span>
          <a
            href={`tel:${company.phoneQuote.replace(/\s/g, "")}`}
            className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {company.phoneQuote}
          </a>
        </div>
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
          <input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Trivandrum" className="field" />
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
