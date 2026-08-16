import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { services } from "@/lib/content";
import { Eyebrow, Reveal, ArrowButton } from "@/components/ui";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Service" };
  return {
    title: s.title,
    description: s.lede,
    openGraph: { title: `${s.title} · K&K Company`, description: s.lede, images: [s.image] },
  };
}

export default async function ServiceDetail({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const nextSvc = services[(idx + 1) % services.length];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-ink text-bone">
        <Image src={s.image} alt={s.title} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)] pb-16 pt-32">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-bone/70">
            <Link href="/services" className="hover:text-accent-soft">Services</Link>
            <span>/</span>
            <span className="font-mono">{s.index}</span>
          </div>
          <h1 className="font-display mt-5 d-hero">{s.title}</h1>
        </div>
      </section>

      {/* Lede + scope */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.18] tracking-tight text-ink">
                {s.lede}
              </p>
              <p className="mt-8 max-w-xl leading-relaxed text-concrete">
                Every project runs through one team — architects, engineers and
                craftsmen coordinated together, so quality and timelines hold from the
                first drawing to final handover.
              </p>
              <div className="mt-10">
                <ArrowButton href="/contact" cursor="Start">
                  Start a {s.title.split(" ")[0]} Project
                </ArrowButton>
              </div>
            </Reveal>

            <Reveal delay={100} className="md:col-span-5">
              <div className="rounded-sm border border-ink/12 p-8">
                <Eyebrow className="text-accent">What&apos;s Included</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {s.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3 border-b border-ink/8 pb-4 text-ink last:border-0 last:pb-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Placeholder for real project imagery */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image src={s.image} alt={`${s.title} — representative`} fill sizes="50vw" className="object-cover" />
            </div>
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-sm border border-dashed border-ink/20 bg-paper p-8 text-center">
              <p className="text-sm text-concrete">
                Project photography for {s.title.toLowerCase()} will appear here.
                <br />
                <span className="text-concrete/70">Add real K&amp;K Company project images.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next service */}
      <section className="border-t border-ink/10 bg-bone py-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-[var(--spacing-gutter)]">
          <span className="text-xs uppercase tracking-[0.16em] text-concrete">Next</span>
          <Link href={`/services/${nextSvc.slug}`} data-cursor="Open" className="group flex items-center gap-4">
            <span className="font-display text-2xl tracking-tight text-ink md:text-4xl">{nextSvc.title}</span>
            <svg viewBox="0 0 16 14" className="h-5 w-6 text-ink transition-transform duration-500 group-hover:translate-x-1">
              <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
