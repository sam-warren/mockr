import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MockGeneration } from '@/lib/supabase/actions/mock-generation'

export function useRealtimeMock(generationId: string) {
  const [mockGeneration, setMockGeneration] = useState<MockGeneration | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Initial fetch
    const fetchGeneration = async () => {
      try {
        const { data, error } = await supabase
          .from('mock_generations')
          .select('*')
          .eq('id', generationId)
          .single()

        if (error) {
          setError('Failed to fetch generation')
          return
        }

        setMockGeneration(data as MockGeneration)
        setIsLoading(false)
      } catch {
        setError('An error occurred while fetching generation')
        setIsLoading(false)
      }
    }

    fetchGeneration()

    // Set up realtime subscription
    const channel = supabase
      .channel(`mock_generation_${generationId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'mock_generations',
          filter: `id=eq.${generationId}`,
        },
        (payload) => {
          console.log('Realtime update received:', payload)
          setMockGeneration(payload.new as MockGeneration)
          
          // If generation is completed or failed, we can stop loading
          if (payload.new.generation_status === 'completed' || payload.new.generation_status === 'failed') {
            setIsLoading(false)
          }
        }
      )
      .subscribe()

    // Cleanup
    return () => {
      channel.unsubscribe()
    }
  }, [generationId])

  return {
    mockGeneration,
    isLoading,
    error,
    isCompleted: mockGeneration?.generation_status === 'completed',
    isFailed: mockGeneration?.generation_status === 'failed',
    isProcessing: mockGeneration?.generation_status === 'processing',
    isPending: mockGeneration?.generation_status === 'pending',
  }
} 