import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

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
import TemplatesGrid from "./templates-grid"

export default async function TemplatesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Mock Data Templates
          </h1>
          <p className="text-muted-foreground">
            Choose from pre-built templates to quickly generate realistic mock data
          </p>
        </div>
        <Button asChild>
          <Link href="/mocks/new">
            <Plus className="h-4 w-4" />
            Create Custom Mock
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-10" 
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="content">Content</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="food">Food & Beverage</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="name">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <Suspense fallback={<TemplatesGridSkeleton />}>
        <TemplatesGrid />
      </Suspense>
    </div>
  )
}

function TemplatesGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[240px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}
