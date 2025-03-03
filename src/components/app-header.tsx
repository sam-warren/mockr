import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4 px-6 md:px-8">
        <div className="flex items-center gap-3 pl-2">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-16 flex items-center justify-center">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-primary">{"}"}</span>
                </div>
              </div>
              <span className="text-xl font-bold pl-1">mockr.io</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
