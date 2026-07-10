# Deployment Checklist

## 1. GitHub

1. Create a new GitHub repository.
2. Use the contents of this folder as the repository root.
3. Commit and push:

```bash
git init
git add .
git commit -m "Initial Lesson Mentor live starter"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

4. In GitHub, open repository settings.
5. Go to Pages.
6. Deploy from `main` branch, root folder.

## 2. Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. If this is a brand-new Supabase project, run `supabase/migrations/001_initial_schema.sql`.
4. If this is the current project that already has `students`, `assessments`, and `question_bank`, run `supabase/migrations/003_existing_supabase_merge.sql` instead.
5. Run `supabase/migrations/002_seed_strategy_library.sql`.
6. Copy the project URL and anon public key.
7. Update `config.js`.

## 3. Auth

Before using real student/class data, connect teacher sign-in.

Recommended first pass:

- Email/password auth for teacher accounts
- Admin-created teacher profiles
- Row-level policies based on `auth.uid()`

## 4. Domain

When GitHub Pages works:

1. Keep `CNAME` set to `lessonmentor.app`.
2. Add the DNS records GitHub shows for the custom domain.
3. Enable HTTPS in GitHub Pages after DNS verifies.

## 5. Next Build Items

- Teacher authentication
- Real class roster setup
- Assessment launch links/codes
- Student assessment submission saving
- Official Common Core and NGSS database
- AI lesson rewrite Edge Function
- Private organizer/template storage
- Real DOCX/PDF generation
- Sunday cleanup job for 15-day document access
