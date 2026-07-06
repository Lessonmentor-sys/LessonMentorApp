import { writeFileSync } from "node:fs";
import { G35_POOL, G612_POOL, K2_POOL } from "./question-bank-data.js";

const esc = value => String(value).replaceAll("'", "''");

let sql = `-- ============================================================
-- Lesson Mentor: Question Bank seed data
-- Generated from question-bank-data.js — DO NOT hand-edit;
-- regenerate this file if the source pools change.
-- ============================================================

`;

for (const pool of [K2_POOL, G35_POOL, G612_POOL]) {
  for (const row of pool) {
    const pair = row.pair ? `'${esc(row.pair)}'` : "NULL";
    const prefix = row.id.startsWith("k2") ? 0 : row.id.startsWith("g35") ? 1000 : 2000;
    const sortOrder = prefix + Number(row.id.split("-")[1]);
    sql += `INSERT INTO question_bank (id, grade_band, question_text, modality_pair, sort_order) VALUES ('${esc(row.id)}', '${esc(row.grade)}', '${esc(row.q)}', ${pair}, ${sortOrder});\n`;
    row.opts.forEach(([modality, text], index) => {
      sql += `INSERT INTO question_options (question_id, modality_code, option_text, sort_order) VALUES ('${esc(row.id)}', '${esc(modality)}', '${esc(text)}', ${index + 1});\n`;
    });
  }
  sql += "\n";
}

writeFileSync(new URL("./02_seed_data.sql", import.meta.url), sql);
