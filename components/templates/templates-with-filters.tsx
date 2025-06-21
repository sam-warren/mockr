"use client";

import { useState, useMemo } from "react";
import { Filter, Search, Inbox } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/template-card";
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

interface TemplatesWithFiltersProps {
  initialTemplates?: Template[];
}

export function TemplatesWithFilters({
  initialTemplates = templatesData as Template[],
}: TemplatesWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = initialTemplates;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (template) => template.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "category":
          return a.category.localeCompare(b.category);
        case "popular":
          // Sort by sample size as a proxy for popularity
          return b.sampleSize - a.sampleSize;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [initialTemplates, searchQuery, categoryFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSortBy("name");
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg md:flex-row md:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="content">Content</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="e-commerce">E-commerce</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="food & beverage">Food & Beverage</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid Content */}
      {initialTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No templates available</h3>
            <p className="text-muted-foreground max-w-sm">
              Templates are currently being loaded. Please check back soon.
            </p>
          </div>
        </div>
      ) : filteredAndSortedTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">No templates found</h3>
            <p className="text-muted-foreground max-w-sm">
              Try adjusting your search query or filters to find templates.
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
              Showing {filteredAndSortedTemplates.length} of {initialTemplates.length} templates
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </>
      )}
    </>
  );
} 