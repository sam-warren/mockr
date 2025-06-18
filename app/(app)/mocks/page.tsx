import { getUserMockGenerations } from "@/lib/supabase/actions/mock-generation";
import MocksGrid from "./mocks-grid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function MocksPage() {
  const result = await getUserMockGenerations();

  if (!result.success) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Mock Generations</h1>
          <p className="text-muted-foreground">
            Failed to load your mock generations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Mock Generations</h1>
          <p className="text-muted-foreground">
            {!result.data || result.data.length === 0
              ? "You haven't created any mock data yet"
              : `${result.data.length} mock generation${
                  result.data.length === 1 ? "" : "s"
                }`}
          </p>
        </div>

        <Button asChild>
          <Link href="/mocks/new">
            <Plus className="h-4 w-4" />
            New Mock
          </Link>
        </Button>
      </div>

      <MocksGrid mocks={result.data || []} />
    </div>
  );
}
