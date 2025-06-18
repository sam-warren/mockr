import { createClient } from '@/lib/supabase/server';

export async function getCredits(userId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('user_credits')
        .select('credits_available')
        .eq('user_id', userId)
        .single();
    return data?.credits_available ?? 0;
}
