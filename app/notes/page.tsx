import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "../../lib/contact";
import { formatNoteDate, getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "研究手札",
  description: "Lunartulip Lab 关于主观基本面研究、系统化量化研究、AI-native investing、量化基本面与投资决策系统的公开方法研究档案。",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "研究手札 | Lunartulip Lab",
    description: "关于主观基本面、系统化量化、AI-native investing 与决策系统的公开方法研究。",
    url: "/notes",
    type: "website",
  },
};

const researchTopics = [
  { term: "AI INVESTMENT RESEARCH", cn: "AI 投研", definition: "AI 如何进入机构信息处理、证据追踪、假设更新与研究生产流程。" },
  { term: "AI FOR QUANTITATIVE INVESTING", cn: "AI4Quant", definition: "Agent、代码生成与机器学习如何改变因子研究、策略验证和量化工程。" },
  { term: "QUANTAMENTAL INVESTING", cn: "量化基本面", definition: "产业理解、主观命题与量化纪律如何在同一套组合决策语言中协作。" },
  { term: "AI-NATIVE FUND", cn: "AI-native Fund", definition: "研究、验证、风险、决策记忆与净值反馈进入同一组织系统的长期形态。" },
  { term: "AGENTIC INVESTMENT RESEARCH", cn: "Agentic 投资研究", definition: "可编排、可验收、可追溯的 Agent 工作流如何成为买方研究基础设施。" },
];

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
        <h1>研究方法、系统实践与长期思考</h1>
        <p>这里讨论主观基本面、系统化量化、AI-native investing 与投资决策系统；公司与产业深度研究收录于 Lunartulip Deep Dive，历史判断结果汇总于 Authority Ledger。</p>
        <div className="notes-archive-actions">
          <Link href="/deep-dive">查看 Deep Dive ↗</Link>
          <Link href="/authority-ledger">查看 Authority Ledger ↗</Link>
        </div>
      </section>

      <section className="research-topics" aria-label="研究主题集群">
        {researchTopics.map((topic, index) => (
          <article key={topic.term}>
            <small>0{index + 1} / {topic.term}</small>
            <h2>{topic.cn}</h2>
            <p>{topic.definition}</p>
          </article>
        ))}
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
        <a href={institutionalMailto({ source: "NOTES_INDEX", topic: "研究手札咨询" })}>{INSTITUTIONAL_EMAIL}</a>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
    </main>
  );
}
