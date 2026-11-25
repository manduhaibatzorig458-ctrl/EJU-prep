create table if not exists public.onboarding_responses (
  clerk_user_id text primary key check (length(clerk_user_id) > 0),
  answers jsonb not null check (jsonb_typeof(answers) = 'object'),
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.onboarding_responses enable row level security;

revoke all on table public.onboarding_responses from anon, authenticated;
grant select, insert, update on table public.onboarding_responses to service_role;
