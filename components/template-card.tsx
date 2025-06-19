"use client"

import { useState } from "react"
import { FileText, Tag, Database, ArrowRight, Code2 } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Content': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Users': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Business': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'E-commerce': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Healthcare': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Finance': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Social': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Events': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Food & Beverage': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'content':
        return <FileText className="h-4 w-4" />
      case 'users':
        return <Database className="h-4 w-4" />
      case 'business':
      case 'e-commerce':
      case 'finance':
        return <Code2 className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        isHovered ? 'ring-2 ring-primary/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              {getCategoryIcon(template.category)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-medium truncate">
                {template.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {template.description}
              </p>
            </div>
          </div>
          <Badge className={getCategoryColor(template.category)}>
            {template.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-2">
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>

        <Button 
          asChild 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant={isHovered ? "default" : "outline"}
        >
          <Link href={`/mocks/new?template=${template.id}`}>
            <span>Use Template</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
} 