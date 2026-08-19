import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "@/lib/contact";
import { formatNoteDate, getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Lunartulip Lab research notes on AI-native investing, buy-side decision systems, fundamental research and systematic validation.",
  alternates: {
    canonical: "/en/notes",
    languages: { "zh-CN": "/notes", en: "/en/notes" },
  },
  openGraph: {
    title: "Research Notes | Lunartulip Lab",
    description: "Public research on AI-native investing and institutional decision systems.",
    url: "/en/notes",
    type: "website",
  },
};

const researchTopics = [
  { term: "AI INVESTMENT RESEARCH", title: "AI Investment Research", definition: "How AI enters institutional information processing, evidence tracking, thesis revision and research production." },
  { term: "AI FOR QUANTITATIVE INVESTING", title: "AI for Quantitative Investing", definition: "How agents, code generation and machine learning reshape factor research, strategy validation and quantitative engineering." },
  { term: "QUANTAMENTAL INVESTING", title: "Quantamental Investing", definition: "How industry understanding, discretionary theses and quantitative discipline operate in one portfolio decision language." },
  { term: "AI-NATIVE FUND", title: "AI-Native Fund", definition: "The long-term institutional form that connects research, validation, risk, decision memory and NAV feedback." },
  { term: "AGENTIC INVESTMENT RESEARCH", title: "Agentic Investment Research", definition: "How orchestrated, auditable and traceable agent workflows become buy-side research infrastructure." },
];

export default function EnglishNotesPage() {
  const notes = getAllNotes("en");

  return (
    <main className="notes-site">
      <header className="research-header">
        <Link className="brand" href="/en">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <nav className="research-header-nav">
          <Link className="research-header-link" href="/notes" hrefLang="zh-CN">中文</Link>
          <Link className="research-header-link" href="/en">Back to site</Link>
        </nav>
      </header>

      <section className="notes-archive-hero">
        <p className="section-index">RESEARCH NOTES / ARCHIVE</p>
        <h1>Research methods, system practice and long-horizon thinking</h1>
        <p>Research on AI-native investing, discretionary fundamentals, systematic validation and institutional decision systems. Company and industry studies live in Deep Dive; historical calls are aggregated in the Authority Ledger.</p>
        <div className="notes-archive-actions">
          <Link href="/en/deep-dive">Explore Deep Dive ↗</Link>
          <Link href="/en/authority-ledger">View Authority Ledger ↗</Link>
        </div>
      </section>

      <section className="research-topics" aria-label="Research topic clusters">
        {researchTopics.map((topic, index) => (
          <article key={topic.term}>
            <small>0{index + 1} / {topic.term}</small>
            <h2>{topic.title}</h2>
            <p>{topic.definition}</p>
          </article>
        ))}
      </section>

      <section className="notes-archive" aria-label="Research note articles">
        {notes.map((note, index) => (
          <article className="note-entry" key={note.slug}>
            <div className="note-entry-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time dateTime={note.publishedAt}>{formatNoteDate(note.publishedAt, "en")}</time>
            </div>
            <div className="note-entry-copy">
              <p>{note.category}</p>
              <h2><Link href={`/en/notes/${note.slug}`}>{note.title}</Link></h2>
              <div>{note.summary}</div>
            </div>
            <Link className="note-entry-arrow" href={`/en/notes/${note.slug}`} aria-label={`Read “${note.title}”`}>
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>

      <footer className="research-footer">
        <Link className="brand footer-brand" href="/en">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <a href={institutionalMailto({ source: "NOTES_INDEX_EN", topic: "Research Notes inquiry", language: "en" })}>{INSTITUTIONAL_EMAIL}</a>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
    </main>
  );
}
