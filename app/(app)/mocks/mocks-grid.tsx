"use client"

import { useState, useEffect, useMemo } from "react"
import { Inbox, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MockCard } from "@/components/mock-card"
import { MockDetailsDialog } from "@/components/mock-details-dialog"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/database.types"
import { toast } from "sonner"

type MockGeneration = Tables<'mock_generations'>

function MocksGrid() {
  const [mocks, setMocks] = useState<MockGeneration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMock, setSelectedMock] = useState<MockGeneration | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const supabase = createClient()

  const loadMocks = async () => {
    try {
      setIsLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("Please log in to view your mock generations")
        return
      }

      const { data, error } = await supabase
        .from('mock_generations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setMocks(data || [])
    } catch (error) {
      toast.error("Failed to load mock generations")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMocks()
  }, [])

  const filteredAndSortedMocks = useMemo(() => {
    let filtered = mocks

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(mock => 
        mock.generation_prompt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mock.generation_type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(mock => mock.generation_status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "records":
          return b.record_count - a.record_count
        case "credits":
          return (b.credits_consumed || 0) - (a.credits_consumed || 0)
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    return filtered
  }, [mocks, searchQuery, statusFilter, sortBy])

  const handleViewDetails = (mock: MockGeneration) => {
    setSelectedMock(mock)
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-[280px] bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (mocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">No mock generations yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Get started by creating your first mock data generation. Click the button above to begin.
          </p>
        </div>
      </div>
    )
  }

  if (filteredAndSortedMocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">No matches found</h3>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting your search query or filters to find what you&apos;re looking for.
          </p>
        </div>
        <Button variant="outline" onClick={() => {
          setSearchQuery("")
          setStatusFilter("all")
          setSortBy("newest")
        }}>
          Clear filters
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedMocks.length} of {mocks.length} mock generations
        </p>
        <Button variant="outline" size="sm" onClick={loadMocks}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedMocks.map((mock) => (
          <MockCard
            key={mock.id}
            mock={mock}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      <MockDetailsDialog
        mock={selectedMock}
        open={selectedMock !== null}
        onOpenChange={(open) => !open && setSelectedMock(null)}
      />
    </>
  )
}

export default MocksGrid 