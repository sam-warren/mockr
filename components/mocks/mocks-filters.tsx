"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MocksFiltersProps {
  onSearchChange?: (search: string) => void;
  onStatusChange?: (status: string) => void;
  onSortChange?: (sort: string) => void;
}

export function MocksFilters({
  onSearchChange,
  onStatusChange,
  onSortChange,
}: MocksFiltersProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg md:flex-row md:items-center">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search mock generations..."
          className="pl-10"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <Select defaultValue="all" onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="newest" onValueChange={onSortChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
