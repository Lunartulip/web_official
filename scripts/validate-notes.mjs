import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const notesDirectory = path.join(root, "content", "notes");
const files = (await readdir(notesDirectory)).filter((file) => file.endsWith(".md"));
const pageSource = await readFile(path.join(root, "app", "page.tsx"), "utf8");
const seenSlugs = new Set();
const seenNotionIds = new Set();
const requiredFields = ["title", "summary", "publishedAt", "category", "slug", "notionId", "sourceChannel", "sourceTitle"];

assert.equal(files.length, 15, "The research-notes archive must contain 14 Chinese articles and 1 English edition");

for (const file of files) {
  const source = await readFile(path.join(notesDirectory, file), "utf8");
  const { data, content } = matter(source);
  const locale = data.locale === "en" ? "en" : "zh-CN";
  const editionKey = `${locale}:${data.slug}`;
  const publishedAt = data.publishedAt instanceof Date
    ? data.publishedAt.toISOString().slice(0, 10)
    : String(data.publishedAt);
  const updatedAt = data.updatedAt instanceof Date
    ? data.updatedAt.toISOString().slice(0, 10)
    : data.updatedAt ? String(data.updatedAt) : undefined;

  for (const field of requiredFields) {
    assert.ok(data[field], `${file}: missing ${field}`);
  }

  assert.match(publishedAt, /^\d{4}-\d{2}-\d{2}$/, `${file}: invalid publishedAt`);
  if (updatedAt) {
    assert.match(updatedAt, /^\d{4}-\d{2}-\d{2}$/, `${file}: invalid updatedAt`);
    assert.ok(updatedAt >= publishedAt, `${file}: updatedAt must not precede publishedAt`);
  }
  assert.equal(file, `${data.slug}${locale === "en" ? ".en" : ""}.md`, `${file}: filename must match slug and locale`);
  assert.ok(!seenSlugs.has(editionKey), `${file}: duplicate ${editionKey}`);
  assert.ok(!seenNotionIds.has(`${locale}:${data.notionId}`), `${file}: duplicate notionId within ${locale}`);
  assert.ok(data.summary.length >= 60 && data.summary.length <= 180, `${file}: summary should be 60–180 characters`);
  assert.ok(pageSource.includes(data.slug), `${file}: homepage does not reference this article slug`);
  assert.doesNotMatch(content, /<empty-block|prod-files-secure|【[^】]*截图】|好，直接给你|已深度思考|占位/, `${file}: contains editorial residue`);

  seenSlugs.add(editionKey);
  seenNotionIds.add(`${locale}:${data.notionId}`);
}

assert.ok(seenSlugs.has("zh-CN:decision-attribution-after-self-driving-portfolio"), "missing Chinese decision-attribution note");
assert.ok(seenSlugs.has("en:decision-attribution-after-self-driving-portfolio"), "missing English decision-attribution note");

console.log(`Validated ${files.length} research notes.`);
