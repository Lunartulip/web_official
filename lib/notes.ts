import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type NoteMeta = {
  title: string;
  summary: string;
  publishedAt: string;
  category: string;
  slug: string;
  notionId: string;
  sourceChannel: string;
  sourceTitle: string;
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
  } as NoteMeta;

  for (const field of requiredFields) {
    if (!metadata[field]) {
      throw new Error(`${filename} is missing required field "${field}"`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.publishedAt)) {
    throw new Error(`${filename} has an invalid publishedAt date`);
  }

  return { ...metadata, content: content.trim() };
}

export function getAllNotes(): Note[] {
  return readdirSync(notesDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readNote)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNoteBySlug(slug: string): Note | undefined {
  return getAllNotes().find((note) => note.slug === slug);
}

export function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(`${date}T00:00:00+08:00`));
}
