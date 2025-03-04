import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Context-aware AI mock data generation platform for developers
                who need realistic test data.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Product</h3>
              <Link
                href="/features"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="/changelog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Changelog
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
              <Link
                href="/licenses"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Licenses
              </Link>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} JunctionTech Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com/jnctn_inc"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter size={16} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/sam-warren/mockr"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github size={16} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/company/junctiontech"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin size={16} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
