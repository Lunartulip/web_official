"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./desk.module.css";

type Language = "cn" | "en";

const values = [
  {
    code: "01 / CHANGE LEDGER",
    titleCn: "事件进入账本，而不是流过屏幕",
    titleEn: "Events enter a ledger—not a vanishing feed",
    bodyCn: "每条重要变化都连接到对应假设、证据来源与待验证节点，明确它加强、削弱或尚未改变了什么。",
    bodyEn: "Each material change connects to a hypothesis, source and next validation point—showing what it strengthens, weakens or leaves unresolved.",
  },
  {
    code: "02 / HYPOTHESIS BOARD",
    titleCn: "观点拥有生命周期",
    titleEn: "Every thesis has a lifecycle",
    bodyCn: "把研究命题、反证条件、时间窗口与产业传导路径放进同一张持续更新的看板，而不是散落在对话与文档中。",
    bodyEn: "Keep theses, falsification criteria, time windows and industry transmission paths in one evolving board—not scattered across chats and documents.",
  },
  {
    code: "03 / DECISION MEMORY",
    titleCn: "让结果写回下一次研究",
    titleEn: "Outcomes improve the next research cycle",
    bodyCn: "保留判断形成时的信息集、后续动作与结果反馈，区分研究、执行和外部噪音，把复盘沉淀成可复用的系统记忆。",
    bodyEn: "Preserve the information set, subsequent actions and outcome feedback; separate research, execution and noise, then turn review into reusable memory.",
  },
];

const workflow = [
  { code: "SENSE", cn: "捕捉变化", en: "Sense change" },
  { code: "UPDATE", cn: "更新假设", en: "Update theses" },
  { code: "BRIEF", cn: "形成简报", en: "Form the brief" },
  { code: "LEARN", cn: "反馈复盘", en: "Learn from outcomes" },
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

export default function DeskPreview() {
  const [language, setLanguage] = useState<Language>("cn");
  const isCn = language === "cn";
  const demoMailto = `mailto:t.stephanie@lunartuliplab.com?subject=${encodeURIComponent("[LunarTulip] Research Desk Demo Request")}`;

  useEffect(() => {
    const saved = window.localStorage.getItem("lunartulip-language");
    if (saved === "cn" || saved === "en") setLanguage(saved);
  }, []);

  const selectLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("lunartulip-language", next);
    document.documentElement.lang = next === "cn" ? "zh-CN" : "en";
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <Image src="/lunartulip-silver-emblem.png" width={31} height={34} alt="" aria-hidden="true" />
          <span>LUNARTULIP LAB</span>
          <i>/ RESEARCH DESK</i>
        </Link>
        <div className={styles.headerActions}>
          <div className={styles.language} aria-label={isCn ? "语言选择" : "Language selection"}>
            <button type="button" className={isCn ? styles.active : ""} aria-pressed={isCn} onClick={() => selectLanguage("cn")}>中</button>
            <button type="button" className={!isCn ? styles.active : ""} aria-pressed={!isCn} onClick={() => selectLanguage("en")}>EN</button>
          </div>
          <a className={styles.headerCta} href={demoMailto}>
            {isCn ? "预约演示" : "Request demo"} <UpRightIcon />
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>INVITED PRODUCT PREVIEW / ALWAYS-ON CO-RESEARCH</p>
          <h1>
            {isCn ? <>让每一次研究判断，<br /><span>持续接受验证。</span></> : <>Keep every research judgment<br /><span>accountable to evidence.</span></>}
          </h1>
          <p className={styles.heroLead}>
            {isCn
              ? "Always-On Research Desk 是机构持续共研的运行载体：连接事件账本、假设看板、每日简报与决策记忆，让变化、判断和反馈进入同一套可回溯的研究状态。"
              : "Always-On Research Desk is an operating environment for continuous institutional co-research—connecting the event ledger, hypothesis board, daily briefs and decision memory in one traceable research state."}
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#workspace">
              {isCn ? "查看产品界面" : "Explore the interface"} <ArrowIcon />
            </a>
            <a className={styles.textLink} href={demoMailto}>
              {isCn ? "申请受邀演示" : "Request an invited demo"} <UpRightIcon />
            </a>
          </div>
          <p className={styles.inviteNote}>
            <span />
            {isCn ? "当前开放受邀试点 · 共同确认首个研究命题与边界" : "Invited pilots available · Define the first thesis and boundaries together"}
          </p>
        </div>

        <div className={styles.heroConsole} aria-label={isCn ? "Research Desk 产品界面示意" : "Research Desk interface preview"}>
          <div className={styles.consoleHeader}>
            <span>RESEARCH DESK / TODAY</span>
            <i><b /> SYSTEM PULSE · NOMINAL</i>
          </div>
          <div className={styles.consoleBody}>
            <aside className={styles.consoleNav}>
              <strong>LT</strong>
              {["TODAY", "THESES", "LEDGER", "MEMORY"].map((item, index) => <span className={index === 0 ? styles.navActive : ""} key={item}>{item.slice(0, 2)}</span>)}
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
          <div className={styles.consoleFooter}><span>DEMO DATA · SANITIZED</span><i>HUMAN JUDGMENT IN LOOP</i></div>
        </div>
      </section>

      <section className={styles.values} aria-labelledby="desk-values">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>WHY RESEARCH DESK / 01</p><h2 id="desk-values">{isCn ? "不是更多信息，而是更好的研究状态。" : "Not more information—a better research state."}</h2></div>
          <p>{isCn ? "把一次性的研究动作变成能够持续更新、接受检验并保留记忆的协作系统。" : "Turn one-off research actions into a collaborative system that updates, faces evidence and retains memory."}</p>
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
      </section>

      <section className={styles.workspace} id="workspace" aria-labelledby="workspace-title">
        <div className={styles.workspaceIntro}>
          <p className={styles.eyebrow}>PRODUCT GLANCE / 02</p>
          <h2 id="workspace-title">{isCn ? "同一套研究状态，三个工作切面。" : "One research state, three working views."}</h2>
          <p>{isCn ? "以下为脱敏演示界面。真实试点的覆盖范围、信息源与研究边界由双方共同确认。" : "The interface below uses sanitized demo data. Coverage, sources and research boundaries are agreed jointly for each pilot."}</p>
        </div>

        <div className={styles.productShell}>
          <div className={styles.shellBar}>
            <div><span /><span /><span /></div>
            <strong>ALWAYS-ON RESEARCH DESK</strong>
            <small>INVITED PREVIEW</small>
          </div>
          <div className={styles.shellTabs}>
            <span className={styles.shellActive}>TODAY</span><span>HYPOTHESES</span><span>CHANGE LEDGER</span>
          </div>
          <div className={styles.shellGrid}>
            <article className={styles.briefPanel}>
              <p>01 / TODAY</p>
              <h3>{isCn ? "每日研究简报" : "Daily research brief"}</h3>
              <div className={styles.briefBlock}><small>WHAT CHANGED</small><strong>{isCn ? "关键变化被压缩为三条可验证更新" : "Material changes compressed into three testable updates"}</strong></div>
              <div className={styles.briefBlock}><small>WHAT IT MEANS</small><strong>{isCn ? "分别连接至需求、瓶颈与兑现路径" : "Linked to demand, bottlenecks and realization paths"}</strong></div>
              <div className={styles.briefBlock}><small>WHAT TO TEST NEXT</small><strong>{isCn ? "下一组数据与反证条件已进入队列" : "Next data checks and falsifiers queued"}</strong></div>
            </article>
            <article className={styles.hypothesisPanel}>
              <p>02 / HYPOTHESIS BOARD</p>
              <h3>{isCn ? "有生命周期的研究命题" : "Theses with a lifecycle"}</h3>
              {[
                ["CORE / 01", isCn ? "基础设施约束的传导强度" : "Transmission strength of infrastructure constraints", "STRENGTHENING"],
                ["CORE / 02", isCn ? "需求兑现的时间窗口" : "Demand realization window", "TESTING"],
                ["RISK / 01", isCn ? "替代路径的边际变化" : "Marginal shift in substitution paths", "WATCH"],
              ].map((row) => <div className={styles.thesisRow} key={row[0]}><small>{row[0]}</small><strong>{row[1]}</strong><i>{row[2]}</i></div>)}
            </article>
            <article className={styles.ledgerPanel}>
              <p>03 / CHANGE LEDGER</p>
              <h3>{isCn ? "可回溯的证据变化" : "Traceable evidence changes"}</h3>
              {[["07:20", "SOURCE → CLAIM", "+ THESIS 01"], ["09:45", "EVENT → CAUSE", "~ THESIS 02"], ["14:10", "DATA → CHECK", "? RISK 01"]].map((row) => (
                <div className={styles.ledgerRow} key={row[0]}><time>{row[0]}</time><span /><strong>{row[1]}</strong><i>{row[2]}</i></div>
              ))}
            </article>
          </div>
          <div className={styles.shellFoot}><span>SANITIZED DEMONSTRATION</span><span>NO LIVE PORTFOLIO DATA</span><span>EVIDENCE TRACE ENABLED</span></div>
        </div>
      </section>

      <section className={styles.loop} aria-labelledby="loop-title">
        <div>
          <p className={styles.eyebrow}>OPERATING LOOP / 03</p>
          <h2 id="loop-title">{isCn ? "从变化到记忆，不止生成一份报告。" : "From change to memory—not merely another report."}</h2>
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

      <section className={styles.request} id="request-demo" aria-labelledby="request-title">
        <div>
          <p className={styles.eyebrow}>REQUEST AN INVITED DEMO / 04</p>
          <h2 id="request-title">{isCn ? "从一个真实研究命题开始。" : "Start with one real research thesis."}</h2>
          <p>{isCn ? "请在邮件中简单介绍机构或团队、关注的研究方向，以及希望通过 Desk 验证的问题。我们将共同确认首个试点的覆盖范围与数据边界。" : "Tell us briefly about your institution or team, research focus and the problem you want to test through the Desk. We will define the first pilot’s coverage and data boundaries together."}</p>
        </div>
        <a className={styles.requestButton} href={demoMailto}>
          <small>{isCn ? "当前仅限受邀演示" : "INVITED DEMOS ONLY"}</small>
          <strong>{isCn ? "预约 Research Desk 演示" : "Request a Research Desk demo"}</strong>
          <UpRightIcon />
        </a>
      </section>

      <section className={styles.boundary}>
        <p>RESEARCH COLLABORATION / CURRENT BOUNDARY</p>
        <span>{isCn ? "本页展示脱敏演示数据，用于介绍研究方法与系统能力。Research Desk 当前为受邀研究协作试点，不构成投资建议、基金募集、金融产品推介或收益承诺。" : "This page uses sanitized demo data to illustrate research methods and system capabilities. Research Desk is currently an invited research-collaboration pilot—not investment advice, fundraising, a financial-product solicitation or a promise of returns."}</span>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/">
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          <span>LUNARTULIP LAB</span>
        </Link>
        <p>ALWAYS-ON RESEARCH DESK · INVITED PREVIEW</p>
        <a href="mailto:t.stephanie@lunartuliplab.com">t.stephanie@lunartuliplab.com</a>
      </footer>
    </main>
  );
}
