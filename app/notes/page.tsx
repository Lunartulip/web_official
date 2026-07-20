import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatNoteDate, getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "研究手札",
  description: "LunarTulip Lab 关于 AI 原生主动管理、买方决策系统、量化基本面与系统建造的公开研究档案。",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "研究手札 | LunarTulip Lab",
    description: "持续写下正在形成的判断：从方法论、决策系统到真实建造过程。",
    url: "/notes",
    type: "website",
  },
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="notes-site">
      <header className="research-header">
        <Link className="brand" href="/">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <Link className="research-header-link" href="/#notes">返回官网</Link>
      </header>

      <section className="notes-archive-hero">
        <p className="section-index">RESEARCH NOTES / ARCHIVE</p>
        <h1>持续写下正在形成的判断</h1>
        <p>从 AI 原生主动管理、买方决策系统到真实建造过程，构成 LunarTulip 的公开研究档案。</p>
      </section>

      <section className="notes-archive" aria-label="研究手札文章">
        {notes.map((note, index) => (
          <article className="note-entry" key={note.slug}>
            <div className="note-entry-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time dateTime={note.publishedAt}>{formatNoteDate(note.publishedAt)}</time>
            </div>
            <div className="note-entry-copy">
              <p>{note.category}</p>
              <h2><Link href={`/notes/${note.slug}`}>{note.title}</Link></h2>
              <div>{note.summary}</div>
            </div>
            <Link className="note-entry-arrow" href={`/notes/${note.slug}`} aria-label={`阅读《${note.title}》`}>
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>

      <footer className="research-footer">
        <Link className="brand footer-brand" href="/">
          <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" alt="" width={34} height={38} />
          LUNARTULIP LAB
        </Link>
        <a href="mailto:t.stephanie@lunartuliplab.com">t.stephanie@lunartuliplab.com</a>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
    </main>
  );
}
