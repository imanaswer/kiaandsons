import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import { work } from "@/lib/content";
import { Eyebrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The disciplines KJA & Sons delivers end-to-end — private residences, commercial builds, water & landscape, renovation and fabrication in Kochi, Kerala.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-ink px-[var(--spacing-gutter)] pb-16 pt-40 text-bone">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow className="text-accent-soft">Selected Work</Eyebrow>
          <h1 className="font-display mt-6 max-w-4xl d-1">The work, by discipline.</h1>
          <p className="mt-6 max-w-xl text-stone">
            KJA &amp; Sons is adding project photography. The imagery below is
            representative of the work we deliver — not specific completed projects.
          </p>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="space-y-4">
            {work.map((w) => (
              <Reveal key={w.slug}>
                <Link
                  href={`/projects/${w.slug}`}
                  data-cursor="View"
                  className="group relative flex min-h-[46vh] items-end overflow-hidden rounded-sm bg-graphite md:min-h-[60vh]"
                >
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="relative flex w-full items-end justify-between p-8 text-bone md:p-12">
                    <div>
                      <span className="font-mono text-xs text-bone/70">{w.index}</span>
                      <h2 className="font-display mt-2 text-4xl tracking-tight md:text-6xl">{w.title}</h2>
                      <p className="mt-3 max-w-lg text-sm text-bone/80">{w.intro}</p>
                    </div>
                    <span className="mb-2 hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-bone/80 md:flex">
                      {w.discipline}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
