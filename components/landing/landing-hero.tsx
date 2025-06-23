"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LandingHeroProps {
  isAuthenticated: boolean;
}

export function LandingHero({ isAuthenticated }: LandingHeroProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-10 px-6 py-24 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-fade-in-up animation-delay-200">
          Context-Aware Mock Data
          <br />
          <span className="text-primary">Generator & Manager</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          A powerful web application that generates realistic mock data using
          AI. Create, customize, and manage datasets for your development
          projects with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <Button
            onClick={() => router.push(isAuthenticated ? "/dashboard" : "/auth/sign-up")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 px-8 py-6 text-lg group transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Generating Data"}
            <ArrowRight
              className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    </section>
  );
} 