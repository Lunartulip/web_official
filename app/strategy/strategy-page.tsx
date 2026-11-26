import Image from "next/image";
import Link from "next/link";
import styles from "./strategy.module.css";

type Language = "zh" | "en";

const copy = {
  zh: {
    nav: ["研究模型", "AlphaMap 数据", "Strategy"],
    eyebrow: "LUNARTULIP STRATEGIES / INSTITUTIONAL COLLABORATION",
    title: "把研究优势写进可复核的策略证据。",
    intro: "LunarTulip Strategies 面向模型组合与机构策略合作。每项合作从信号证据、风险预算和使用边界开始，逐步形成可审阅、可复现、可归因的策略记录。",
    primary: "讨论 Strategy 合作",
    secondary: "查看判断账本",
    section: "合作对象",
    sectionTitle: "购买的是模型组合与合作责任。",
    cards: [
      ["MODEL PORTFOLIOS", "模型组合", "将定义清楚的信号、约束和再平衡规则装配为可复核的模型组合。交付范围以数据权限、研究目的和责任边界为准。"],
      ["INSTITUTIONAL COLLABORATION", "机构策略合作", "围绕指定科技股范围、投资命题或风险问题，共同设定研究协议、验证窗口与审阅节点。"],
      ["ATTRIBUTION", "证据与归因", "按策略成熟度提供样本外结果、风险统计和 PnL attribution。证据不足时明确标注研究阶段。"],
    ],
    evidence: "证据标准",
    evidenceTitle: "信息、信号与可交易证据分层审阅。",
    evidenceBody: "AlphaMap 中的结构化关系和经营状态先接受增量预测检验。通过样本外、成本与风险约束后，才进入策略层评估。每一层都有独立的版本、as-of 日期和失效条件。",
    levels: [
      ["01", "STRUCTURED INFORMATION", "带来源、时点和修订记录的关系、状态与事件。"],
      ["02", "PREDICTIVE SIGNAL", "在预先定义的样本和基准下检验增量解释力。"],
      ["03", "STRATEGY EVIDENCE", "审阅换手、成本、容量、回撤和归因后的结果。"],
    ],
    boundary: "合作边界",
    boundaryTitle: "先把责任写清楚。",
    boundaries: ["明确研究范围、数据权限与评估窗口", "定义风险预算、约束与中止条件", "保留版本、参数和归因记录", "不在公开页面提供具体持仓、权重或结果承诺"],
    ctaTitle: "从一个可验证的策略问题开始。",
    ctaBody: "请说明机构背景、研究范围、时间尺度与现有验证材料。我们会据此确认适合的模型组合、合作方式和证据清单。",
    footer: "Research Models、AlphaMap Data 与 Strategy 共用研究内核，按购买对象、使用权和服务责任分别成交。",
  },
  en: {
    nav: ["Research Models", "AlphaMap Data", "Strategy"],
    eyebrow: "LUNARTULIP STRATEGIES / INSTITUTIONAL COLLABORATION",
    title: "Turn research advantage into reviewable strategy evidence.",
    intro: "LunarTulip Strategies covers model portfolios and institutional strategy collaboration. Each engagement begins with signal evidence, a risk budget and defined usage boundaries, then builds an auditable, reproducible and attributable strategy record.",
    primary: "Discuss Strategy collaboration",
    secondary: "View the Authority Ledger",
    section: "PURCHASING OBJECT",
    sectionTitle: "Model portfolios with defined collaboration responsibility.",
    cards: [
      ["MODEL PORTFOLIOS", "Model portfolios", "Assemble defined signals, constraints and rebalancing rules into reviewable model portfolios. Scope follows data rights, research purpose and responsibility boundaries."],
      ["INSTITUTIONAL COLLABORATION", "Institutional strategy collaboration", "Set a research protocol, validation window and review gates around a specified technology-equity universe, thesis or risk question."],
      ["ATTRIBUTION", "Evidence and attribution", "Provide out-of-sample results, risk statistics and PnL attribution according to strategy maturity. Research-stage evidence is labelled explicitly."],
    ],
    evidence: "EVIDENCE STANDARD",
    evidenceTitle: "Review information, signal and strategy evidence separately.",
    evidenceBody: "Structured AlphaMap relationships and operating states first face incremental-prediction tests. Only after out-of-sample, cost and risk constraints do they enter strategy evaluation. Every layer retains its own version, as-of date and failure conditions.",
    levels: [
      ["01", "STRUCTURED INFORMATION", "Relationships, states and events with sources, timestamps and revision history."],
      ["02", "PREDICTIVE SIGNAL", "Incremental explanatory power under a predefined sample and benchmark."],
      ["03", "STRATEGY EVIDENCE", "Results reviewed for turnover, costs, capacity, drawdown and attribution."],
    ],
    boundary: "COLLABORATION BOUNDARY",
    boundaryTitle: "Define responsibility before implementation.",
    boundaries: ["Set the research scope, data rights and evaluation window", "Define risk budgets, constraints and stop conditions", "Preserve versions, parameters and attribution records", "No specific holdings, weights or outcome promises on this public page"],
    ctaTitle: "Start with a testable strategy question.",
    ctaBody: "Describe your institution, research scope, time horizon and existing validation material. We will use that context to define the relevant model portfolio, collaboration format and evidence checklist.",
    footer: "Research Models, AlphaMap Data and Strategy share one research core and transact under distinct purchasing objects, usage rights and service responsibilities.",
  },
} as const;

export default function StrategyPage({ language = "zh" }: { language?: Language }) {
  const c = copy[language];
  const prefix = language === "en" ? "/en" : "";
  const canonical = language === "en" ? "https://lunartuliplab.com/en/strategy" : "https://lunartuliplab.com/strategy";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "LunarTulip Strategies",
    serviceType: "Model portfolios and institutional strategy collaboration",
    provider: { "@type": "Organization", name: "LunarTulip Research", url: "https://lunartuliplab.com" },
    areaServed: "Global",
    url: canonical,
    description: c.intro,
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={styles.header}>
        <Link className={styles.brand} href={prefix || "/"}><Image src="/lunartulip-silver-emblem.png" width={30} height={34} alt="" />LUNARTULIP LAB</Link>
        <nav aria-label={language === "zh" ? "产品入口" : "Product navigation"}>
          <Link href={`${prefix}/deep-dive`}>{c.nav[0]}</Link>
          <Link href={`${prefix}/alphamap`}>{c.nav[1]}</Link>
          <span>{c.nav[2]}</span>
        </nav>
        <Link className={styles.lang} href={language === "zh" ? "/en/strategy" : "/strategy"}>{language === "zh" ? "EN" : "中文"}</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className={styles.intro}>{c.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={`${prefix}/institutional-access#intent-strategy_access`}>{c.primary}<span>→</span></Link>
            <Link className={styles.secondary} href={`${prefix}/authority-ledger`}>{c.secondary}<span>↗</span></Link>
          </div>
        </div>
        <div className={styles.signal} aria-hidden="true">
          <span>RESEARCH</span><i /><span>SIGNAL</span><i /><span>STRATEGY</span>
          <strong>OOS / RISK / ATTRIBUTION</strong>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.heading}><p>{c.section}</p><h2>{c.sectionTitle}</h2></div>
        <div className={styles.cards}>{c.cards.map(([code, title, body], index) => <article key={code}><small>0{index + 1} / {code}</small><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className={styles.evidence}>
        <div className={styles.evidenceCopy}><p>{c.evidence}</p><h2>{c.evidenceTitle}</h2><span>{c.evidenceBody}</span></div>
        <div className={styles.levels}>{c.levels.map(([number, title, body]) => <article key={number}><small>{number}</small><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>

      <section className={styles.boundary}>
        <div><p>{c.boundary}</p><h2>{c.boundaryTitle}</h2></div>
        <ol>{c.boundaries.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
      </section>

      <section className={styles.cta}>
        <p>INSTITUTIONAL ACCESS</p><h2>{c.ctaTitle}</h2><span>{c.ctaBody}</span>
        <Link href={`${prefix}/institutional-access#intent-strategy_access`}>{c.primary}<b>→</b></Link>
      </section>

      <footer><Link href={prefix || "/"}>LUNARTULIP LAB</Link><p>{c.footer}</p><span>© 2026</span></footer>
    </main>
  );
}
