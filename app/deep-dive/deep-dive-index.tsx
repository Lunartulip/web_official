import Image from "next/image";
import Link from "next/link";
import { researchObjects } from "@/lib/research-objects";
import styles from "../proof.module.css";

export default function DeepDiveIndex({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const locale = isCn ? "zh-CN" : "en";
  const companyStudies = researchObjects.filter((item) => item.kind === "company-deep-dive");
  const themeStudies = researchObjects.filter((item) => item.kind === "theme-study");

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
          <div><p className={styles.sectionLabel}>COMPANY DEEP DIVES / 03</p><h2>{isCn ? "公司研究：从财务事实走向可证伪的判断。" : "Company research that moves from financial facts to falsifiable judgment."}</h2></div>
          <p className={styles.lead}>{isCn ? "每篇研究固定 as-of date、Claim IDs、Evidence Ledger、估值情景与前瞻证伪条件。更新发生在同一研究对象上，不用后见数据覆盖原始判断。" : "Each object fixes its as-of date, Claim IDs, Evidence Ledger, valuation scenarios and forward falsifiers. New evidence advances the version without overwriting the original information set."}</p>
        </div>
        <div className={styles.grid}>
          {companyStudies.map((item) => (
            <article className={styles.card} key={item.slug}>
              <p className={styles.meta}>{item.tickers.join(" · ")} / {item.id} / AS OF {item.asOf}</p>
              <h3>{item.renderings[locale].title}</h3>
              <p>{item.renderings[locale].standfirst}</p>
              <Link href={`${isCn ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读研究 →" : "Read the research →"}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>THEME STUDIES / 01</p><h2>{isCn ? "横截面研究：比较不同价值捕获路径。" : "Cross-sectional research across distinct value-capture paths."}</h2></div>
          <p className={styles.lead}>{isCn ? "Theme Study 用共同问题比较多家公司，并加入控制组，检验产业叙事能否转化为可归因的经济价值。" : "Theme Studies test one shared question across companies, using control cases to distinguish industry narrative from attributable economic value."}</p>
        </div>
        <div className={styles.grid}>
          {themeStudies.map((item) => (
            <article className={`${styles.card} ${styles.themeCard}`} key={item.slug}>
              <p className={styles.meta}>{item.tickers.join(" · ")} / {item.id} / AS OF {item.asOf}</p>
              <h3>{item.renderings[locale].title}</h3>
              <p>{item.renderings[locale].standfirst}</p>
              <Link href={`${isCn ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读主题研究 →" : "Read the theme study →"}</Link>
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
