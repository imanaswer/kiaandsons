import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Craft from "@/components/Craft";
import Story from "@/components/Story";
import Pillars from "@/components/Pillars";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Services />
      <Process />
      <Craft />
      <Story />
      <Pillars />
      <Testimonials />
      <CTA />
    </>
  );
}
