import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

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

test("ships the LunarTulip brand artwork", async () => {
  const artwork = await stat(new URL("../public/lunartulip-silver-emblem.png", import.meta.url));
  const favicon = await stat(new URL("../public/favicon.svg", import.meta.url));
  assert.ok(artwork.size > 10_000);
  assert.ok(favicon.size > 100);
});
