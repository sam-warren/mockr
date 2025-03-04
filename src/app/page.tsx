import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SectionDivider variant="secondary" />
      <TestimonialsSection />
      <SectionDivider variant="tertiary" />
      <PricingSection />
      <CtaSection />
    </>
  );
}
