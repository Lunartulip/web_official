import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), "data", "authority", "calls_kpi_summary.json");
const ledger = JSON.parse(await readFile(file, "utf8"));
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

assert.equal(
  ledger.source,
  "workspace/ai-team/shared/state/scorecard/calls_ledger.csv + calls_outcomes.csv",
  "authority snapshot source changed",
);
assert.equal(ledger.generator, "scripts/calls_kpi_summary.py", "authority snapshot generator changed");
assert.match(ledger.generated_at, datePattern, "invalid generated_at");
assert.match(ledger.as_of, datePattern, "invalid as_of");
assert.match(ledger.first_call_date, datePattern, "invalid first_call_date");
assert.ok(ledger.generated_at >= ledger.as_of, "snapshot was generated before its as-of date");
assert.ok(ledger.as_of >= ledger.first_call_date, "snapshot as-of predates the first call");
assert.ok(ledger.evidence_link_rate >= 0 && ledger.evidence_link_rate <= 1, "invalid evidence-link rate");

for (const [name, cohort] of Object.entries(ledger.cohorts)) {
  assert.equal(
    cohort.total_calls,
    cohort.settled + cohort.tracking + cohort.pending_director_judgment,
    `${name}: total_calls does not reconcile`,
  );
  assert.ok(cohort.invalidated <= cohort.settled, `${name}: invalidated exceeds settled`);

  for (const benchmarkName of ["universe_ew", "csi500"]) {
    const benchmark = cohort[benchmarkName];
    assert.equal(
      benchmark.settled,
      benchmark.hit + benchmark.miss + benchmark.flat,
      `${name}.${benchmarkName}: settled outcomes do not reconcile`,
    );

    const directionalDenominator = benchmark.hit + benchmark.miss;
    const expectedHitRate = directionalDenominator === 0 ? null : benchmark.hit / directionalDenominator;
    if (expectedHitRate === null) {
      assert.equal(benchmark.hit_rate, null, `${name}.${benchmarkName}: empty hit rate must be null`);
    } else {
      assert.ok(
        Math.abs(benchmark.hit_rate - expectedHitRate) < 0.0001,
        `${name}.${benchmarkName}: hit rate does not recalculate`,
      );
    }

    if (benchmark.win_mean !== null && benchmark.loss_mean !== null) {
      const expectedPayoff = Math.abs(benchmark.win_mean / benchmark.loss_mean);
      assert.ok(
        Math.abs(benchmark.win_loss_ratio_hm_only - expectedPayoff) < 0.01,
        `${name}.${benchmarkName}: hit/miss payoff ratio does not recalculate`,
      );
    }
  }
}

let previousWeek = "";
for (const point of ledger.hit_rate_curve) {
  assert.match(point.week_start, datePattern, "invalid hit-rate curve date");
  assert.ok(point.week_start >= previousWeek, "hit-rate curve is not chronological");
  assert.ok(point.week_start <= ledger.as_of, "hit-rate curve extends beyond snapshot as-of");
  // 2026-09-01: curve is a rolling 30-day window per week (calls_kpi_summary.py
  // _hit_rate_curve), so settled_count may legitimately decrease as old
  // settlements roll out of the window; monotonic assertion removed.
  assert.ok(point.settled_count >= 0, "settled curve count is negative");
  previousWeek = point.week_start;
}

console.log(
  `Validated authority snapshot as of ${ledger.as_of}: ${ledger.cohorts.backfill.total_calls} backfill and ${ledger.cohorts.desk_discipline.total_calls} discipline calls.`,
);
