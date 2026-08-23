"use client";

import { usePathname } from "next/navigation";
import { company } from "@/lib/content";

const wa = company.phoneQuote.replace(/[^\d]/g, ""); // digits only
const tel = company.phonePrimary.replace(/\s/g, "");
const message = encodeURIComponent("Hi K&K Builders — I'd like to discuss a project.");

const shell =
  "group flex items-center gap-3 rounded-full border border-bone/15 bg-ink py-2 pl-2 pr-5 text-bone shadow-[0_8px_30px_rgba(14,14,13,0.28)] transition-colors duration-300 hover:bg-accent";
const dot =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bone/10 transition-colors group-hover:bg-bone/20";
const label = "text-sm font-medium leading-none tracking-tight";

export default function FloatingActions() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname === "/book" || pathname.startsWith("/admin"))
    return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a href={`tel:${tel}`} aria-label="Call K&K Builders" className={shell}>
        <span className={dot}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
          </svg>
        </span>
        <span className={label}>Call</span>
      </a>

      <a
        href={`https://wa.me/${wa}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with K&K Builders on WhatsApp"
        className={shell}
      >
        <span className={dot}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.02a9.44 9.44 0 01-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.45 9.45 0 01-1.45-5.03c0-5.22 4.26-9.47 9.5-9.47a9.44 9.44 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.26 9.46-9.5 9.46zm8.06-17.5A11.36 11.36 0 0012.05.6C5.8.6.72 5.68.72 11.92c0 2.04.53 4.03 1.55 5.79L.62 23.4l5.83-1.53a11.34 11.34 0 005.6 1.45h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
          </svg>
        </span>
        <span className={label}>WhatsApp</span>
      </a>
    </div>
  );
}
