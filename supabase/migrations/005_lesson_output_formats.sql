alter table public.lesson_submissions
  add column if not exists uploaded_files jsonb not null default '[]'::jsonb,
  add column if not exists output_template text not null default 'Lesson Mentor Signature Template',
  add column if not exists output_formats text[] not null default array['pdf', 'docx'];
