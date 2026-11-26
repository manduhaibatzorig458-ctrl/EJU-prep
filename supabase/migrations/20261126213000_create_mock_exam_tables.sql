create table if not exists public.mock_exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null check (subject in ('mathematics', 'physics', 'chemistry', 'biology', 'japanese')),
  course_code text not null default 'none',
  exam_type text not null default 'past' check (exam_type in ('past', 'mock')),
  exam_year integer not null check (exam_year between 1900 and 2200),
  source_url text,
  question_count integer check (question_count is null or question_count > 0),
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mock_exams_course_code_valid
    check ((subject = 'mathematics' and course_code in ('course1', 'course2'))
      or (subject <> 'mathematics' and course_code = 'none')),
  constraint mock_exams_subject_year_type_idx unique (subject, course_code, exam_year, exam_type)
);

create table if not exists public.mock_exam_sections (
  id uuid primary key default gen_random_uuid(),
  mock_exam_id uuid not null references public.mock_exams(id) on delete cascade,
  section_number integer not null check (section_number > 0),
  title text not null,
  source_url text,
  question_count integer check (question_count is null or question_count > 0),
  sort_order integer not null,
  created_at timestamptz not null default now(),
  constraint mock_exam_sections_exam_number_idx unique (mock_exam_id, section_number)
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  mock_exam_section_id uuid not null references public.mock_exam_sections(id) on delete cascade,
  question_number integer not null check (question_number > 0),
  question_text text,
  explanation text,
  source_page integer check (source_page is null or source_page > 0),
  difficulty integer check (difficulty is null or difficulty between 1 and 5),
  points integer not null default 1 check (points > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint questions_section_number_idx unique (mock_exam_section_id, question_number)
);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_number integer not null check (option_number > 0),
  option_text text,
  is_correct boolean not null default false,
  created_at timestamptz not null default now(),
  constraint question_options_question_number_idx unique (question_id, option_number),
  constraint question_options_question_id_id_idx unique (question_id, id)
);

create unique index if not exists question_options_single_correct_idx
  on public.question_options (question_id)
  where is_correct;

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null check (length(clerk_user_id) > 0),
  mock_exam_section_id uuid not null references public.mock_exam_sections(id) on delete cascade,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'submitted', 'abandoned')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  elapsed_seconds integer check (elapsed_seconds is null or elapsed_seconds >= 0),
  created_at timestamptz not null default now()
);

create index if not exists exam_attempts_user_started_idx
  on public.exam_attempts (clerk_user_id, started_at desc);
create index if not exists exam_attempts_section_status_idx
  on public.exam_attempts (mock_exam_section_id, status);

create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  exam_attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  question_option_id uuid not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  constraint exam_answers_attempt_question_idx unique (exam_attempt_id, question_id),
  constraint exam_answers_option_question_fk
    foreign key (question_id, question_option_id)
    references public.question_options(question_id, id)
    on delete cascade
);

create index if not exists exam_answers_question_idx
  on public.exam_answers (question_id);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  exam_attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  correct_count integer not null check (correct_count >= 0),
  total_questions integer not null check (total_questions > 0),
  score_percent integer not null check (score_percent between 0 and 100),
  created_at timestamptz not null default now(),
  constraint exam_results_count_range check (correct_count <= total_questions),
  constraint exam_results_attempt_idx unique (exam_attempt_id)
);

create table if not exists public.exam_bookmarks (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null check (length(clerk_user_id) > 0),
  question_id uuid not null references public.questions(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  constraint exam_bookmarks_user_question_idx unique (clerk_user_id, question_id)
);

create index if not exists exam_bookmarks_question_idx
  on public.exam_bookmarks (question_id);

alter table public.mock_exams enable row level security;
alter table public.mock_exam_sections enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.exam_answers enable row level security;
alter table public.exam_results enable row level security;
alter table public.exam_bookmarks enable row level security;

revoke all on public.mock_exams, public.mock_exam_sections, public.questions,
  public.question_options, public.exam_attempts, public.exam_answers,
  public.exam_results, public.exam_bookmarks from anon, authenticated;

grant all on public.mock_exams, public.mock_exam_sections, public.questions,
  public.question_options, public.exam_attempts, public.exam_answers,
  public.exam_results, public.exam_bookmarks to service_role;
