-- Migration: Fix record_count constraint to allow 0 for pending generations
-- Purpose: Allow mock_generations to have 0 records initially when status is 'pending'
-- Date: 2025-06-18

-- Drop the existing constraint
ALTER TABLE public.mock_generations DROP CONSTRAINT IF EXISTS mock_generations_record_count_check;

-- Add new constraint that allows 0 records for pending/processing generations
ALTER TABLE public.mock_generations 
ADD CONSTRAINT mock_generations_record_count_check 
CHECK (record_count >= 0);

-- Update the comment to reflect the change
COMMENT ON COLUMN public.mock_generations.record_count IS 'Number of records in the generated dataset (0 for pending/processing generations)';
