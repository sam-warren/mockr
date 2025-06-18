'use server'

import { createClient } from '../server'
import { revalidatePath } from 'next/cache'
import { ActionResult } from './user'
import { redirect } from 'next/navigation'
export interface MockGeneration {
  id: string
  user_id: string
  template_id?: string
  generation_prompt: string
  generation_schema?: Record<string, unknown>
  generation_type: 'prompt' | 'schema' | 'hybrid'
  generated_data: unknown[]
  record_count: number
  processing_time_ms?: number
  ai_model_used: string
  credits_consumed: number
  generation_status: 'pending' | 'processing' | 'completed' | 'failed'
  error_message?: string
  created_at: string
  completed_at?: string
}

export interface MockTemplate {
  id: string
  user_id: string
  name: string
  description?: string
  prompt_description?: string
  json_schema?: Record<string, unknown>
  generation_type: 'prompt' | 'schema' | 'hybrid'
  sample_size: number
  tags: string[]
  is_public: boolean
  usage_count: number
  created_at: string
  updated_at: string
}

export async function getUserMockGenerations(limit = 20): Promise<ActionResult<MockGeneration[]>> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('mock_generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching mock generations:', error)
      return { success: false, error: 'Failed to fetch mock generations' }
    }

    return { success: true, data: data as MockGeneration[] }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getMockGeneration(id: string): Promise<ActionResult<MockGeneration>> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('mock_generations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching mock generation:', error)
      return { success: false, error: 'Mock generation not found' }
    }

    return { success: true, data: data as MockGeneration }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function deleteMockGeneration(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    // First delete related logs
    await supabase
      .from('generation_logs')
      .delete()
      .eq('generation_id', id)
      .eq('user_id', user.id)

    // Then delete the generation
    const { error } = await supabase
      .from('mock_generations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting mock generation:', error)
      return { success: false, error: 'Failed to delete mock generation' }
    }

    revalidatePath('/mocks')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getUserMockTemplates(): Promise<ActionResult<MockTemplate[]>> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('mock_templates')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching mock templates:', error)
      return { success: false, error: 'Failed to fetch mock templates' }
    }

    return { success: true, data: data as MockTemplate[] }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function createMockTemplate(formData: FormData): Promise<ActionResult<MockTemplate>> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const promptDescription = formData.get('prompt_description') as string
    const jsonSchemaStr = formData.get('json_schema') as string
    const generationType = formData.get('generation_type') as 'prompt' | 'schema' | 'hybrid'
    const sampleSize = parseInt(formData.get('sample_size') as string) || 10
    const tagsStr = formData.get('tags') as string
    const isPublic = formData.get('is_public') === 'true'

    // Validate required fields
    if (!name || !generationType) {
      return { success: false, error: 'Name and generation type are required' }
    }

    // Parse JSON schema if provided
    let jsonSchema: Record<string, unknown> | null = null
    if (jsonSchemaStr) {
      try {
        jsonSchema = JSON.parse(jsonSchemaStr)
      } catch {
        return { success: false, error: 'Invalid JSON schema format' }
      }
    }

    // Parse tags
    const tags = tagsStr ? tagsStr.split(',').map(tag => tag.trim()) : []

    const { data, error } = await supabase
      .from('mock_templates')
      .insert({
        user_id: user.id,
        name,
        description: description || null,
        prompt_description: promptDescription || null,
        json_schema: jsonSchema,
        generation_type: generationType,
        sample_size: sampleSize,
        tags,
        is_public: isPublic,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating mock template:', error)
      return { success: false, error: 'Failed to create mock template' }
    }

    revalidatePath('/templates')

    return { success: true, data: data as MockTemplate }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function deleteMockTemplate(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' }
    }

    const { error } = await supabase
      .from('mock_templates')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting mock template:', error)
      return { success: false, error: 'Failed to delete mock template' }
    }

    revalidatePath('/templates')

    return { success: true }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Create mock placeholder and redirect to view page
export async function createMockPlaceholder(formData: FormData): Promise<never> {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error('User not authenticated')
    }

    // Check user credits
    const { data: userCredits, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits_available')
      .eq('user_id', user.id)
      .single()

    if (creditsError || !userCredits) {
      throw new Error('Failed to check user credits')
    }

    if (userCredits.credits_available < 1) {
      throw new Error('Insufficient credits. Please purchase more credits to continue.')
    }

    const prompt = formData.get('prompt') as string
    const jsonSchemaStr = formData.get('json_schema') as string
    const sampleSize = parseInt(formData.get('sample_size') as string) || 10

    // Parse JSON schema if provided
    let jsonSchema: Record<string, unknown> | null = null
    if (jsonSchemaStr && jsonSchemaStr.trim()) {
      try {
        jsonSchema = JSON.parse(jsonSchemaStr)
      } catch {
        throw new Error('Invalid JSON schema format')
      }
    }

    // Automatically determine generation type based on inputs
    let generationType: 'prompt' | 'schema' | 'hybrid'
    const hasPrompt = prompt && prompt.trim()
    const hasSchema = jsonSchema !== null

    if (hasPrompt && hasSchema) {
      generationType = 'hybrid'
    } else if (hasSchema) {
      generationType = 'schema'
    } else if (hasPrompt) {
      generationType = 'prompt'
    } else {
      throw new Error('Please provide either a prompt description or a JSON schema')
    }

    // Create initial mock generation record with pending status
    const { data: mockGeneration, error: insertError } = await supabase
      .from('mock_generations')
      .insert({
        user_id: user.id,
        generation_prompt: prompt,
        generation_schema: jsonSchema,
        generation_type: generationType,
        generated_data: [],
        record_count: 0,
        ai_model_used: 'gpt-4o-mini',
        credits_consumed: 1,
        generation_status: 'pending',
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating mock generation:', insertError)
      throw new Error('Failed to create generation record')
    }

    // Start async generation process
    generateMockDataAsync(mockGeneration.id, {
      prompt,
      jsonSchema,
      generationType,
      sampleSize,
    }, user.id)

    // Redirect to the individual mock page
    redirect(`/mocks/${mockGeneration.id}`)
  } catch (error) {
    console.error('Create mock placeholder error:', error)
    // For server actions that redirect, we can't show toasts directly
    // So we'll throw the error and let the client handle it
    throw error
  }
}

// Async function to handle the actual generation (runs in background)
async function generateMockDataAsync(
  generationId: string, 
  options: {
    prompt: string
    jsonSchema: Record<string, unknown> | null
    generationType: 'prompt' | 'schema' | 'hybrid'
    sampleSize: number
  },
  userId: string
) {
  // Import OpenAI dynamically to avoid issues
  const { default: OpenAI } = await import('openai')
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  
  const supabase = await createClient()
  
  try {
    // Update status to processing
    await supabase
      .from('mock_generations')
      .update({ generation_status: 'processing' })
      .eq('id', generationId)

    const startTime = Date.now()

    // Build optimized prompt for speed
    const systemPrompt = `Generate realistic JSON mock data that follows all requirements exactly.
Rules: Return {"data": [array of objects]}, all required fields present, realistic values, proper formats.`

    let userPrompt = ''
    switch (options.generationType) {
      case 'prompt':
        userPrompt = `Generate ${options.sampleSize} records: ${options.prompt}`
        break
      case 'schema':
        userPrompt = `Generate ${options.sampleSize} records following this schema: ${JSON.stringify(options.jsonSchema, null, 0)}`
        break
      case 'hybrid':
        userPrompt = `Generate ${options.sampleSize} records for: ${options.prompt}\nSchema: ${JSON.stringify(options.jsonSchema, null, 0)}`
        break
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: Math.min(1500, options.sampleSize * 200),
      response_format: { type: 'json_object' },
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    const parsedResponse = JSON.parse(response) as Record<string, unknown>
    const mockData = Array.isArray(parsedResponse.data) ? parsedResponse.data : 
                     Array.isArray(parsedResponse) ? parsedResponse : []
    
    if (!Array.isArray(mockData)) {
      throw new Error('Generated data is not an array')
    }

    const processingTime = Date.now() - startTime

    // Consume user credits
    const { error: consumeError } = await supabase.rpc('consume_user_credits', {
      p_user_id: userId,
      p_credits_needed: 1
    })

    if (consumeError) {
      console.error('Error consuming credits:', consumeError)
    }

    // Update with completed generation
    await supabase
      .from('mock_generations')
      .update({
        generated_data: mockData.slice(0, options.sampleSize),
        record_count: Math.min(mockData.length, options.sampleSize),
        processing_time_ms: processingTime,
        generation_status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', generationId)

    // Log success
    await supabase
      .from('generation_logs')
      .insert({
        user_id: userId,
        generation_id: generationId,
        event_type: 'generation_completed',
        message: `Successfully generated ${Math.min(mockData.length, options.sampleSize)} mock records`,
        metadata: {
          processing_time_ms: processingTime,
          generation_type: options.generationType,
          sample_size: options.sampleSize,
        },
      })

  } catch (error) {
    console.error('Async generation error:', error)
    
    // Update with error status
    await supabase
      .from('mock_generations')
      .update({
        generation_status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        completed_at: new Date().toISOString(),
      })
      .eq('id', generationId)

    // Log error
    await supabase
      .from('generation_logs')
      .insert({
        user_id: userId,
        generation_id: generationId,
        event_type: 'generation_failed',
        message: `Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
  }
} 