"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-bone py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-[var(--spacing-gutter)] md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Eyebrow className="text-accent">Questions</Eyebrow>
          <h2 className="font-display mt-6 max-w-md d-2 text-ink">
            Answers, before you ask.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-concrete">
            Still unsure about something? Book a consultation and we&apos;ll walk you
            through it — no obligation.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            Book a consultation
            <svg viewBox="0 0 16 14" className="h-3.5 w-4">
              <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <ul>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-t border-ink/12 last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="font-mono text-xs text-concrete">
                      0{i + 1}
                    </span>
                    <span className="flex-1 font-display text-xl leading-snug tracking-tight text-ink md:text-2xl">
                      {f.q}
                    </span>
                    <span
                      className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 20 20" className="h-5 w-5">
                        <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pl-9 text-sm leading-relaxed text-concrete md:text-base">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
