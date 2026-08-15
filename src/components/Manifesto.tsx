import { Reveal } from "./ui";

const keywords = [
  "Architecture",
  "Civil Contracting",
  "Design & Build",
  "Renovation",
  "Structural Strengthening",
  "Swimming Pools",
  "Koi Ponds",
  "Landscaping",
  "Natural Stone",
  "Fabrication",
  "Waterproofing",
  "Home Automation",
];

export default function Manifesto() {
  return (
    <section className="border-b border-ink/10 bg-bone">
      {/* Manifesto */}
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)] py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-accent">The Idea</p>
          </Reveal>
          <Reveal delay={80} className="md:col-span-9">
            <p className="font-display text-[clamp(1.8rem,3.6vw,3.1rem)] leading-[1.12] tracking-tight text-ink">
              Architecture is not decoration. Construction is not just execution.{" "}
              <span className="text-concrete">
                We take an idea and turn it into a physical space — planned by
                architects, resolved by engineers, and built by craftsmen who care
                how it lasts.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Marquee of disciplines */}
      <div className="relative overflow-hidden border-t border-ink/10 py-5">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-8 whitespace-nowrap [@media(prefers-reduced-motion:reduce)]:animate-none">
          {[...keywords, ...keywords].map((k, i) => (
            <span key={i} className="flex items-center gap-8 text-sm uppercase tracking-[0.18em] text-concrete">
              {k}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
