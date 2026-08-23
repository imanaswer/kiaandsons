import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import { getPosts } from "@/lib/data";
import { Eyebrow, Reveal } from "@/components/ui";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on architecture, construction and interiors from K&K Builders — how we work, what we build, and how we source for clients in Trivandrum, Kerala.",
  alternates: { canonical: "/blog" },
};

function fmt(d: string | null) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="bg-ink px-[var(--spacing-gutter)] pb-16 pt-40 text-bone">
        <div className="mx-auto max-w-[1600px]">
          <Eyebrow className="text-accent-soft">Journal</Eyebrow>
          <h1 className="font-display mt-6 max-w-4xl d-1">Notes from the studio.</h1>
          <p className="mt-6 max-w-xl text-stone">
            How we work, what we build, and how we source — written by the team.
          </p>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
          {posts.length === 0 ? (
            <p className="text-concrete">No posts yet — check back soon.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-graphite">
                      {p.cover_image && (
                        <Image
                          src={p.cover_image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                      )}
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.16em] text-concrete">
                      {fmt(p.published_at)}
                    </p>
                    <h2 className="font-display mt-2 text-2xl leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-concrete">{p.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
