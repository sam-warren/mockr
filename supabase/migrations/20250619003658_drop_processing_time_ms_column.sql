-- Drop processing_time_ms column from mock_generations table
-- This column is no longer needed for the application

alter table public.mock_generations drop column if exists processing_time_ms;
