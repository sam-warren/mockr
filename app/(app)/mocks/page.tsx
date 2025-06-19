import { Plus } from "lucide-react";
import Link from "next/link";

import MocksGrid from "@/components/mocks/mocks-grid";
import { Button } from "@/components/ui/button";

export default async function MocksPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Your Mock Generations
          </h1>
          <p className="text-muted-foreground">
            View and manage your generated mock data collections
          </p>
        </div>
        <Button asChild>
          <Link href="/mocks/new">
            <Plus className="h-4 w-4" />
            Generate New Mock
          </Link>
        </Button>
      </div>
      <MocksGrid />
    </div>
  );
}
