import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const deskPageSource = await readFile(new URL("../app/desk/page.tsx", import.meta.url), "utf8");
const deskPreviewSource = await readFile(new URL("../app/desk/desk-preview.tsx", import.meta.url), "utf8");
const workshopPageSource = await readFile(new URL("../app/workshop/page.tsx", import.meta.url), "utf8");
const workshopPreviewSource = await readFile(new URL("../app/workshop/workshop-preview.tsx", import.meta.url), "utf8");
const aboutPageSource = await readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8");
const aboutPreviewSource = await readFile(new URL("../app/about/about-preview.tsx", import.meta.url), "utf8");
const englishHomeSource = await readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8");
const englishAboutSource = await readFile(new URL("../app/en/about/page.tsx", import.meta.url), "utf8");
const deepDiveIndexSource = await readFile(new URL("../app/deep-dive/deep-dive-index.tsx", import.meta.url), "utf8");
const deepDiveArticleSource = await readFile(new URL("../app/deep-dive/deep-dive-article.tsx", import.meta.url), "utf8");
const deepDivePageSource = await readFile(new URL("../app/deep-dive/[slug]/page.tsx", import.meta.url), "utf8");
const researchCatalogSource = await readFile(new URL("../content/research-objects/catalog.json", import.meta.url), "utf8");
const researchTypesSource = await readFile(new URL("../lib/research-objects/types.ts", import.meta.url), "utf8");
const researchValidatorSource = await readFile(new URL("../scripts/validate-research-objects.mjs", import.meta.url), "utf8");
const authorityPageSource = await readFile(new URL("../app/authority-ledger/page.tsx", import.meta.url), "utf8");
const authorityViewSource = await readFile(new URL("../app/authority-ledger/authority-ledger.tsx", import.meta.url), "utf8");
const authorityDataSource = await readFile(new URL("../data/authority/calls_kpi_summary.json", import.meta.url), "utf8");
const authorityData = JSON.parse(authorityDataSource);
const accessPageSource = await readFile(new URL("../app/institutional-access/institutional-access.tsx", import.meta.url), "utf8");
const englishDeepDiveSource = await readFile(new URL("../app/en/deep-dive/page.tsx", import.meta.url), "utf8");
const englishAuthoritySource = await readFile(new URL("../app/en/authority-ledger/page.tsx", import.meta.url), "utf8");
const englishAccessSource = await readFile(new URL("../app/en/institutional-access/page.tsx", import.meta.url), "utf8");
const englishDeskSource = await readFile(new URL("../app/en/desk/page.tsx", import.meta.url), "utf8");
const englishWorkshopSource = await readFile(new URL("../app/en/workshop/page.tsx", import.meta.url), "utf8");
const notesIndexSource = await readFile(new URL("../app/notes/page.tsx", import.meta.url), "utf8");
const notePageSource = await readFile(new URL("../app/notes/[slug]/page.tsx", import.meta.url), "utf8");
const englishNotesIndexSource = await readFile(new URL("../app/en/notes/page.tsx", import.meta.url), "utf8");
const englishNotePageSource = await readFile(new URL("../app/en/notes/[slug]/page.tsx", import.meta.url), "utf8");
const decisionAttributionNoteSource = await readFile(new URL("../content/notes/decision-attribution-after-self-driving-portfolio.md", import.meta.url), "utf8");
const englishDecisionAttributionNoteSource = await readFile(new URL("../content/notes/decision-attribution-after-self-driving-portfolio.en.md", import.meta.url), "utf8");
const selfDrivingNoteSource = await readFile(new URL("../content/notes/self-driving-portfolio-ai-investing.md", import.meta.url), "utf8");
const tradingLabNoteSource = await readFile(new URL("../content/notes/trading-like-pm-lab-notes.md", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const contactSource = await readFile(new URL("../lib/contact.ts", import.meta.url), "utf8");
const inquiryApiSource = await readFile(new URL("../app/api/institutional-inquiry/route.ts", import.meta.url), "utf8");
const inquirySource = await readFile(new URL("../lib/institutional-inquiry.ts", import.meta.url), "utf8");
const englishResearchFeedSource = await readFile(new URL("../app/en/deep-dive/feed.xml/route.ts", import.meta.url), "utf8");
const chineseResearchFeedSource = await readFile(new URL("../app/deep-dive/feed.xml/route.ts", import.meta.url), "utf8");
const llmsSource = await readFile(new URL("../app/llms.txt/route.ts", import.meta.url), "utf8");
const llmsFullSource = await readFile(new URL("../app/llms-full.txt/route.ts", import.meta.url), "utf8");
const researchManifestSource = await readFile(new URL("../app/research.json/route.ts", import.meta.url), "utf8");
const researchObjectApiSource = await readFile(new URL("../app/research/[slug]/route.ts", import.meta.url), "utf8");
const authorityDataApiSource = await readFile(new URL("../app/authority-ledger/data.json/route.ts", import.meta.url), "utf8");
const publicResearchSource = await readFile(new URL("../lib/public-research.ts", import.meta.url), "utf8");
const researchUsageSource = await readFile(new URL("../app/research-usage/page.tsx", import.meta.url), "utf8");
const proxySource = await readFile(new URL("../proxy.ts", import.meta.url), "utf8");
const englishDeepDivePageSource = await readFile(new URL("../app/en/deep-dive/[slug]/page.tsx", import.meta.url), "utf8");
const editorialLoaderSource = await readFile(new URL("../lib/editorial-deep-dives.ts", import.meta.url), "utf8");
const editorialRouteSource = await readFile(new URL("../app/deep-dive/global-ai-hardware-profit-pools-2026-09/route.ts", import.meta.url), "utf8");
const englishEditorialRouteSource = await readFile(new URL("../app/en/deep-dive/global-ai-hardware-profit-pools-2026-09/route.ts", import.meta.url), "utf8");
const editorialHtmlCn = await readFile(new URL("../content/editorial-deep-dives/global-ai-hardware-profit-pools-2026-09.zh.html", import.meta.url), "utf8");
const editorialHtmlEn = await readFile(new URL("../content/editorial-deep-dives/global-ai-hardware-profit-pools-2026-09.en.html", import.meta.url), "utf8");
const alphaMapSlug = "the-projection-is-part-of-the-signal-001";
const alphaMapIndexSource = await readFile(new URL("../app/alphamap/page.tsx", import.meta.url), "utf8");
const englishAlphaMapIndexSource = await readFile(new URL("../app/en/alphamap/page.tsx", import.meta.url), "utf8");
const alphaMapIndexComponentSource = await readFile(new URL("../app/alphamap/alphamap-index.tsx", import.meta.url), "utf8");
const alphaMapRouteSource = await readFile(new URL(`../app/alphamap/${alphaMapSlug}/route.ts`, import.meta.url), "utf8");
const englishAlphaMapRouteSource = await readFile(new URL(`../app/en/alphamap/${alphaMapSlug}/route.ts`, import.meta.url), "utf8");
const alphaMapLoaderSource = await readFile(new URL("../lib/editorial-alphamap.ts", import.meta.url), "utf8");
const alphaMapHtmlCn = await readFile(new URL(`../content/editorial-alphamap/${alphaMapSlug}.zh.html`, import.meta.url), "utf8");
const alphaMapHtmlEn = await readFile(new URL(`../content/editorial-alphamap/${alphaMapSlug}.en.html`, import.meta.url), "utf8");
const chineseAlphaMapFeedSource = await readFile(new URL("../app/alphamap/feed.xml/route.ts", import.meta.url), "utf8");
const englishAlphaMapFeedSource = await readFile(new URL("../app/en/alphamap/feed.xml/route.ts", import.meta.url), "utf8");
const memorySeriesSlugs = [
  "hbm-memory-cash-capture-alpha-2026-09",
  "micron-hbm-capital-cycle-2026-09",
  "sandisk-nand-capital-cycle-2026-09",
];
const memorySeriesPages = await Promise.all(memorySeriesSlugs.flatMap((slug) => [
  readFile(new URL(`../content/editorial-deep-dives/${slug}.zh.html`, import.meta.url), "utf8"),
  readFile(new URL(`../content/editorial-deep-dives/${slug}.en.html`, import.meta.url), "utf8"),
]));
const refreshedCompanySlugs = [
  "cloudflare-monetization-density-2026q2",
  "atlassian-workflow-density-context-monetization-2026fy",
  "nvidia-fy27q2-supercycle-2026-09",
  "palantir-ai-application-commercialization-2026q2",
  "snowflake-agentic-data-cloud-2026-09",
];
const refreshedCompanyPages = await Promise.all(refreshedCompanySlugs.flatMap((slug) => [
  readFile(new URL(`../content/editorial-deep-dives/${slug}.zh.html`, import.meta.url), "utf8"),
  readFile(new URL(`../content/editorial-deep-dives/${slug}.en.html`, import.meta.url), "utf8"),
]));

test("defines every public navigation section", () => {
  for (const id of ["top", "research", "philosophy", "capabilities", "workflow", "direction", "practice", "notes", "contact"]) {
    assert.match(pageSource, new RegExp(`id=["']${id}["']`));
  }
});

test("keeps language selection persistent and accessible", () => {
  assert.match(pageSource, /lunartulip-language/);
  assert.match(pageSource, /document\.documentElement\.lang/);
  assert.match(pageSource, /hrefLang="zh-CN"/);
  assert.match(pageSource, /hrefLang="en"/);
  assert.match(pageSource, /aria-current=/);
  assert.match(proxySource, /x-lunartulip-locale/);
});

test("publishes the official contact and canonical domain", () => {
  assert.match(pageSource, /institutionalMailto/);
  assert.match(contactSource, /chief@lunartuliplab\.com/);
  assert.match(pageSource, /微信公众号/);
  assert.match(pageSource, /小红书/);
  assert.match(pageSource, /WeChat Official Account/);
  assert.match(pageSource, /Xiaohongshu/);
  assert.match(layoutSource, /https:\/\/lunartuliplab\.com/);
  assert.match(layoutSource, /canonical:\s*["']\/["']/);
});

test("states the independent research category and dual-engine positioning", () => {
  assert.match(pageSource, /AI-native 独立研究机构/);
  assert.match(pageSource, /主观基本面研究/);
  assert.match(pageSource, /系统化量化研究/);
  assert.match(pageSource, /Discretionary Fundamental Research/);
  assert.match(pageSource, /Systematic Quantitative Research/);
  assert.match(pageSource, /AI-NATIVE RESEARCH WORKSPACE/);
});

test("publishes two research engines, proof surfaces and explicit delivery paths", () => {
  for (const term of [
    "ENGINE 01 / DISCRETIONARY FUNDAMENTAL",
    "ENGINE 02 / SYSTEMATIC QUANT",
    "Lunartulip Deep Dive",
    "判断与结局账本",
    "POINT-IN-TIME / VERSIONED",
    "AGGREGATE / METHODOLOGY-LED",
    "两台研究引擎，持续解释与验证市场机会",
  ]) {
    assert.match(pageSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(pageSource, /href: "\/deep-dive"/);
  assert.match(pageSource, /href: "\/authority-ledger"/);
  for (const term of ["Always-On Research Desk", "Research API", "Alternative Dataset", "6-Session Workshop"]) {
    assert.match(pageSource, new RegExp(term));
  }
});

test("publishes canonical versioned Deep Dive research objects", () => {
  for (const term of [
    "palantir-ai-application-commercialization-2026q2",
    "cloudflare-monetization-density-2026q2",
    "atlassian-workflow-density-context-monetization-2026fy",
    "cloudflare-atlassian-ai-application-commercialization-2026q2",
    "RO-COMP-PLTR-001",
    "RO-COMP-NET-001",
    "RO-COMP-TEAM-001",
    "RO-THEME-AI-VALUE-001",
    "global-ai-hardware-profit-pools-2026-09",
    "RO-THEME-AI-HARDWARE-001",
  ]) {
    assert.match(researchCatalogSource, new RegExp(term));
  }
  assert.match(deepDiveIndexSource, /COMPANY DEEP DIVES/);
  assert.match(deepDiveIndexSource, /THEME STUDIES/);
  for (const term of [
    "市场共识",
    "差异化判断",
    "价值如何一步步穿过收入表",
    "什么会证明这套判断正在失效",
    "monetization density",
    "Claim IDs",
    "EVIDENCE LEDGER",
  ]) {
    assert.match(researchCatalogSource + deepDiveArticleSource + deepDiveIndexSource, new RegExp(term));
  }
  assert.match(deepDivePageSource, /"@type": "ScholarlyArticle"/);
  assert.match(deepDivePageSource, /identifier: item\.id/);
  assert.match(deepDivePageSource, /citation:/);
  assert.match(deepDivePageSource, /dateModified: modifiedAt/);
  assert.match(researchTypesSource, /ClaimType = "Fact" \| "Derived" \| "Inference" \| "Hypothesis"/);
  assert.match(researchTypesSource, /narrativeSections\?/);
  assert.match(researchTypesSource, /metrics\?: ValuationMetric\[\]/);
  assert.match(deepDiveArticleSource, /FULL ANALYSIS \/ POINT-IN-TIME RECORD/);
  assert.match(researchValidatorSource, /locale claim parity failed/);
  assert.doesNotMatch(researchCatalogSource, /成交价|建仓纪律|回调至 \$|介入时点|目标价位/);
  assert.doesNotMatch(researchCatalogSource, /中际旭创.{0,12}跌停|Micron.{0,30}6\.2|155\.03|再涨十倍|十倍股所需/);
  assert.doesNotMatch(researchCatalogSource, /DESK_DEEP_DIVE|HYP010|deepdive\.md|外发闸门|approved/i);
});

test("serves the AI hardware theme study from reviewed editorial HTML on explicit static routes", () => {
  for (const source of [editorialRouteSource, englishEditorialRouteSource]) {
    assert.match(source, /export const dynamic = "force-static"/);
    assert.match(source, /readEditorialDeepDive\("global-ai-hardware-profit-pools-2026-09"/);
    assert.match(source, /editorialDeepDiveResponse/);
  }
  assert.match(editorialRouteSource, /"global-ai-hardware-profit-pools-2026-09", "zh"/);
  assert.match(englishEditorialRouteSource, /"global-ai-hardware-profit-pools-2026-09", "en"/);
  assert.match(editorialLoaderSource, /"Content-Type": "text\/html; charset=utf-8"/);
  for (const slug of ["global-ai-hardware-profit-pools-2026-09", ...memorySeriesSlugs, ...refreshedCompanySlugs]) {
    assert.match(editorialLoaderSource, new RegExp(`"${slug}"`));
  }
  for (const source of [deepDivePageSource, englishDeepDivePageSource]) {
    assert.match(source, /filter\(\(\{ slug \}\) => !isEditorialDeepDive\(slug\)\)/);
  }
  for (const html of [editorialHtmlCn, editorialHtmlEn]) {
    assert.match(html, /^<!doctype html>/);
    assert.match(html, /<meta charset="utf-8">/);
    assert.match(html, /hreflang="zh-CN" href="https:\/\/lunartuliplab\.com\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
    assert.match(html, /hreflang="en" href="https:\/\/lunartuliplab\.com\/en\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
    assert.match(html, /hreflang="x-default"/);
    assert.match(html, /<meta property="og:type" content="article">/);
    assert.match(html, /"@type": "Article"/);
    assert.match(html, /"identifier": "RO-THEME-AI-HARDWARE-001"/);
    assert.match(html, /"version": "1\.0\.0"/);
    assert.match(html, /Lunartulip Lab/);
    assert.doesNotMatch(html, /LunarTulip Research|Lunartulip Research/);
    // Reviewed visual structure carried over verbatim.
    for (const marker of ["class=\"shell mast\"", "class=\"mast-nav\"", "class=\"hero-art\"", "class=\"orbit-label ol-1\"", "class=\"decision-wrap\"", "class=\"shell tension\"", "class=\"method-note\""]) {
      assert.ok(html.includes(marker), `editorial HTML lost ${marker}`);
    }
  }
  assert.match(editorialHtmlCn, /<html lang="zh-CN">/);
  assert.match(editorialHtmlCn, /rel="canonical" href="https:\/\/lunartuliplab\.com\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
  assert.match(editorialHtmlCn, /主线在换手？/);
  assert.match(editorialHtmlEn, /<html lang="en">/);
  assert.match(editorialHtmlEn, /rel="canonical" href="https:\/\/lunartuliplab\.com\/en\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
  assert.match(editorialHtmlEn, /Is the baton really changing hands\?/);
  // Language siblings and the Deep Dive index stay reachable from the mast.
  assert.match(editorialHtmlCn, /href="\/deep-dive">Deep Dive Index/);
  assert.match(editorialHtmlCn, /href="\/en\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
  assert.match(editorialHtmlEn, /href="\/en\/deep-dive">Deep Dive Index/);
  assert.match(editorialHtmlEn, /href="\/deep-dive\/global-ai-hardware-profit-pools-2026-09"/);
});

test("publishes five refreshed company studies as bilingual editorial citation objects", () => {
  assert.match(deepDiveIndexSource, /isEditorialDeepDive\(item\.slug\)/);
  assert.match(deepDiveIndexSource, /\? <a href=/);
  for (const [index, slug] of refreshedCompanySlugs.entries()) {
    const zh = refreshedCompanyPages[index * 2];
    const en = refreshedCompanyPages[index * 2 + 1];
    for (const html of [zh, en]) {
      assert.match(html, /^<!doctype html>/);
      assert.match(html, /"@type":"ScholarlyArticle"/);
      assert.match(html, /article:published_time/);
      assert.match(html, /article:modified_time/);
      assert.match(html, /PIT 与版本纪律|Point-in-time and version discipline/);
      assert.match(html, /Research API/);
      assert.match(html, /公开引用元数据|Public citation metadata/);
      assert.doesNotMatch(html, /机器读 Research Object|Machine-readable Research Object/);
      assert.doesNotMatch(html, /LunarTulip Research|Lunartulip Research/);
      assert.doesNotMatch(html, /desk\.lunartuliplab\.com|\/external\/|workspace\/ai-team|workspace\/decision_core/i);
    }
    assert.match(zh, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/deep-dive/${slug}"`));
    assert.match(en, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/en/deep-dive/${slug}"`));
    assert.match(zh, /<html lang="zh-CN">/);
    assert.match(en, /<html lang="en">/);
  }
  assert.match(refreshedCompanyPages[4], /FY27Q2|FY27 第二财季/);
  assert.doesNotMatch(refreshedCompanyPages[4] + refreshedCompanyPages[5], /FY26Q2|FY26 Q2/);
});

test("publishes the bilingual memory capital-cycle series without Desk dependencies", () => {
  for (const [index, slug] of memorySeriesSlugs.entries()) {
    const zh = memorySeriesPages[index * 2];
    const en = memorySeriesPages[index * 2 + 1];
    for (const html of [zh, en]) {
      assert.match(html, /^<!doctype html>/);
      assert.match(html, /MEMORY CAPITAL-CYCLE SERIES|存储资本周期三篇系列/);
      for (const siblingSlug of memorySeriesSlugs) {
        assert.match(html, new RegExp(`/deep-dive/${siblingSlug}`));
      }
      assert.doesNotMatch(html, /LunarTulip Research|Lunartulip Research/);
      assert.doesNotMatch(html, /desk\.lunartuliplab\.com|\/external\/|workspace\/ai-team|workspace\/decision_core/i);
    }
    assert.match(zh, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/deep-dive/${slug}"`));
    assert.match(en, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/en/deep-dive/${slug}"`));
    assert.match(zh, /<html lang="zh-CN">/);
    assert.match(en, /<html lang="en">/);
  }
  for (const hbm of memorySeriesPages.slice(0, 2)) {
    assert.match(hbm, /data:image\/png;base64,/);
    assert.match(hbm, /class="flow-figure"/);
  }
  assert.match(researchCatalogSource, /"id": "RO-THEME-MEMORY-CASH-CAPTURE-001"/);
  assert.match(researchCatalogSource, /"id": "RO-COMP-MU-CAPITAL-CYCLE-001"/);
  assert.match(researchCatalogSource, /"id": "RO-COMP-SNDK-CAPITAL-CYCLE-001"/);
});

test("keeps the AI hardware study inside its audited factual boundaries", () => {
  // Seeking Alpha is a dated third-party consensus snapshot, never company guidance.
  assert.match(editorialHtmlCn, /https:\/\/seekingalpha\.com\/symbol\/MU\/earnings\/revisions/);
  assert.match(editorialHtmlEn, /https:\/\/seekingalpha\.com\/symbol\/MU\/earnings\/revisions/);
  assert.match(editorialHtmlCn, /第三方一致预期快照/);
  assert.match(editorialHtmlCn, /抓取日期 2026-09-01/);
  assert.match(editorialHtmlCn, /不是公司指引/);
  assert.match(editorialHtmlEn, /third-party consensus snapshot/);
  assert.match(editorialHtmlEn, /captured (from Seeking Alpha )?on 2026-09-01/);
  assert.match(editorialHtmlEn, /not company guidance/);
  assert.match(researchCatalogSource, /EV-HWX-CONSENSUS/);
  assert.match(researchCatalogSource, /vendor-aggregated sell-side consensus/);
  // Spot quotes are quotes, not demand confirmation.
  assert.match(editorialHtmlCn, /这些都是报价序列/);
  assert.match(editorialHtmlEn, /these are quoted-price series/);
  // NVIDIA: forward commitments, principally memory, not paid procurement.
  assert.match(editorialHtmlCn, /未来供应与产能承诺（supply and capacity commitments）/);
  assert.match(editorialHtmlCn, /不是已付款采购/);
  assert.match(editorialHtmlEn, /supply and capacity commitments/);
  assert.match(editorialHtmlEn, /not paid-for procurement/);
  // Corrected market and growth readings.
  assert.match(editorialHtmlCn, /中报后首日下跌 7\.72%/);
  assert.match(editorialHtmlEn, /fell 7\.72% on the first session/);
  assert.match(editorialHtmlCn, /同比 \+86\.4%/);
  assert.match(editorialHtmlEn, /\+86\.4% YoY|86\.4% year over year/);
  // CXMT stays an unconfirmed press report with no derived price impact.
  assert.match(editorialHtmlCn, /未获公司确认，本文不据此推导任何价格或份额影响/);
  assert.match(editorialHtmlEn, /not company-confirmed, and we draw no pricing, share or supply-demand inference/);
  // The ten-times case is an author scenario, dated, with stated multiples.
  assert.match(editorialHtmlCn, /作者设定的情景反向检验，不是预测/);
  assert.match(editorialHtmlEn, /author-defined scenario back-test/);
  assert.match(editorialHtmlCn, /2026-09-01 收盘快照/);
  assert.match(editorialHtmlEn, /2026-09-01 close snapshot/);
  // The odds table is labelled research judgment.
  assert.match(editorialHtmlCn, /研究判断表（非事实陈述）/);
  assert.match(editorialHtmlEn, /Research judgment table \(not factual assertion\)/);
  // Forbidden across both editorial pages: trading instruction, entry discipline, price targets.
  for (const html of [editorialHtmlCn, editorialHtmlEn]) {
    assert.doesNotMatch(html, /跌停|目标价|建仓|加仓|减仓|止损|买入时点|卖出时点/);
    assert.doesNotMatch(html, /price target|target price|entry point|stop loss|buy rating|sell rating/i);
    assert.doesNotMatch(html, /LunarTulip Research<|再涨十倍/);
  }
});

test("indexes the AI hardware theme study through the companion research object", () => {
  for (const id of [
    "RO-THEME-AI-HARDWARE-001",
    "CL-HWX-001",
    "CL-HWX-025",
    "EV-HWX-TRENDFORCE",
    "EV-HWX-MOTIE",
    "EV-HWX-NVDA",
    "EV-HWX-HUMANOID-GAP",
    "VAL-HWX-MODULE-CN",
    "FAL-HWX-001",
    "FAL-HWX-006",
  ]) {
    assert.match(researchCatalogSource, new RegExp(id));
  }
  const catalog = JSON.parse(researchCatalogSource);
  const study = catalog.find((item) => item.id === "RO-THEME-AI-HARDWARE-001");
  assert.ok(study, "companion research object missing from the catalog");
  assert.equal(study.slug, "global-ai-hardware-profit-pools-2026-09");
  assert.equal(study.kind, "theme-study");
  assert.equal(study.publishedAt, "2026-09-02");
  assert.equal(study.asOf, "2026-09-01");
  assert.equal(study.version, "1.0.0");
  assert.ok(study.claims.length >= 20);
  assert.ok(study.evidence.length >= 15);
  assert.ok(study.financialBridge.some((row) => row.displayValue?.["zh-CN"] && row.displayValue?.en));
  assert.ok(study.valuationScenarios.every((scenario) => scenario.metrics?.length >= 2));
  assert.ok(study.falsifiers.length >= 2);
  assert.ok(study.falsifiers.every((test) => test.claimIds.length > 0 && Number.isFinite(test.threshold)));
  assert.ok(study.dataGaps.length >= 4);
  // The companion object indexes the study; it is not the source of the page body.
  assert.equal(study.renderings["zh-CN"].narrativeSections, undefined);
  assert.equal(study.renderings.en.narrativeSections, undefined);
  assert.match(study.sourceLabel, /Global AI hardware profit-pool cross-section/);
  // Unstable or unconfirmed inputs stay out of the fact layer.
  const factText = study.claims.filter((claim) => claim.type === "Fact").map((claim) => JSON.stringify(claim.text)).join("\n");
  assert.doesNotMatch(factText, /Seeking Alpha|CXMT|52-week|52 周|市值/);
  const gaps = JSON.stringify(study.dataGaps);
  assert.match(gaps, /Seeking Alpha/);
  assert.match(gaps, /CXMT/);
});

test("publishes the first bilingual AlphaMap as a distinct public research series", () => {
  const catalog = JSON.parse(researchCatalogSource);
  const study = catalog.find((item) => item.slug === alphaMapSlug);
  assert.ok(study, "AlphaMap companion research object missing from the catalog");
  assert.equal(study.kind, "alphamap-study");

  for (const source of [alphaMapRouteSource, englishAlphaMapRouteSource]) {
    assert.match(source, /export const dynamic = "force-static"/);
    assert.match(source, /readEditorialAlphaMap/);
    assert.match(source, /editorialAlphaMapResponse/);
    assert.match(source, new RegExp(alphaMapSlug));
  }
  assert.match(alphaMapLoaderSource, /Content-Type["']?: "text\/html; charset=utf-8"/);
  assert.match(alphaMapIndexSource, /canonical:\s*["']\/alphamap["']/);
  assert.match(englishAlphaMapIndexSource, /canonical:\s*["']\/en\/alphamap["']/);
  for (const source of [alphaMapIndexSource, englishAlphaMapIndexSource]) {
    assert.match(source, /languages:/);
    assert.match(source, /"x-default": "\/en\/alphamap"/);
    assert.match(source, /CollectionPage|CreativeWorkSeries/);
  }
  assert.match(alphaMapIndexComponentSource, /href="\/en\/alphamap"[\s\S]*>EN<\/Link>[\s\S]*href="\/alphamap"[\s\S]*>CN<\/Link>/);

  for (const html of [alphaMapHtmlCn, alphaMapHtmlEn]) {
    assert.match(html, /^<!doctype html>/i);
    assert.match(html, /Lunartulip Lab/);
    assert.match(html, /AlphaMap/);
    assert.match(html, /hreflang="zh-CN"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="x-default"/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /"@type"\s*:\s*"(?:Article|ScholarlyArticle)"/);
    assert.match(html, /not investment advice|不构成投资建议/i);
    assert.doesNotMatch(html, /LunarTulip Research|Lunartulip Research/);
    assert.doesNotMatch(html, /desk\.lunartuliplab\.com|\/external\/|workspace\/ai-team|workspace\/decision_core|private\//i);
  }
  assert.match(alphaMapHtmlCn, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/alphamap/${alphaMapSlug}"`));
  assert.match(alphaMapHtmlEn, new RegExp(`rel="canonical" href="https://lunartuliplab\\.com/en/alphamap/${alphaMapSlug}"`));
  assert.match(alphaMapHtmlEn, /href="\/en">LUNARTULIP LAB<\/a>[\s\S]*href="\/en\/alphamap">ALPHAMAP INDEX<\/a>[\s\S]*>EN<\/a>[\s\S]*>CN<\/a>/);
  assert.match(alphaMapHtmlCn, /href="\/">LUNARTULIP LAB<\/a>[\s\S]*href="\/alphamap">ALPHAMAP 专栏<\/a>[\s\S]*>EN<\/a>[\s\S]*>CN<\/a>/);
});

test("routes AlphaMap discovery separately from Deep Dive and licensed data", () => {
  assert.match(sitemapSource, /String\(item\.kind\) === "alphamap-study"/);
  assert.match(sitemapSource, /String\(item\.kind\) !== "alphamap-study"/);
  assert.match(sitemapSource, /alphamap\/\$\{item\.slug\}/);
  assert.match(sitemapSource, /research\/\$\{item\.slug\}/);
  assert.match(sitemapSource, /lunartuliplab\.com\/alphamap\/feed\.xml/);
  assert.match(sitemapSource, /lunartuliplab\.com\/en\/alphamap\/feed\.xml/);

  for (const source of [chineseAlphaMapFeedSource, englishAlphaMapFeedSource]) {
    assert.match(source, /String\(item\.kind\) === "alphamap-study"/);
    assert.match(source, /application\/rss\+xml/);
    assert.match(source, /item\.id}@\$\{item\.version/);
  }
  for (const source of [chineseResearchFeedSource, englishResearchFeedSource]) {
    assert.match(source, /String\(item\.kind\) !== "alphamap-study"/);
  }

  for (const source of [llmsSource, llmsFullSource]) {
    assert.match(source, /AlphaMap/);
    assert.match(source, /Deep Dive/);
    assert.match(source, /public citation metadata/i);
    assert.match(source, /not licensed datasets?/i);
    assert.match(source, /collection.*alphamap|collection: "alphamap"/s);
  }
  assert.match(layoutSource, /"@type": \["CreativeWorkSeries", "CollectionPage"\]/);
  assert.match(layoutSource, /lunartuliplab\.com\/en\/alphamap#collection/);
  assert.match(sitemapSource, /"x-default": "https:\/\/lunartuliplab\.com\/en\/alphamap/);
  assert.match(pageSource, /PUBLIC RESEARCH SERIES \/ ALPHAMAP/);
  assert.match(pageSource, /受许可数据集按用途和许可单独交付/);
  assert.match(deepDiveIndexSource, /Continue with AlphaMap/);
  assert.doesNotMatch(deepDiveIndexSource, /\.filter\(\(item\) => String\(item\.kind\) === "alphamap-study"\)/);
  assert.match(deskPreviewSource, /PUBLIC ALPHAMAP SAMPLE/);
  assert.match(deskPreviewSource, /licensed Research API/);
  assert.match(accessPageSource, /PUBLIC SAMPLE TO LICENSED DELIVERY/);
  assert.match(accessPageSource, /受许可数据集按用途、许可与数据权利单独交付/);
});

test("renders the Authority Ledger from a generated data projection with visible methodology", () => {
  assert.match(authorityData.as_of, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(authorityData.generated_at, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(authorityData.cohorts.backfill.settled > 0);
  assert.ok(authorityData.cohorts.backfill.universe_ew.hit_rate >= 0 && authorityData.cohorts.backfill.universe_ew.hit_rate <= 1);
  assert.ok(authorityData.cohorts.backfill.csi500.win_loss_ratio_hm_only > 0);
  assert.equal(authorityData.evidence_link_rate, 1);
  assert.match(authorityPageSource, /"@type": "Dataset"/);
  assert.match(englishAuthoritySource, /"@type": "Dataset"/);
  assert.match(authorityPageSource + englishAuthoritySource, /authority-ledger\/data\.json/);
  assert.match(authorityViewSource, /机器读快照|machine-readable snapshot/);
  assert.match(authorityViewSource, /当前已裁决样本来自历史重构区间/);
  assert.match(authorityViewSource, /方向性命中率 = hit \/ \(hit \+ miss\)/);
  assert.match(authorityViewSource, /回溯期与纪律期独立列示/);
});

test("publishes the Workshop and Desk as complementary research-system surfaces", () => {
  assert.match(workshopPageSource, /WorkshopPreview/);
  assert.match(workshopPageSource, /canonical: "https:\/\/lunartuliplab\.com\/workshop"/);
  assert.match(workshopPreviewSource, /SIX-SESSION INSTITUTIONAL DEPLOYMENT/);
  assert.match(workshopPreviewSource, /institutional-access#intent-research_system_diagnostic/);
  assert.match(sitemapSource, /lunartuliplab\.com\/workshop/);
  assert.match(sitemapSource, /lunartuliplab\.com\/desk/);
  assert.match(deskPageSource, /Lunartulip Research Desk/);
  for (const term of [
    "AI-NATIVE RESEARCH & DECISION WORKSPACE",
    "THEMATIC INVESTMENT INTELLIGENCE",
    "AI 科技全产业链主题投研与另类数据研究台",
    "CURRENT ACTIVE COVERAGE / 8 TRACKS",
    "AI_COMPUTE_ECONOMICS",
    "PHYSICAL_AI_ROBOTICS",
    "两台研究引擎，在一个工作区形成连续判断",
    "01 / RESEARCH",
    "02 / STRATEGY",
    "03 / PORTFOLIO",
    "04 / LEARNING",
    "NINE-LAYER ARCHITECTURE",
    "从信息到反馈，看清判断如何形成、验证和更新",
    "AlphaMap × Ontology",
    "MOSTLY AUTOMATED",
    "双 NAV",
    "DELIVERY SURFACES",
    "Research API",
    "Alternative Dataset",
  ]) {
    assert.match(deskPreviewSource, new RegExp(term.replace(/[×/]/g, "\\$&")));
  }
  assert.doesNotMatch(deskPreviewSource, /付费试点|预约演示|Request demo|如何报价|price:/i);
});

test("positions Research Desk as thematic investment intelligence without replacing the Lab identity", () => {
  const primary = /LunarTulip Research Desk is an always-on thematic investment intelligence service for AI technology/;
  assert.match(pageSource, primary);
  assert.match(deskPreviewSource, primary);
  assert.match(englishDeskSource, /Thematic Investment Intelligence for AI Technology/);
  assert.match(deskPageSource, /AI科技主题投研与另类数据研究台/);
  assert.match(layoutSource, /thematic investment intelligence/);
  assert.match(layoutSource, /machine-readable thematic research data/);
  assert.match(llmsSource, /eight active Coverage Tracks/);
  assert.match(accessPageSource, /AI 科技主题的持续研究订阅/);
  assert.match(pageSource, /独立科技权益研究机构/);
  assert.match(pageSource, /系统化量化研究/);
});

test("defines a canonical About entity page without a founder", () => {
  assert.match(aboutPageSource, /canonical: "\/about"/);
  assert.match(aboutPageSource, /"@type": "AboutPage"/);
  assert.match(aboutPreviewSource, /Lunartulip Lab/);
  assert.match(aboutPreviewSource, /理解 AI 产业变化/);
  assert.match(aboutPreviewSource, /主观基本面研究解释产业因果与预期差/);
  assert.match(aboutPreviewSource, /OFFICIAL NAME/);
  assert.doesNotMatch(aboutPageSource + aboutPreviewSource, /founder:/);
});

test("ships independent English routes with hreflang counterparts", () => {
  for (const source of [englishHomeSource, englishAboutSource, englishDeepDiveSource, englishAuthoritySource, englishAccessSource, englishDeskSource, englishWorkshopSource]) {
    assert.match(source, /canonical:/);
  }
  assert.match(englishHomeSource + englishAboutSource + englishWorkshopSource, /initialLanguage="en"/);
  assert.match(englishDeepDiveSource + englishAuthoritySource + englishAccessSource, /language="en"/);
  assert.match(englishHomeSource, /languages:/);
  assert.match(sitemapSource, /lunartuliplab\.com\/en/);
  for (const path of ["/about", "/deep-dive", "/authority-ledger", "/desk", "/workshop", "/institutional-access"]) {
    assert.match(sitemapSource, new RegExp(`path: "${path.replace("/", "\\/")}"`));
  }
});

test("separates the current mandate from the long-term buy-side vision", () => {
  assert.match(pageSource, /AI-native Fund/);
  assert.match(pageSource, /现在看得见研究质量/);
  assert.match(pageSource, /先验证研究质量/);
  assert.match(pageSource, /任何未来资管合作均将在相应主体、资质与合规框架完备后独立开展/);
  assert.match(pageSource, /真实资本结果将长期检验双研究引擎/);
  assert.match(pageSource, /不构成投资建议、操作指引、基金募集、金融产品推介或收益承诺/);
});

test("presents institutional access as visitor-oriented research formats", () => {
  for (const term of [
    "索取机构样章",
    "申请 Lunartulip Research Desk",
    "thematic investment intelligence subscription",
    "机器可读 Research API",
    "Quant 买方 Alternative Dataset",
    "Commissioned Deep Dive / Theme Mandate",
    "6-Session AI-native 投研框架 Workshop",
    "¥100,000 起 / US$15,000 起",
  ]) {
    assert.match(accessPageSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(accessPageSource, /机构 × Coverage Track × 固定周期/);
  assert.match(accessPageSource, /机器读 API 和另类数据另行约定/);
  assert.match(accessPageSource, /不要提交持仓、交易凭证、账户信息/);
  assert.doesNotMatch(accessPageSource, /¥1,200|RMB 1,200|L1 \/ MEMBER|≥L2 \/ NOT OPEN|INTERNAL \/ NEVER SOLD|checkout|credit card|payment provider/i);
});

test("ships a validated, attributed SMTP institutional inquiry flow", () => {
  for (const term of ["sample_request", "research_access", "machine_readable_research", "alternative_dataset", "commissioned_mandate", "research_system_diagnostic"]) {
    assert.match(inquirySource + accessPageSource, new RegExp(term));
  }
  for (const field of ["organization", "role", "name", "email", "researchQuestion", "timeline"]) {
    assert.match(accessPageSource, new RegExp(`name=["']${field}["']`));
  }
  assert.match(inquiryApiSource, /consumeInquiryRateLimit/);
  assert.match(inquiryApiSource, /isSameOrigin/);
  assert.match(inquirySource, /companyWebsite/);
  assert.match(inquirySource, /nodemailer\.createTransport/);
  assert.match(inquirySource, /SMTP_HOST/);
  assert.doesNotMatch(inquirySource, /SMTP_PASSWORD\s*=\s*["'][^"']+["']/);
});

test("publishes bilingual research discovery infrastructure", () => {
  for (const source of [chineseResearchFeedSource, englishResearchFeedSource]) {
    assert.match(source, /application\/rss\+xml/);
    assert.match(source, /item\.id}@\$\{item\.version/);
  }
  assert.match(sitemapSource, /researchObjects/);
  assert.match(sitemapSource, /alternates:/);
  assert.match(deepDiveArticleSource, /hrefLang=/);
  assert.match(llmsSource, /Canonical research/);
  assert.match(llmsSource, /Citation guidance/);
  assert.match(llmsFullSource, /Claim labels are semantic/);
  assert.match(researchManifestSource, /"@type": "DataCatalog"/);
  assert.match(researchManifestSource, /citationFormat/);
  assert.match(researchObjectApiSource, /X-Lunartulip-Research-Object/);
  assert.match(researchObjectApiSource, /generateStaticParams/);
  assert.match(authorityDataApiSource, /calls_kpi_summary\.json/);
  assert.match(sitemapSource, /research\/\$\{item\.slug\}/);
});

test("separates public citation metadata from licensed research data", () => {
  for (const term of [
    '"@type": "Dataset"',
    "name:",
    "description:",
    "creator:",
    "license:",
    "isAccessibleForFree:",
    "distribution:",
    "publicSummary:",
  ]) {
    assert.match(publicResearchSource, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(publicResearchSource, /research-usage/);
  assert.match(researchManifestSource, /researchObjects\.map\(publicResearchDataset\)/);
  assert.match(researchObjectApiSource, /publicResearchDataset\(item\)/);
  assert.doesNotMatch(researchManifestSource, /\.\.\.item/);
  assert.doesNotMatch(researchObjectApiSource, /researchObject:\s*item/);
  assert.doesNotMatch(llmsFullSource, /item\.(claims|evidence|financialBridge|valuationScenarios|falsifiers|renderings\.en\.valuation)/);
  for (const restrictedField of ["claims", "evidence", "financialBridge", "valuationScenarios", "falsifiers", "dataGaps"]) {
    assert.doesNotMatch(publicResearchSource, new RegExp(`item\\.${restrictedField}`));
  }
  assert.match(publicResearchSource, /abstract: item\.renderings\.en\.standfirst/);
  assert.match(publicResearchSource, /researchQuestion:/);
  assert.doesNotMatch(publicResearchSource, /sameAs:/);
  assert.match(publicResearchSource, /encodingFormat: "application\/json"/);
  assert.match(researchManifestSource, /distribution:/);
  assert.match(authorityDataApiSource, /measurementTechnique:/);
  assert.match(authorityDataApiSource, /public aggregate projection/);
  assert.doesNotMatch(authorityDataApiSource, /workspace\/ai-team/);
  assert.match(researchUsageSource, /批量数据使用需要单独许可/);
  assert.match(researchUsageSource, /Systematic extraction/);
  assert.match(researchUsageSource, /Fetching a complete public manifest once is permitted/);
  assert.match(researchUsageSource, /Third-party data/);
  assert.match(researchUsageSource, /Chinese version controls/);
  assert.match(sitemapSource, /lunartuliplab\.com\/research-usage/);
  assert.match(deepDiveArticleSource, /公开引用元数据/);
  assert.doesNotMatch(deepDiveArticleSource, /读取本对象的 Claim、Evidence/);
});

test("publishes machine-readable research topic clusters", () => {
  for (const term of ["AI INVESTMENT RESEARCH", "AI FOR QUANTITATIVE INVESTING", "QUANTAMENTAL INVESTING", "AI-NATIVE FUND", "AGENTIC INVESTMENT RESEARCH"]) {
    assert.match(notesIndexSource, new RegExp(term));
  }
});

test("exposes institutional search intent in site metadata", () => {
  for (const term of ["独立科技权益研究机构", "主观基本面研究", "系统化量化研究", "discretionary fundamental research", "systematic quantitative research"]) {
    assert.match(layoutSource, new RegExp(term));
  }
  assert.match(layoutSource, /knowsAbout/);
  assert.match(layoutSource, /professional and institutional research access/);
  assert.match(layoutSource, /Machine-readable Research API/);
  assert.match(layoutSource, /Point-in-time Alternative Datasets/);
});

test("defines a canonical Lunartulip organization and website entity", () => {
  assert.match(layoutSource, /"@type": "Organization"/);
  assert.match(layoutSource, /"@type": "WebSite"/);
  assert.match(layoutSource, /"@id": "https:\/\/lunartuliplab\.com\/#organization"/);
  assert.match(layoutSource, /"@id": "https:\/\/lunartuliplab\.com\/#website"/);
  assert.match(layoutSource, /name: "Lunartulip Lab"/);
  assert.match(layoutSource, /alternateName: \["LunarTulip Lab", "Lunar Tulip Lab", "Lunartulip Research", "LunarTulip Research"\]/);
  assert.match(layoutSource, /publisher: \{\s*"@id": "https:\/\/lunartuliplab\.com\/#organization"/);
  assert.doesNotMatch(layoutSource, /founder:/);
});

test("ships the LunarTulip brand artwork", async () => {
  const artwork = await stat(new URL("../public/lunartulip-silver-emblem.png", import.meta.url));
  const favicon = await stat(new URL("../public/favicon.svg", import.meta.url));
  assert.ok(artwork.size > 10_000);
  assert.ok(favicon.size > 100);
});

test("publishes fourteen Chinese research notes and one English edition", async () => {
  const noteFiles = (await readdir(new URL("../content/notes/", import.meta.url))).filter((file) => file.endsWith(".md"));
  assert.equal(noteFiles.length, 15);
  const slugs = new Set(noteFiles.map((file) => file.replace(/\.en\.md$|\.md$/, "")));
  assert.equal(slugs.size, 14);
  for (const slug of slugs) {
    assert.match(pageSource, new RegExp(slug));
  }
});

test("publishes the decision-attribution note as a claim-parity bilingual first release", () => {
  assert.match(decisionAttributionNoteSource, /盈亏不是经验/);
  assert.match(decisionAttributionNoteSource, /sourceChannel: [\"']?Lunartulip Lab 官网/);
  assert.match(englishDecisionAttributionNoteSource, /P&L Is Not Experience/);
  assert.match(englishDecisionAttributionNoteSource, /locale: en/);
  assert.match(englishNotesIndexSource, /getAllNotes\("en"\)/);
  assert.match(englishNotePageSource, /translationOfWork/);
  assert.match(notePageSource, /workTranslation/);
  assert.match(sitemapSource, /englishNotes/);
});

test("publishes the Self-Driving Portfolio note with explicit long-term vision", () => {
  assert.match(selfDrivingNoteSource, /Self-Driving Portfolio：AI 投研的真正终点/);
  assert.match(selfDrivingNoteSource, /AI-native Fund 的长期组织形态/);
  assert.match(selfDrivingNoteSource, /未来的资管业务会在匹配的主体、资质和合规框架中展开/);
  assert.match(selfDrivingNoteSource, /Sharpe ratio 为 0\.39，60\/40 基准为 0\.41/);
  assert.match(selfDrivingNoteSource, /https:\/\/arxiv\.org\/abs\/2604\.02279/);
  assert.doesNotMatch(selfDrivingNoteSource, /不是|而是|并非|不再|却|只不过|不只|而非/);
  assert.doesNotMatch(selfDrivingNoteSource, /<empty-block|<br>|Lunartuliup/);
});

test("repositions the Investment Lab note around AI quant and a fund prototype", () => {
  assert.match(tradingLabNoteSource, /AI 量化与基本面融合：一个 AI-native Fund 原型的生长手记/);
  assert.match(tradingLabNoteSource, /updatedAt: 2026-07-29/);
  assert.match(tradingLabNoteSource, /AI4Quant/);
  assert.match(tradingLabNoteSource, /144\.7%/);
  assert.match(tradingLabNoteSource, /73\.3%/);
  assert.match(tradingLabNoteSource, /18\.9%/);
  assert.match(tradingLabNoteSource, /未经第三方审计；历史表现不代表未来结果/);
  assert.doesNotMatch(tradingLabNoteSource, /一人小基金|小账户|全职管理一只|资金实践合作|不过早套上/);
});

test("adds article metadata, structured data and research disclaimer", () => {
  assert.match(notePageSource, /generateMetadata/);
  assert.match(notePageSource, /application\/ld\+json/);
  assert.match(notePageSource, /dateModified: note\.updatedAt \?\? note\.publishedAt/);
  assert.match(notePageSource, /不构成任何投资建议/);
  assert.match(sitemapSource, /getAllNotes/);
  assert.match(sitemapSource, /notes\/\$\{note\.slug\}/);
  assert.match(sitemapSource, /note\.updatedAt \?\? note\.publishedAt/);
});
