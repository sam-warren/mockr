import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Database,
  FileText,
  Home,
  Settings,
  User,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              mockr.io
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/generators">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Database className="h-5 w-5" />
                Data Generators
              </Button>
            </Link>
            <Link href="/dashboard/templates">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <FileText className="h-5 w-5" />
                Templates
              </Button>
            </Link>
            <Link href="/dashboard/usage">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <BarChart3 className="h-5 w-5" />
                Usage
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  );
} 