import Image from "next/image";
import Link from "next/link";
import type { ResearchObject, ResearchLocale } from "@/lib/research-objects";
import styles from "../proof.module.css";

function formatValue(value: number, unit: "USDm" | "percent" | "count", locale: ResearchLocale) {
  if (unit === "percent") return `${value.toLocaleString(locale)}%`;
  if (unit === "count") return value.toLocaleString(locale);
  return `$${value.toLocaleString(locale, { maximumFractionDigits: 1 })}m`;
}

export default function DeepDiveArticle({ item, language = "cn" }: { item: ResearchObject; language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const locale: ResearchLocale = isCn ? "zh-CN" : "en";
  const rendering = item.renderings[locale];
  const claims = new Map(item.claims.map((claim) => [claim.id, claim]));
  const riskClaims = rendering.riskClaimIds.map((id) => claims.get(id)).filter((claim) => claim !== undefined);
  const evidenceClaims = rendering.evidenceClaimIds.map((id) => claims.get(id)).filter((claim) => claim !== undefined);
  const forwardTests = rendering.forwardTestIds
    .map((id) => item.falsifiers.find((test) => test.id === id))
    .filter((test) => test !== undefined);
  const siblingPath = `${isCn ? "/en" : ""}/deep-dive/${item.slug}`;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={`${isCn ? "" : "/en"}/deep-dive`}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / DEEP DIVE
        </Link>
        <div className={styles.articleTools}>
          <Link className={styles.languageSibling} href={siblingPath} hrefLang={isCn ? "en" : "zh-CN"}>{isCn ? "READ IN ENGLISH" : "阅读中文版"}</Link>
          <Link className={styles.back} href={`${isCn ? "" : "/en"}/deep-dive`}>{isCn ? "全部研究 ↗" : "All research ↗"}</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>{item.tickers.join(" + ")} / {item.kind.replaceAll("-", " ").toUpperCase()}</p>
          <h1>{rendering.title}</h1>
          <div className={styles.metaRow}>
            <span>AS OF {item.asOf}</span>
            <span>VERSION {item.version}</span>
            <span>{item.id}</span>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <p className={styles.heroStandfirst}>{rendering.standfirst}</p>
          <strong>{isCn ? "研究版本" : "RESEARCH EDITION"} / {item.sourceLabel}</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <article className={styles.article}>
          <section className={styles.researchLead}>
            <p className={styles.sectionLabel}>OUR VIEW / POINT IN TIME</p>
            <h2>{isCn ? "核心判断" : "The investment view"}</h2>
            <p>{rendering.differentiated}</p>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>THE RESEARCH QUESTION</p>
            <h2>{rendering.question}</h2>
            <p>{rendering.whyItMatters}</p>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>FINANCIAL BRIDGE / CLAIM LEDGER</p>
            <h2>{isCn ? "先固定事实，再讨论解释。" : "Fix the facts before debating the interpretation."}</h2>
            <div className={styles.bridgeTable}>
              {item.financialBridge.map((row) => (
                <div key={`${row.period}-${row.label.en}`}>
                  <span>{row.period}</span>
                  <strong>{row.label[locale]}</strong>
                  <b>{formatValue(row.value, row.unit, locale)}</b>
                </div>
              ))}
            </div>
            <div className={styles.claimList}>
              {evidenceClaims.map((claim) => (
                <div id={claim.id} key={claim.id}>
                  <p className={styles.claimMeta}><span>{claim.type}</span>{claim.id}</p>
                  <p>{claim.text[locale]}</p>
                  <small>{claim.evidenceIds.join(" · ")}</small>
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
                <p>{rendering.consensus}</p>
              </div>
              <div className={styles.edgeCard}>
                <small>{isCn ? "差异化判断" : "DIFFERENTIATED INFERENCE"}</small>
                <p>{rendering.differentiated}</p>
              </div>
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>CAUSAL MECHANISM</p>
            <h2>{isCn ? "价值如何一步步穿过收入表。" : "How value travels into the income statement."}</h2>
            <div className={styles.causalChain}>
              {rendering.causalChain.map((step, index) => (
                <div key={`${step.title}-${index}`}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <small>{step.claimIds.join(" · ")}</small>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>VALUATION REGIME / REPRODUCIBLE SCENARIOS</p>
            <h2>{isCn ? "好生意与好价格，是两件事。" : "A strong business and a good price are different questions."}</h2>
            <p className={styles.valuation}>{rendering.valuation}</p>
            <div className={styles.valuationGrid}>
              {item.valuationScenarios.map((scenario) => (
                <div className={styles.scenarioCard} key={scenario.id}>
                  <p className={styles.claimMeta}><span>{scenario.label[locale]}</span>{scenario.id}</p>
                  <div className={styles.scenarioMetric}>
                    <div><small>{isCn ? "远期收入" : "FORWARD REVENUE"}</small><strong>${scenario.forwardRevenueUsdM.toLocaleString(locale)}m</strong></div>
                    <div><small>{isCn ? "销售倍数" : "SALES MULTIPLE"}</small><strong>{scenario.salesMultiple}×</strong></div>
                    <div><small>{isCn ? "隐含企业价值" : "IMPLIED EV"}</small><strong>${scenario.impliedEnterpriseValueUsdM.toLocaleString(locale)}m</strong></div>
                  </div>
                  <p>{scenario.interpretation[locale]}</p>
                  <code>{scenario.calculation}</code>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>FORWARD TESTS / FALSIFIERS</p>
            <h2>{isCn ? "什么会证明这套判断正在失效。" : "What would show that the thesis is failing."}</h2>
            <div className={styles.forwardGrid}>
              {forwardTests.map((test, index) => (
                <div key={test.id}>
                  <small>TEST / 0{index + 1} · {test.id}</small>
                  <h3>{test.metric} {test.operator} {test.threshold}{test.unit === "percent" ? "%" : ""}</h3>
                  <p>{test.rationale[locale]}</p>
                  <span>{test.horizon}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>WHAT WOULD CHANGE OUR MIND</p>
            <h2>{isCn ? "判断失效的条件。" : "Conditions that would weaken the view."}</h2>
            <div className={styles.claimList}>
              {riskClaims.map((claim) => (
                <div key={claim.id}>
                  <p className={styles.claimMeta}><span>{claim.type}</span>{claim.id}</p>
                  <p>{claim.text[locale]}</p>
                  <small>{claim.evidenceIds.join(" · ")}</small>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>EVIDENCE LEDGER</p>
            <h2>{isCn ? "结论可以争论，来源必须可复核。" : "The interpretation is debatable. The source trail is not."}</h2>
            <div className={styles.sourceList}>
              {item.evidence.map((entry) => (
                <article className={styles.sourceCard} id={entry.id} key={entry.id}>
                  <p className={styles.claimMeta}><span>{entry.role}</span>{entry.id}</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.source.publisher} · {entry.sourceDate} · DATA AS OF {entry.dataAsOf}</p>
                  <p>{entry.counterevidence}</p>
                  {entry.calculation ? <code>{entry.calculation}</code> : null}
                  {entry.source.url ? <a href={entry.source.url} target="_blank" rel="noreferrer">{isCn ? "查看原始来源 ↗" : "Open primary source ↗"}</a> : null}
                </article>
              ))}
            </div>
          </section>

          <section className={styles.articleSection}>
            <p className={styles.sectionLabel}>UPDATE HISTORY / DATA GAPS</p>
            <h2>{isCn ? "版本、修订与仍然未知的部分。" : "Versions, revisions and what remains unknown."}</h2>
            <p>{rendering.update}</p>
            <div className={styles.versionList}>
              {item.versions.map((entry) => (
                <div key={`${entry.version}-${entry.date}`}><span>V{entry.version} · {entry.date}</span><p>{entry.diff[locale]}</p></div>
              ))}
            </div>
            <ul className={styles.dataGaps}>{item.dataGaps.map((gap) => <li key={gap.en}>{gap[locale]}</li>)}</ul>
          </section>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "重要说明" : "Important information"}</strong>
          <p>{isCn ? "本文用于呈现事实、研究问题、带时间戳的判断及其更新记录，帮助读者理解研究过程；不构成投资建议、交易指令或收益承诺。" : "This article presents facts, research questions, timestamped judgment and subsequent updates to explain the research process. It is not investment advice, a trading instruction or a promise of returns."}</p>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{item.id} / {item.version}</span></footer>
    </main>
  );
}
