import { Plus, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentMocksSection } from "@/components/dashboard/recent-mocks-section";
import { PopularTemplatesSection } from "@/components/dashboard/popular-templates-section";
import { createClient } from "@/lib/supabase/server";
import templatesData from "@/lib/data/templates.json";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  jsonSchema: Record<string, unknown>;
  sampleSize: number;
  tags: string[];
}

async function getDashboardData() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        recentMocks: [],
        totalMocks: 0,
        totalCreditsUsed: 0,
      };
    }

    // Get recent mocks (last 4)
    const { data: mocks, error: mocksError } = await supabase
      .from("mock_generations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(4);

    if (mocksError) {
      console.error("Failed to fetch mocks:", mocksError);
    }

    // Get total stats
    const { data: stats, error: statsError } = await supabase
      .from("mock_generations")
      .select("id, credits_consumed")
      .eq("user_id", user.id);

    if (statsError) {
      console.error("Failed to fetch stats:", statsError);
    }

    const totalMocks = stats?.length || 0;
    const totalCreditsUsed = stats?.reduce((sum, mock) => sum + (mock.credits_consumed || 0), 0) || 0;

    return {
      recentMocks: mocks || [],
      totalMocks,
      totalCreditsUsed,
    };
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return {
      recentMocks: [],
      totalMocks: 0,
      totalCreditsUsed: 0,
    };
  }
}

export default async function DashboardPage() {
  const { recentMocks, totalMocks, totalCreditsUsed } = await getDashboardData();

  // Get popular templates (top 3 by sample size)
  const popularTemplates = (templatesData as Template[])
    .sort((a, b) => b.sampleSize - a.sampleSize)
    .slice(0, 3);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your mock data generations and available templates
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/mocks/new">
            <Plus className="h-5 w-5 mr-2" />
            Generate New Mock
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mocks Generated
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMocks}</div>
            <p className="text-xs text-muted-foreground">
              All time generations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Used</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCreditsUsed}</div>
            <p className="text-xs text-muted-foreground">
              Total credits consumed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Templates
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templatesData.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready-to-use templates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Mocks Section */}
      <RecentMocksSection recentMocks={recentMocks} />

      {/* Popular Templates Section */}
      <PopularTemplatesSection templates={popularTemplates} />
    </div>
  );
}
