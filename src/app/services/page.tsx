import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import { services, alsoOffer } from "@/lib/content";
import { Eyebrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, construction, interior design, renovation, pools & water, fabrication and waterproofing — the disciplines K&K Builders delivers under one roof in Trivandrum, Kerala.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink px-[var(--spacing-gutter)] pb-16 pt-40 text-bone">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow className="text-accent-soft">What We Do</Eyebrow>
          <h1 className="font-display mt-6 max-w-4xl d-1">
            Seven disciplines, one accountable team.
          </h1>
          <p className="mt-6 max-w-xl text-stone">
            From the first drawing to the final styled interior, K&amp;K Builders
            manages every trade in-house — so nothing falls between them.
          </p>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 90}>
                <Link href={`/services/${s.slug}`} data-cursor="Open" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                    <span className="font-mono absolute left-5 top-5 text-xs text-bone/80">{s.index}</span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-3xl tracking-tight text-ink">{s.title}</h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-concrete">{s.short}</p>
                    </div>
                    <svg viewBox="0 0 16 14" className="mt-2 h-4 w-5 shrink-0 text-ink transition-transform duration-500 group-hover:translate-x-1">
                      <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Also offer */}
          <div className="mt-20 border-t border-ink/12 pt-10">
            <Eyebrow className="text-accent">Also Offered</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
              {alsoOffer.map((a) => (
                <li key={a} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-concrete">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
