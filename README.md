# Lesson Mentor — Question Selection Engine

**Domain:** lessonmentor.app

## Files
- `schema.sql` — the real Postgres/Supabase tables: `question_bank`,
  `question_options`, `student_question_bags` (the persisted `history`
  the selector reads/writes), and `assessments`. Includes RLS policies.
  **Verified by actually running it against a live Postgres 16 instance**
  — schema applies cleanly, seed data loads, FK/check constraints reject
  bad data correctly (wrong grade_band, invalid modality code both
  tested and confirmed rejected).
- `seed_data.sql` — INSERT statements for all 44 questions, generated
  directly from `question-bank-data.js` (not hand-typed, so it can't
  drift from the JS source — regenerate rather than hand-edit if the
  pools change).
- `question-bank-data.js` — the question pools (K-2, 3-5, 6-12). Today
  this is the in-memory stand-in for `schema.sql`'s tables; once the
  Edge Function is wired up, this file's job is done and the selector
  should query Postgres directly instead.
- `question-selector.js` — the actual selection logic. Pure functions,
  no DOM/storage/network. Takes a pool + a student's persisted history,
  returns the selected questions + updated history to save back.
- `test-selector.js` — behavioral tests (run with `npm test` or
  `node test-selector.js`). Verifies modality coverage, pair coverage,
  and the no-repeat-until-exhausted / no-back-to-back-repeat guarantees.
- `question-selector-demo.html` — open directly in a browser. Lets you
  run real assessments, switch grade bands, and watch the exposure
  counts / history build up. Same logic as the two .js files above,
  inlined so it works with no build step.

## How selection works
- **K-2**: every question tests exactly 2 of the 4 modalities. There are
  exactly 6 possible pairs (V-A, V-R, V-K, A-R, A-K, R-K). Each assessment
  draws **one question per pair**, so every assessment always covers all
  four modalities exactly 3 times each — guaranteed by construction, not
  by chance.
- **Grades 3-5 / 6-12**: every question is a 4-option forced-rank item
  that already scores all four modalities at once. Each assessment draws
  8 of the 12 pool questions.
- **No repeats**: each pool (or, for K-2, each pair's sub-pool) uses a
  shuffle-bag — shuffle once, deal one at a time, reshuffle only once
  every item has been used. A question never repeats until the whole
  pool has been shown, and it's also guaranteed to never repeat
  back-to-back across a reshuffle boundary.

## Wiring this into the real app
`history` is the only piece of state that needs to persist per student
per grade band — everything else is a pure function of `(pool, gradeBand,
history)`. In production, against `schema.sql`:
1. On assessment start, `select * from student_question_bags where
   student_id = $1 and grade_band = $2` and reshape into the `history`
   object the engine expects (one row per K-2 pair, or one `'ALL'` row
   for 3-5/6-12).
2. `select ... from question_bank join question_options ...` for that
   grade band instead of importing question-bank-data.js.
3. Call `selectAssessmentQuestions(pool, gradeBand, history)`.
4. Show `selected` to the student; insert a row into `assessments` with
   the question_ids shown.
5. Upsert `updatedHistory` back into `student_question_bags`.

## Known limitation to flag for spec docs
The "no back-to-back repeat" guarantee only protects against the *exact
same question* appearing twice in a row. It does not currently weight
selection by how long ago a question was last seen beyond its own
pool/pair — that's a reasonable v2 enhancement if pools grow much larger
than today's 12-20 items.
