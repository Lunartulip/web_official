import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();

  return [
    {
      url: "https://lunartuliplab.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://lunartuliplab.com/notes",
      lastModified: notes.length > 0 ? new Date(`${notes[0].publishedAt}T00:00:00+08:00`) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://lunartuliplab.com/desk",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...notes.map((note) => ({
      url: `https://lunartuliplab.com/notes/${note.slug}`,
      lastModified: new Date(`${note.publishedAt}T00:00:00+08:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
