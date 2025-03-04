import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="font-bold text-xl">
          Mockr
        </Link>
        <ModeToggle />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          © {new Date().getFullYear()} JunctionTech Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
