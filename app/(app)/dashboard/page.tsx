"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MockCard } from "@/components/mock-card";
import { TemplateCard } from "@/components/template-card";
import { MockDetailsDialog } from "@/components/mock-details-dialog";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/database.types";
import templatesData from "@/lib/data/templates.json";

type MockGeneration = Tables<"mock_generations">;

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

export default function DashboardPage() {
  const [recentMocks, setRecentMocks] = useState<MockGeneration[]>([]);
  const [isLoadingMocks, setIsLoadingMocks] = useState(true);
  const [selectedMock, setSelectedMock] = useState<MockGeneration | null>(null);
  const [totalMocks, setTotalMocks] = useState(0);
  const [totalCreditsUsed, setTotalCreditsUsed] = useState(0);

  const supabase = createClient();

  // Get popular templates (top 4 by sample size)
  const popularTemplates = (templatesData as Template[])
    .sort((a, b) => b.sampleSize - a.sampleSize)
    .slice(0, 3);

  const loadDashboardData = async () => {
    try {
      setIsLoadingMocks(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      // Get recent mocks (last 4)
      const { data: mocks, error: mocksError } = await supabase
        .from("mock_generations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);

      if (mocksError) {
        throw mocksError;
      }

      setRecentMocks(mocks || []);

      // Get total stats
      const { data: stats, error: statsError } = await supabase
        .from("mock_generations")
        .select("id, credits_consumed")
        .eq("user_id", user.id);

      if (!statsError && stats) {
        setTotalMocks(stats.length);
        setTotalCreditsUsed(
          stats.reduce((sum, mock) => sum + (mock.credits_consumed || 0), 0)
        );
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoadingMocks(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleViewMockDetails = (mock: MockGeneration) => {
    setSelectedMock(mock);
  };

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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Recent Mock Generations</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/mocks">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {isLoadingMocks ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
            ))}
          </div>
        ) : recentMocks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recentMocks.map((mock) => (
              <MockCard
                key={mock.id}
                mock={mock}
                onViewDetails={handleViewMockDetails}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No mock generations yet</h3>
                <p className="text-muted-foreground">
                  Get started by creating your first mock data generation
                </p>
              </div>
              <Button asChild>
                <Link href="/mocks/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Your First Mock
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Popular Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Popular Templates</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates">
              Browse All Templates
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Mock Details Dialog */}
      <MockDetailsDialog
        mock={selectedMock}
        open={selectedMock !== null}
        onOpenChange={(open) => !open && setSelectedMock(null)}
      />
    </div>
  );
}
