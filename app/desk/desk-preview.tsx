"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./desk.module.css";
import { institutionalMailto } from "../../lib/contact";

type Language = "cn" | "en";

const values = [
  {
    code: "01 / RESEARCH",
    titleCn: "全球信息、产业因果与投资命题",
    titleEn: "Global information, industry causality and investment theses",
    bodyCn: "持续摄入公开信息，把公司、产业链、证据与可证伪命题组织进同一研究状态。",
    bodyEn: "Continuously ingest public information and organize companies, value chains, evidence and falsifiable theses in one research state.",
  },
  {
    code: "02 / STRATEGY",
    titleCn: "因子实验、回测、压力测试与市场状态",
    titleEn: "Factor research, backtests, stress tests and market regimes",
    bodyCn: "系统化量化引擎检验信号、配置规则与失效边界，为主观判断提供独立验证，不替代 PM。",
    bodyEn: "The systematic quant engine tests signals, allocation rules and failure boundaries—independent validation without replacing the PM.",
  },
  {
    code: "03 / PORTFOLIO",
    titleCn: "组合状态、风险预算、约束与监控",
    titleEn: "Portfolio state, risk budgets, constraints and monitoring",
    bodyCn: "让判断进入受约束的组合表达，并持续观察集中度、市场状态、风险边界与结果路径。",
    bodyEn: "Translate judgment into constrained portfolio expression while monitoring concentration, regimes, risk boundaries and outcome paths.",
  },
  {
    code: "04 / LEARNING",
    titleCn: "Decision Memory、结果归因与规则更新",
    titleEn: "Decision memory, attribution and rule updates",
    bodyCn: "保存判断时点的信息集与后续结果，经归因和人工治理后，把经验写回下一轮研究与决策。",
    bodyEn: "Preserve point-in-time information and outcomes, then feed governed attribution back into the next research and decision cycle.",
  },
];

const workflow = [
  { code: "SENSE", cn: "摄入全球变化", en: "Sense global change" },
  { code: "REASON", cn: "形成并验证判断", en: "Form and test judgment" },
  { code: "ALLOCATE", cn: "进入组合约束", en: "Enter portfolio constraints" },
  { code: "LEARN", cn: "归因并更新记忆", en: "Attribute and update memory" },
];

const architectureLayers = [
  { code: "01", cn: "全球信息摄入", en: "Global information intake", engine: "BOTH ENGINES", mode: "AUTOMATED INTAKE" },
  { code: "02", cn: "证据与覆盖", en: "Evidence & coverage", engine: "FUNDAMENTAL", mode: "HUMAN-GOVERNED" },
  { code: "03", cn: "AlphaMap × Ontology", en: "AlphaMap × Ontology", engine: "FUNDAMENTAL / R-LINE", mode: "HUMAN-GOVERNED" },
  { code: "04", cn: "假设生命周期", en: "Thesis lifecycle", engine: "FUNDAMENTAL", mode: "PM-GOVERNED" },
  { code: "05", cn: "策略发现", en: "Strategy discovery", engine: "SYSTEMATIC QUANT", mode: "MOSTLY AUTOMATED" },
  { code: "06", cn: "回测与量化验证", en: "Backtesting & quant validation", engine: "SYSTEMATIC QUANT", mode: "MOSTLY AUTOMATED" },
  { code: "07", cn: "组合与风险约束", en: "Portfolio & risk constraints", engine: "BOTH ENGINES", mode: "GOVERNED" },
  { code: "08", cn: "双 NAV 与结果归因", en: "Dual NAV & outcome attribution", engine: "BOTH ENGINES", mode: "AUTOMATED OUTPUT" },
  { code: "09", cn: "决策记忆与学习", en: "Decision memory & learning", engine: "SHARED LOOP", mode: "HUMAN-APPROVED" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" />
    </svg>
  );
}

function UpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

export default function DeskPreview({ initialLanguage = "cn" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isCn = language === "cn";
  const exchangeMailto = institutionalMailto({
    source: "RESEARCH_DESK_EXCHANGE",
    topic: "Research Desk / Institutional Research Exchange",
    language,
  });

  useEffect(() => {
    if (initialLanguage === "en") return;
    const saved = window.localStorage.getItem("lunartulip-language");
    if (saved !== "cn" && saved !== "en") return;
    const restoreLanguage = window.setTimeout(() => setLanguage(saved), 0);
    return () => window.clearTimeout(restoreLanguage);
  }, [initialLanguage]);

  const selectLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("lunartulip-language", next);
    document.documentElement.lang = next === "cn" ? "zh-CN" : "en";
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={31} height={34} alt="" aria-hidden="true" />
          <span>LUNARTULIP LAB</span>
          <i>/ RESEARCH DESK</i>
        </Link>
        <div className={styles.headerActions}>
          <div className={styles.language} aria-label={isCn ? "语言选择" : "Language selection"}>
            <button type="button" className={isCn ? styles.active : ""} aria-pressed={isCn} onClick={() => selectLanguage("cn")}>中</button>
            <button type="button" className={!isCn ? styles.active : ""} aria-pressed={!isCn} onClick={() => selectLanguage("en")}>EN</button>
          </div>
          <Link className={styles.headerCta} href={isCn ? "/institutional-access" : "/en/institutional-access"}>
            {isCn ? "机构研究交流" : "Institutional research exchange"} <UpRightIcon />
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>AI-NATIVE RESEARCH & DECISION WORKSPACE</p>
          <p className={styles.productName}>Always-On Research Desk</p>
          <h1>
            {isCn ? <>每天更快看清什么变了，<br /><span>哪些判断需要更新。</span></> : <>See what changed faster—<br /><span>and which judgments need updating.</span></>}
          </h1>
          <p className={styles.heroLead}>
            {isCn
              ? "Always-On Research Desk 汇集主观基本面与系统化量化两台研究引擎，把市场变化、产业因果、策略验证、组合约束与结果反馈组织成清晰、可追溯、可持续更新的研究工作区。"
              : "Always-On Research Desk brings together discretionary fundamental and systematic quant research, organizing market change, industry causality, strategy validation, portfolio constraints and outcome feedback into a clear, traceable and continuously updated workspace."}
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#workspace">
              {isCn ? "查看真实界面" : "Explore the real interface"} <ArrowIcon />
            </a>
            <a className={styles.textLink} href="#architecture">
              {isCn ? "查看九层架构" : "View the nine-layer architecture"} <ArrowIcon />
            </a>
          </div>
          <p className={styles.inviteNote}>
            <span />
            {isCn ? "持续运行 · 人的判断在环 · 证据始终可回溯" : "Continuously operating · Human judgment in loop · Evidence traceable"}
          </p>
        </div>

        <div className={styles.heroConsole} aria-label={isCn ? "Research Desk 脱敏界面预览" : "Sanitized Research Desk interface preview"}>
          <div className={styles.consoleHeader}>
            <span>RESEARCH DESK / TODAY</span>
            <i><b /> SYSTEM PULSE · NOMINAL</i>
          </div>
          <div className={styles.consoleBody}>
            <aside className={styles.consoleNav}>
              <strong>LT</strong>
              {["TODAY", "COVERAGE", "HYPOTHESES", "MEMORY"].map((item, index) => <span className={index === 0 ? styles.navActive : ""} key={item}>{item.slice(0, 2)}</span>)}
            </aside>
            <div className={styles.todayPanel}>
              <div className={styles.panelHeading}>
                <div><small>DAILY RESEARCH STATE</small><strong>{isCn ? "今日研究优先级" : "Today’s research priorities"}</strong></div>
                <time>07:30 / UTC+8</time>
              </div>
              <div className={styles.priorityCard}>
                <div className={styles.priorityMeta}><span>01</span><b>HIGH SIGNAL</b><i>{isCn ? "待验证" : "TO VERIFY"}</i></div>
                <h3>{isCn ? "上游约束是否正在改变价值兑现节奏？" : "Are upstream constraints changing the realization timeline?"}</h3>
                <p>{isCn ? "3 条新证据连接至核心假设；下一验证节点已更新。" : "Three new evidence items linked to the core thesis; next validation point updated."}</p>
              </div>
              <div className={styles.signalRows}>
                <div><span>THESIS UPDATE</span><strong>{isCn ? "强化 / 置信边界不变" : "Strengthened / confidence bound unchanged"}</strong><i>+03</i></div>
                <div><span>CHANGE LEDGER</span><strong>{isCn ? "产业事件已完成因果标注" : "Industry event causally tagged"}</strong><i>+07</i></div>
                <div><span>NEXT ACTION</span><strong>{isCn ? "等待经营数据交叉验证" : "Await operating-data cross-check"}</strong><i>48H</i></div>
              </div>
            </div>
          </div>
          <div className={styles.consoleFooter}><span>SANITIZED WORKSPACE VIEW</span><i>HUMAN JUDGMENT IN LOOP</i></div>
        </div>
      </section>

      <section className={styles.values} aria-labelledby="desk-values">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>30-SECOND SYSTEM VIEW / 01</p><h2 id="desk-values">{isCn ? "两台研究引擎，在一个工作区形成连续判断。" : "Two research engines form continuous judgment in one workspace."}</h2></div>
          <p>{isCn ? "主观基本面研究解释产业与公司，系统化量化研究检验信号与组合纪律；Research Desk 把两者连接为从变化识别、判断更新到结果学习的连续研究体验。" : "Discretionary fundamental research explains industries and companies; systematic quant tests signals and portfolio discipline. Research Desk connects both into a continuous experience from change detection and judgment updates to outcome learning."}</p>
        </div>
        <div className={styles.valueGrid}>
          {values.map((value) => (
            <article key={value.code}>
              <p>{value.code}</p>
              <h3>{isCn ? value.titleCn : value.titleEn}</h3>
              <span>{isCn ? value.bodyCn : value.bodyEn}</span>
            </article>
          ))}
        </div>
        <div className={styles.engineTopology}>
          <article>
            <p>ENGINE 01 / DISCRETIONARY FUNDAMENTAL</p>
            <h3>{isCn ? "主观基本面系统" : "Discretionary fundamental system"}</h3>
            <span>{isCn ? "由 PM 判断驱动，通过 Coverage、R 线 AlphaMap × Ontology、产业因果、证据与 HYP 生命周期持续更新公司与产业判断。" : "Driven by PM judgment, using Coverage, the R-line AlphaMap × Ontology, industry causality, evidence and HYP lifecycles to continuously update company and industry views."}</span>
            <small>HUMAN-LED RESEARCH</small>
          </article>
          <i aria-hidden="true">→</i>
          <article>
            <p>ENGINE 02 / SYSTEMATIC QUANT</p>
            <h3>{isCn ? "系统化量化系统" : "Systematic quant system"}</h3>
            <span>{isCn ? "基本自动运行。QuantLab 持续完成因子与模型实验、回测验证、配置与量化组合更新。" : "Mostly automated. QuantLab continuously runs factor and model research, backtesting, allocation and systematic portfolio updates."}</span>
            <small>SYSTEMATIC VALIDATION</small>
          </article>
          <i aria-hidden="true">→</i>
          <article className={styles.topologyDesk}>
            <p>RESEARCH WORKSPACE</p>
            <h3>Always-On Research Desk</h3>
            <span>{isCn ? "在七个工作区中连接两台引擎的研究状态、主观与量化双 NAV、结果账本和可回看的 Decision Memory。" : "Connects both engines’ research state, discretionary and quant NAV curves, outcome ledgers and reviewable decision memory across seven workspaces."}</span>
            <small>CONTINUOUS RESEARCH WORKSPACE</small>
          </article>
        </div>
      </section>

      <section className={styles.workspace} id="workspace" aria-labelledby="workspace-title">
        <div className={styles.workspaceIntro}>
          <p className={styles.eyebrow}>WORKSPACE IN PRACTICE / 02</p>
          <h2 id="workspace-title">{isCn ? "七个工作区，把研究状态转化为日常行动。" : "Seven workspaces turn research state into daily action."}</h2>
          <p>{isCn ? "Today、Change Ledger、Coverage、Hypotheses、Decision Memory、Briefs 与 System Pulse 分别承接优先级、变化、覆盖、命题、学习、输出和运行状态。以下为经过脱敏的实际界面。" : "Today, Change Ledger, Coverage, Hypotheses, Decision Memory, Briefs and System Pulse organize priorities, change, coverage, theses, learning, output and operating state. The interfaces below are sanitized views of the working product."}</p>
        </div>

        <div className={styles.productShell}>
          <div className={styles.shellBar}>
            <div><span /><span /><span /></div>
            <strong>ALWAYS-ON RESEARCH DESK</strong>
            <small>WORKSPACE PREVIEW</small>
          </div>
          <div className={styles.shellTabs}>
            <span className={styles.shellActive}>TODAY</span><span>HYPOTHESES</span><span>CHANGE LEDGER</span>
          </div>
          <div className={styles.screenshotGrid}>
            <figure className={styles.screenshotPrimary}>
              <Image src="/desk/shot-today.webp" width={1600} height={1001} alt={isCn ? "Research Desk Today 今日研究优先级脱敏界面" : "Sanitized Research Desk Today interface"} />
              <figcaption><div><small>01 / TODAY</small><strong>{isCn ? "今日研究优先级" : "Today’s research priorities"}</strong></div><span>{isCn ? "把一天的变化折叠成研究优先级、信念更新与下一组验证动作。" : "Compress daily change into research priorities, belief updates and the next validation actions."}</span></figcaption>
            </figure>
            <figure>
              <Image src="/desk/shot-hypotheses.webp" width={1600} height={1001} alt={isCn ? "Research Desk Hypotheses 假设看板脱敏界面" : "Sanitized Research Desk Hypotheses interface"} />
              <figcaption><div><small>02 / HYPOTHESES</small><strong>{isCn ? "假设生命周期看板" : "Hypothesis lifecycle board"}</strong></div><span>{isCn ? "强化、削弱、反转与待验证节点全程留痕。" : "Track strengthening, weakening, reversal and pending validation points."}</span></figcaption>
            </figure>
            <figure>
              <Image src="/desk/shot-ledger.webp" width={1600} height={1001} alt={isCn ? "Research Desk Change Ledger 事件账本脱敏界面" : "Sanitized Research Desk Change Ledger interface"} />
              <figcaption><div><small>03 / CHANGE LEDGER</small><strong>{isCn ? "可回溯事件账本" : "Traceable event ledger"}</strong></div><span>{isCn ? "每条变化连接到对应假设、证据与后续动作。" : "Connect each change to its thesis, evidence and next action."}</span></figcaption>
            </figure>
          </div>
          <div className={styles.shellFoot}><span>SANITIZED DEMONSTRATION</span><span>NO LIVE PORTFOLIO DATA</span><span>EVIDENCE TRACE ENABLED</span></div>
        </div>
      </section>

      <section className={styles.loop} aria-labelledby="loop-title">
        <div>
          <p className={styles.eyebrow}>OPERATING LOOP / 03</p>
          <h2 id="loop-title">{isCn ? "两台研究引擎，最终进入同一条学习回路。" : "Two research engines enter one learning loop."}</h2>
        </div>
        <div className={styles.loopTrack}>
          {workflow.map((item, index) => (
            <article key={item.code}>
              <small>0{index + 1}</small>
              <i>{item.code}</i>
              <strong>{isCn ? item.cn : item.en}</strong>
              {index < workflow.length - 1 && <span aria-hidden="true">→</span>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pilot} id="architecture" aria-labelledby="pilot-title">
        <div className={styles.pilotIntro}>
          <p className={styles.eyebrow}>NINE-LAYER ARCHITECTURE / 04</p>
          <h2 id="pilot-title">{isCn ? "从信息到反馈，看清判断如何形成、验证和更新。" : "See how judgment forms, gets tested and improves from information to feedback."}</h2>
          <p>{isCn ? "九层能力覆盖信息摄入、证据与产业因果、命题、策略发现、量化验证、组合约束、结果归因与 Decision Memory。每层标明主要研究引擎与运行方式，便于快速理解人的判断与系统纪律如何协作。" : "Nine layers cover information intake, evidence and industry causality, theses, strategy discovery, quantitative validation, portfolio constraints, outcome attribution and decision memory. Each layer identifies its primary engine and operating mode, making the division between human judgment and system discipline clear."}</p>
        </div>
        <div className={styles.architectureGrid}>
          {architectureLayers.map((layer) => (
            <article key={layer.code}>
              <small>{layer.code}</small>
              <strong>{isCn ? layer.cn : layer.en}</strong>
              <span>{layer.engine}</span>
              <em>{layer.mode}</em>
            </article>
          ))}
        </div>
        <div className={styles.architectureBoundary}>
          <p>{isCn ? "可供评估" : "AVAILABLE FOR EVALUATION"}</p>
          <strong>{isCn ? "系统结构、脱敏界面、研究样章、聚合验证与更正记录" : "System architecture, sanitized interfaces, research samples, aggregate validation and corrections"}</strong>
          <p>{isCn ? "受保护的机构资产" : "PROTECTED INSTITUTIONAL ASSETS"}</p>
          <strong>{isCn ? "实时仓位、模型权重、单笔判断原文、执行细节与核心 Decision Memory" : "Live positions, model weights, original calls, execution details and core decision memory"}</strong>
        </div>
      </section>

      <section className={styles.request} id="request-demo" aria-labelledby="request-title">
        <div>
          <p className={styles.eyebrow}>DEEPER VERIFICATION / 05</p>
          <h2 id="request-title">{isCn ? "从研究作品开始，进一步了解系统方法。" : "Begin with the research, then explore the system behind it."}</h2>
          <p>{isCn ? "通过 Deep Dive 查看具体研究如何形成，通过 Authority Ledger 查看历史判断如何接受结果检验；机构团队也可以围绕一个明确研究问题，讨论适合自身场景的持续跟踪与研究协作方式。" : "Use Deep Dives to see how specific research is formed and the Authority Ledger to see how prior judgments meet outcomes. Institutional teams can also begin with one clear research question and discuss a suitable format for continuous monitoring and research exchange."}</p>
        </div>
        <div className={styles.proofLinks}>
          <Link className={styles.requestButton} href={isCn ? "/deep-dive" : "/en/deep-dive"}>
            <small>PUBLIC RESEARCH OBJECTS</small>
            <strong>{isCn ? "阅读 Deep Dive" : "Read Deep Dives"}</strong>
            <UpRightIcon />
          </Link>
          <Link className={styles.requestButton} href={isCn ? "/authority-ledger" : "/en/authority-ledger"}>
            <small>CALLS & OUTCOMES</small>
            <strong>{isCn ? "打开 Authority Ledger" : "Open Authority Ledger"}</strong>
            <UpRightIcon />
          </Link>
        </div>
      </section>

      <section className={styles.boundary}>
        <p>RESEARCH METHODOLOGY / IMPORTANT INFORMATION</p>
        <span>{isCn ? "本页展示研究方法、系统结构与脱敏界面，仅供了解 Lunartulip 的研究能力与工作方式；不构成投资建议、基金募集、金融产品推介或收益承诺。" : "This page presents research methods, system architecture and sanitized interfaces to explain Lunartulip’s research capabilities and working approach. It is not investment advice, fundraising, financial-product solicitation or a promise of returns."}</span>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          <span>LUNARTULIP LAB</span>
        </Link>
        <p>ALWAYS-ON RESEARCH DESK · RESEARCH & DECISION WORKSPACE</p>
        <a href={exchangeMailto}>{isCn ? "机构研究交流" : "Institutional research exchange"}</a>
      </footer>
    </main>
  );
}
