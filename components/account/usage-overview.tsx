import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

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

interface UsageOverviewProps {
  credits: UserCredits | null;
  stats: GenerationStats;
}

export function UsageOverview({ credits, stats }: UsageOverviewProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const creditsProgress = credits
    ? Math.min(
        (credits.credits_used /
          Math.max(credits.credits_used + credits.credits_available, 1)) *
          100,
        100
      )
    : 0;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Usage Overview
        </CardTitle>
        <CardDescription>Your current usage and credits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {formatNumber(stats.totalGenerations)}
            </div>
            <div className="text-sm text-muted-foreground">
              Mock Generations
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {formatNumber(stats.totalRecords)}
            </div>
            <div className="text-sm text-muted-foreground">
              Records Generated
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {credits?.credits_available || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Credits Available
            </div>
          </div>
        </div>

        {credits && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Credits Used</span>
                <span>
                  {formatNumber(credits.credits_used)} /{" "}
                  {formatNumber(
                    credits.credits_used + credits.credits_available
                  )}
                </span>
              </div>
              <Progress value={creditsProgress} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 