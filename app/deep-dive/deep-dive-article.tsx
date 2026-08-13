import Image from "next/image";
import Link from "next/link";
import type { DeepDive } from "@/lib/deep-dives";
import styles from "../proof.module.css";

export default function DeepDiveArticle({ item, language = "cn" }: { item: DeepDive; language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const evidence = isCn ? item.evidenceCn : item.evidenceEn;
  const risks = isCn ? item.risksCn : item.risksEn;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={`${isCn ? "" : "/en"}/deep-dive`}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / DEEP DIVE
        </Link>
        <Link className={styles.back} href={`${isCn ? "" : "/en"}/deep-dive`}>{isCn ? "全部研究 ↗" : "All research ↗"}</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>{item.tickers.join(" + ")} / POINT-IN-TIME RESEARCH</p>
          <h1>{isCn ? item.titleCn : item.titleEn}</h1>
          <div className={styles.metaRow}>
            <span>AS OF {item.publishedAt}</span>
            <span>VERSION {item.version}</span>
            <span>VERSIONED RESEARCH</span>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <p className={styles.heroStandfirst}>{isCn ? item.standfirstCn : item.standfirstEn}</p>
          <strong>{isCn ? "研究版本" : "RESEARCH EDITION"} / {item.source}</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <article className={styles.article}>
          <section className={styles.researchLead}>
            <p className={styles.sectionLabel}>OUR VIEW / POINT IN TIME</p>
            <h2>{isCn ? "核心判断" : "The investment view"}</h2>
            <p>{isCn ? item.standfirstCn : item.standfirstEn}</p>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>WHY IT MATTERS</p>
            <h2>{isCn ? item.questionCn : item.questionEn}</h2>
            <p>{isCn ? item.whyItMattersCn : item.whyItMattersEn}</p>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>PROFESSIONAL FINANCIAL BASELINE</p>
            <h2>{isCn ? "先把共同现实摆清楚。" : "Start with a clean shared reality."}</h2>
            <div className={styles.baselineGrid}>
              {evidence.map((line, index) => (
                <div key={line}>
                  <small>0{index + 1}</small>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>CONSENSUS → EXPECTATION GAP</p>
            <h2>{isCn ? "市场看见了什么，我们继续追问什么。" : "What the market sees—and what still needs explaining."}</h2>
            <div className={styles.perspectiveGrid}>
              <div>
                <small>{isCn ? "市场共识" : "MARKET CONSENSUS"}</small>
                <p>{isCn ? item.consensusCn : item.consensusEn}</p>
              </div>
              <div className={styles.edgeCard}>
                <small>{isCn ? "差异化判断" : "DIFFERENTIATED INFERENCE"}</small>
                <p>{isCn ? item.differentiatedCn : item.differentiatedEn}</p>
              </div>
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>CAUSAL MECHANISM</p>
            <h2>{isCn ? "价值如何一步步穿过收入表。" : "How value travels into the income statement."}</h2>
            <div className={styles.causalChain}>
              {item.causalChain.map((step, index) => (
                <div key={step.titleEn}>
                  <span>0{index + 1}</span>
                  <h3>{isCn ? step.titleCn : step.titleEn}</h3>
                  <p>{isCn ? step.bodyCn : step.bodyEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>VALUATION REGIME</p>
            <h2>{isCn ? "好生意与好价格，是两件事。" : "A strong business and a good price are different questions."}</h2>
            <p className={styles.valuation}>{isCn ? item.valuationCn : item.valuationEn}</p>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>FORWARD PRICING CLOCK</p>
            <h2>{isCn ? "未来一至两个季度，市场会验收什么。" : "What the next one to two quarters must prove."}</h2>
            <div className={styles.forwardGrid}>
              {item.forwardTests.map((test, index) => (
                <div key={test.titleEn}>
                  <small>TEST / 0{index + 1}</small>
                  <h3>{isCn ? test.titleCn : test.titleEn}</h3>
                  <p>{isCn ? test.bodyCn : test.bodyEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>WHAT WOULD CHANGE OUR MIND</p>
            <h2>{isCn ? "判断失效的条件。" : "Conditions that would weaken the view."}</h2>
            <ul>{risks.map((line) => <li key={line}>{line}</li>)}</ul>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>UPDATE HISTORY</p>
            <h2>{isCn ? "版本与更正记录" : "Version and correction history"}</h2>
            <p>{isCn ? item.updateCn : item.updateEn}</p>
          </section>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "重要说明" : "Important information"}</strong>
          <p>{isCn ? "本文用于呈现事实、研究问题、带时间戳的判断及其更新记录，帮助读者理解研究过程；不构成投资建议、交易指令或收益承诺。" : "This article presents facts, research questions, timestamped judgment and subsequent updates to explain the research process. It is not investment advice, a trading instruction or a promise of returns."}</p>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{item.tickers.join(" · ")} / {item.version}</span></footer>
    </main>
  );
}
