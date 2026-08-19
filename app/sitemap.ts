import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";
import { researchObjects } from "@/lib/research-objects";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const englishNotes = getAllNotes("en");
  const latestResearchDate = researchObjects
    .map((item) => item.versions.at(-1)?.date ?? item.publishedAt)
    .sort()
    .at(-1) ?? "2026-08-15";

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
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/notes",
          en: "https://lunartuliplab.com/en/notes",
        },
      },
    },
    {
      url: "https://lunartuliplab.com/en/notes",
      lastModified: englishNotes.length > 0 ? new Date(`${englishNotes[0].updatedAt ?? englishNotes[0].publishedAt}T00:00:00+08:00`) : new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/notes",
          en: "https://lunartuliplab.com/en/notes",
        },
      },
    },
    {
      url: "https://lunartuliplab.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lunartuliplab.com/deep-dive",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/deep-dive",
          en: "https://lunartuliplab.com/en/deep-dive",
        },
      },
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
    ...researchObjects.flatMap((item) => {
      const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
      return [
      {
        url: `https://lunartuliplab.com/deep-dive/${item.slug}`,
        lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            "zh-CN": `https://lunartuliplab.com/deep-dive/${item.slug}`,
            en: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
          },
        },
      },
      {
        url: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
        lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            "zh-CN": `https://lunartuliplab.com/deep-dive/${item.slug}`,
            en: `https://lunartuliplab.com/en/deep-dive/${item.slug}`,
          },
        },
      },
    ];
    }),
    ...notes.flatMap((note) => {
      const englishNote = englishNotes.find((item) => item.slug === note.slug);
      const languages = englishNote
        ? {
            "zh-CN": `https://lunartuliplab.com/notes/${note.slug}`,
            en: `https://lunartuliplab.com/en/notes/${note.slug}`,
          }
        : { "zh-CN": `https://lunartuliplab.com/notes/${note.slug}` };
      const entries: MetadataRoute.Sitemap = [{
        url: `https://lunartuliplab.com/notes/${note.slug}`,
        lastModified: new Date(`${note.updatedAt ?? note.publishedAt}T00:00:00+08:00`),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      }];
      if (englishNote) {
        entries.push({
          url: `https://lunartuliplab.com/en/notes/${note.slug}`,
          lastModified: new Date(`${englishNote.updatedAt ?? englishNote.publishedAt}T00:00:00+08:00`),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: { languages },
        });
      }
      return entries;
    }),
  ];
}
