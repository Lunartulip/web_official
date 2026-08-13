import Image from "next/image";
import Link from "next/link";
import { deepDives } from "@/lib/deep-dives";
import styles from "../proof.module.css";

export default function DeepDiveIndex({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / DEEP DIVE
        </Link>
        <Link className={styles.back} href={isCn ? "/" : "/en"}>{isCn ? "返回首页 ↗" : "Home ↗"}</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>RESEARCH NOTES / LUNARTULIP DEEP DIVE</p>
          <h1>{isCn ? <>从研究问题出发，<br /><span>跟踪判断如何被证据更新。</span></> : <>Begin with the research question.<br /><span>Follow how evidence updates judgment.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "每篇 Deep Dive 围绕一个明确的公司或产业问题展开，保留核心论点、关键证据、风险边界、as-of 日期与后续更新，便于读者复核判断形成的完整上下文。" : "Each Deep Dive addresses one explicit company or industry question, preserving the core thesis, key evidence, risk boundary, as-of date and later updates so readers can evaluate the full context behind the judgment."}</p>
          <strong>VERSIONED · POINT-IN-TIME · EVIDENCE-LED</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>VERSIONED RESEARCH / 02</p><h2>{isCn ? "每篇研究，都有明确问题和更新路径。" : "Every research object has a clear question and update path."}</h2></div>
          <p className={styles.lead}>{isCn ? "判断与证据被固定在明确的 as-of date 上；出现更正时，同一页面更新版本与更正记录。" : "Claims and evidence are fixed to an explicit as-of date. When a correction occurs, the same page advances its version and update history."}</p>
        </div>
        <div className={styles.grid}>
          {deepDives.map((item) => (
            <article className={styles.card} key={item.slug}>
              <p className={styles.meta}>{item.tickers.join(" · ")} / AS OF {item.publishedAt}</p>
              <h3>{isCn ? item.titleCn : item.titleEn}</h3>
              <p>{isCn ? item.standfirstCn : item.standfirstEn}</p>
              <Link href={`${isCn ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读研究 →" : "Read the research →"}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "如何使用 Deep Dive" : "How to use the Deep Dives"}</strong>
          <p>{isCn ? "适合用于评估 Lunartulip 对公司、产业传导、预期差与风险边界的研究深度。内容保留判断时点与后续修正，帮助读者区分当时可得信息、原始论点和后来出现的新证据。" : "Use these Deep Dives to evaluate Lunartulip’s work on companies, industry transmission, expectation gaps and risk boundaries. Point-in-time context and later corrections help separate the original information set and thesis from evidence that emerged afterward."}</p>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{isCn ? "研究内容不构成投资建议或操作指引" : "Research content is not investment advice or trading instruction"}</span></footer>
    </main>
  );
}
