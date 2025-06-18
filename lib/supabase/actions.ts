'use server'

import { createClient } from './server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface ActionResult<T = unknown> {
    success: boolean
    data?: T
    error?: string
}

// User Profile Actions
export async function updateUserProfile(formData: FormData): Promise<ActionResult> {
    try {
        const supabase = await createClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { success: false, error: 'User not authenticated' }
        }

        const display_name = formData.get('display_name') as string

        // Update user profile
        const { data, error } = await supabase
            .from('user_profiles')
            .update({
                display_name: display_name || null,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            .select()
            .single()

        if (error) {
            console.error('Error updating profile:', error)
            return { success: false, error: 'Failed to update profile' }
        }

        // Revalidate the account page and any other pages that might show user data
        revalidatePath('/account')
        revalidatePath('/dashboard')

        return { success: true, data }
    } catch (error) {
        console.error('Server action error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

export async function getUserProfile(): Promise<ActionResult> {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { success: false, error: 'User not authenticated' }
        }

        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('Error fetching profile:', error)
            return { success: false, error: 'Failed to fetch profile' }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Server action error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

export async function getUserCredits(): Promise<ActionResult> {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { success: false, error: 'User not authenticated' }
        }

        const { data, error } = await supabase
            .from('user_credits')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (error) {
            console.error('Error fetching credits:', error)
            return { success: false, error: 'Failed to fetch credits' }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Server action error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

export async function getGenerationStats(): Promise<ActionResult> {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { success: false, error: 'User not authenticated' }
        }

        const { data: generations, error } = await supabase
            .from('mock_generations')
            .select('record_count, credits_consumed, created_at')
            .eq('user_id', user.id)
            .eq('generation_status', 'completed')

        if (error) {
            console.error('Error fetching generation stats:', error)
            return { success: false, error: 'Failed to fetch stats' }
        }

        const totalGenerations = generations?.length || 0
        const totalRecords = generations?.reduce((sum, gen) => sum + gen.record_count, 0) || 0
        const totalCreditsUsed = generations?.reduce((sum, gen) => sum + gen.credits_consumed, 0) || 0

        return {
            success: true,
            data: {
                totalGenerations,
                totalRecords,
                totalCreditsUsed
            }
        }
    } catch (error) {
        console.error('Server action error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}

// Auth Actions
export async function signOut(): Promise<void> {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
}

export async function deleteUserAccount(): Promise<ActionResult> {
    try {
        const supabase = await createClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { success: false, error: 'User not authenticated' }
        }

        // Delete all user data in order (due to foreign key constraints)
        // 1. Delete generation logs
        await supabase
            .from('generation_logs')
            .delete()
            .eq('user_id', user.id)

        // 2. Delete mock generations
        await supabase
            .from('mock_generations')
            .delete()
            .eq('user_id', user.id)

        // 3. Delete mock templates
        await supabase
            .from('mock_templates')
            .delete()
            .eq('user_id', user.id)

        // 4. Delete user credits
        await supabase
            .from('user_credits')
            .delete()
            .eq('user_id', user.id)

        // 5. Delete user profile
        const { error: profileError } = await supabase
            .from('user_profiles')
            .delete()
            .eq('id', user.id)

        if (profileError) {
            console.error('Error deleting user profile:', profileError)
            return { success: false, error: 'Failed to delete user data' }
        }

        // 6. Sign out the user
        await supabase.auth.signOut()

        // Redirect to home page after successful deletion
        redirect('/')
    } catch (error) {
        console.error('Delete account error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
} 