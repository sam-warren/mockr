import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Brain, Code, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { GridBackground } from "@/components/layout/grid-background";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <GridBackground>
        <div className="absolute inset-x-0 bottom-0 h-32" />
      </GridBackground>
      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 pl-1 pr-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              <Badge
                variant="default"
                className="mr-2 px-1.5 py-0.5 text-[10px]"
              >
                NEW
              </Badge>
              Introducing mockr - Now in beta
            </div>
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 pl-1 pr-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              <Badge
                variant="secondary"
                className="mr-2 px-1.5 py-0.5 text-[10px]"
              >
                <Brain className="h-3 w-3 mr-1" />
                AI
              </Badge>
              Driven by Artificial Intelligence
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Context-Aware Mock Data Generation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Generate realistic test data that understands your
            application&apos;s specific relationships. Say goodbye to random
            data and hello to semantically valid mock datasets.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">Live Demo</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <Zap className="h-4 w-4" />
            <span>100 generations free</span>
            <span className="mx-2">•</span>
            <Code className="h-4 w-4" />
            <span>Developer-friendly</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
