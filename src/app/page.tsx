import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { faqs } from "@/lib/content";
import { getProjects } from "@/lib/data";

export const revalidate = 300;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function Home() {
  const projects = await getProjects();
  const items = projects.map((p, i) => ({
    slug: p.slug,
    index: String(i + 1).padStart(2, "0"),
    title: p.title,
    discipline: p.discipline,
    image: p.cover_image,
    intro: p.summary,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 1 — Cover */}
      <Hero />
      {/* 2 — Selected Work */}
      <SelectedWork items={items} />
      {/* 3 — Services + import */}
      <Services />
      {/* 4 — Closing (FAQ + CTA) */}
      <Faq />
      <CTA />
    </>
  );
}
