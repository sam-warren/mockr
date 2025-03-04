import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GridBackground } from "@/components/layout/grid-background";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Add the grid background */}
      <GridBackground />
      
      {/* Header with logo and mode toggle */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Logo />
        <ModeToggle />
      </header>
      
      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
