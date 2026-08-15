"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ---- Reveal: scroll-triggered entrance ------------------------------- */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute("data-shown", "true");
    // Fallback: if IO is unsupported or the viewport can't be measured
    // (some embedded/headless contexts report innerHeight 0), reveal now.
    if (!("IntersectionObserver" in window) || window.innerHeight === 0) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ---- Magnetic: subtle pull toward cursor ----------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => (el.style.transform = "translate(0,0)");
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);
  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---- Buttons --------------------------------------------------------- */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  tone?: "ink" | "bone";
  className?: string;
  cursor?: string;
  onClick?: () => void;
};

export function ArrowButton({
  href,
  children,
  variant = "solid",
  tone = "ink",
  className = "",
  cursor = "Start",
  onClick,
}: BtnProps) {
  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300";
  const styles: Record<string, string> = {
    solid:
      tone === "ink"
        ? "bg-ink text-bone hover:bg-accent"
        : "bg-bone text-ink hover:bg-accent hover:text-bone",
    outline:
      tone === "ink"
        ? "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone"
        : "border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink",
    ghost:
      tone === "ink"
        ? "text-ink hover:text-accent"
        : "text-bone hover:text-accent-soft",
  };
  const external = href.startsWith("http") || href.startsWith("tel:");
  const inner = (
    <>
      <span>{children}</span>
      <span className="relative block h-3.5 w-4 overflow-hidden">
        <ArrowGlyph className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4" />
        <ArrowGlyph className="absolute inset-0 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </>
  );
  const cls = `${base} ${styles[variant]} ${className}`;
  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} onClick={onClick} className={cls} data-cursor={cursor}>
          {inner}
        </a>
      ) : (
        <Link href={href} onClick={onClick} className={cls} data-cursor={cursor}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 14" fill="none" className={`h-3.5 w-4 ${className}`}>
      <path
        d="M1 7h13M9 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---- Section eyebrow ------------------------------------------------- */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [n] = useState(() => children);
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-current opacity-40" />
      {n}
    </span>
  );
}
