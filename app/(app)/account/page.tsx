import { AccountInfoCard } from "@/components/account/account-info-card";
import { PlanCreditsCard } from "@/components/account/plan-credits-card";
import { UsageOverview } from "@/components/account/usage-overview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getGenerationStats,
  getUserCredits,
  getUserProfile,
} from "@/lib/supabase/actions/user";

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  plan_type: "free" | "credits"
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

interface UserCredits {
  id: number;
  user_id: string;
  credits_available: number;
  credits_used: number;
  last_purchase_amount: number | null;
  last_purchase_date: string | null;
  created_at: string;
  updated_at: string;
}

interface GenerationStats {
  totalGenerations: number;
  totalRecords: number;
  totalCreditsUsed: number;
}

async function AccountData() {
  const [profileResult, creditsResult, statsResult] = await Promise.all([
    getUserProfile(),
    getUserCredits(),
    getGenerationStats(),
  ]);

  if (!profileResult.success) {
    return (
      <Alert>
        <AlertDescription>{profileResult.error}</AlertDescription>
      </Alert>
    );
  }

  const profile = profileResult.data as UserProfile;
  const credits = creditsResult.success
    ? (creditsResult.data as UserCredits)
    : null;
  const stats = statsResult.success
    ? (statsResult.data as GenerationStats)
    : {
        totalGenerations: 0,
        totalRecords: 0,
        totalCreditsUsed: 0,
      };

  return (
    <>
      <UsageOverview credits={credits} stats={stats} />

      <div className="space-y-6">
        <PlanCreditsCard profile={profile} credits={credits} />
        <AccountInfoCard profile={profile} credits={credits} />
      </div>
    </>
  );
}

// function AccountPageSkeleton() {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="space-y-6">
//         <Skeleton className="h-32 w-full" />
//         <Skeleton className="h-64 w-full" />
//         <Skeleton className="h-64 w-full" />
//       </div>
//     </div>
//   );
// }

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AccountData />
    </div>
  );
}
