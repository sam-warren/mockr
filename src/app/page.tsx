import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="primary" />
      <FeaturesSection />
      <SectionDivider variant="primary" />
      <PricingSection />
      <CtaSection />
    </>
  );
}
