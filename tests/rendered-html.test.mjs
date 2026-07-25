import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const deskPageSource = await readFile(new URL("../app/desk/page.tsx", import.meta.url), "utf8");
const deskPreviewSource = await readFile(new URL("../app/desk/desk-preview.tsx", import.meta.url), "utf8");
const notePageSource = await readFile(new URL("../app/notes/[slug]/page.tsx", import.meta.url), "utf8");
const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");

test("defines every public navigation section", () => {
  for (const id of ["top", "philosophy", "capabilities", "workflow", "cases", "practice", "notes", "contact"]) {
    assert.match(pageSource, new RegExp(`id=["']${id}["']`));
  }
});

test("keeps language selection persistent and accessible", () => {
  assert.match(pageSource, /lunartulip-language/);
  assert.match(pageSource, /document\.documentElement\.lang/);
  assert.match(pageSource, /aria-pressed=/);
});

test("publishes the official contact and canonical domain", () => {
  assert.match(pageSource, /mailto:t\.stephanie@lunartuliplab\.com/);
  assert.match(layoutSource, /https:\/\/lunartuliplab\.com/);
  assert.match(layoutSource, /canonical:\s*["']\/["']/);
});

test("states the market scope and institutional audience", () => {
  assert.match(pageSource, /全球泛 AI 科技产业链的二级权益研究/);
  assert.match(pageSource, /跨 A 股、美股与港股/);
  assert.match(pageSource, /公募、私募、资管机构与专业家族办公室/);
  assert.match(pageSource, /A-shares \/ U\.S\. \/ Hong Kong/);
});

test("integrates Research Desk into the second of three institutional paths", () => {
  for (const path of [
    "投研系统诊断与 Workshop",
    "泛 AI 科技专题共研 × Always-On Research Desk",
    "AI-native 决策系统咨询与私有化适配",
  ]) {
    assert.match(pageSource, new RegExp(path.replace("/", "\\/")));
  }
  assert.match(pageSource, /适合对象/);
  assert.match(pageSource, /合作起点/);
  assert.match(pageSource, /主要交付物/);
  assert.match(pageSource, /数据与技术生态合作/);
  assert.match(pageSource, /index: "PATH \/ 02"/);
  assert.match(pageSource, /index: "PATH \/ 03"/);
  assert.doesNotMatch(pageSource, /index: "PATH \/ 04"/);
  assert.doesNotMatch(pageSource, /id: "desk"|PRODUCT \/ L2|tabCode: "L2"|订阅方式|by subscription/);
  assert.match(pageSource, /Research Desk Demo Request/);
  assert.match(pageSource, /查看产品演示 · View Demo/);
  assert.match(pageSource, /ctaHref: "\/desk"/);
  assert.match(pageSource, /研究协作与受邀试点，不构成投资建议/);
});

test("publishes a bilingual and compliant Research Desk preview", () => {
  assert.match(deskPageSource, /canonical: "\/desk"/);
  assert.match(deskPreviewSource, /Always-On Research Desk/);
  assert.match(deskPreviewSource, /Change Ledger|CHANGE LEDGER/);
  assert.match(deskPreviewSource, /Hypothesis Board|HYPOTHESIS BOARD/);
  assert.match(deskPreviewSource, /Decision Memory|DECISION MEMORY/);
  assert.match(deskPreviewSource, /Research Desk Demo Request/);
  assert.match(deskPreviewSource, /lunartulip-language/);
  assert.match(deskPreviewSource, /脱敏演示数据/);
  assert.match(deskPreviewSource, /不构成投资建议、基金募集、金融产品推介或收益承诺/);
  assert.doesNotMatch(deskPreviewSource, /命中率|目标价|实盘业绩|paper portfolio/i);
  assert.match(sitemapSource, /lunartuliplab\.com\/desk/);
});

test("separates the current mandate from the long-term buy-side vision", () => {
  assert.match(pageSource, /From Decision Augmentation/);
  assert.match(pageSource, /AI-native Buy-side Prototype/);
  assert.match(pageSource, /当前对外合作/);
  assert.match(pageSource, /未来资管业务将在相应主体、资质与合规框架完备后独立开展/);
  assert.match(pageSource, /不构成投资建议、基金募集、金融产品推介或收益承诺/);
});

test("exposes institutional search intent in site metadata", () => {
  for (const term of ["泛 AI 科技权益研究", "机构 AI 投研系统", "买方决策增强", "buy-side decision augmentation", "Always-On Research Desk"]) {
    assert.match(layoutSource, new RegExp(term));
  }
  assert.match(layoutSource, /knowsAbout/);
  assert.match(layoutSource, /institutional partnerships/);
});

test("ships the LunarTulip brand artwork", async () => {
  const artwork = await stat(new URL("../public/lunartulip-silver-emblem.png", import.meta.url));
  const favicon = await stat(new URL("../public/favicon.svg", import.meta.url));
  assert.ok(artwork.size > 10_000);
  assert.ok(favicon.size > 100);
});

test("publishes the first twelve research notes from the homepage", async () => {
  const noteFiles = (await readdir(new URL("../content/notes/", import.meta.url))).filter((file) => file.endsWith(".md"));
  assert.equal(noteFiles.length, 12);
  for (const file of noteFiles) {
    const slug = file.replace(/\.md$/, "");
    assert.match(pageSource, new RegExp(slug));
  }
});

test("adds article metadata, structured data and research disclaimer", () => {
  assert.match(notePageSource, /generateMetadata/);
  assert.match(notePageSource, /application\/ld\+json/);
  assert.match(notePageSource, /不构成任何投资建议/);
  assert.match(sitemapSource, /getAllNotes/);
  assert.match(sitemapSource, /notes\/\$\{note\.slug\}/);
});
