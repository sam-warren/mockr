import { GridBackground } from "@/components/layout/grid-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Add the grid background */}
      <GridBackground />
      
      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
