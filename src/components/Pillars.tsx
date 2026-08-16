import { pillars } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

// Minimal typographic line-drawing marks (no stock icons).
const marks = [
  // Craftsmanship — a set square
  <path key="a" d="M6 30 L30 6 M6 30 L6 12 M6 30 L24 30" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />,
  // Innovation — intersecting circles
  <g key="b" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="14" cy="18" r="9" /><circle cx="24" cy="18" r="9" /></g>,
  // Client — concentric target
  <g key="c" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="18" cy="18" r="12" /><circle cx="18" cy="18" r="4" /></g>,
  // Integrity — balanced scale
  <path key="d" d="M18 5 V31 M8 12 H28 M8 12 L5 20 H11 L8 12 M28 12 L25 20 H31 L28 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />,
];

export default function Pillars() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="max-w-2xl">
          <Eyebrow className="text-accent">Why K&amp;K Company</Eyebrow>
          <h2 className="font-display mt-6 d-2 text-ink">
            Trust is built the same way a structure is.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group">
                <svg viewBox="0 0 36 36" className="h-10 w-10 text-accent">
                  {marks[i]}
                </svg>
                <h3 className="font-display mt-6 text-2xl leading-tight tracking-tight text-ink">
                  {p.title}
                </h3>
                <div className="mt-4 h-px w-full bg-ink/12" />
                <p className="mt-4 text-sm leading-relaxed text-concrete">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
