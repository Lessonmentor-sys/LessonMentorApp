-- ============================================================
-- Lesson Mentor — Question Bank & Assessment Schema (v1)
-- Run this in the Supabase SQL editor, in order, on a fresh project
-- (or a new schema if you want to keep it isolated, same pattern as
-- Ready to Defend's `rtd` schema).
-- ============================================================

-- ---------- 1. Question bank (replaces question-bank-data.js) ----------

create table if not exists question_bank (
  id            text primary key,        -- e.g. 'k2-01', 'g35-09', 'g612-12'
  grade_band    text not null check (grade_band in ('K-2','3-5','6-12')),
  question_text text not null,
  modality_pair text,                    -- K-2 only, e.g. 'A-K'; NULL for 3-5/6-12
  active        boolean not null default true,
  sort_order    int,
  created_at    timestamptz not null default now()
);

create table if not exists question_options (
  id            uuid primary key default gen_random_uuid(),
  question_id   text not null references question_bank(id) on delete cascade,
  modality_code text not null check (modality_code in ('V','A','R','K')),
  option_text   text not null,
  sort_order    int not null
);

create index if not exists idx_question_options_question_id on question_options(question_id);
create index if not exists idx_question_bank_grade_band on question_bank(grade_band);
create index if not exists idx_question_bank_active on question_bank(active);

-- A question must have exactly 2 options (K-2) or exactly 4 (3-5/6-12).
-- Enforced at the application layer when adding questions through the
-- admin panel; this view makes it easy to audit the data directly.
create or replace view question_bank_option_counts as
  select qb.id, qb.grade_band, count(qo.id) as option_count
  from question_bank qb
  left join question_options qo on qo.question_id = qb.id
  group by qb.id, qb.grade_band;

-- ---------- 2. Per-student shuffle-bag state ----------
-- One row per (student, grade band, bag). For K-2, bag_key is the
-- modality pair (e.g. 'A-K') — 6 rows per student. For 3-5/6-12,
-- bag_key is always 'ALL' — 1 row per student per grade band.
-- This is exactly the `history` object the selection engine
-- (question-selector.js) reads and writes; the engine itself never
-- needs to know it's backed by Postgres.

create table if not exists student_question_bags (
  student_id    uuid not null references students(id) on delete cascade,
  grade_band    text not null check (grade_band in ('K-2','3-5','6-12')),
  bag_key       text not null,           -- modality pair for K-2, 'ALL' otherwise
  bag_order     text[] not null,         -- shuffled question ids for this cycle
  cursor        int not null default 0,
  last_drawn_id text,
  updated_at    timestamptz not null default now(),
  primary key (student_id, grade_band, bag_key)
);

-- ---------- 3. Administered assessments ----------
-- Captures exactly which questions were shown and (on submission) the
-- raw answers plus the computed V/A/R/K result. This is what the
-- "results" screen and the teacher/admin views read from — never the
-- question_bank directly.

create table if not exists assessments (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null references students(id) on delete cascade,
  grade_band      text not null check (grade_band in ('K-2','3-5','6-12')),
  season          text not null check (season in ('fall_baseline','winter_update','spring_update','rebaseline')),
  question_ids    text[] not null,
  answers         jsonb,                 -- { "g35-04": ["V","K","A","R"], "k2-03": "K", ... }
  result_v        numeric,
  result_a        numeric,
  result_r        numeric,
  result_k        numeric,
  primary_style   text,                  -- denormalized for fast roster queries
  secondary_style  text,
  administered_at timestamptz not null default now(),
  completed_at    timestamptz
);

create index if not exists idx_assessments_student on assessments(student_id);
create index if not exists idx_assessments_grade_band on assessments(grade_band);

-- ---------- 4. Row-level security ----------
-- Question bank is global content: anyone authenticated can read it,
-- only the admin account can write to it (same ownership pattern as
-- RankKeeper's global kata library — support@euc2.org owns the global
-- set; a per-school custom library is a v2 feature, not built yet).

alter table question_bank enable row level security;
alter table question_options enable row level security;
alter table student_question_bags enable row level security;
alter table assessments enable row level security;

create policy "question_bank_read_all" on question_bank
  for select using (true);
create policy "question_bank_admin_write" on question_bank
  for all using (auth.email() = 'support@euc2.org');

create policy "question_options_read_all" on question_options
  for select using (true);
create policy "question_options_admin_write" on question_options
  for all using (auth.email() = 'support@euc2.org');

-- A student's own bag/assessment rows are theirs alone. Teacher and
-- admin access to assessment *results* should go through a
-- security-definer function (e.g. get_class_learning_profile(class_id))
-- rather than direct table grants — keeps PII/result access auditable
-- and matches the "teachers never see raw PII" architecture decided
-- earlier for the student/teacher/admin portals.

create policy "own_bag" on student_question_bags
  for all using (auth.uid() = student_id);
create policy "own_assessment" on assessments
  for all using (auth.uid() = student_id);

-- ---------- 5. Seed data ----------
-- See seed_data.sql (generated from question-bank-data.js — regenerate
-- it rather than hand-editing if the question pools change).
