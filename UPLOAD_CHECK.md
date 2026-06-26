# Before Uploading

Use this `lessonmentor-live` folder as the GitHub upload source.

Do not upload `LessonMentorApp-main.zip` by itself as the final app, because it is an older preview package. It contains useful assessment-engine work, but it does not include the latest Lesson Mentor dashboard updates or Supabase live-starter structure.

What was preserved from the older package:

- `engine/question-bank-data.js`
- `engine/question-selector.js`
- `engine/test-selector.js`
- `engine/question-selector-demo.html`
- `engine/01_schema.sql`
- `engine/02_seed_data.sql`
- engine deployment/readme docs

What this package adds beyond the older zip:

- latest teacher dashboard mockup
- one-line Student Profiles rows
- Launch Assessment tab
- simplified latest generated lesson row
- Supabase browser adapter
- Supabase migrations
- Edge Function placeholders
- GitHub Pages files
- `lessonmentor.app` CNAME

Upload recommendation:

1. Upload/commit the contents of `lessonmentor-live`.
2. Keep the older zip as an archive/reference only.
3. Do not run both schema sets in Supabase until we decide how to merge the assessment-engine tables into the main app schema.
