import type { Metadata } from "next";
import Image from "next/image";
import Story from "@/components/Story";
import Pillars from "@/components/Pillars";
import CTA from "@/components/CTA";
import { Eyebrow, Reveal } from "@/components/ui";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "KJA & Sons traces its roots to K.R. Joseph & Sons, established in Ernakulam in 1983. A family tradition of caring, now a full-service civil contracting company in Kochi.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-ink text-bone">
        <Image
          src="/images/projects/craftsmen.jpg"
          alt="KJA & Sons craftsmen on site"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)] pb-16 pt-32">
          <Eyebrow className="text-accent-soft">About KJA &amp; Sons</Eyebrow>
          <h1 className="font-display mt-6 max-w-4xl d-1">
            A family trade, turned turn-key contractor.
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
                KJA &amp; Sons is a full-service civil contracting company in Kochi.{" "}
                <span className="text-concrete">
                  Our established systems let us deliver turn-key construction for
                  residential and commercial clients — built on a family tradition of
                  caring, and a drive to exceed what clients expect.
                </span>
              </p>
              <div className="mt-10 grid gap-8 border-t border-ink/12 pt-8 sm:grid-cols-3">
                <div>
                  <p className="font-display text-4xl text-ink">1983</p>
                  <p className="mt-1 text-sm text-concrete">Roots in Ernakulam</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-ink">Kochi</p>
                  <p className="mt-1 text-sm text-concrete">Kerala, India</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-ink">Turn-key</p>
                  <p className="mt-1 text-sm text-concrete">Design to handover</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Story />
      <Pillars />

      {/* Contact line */}
      <section className="border-t border-ink/10 bg-bone py-16">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-[var(--spacing-gutter)] text-sm text-concrete sm:flex-row sm:items-center sm:justify-between">
          <p>
            {company.address.line1}, {company.address.city} – {company.address.pin}
          </p>
          <div className="flex gap-6">
            <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`} className="hover:text-ink">
              {company.phonePrimary}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-ink">
              {company.email}
            </a>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
