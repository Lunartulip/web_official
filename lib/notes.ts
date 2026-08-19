import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type NoteLocale = "zh-CN" | "en";

export type NoteMeta = {
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  slug: string;
  notionId: string;
  sourceChannel: string;
  sourceTitle: string;
  locale: NoteLocale;
};

export type Note = NoteMeta & {
  content: string;
};

const notesDirectory = join(process.cwd(), "content", "notes");
const requiredFields: Array<keyof NoteMeta> = [
  "title",
  "summary",
  "publishedAt",
  "category",
  "slug",
  "notionId",
  "sourceChannel",
  "sourceTitle",
];

function normalizeDate(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readNote(filename: string): Note {
  const source = readFileSync(join(notesDirectory, filename), "utf8");
  const { data, content } = matter(source);
  const metadata = {
    ...data,
    publishedAt: normalizeDate(data.publishedAt),
    updatedAt: data.updatedAt ? normalizeDate(data.updatedAt) : undefined,
    locale: data.locale === "en" ? "en" : "zh-CN",
  } as NoteMeta;

  for (const field of requiredFields) {
    if (!metadata[field]) {
      throw new Error(`${filename} is missing required field "${field}"`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.publishedAt)) {
    throw new Error(`${filename} has an invalid publishedAt date`);
  }

  if (metadata.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.updatedAt)) {
    throw new Error(`${filename} has an invalid updatedAt date`);
  }

  return { ...metadata, content: content.trim() };
}

export function getAllNotes(locale: NoteLocale = "zh-CN"): Note[] {
  return readdirSync(notesDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readNote)
    .filter((note) => note.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNoteBySlug(slug: string, locale: NoteLocale = "zh-CN"): Note | undefined {
  return getAllNotes(locale).find((note) => note.slug === slug);
}

export function formatNoteDate(date: string, locale: NoteLocale = "zh-CN") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(`${date}T00:00:00+08:00`));
}
