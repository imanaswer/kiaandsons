"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowButton } from "./ui";
import { company } from "@/lib/content";

export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Load the cinematic loop only on wider screens without reduced-motion —
  // keeps mobile light and respects motion preferences. Image is the poster/LCP.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!reduce && wide) {
      v.src = "/videos/hero.mp4";
      v.load();
    }
  }, []);

  // Cheap parallax + fade on scroll (rAF-throttled, reduced-motion aware).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const p = Math.min(y / vh, 1);
        if (mediaRef.current)
          mediaRef.current.style.transform = `translateY(${p * 14}%) scale(${1 + p * 0.08})`;
        if (contentRef.current) {
          contentRef.current.style.opacity = `${1 - p * 1.15}`;
          contentRef.current.style.transform = `translateY(${p * -30}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = ["Built", "with", "intent."];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <div ref={mediaRef} className="absolute inset-0 z-0 will-change-transform">
        <div className="anim-kenburns absolute inset-0">
          <Image
            src="/images/projects/hero-wide.jpg"
            alt="Contemporary concrete and stone residence in Kerala at dawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.5s] ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          poster="/images/projects/hero-wide.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setVideoReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-[var(--spacing-gutter)] pb-16 will-change-transform md:pb-20"
      >
        <div className="mb-auto pt-32" />

        <p className="eyebrow overflow-hidden text-bone/80">
          <span className="anim-rise inline-block" style={{ animationDelay: "0.2s" }}>
            Civil Contracting · Architecture · Kochi · Since {company.founded}
          </span>
        </p>

        <h1 className="font-display mt-5 text-bone d-hero">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.05em]">
              <span
                className="anim-rise block"
                style={{ animationDelay: `${0.32 + i * 0.12}s` }}
              >
                {i === 1 ? (
                  <span className="font-serif-it lowercase text-accent-soft">{w}</span>
                ) : (
                  w
                )}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="anim-fade-up mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          style={{ animationDelay: "0.75s" }}
        >
          <p className="max-w-md text-base leading-relaxed text-bone/75 md:text-lg">
            We take an idea and turn it into a finished space — architecture,
            construction and interiors, under one roof.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ArrowButton href="/contact" tone="bone" variant="solid" cursor="Start">
              Start a Project
            </ArrowButton>
            <ArrowButton href="/#work" tone="bone" variant="outline" cursor="Explore">
              Explore Our Work
            </ArrowButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-11 w-6 items-start justify-center rounded-full border border-bone/30 p-1.5">
          <span className="anim-bob block h-1.5 w-1.5 rounded-full bg-bone" />
        </div>
      </div>
    </section>
  );
}
