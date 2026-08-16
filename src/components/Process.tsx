"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { process } from "@/lib/content";
import { Eyebrow } from "./ui";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Horizontal distance the track must travel so its last card ends flush.
    let overflow = 0;
    const measure = () => {
      overflow = Math.max(track.scrollWidth - window.innerWidth, 0);
      // Pin length == horizontal travel → no dead vertical scroll after the cards.
      section.style.height = `${Math.round(window.innerHeight + overflow)}px`;
    };

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
        track.style.transform = `translate3d(${-progress * overflow}px,0,0)`;
      });
    };

    const onResize = () => {
      measure();
      update();
    };
    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    // Re-measure once images/fonts settle sizes.
    const t = setTimeout(onResize, 400);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="process" className="bg-paper text-ink">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-[var(--spacing-gutter)]">
            <div>
              <Eyebrow className="text-accent">From Idea to Reality</Eyebrow>
              <h2 className="font-display mt-5 max-w-xl d-2">
                One team, from first sketch to final handover.
              </h2>
            </div>
            <span className="font-mono text-xs text-concrete">Scroll →</span>
          </div>

          <div
            ref={trackRef}
            className="mt-10 flex gap-8 px-[var(--spacing-gutter)] will-change-transform"
          >
            {process.map((p) => (
              <article
                key={p.index}
                className="group relative h-[56vh] w-[40vw] shrink-0 overflow-hidden rounded-md bg-graphite xl:w-[34vw]"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="40vw"
                  className="object-cover opacity-70 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="relative flex h-full flex-col justify-between p-9 text-bone">
                  <span className="font-display text-7xl text-bone/25">{p.index}</span>
                  <div>
                    <h3 className="font-display text-4xl tracking-tight">{p.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/75">
                      {p.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical progression */}
      <div className="px-[var(--spacing-gutter)] py-20 lg:hidden">
        <Eyebrow className="text-accent">From Idea to Reality</Eyebrow>
        <h2 className="font-display mt-5 text-4xl tracking-tight">
          One team, first sketch to handover.
        </h2>
        <ol className="mt-10 space-y-5">
          {process.map((p) => (
            <li key={p.index} className="relative overflow-hidden rounded-md bg-graphite">
              <div className="relative aspect-[16/10]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-bone">
                  <span className="font-display text-5xl text-bone/25">{p.index}</span>
                  <h3 className="font-display mt-1 text-3xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/75">{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
