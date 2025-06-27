"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LandingNavigationProps {
  isAuthenticated: boolean;
}

export function LandingNavigation({ isAuthenticated }: LandingNavigationProps) {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold font-mono">{`{mockr.io}`}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          Features
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          Pricing
        </Button>
        <Button
          onClick={() =>
            router.push(isAuthenticated ? "/dashboard" : "/auth/login")
          }
          variant="outline"
          size="sm"
        >
          {isAuthenticated ? "Dashboard" : "Sign In"}
        </Button>
      </div>
    </nav>
  );
}
