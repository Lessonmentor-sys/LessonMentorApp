-- ============================================================
-- Lesson Mentor — Minimal students table (placeholder)
-- ============================================================
-- This is intentionally minimal. The full students/teachers/admin
-- data model (roster sync, period-based teacher assignment, max-10
-- teacher cap, etc.) from the admin panel mockup is NOT designed yet
-- — this stub exists only to satisfy the foreign keys in schema.sql
-- so the question-bank tables can be deployed and tested on their own.
-- Expect to revisit/extend this table once the admin panel's data
-- model gets its own design pass.
--
-- FERPA note: kept consistent with the earlier decision to never let
-- legal name live anywhere outside an admin-only table. display_name
-- is what teachers ever see (e.g. "Jordan T." or just the student ID).

create table if not exists students (
  id          uuid primary key default gen_random_uuid(),
  grade_band  text not null check (grade_band in ('K-2','3-5','6-12')),
  display_name text,            -- never the legal name
  school_id   uuid,             -- FK to a future schools table, not built yet
  created_at  timestamptz not null default now()
);

create table if not exists students_pii (
  student_id      uuid primary key references students(id) on delete cascade,
  legal_first_name text,
  legal_last_name  text,
  date_of_birth    date,
  created_at       timestamptz not null default now()
);

alter table students enable row level security;
alter table students_pii enable row level security;

-- Placeholder policies — will need real teacher/period-based logic once
-- the admin panel's data model is built. For now: admin-only.
create policy "students_admin_all" on students
  for all using (auth.email() = 'support@euc2.org');
create policy "students_pii_admin_only" on students_pii
  for all using (auth.email() = 'support@euc2.org');
