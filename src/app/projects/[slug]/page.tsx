import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { work, craft } from "@/lib/content";
import { Eyebrow, Reveal, ArrowButton } from "@/components/ui";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) return { title: "Work" };
  return {
    title: w.title,
    description: w.intro,
    alternates: { canonical: `/projects/${w.slug}` },
    openGraph: { title: `${w.title} · K&K Company`, description: w.intro, images: [w.image] },
  };
}

const siteUrl = "https://kjasons.com";

export default async function ProjectDetail({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) notFound();

  const idx = work.findIndex((x) => x.slug === slug);
  const nextWork = work[(idx + 1) % work.length];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: w.title, item: `${siteUrl}/projects/${w.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* 01 — Hero */}
      <section className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-ink text-bone">
        <Image src={w.image} alt={w.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/50" />
        <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)] pb-16 pt-32">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-bone/70">
            <Link href="/projects" className="hover:text-accent-soft">Work</Link>
            <span>/</span>
            <span>{w.discipline}</span>
          </div>
          <h1 className="font-display mt-5 d-hero">{w.title}</h1>
        </div>
      </section>

      {/* 02 — Intro */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <Eyebrow className="text-accent">The Approach</Eyebrow>
            </Reveal>
            <Reveal delay={80} className="md:col-span-9">
              <p className="font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.15] tracking-tight text-ink">
                {w.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Large imagery + placeholder */}
      <section className="bg-bone pb-8">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image src={w.image} alt={`${w.title} — representative`} fill sizes="100vw" className="object-cover" />
          </div>
          <p className="mt-3 text-xs text-concrete">
            Representative imagery. Real project photography will replace this.
          </p>
        </div>
      </section>

      {/* 04 — Materials */}
      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <Eyebrow className="text-accent">Materials &amp; Craft</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {craft.map((c) => (
              <Reveal key={c.title}>
                <figure className="relative aspect-square overflow-hidden rounded-sm">
                  <Image src={c.image} alt={c.title} fill sizes="33vw" className="object-cover" />
                  <figcaption className="absolute bottom-0 left-0 p-5 font-display text-xl text-bone">
                    {c.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Placeholder gallery for owner */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-ink/20 p-14 text-center">
            <span className="font-mono text-xs text-concrete">Gallery</span>
            <p className="mt-3 max-w-md text-concrete">
              Add completed {w.title.toLowerCase()} photography here — a scroll-driven
              gallery of real K&amp;K Company projects.
            </p>
            <div className="mt-8">
              <ArrowButton href="/contact" cursor="Start">
                Start a Project
              </ArrowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-ink/10 bg-bone py-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-[var(--spacing-gutter)]">
          <span className="text-xs uppercase tracking-[0.16em] text-concrete">Next</span>
          <Link href={`/projects/${nextWork.slug}`} data-cursor="View" className="group flex items-center gap-4">
            <span className="font-display text-2xl tracking-tight text-ink md:text-4xl">{nextWork.title}</span>
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
