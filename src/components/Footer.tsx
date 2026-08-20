import Link from "next/link";
import { company, services } from "@/lib/content";
import { ArrowButton } from "./ui";

export default function Footer() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  return (
    <footer className="grain relative overflow-hidden bg-ink text-bone">
      <div className="relative mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-20 md:py-28">
        {/* Top: statement + CTA */}
        <div className="grid gap-12 border-b border-bone/10 pb-16 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="font-display flex items-baseline gap-2 text-2xl">
              K&amp;K <span className="text-sm tracking-[0.2em] opacity-60">COMPANY</span>
            </div>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              A full-service civil contracting company in Kochi. We take an idea and
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
        <div className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
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
              <li><Link href="/#faq" className="hover:text-accent-soft">FAQ</Link></li>
              <li><Link href="/book" className="hover:text-accent-soft">Book a Consultation</Link></li>
              <li><Link href="/contact" className="hover:text-accent-soft">Get a Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-stone">Contact</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-bone/80">
              <li><a href={tel(company.phonePrimary)} className="hover:text-accent-soft">{company.phonePrimary}</a></li>
              <li><a href={tel(company.phoneQuote)} className="hover:text-accent-soft">{company.phoneQuote}</a></li>
              <li><a href={`mailto:${company.email}`} className="hover:text-accent-soft">{company.email}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-stone">Studio</h3>
            <address className="mt-5 text-sm not-italic leading-relaxed text-bone/80">
              {company.address.line1}
              <br />
              {company.address.city} – {company.address.pin}
              <br />
              {company.address.region}
            </address>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
              {company.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="pointer-events-none select-none overflow-hidden">
          <div className="font-display whitespace-nowrap text-[18vw] leading-[0.8] tracking-tight text-bone/[0.04]">
            K&amp;K COMPANY
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/10 pt-8 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} K&amp;K Company®. All rights reserved.</p>
          <p>Built with intent — Kochi, Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
