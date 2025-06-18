import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';        // generated types

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,          // note: service role
);

export async function consumeCredit(userId: string) {
    const { data, error } = await supabase.rpc('consume_user_credits', {
        p_user_id: userId,
        p_credits_needed: 1
    });
    if (error || data === false) throw new Error('Insufficient credits');
}