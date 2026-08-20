import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Craft from "@/components/Craft";
import Story from "@/components/Story";
import Pillars from "@/components/Pillars";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { faqs } from "@/lib/content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Services />
      <Process />
      <Craft />
      <Story />
      <Pillars />
      <Testimonials />
      <Faq />
      <CTA />
    </>
  );
}
