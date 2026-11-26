import Image from "next/image";
import Link from "next/link";
import { isEditorialDeepDive, isSourceLanguageEditorial } from "@/lib/editorial-deep-dives";
import { deepDiveResearchObjects } from "@/lib/research-objects";
import styles from "../proof.module.css";

function coverageLabel(tickers: string[]) {
  return tickers.length > 5 ? `${tickers.slice(0, 5).join(" · ")} + ${tickers.length - 5}` : tickers.join(" · ");
}

function modifiedDate(item: (typeof deepDiveResearchObjects)[number]) {
  return item.versions.at(-1)?.date ?? item.publishedAt;
}

function newestFirst(a: (typeof deepDiveResearchObjects)[number], b: (typeof deepDiveResearchObjects)[number]) {
  return modifiedDate(b).localeCompare(modifiedDate(a)) || b.publishedAt.localeCompare(a.publishedAt);
}

export default function DeepDiveIndex({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const locale = isCn ? "zh-CN" : "en";
  const companyStudies = deepDiveResearchObjects
    .filter((item) => item.kind === "company-deep-dive")
    .sort(newestFirst);
  const themeStudies = deepDiveResearchObjects
    .filter((item) => item.kind === "theme-study")
    .sort(newestFirst);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / DEEP DIVE
        </Link>
        <div className={styles.headerTools}>
          <nav className={styles.localeNav} aria-label={isCn ? "语言选择" : "Language selection"}>
            <Link className={!isCn ? styles.localeActive : undefined} href="/en/deep-dive" hrefLang="en" aria-current={!isCn ? "page" : undefined}>EN</Link>
            <span>/</span>
            <Link className={isCn ? styles.localeActive : undefined} href="/deep-dive" hrefLang="zh-CN" aria-current={isCn ? "page" : undefined}>CN</Link>
          </nav>
          <Link className={styles.back} href={isCn ? "/" : "/en"}>{isCn ? "返回首页 ↗" : "Home ↗"}</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>CANONICAL RESEARCH / LUNARTULIP DEEP DIVE</p>
          <h1>{isCn ? <>从研究问题出发，<br /><span>跟踪判断如何被证据更新。</span></> : <>Begin with the research question.<br /><span>Follow how evidence updates judgment.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "每篇 Deep Dive 围绕一个明确的公司或产业问题展开，保留核心论点、关键证据、风险边界、as-of 日期与后续更新，便于读者复核判断形成的完整上下文。" : "Each Deep Dive addresses one explicit company or industry question, preserving the core thesis, key evidence, risk boundary, as-of date and later updates so readers can evaluate the full context behind the judgment."}</p>
          <strong>VERSIONED · POINT-IN-TIME · EVIDENCE-LED</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>THEME STUDIES / {String(themeStudies.length).padStart(2, "0")}</p><h2>{isCn ? "先看主题模型如何连接公司与价值捕获路径。" : "Begin with theme models across companies and value-capture paths."}</h2></div>
          <p className={styles.lead}>{isCn ? "Theme Study 用共同问题比较多家公司，并加入控制组，检验产业叙事能否转化为可归因的经济价值。它们是 Research Models 的公开证据，也是 Research Desk 持续跟踪主题的版本化输出。" : "Theme Studies test one shared question across companies, using control cases to distinguish industry narrative from attributable economic value. They are public evidence for Research Models and versioned output from Research Desk coverage."}</p>
        </div>
        <div className={styles.grid}>
          {themeStudies.map((item) => (
            <article className={`${styles.card} ${styles.themeCard}`} key={item.slug}>
              <p className={styles.meta}>{coverageLabel(item.tickers)} / {item.id} / PUBLISHED {item.publishedAt} · UPDATED {modifiedDate(item)}</p>
              <h3>{item.renderings[locale].title}</h3>
              <p>{item.renderings[locale].standfirst}</p>
              {isEditorialDeepDive(item.slug)
                ? <a href={`${isCn || isSourceLanguageEditorial(item.slug) ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读主题研究 →" : isSourceLanguageEditorial(item.slug) ? "Read the Chinese original →" : "Read the theme study →"}</a>
                : <Link href={`${isCn ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读主题研究 →" : "Read the theme study →"}</Link>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>COMPANY DEEP DIVES / {String(companyStudies.length).padStart(2, "0")}</p><h2>{isCn ? "再进入公司：从财务事实走向可证伪的判断。" : "Then move into company research, from financial facts to falsifiable judgment."}</h2></div>
          <p className={styles.lead}>{isCn ? "每篇研究固定 as-of date、Claim IDs、Evidence Ledger、估值情景与前瞻证伪条件。更新发生在同一研究对象上，不用后见数据覆盖原始判断。" : "Each object fixes its as-of date, Claim IDs, Evidence Ledger, valuation scenarios and forward falsifiers. New evidence advances the version without overwriting the original information set."}</p>
        </div>
        <div className={styles.grid}>
          {companyStudies.map((item) => (
            <article className={styles.card} key={item.slug}>
              <p className={styles.meta}>{coverageLabel(item.tickers)} / {item.id} / PUBLISHED {item.publishedAt} · UPDATED {modifiedDate(item)}</p>
              <h3>{item.renderings[locale].title}</h3>
              <p>{item.renderings[locale].standfirst}</p>
              {isEditorialDeepDive(item.slug)
                ? <a href={`${isCn || isSourceLanguageEditorial(item.slug) ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读研究 →" : isSourceLanguageEditorial(item.slug) ? "Read the Chinese original →" : "Read the research →"}</a>
                : <Link href={`${isCn ? "" : "/en"}/deep-dive/${item.slug}`}>{isCn ? "阅读研究 →" : "Read the research →"}</Link>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "Research Models 的公开证据层" : "The public evidence layer for Research Models"}</strong>
          <p>{isCn ? "Deep Dive 保留 Research Models 中公司与产业判断当时如何形成、后来又因何更新；Research Desk 承接持续跟踪和可读交付。Authority Ledger 汇总进入结算后的结果，便于对照原始判断与实际进展。" : "Deep Dive preserves how company and industry judgments in Research Models were formed and why they changed; Research Desk carries continuous tracking and readable delivery. The Authority Ledger aggregates subsequent outcomes for comparison with the original call."}</p>
          <Link href={`${isCn ? "" : "/en"}/desk`}>{isCn ? "查看 Research Desk →" : "Explore Research Desk →"}</Link>
          <span aria-hidden="true"> · </span>
          <Link href={`${isCn ? "" : "/en"}/authority-ledger`}>{isCn ? "复核 Authority Ledger →" : "Review the Authority Ledger →"}</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "继续阅读 AlphaMap" : "Continue with AlphaMap"}</strong>
          <p>{isCn ? "AlphaMap 从产业因果、价值传导与关键连接出发，公开呈现可证伪的研究地图；它与公司、主题 Deep Dive 分列，不混入本页卡片。" : "AlphaMap starts from industry causality, value transmission and critical connections. Its public, falsifiable research maps remain separate from the company and theme cards on this page."}</p>
          <Link href={`${isCn ? "" : "/en"}/alphamap`}>{isCn ? "打开 AlphaMap →" : "Explore AlphaMap →"}</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>FROM PUBLIC RESEARCH TO INSTITUTIONAL USE</p><h2>{isCn ? "从公开证据进入三类合作。" : "Move from public evidence into three engagement routes."}</h2></div>
          <p className={styles.lead}>{isCn ? "公开 Deep Dive 用于阅读、引用和 Research Model 评估。机构可进一步讨论持续判断、AlphaMap 数据授权或 Strategy 合作；API 与结构化文件按实际工作流交付。" : "Public Deep Dives support reading, citation and Research Model evaluation. Institutions can then discuss ongoing judgment, AlphaMap licensing or Strategy collaboration; APIs and structured files follow the actual workflow."}</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}><p className={styles.meta}>DATA / ANNUAL LICENSE</p><h3>{isCn ? "AlphaMap 科技股另类数据" : "AlphaMap Technology-Equity Alternative Data"}</h3><p>{isCn ? "将产业关系、公司经营状态及其变化用于机构已有的量化或基本面研究流程。" : "Use industry relationships, company operating conditions and changes over time in existing quantitative or fundamental research processes."}</p><Link href={`${isCn ? "" : "/en"}/institutional-access#intent-alternative_dataset`}>{isCn ? "获取数据说明与样例 →" : "Request data overview and samples →"}</Link></article>
          <article className={styles.card}><p className={styles.meta}>RESEARCH MODELS / CONTINUOUS JUDGMENT</p><h3>Research Models</h3><p>{isCn ? "围绕一个明确投资问题持续更新变量、情景、判断与 revision。" : "Maintain variables, scenarios, judgment and revisions around one defined investment question."}</p><Link href={`${isCn ? "" : "/en"}/institutional-access#intent-research_model_sample`}>{isCn ? "获取模型样例 →" : "Request a model sample →"}</Link></article>
          <article className={styles.card}><p className={styles.meta}>STRATEGY / INSTITUTIONAL COLLABORATION</p><h3>LunarTulip Strategies</h3><p>{isCn ? "围绕已验证信号、模型组合、风险预算与归因材料讨论机构策略合作。" : "Discuss institutional collaboration around validated signals, model portfolios, risk budgets and attribution."}</p><Link href={`${isCn ? "" : "/en"}/strategy`}>{isCn ? "查看 Strategy →" : "Explore Strategy →"}</Link></article>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{isCn ? "研究内容不构成投资建议或操作指引" : "Research content is not investment advice or trading instruction"}</span></footer>
    </main>
  );
}
