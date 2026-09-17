import type { MetadataRoute } from "next";
import authoritySummary from "@/data/authority/calls_kpi_summary.json";
import { getAllNotes } from "@/lib/notes";
import { researchObjects } from "@/lib/research-objects";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const englishNotes = getAllNotes("en");
  const alphaMapObjects = researchObjects.filter((item) => String(item.kind) === "alphamap-study");
  const deepDiveObjects = researchObjects.filter((item) => String(item.kind) !== "alphamap-study");
  const latestResearchDate = researchObjects
    .map((item) => item.versions.at(-1)?.date ?? item.publishedAt)
    .sort()
    .at(-1) ?? "2026-08-15";
  const latestAlphaMapDate = alphaMapObjects
    .map((item) => item.versions.at(-1)?.date ?? item.publishedAt)
    .sort()
    .at(-1) ?? latestResearchDate;

  return [
    {
      url: "https://lunartuliplab.com",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
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
      lastModified: new Date("2026-08-13T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lunartuliplab.com/deep-dive",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/deep-dive",
          en: "https://lunartuliplab.com/en/deep-dive",
        },
      },
    },
    {
      url: "https://lunartuliplab.com/alphamap",
      lastModified: new Date(`${latestAlphaMapDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/alphamap",
          en: "https://lunartuliplab.com/en/alphamap",
        },
      },
    },
    {
      url: "https://lunartuliplab.com/authority-ledger",
      lastModified: new Date(`${authoritySummary.generated_at}T00:00:00+08:00`),
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
    {
      url: "https://lunartuliplab.com/workshop",
      lastModified: new Date("2026-09-14T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "zh-CN": "https://lunartuliplab.com/workshop",
          en: "https://lunartuliplab.com/en/workshop",
        },
      },
    },
    {
      url: "https://lunartuliplab.com/research.json",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: "https://lunartuliplab.com/research-usage",
      lastModified: new Date("2026-09-17T00:00:00+08:00"),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: "https://lunartuliplab.com/llms.txt",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.55,
    },
    {
      url: "https://lunartuliplab.com/llms-full.txt",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://lunartuliplab.com/deep-dive/feed.xml",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://lunartuliplab.com/en/deep-dive/feed.xml",
      lastModified: new Date(`${latestResearchDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://lunartuliplab.com/alphamap/feed.xml",
      lastModified: new Date(`${latestAlphaMapDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://lunartuliplab.com/en/alphamap/feed.xml",
      lastModified: new Date(`${latestAlphaMapDate}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://lunartuliplab.com/authority-ledger/data.json",
      lastModified: new Date(`${authoritySummary.generated_at}T00:00:00+08:00`),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...[
      { path: "", modified: latestResearchDate },
      { path: "/about", modified: "2026-08-13" },
      { path: "/deep-dive", modified: latestResearchDate },
      { path: "/alphamap", modified: latestAlphaMapDate },
      { path: "/authority-ledger", modified: authoritySummary.generated_at },
      { path: "/desk", modified: "2026-08-13" },
      { path: "/workshop", modified: "2026-09-14" },
      { path: "/institutional-access", modified: "2026-09-14" },
    ].map((entry, index) => ({
      url: `https://lunartuliplab.com/en${entry.path}`,
      lastModified: new Date(`${entry.modified}T00:00:00+08:00`),
      changeFrequency: entry.path === "/deep-dive" || entry.path === "/alphamap" ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 0.9 : 0.75,
    })),
    ...deepDiveObjects.flatMap((item) => {
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
      {
        url: `https://lunartuliplab.com/research/${item.slug}`,
        lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
        changeFrequency: "monthly" as const,
        priority: 0.55,
      },
    ];
    }),
    ...alphaMapObjects.flatMap((item) => {
      const modifiedAt = item.versions.at(-1)?.date ?? item.publishedAt;
      const languages = {
        "zh-CN": `https://lunartuliplab.com/alphamap/${item.slug}`,
        en: `https://lunartuliplab.com/en/alphamap/${item.slug}`,
      };
      return [
        {
          url: languages["zh-CN"],
          lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: { languages },
        },
        {
          url: languages.en,
          lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: { languages },
        },
        {
          url: `https://lunartuliplab.com/research/${item.slug}`,
          lastModified: new Date(`${modifiedAt}T00:00:00+08:00`),
          changeFrequency: "monthly" as const,
          priority: 0.55,
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
