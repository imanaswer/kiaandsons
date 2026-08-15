import Image from "next/image";
import { craft } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

export default function Craft() {
  return (
    <section className="bg-bone py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Eyebrow className="text-accent">Materiality</Eyebrow>
            <h2 className="font-display mt-6 d-1 text-ink">
              Details are
              <br />
              <span className="font-serif-it text-concrete">the structure.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-5">
            <p className="text-base leading-relaxed text-concrete">
              Concrete, steel and stone worked with intent. The finish you touch is
              the same discipline that holds the building up — nothing is decoration.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {craft.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-graphite" data-cursor="Material">
                <Image
                  src={c.image}
                  alt={`${c.title} — macro detail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-80" />
                <figcaption className="absolute bottom-0 left-0 flex items-baseline gap-3 p-6">
                  <span className="font-mono text-xs text-bone/60">0{i + 1}</span>
                  <span className="font-display text-2xl text-bone">{c.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
