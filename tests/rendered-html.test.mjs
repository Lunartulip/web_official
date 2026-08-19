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
const researchCatalogSource = await readFile(new URL("../content/research-objects/catalog.json", import.meta.url), "utf8");
const researchTypesSource = await readFile(new URL("../lib/research-objects/types.ts", import.meta.url), "utf8");
const researchValidatorSource = await readFile(new URL("../scripts/validate-research-objects.mjs", import.meta.url), "utf8");
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
const proxySource = await readFile(new URL("../proxy.ts", import.meta.url), "utf8");

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
  assert.match(researchValidatorSource, /locale claim parity failed/);
  assert.doesNotMatch(researchCatalogSource, /成交价|建仓纪律|回调至 \$|介入时点|目标价位/);
  assert.doesNotMatch(researchCatalogSource, /DESK_DEEP_DIVE|HYP010|deepdive\.md|外发闸门|approved/i);
});

test("renders the Authority Ledger from a generated data projection with visible methodology", () => {
  for (const term of [
    '"as_of": "\\d{4}-\\d{2}-\\d{2}"',
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
    "索取机构样章",
    "申请 Institutional Research Access",
    "Commissioned Deep Dive / Theme Mandate",
    "6-Session AI-native Research System Diagnostic",
    "¥100,000 起 / US$15,000 起",
  ]) {
    assert.match(accessPageSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(accessPageSource, /机构 × Coverage Track × 固定周期/);
  assert.match(accessPageSource, /不要提交持仓、交易凭证、账户信息/);
  assert.doesNotMatch(accessPageSource, /¥1,200|RMB 1,200|L1 \/ MEMBER|≥L2 \/ NOT OPEN|INTERNAL \/ NEVER SOLD|checkout|credit card|payment provider/i);
});

test("ships a validated, attributed SMTP institutional inquiry flow", () => {
  for (const term of ["sample_request", "research_access", "commissioned_mandate", "research_system_diagnostic"]) {
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
  assert.match(englishResearchFeedSource, /application\/rss\+xml/);
  assert.match(englishResearchFeedSource, /item\.id}@\$\{item\.version/);
  assert.match(sitemapSource, /researchObjects/);
  assert.match(sitemapSource, /alternates:/);
  assert.match(deepDiveArticleSource, /hrefLang=/);
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
