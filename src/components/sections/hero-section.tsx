import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 dark:opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32" />
      </div>
      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 pl-1 pr-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <Badge variant="default" className="mr-2 px-1.5 py-0.5 text-[10px]">
              NEW
            </Badge>
            Introducing mockr.io - Now in beta
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Context-Aware AI Mock Data Generation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Generate realistic test data that understands your application&apos;s
            specific relationships. Say goodbye to random data and hello to
            semantically valid mock datasets.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">Live Demo</Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield-check"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-zap"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>100 generations free</span>
            <span className="mx-2">•</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Developer-friendly</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
