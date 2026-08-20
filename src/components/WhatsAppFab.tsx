"use client";

import { usePathname } from "next/navigation";
import { company } from "@/lib/content";

const number = company.phoneQuote.replace(/[^\d]/g, ""); // 919061226668
const message = encodeURIComponent(
  "Hi K&K Company — I'd like to discuss a project.",
);

export default function WhatsAppFab() {
  const pathname = usePathname();
  // Keep the quote page distraction-free (it already is the conversion flow).
  if (pathname === "/contact") return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with K&K Company on WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full border border-bone/15 bg-ink py-2.5 pl-2.5 pr-3 text-bone shadow-[0_8px_30px_rgba(14,14,13,0.28)] transition-colors duration-300 hover:bg-accent sm:bottom-7 sm:right-7"
      style={{
        paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone/10 transition-colors group-hover:bg-bone/20">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.02a9.44 9.44 0 01-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.45 9.45 0 01-1.45-5.03c0-5.22 4.26-9.47 9.5-9.47a9.44 9.44 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.26 9.46-9.5 9.46zm8.06-17.5A11.36 11.36 0 0012.05.6C5.8.6.72 5.68.72 11.92c0 2.04.53 4.03 1.55 5.79L.62 23.4l5.83-1.53a11.34 11.34 0 005.6 1.45h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
        </svg>
      </span>
      <span className="hidden pr-1 text-sm font-medium tracking-tight sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
