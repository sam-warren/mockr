import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function AppHeader() {
  return (
    <header className="border-b h-16">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          Mockr
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Docs
          </Button>
          <ModeToggle />
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            U
          </div>
        </div>
      </div>
    </header>
  );
} 