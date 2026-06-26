create extension if not exists "pgcrypto";

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.teacher_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  display_name text,
  role text not null default 'teacher',
  created_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  period_name text not null,
  grade_label text,
  subject text,
  schedule jsonb not null default '{}'::jsonb,
  iep_supports jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete set null,
  student_code text not null,
  grade_label text,
  created_at timestamptz not null default now(),
  unique (school_id, student_code)
);

create table public.class_students (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

create table public.assessment_launches (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  class_period text,
  grade_band text not null,
  target_scope text not null check (target_scope in ('class', 'student', 'group')),
  question_count integer not null default 12,
  same_order boolean not null default true,
  read_aloud_enabled boolean not null default false,
  teacher_display_enabled boolean not null default true,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  launch_id uuid references public.assessment_launches(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  grade_band text not null,
  responses jsonb not null default '{}'::jsonb,
  profile jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.lesson_submissions (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  title text not null,
  class_period text,
  grade text,
  subject text,
  objective_style text,
  selected_systems text[] not null default '{}',
  matched_standards jsonb not null default '[]'::jsonb,
  selected_supports text[] not null default '{}',
  recommended_organizers text[] not null default '{}',
  lesson_text text,
  document_status text not null default 'available',
  document_url text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.strategy_library (
  id uuid primary key default gen_random_uuid(),
  system text not null,
  title text not null,
  description text not null,
  grade_bands text[] not null default '{}',
  subjects text[] not null default '{}',
  learning_styles text[] not null default '{}',
  use_when text,
  use_carefully text,
  created_at timestamptz not null default now()
);

alter table public.schools enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.class_students enable row level security;
alter table public.assessment_launches enable row level security;
alter table public.assessment_responses enable row level security;
alter table public.lesson_submissions enable row level security;
alter table public.strategy_library enable row level security;

create policy "Teachers read own profile"
  on public.teacher_profiles for select
  using (id = auth.uid());

create policy "Teachers update own profile"
  on public.teacher_profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Teachers manage own classes"
  on public.classes for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy "Teachers manage own assessment launches"
  on public.assessment_launches for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy "Teachers manage own lesson submissions"
  on public.lesson_submissions for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy "Authenticated users can read strategy library"
  on public.strategy_library for select
  using (auth.role() = 'authenticated');

create index lesson_submissions_teacher_created_idx
  on public.lesson_submissions (teacher_id, created_at desc);

create index assessment_launches_teacher_created_idx
  on public.assessment_launches (teacher_id, created_at desc);

create index assessment_responses_created_idx
  on public.assessment_responses (created_at desc);
