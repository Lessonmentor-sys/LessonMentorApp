# Lesson Mentor — Question Bank Deployment Guide

**Domain:** lessonmentor.app

This deploys exactly what was tested locally: `00_students_stub.sql` →
`01_schema.sql` → `02_seed_data.sql`, in that order. That sequence was
just verified against a clean Postgres 16 database — schema applies,
seed data loads (44 questions / 136 options), all 6 RLS-policy tables
present, and invalid data (bad grade_band, bad modality code) gets
rejected by the check constraints.

## 1. Create the Supabase project

You've got separate Supabase projects per app already (RankKeeper,
Ready to Defend's `nhvcnpcdfuhmlpovkogk`) — same pattern here:

1. supabase.com → New Project
2. Name it something like `lessonmentor` (or `lessonmentor-dev` if you
   want a separate one later for production)
3. Pick a region close to where most students/schools will be
4. Save the project URL and the `anon` / `service_role` keys somewhere
   safe (Supabase → Project Settings → API) — you'll need these for the
   eventual React app, not for this SQL step

## 2. Run the SQL, in order

Supabase Dashboard → SQL Editor → New Query. Run these as **three
separate queries, in this exact order** (don't paste them all into one
box — run, confirm success, then move to the next):

1. `00_students_stub.sql` — creates a minimal `students` /
   `students_pii` table pair. This is a placeholder (see the note at
   the top of that file) — the real admin-panel data model isn't
   designed yet, this just unblocks the foreign keys below.
2. `01_schema.sql` — creates `question_bank`, `question_options`,
   `student_question_bags`, `assessments`, and all RLS policies.
3. `02_seed_data.sql` — inserts the 44 questions + their options. This
   one's long (180+ INSERT statements) — give it a few seconds.

Unlike the local test, you do **not** need to stub out `auth.uid()` or
`auth.email()` — those are real functions in Supabase already. The
`auth.email()`-based admin policies will work as soon as you've signed
in as `support@euc2.org` through Supabase Auth.

## 3. Verify

Supabase Dashboard → Table Editor, or run these in the SQL Editor:

```sql
-- expect 20 / 12 / 12
select grade_band, count(*) from question_bank group by grade_band;

-- expect 136
select count(*) from question_options;

-- expect 10/10/10/10
select qo.modality_code, count(*)
from question_options qo
join question_bank qb on qb.id = qo.question_id
where qb.grade_band = 'K-2'
group by qo.modality_code;

-- expect 6 rows, one per table
select tablename, count(*) from pg_policies
where schemaname = 'public' group by tablename;
```

## 4. What's still missing before this is "live"

- **The Edge Function.** `question-selector.js` is pure logic — nothing
  has wired it to actually run against these tables yet (read
  `student_question_bags`, call the selector, write the result back).
  That's a separate build step, not done here.
- **The real students table.** `00_students_stub.sql` is intentionally
  bare. Once the admin panel's data model (roster, period-based teacher
  assignment, the max-10-teacher cap) gets designed, this stub needs to
  be replaced or extended — don't build product features against it
  assuming it's final.
- **Scoring math.** `assessments.answers` is just a jsonb blob right
  now; nothing converts it into `result_v/a/r/k` yet. Still an open
  design question from a few steps back.

## Rollback

If you need to wipe this and start over (e.g. testing went wrong):

```sql
drop table if exists assessments cascade;
drop table if exists student_question_bags cascade;
drop table if exists question_options cascade;
drop table if exists question_bank cascade;
drop view if exists question_bank_option_counts;
drop table if exists students_pii cascade;
drop table if exists students cascade;
```
Then re-run steps 00 → 01 → 02 from scratch.
