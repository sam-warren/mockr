import { Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TemplatesWithFilters } from "@/components/templates/templates-with-filters"

export default async function TemplatesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Mock Data Templates
          </h1>
          <p className="text-muted-foreground">
            Choose from pre-built templates to quickly generate realistic mock data
          </p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/mocks/new">
            <Plus className="h-4 w-4" />
            Create Custom Mock
          </Link>
        </Button>
      </div>

      {/* Templates with Filters */}
      <Suspense fallback={<TemplatesGridSkeleton />}>
        <TemplatesWithFilters />
      </Suspense>
    </div>
  )
}

function TemplatesGridSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter skeleton */}
      <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg md:flex-row md:items-center">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
      </div>
      
      {/* Grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[240px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
