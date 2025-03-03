import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t py-10 md:py-12">
      <div className="container flex flex-col items-center gap-6">
        <div className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} mockr.io. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
} 