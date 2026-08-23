import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { getPost, getPosts } from "@/lib/data";
import { Reveal } from "@/components/ui";

export const revalidate = 300;

const siteUrl = "https://kjasons.com";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} · K&K Builders`,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function fmt(d: string | null) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 2);
  const paragraphs = post.body.split(/\n{2,}/).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? `${siteUrl}${post.cover_image}` : undefined,
    author: { "@type": "Organization", name: post.author || "K&K Builders" },
    publisher: { "@type": "Organization", name: "K&K Builders" },
    datePublished: post.published_at || undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        {/* Header */}
        <header className="bg-ink px-[var(--spacing-gutter)] pb-14 pt-36 text-bone md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="text-xs uppercase tracking-[0.16em] text-bone/60 hover:text-accent-soft">
              ← Journal
            </Link>
            <h1 className="font-display mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-sm text-stone">
              {[post.author, fmt(post.published_at)].filter(Boolean).join(" · ")}
            </p>
          </div>
        </header>

        {post.cover_image && (
          <div className="bg-ink px-[var(--spacing-gutter)] pb-4">
            <div className="mx-auto max-w-5xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                <Image src={post.cover_image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="bg-bone py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-[var(--spacing-gutter)]">
            <div className="space-y-6 text-lg leading-relaxed text-ink/90">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* More */}
      {more.length > 0 && (
        <section className="border-t border-ink/10 bg-bone pb-20">
          <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] pt-14">
            <p className="eyebrow text-accent">More from the journal</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {more.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-baseline justify-between gap-6 border-t border-ink/12 pt-6">
                    <span className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
                      {p.title}
                    </span>
                    <svg viewBox="0 0 16 14" className="h-4 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1">
                      <path d="M1 7h13M9 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
