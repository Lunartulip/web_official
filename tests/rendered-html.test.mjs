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
const englishWorkshopSource = await readFile(new URL("../app/en/workshop/page.tsx", import.meta.url), "utf8");
const englishDeskSource = await readFile(new URL("../app/en/desk/page.tsx", import.meta.url), "utf8");
const englishAboutSource = await readFile(new URL("../app/en/about/page.tsx", import.meta.url), "utf8");
const notesIndexSource = await readFile(new URL("../app/notes/page.tsx", import.meta.url), "utf8");
const notePageSource = await readFile(new URL("../app/notes/[slug]/page.tsx", import.meta.url), "utf8");
const selfDrivingNoteSource = await readFile(new URL("../content/notes/self-driving-portfolio-ai-investing.md", import.meta.url), "utf8");
const tradingLabNoteSource = await readFile(new URL("../content/notes/trading-like-pm-lab-notes.md", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const contactSource = await readFile(new URL("../lib/contact.ts", import.meta.url), "utf8");

test("defines every public navigation section", () => {
  for (const id of ["top", "products", "philosophy", "capabilities", "workflow", "direction", "practice", "notes", "contact"]) {
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

test("states the market scope and institutional audience", () => {
  assert.match(pageSource, /全球泛 AI 科技产业链的二级权益研究/);
  assert.match(pageSource, /跨 A 股、美股与港股/);
  assert.match(pageSource, /公募、私募、资管机构与专业家族办公室/);
  assert.match(pageSource, /A-shares \/ U\.S\. \/ Hong Kong/);
});

test("publishes two institutional lanes and a visible Workshop to Desk ladder", () => {
  for (const term of [
    "机构投研系统",
    "AI-native 资管方向",
    "AI-native Research System Workshop",
    "Always-On Research Desk",
    "¥100,000 起",
    "US$15,000",
    "B2B 受邀付费试点",
    "readiness assessment",
    "私有化适配随 Desk 深度进入",
  ]) {
    assert.match(pageSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(pageSource, /href: "\/workshop"/);
  assert.match(pageSource, /href: "\/desk"/);
  assert.doesNotMatch(pageSource, /PATH \/ 0[1-4]|tabCode:|useCases|activeCase/);
  assert.doesNotMatch(pageSource, /B2C|SaaS|自助订阅/);
});

test("publishes a bilingual and compliant Research Desk preview", async () => {
  assert.match(deskPageSource, /canonical: "\/desk"/);
  assert.match(deskPageSource, /"@type": "Service"/);
  assert.match(deskPageSource, /"@type": "FAQPage"/);
  assert.match(deskPreviewSource, /Always-On Research Desk/);
  assert.match(deskPreviewSource, /Change Ledger|CHANGE LEDGER/);
  assert.match(deskPreviewSource, /Hypothesis Board|HYPOTHESIS BOARD/);
  assert.match(deskPreviewSource, /Decision Memory|DECISION MEMORY/);
  assert.match(deskPreviewSource, /Research Desk Demo Request/);
  assert.match(deskPreviewSource, /B2B 受邀付费试点/);
  assert.match(deskPreviewSource, /readiness assessment/);
  assert.match(deskPreviewSource, /customized by coverage, data, cadence, integration and support|定制报价/);
  assert.match(deskPreviewSource, /lunartulip-language/);
  assert.match(deskPreviewSource, /脱敏演示数据/);
  assert.match(deskPreviewSource, /不构成投资建议、基金募集、金融产品推介或收益承诺/);
  assert.doesNotMatch(deskPreviewSource, /命中率|目标价|实盘业绩|paper portfolio/i);
  assert.match(sitemapSource, /lunartuliplab\.com\/desk/);
  for (const screenshot of ["shot-today.webp", "shot-hypotheses.webp", "shot-ledger.webp"]) {
    const file = await stat(new URL(`../public/desk/${screenshot}`, import.meta.url));
    assert.ok(file.size > 50_000);
    assert.match(deskPreviewSource, new RegExp(screenshot.replace(".", "\\.")));
  }
});

test("publishes the fixed-scope six-session Workshop offer", () => {
  assert.match(workshopPageSource, /canonical: "\/workshop"/);
  assert.match(workshopPageSource, /"@type": "Service"/);
  assert.match(workshopPageSource, /"@type": "Offer"/);
  assert.match(workshopPageSource, /"@type": "FAQPage"/);
  assert.match(workshopPageSource, /price: "100000"/);
  assert.match(workshopPageSource, /price: "15000"/);
  for (const term of ["6 个工作 Session", "Hypothesis Card", "Risk Gate", "Decision Memory", "90 天实施路线", "¥100,000 起", "From US$15,000"]) {
    assert.match(workshopPreviewSource, new RegExp(term.replace("$", "\\$")));
  }
  assert.match(workshopPreviewSource, /Research Desk/);
  assert.match(workshopPreviewSource, /readiness assessment/);
});

test("defines a canonical About entity page without a founder", () => {
  assert.match(aboutPageSource, /canonical: "\/about"/);
  assert.match(aboutPageSource, /"@type": "AboutPage"/);
  assert.match(aboutPreviewSource, /Lunartulip Lab/);
  assert.match(aboutPreviewSource, /AI-native 投研系统实验室/);
  assert.match(aboutPreviewSource, /公募、私募、资管机构与专业家族办公室/);
  assert.match(aboutPreviewSource, /OFFICIAL NAME/);
  assert.doesNotMatch(aboutPageSource + aboutPreviewSource, /founder:/);
});

test("ships independent English routes with hreflang counterparts", () => {
  for (const source of [englishHomeSource, englishWorkshopSource, englishDeskSource, englishAboutSource]) {
    assert.match(source, /initialLanguage="en"/);
    assert.match(source, /canonical:/);
  }
  assert.match(englishHomeSource, /languages:/);
  assert.match(englishWorkshopSource, /US\$15,000/);
  assert.match(sitemapSource, /lunartuliplab\.com\/en/);
  assert.match(sitemapSource, /"\/workshop", "\/desk", "\/about"/);
});

test("separates the current mandate from the long-term buy-side vision", () => {
  assert.match(pageSource, /AI-native Fund/);
  assert.match(pageSource, /长期资管方向/);
  assert.match(pageSource, /主观产业研究、量化策略验证、Research Desk、风险约束与 Decision Memory/);
  assert.match(pageSource, /当前对外合作/);
  assert.match(pageSource, /未来资管业务将在相应主体、资质与合规框架完备后独立开展/);
  assert.match(pageSource, /Strategic Institutional Partnership/);
  assert.match(pageSource, /不构成投资建议、基金募集、金融产品推介或收益承诺/);
});

test("publishes machine-readable research topic clusters", () => {
  for (const term of ["AI INVESTMENT RESEARCH", "AI FOR QUANTITATIVE INVESTING", "QUANTAMENTAL INVESTING", "AI-NATIVE FUND", "AGENTIC INVESTMENT RESEARCH"]) {
    assert.match(notesIndexSource, new RegExp(term));
  }
});

test("exposes institutional search intent in site metadata", () => {
  for (const term of ["泛 AI 科技权益研究", "机构 AI 投研系统", "买方决策增强", "buy-side decision augmentation", "Always-On Research Desk"]) {
    assert.match(layoutSource, new RegExp(term));
  }
  assert.match(layoutSource, /knowsAbout/);
  assert.match(layoutSource, /institutional partnerships/);
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
