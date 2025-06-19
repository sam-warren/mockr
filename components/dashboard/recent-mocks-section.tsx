"use client";

import { useState } from "react";
import { Clock, ArrowRight, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MockCard } from "@/components/mock-card";
import { MockDetailsDialog } from "@/components/mock-details-dialog";
import { Tables } from "@/database.types";

type MockGeneration = Tables<"mock_generations">;

interface RecentMocksSectionProps {
  recentMocks: MockGeneration[];
}

export function RecentMocksSection({ recentMocks }: RecentMocksSectionProps) {
  const [selectedMock, setSelectedMock] = useState<MockGeneration | null>(null);

  const handleViewMockDetails = (mock: MockGeneration) => {
    setSelectedMock(mock);
  };

  return (
    <>
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

        {recentMocks.length > 0 ? (
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

      {/* Mock Details Dialog */}
      <MockDetailsDialog
        mock={selectedMock}
        open={selectedMock !== null}
        onOpenChange={(open) => !open && setSelectedMock(null)}
      />
    </>
  );
} 