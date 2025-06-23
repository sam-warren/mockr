"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface LandingCTAProps {
  isAuthenticated: boolean;
}

export function LandingCTA({ isAuthenticated }: LandingCTAProps) {
  const router = useRouter();

  return (
    <section className="relative z-10 px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          {isAuthenticated 
            ? "Access your dashboard to continue generating mock data effortlessly."
            : "Sign up today to start generating mock data effortlessly."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(isAuthenticated ? "/dashboard" : "/auth/sign-up")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 px-8 py-6 text-lg group transition-all duration-300 transform hover:scale-105"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
} 