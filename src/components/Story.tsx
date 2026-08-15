import { timeline } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

export default function Story() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-24 text-bone md:py-36">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <Eyebrow className="text-accent-soft">Our Story</Eyebrow>
            <h2 className="font-display mt-6 max-w-3xl d-1">
              Four decades of a family trade.
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4">
            <p className="text-sm leading-relaxed text-stone">
              Built on a family tradition of caring — the same values carried from a
              1983 Ernakulam workshop to the KJA &amp; Sons of today.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 100}>
              <div className="grid grid-cols-1 items-start gap-6 border-t border-bone/12 py-10 last:border-b md:grid-cols-[minmax(0,0.9fr)_2px_2fr] md:gap-12 md:py-14">
                <div className="font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-tight text-bone">
                  {t.year}
                </div>
                <div className="hidden self-stretch bg-accent/40 md:block" />
                <div className="max-w-xl md:pt-4">
                  <h3 className="font-display text-2xl md:text-3xl">{t.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-stone">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
