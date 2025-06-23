"use client";

import { useState, useMemo } from "react";
import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MockCard } from "@/components/mock-card";
import { MocksFilters } from "./mocks-filters";
import { Tables } from "@/database.types";

type MockGeneration = Tables<"mock_generations">;

interface MocksWithFiltersProps {
  initialMocks: MockGeneration[];
}

export function MocksWithFilters({ initialMocks }: MocksWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedMocks = useMemo(() => {
    let filtered = initialMocks;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (mock) =>
          mock.generation_prompt
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          mock.generation_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mock.error_message
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          mock.ai_model_used
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (mock) => mock.generation_status === statusFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "newest":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    return filtered;
  }, [initialMocks, searchQuery, statusFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  return (
    <>
      {/* Filters */}
      <MocksFilters
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
      />

      {/* Grid Content */}
      {initialMocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No mock generations yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Get started by creating your first mock data generation. Click the
              button above to begin.
            </p>
          </div>
        </div>
      ) : filteredAndSortedMocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No matches found</h3>
            <p className="text-muted-foreground max-w-sm">
              Try adjusting your search query or filters to find what
              you&apos;re looking for.
            </p>
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          {/* Results summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedMocks.length} of {initialMocks.length}{" "}
              mock generations
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedMocks.map((mock) => (
              <MockCard key={mock.id} mock={mock} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
