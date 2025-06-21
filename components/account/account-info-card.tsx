import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

interface AccountInfoCardProps {
  profile: UserProfile;
  credits: UserCredits | null;
}

export function AccountInfoCard({ profile, credits }: AccountInfoCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
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
  );
} 