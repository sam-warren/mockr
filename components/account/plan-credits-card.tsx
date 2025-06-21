"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  plan_type: "free" | "credits";
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

interface PlanCreditsCardProps {
  profile: UserProfile;
  credits: UserCredits | null;
}

export function PlanCreditsCard({ profile, credits }: PlanCreditsCardProps) {
  const getPlanDisplay = (planType: string) => {
    switch (planType) {
      case "free":
        return { name: "Free Plan", color: "bg-gray-100 text-gray-800" };
      case "credits":
        return { name: "Pay-as-you-go", color: "bg-blue-100 text-blue-800" };
      default:
        return { name: "Free Plan", color: "bg-gray-100 text-gray-800" };
    }
  };

  const planDisplay = getPlanDisplay(profile?.plan_type || "free");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Plan & Credits
        </CardTitle>
        <CardDescription>Manage your subscription and credits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{planDisplay.name}</h3>
              <Badge className={planDisplay.color}>{profile?.plan_type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {profile?.plan_type === "free" && "3 free credits to get started"}
              {profile?.plan_type === "credits" &&
                `${credits?.credits_available} credits available`}
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold">
              {profile?.plan_type === "free" && "Free"}
              {profile?.plan_type === "credits" && "Pay-as-you-go"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
