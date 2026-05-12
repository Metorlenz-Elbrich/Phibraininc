import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import WhyUs from "@/components/sections/WhyUs";
import Technologies from "@/components/sections/Technologies";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesShowcase variant="home" />
      <WhyUs />
      <FeaturedWork />
      <Process />
      <Technologies />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
