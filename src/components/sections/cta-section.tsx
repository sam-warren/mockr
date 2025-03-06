import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAppUrl } from "@/utils/navigation";

export function CtaSection() {
  return (
    <section className="relative py-12 md:py-16 bg-muted/20 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Ready to transform your{" "}
            <span className="text-primary">testing workflow</span>?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Supercharge your development workflow with mockr today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-8 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
            >
              <Link href={getAppUrl("login")}>Get Started for Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 cursor-pointer border-primary/20 hover:bg-primary/5"
            >
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
