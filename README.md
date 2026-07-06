# Lesson Mentor Live Starter

This folder is the first deployable version of Lesson Mentor.

It keeps the current prototype working in the browser, then adds the structure needed for GitHub and Supabase:

- Static frontend that can deploy to GitHub Pages
- Supabase browser adapter with demo-mode fallback
- Supabase database migrations
- Edge Function placeholders for lesson generation, schedule parsing, and document cleanup
- Preserved question-selection engine in `engine/`
- No protected organizer/template files committed to the public app

## What Runs Today

Open `index.html` locally or deploy the folder to GitHub Pages. The app runs in demo mode until `config.js` is filled with Supabase project values.

Demo mode stores new lesson submissions and assessment launches in the browser's local storage. This lets the UI work before authentication and database policies are finished.

## Configure Supabase

Copy `config.example.js` into `config.js`, then replace the values:

```js
window.LESSONMENTOR_CONFIG = {
  supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY",
  demoMode: false
};
```

The anon key is safe to use in the browser. Do not put service-role keys in this file.

## Database

For a brand-new Supabase project, run the migrations in `supabase/migrations` inside your Supabase SQL editor or with the Supabase CLI:

1. `001_initial_schema.sql`
2. `002_seed_strategy_library.sql`

For the current Lesson Mentor Supabase project that already has assessment-engine tables, do not run `001_initial_schema.sql`. Run:

1. `003_existing_supabase_merge.sql`
2. `002_seed_strategy_library.sql`

The schema turns on row-level security. Real saving will need authentication connected so records can belong to the signed-in teacher.

## Assessment Engine

The `engine/` folder preserves the earlier question-selection engine from the existing LessonMentorApp package. It includes:

- 44-question assessment pool
- Shuffle-bag selection logic
- No-repeat-until-exhausted behavior
- K-2 modality-pair balancing
- Tests in `engine/test-selector.js`

Keep this folder in the repo. It should be wired into the live assessment launch flow during the next build.

## Edge Functions

The function folders are ready for Supabase deployment:

- `generate-lesson`
- `parse-schedule`
- `cleanup-documents`

They are placeholders for now. The next build will connect OpenAI, document parsing, protected organizer storage, and the final lesson-plan template generator.

## GitHub Pages

Commit the contents of this folder as the repository root. Then enable GitHub Pages from the repository settings.

The included `CNAME` file points to:

```text
lessonmentor.app
```

Only connect DNS when you are ready for the domain to resolve to GitHub Pages.

## Protected Assets

Jennifer's templates and organizer files should stay out of the public frontend repository. Store them later in private Supabase Storage buckets or a protected backend service.
