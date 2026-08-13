import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const deskPageSource = await readFile(new URL("../app/desk/page.tsx", import.meta.url), "utf8");
const deskPreviewSource = await readFile(new URL("../app/desk/desk-preview.tsx", import.meta.url), "utf8");
const workshopPageSource = await readFile(new URL("../app/workshop/page.tsx", import.meta.url), "utf8");
const aboutPageSource = await readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8");
const aboutPreviewSource = await readFile(new URL("../app/about/about-preview.tsx", import.meta.url), "utf8");
const englishHomeSource = await readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8");
const englishAboutSource = await readFile(new URL("../app/en/about/page.tsx", import.meta.url), "utf8");
const deepDiveIndexSource = await readFile(new URL("../app/deep-dive/deep-dive-index.tsx", import.meta.url), "utf8");
const deepDiveArticleSource = await readFile(new URL("../app/deep-dive/deep-dive-article.tsx", import.meta.url), "utf8");
const deepDivePageSource = await readFile(new URL("../app/deep-dive/[slug]/page.tsx", import.meta.url), "utf8");
const deepDiveDataSource = await readFile(new URL("../lib/deep-dives.ts", import.meta.url), "utf8");
const authorityPageSource = await readFile(new URL("../app/authority-ledger/page.tsx", import.meta.url), "utf8");
const authorityViewSource = await readFile(new URL("../app/authority-ledger/authority-ledger.tsx", import.meta.url), "utf8");
const authorityDataSource = await readFile(new URL("../data/authority/calls_kpi_summary.json", import.meta.url), "utf8");
const accessPageSource = await readFile(new URL("../app/institutional-access/institutional-access.tsx", import.meta.url), "utf8");
const englishDeepDiveSource = await readFile(new URL("../app/en/deep-dive/page.tsx", import.meta.url), "utf8");
const englishAuthoritySource = await readFile(new URL("../app/en/authority-ledger/page.tsx", import.meta.url), "utf8");
const englishAccessSource = await readFile(new URL("../app/en/institutional-access/page.tsx", import.meta.url), "utf8");
const englishDeskSource = await readFile(new URL("../app/en/desk/page.tsx", import.meta.url), "utf8");
const notesIndexSource = await readFile(new URL("../app/notes/page.tsx", import.meta.url), "utf8");
const notePageSource = await readFile(new URL("../app/notes/[slug]/page.tsx", import.meta.url), "utf8");
const selfDrivingNoteSource = await readFile(new URL("../content/notes/self-driving-portfolio-ai-investing.md", import.meta.url), "utf8");
const tradingLabNoteSource = await readFile(new URL("../content/notes/trading-like-pm-lab-notes.md", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const contactSource = await readFile(new URL("../lib/contact.ts", import.meta.url), "utf8");

test("defines every public navigation section", () => {
  for (const id of ["top", "research", "philosophy", "capabilities", "workflow", "direction", "practice", "notes", "contact"]) {
    assert.match(pageSource, new RegExp(`id=["']${id}["']`));
  }
});

test("keeps language selection persistent and accessible", () => {
  assert.match(pageSource, /lunartulip-language/);
  assert.match(pageSource, /document\.documentElement\.lang/);
  assert.match(pageSource, /aria-pressed=/);
});

test("publishes the official contact and canonical domain", () => {
  assert.match(pageSource, /institutionalMailto/);
  assert.match(contactSource, /t\.stephanie@lunartuliplab\.com/);
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

test("publishes two research engines and proof surfaces instead of a product ladder", () => {
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
  assert.doesNotMatch(pageSource, /href: "\/workshop"|href: "\/desk"|¥100,000 起|US\$15,000|B2B 受邀付费试点/);
});

test("publishes two versioned Deep Dive research objects", () => {
  for (const term of [
    "palantir-ai-application-commercialization-2026q2",
    "cloudflare-atlassian-ai-application-commercialization-2026q2",
    "2026-08-08 corrected",
    "VERSIONED RESEARCH",
    "UPDATE HISTORY",
  ]) {
    assert.match(deepDiveDataSource + deepDiveArticleSource, new RegExp(term));
  }
  assert.match(deepDiveIndexSource, /每篇研究，都有明确问题和更新路径/);
  for (const term of [
    "市场共识",
    "差异化判断",
    "价值如何一步步穿过收入表",
    "未来一至两个季度，市场会验收什么",
    "monetization density",
    "agent coordination / context",
  ]) {
    assert.match(deepDiveDataSource + deepDiveArticleSource, new RegExp(term));
  }
  assert.match(deepDivePageSource, /"@type": "ScholarlyArticle"/);
  assert.match(deepDivePageSource, /dateModified: "2026-08-08"/);
  assert.doesNotMatch(deepDiveDataSource, /成交价|建仓纪律|回调至 \$|介入时点|目标价位/);
  assert.doesNotMatch(deepDiveDataSource, /DESK_DEEP_DIVE|HYP010|deepdive\.md|外发闸门|approved/i);
});

test("renders the Authority Ledger from a generated data projection with visible methodology", () => {
  for (const term of [
    '"as_of": "2026-08-03"',
    '"settled": 46',
    '"hit_rate": 0.4516',
    '"win_loss_ratio_hm_only": 1.56',
    '"evidence_link_rate": 1',
  ]) {
    assert.match(authorityDataSource, new RegExp(term));
  }
  assert.match(authorityPageSource, /"@type": "Dataset"/);
  assert.match(englishAuthoritySource, /"@type": "Dataset"/);
  assert.match(authorityViewSource, /当前已裁决样本来自历史重构区间/);
  assert.match(authorityViewSource, /方向性命中率 = hit \/ \(hit \+ miss\)/);
  assert.match(authorityViewSource, /回溯期与纪律期独立列示/);
});

test("retires Workshop sales while publishing Desk as a research workspace", () => {
  assert.match(workshopPageSource, /redirect\("\/institutional-access"\)/);
  assert.match(workshopPageSource, /index: false, follow: false/);
  assert.doesNotMatch(sitemapSource, /lunartuliplab\.com\/workshop/);
  assert.match(sitemapSource, /lunartuliplab\.com\/desk/);
  assert.match(deskPageSource, /Always-On Research Desk/);
  for (const term of [
    "AI-NATIVE RESEARCH & DECISION WORKSPACE",
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
  ]) {
    assert.match(deskPreviewSource, new RegExp(term.replace(/[×/]/g, "\\$&")));
  }
  assert.doesNotMatch(deskPreviewSource, /付费试点|预约演示|Request demo|如何报价|price:/i);
  assert.doesNotMatch(deskPageSource + deskPreviewSource, /"@type": "Service"|"@type": "Offer"/i);
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
  for (const source of [englishHomeSource, englishAboutSource, englishDeepDiveSource, englishAuthoritySource, englishAccessSource, englishDeskSource]) {
    assert.match(source, /canonical:/);
  }
  assert.match(englishHomeSource + englishAboutSource, /initialLanguage="en"/);
  assert.match(englishDeepDiveSource + englishAuthoritySource + englishAccessSource, /language="en"/);
  assert.match(englishHomeSource, /languages:/);
  assert.match(sitemapSource, /lunartuliplab\.com\/en/);
  assert.match(sitemapSource, /"\/about", "\/deep-dive", "\/authority-ledger", "\/desk", "\/institutional-access"/);
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
    "研究样章与结果记录",
    "交易日研究简报",
    "公司与产业深度研究",
    "双引擎研究系统方法",
    "选择适合团队的研究入口",
  ]) {
    assert.match(accessPageSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(accessPageSource, /具体范围、频率与信息边界根据研究目标共同确认/);
  assert.doesNotMatch(accessPageSource, /¥1,200|RMB 1,200|L1 \/ MEMBER|≥L2 \/ NOT OPEN|INTERNAL \/ NEVER SOLD|checkout|credit card|payment provider/i);
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
  assert.match(layoutSource, /institutional research exchange/);
});

test("defines a canonical Lunartulip organization and website entity", () => {
  assert.match(layoutSource, /"@type": "Organization"/);
  assert.match(layoutSource, /"@type": "WebSite"/);
  assert.match(layoutSource, /"@id": "https:\/\/lunartuliplab\.com\/#organization"/);
  assert.match(layoutSource, /"@id": "https:\/\/lunartuliplab\.com\/#website"/);
  assert.match(layoutSource, /name: "Lunartulip Lab"/);
  assert.match(layoutSource, /alternateName: \["LunarTulip Lab", "Lunar Tulip Lab"\]/);
  assert.match(layoutSource, /publisher: \{\s*"@id": "https:\/\/lunartuliplab\.com\/#organization"/);
  assert.doesNotMatch(layoutSource, /founder:/);
});

test("ships the LunarTulip brand artwork", async () => {
  const artwork = await stat(new URL("../public/lunartulip-silver-emblem.png", import.meta.url));
  const favicon = await stat(new URL("../public/favicon.svg", import.meta.url));
  assert.ok(artwork.size > 10_000);
  assert.ok(favicon.size > 100);
});

test("publishes all thirteen research notes from the homepage", async () => {
  const noteFiles = (await readdir(new URL("../content/notes/", import.meta.url))).filter((file) => file.endsWith(".md"));
  assert.equal(noteFiles.length, 13);
  for (const file of noteFiles) {
    const slug = file.replace(/\.md$/, "");
    assert.match(pageSource, new RegExp(slug));
  }
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
