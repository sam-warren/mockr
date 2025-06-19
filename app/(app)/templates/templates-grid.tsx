"use client"

import { useState, useMemo } from "react"
import { Inbox } from "lucide-react"

import { TemplateCard } from "@/components/template-card"
import templatesData from "@/lib/data/templates.json"

interface Template {
  id: string
  name: string
  description: string
  category: string
  prompt: string
  jsonSchema: Record<string, unknown>
  sampleSize: number
  tags: string[]
}

function TemplatesGrid() {
  const [templates] = useState<Template[]>(templatesData as Template[])
  const [searchQuery] = useState("")
  const [categoryFilter] = useState("all")
  const [sortBy] = useState("name")

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(template => 
        template.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "category":
          return a.category.localeCompare(b.category)
        case "popular":
          // Sort by sample size as a proxy for popularity
          return b.sampleSize - a.sampleSize
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [templates, searchQuery, categoryFilter, sortBy])

  if (templates.length === 0) {
    return (
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
    )
  }

  if (filteredAndSortedTemplates.length === 0) {
    return (
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
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedTemplates.length} of {templates.length} templates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
          />
        ))}
      </div>
    </>
  )
}

export default TemplatesGrid 