import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "content", "research-objects", "catalog.json");
const objects = JSON.parse(await readFile(catalogPath, "utf8"));
const locales = ["zh-CN", "en"];
const kinds = new Set(["company-deep-dive", "theme-study", "methodology"]);
const claimTypes = new Set(["Fact", "Derived", "Inference", "Hypothesis"]);
const roles = new Set(["primary", "supporting"]);
const confidences = new Set(["high", "medium", "low"]);
const globalObjectIds = new Set();
const globalSlugs = new Set();
const globalClaimIds = new Set();
const globalEvidenceIds = new Set();

assert.ok(Array.isArray(objects) && objects.length >= 4, "catalog must contain the initial research objects");

for (const object of objects) {
  const prefix = `${object.id}:`;
  assert.match(object.id, /^RO-[A-Z0-9-]+$/, `${prefix} invalid stable object ID`);
  assert.match(object.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${prefix} invalid URL slug`);
  assert.notEqual(object.id.toLowerCase(), object.slug, `${prefix} stable ID must be independent of URL slug`);
  assert.ok(!globalObjectIds.has(object.id), `${prefix} duplicate object ID`);
  assert.ok(!globalSlugs.has(object.slug), `${prefix} duplicate slug`);
  assert.ok(kinds.has(object.kind), `${prefix} unsupported kind`);
  assert.match(object.asOf, /^\d{4}-\d{2}-\d{2}$/, `${prefix} invalid asOf`);
  assert.match(object.publishedAt, /^\d{4}-\d{2}-\d{2}$/, `${prefix} invalid publishedAt`);
  assert.match(object.version, /^\d+\.\d+\.\d+$/, `${prefix} current version must be semver`);
  assert.ok(object.tickers.length > 0, `${prefix} missing tickers`);

  globalObjectIds.add(object.id);
  globalSlugs.add(object.slug);

  const claims = new Map();
  for (const claim of object.claims) {
    assert.match(claim.id, /^CL-[A-Z0-9-]+$/, `${prefix} invalid claim ID ${claim.id}`);
    assert.ok(!claims.has(claim.id), `${prefix} duplicate claim ID ${claim.id}`);
    assert.ok(!globalClaimIds.has(claim.id), `${prefix} globally duplicate claim ID ${claim.id}`);
    assert.ok(claimTypes.has(claim.type), `${prefix} invalid claim type ${claim.type}`);
    for (const locale of locales) {
      assert.ok(claim.text?.[locale]?.trim(), `${prefix} ${claim.id} missing ${locale} text`);
    }
    assert.ok(claim.evidenceIds.length > 0, `${prefix} ${claim.id} must cite evidence`);
    claims.set(claim.id, claim);
    globalClaimIds.add(claim.id);
  }

  const evidence = new Map();
  for (const item of object.evidence) {
    assert.match(item.id, /^EV-[A-Z0-9-]+$/, `${prefix} invalid evidence ID ${item.id}`);
    assert.ok(!evidence.has(item.id), `${prefix} duplicate evidence ID ${item.id}`);
    assert.ok(!globalEvidenceIds.has(item.id), `${prefix} globally duplicate evidence ID ${item.id}`);
    assert.ok(item.source?.url || item.source?.document, `${prefix} ${item.id} needs source URL or document`);
    if (item.source.url) {
      assert.match(item.source.url, /^https:\/\//, `${prefix} ${item.id} source URL must use HTTPS`);
    }
    for (const field of ["sourceDate", "dataAsOf", "lastVerified"]) {
      assert.match(item[field], /^\d{4}-\d{2}-\d{2}$/, `${prefix} ${item.id} invalid ${field}`);
    }
    assert.ok(item.lastVerified >= item.sourceDate, `${prefix} ${item.id} verified before source date`);
    assert.ok(item.calculation === null || item.calculation.trim(), `${prefix} ${item.id} invalid calculation`);
    assert.ok(confidences.has(item.confidence), `${prefix} ${item.id} invalid confidence`);
    assert.ok(item.counterevidence?.trim(), `${prefix} ${item.id} missing counterevidence`);
    assert.ok(roles.has(item.role), `${prefix} ${item.id} invalid evidence role`);
    evidence.set(item.id, item);
    globalEvidenceIds.add(item.id);
  }

  assert.ok([...evidence.values()].some((item) => item.role === "primary"), `${prefix} requires primary evidence`);
  assert.ok([...evidence.values()].some((item) => item.source.url), `${prefix} requires at least one public source URL`);

  for (const claim of claims.values()) {
    for (const evidenceId of claim.evidenceIds) {
      assert.ok(evidence.has(evidenceId), `${prefix} ${claim.id} references missing ${evidenceId}`);
    }
    if (claim.type === "Fact") {
      assert.ok(
        claim.evidenceIds.some((id) => evidence.get(id)?.role === "primary"),
        `${prefix} fact ${claim.id} requires primary evidence`,
      );
    }
  }

  assert.ok(object.financialBridge.length > 0, `${prefix} missing financial bridge`);
  for (const row of object.financialBridge) {
    assert.ok(Number.isFinite(row.value), `${prefix} financial bridge value must be numeric`);
    for (const locale of locales) {
      assert.ok(row.label?.[locale]?.trim(), `${prefix} financial bridge row missing ${locale} label`);
    }
    assert.ok(row.evidenceIds.length > 0, `${prefix} financial bridge row needs evidence`);
    for (const id of row.evidenceIds) {
      assert.ok(evidence.has(id), `${prefix} financial bridge references missing ${id}`);
    }
  }

  assert.ok(object.valuationScenarios.length >= 2, `${prefix} requires at least two valuation scenarios`);
  for (const scenario of object.valuationScenarios) {
    const expectedRevenue = scenario.revenueBaseUsdM * (1 + scenario.revenueGrowthPct / 100);
    const expectedValue = scenario.forwardRevenueUsdM * scenario.salesMultiple;
    assert.ok(Math.abs(expectedRevenue - scenario.forwardRevenueUsdM) < 0.001, `${prefix} ${scenario.id} forward revenue does not recalculate`);
    assert.ok(Math.abs(expectedValue - scenario.impliedEnterpriseValueUsdM) < 0.001, `${prefix} ${scenario.id} enterprise value does not recalculate`);
    assert.ok(scenario.calculation?.trim(), `${prefix} ${scenario.id} missing calculation`);
    const scenarioText = JSON.stringify(scenario).toLowerCase();
    assert.doesNotMatch(scenarioText, /target price\s*[:=]\s*\$?\d|目标价\s*[:：=]\s*\d/, `${prefix} ${scenario.id} must not publish a target price`);
  }

  assert.ok(object.counterevidenceClaimIds.length > 0, `${prefix} requires counterevidence claims`);
  for (const id of object.counterevidenceClaimIds) {
    const claim = claims.get(id);
    assert.ok(claim, `${prefix} missing counterevidence claim ${id}`);
    assert.ok(["Inference", "Hypothesis"].includes(claim.type), `${prefix} counterevidence ${id} must be analytical`);
  }

  assert.ok(object.falsifiers.length >= 2, `${prefix} requires at least two quantitative falsifiers`);
  const falsifiers = new Map();
  for (const falsifier of object.falsifiers) {
    assert.ok(Number.isFinite(falsifier.threshold), `${prefix} ${falsifier.id} threshold must be numeric`);
    assert.ok(["<", "<=", ">", ">="].includes(falsifier.operator), `${prefix} ${falsifier.id} invalid operator`);
    assert.ok(falsifier.metric?.trim() && falsifier.horizon?.trim(), `${prefix} ${falsifier.id} missing metric or horizon`);
    assert.ok(falsifier.claimIds.length > 0, `${prefix} ${falsifier.id} must link claims`);
    for (const id of falsifier.claimIds) {
      assert.ok(claims.has(id), `${prefix} ${falsifier.id} references missing claim ${id}`);
    }
    for (const locale of locales) {
      assert.ok(falsifier.rationale?.[locale]?.trim(), `${prefix} ${falsifier.id} missing ${locale} rationale`);
    }
    assert.ok(!falsifiers.has(falsifier.id), `${prefix} duplicate falsifier ${falsifier.id}`);
    falsifiers.set(falsifier.id, falsifier);
  }

  assert.ok(object.versions.length > 0, `${prefix} missing version history`);
  assert.equal(object.versions.at(-1)?.version, object.version, `${prefix} current version must be the latest version entry`);
  let previousVersionDate = "";
  for (const entry of object.versions) {
    assert.match(entry.version, /^\d+\.\d+\.\d+$/, `${prefix} invalid version entry`);
    assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/, `${prefix} invalid version date`);
    assert.ok(entry.date >= previousVersionDate, `${prefix} version history must be chronological`);
    for (const locale of locales) {
      assert.ok(entry.diff?.[locale]?.trim(), `${prefix} version ${entry.version} missing ${locale} diff`);
    }
    previousVersionDate = entry.date;
  }

  const zh = object.renderings?.["zh-CN"];
  const en = object.renderings?.en;
  assert.equal(zh?.locale, "zh-CN", `${prefix} missing zh-CN sibling rendering`);
  assert.equal(zh?.siblingLocale, "en", `${prefix} invalid zh-CN sibling link`);
  assert.equal(en?.locale, "en", `${prefix} missing en sibling rendering`);
  assert.equal(en?.siblingLocale, "zh-CN", `${prefix} invalid en sibling link`);
  for (const rendering of [zh, en]) {
    for (const field of ["title", "question", "standfirst", "whyItMatters", "consensus", "differentiated", "valuation", "update"]) {
      assert.ok(rendering[field]?.trim(), `${prefix} ${rendering.locale} missing ${field}`);
    }
    for (const id of [...rendering.evidenceClaimIds, ...rendering.riskClaimIds]) {
      assert.ok(claims.has(id), `${prefix} ${rendering.locale} references missing claim ${id}`);
    }
    for (const id of rendering.forwardTestIds) {
      assert.ok(falsifiers.has(id), `${prefix} ${rendering.locale} references missing falsifier ${id}`);
    }
    for (const step of rendering.causalChain) {
      assert.ok(step.title?.trim() && step.body?.trim(), `${prefix} ${rendering.locale} has incomplete causal step`);
      for (const id of step.claimIds) {
        assert.ok(claims.has(id), `${prefix} ${rendering.locale} causal step references missing ${id}`);
      }
    }
  }

  for (const field of ["evidenceClaimIds", "riskClaimIds", "forwardTestIds"]) {
    assert.deepEqual(zh[field], en[field], `${prefix} locale claim parity failed for ${field}`);
  }
  assert.equal(zh.causalChain.length, en.causalChain.length, `${prefix} locale causal-chain parity failed`);
  for (let index = 0; index < zh.causalChain.length; index += 1) {
    assert.deepEqual(zh.causalChain[index].claimIds, en.causalChain[index].claimIds, `${prefix} locale causal claim parity failed at step ${index + 1}`);
  }
}

const byTicker = new Map(objects.flatMap((object) => object.tickers.map((ticker) => [`${object.kind}:${ticker}`, object])));
for (const ticker of ["PLTR", "NET", "TEAM"]) {
  assert.ok(byTicker.has(`company-deep-dive:${ticker}`), `missing initial company object for ${ticker}`);
}

const legacySlug = "cloudflare-atlassian-ai-application-commercialization-2026q2";
const upgradedTheme = objects.find((object) => object.slug === legacySlug);
assert.equal(upgradedTheme?.kind, "theme-study", "legacy NET+TEAM slug must be upgraded to Theme Study");
assert.deepEqual(upgradedTheme?.tickers, ["PLTR", "NET", "TEAM", "DDOG", "APP"], "Theme Study cohort/control coverage changed");
assert.ok(objects.some((object) => object.slug === "palantir-ai-application-commercialization-2026q2"), "PLTR original slug must be retained");

console.log(`Validated ${objects.length} canonical research objects, ${globalClaimIds.size} claims and ${globalEvidenceIds.size} evidence entries.`);
