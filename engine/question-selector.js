// Lesson Mentor — Question Selection Engine
// Pure functions only: no DOM, no storage, no network. The pool of
// candidate questions and the student's prior-answer history are both
// passed in by the caller — in production those come from a Supabase
// query and a `student_question_history` table respectively. That
// separation is intentional: this file should never hardcode question
// content, only the *rule* for picking from whatever pool it's given.

/**
 * How many questions an assessment shows per grade band.
 * K-2 draws 10 two-choice questions from the available modality-pair
 * bank. 3-5 and 6-12 draw 10 from their pools; forced-rank items now
 * score all 6 learning profile categories per question.
 */
export const ASSESSMENT_SIZE = {
  "K-2": 10,
  "3-5": 10,
  "6-12": 10,
};

const ALL_PAIRS = ["A-I", "A-K", "A-R", "A-S", "A-V", "I-K", "I-R", "I-S", "I-V", "K-R", "K-S", "K-V", "R-S", "R-V", "S-V"]; // sorted pair keys, fixed set of 15

/**
 * Deterministic-shape, non-deterministic-order shuffle (Fisher-Yates).
 * Exported mainly so tests can stub Math.random if ever needed.
 */
export function shuffle(array, rng = Math.random) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Draws `count` ids from `idPool` using a persisted shuffle-bag.
 * bagState shape: { order: string[], cursor: number } | undefined
 * Returns { drawnIds, bagState } — bagState must be saved by the caller
 * (e.g. written back to the student's history row) and passed back in
 * on the next call for this same bag.
 *
 * Guarantee: no id repeats until every id in idPool has been drawn at
 * least once. If `count` is larger than idPool.length, every id is
 * returned once and the bag simply starts a fresh cycle for the
 * remainder (only relevant if a pool ever gets smaller than the
 * assessment size — shouldn't happen at current pool sizes).
 */
export function drawFromBag(idPool, count, bagState, rng = Math.random) {
  let { order, cursor, lastDrawnId } = bagState || {};
  if (!order || order.length !== idPool.length || !order.every(id => idPool.includes(id))) {
    // pool changed shape (e.g. questions added/retired) — reshuffle clean
    order = shuffle(idPool, rng);
    cursor = 0;
  }
  const drawn = [];
  for (let n = 0; n < count; n++) {
    if (cursor >= order.length) {
      order = reshuffleAvoidingBoundaryRepeat(idPool, lastDrawnId, rng);
      cursor = 0;
    }
    const id = order[cursor];
    drawn.push(id);
    lastDrawnId = id;
    cursor += 1;
  }
  return { drawnIds: drawn, bagState: { order, cursor, lastDrawnId } };
}

/**
 * Reshuffles idPool, then — if the new order happens to start with the
 * same id that was just drawn at the end of the previous cycle — swaps
 * it out of first position. Without this, a plain shuffle-bag can
 * legitimately place the same question back-to-back across a cycle
 * boundary (last draw of cycle N == first draw of cycle N+1), which
 * would violate "never the same question twice in a row."
 */
function reshuffleAvoidingBoundaryRepeat(idPool, lastDrawnId, rng) {
  const order = shuffle(idPool, rng);
  if (order.length > 1 && order[0] === lastDrawnId) {
    const swapIndex = 1 + Math.floor(rng() * (order.length - 1));
    [order[0], order[swapIndex]] = [order[swapIndex], order[0]];
  }
  return order;
}

/**
 * K-2 selection: groups the pool by modality pair, randomly selects
 * the assessment's pair set, then draws one question from each selected
 * pair using that pair's own shuffle-bag.
 *
 * history.pairCycleBag shape: bagState over pair keys
 * history.pairBags shape: { "A-K": bagState, "A-R": bagState, ... }
 */
function selectK2(pool, history, rng) {
  const byPair = {};
  for (const row of pool) {
    if (!byPair[row.pair]) byPair[row.pair] = [];
    byPair[row.pair].push(row.id);
  }
  const missing = ALL_PAIRS.filter(p => !byPair[p] || byPair[p].length === 0);
  if (missing.length) {
    throw new Error(`K-2 pool is missing question coverage for pair(s): ${missing.join(", ")}`);
  }

  const pairBags = { ...(history?.pairBags || {}) };
  const { drawnIds: selectedPairs, bagState: pairCycleBag } = drawFromBag(ALL_PAIRS, ASSESSMENT_SIZE["K-2"], history?.pairCycleBag, rng);
  const selectedIds = [];
  for (const pair of selectedPairs) {
    const { drawnIds, bagState } = drawFromBag(byPair[pair], 1, pairBags[pair], rng);
    selectedIds.push(drawnIds[0]);
    pairBags[pair] = bagState;
  }

  const byId = Object.fromEntries(pool.map(r => [r.id, r]));
  return {
    selected: selectedIds.map(id => byId[id]),
    updatedHistory: { ...history, pairCycleBag, pairBags },
  };
}

/**
 * 3-5 / 6-12 selection: single shuffle-bag across the whole pool,
 * draw ASSESSMENT_SIZE[gradeBand] questions.
 * history.bag shape: bagState
 */
function selectFlatPool(pool, gradeBand, history, rng) {
  const ids = pool.map(r => r.id);
  const { drawnIds, bagState } = drawFromBag(ids, ASSESSMENT_SIZE[gradeBand], history?.bag, rng);
  const byId = Object.fromEntries(pool.map(r => [r.id, r]));
  return {
    selected: drawnIds.map(id => byId[id]),
    updatedHistory: { ...history, bag: bagState },
  };
}

/**
 * Main entry point.
 *
 * @param {Array} pool - question rows for this grade band, from
 *   getPoolForGradeBand() or (in production) a Supabase query.
 * @param {"K-2"|"3-5"|"6-12"} gradeBand
 * @param {object} [history] - this student's persisted selection state
 *   for this grade band. Pass `undefined`/`{}` for a brand-new student.
 *   Whatever this function returns as `updatedHistory` is what the
 *   caller should save back (e.g. upsert into Supabase) for next time.
 * @param {function} [rng] - injectable RNG, defaults to Math.random.
 *   Tests pass a seeded RNG; production code should never need to.
 * @returns {{ selected: object[], updatedHistory: object }}
 */
export function selectAssessmentQuestions(pool, gradeBand, history = {}, rng = Math.random) {
  if (!Array.isArray(pool) || pool.length === 0) {
    throw new Error("selectAssessmentQuestions: pool must be a non-empty array");
  }
  if (gradeBand === "K-2") return selectK2(pool, history, rng);
  if (gradeBand === "3-5" || gradeBand === "6-12") return selectFlatPool(pool, gradeBand, history, rng);
  throw new Error(`Unknown grade band: ${gradeBand}`);
}

/**
 * Convenience check used by the modality-coverage self-test and
 * available to the UI layer if it wants to display "coverage" info.
 * Returns a count per modality code across a set of selected rows.
 */
export function modalityCoverage(selectedRows) {
  const counts = { V: 0, A: 0, R: 0, K: 0, I: 0, S: 0 };
  for (const row of selectedRows) {
    for (const [mod] of row.opts) counts[mod] += 1;
  }
  return counts;
}
