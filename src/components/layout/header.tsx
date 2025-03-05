"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserNav } from "@/components/ui/user-nav";
import {
  CreditCard,
  ExternalLink,
  FileText,
  LogIn,
  Menu,
  Moon,
  Sparkles,
  Sun
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Center section - Navigation (hidden on mobile) */}
          <nav className="hidden md:flex items-center justify-center gap-6">
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
            {/* Desktop actions - visible only on medium screens and up */}
            <div className="hidden md:flex items-center gap-4">
              <UserNav />
              <ModeToggle />
            </div>

            {/* Mobile menu button (visible only on small screens) */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[90vh] h-auto px-6 pt-4 pb-6 flex flex-col"
              >
                <SheetHeader className="flex flex-col items-start">
                  <div className="flex w-full items-center justify-between">
                    <Logo />
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <UserNav />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Smart mock data for modern apps</p>
                </SheetHeader>

                {/* Spacer to push navigation to bottom */}
                <div className="flex-grow" />

                <nav className="flex flex-col gap-2 mt-auto mb-4">
                  <SheetClose asChild>
                    <Link
                      href="/features"
                      className="flex h-12 items-center justify-start rounded-md px-4 text-base font-medium transition-colors hover:bg-muted border border-border/40"
                    >
                      <Sparkles className="mr-3 h-5 w-5 text-primary" />
                      Features
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/pricing"
                      className="flex h-12 items-center justify-start rounded-md px-4 text-base font-medium transition-colors hover:bg-muted border border-border/40"
                    >
                      <CreditCard className="mr-3 h-5 w-5 text-primary" />
                      Pricing
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/docs"
                      className="flex h-12 items-center justify-start rounded-md px-4 text-base font-medium transition-colors hover:bg-muted border border-border/40"
                    >
                      <FileText className="mr-3 h-5 w-5 text-primary" />
                      Documentation
                    </Link>
                  </SheetClose>
                </nav>

                <Separator className="mb-4" />

                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="justify-start"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    )}
                  </Button>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="justify-start"
                    >
                      <Link href="/demo">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Try Demo
                      </Link>
                    </Button>
                  </SheetClose>
                  {!session && (
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="default"
                        size="lg"
                        className="justify-start"
                      >
                        <Link href="/login">
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </Link>
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
