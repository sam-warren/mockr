import { Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import { MocksWithFilters } from "./mocks-with-filters";

type MockGeneration = Tables<"mock_generations">;

async function getMocksData(): Promise<MockGeneration[]> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from("mock_generations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch mocks:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to load mock generations:", error);
    return [];
  }
}

// function MocksGridSkeleton() {
//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <Skeleton key={i} className="h-[280px] w-full rounded-lg" />
//       ))}
//     </div>
//   );
// }

async function MocksGridData() {
  const mocks = await getMocksData();
  return <MocksWithFilters initialMocks={mocks} />;
}

export default function MocksGrid() {
  return <MocksGridData />;
}
