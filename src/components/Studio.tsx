import Image from "next/image";
import { pillars, journey, company } from "@/lib/content";
import { Eyebrow, Reveal, ArrowButton } from "./ui";

export default function Studio() {
  return (
    <section id="studio" className="grain relative scroll-mt-24 overflow-hidden bg-charcoal py-24 text-bone md:py-36">
      <div className="mx-auto max-w-[1600px] px-[var(--spacing-gutter)]">
        {/* Intro — two columns with image */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow className="text-accent-soft">Our Studio</Eyebrow>
            <h2 className="font-display mt-6 d-2 leading-[0.95]">
              K&amp;K <span className="font-serif-it font-normal text-accent-soft">Builders</span>
            </h2>
            <p className="font-display mt-6 max-w-xl text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] tracking-tight text-bone">
              {company.differentiator}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
              {company.positioning}
            </p>
            <div className="mt-9">
              <ArrowButton href="/about" tone="bone" variant="outline" cursor="About">
                About the studio
              </ArrowButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-graphite sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/projects/villa-dusk.jpg"
                alt="A K&K Builders home at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* The complete home journey — process timeline */}
        <div className="mt-24 md:mt-32">
          <Eyebrow className="text-accent-soft">The Complete Home Journey</Eyebrow>
          <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70}>
                <div className="border-t-2 border-accent/40 pt-5">
                  <span className="font-display block text-4xl leading-none text-accent-soft">
                    {s.n}
                  </span>
                  <h3 className="font-display mt-4 text-xl tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Why K&K */}
        <div className="mt-24 md:mt-32">
          <Eyebrow className="text-accent-soft">Why K&amp;K Builders</Eyebrow>
          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <span className="font-mono text-xs text-accent-soft">0{i + 1}</span>
                <h4 className="font-display mt-3 text-2xl leading-tight tracking-tight">{p.title}</h4>
                <div className="mt-4 h-px w-full bg-bone/12" />
                <p className="mt-4 text-sm leading-relaxed text-stone">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
