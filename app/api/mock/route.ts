import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const runtime = 'edge'

// Service-role client – can write regardless of RLS
const admin = createSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: { persistSession: false },
    },
)

async function getUserId() {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
            },
        },
    )
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Response('Unauthorized', { status: 401 })
    return user.id as string
}

export async function POST(req: Request) {
    const body = await req.json()
    
    // Handle both old format (string) and new format (object)
    let prompt: string
    let schema: string | undefined
    
    if (typeof body === 'string') {
        prompt = body
    } else {
        prompt = body?.prompt || ''
        schema = body?.schema || undefined
    }
    
    if (!prompt && !schema) {
        return new Response('Missing prompt or schema', { status: 400 })
    }

    const userId = await getUserId()

    // Build the enhanced prompt
    let enhancedPrompt = ''
    
    if (prompt && schema) {
        enhancedPrompt = `${prompt}

Please generate the data according to this JSON schema:
${schema}

IMPORTANT: Your response must be valid JSON that exactly conforms to the provided schema. Do not include any explanatory text, comments, or markdown formatting - only the JSON data.`
    } else if (schema) {
        enhancedPrompt = `Generate mock data that conforms to this JSON schema:
${schema}

IMPORTANT: Your response must be valid JSON that exactly conforms to the provided schema. Do not include any explanatory text, comments, or markdown formatting - only the JSON data.`
    } else {
        enhancedPrompt = `${prompt}

IMPORTANT: Your response must be valid JSON. Do not include any explanatory text, comments, or markdown formatting - only the JSON data.`
    }

    const result = streamObject({
        model: openai('gpt-4o-mini'),
        prompt: enhancedPrompt,
        // accept anything – structure is unknown
        output: 'no-schema',
        async onFinish({ object }) {
            const recordCount = Array.isArray(object) ? object.length : 1
            await admin.from('mock_generations').insert({
                user_id: userId,
                generation_prompt: prompt,
                generation_type: 'prompt',
                generated_data: object,
                record_count: recordCount,
                completed_at: new Date().toISOString(),
            })
        },
    })

    return result.toTextStreamResponse()
} 