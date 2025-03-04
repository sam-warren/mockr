import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { Container } from "@/components/ui/container";
import { GridBackground } from "@/components/layout/grid-background";

export const metadata = {
  title: "Pricing - mockr",
  description: "Simple, transparent pricing for all your mock data needs.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24">
        <GridBackground />
        <Container className="relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Pricing Plans for Every Team
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Transparent pricing with no hidden fees. Choose the plan that works best for your needs, 
              and upgrade or downgrade anytime.
            </p>
          </div>
        </Container>
      </section>
      <SectionDivider variant="primary" />
      <PricingSection />
      <SectionDivider variant="primary" />
      <CtaSection />
    </>
  );
}
