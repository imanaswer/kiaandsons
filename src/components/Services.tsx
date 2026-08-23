"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services, importOffer } from "@/lib/content";
import { Eyebrow } from "./ui";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section id="services" className="grain relative scroll-mt-24 overflow-hidden bg-ink py-24 text-bone md:py-36">
      {/* Desktop background image cross-fade (stacked, opacity toggle) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        {services.map((s, i) => (
          <div
            key={s.slug}
            aria-hidden
            className="absolute inset-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: active === i ? 0.3 : 0,
              transform: active === i ? "scale(1)" : "scale(1.08)",
            }}
          >
            <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-accent-soft">What We Do</Eyebrow>
            <h2 className="font-display mt-6 max-w-2xl d-1">
              Seven disciplines, one accountable team.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            More than a construction company — architecture, engineering, interiors
            and craft managed together, so nothing falls between trades.
          </p>
        </div>

        {/* Desktop hover list */}
        <ul className="mt-12 hidden lg:block" onMouseLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                data-cursor="Open"
                onMouseEnter={() => setActive(i)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-8 border-t border-bone/12 py-8 last:border-b"
              >
                <span className="font-mono text-xs text-stone">{s.index}</span>
                <div className="flex items-baseline gap-6">
                  <h3
                    className={`font-display text-[3.4rem] leading-[0.95] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active === i ? "translate-x-3 text-bone" : "text-bone/55"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <span
                    className={`max-w-sm text-sm text-stone transition-all duration-500 ${
                      active === i ? "translate-x-3 opacity-100" : "opacity-0"
                    }`}
                  >
                    {s.short}
                  </span>
                </div>
                <svg viewBox="0 0 16 14" className={`h-4 w-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === i ? "translate-x-0 text-accent-soft opacity-100" : "-translate-x-3 opacity-0"}`}>
                  <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile accordion */}
        <ul className="mt-10 lg:hidden">
          {services.map((s, i) => {
            const isOpen = openMobile === i;
            return (
              <li key={s.slug} className="border-t border-bone/12 last:border-b">
                <button
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono text-xs text-stone">{s.index}</span>
                  <span className={`font-display flex-1 text-3xl tracking-tight transition-colors ${isOpen ? "text-bone" : "text-bone/70"}`}>
                    {s.title}
                  </span>
                  <span className={`text-accent-soft transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-sm">
                      <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="text-sm leading-relaxed text-stone">{s.short}</p>
                    <Link href={`/services/${s.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm text-accent-soft">
                      Explore {s.title}
                      <svg viewBox="0 0 16 14" className="h-3.5 w-4"><path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Import & sourcing highlight */}
        <div className="mt-14 rounded-md border border-bone/12 bg-bone/[0.03] p-8 md:mt-16 md:p-10">
          <div className="flex items-start gap-4">
            <svg viewBox="0 0 24 24" className="mt-1 h-9 w-9 shrink-0 text-accent-soft" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M3 9l9-5 9 5v6l-9 5-9-5V9z" strokeLinejoin="round" />
              <path d="M3 9l9 5 9-5M12 14v6" strokeLinejoin="round" />
            </svg>
            <div>
              <span className="eyebrow text-accent-soft">{importOffer.eyebrow}</span>
              <h3 className="font-display mt-2 text-2xl leading-tight tracking-tight text-bone md:text-3xl">
                {importOffer.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone">{importOffer.body}</p>
            </div>
          </div>

          {/* Process */}
          <ol className="mt-8 grid gap-6 border-t border-bone/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {importOffer.steps.map((s) => (
              <li key={s.n}>
                <span className="font-mono text-xs text-accent-soft">{s.n}</span>
                <h4 className="font-display mt-1 text-lg tracking-tight text-bone">{s.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-stone">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-concrete">
            {importOffer.catalogueNote}
          </p>
        </div>
      </div>
    </section>
  );
}
