import type { Metadata } from "next";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import { company } from "@/lib/content";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us what you're building. Get a quote from K&K Company — civil contracting, architecture, renovation, pools, fabrication and waterproofing in Kochi, Kerala.",
};

export default function ContactPage() {
  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  return (
    <div className="grid min-h-screen lg:grid-cols-[42%_1fr]">
      {/* Left — art-directed panel */}
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image
          src="/images/projects/cta-dusk.jpg"
          alt=""
          fill
          sizes="42vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="grain absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-12 text-bone">
          <div className="pt-24">
            <Eyebrow className="text-accent-soft">Start a Project</Eyebrow>
            <h1 className="font-display mt-6 text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] tracking-tight">
              Let&apos;s build something worth keeping.
            </h1>
            <p className="mt-6 max-w-sm text-stone">
              A few questions to understand your project. It takes under a minute,
              and there&apos;s no obligation.
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
              <a href={`mailto:${company.email}`} className="mt-1 block text-lg hover:text-accent-soft">
                {company.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-stone">Studio</p>
              <p className="mt-1 text-stone">
                {company.address.line1}, {company.address.city} – {company.address.pin}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex items-center px-[var(--spacing-gutter)] py-28 lg:py-24">
        <QuoteForm />
      </section>
    </div>
  );
}
