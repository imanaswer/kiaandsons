"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, company } from "@/lib/content";
import { ArrowButton } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Conversion pages are focused — show only the logo, no menu.
  const minimal = pathname === "/contact" || pathname === "/book";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      {!minimal && (
        <div
          className={`absolute inset-0 -z-10 border-b transition-all duration-500 ${
            solid
              ? "border-ink/10 bg-bone/85 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        />
      )}
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-[var(--spacing-gutter)]">
        {/* Logo */}
        <Link
          href="/"
          aria-label="K&K Company home"
          className={`group flex items-baseline gap-1.5 font-display text-lg leading-none tracking-tight transition-colors ${
            minimal ? "text-ink lg:text-bone" : solid ? "text-ink" : "text-bone"
          }`}
        >
          <span className="text-[1.35rem]">K&amp;K</span>
          <span className="text-[0.7rem] font-medium tracking-[0.2em] opacity-60">
            COMPANY
          </span>
        </Link>

        {/* Desktop links */}
        {!minimal && (
        <div className="hidden items-center gap-9 md:flex">
          <ul
            className={`flex items-center gap-9 text-[0.82rem] font-medium tracking-tight transition-colors ${
              solid ? "text-ink" : "text-bone"
            }`}
          >
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="View"
                  className="group relative inline-block py-1"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <ArrowButton
            href="/contact"
            variant={solid ? "solid" : "outline"}
            tone={solid ? "ink" : "bone"}
            cursor="Start"
            className="!px-5 !py-2.5 !text-[0.8rem]"
          >
            Start a Project
          </ArrowButton>
        </div>
        )}

        {/* Mobile toggle */}
        {!minimal && (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-[81] flex h-10 w-10 items-center justify-center md:hidden ${
            solid ? "text-ink" : "text-bone"
          }`}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        )}
      </nav>

      {/* Mobile full-screen menu */}
      {!minimal && (
      <div
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed inset-0 z-[79] flex flex-col bg-ink text-bone transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden"
      >
        <div className="grain relative flex flex-1 flex-col justify-center px-[var(--spacing-gutter)] pt-24">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{
                  transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                }}
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block border-b border-bone/10 py-4 text-[3rem] leading-none tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4 text-sm text-stone">
            <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`} onClick={() => setOpen(false)}>
              {company.phonePrimary}
            </a>
            <a href={`mailto:${company.email}`} onClick={() => setOpen(false)}>
              {company.email}
            </a>
            <ArrowButton
              href="/contact"
              tone="bone"
              variant="solid"
              className="mt-2 w-fit"
              onClick={() => setOpen(false)}
            >
              Start a Project
            </ArrowButton>
          </div>
        </div>
      </div>
      )}
    </header>
  );
}
