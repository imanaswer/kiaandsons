import type { Metadata } from "next";
import Image from "next/image";
import CTA from "@/components/CTA";
import { Eyebrow, Reveal, ArrowButton } from "@/components/ui";
import { company, pillars, journey } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "K&K Builders is a complete home-building company based in Trivandrum, serving Kerala — architecture, 3D planning, construction, interiors and imported furniture under one roof.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-ink text-bone">
        <Image
          src="/images/projects/craftsmen.jpg"
          alt="K&K Builders on site"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)] pb-16 pt-32">
          <Eyebrow className="text-accent-soft">About K&amp;K Builders</Eyebrow>
          <h1 className="font-display mt-6 max-w-4xl d-1">
            One destination for your complete home journey.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <Eyebrow className="text-accent">Who We Are</Eyebrow>
            </Reveal>
            <Reveal delay={80} className="md:col-span-8">
              <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.16] tracking-tight text-ink">
                K&amp;K Builders is a complete home-building company in Trivandrum.{" "}
                <span className="text-concrete">
                  Architecture, 3D planning, construction, interiors, home automation and
                  even furniture and lighting imported from China — handled by one
                  accountable team, so your home is one project, not five.
                </span>
              </p>
              <div className="mt-10 grid gap-8 border-t border-ink/12 pt-8 sm:grid-cols-3">
                <div>
                  <p className="font-display text-3xl text-ink">One team</p>
                  <p className="mt-1 text-sm text-concrete">Design to handover</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-ink">Trivandrum</p>
                  <p className="mt-1 text-sm text-concrete">Serving Kollam &amp; Alappuzha</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-ink">After-sales</p>
                  <p className="mt-1 text-sm text-concrete">We stay after you move in</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="grain relative overflow-hidden bg-charcoal py-24 text-bone md:py-32">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <Eyebrow className="text-accent-soft">The Complete Home Journey</Eyebrow>
          <h2 className="font-display mt-6 max-w-2xl d-2">From first talk to the keys.</h2>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {journey.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70}>
                <div className="border-t border-bone/15 pt-5">
                  <span className="font-mono text-xs text-accent-soft">{s.n}</span>
                  <h3 className="font-display mt-2 text-xl tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="max-w-2xl">
            <Eyebrow className="text-accent">Why K&amp;K Builders</Eyebrow>
            <h2 className="font-display mt-6 d-2 text-ink">
              Trust is built the same way a home is.
            </h2>
          </div>
          <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
                  {p.title}
                </h3>
                <div className="mt-4 h-px w-full bg-ink/12" />
                <p className="mt-4 text-sm leading-relaxed text-concrete">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <ArrowButton href="/book" cursor="Book">Book a Consultation</ArrowButton>
          </div>
        </div>
      </section>

      {/* Contact line */}
      <section className="border-t border-ink/10 bg-bone py-16">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-[var(--spacing-gutter)] text-sm text-concrete sm:flex-row sm:items-center sm:justify-between">
          <p>Serving {company.areasServed.join(" · ")} — {company.address.region}</p>
          <a href={`mailto:${company.email}`} className="hover:text-ink break-all">
            {company.email}
          </a>
        </div>
      </section>

      <CTA />
    </>
  );
}
