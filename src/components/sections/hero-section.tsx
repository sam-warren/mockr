"use client";

import { GridBackground } from "@/components/layout/grid-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getAppUrl } from "@/utils/navigation";
import { Brain, ChevronDown, Code, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Set initial viewport height
    setViewportHeight(window.innerHeight);

    // Update viewport height when window is resized
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Show learn more button after delay
    const timer = setTimeout(() => {
      setShowLearnMore(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToFeatures = () => {
    // Find the features section
    const featuresSection = document.querySelector("section:nth-of-type(2)");
    if (featuresSection) {
      // Get the position of the features section
      const featuresSectionRect = featuresSection.getBoundingClientRect();
      const offsetPosition = featuresSectionRect.top + window.pageYOffset - 80; // 80px offset from the top

      // Scroll to the position with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Fixed height hero section that doesn't rely on JS for initial height */}
      <section
        className="relative overflow-hidden h-[100vh] flex flex-col"
        style={{
          minHeight: `${viewportHeight > 0 ? viewportHeight : "100vh"}px`,
        }}
      >
        <GridBackground className="z-0">
          <div className="absolute inset-x-0 bottom-0 h-32" />
        </GridBackground>

        <Container className="relative flex-grow flex flex-col justify-between py-4 md:py-8 z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center pt-4 md:pt-16 lg:pt-24">
            <div className="flex flex-wrap justify-center gap-3 mb-4 md:mb-6">
              <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 px-2 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm">
                <Badge
                  variant="default"
                  className="mr-1.5 px-1.5 py-0.5 text-[11px] bg-primary text-primary-foreground"
                >
                  NEW
                </Badge>
                <span className="whitespace-nowrap">
                  Introducing mockr - Now in beta
                </span>
              </div>
              <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 px-2 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm">
                <Badge
                  variant="secondary"
                  className="mr-1.5 px-1.5 py-0.5 text-[11px] bg-primary/10 text-primary"
                >
                  <Brain className="h-3 w-3 mr-0.5" />
                  AI
                </Badge>
                <span className="whitespace-nowrap">
                  Driven by Artificial Intelligence
                </span>
              </div>
            </div>
            <h1 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Context-Aware Mock Data Generation
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
              Generate realistic test data that understands your
              application&apos;s specific relationships. Say goodbye to random
              data and hello to semantically valid mock datasets.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-md sm:max-w-none mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-subtle"
              >
                <Link href={getAppUrl("login")}>
                  <span className="flex items-center gap-2">
                    Get Started for Free <Zap className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
            <div className="mt-8 md:mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-primary" />
                <span>No credit card required</span>
              </div>
              <span className="hidden sm:inline mx-1 sm:mx-2">•</span>
              <div className="flex items-center">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-primary" />
                <span>100 generations free</span>
              </div>
              <span className="hidden sm:inline mx-1 sm:mx-2">•</span>
              <div className="flex items-center">
                <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-primary" />
                <span>Developer-friendly</span>
              </div>
            </div>
          </div>

          {/* Learn More button positioned at the bottom with more padding */}
          <div className="flex justify-center mt-auto mb-20 md:mb-28 lg:mb-36 pb-8">
            <div
              className={`transition-all duration-700 ease-in-out ${
                showLearnMore
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={scrollToFeatures}
                className="bg-background/90 backdrop-blur-sm rounded-full px-5 py-3 flex items-center gap-2 shadow-lg border border-border/40 hover:shadow-xl transition-all duration-300 active:translate-y-0.5 active:shadow-md cursor-pointer hover:border-primary/20 hover:bg-primary/5 animate-bounce-subtle"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  transform: "translateY(0)",
                  animation: "bounce 2s infinite",
                }}
              >
                <span className="text-sm font-medium">Learn More</span>
                <ChevronDown className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>
        </Container>

        {/* Add a hard cutoff at the bottom of the viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background z-20"></div>
      </section>

      {/* Add CSS keyframes for bounce animation */}
      <style jsx global>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
}
