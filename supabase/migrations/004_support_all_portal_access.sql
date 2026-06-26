-- ============================================================
-- Lesson Mentor — Support Account Portal Access
--
-- Before running:
-- 1. Go to Supabase > Authentication > Users.
-- 2. Create support@euc2.org with the password you chose.
-- 3. Then run this SQL.
--
-- This grants the support account access to:
-- teacher, student-demo, school-admin, and owner-admin portals.
-- ============================================================

create table if not exists public.portal_access (
  user_id uuid not null references auth.users(id) on delete cascade,
  portal text not null check (portal in ('teacher', 'student', 'school_admin', 'owner_admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, portal)
);

alter table public.portal_access enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'portal_access'
      and policyname = 'Users can read own portal access'
  ) then
    create policy "Users can read own portal access"
      on public.portal_access for select
      using (user_id = auth.uid());
  end if;
end $$;

insert into public.teacher_profiles (id, display_name, role)
select id, 'Lesson Mentor Support', 'owner_admin'
from auth.users
where email = 'support@euc2.org'
on conflict (id) do update
set display_name = excluded.display_name,
    role = excluded.role;

insert into public.portal_access (user_id, portal)
select id, portal
from auth.users
cross join (
  values
    ('teacher'),
    ('student'),
    ('school_admin'),
    ('owner_admin')
) as portals(portal)
where email = 'support@euc2.org'
on conflict do nothing;

-- Quick verification:
-- select u.email, p.portal
-- from public.portal_access p
-- join auth.users u on u.id = p.user_id
-- where u.email = 'support@euc2.org'
-- order by p.portal;
