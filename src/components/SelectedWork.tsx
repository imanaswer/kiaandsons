"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eyebrow, Reveal } from "./ui";

export type WorkItem = {
  slug: string;
  index: string;
  title: string;
  discipline: string;
  image: string;
  intro: string;
};

export default function SelectedWork({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const work = items;
  if (work.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow className="text-accent">Selected Work</Eyebrow>
            <h2 className="font-display mt-6 max-w-2xl text-ink d-1">
              Where we build, and how.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-concrete">
              The disciplines we deliver end-to-end. Project photography is being
              added — imagery below is representative of our work.
            </p>
          </Reveal>
        </div>

        {/* Mobile: rich full-image cards */}
        <div className="mt-10 space-y-4 lg:hidden">
          {work.map((w) => (
            <Reveal key={w.slug}>
              <Link
                href={`/projects/${w.slug}`}
                className="group relative flex min-h-[64vw] items-end overflow-hidden rounded-md bg-graphite"
              >
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="relative w-full p-6 text-bone">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-bone/70">{w.index}</span>
                    <span className="text-[0.68rem] uppercase tracking-[0.16em] text-bone/75">
                      {w.discipline}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-4xl leading-none tracking-tight">
                    {w.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[1fr_44%] lg:gap-16">
          {/* List */}
          <ul className="order-2 lg:order-1">
            {work.map((w, i) => (
              <li key={w.slug}>
                <Link
                  href={`/projects/${w.slug}`}
                  data-cursor="View"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-6 border-t border-ink/12 py-7 transition-colors last:border-b hover:border-ink/40 md:py-9"
                >
                  <span className="font-mono text-xs text-concrete transition-colors group-hover:text-accent">
                    {w.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-3xl leading-none tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-[2.75rem]">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-concrete">
                      {w.discipline}
                    </p>
                  </div>

                  {/* Mobile thumb */}
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-sm lg:hidden">
                    <Image src={w.image} alt={w.title} fill sizes="80px" className="object-cover" />
                  </div>

                  <svg viewBox="0 0 16 14" className="hidden h-4 w-5 shrink-0 text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-100 lg:block">
                    <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky preview (desktop) — stacked images, opacity crossfade */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-sm bg-graphite">
              {work.map((w, i) => (
                <div
                  key={w.slug}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.05)",
                  }}
                >
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-7 text-bone">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-bone/70">
                    {work[active].discipline}
                  </p>
                  <p className="font-display mt-1 text-2xl">{work[active].title}</p>
                </div>
                <span className="font-mono text-xs text-bone/70">
                  {work[active].index} / 0{work.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
