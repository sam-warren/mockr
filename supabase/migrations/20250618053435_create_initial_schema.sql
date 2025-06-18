-- Migration: Create initial schema for mockr application
-- Purpose: Set up core tables for mock data generation with JSON schema support, user credits, and RLS policies
-- Date: 2025-06-18
-- Tables: user_profiles, user_credits, mock_templates, mock_generations, generation_logs

-- Enable UUID extension for generating UUIDs
create extension if not exists "uuid-ossp";

-- =====================================================
-- USER PROFILES TABLE
-- =====================================================
-- Extends auth.users with additional profile information
create table public.user_profiles (
  id uuid references auth.users(id) primary key,
  display_name text,
  avatar_url text,
  plan_type text not null default 'free' check (plan_type in ('free', 'credits', 'subscription')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.user_profiles is 'Extended user profile information for authenticated users, linked to Supabase auth.users';
comment on column public.user_profiles.plan_type is 'User payment plan: free (limited usage), credits (pay-per-use), subscription (monthly)';
comment on column public.user_profiles.stripe_customer_id is 'Stripe customer ID for payment processing';

-- Enable RLS on user_profiles
alter table public.user_profiles enable row level security;

-- =====================================================
-- USER CREDITS TABLE
-- =====================================================
-- Tracks credit balance and usage for pay-per-use model
create table public.user_credits (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  credits_available integer not null default 0 check (credits_available >= 0),
  credits_used integer not null default 0 check (credits_used >= 0),
  last_purchase_amount integer default 0,
  last_purchase_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Ensure one record per user
  unique(user_id)
);

comment on table public.user_credits is 'Tracks available and used credits for each user in the pay-per-use model';
comment on column public.user_credits.credits_available is 'Number of credits available for mock generation';
comment on column public.user_credits.credits_used is 'Total credits consumed by user across all generations';

-- Enable RLS on user_credits
alter table public.user_credits enable row level security;

-- =====================================================
-- MOCK TEMPLATES TABLE
-- =====================================================
-- Stores reusable mock templates with JSON schema support
create table public.mock_templates (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  
  -- Support for three generation methods
  prompt_description text, -- User's natural language description
  json_schema jsonb, -- Valid JSON Schema (https://json-schema.org)
  generation_type text not null default 'hybrid' check (generation_type in ('prompt', 'schema', 'hybrid')),
  
  -- Template configuration
  sample_size integer not null default 10 check (sample_size > 0 and sample_size <= 1000),
  tags text[] default '{}',
  is_public boolean not null default false,
  
  -- Metadata
  usage_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.mock_templates is 'Reusable templates for mock data generation supporting JSON Schema, prompts, or hybrid approaches';
comment on column public.mock_templates.prompt_description is 'Natural language description of desired mock data structure';
comment on column public.mock_templates.json_schema is 'Valid JSON Schema definition following json-schema.org specification';
comment on column public.mock_templates.generation_type is 'Method used: prompt (AI-only), schema (JSON Schema-only), hybrid (both)';
comment on column public.mock_templates.sample_size is 'Number of mock records to generate (1-1000)';
comment on column public.mock_templates.is_public is 'Whether template can be discovered and used by other users';

-- Enable RLS on mock_templates
alter table public.mock_templates enable row level security;

-- Create indexes for performance
create index idx_mock_templates_user_id on public.mock_templates(user_id);
create index idx_mock_templates_tags on public.mock_templates using gin(tags);
create index idx_mock_templates_public on public.mock_templates(is_public) where is_public = true;

-- =====================================================
-- MOCK GENERATIONS TABLE
-- =====================================================
-- Stores actual generated mock data and metadata
create table public.mock_generations (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.mock_templates(id) on delete set null,
  
  -- Generation input (snapshot at time of generation)
  generation_prompt text,
  generation_schema jsonb,
  generation_type text not null check (generation_type in ('prompt', 'schema', 'hybrid')),
  
  -- Generated output
  generated_data jsonb not null,
  record_count integer not null check (record_count > 0),
  
  -- Processing metadata
  processing_time_ms integer,
  ai_model_used text default 'gpt-4o-mini',
  credits_consumed integer not null default 1,
  generation_status text not null default 'completed' check (generation_status in ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  
  -- Timestamps
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

comment on table public.mock_generations is 'Individual mock data generations with full generated datasets and processing metadata';
comment on column public.mock_generations.generated_data is 'Complete generated mock dataset as JSON array';
comment on column public.mock_generations.generation_prompt is 'Snapshot of prompt used (may differ from template)';
comment on column public.mock_generations.generation_schema is 'Snapshot of JSON schema used (may differ from template)';
comment on column public.mock_generations.processing_time_ms is 'Time taken for AI generation in milliseconds';
comment on column public.mock_generations.credits_consumed is 'Number of credits deducted for this generation';

-- Enable RLS on mock_generations
alter table public.mock_generations enable row level security;

-- Create indexes for performance
create index idx_mock_generations_user_id on public.mock_generations(user_id);
create index idx_mock_generations_template_id on public.mock_generations(template_id);
create index idx_mock_generations_created_at on public.mock_generations(created_at desc);
create index idx_mock_generations_status on public.mock_generations(generation_status);

-- =====================================================
-- GENERATION LOGS TABLE
-- =====================================================
-- Audit trail for all generation attempts and system events
create table public.generation_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  generation_id uuid references public.mock_generations(id) on delete cascade,
  
  -- Log details
  event_type text not null check (event_type in ('generation_started', 'generation_completed', 'generation_failed', 'credit_deducted', 'template_used')),
  message text not null,
  metadata jsonb default '{}',
  
  -- Timestamp
  created_at timestamptz not null default now()
);

comment on table public.generation_logs is 'Audit trail for all mock generation events and user actions';
comment on column public.generation_logs.event_type is 'Type of event being logged for filtering and analytics';
comment on column public.generation_logs.metadata is 'Additional structured data for the logged event';

-- Enable RLS on generation_logs
alter table public.generation_logs enable row level security;

-- Create indexes for performance
create index idx_generation_logs_user_id on public.generation_logs(user_id);
create index idx_generation_logs_created_at on public.generation_logs(created_at desc);
create index idx_generation_logs_event_type on public.generation_logs(event_type);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- User Profiles Policies
create policy "Users can view own profile"
  on public.user_profiles
  for select
  to authenticated
  using ( (select auth.uid()) = id );

create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check ( (select auth.uid()) = id );

create policy "Users can update own profile"
  on public.user_profiles
  for update
  to authenticated
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id );

create policy "Users can delete own profile"
  on public.user_profiles
  for delete
  to authenticated
  using ( (select auth.uid()) = id );

-- User Credits Policies
create policy "Users can view own credits"
  on public.user_credits
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Users can insert own credits"
  on public.user_credits
  for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "Users can update own credits"
  on public.user_credits
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- Mock Templates Policies
create policy "Users can view own templates"
  on public.mock_templates
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Users can view public templates"
  on public.mock_templates
  for select
  to authenticated
  using ( is_public = true );

create policy "Users can insert own templates"
  on public.mock_templates
  for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "Users can update own templates"
  on public.mock_templates
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

create policy "Users can delete own templates"
  on public.mock_templates
  for delete
  to authenticated
  using ( (select auth.uid()) = user_id );

-- Mock Generations Policies
create policy "Users can view own generations"
  on public.mock_generations
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Users can insert own generations"
  on public.mock_generations
  for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "Users can update own generations"
  on public.mock_generations
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

create policy "Users can delete own generations"
  on public.mock_generations
  for delete
  to authenticated
  using ( (select auth.uid()) = user_id );

-- Generation Logs Policies (read-only for users)
create policy "Users can view own logs"
  on public.generation_logs
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "System can insert logs"
  on public.generation_logs
  for insert
  to authenticated
  with check ( true );

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to initialize user credits when a new user signs up
create or replace function public.initialize_user_credits()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Create user profile
  insert into public.user_profiles (id, plan_type)
  values (new.id, 'free');
  
  -- Initialize with 3 free credits for new users
  insert into public.user_credits (user_id, credits_available)
  values (new.id, 3);
  
  -- Log the initialization
  insert into public.generation_logs (user_id, event_type, message)
  values (new.id, 'credit_deducted', 'Account initialized with 3 free credits');
  
  return new;
end;
$$;

comment on function public.initialize_user_credits() is 'Automatically creates user profile and credits when new user signs up';

-- Create trigger to initialize user data on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.initialize_user_credits();

-- Function to consume credits during generation
create or replace function public.consume_user_credits(
  p_user_id uuid,
  p_credits_needed integer default 1
)
returns boolean
language plpgsql
security definer
as $$
declare
  v_available_credits integer;
begin
  -- Get current available credits
  select credits_available into v_available_credits
  from public.user_credits
  where user_id = p_user_id;
  
  -- Check if user has enough credits
  if v_available_credits < p_credits_needed then
    return false;
  end if;
  
  -- Consume the credits
  update public.user_credits
  set 
    credits_available = credits_available - p_credits_needed,
    credits_used = credits_used + p_credits_needed,
    updated_at = now()
  where user_id = p_user_id;
  
  -- Log the credit consumption
  insert into public.generation_logs (user_id, event_type, message, metadata)
  values (
    p_user_id, 
    'credit_deducted', 
    format('Consumed %s credits', p_credits_needed),
    jsonb_build_object('credits_consumed', p_credits_needed)
  );
  
  return true;
end;
$$;

comment on function public.consume_user_credits(uuid, integer) is 'Safely consumes user credits and logs the transaction';

-- Function to add credits (for purchases)
create or replace function public.add_user_credits(
  p_user_id uuid,
  p_credits_to_add integer,
  p_purchase_amount integer default 0
)
returns void
language plpgsql
security definer
as $$
begin
  -- Add the credits
  update public.user_credits
  set 
    credits_available = credits_available + p_credits_to_add,
    last_purchase_amount = case when p_purchase_amount > 0 then p_purchase_amount else last_purchase_amount end,
    last_purchase_date = case when p_purchase_amount > 0 then now() else last_purchase_date end,
    updated_at = now()
  where user_id = p_user_id;
  
  -- Log the credit addition
  insert into public.generation_logs (user_id, event_type, message, metadata)
  values (
    p_user_id, 
    'credit_deducted', 
    format('Added %s credits', p_credits_to_add),
    jsonb_build_object(
      'credits_added', p_credits_to_add,
      'purchase_amount_cents', p_purchase_amount
    )
  );
end;
$$;

comment on function public.add_user_credits(uuid, integer, integer) is 'Adds credits to user account from purchases or promotions';

-- Update timestamp function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add updated_at triggers
create trigger update_user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.update_updated_at_column();

create trigger update_user_credits_updated_at
  before update on public.user_credits
  for each row execute function public.update_updated_at_column();

create trigger update_mock_templates_updated_at
  before update on public.mock_templates
  for each row execute function public.update_updated_at_column();
