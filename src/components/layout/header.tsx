import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "@/components/ui/user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Center section - Navigation */}
          <nav className="flex items-center justify-center gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
          </nav>

          {/* Right section - Actions */}
          <div className="flex items-center justify-end gap-4">
            <UserNav />
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
