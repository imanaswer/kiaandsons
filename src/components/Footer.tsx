"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, services } from "@/lib/content";
import { ArrowButton } from "./ui";

export default function Footer() {
  const pathname = usePathname();
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="grain relative overflow-hidden bg-ink text-bone">
      <div className="relative mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-16 md:py-28">
        {/* Top: statement + CTA */}
        <div className="grid gap-8 border-b border-bone/10 pb-12 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12 md:pb-16">
          <div>
            <div className="font-display flex items-baseline gap-2 text-2xl">
              K&amp;K <span className="text-sm tracking-[0.2em] opacity-60">BUILDERS</span>
            </div>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              A full-service civil contracting company in Trivandrum. We take an idea and
              turn it into a space that lasts.
            </p>
          </div>
          <div className="md:justify-self-end">
            <ArrowButton href="/contact" tone="bone" variant="solid" cursor="Start">
              Start a Project
            </ArrowButton>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-16">
          <div>
            <h3 className="eyebrow text-stone">Services</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-bone/80">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent-soft">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-stone">Company</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-bone/80">
              <li><Link href="/#work" className="hover:text-accent-soft">Selected Work</Link></li>
              <li><Link href="/about" className="hover:text-accent-soft">About</Link></li>
              <li><Link href="/services" className="hover:text-accent-soft">Services</Link></li>
              <li><Link href="/blog" className="hover:text-accent-soft">Journal</Link></li>
              <li><Link href="/#faq" className="hover:text-accent-soft">FAQ</Link></li>
              <li><Link href="/book" className="hover:text-accent-soft">Book a Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-accent-soft">Get a Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-stone">Contact</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-bone/80">
              <li><a href={tel(company.phonePrimary)} className="hover:text-accent-soft">{company.phonePrimary}</a></li>
              <li><a href={`mailto:${company.email}`} className="hover:text-accent-soft">{company.email}</a></li>
              <li>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                  Find us on Google
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-stone">Where We Work</h3>
            <address className="mt-5 text-sm not-italic leading-relaxed text-bone/80">
              {company.address.line1 && (<>{company.address.line1}<br /></>)}
              {company.address.city}, {company.address.region}
            </address>
            <p className="mt-3 text-sm text-bone/80">
              Serving {company.areasServed.join(" · ")}
            </p>
            {company.socials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
                {company.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="pointer-events-none select-none overflow-hidden">
          <div className="font-display whitespace-nowrap text-[16vw] leading-[0.8] tracking-tight text-bone/[0.05] md:text-[18vw]">
            K&amp;K BUILDERS
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/10 pt-8 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} K&amp;K Builders®. All rights reserved.</p>
          <p>Built with intent — Trivandrum, Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
