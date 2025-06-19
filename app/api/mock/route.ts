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
    const prompt = typeof body === 'string' ? body : body?.prompt
    if (!prompt || typeof prompt !== 'string') {
        return new Response('Missing prompt', { status: 400 })
    }

    const userId = await getUserId()

    const result = streamObject({
        model: openai('gpt-4o-mini'),
        prompt,
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