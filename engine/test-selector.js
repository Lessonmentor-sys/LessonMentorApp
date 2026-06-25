import assert from "node:assert/strict";
import { K2_POOL, G35_POOL, G612_POOL } from "./question-bank-data.js";
import { selectAssessmentQuestions, modalityCoverage, ASSESSMENT_SIZE } from "./question-selector.js";

let passed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok  - ${name}`);
  } catch (e) {
    console.error(`FAIL - ${name}`);
    console.error("      " + e.message);
    process.exitCode = 1;
  }
}

console.log("== K-2: single draw shape ==");
check("returns exactly 6 questions", () => {
  const { selected } = selectAssessmentQuestions(K2_POOL, "K-2");
  assert.equal(selected.length, 6);
});
check("covers all 6 modality pairs exactly once", () => {
  const { selected } = selectAssessmentQuestions(K2_POOL, "K-2");
  const pairs = selected.map(r => r.pair).sort();
  assert.deepEqual(pairs, ["A-K", "A-R", "A-V", "K-R", "K-V", "R-V"].sort());
});
check("modality coverage is perfectly balanced (3 each)", () => {
  const { selected } = selectAssessmentQuestions(K2_POOL, "K-2");
  const counts = modalityCoverage(selected);
  assert.deepEqual(counts, { V: 3, A: 3, R: 3, K: 3 });
});

console.log("== 3-5 / 6-12: single draw shape ==");
for (const [label, pool] of [["3-5", G35_POOL], ["6-12", G612_POOL]]) {
  check(`${label} returns exactly ${ASSESSMENT_SIZE[label]} unique questions`, () => {
    const { selected } = selectAssessmentQuestions(pool, label);
    assert.equal(selected.length, ASSESSMENT_SIZE[label]);
    assert.equal(new Set(selected.map(r => r.id)).size, selected.length);
  });
  check(`${label} every drawn question already covers all 4 modalities`, () => {
    const { selected } = selectAssessmentQuestions(pool, label);
    for (const row of selected) {
      const mods = row.opts.map(([m]) => m).sort();
      assert.deepEqual(mods, ["A", "K", "R", "V"]);
    }
  });
}

console.log("== No-repeat-until-exhausted, across many consecutive assessments ==");
check("K-2: each pair's own cycle is fully unique, and no pair ever repeats back-to-back", () => {
  let history = {};
  const seenPerPair = {};
  const NUM_ROUNDS = 12; // run several full cycles for every pair (smallest pair has 3 variants)
  for (let round = 0; round < NUM_ROUNDS; round++) {
    const { selected, updatedHistory } = selectAssessmentQuestions(K2_POOL, "K-2", history);
    history = updatedHistory;
    for (const row of selected) {
      (seenPerPair[row.pair] ||= []).push(row.id);
    }
  }
  const byPair = {};
  for (const row of K2_POOL) { (byPair[row.pair] ||= []).push(row.id); }

  for (const pair of Object.keys(seenPerPair)) {
    const cycleLen = byPair[pair].length;
    const seq = seenPerPair[pair];

    // Invariant 1: every cycle-aligned chunk (positions [0:n], [n:2n], ...)
    // contains each id in the pool exactly once.
    for (let start = 0; start + cycleLen <= seq.length; start += cycleLen) {
      const chunk = seq.slice(start, start + cycleLen);
      assert.equal(new Set(chunk).size, cycleLen,
        `pair ${pair} cycle starting at draw ${start} was not fully unique: ${chunk.join(",")}`);
    }

    // Invariant 2: no question is ever shown twice in a row, including
    // across a cycle boundary.
    for (let i = 0; i + 1 < seq.length; i++) {
      assert.notEqual(seq[i], seq[i + 1],
        `pair ${pair} repeated back-to-back at draw ${i}: ${seq[i]}`);
    }
  }
});

for (const [label, pool] of [["3-5", G35_POOL], ["6-12", G612_POOL]]) {
  check(`${label}: each full 12-question cycle is unique, and no question repeats back-to-back`, () => {
    let history = {};
    const seq = [];
    for (let round = 0; round < 6; round++) {
      const { selected, updatedHistory } = selectAssessmentQuestions(pool, label, history);
      history = updatedHistory;
      seq.push(...selected.map(r => r.id));
    }
    const cycleLen = pool.length; // 12

    // Invariant 1: cycle-aligned chunks are fully unique. Draws happen
    // ASSESSMENT_SIZE at a time (8), so cycle boundaries fall mid-round;
    // checking the flat draw sequence (not per-round) is what matters.
    for (let start = 0; start + cycleLen <= seq.length; start += cycleLen) {
      const chunk = seq.slice(start, start + cycleLen);
      assert.equal(new Set(chunk).size, cycleLen,
        `cycle starting at draw ${start} was not fully unique`);
    }

    // Invariant 2: no back-to-back repeat, even across a reshuffle
    // boundary that falls in the middle of a round.
    for (let i = 0; i + 1 < seq.length; i++) {
      assert.notEqual(seq[i], seq[i + 1], `repeated back-to-back at draw ${i}: ${seq[i]}`);
    }
  });
}

check("history persists across calls: cursor advances rather than resetting each call", () => {
  // pool=12, draw=8 each call. Call 1 from empty history should land
  // the cursor at 8. Call 2 should consume the remaining 4, then
  // reshuffle and consume 4 more from the new cycle -> cursor lands at 4.
  const { updatedHistory: h1 } = selectAssessmentQuestions(G612_POOL, "6-12", {});
  assert.equal(h1.bag.cursor, 8, "first call should leave cursor at 8 of 12");
  const { updatedHistory: h2 } = selectAssessmentQuestions(G612_POOL, "6-12", h1);
  assert.equal(h2.bag.cursor, 4, "second call should wrap and leave cursor at 4 into the new cycle");
});

check("missing pair coverage in a malformed pool throws clearly", () => {
  const broken = K2_POOL.filter(r => r.pair !== "A-K"); // remove a whole pair
  assert.throws(() => selectAssessmentQuestions(broken, "K-2"), /missing question coverage/);
});

console.log(`\n${passed} checks passed.`);
