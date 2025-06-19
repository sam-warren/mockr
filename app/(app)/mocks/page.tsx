import { Suspense } from "react"
import { Plus, Search, Filter, Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import MocksGrid from "./mocks-grid"

export default async function MocksPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Your Mock Generations
          </h1>
          <p className="text-muted-foreground">
            View and manage your generated mock data collections
          </p>
        </div>
        <Button asChild>
          <Link href="/mocks/new">
            <Plus className="h-4 w-4" />
            Generate New Mock
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search mock generations..." 
            className="pl-10" 
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
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
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="records">Most Records</SelectItem>
            <SelectItem value="credits">Most Credits</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mock Generations Grid */}
      <Suspense fallback={<MocksGridSkeleton />}>
        <MocksGrid />
      </Suspense>
    </div>
  )
}

function MocksGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}
