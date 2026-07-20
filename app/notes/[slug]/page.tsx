import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatNoteDate, getAllNotes, getNoteBySlug } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      url: `/notes/${note.slug}`,
      publishedTime: note.publishedAt,
      authors: ["LunarTulip Lab"],
      tags: [note.category, "AI-native research", "buy-side decision systems"],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.summary,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const relatedNotes = getAllNotes()
    .filter((item) => item.category === note.category && item.slug !== note.slug)
    .slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    datePublished: note.publishedAt,
    dateModified: note.publishedAt,
    inLanguage: "zh-CN",
    mainEntityOfPage: `https://lunartuliplab.com/notes/${note.slug}`,
    author: {
      "@type": "Organization",
      name: "LunarTulip Lab",
      url: "https://lunartuliplab.com",
    },
    publisher: {
      "@type": "Organization",
      name: "LunarTulip Lab",
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
        <Link className="brand" href="/">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <Link className="research-header-link" href="/notes">全部手札</Link>
      </header>

      <article className="research-article">
        <header className="article-heading">
          <Link className="article-back" href="/notes">← RESEARCH NOTES</Link>
          <p className="article-category">{note.category}</p>
          <h1>{note.title}</h1>
          <p className="article-deck">{note.summary}</p>
          <div className="article-byline">
            <span>LUNARTULIP LAB</span>
            <time dateTime={note.publishedAt}>{formatNoteDate(note.publishedAt)}</time>
            <span>首发于{note.sourceChannel}</span>
          </div>
        </header>

        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
        </div>

        <aside className="research-disclaimer" aria-label="研究声明">
          <strong>研究声明</strong>
          <p>本文仅供研究交流与方法论讨论，不构成任何投资建议、投资咨询、收益承诺或交易依据。市场有风险，决策需独立审慎。</p>
        </aside>
      </article>

      {relatedNotes.length > 0 && (
        <section className="related-notes" aria-labelledby="related-notes-title">
          <p className="section-index">CONTINUE READING</p>
          <h2 id="related-notes-title">继续阅读</h2>
          <div>
            {relatedNotes.map((item) => (
              <Link href={`/notes/${item.slug}`} key={item.slug}>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="research-footer">
        <Link className="brand footer-brand" href="/">LUNARTULIP LAB</Link>
        <a href="mailto:t.stephanie@lunartuliplab.com">t.stephanie@lunartuliplab.com</a>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
    </main>
  );
}
