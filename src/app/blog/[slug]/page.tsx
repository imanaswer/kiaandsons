import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { getPost, getPosts } from "@/lib/data";
import { Reveal, Eyebrow } from "@/components/ui";

export const revalidate = 300;

const siteUrl = "https://kjasons.com";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: `${post.title} · K&K Builders Journal`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} · K&K Builders`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.published_at || undefined,
      authors: [post.author || "K&K Builders"],
      images: post.cover_image ? [{ url: `${siteUrl}${post.cover_image}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [`${siteUrl}${post.cover_image}`] : undefined,
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

function renderFormattedInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-ink">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function renderMarkdownBlock(block: string, index: number) {
  const trimmed = block.trim();

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={index} className="font-display mt-8 mb-3 text-xl md:text-2xl tracking-tight text-ink">
        {trimmed.slice(4)}
      </h3>
    );
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="font-display mt-12 mb-4 text-2xl md:text-3xl tracking-tight text-ink border-b border-ink/10 pb-3">
        {trimmed.slice(3)}
      </h2>
    );
  }

  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
    const items = trimmed.split(/\n(?=[-*]\s)/).map((it) => it.replace(/^[-*]\s+/, "").trim());
    return (
      <ul key={index} className="my-6 space-y-3 pl-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-base md:text-lg leading-relaxed text-concrete">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-ink/90">{renderFormattedInline(it)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (/^\d+\.\s/.test(trimmed)) {
    const items = trimmed.split(/\n(?=\d+\.\s)/).map((it) => it.replace(/^\d+\.\s+/, "").trim());
    return (
      <ol key={index} className="my-6 space-y-3 pl-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-base md:text-lg leading-relaxed text-concrete">
            <span className="font-mono text-xs font-bold text-accent shrink-0 mt-1.5">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <span className="text-ink/90">{renderFormattedInline(it)}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p key={index} className="text-base md:text-lg leading-relaxed text-ink/90">
      {renderFormattedInline(trimmed)}
    </p>
  );
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const blocks = post.body.split(/\n{2,}/).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? `${siteUrl}${post.cover_image}` : undefined,
    author: {
      "@type": "Organization",
      name: post.author || "K&K Builders",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "K&K Builders",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    datePublished: post.published_at || undefined,
    dateModified: post.published_at || undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        {/* Header */}
        <header className="bg-ink px-[var(--spacing-gutter)] pb-14 pt-36 text-bone md:pt-40">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <Link href="/blog" className="text-xs uppercase tracking-[0.16em] text-bone/60 hover:text-accent-soft">
                ← Journal
              </Link>
              {post.reading_time && (
                <>
                  <span className="text-bone/30">·</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-accent-soft font-mono">
                    {post.reading_time}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-bone/15 px-3 py-1 text-xs text-bone/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

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
            {/* Lede quote / excerpt summary */}
            <div className="mb-10 rounded-sm border-l-2 border-accent bg-ink/[0.03] p-6 text-lg font-medium leading-relaxed text-ink md:text-xl">
              {post.excerpt}
            </div>

            <div className="space-y-6">
              {blocks.map((b, i) => renderMarkdownBlock(b, i))}
            </div>
          </div>
        </div>
      </article>

      {/* More from Journal */}
      {more.length > 0 && (
        <section className="border-t border-ink/10 bg-bone pb-20">
          <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] pt-14">
            <Eyebrow className="text-accent">More from the journal</Eyebrow>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {more.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block border-t border-ink/12 pt-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-concrete">
                      <span>{fmt(p.published_at)}</span>
                      {p.reading_time && (
                        <>
                          <span>·</span>
                          <span className="font-mono text-accent">{p.reading_time}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display mt-2 text-2xl tracking-tight text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-concrete line-clamp-2">{p.excerpt}</p>
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

