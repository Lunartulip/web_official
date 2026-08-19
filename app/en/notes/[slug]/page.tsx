import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "@/lib/contact";
import { formatNoteDate, getAllNotes, getNoteBySlug } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes("en").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug, "en");
  if (!note) return {};

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/en/notes/${note.slug}`,
      languages: {
        "zh-CN": `/notes/${note.slug}`,
        en: `/en/notes/${note.slug}`,
      },
    },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      url: `/en/notes/${note.slug}`,
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt ?? note.publishedAt,
      authors: ["Lunartulip Lab"],
      tags: [note.category, "AI-native investing", "buy-side decision systems"],
      locale: "en_US",
      alternateLocale: ["zh_CN"],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.summary,
    },
  };
}

export default async function EnglishNotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug, "en");
  if (!note) notFound();

  const relatedNotes = getAllNotes("en")
    .filter((item) => item.category === note.category && item.slug !== note.slug)
    .slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    datePublished: note.publishedAt,
    dateModified: note.updatedAt ?? note.publishedAt,
    inLanguage: "en",
    mainEntityOfPage: `https://lunartuliplab.com/en/notes/${note.slug}`,
    translationOfWork: {
      "@type": "Article",
      inLanguage: "zh-CN",
      url: `https://lunartuliplab.com/notes/${note.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "Lunartulip Lab",
      url: "https://lunartuliplab.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Lunartulip Lab",
      url: "https://lunartuliplab.com",
      logo: {
        "@type": "ImageObject",
        url: "https://lunartuliplab.com/lunartulip-silver-emblem.png",
      },
    },
  };

  return (
    <main className="notes-site article-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <header className="research-header">
        <Link className="brand" href="/en">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <nav className="research-header-nav">
          <Link className="research-header-link" href={`/notes/${note.slug}`} hrefLang="zh-CN">中文</Link>
          <Link className="research-header-link" href="/en/notes">All notes</Link>
        </nav>
      </header>

      <article className="research-article">
        <header className="article-heading">
          <Link className="article-back" href="/en/notes">← RESEARCH NOTES</Link>
          <p className="article-category">{note.category}</p>
          <h1>{note.title}</h1>
          <p className="article-deck">{note.summary}</p>
          <div className="article-byline">
            <span>LUNARTULIP LAB</span>
            <time dateTime={note.publishedAt}>{formatNoteDate(note.publishedAt, "en")}</time>
            {note.updatedAt && <span>Updated {formatNoteDate(note.updatedAt, "en")}</span>}
            <span>First published on {note.sourceChannel}</span>
          </div>
        </header>

        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
        </div>

        <aside className="research-disclaimer" aria-label="Research disclaimer">
          <strong>Research disclaimer</strong>
          <p>This article is for research and methodological discussion only. It is not investment advice, investment consulting, a promise of returns or a basis for trading decisions.</p>
        </aside>
      </article>

      {relatedNotes.length > 0 && (
        <section className="related-notes" aria-labelledby="related-notes-title">
          <p className="section-index">CONTINUE READING</p>
          <h2 id="related-notes-title">Continue reading</h2>
          <div>
            {relatedNotes.map((item) => (
              <Link href={`/en/notes/${item.slug}`} key={item.slug}>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="research-footer">
        <Link className="brand footer-brand" href="/en">LUNARTULIP LAB</Link>
        <a href={institutionalMailto({ source: "NOTE_DETAIL_EN", topic: note.title, language: "en" })}>{INSTITUTIONAL_EMAIL}</a>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
    </main>
  );
}
