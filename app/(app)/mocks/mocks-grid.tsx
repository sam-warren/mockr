'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MockGeneration, deleteMockGeneration } from '@/lib/supabase/actions/mock-generation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  Loader2, 
  XCircle, 
  Trash2, 
  Eye, 
  Calendar,
  Hash,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface MocksGridProps {
  mocks: MockGeneration[]
}

export default function MocksGrid({ mocks }: MocksGridProps) {
  const router = useRouter()
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  const handleCardClick = (mockId: string) => {
    router.push(`/mocks/${mockId}`)
  }

  const handleDelete = async (mockId: string, e?: React.MouseEvent) => {
    e?.stopPropagation() // Prevent card click when deleting
    
    setDeletingIds(prev => new Set(prev).add(mockId))
    
    try {
      const result = await deleteMockGeneration(mockId)
      if (result.success) {
        toast.success('Mock generation deleted successfully')
        // The page will revalidate automatically due to revalidatePath in the server action
        router.refresh()
      } else {
        toast.error('Failed to delete mock generation')
      }
    } catch {
      toast.error('An error occurred while deleting')
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(mockId)
        return newSet
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <Loader2 className="h-4 w-4 animate-spin" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default'
      case 'processing': return 'default'
      case 'completed': return 'default'
      case 'failed': return 'destructive'
      default: return 'default'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (mocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">No mock data yet</h3>
            <p className="text-muted-foreground">Create your first mock generation to get started!</p>
          </div>
          <Button onClick={() => router.push('/mocks/new')}>
            Create Mock Data
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mocks.map((mock) => (
        <Card 
          key={mock.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => handleCardClick(mock.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={getStatusColor(mock.generation_status)} className="flex items-center gap-1">
                    {getStatusIcon(mock.generation_status)}
                    <span className="capitalize">{mock.generation_status}</span>
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {mock.generation_type}
                  </Badge>
                </div>
                <CardTitle className="text-base line-clamp-2">
                  {mock.generation_prompt || 'Mock Generation'}
                </CardTitle>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    disabled={deletingIds.has(mock.id)}
                  >
                    {deletingIds.has(mock.id) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Mock Generation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this mock generation? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={(e) => handleDelete(mock.id, e)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(mock.created_at)}
                </div>
                {mock.generation_status === 'completed' && (
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {mock.record_count} records
                  </div>
                )}
              </div>
              
              {mock.processing_time_ms && (
                <div className="text-xs text-muted-foreground">
                  Generated in {mock.processing_time_ms}ms
                </div>
              )}
              
              {mock.error_message && (
                <div className="text-xs text-destructive truncate">
                  Error: {mock.error_message}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-muted-foreground">
                  {mock.credits_consumed} credit{mock.credits_consumed === 1 ? '' : 's'} used
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 