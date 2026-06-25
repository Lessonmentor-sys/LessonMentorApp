# Lesson Mentor — Preview Site

Static preview build deployed via Cloudflare Pages at lessonmentor.app.

- `/` — landing page linking to all sections below
- `/student/` — student assessment flow mockup
- `/teacher/` — teacher dashboard mockup
- `/admin/` — admin panel mockup
- `/questions/` — question bank review grid
- `/engine-demo/` — live question-selection engine test harness
- `/engine/` — backend utilities (schema, selection logic, tests, deployment
  docs). NOT served by the site — kept here for version control alongside
  the preview pages. See `/engine/README.md` and `/engine/DEPLOYMENT.md`.

`_headers` sets `noindex` on every page since this is a preview build, not
the real app — remove that file when the real site is ready to be public/indexed.

No build step. Cloudflare Pages can serve this directory as-is.
