import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { company } from "@/lib/content";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free, no-obligation consultation with K&K Builders in Trivandrum — by phone, video, site visit or at our studio. Architecture, construction and interior design under one roof.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Consultation · K&K Builders",
    description:
      "A free, no-obligation consultation with K&K Builders, Trivandrum — architecture, construction and interiors.",
    images: ["/images/projects/interiors-living.jpg"],
  },
};

export default function BookPage() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  return (
    <div className="grid min-h-screen lg:grid-cols-[42%_1fr]">
      {/* Left — art-directed panel */}
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image
          src="/images/projects/interiors-living.jpg"
          alt=""
          fill
          sizes="42vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="grain absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12 text-bone">
          <div className="pt-24">
            <Eyebrow className="text-accent-soft">Book a Consultation</Eyebrow>
            <h1 className="font-display mt-6 text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] tracking-tight">
              Let&apos;s talk it through.
            </h1>
            <p className="mt-6 max-w-sm text-stone">
              A free, no-obligation conversation about your project — by phone, video,
              a visit to your site, or at our Trivandrum studio.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-stone">Call</p>
              <a href={tel(company.phoneQuote)} className="mt-1 block text-lg hover:text-accent-soft">
                {company.phoneQuote}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-stone">Email</p>
              <a href={`mailto:${company.email}`} className="mt-1 block text-lg hover:text-accent-soft break-all">
                {company.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-stone">Where we work</p>
              <p className="mt-1 text-stone">
                {company.address.city}, {company.address.region} · {company.areasServed.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right — booking form */}
      <section className="flex items-center px-[var(--spacing-gutter)] py-28 lg:py-24">
        <div className="w-full">
          <div className="mb-10 lg:hidden">
            <Eyebrow className="text-accent">Book a Consultation</Eyebrow>
            <h1 className="font-display mt-4 text-4xl tracking-tight text-ink">
              Let&apos;s talk it through.
            </h1>
          </div>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
