import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative py-12 md:py-16 bg-muted/20 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Ready to transform your testing workflow?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Join thousands of developers who are already using mockr to
            create realistic test data.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 cursor-pointer">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 cursor-pointer">
              Schedule a Demo
            </Button>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            No credit card required. Start with our free tier and upgrade
            anytime.
          </div>
        </div>
      </Container>
    </section>
  );
}
