import Image from "next/image";
import { company } from "@/lib/content";
import { ArrowButton, Reveal } from "./ui";

export default function CTA() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-ink text-bone">
      <Image
        src="/images/projects/cta-dusk.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/70" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1600px] px-[var(--spacing-gutter)] py-24">
        <Reveal>
          <p className="eyebrow text-accent-soft">Start the conversation</p>
          <h2 className="font-display mt-6 d-hero max-w-5xl">
            Let&apos;s build
            <br />
            something <span className="font-serif-it text-accent-soft">worth keeping.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ArrowButton href="/contact" tone="bone" variant="solid" cursor="Start">
              Start a Project
            </ArrowButton>
            <ArrowButton
              href={`tel:${company.phoneQuote.replace(/\s/g, "")}`}
              tone="bone"
              variant="outline"
              cursor="Call"
            >
              Call Our Team
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
