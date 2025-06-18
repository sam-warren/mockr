import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, CreditCard, TrendingUp } from "lucide-react";
import {
  getUserProfile,
  getUserCredits,
  getGenerationStats,
  updateUserProfile,
} from "@/lib/supabase/actions/user";
import { ProfileForm } from "@/components/forms/profile-form";

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  plan_type: "free" | "credits" | "subscription";
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

  const getPlanDisplay = (planType: string) => {
    switch (planType) {
      case "free":
        return { name: "Free Plan", color: "bg-gray-100 text-gray-800" };
      case "credits":
        return { name: "Pay-as-you-go", color: "bg-blue-100 text-blue-800" };
      case "subscription":
        return { name: "Pro Plan", color: "bg-green-100 text-green-800" };
      default:
        return { name: "Free Plan", color: "bg-gray-100 text-gray-800" };
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const planDisplay = getPlanDisplay(profile?.plan_type || "free");
  const creditsProgress = credits
    ? Math.min(
        (credits.credits_used /
          Math.max(credits.credits_used + credits.credits_available, 1)) *
          100,
        100
      )
    : 0;

  return (
    <>
      {/* Usage Overview */}
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

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              initialDisplayName={profile.display_name || ""}
              updateAction={updateUserProfile}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Plan & Credits
            </CardTitle>
            <CardDescription>
              Manage your subscription and credits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{planDisplay.name}</h3>
                  <Badge className={planDisplay.color}>
                    {profile?.plan_type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile?.plan_type === "free" &&
                    "3 free credits to get started"}
                  {profile?.plan_type === "credits" &&
                    `${credits?.credits_available} credits available`}
                  {profile?.plan_type === "subscription" &&
                    "Unlimited generations included"}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold">
                  {profile?.plan_type === "free" && "Free"}
                  {profile?.plan_type === "credits" && "Pay-as-you-go"}
                  {profile?.plan_type === "subscription" && "$29/month"}
                </div>
              </div>
            </div>

            {profile?.plan_type !== "subscription" && (
              <div className="space-y-2">
                <Button className="w-full" variant="default">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy More Credits
                </Button>
                <Button variant="outline" className="w-full">
                  Upgrade to Pro Plan
                </Button>
              </div>
            )}

            {profile?.plan_type === "subscription" && (
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Manage Billing
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium">Account Created</span>
              <span className="text-sm text-muted-foreground">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">
                {profile?.updated_at
                  ? new Date(profile.updated_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium">Total Credits Used</span>
              <span className="text-sm text-muted-foreground">
                {formatNumber(credits?.credits_used || 0)}
              </span>
            </div>
            {credits?.last_purchase_date && (
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium">Last Purchase</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(credits.last_purchase_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function AccountPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Suspense fallback={<AccountPageSkeleton />}>
        <AccountData />
      </Suspense>
    </div>
  );
}
