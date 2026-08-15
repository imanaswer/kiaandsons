"use client";

import { useState } from "react";
import { testimonials } from "@/lib/content";
import { Eyebrow } from "./ui";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (dir: number) =>
    setI((v) => (v + dir + testimonials.length) % testimonials.length);
  const t = testimonials[i];

  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-[var(--spacing-gutter)]">
        <div className="flex items-center justify-between">
          <Eyebrow className="text-accent">In Their Words</Eyebrow>
          <span className="font-mono text-xs text-concrete">
            0{i + 1} — 0{testimonials.length}
          </span>
        </div>

        <div className="mt-12 min-h-[16rem] md:min-h-[22rem]">
          <blockquote key={i} className="anim-fade-up">
            <p className="font-display max-w-4xl text-[clamp(1.7rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-tight text-ink">
              <span className="font-serif-it text-accent">“</span>
              {t.quote}
              <span className="font-serif-it text-accent">”</span>
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg text-bone">
                {t.name.charAt(0)}
              </span>
              <div>
                <cite className="not-italic font-medium text-ink">{t.name}</cite>
                <p className="text-xs uppercase tracking-[0.16em] text-concrete">{t.role}</p>
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {["Prev", "Next"].map((label, idx) => (
            <button
              key={label}
              onClick={() => go(idx === 0 ? -1 : 1)}
              aria-label={label}
              data-cursor={label}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
            >
              <svg viewBox="0 0 16 14" className={`h-4 w-5 ${idx === 0 ? "rotate-180" : ""}`}>
                <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
          <div className="ml-4 flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-accent" : "w-4 bg-ink/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
