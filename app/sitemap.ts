import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";
import { deepDives } from "@/lib/deep-dives";

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
      lastModified: notes.length > 0 ? new Date(`${notes[0].updatedAt ?? notes[0].publishedAt}T00:00:00+08:00`) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://lunartuliplab.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lunartuliplab.com/deep-dive",
      lastModified: new Date("2026-08-08T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lunartuliplab.com/authority-ledger",
      lastModified: new Date("2026-08-13T00:00:00+08:00"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://lunartuliplab.com/institutional-access",
      lastModified: new Date("2026-08-13T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://lunartuliplab.com/desk",
      lastModified: new Date("2026-08-13T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...["", "/about", "/deep-dive", "/authority-ledger", "/desk", "/institutional-access"].map((path, index) => ({
      url: `https://lunartuliplab.com/en${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: index === 0 ? 0.9 : 0.75,
    })),
    ...deepDives.flatMap((item) => [
      {
        url: `https://lunartuliplab.com/deep-dive/${item.slug}`,
        lastModified: new Date("2026-08-08T00:00:00+08:00"),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
        lastModified: new Date("2026-08-08T00:00:00+08:00"),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]),
    ...notes.map((note) => ({
      url: `https://lunartuliplab.com/notes/${note.slug}`,
      lastModified: new Date(`${note.updatedAt ?? note.publishedAt}T00:00:00+08:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
