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

assert.equal(files.length, 12, "The first research-notes release must contain 12 articles");

for (const file of files) {
  const source = await readFile(path.join(notesDirectory, file), "utf8");
  const { data, content } = matter(source);
  const publishedAt = data.publishedAt instanceof Date
    ? data.publishedAt.toISOString().slice(0, 10)
    : String(data.publishedAt);

  for (const field of requiredFields) {
    assert.ok(data[field], `${file}: missing ${field}`);
  }

  assert.match(publishedAt, /^\d{4}-\d{2}-\d{2}$/, `${file}: invalid publishedAt`);
  assert.equal(file, `${data.slug}.md`, `${file}: filename must match slug`);
  assert.ok(!seenSlugs.has(data.slug), `${file}: duplicate slug ${data.slug}`);
  assert.ok(!seenNotionIds.has(data.notionId), `${file}: duplicate notionId ${data.notionId}`);
  assert.ok(data.summary.length >= 60 && data.summary.length <= 120, `${file}: summary should be 60–120 characters`);
  assert.ok(pageSource.includes(data.slug), `${file}: homepage does not reference this article slug`);
  assert.doesNotMatch(content, /<empty-block|prod-files-secure|【[^】]*截图】|好，直接给你|已深度思考/, `${file}: contains editorial residue`);

  seenSlugs.add(data.slug);
  seenNotionIds.add(data.notionId);
}

console.log(`Validated ${files.length} research notes.`);
