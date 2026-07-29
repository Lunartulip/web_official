"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { institutionalMailto } from "../../lib/contact";
import styles from "./workshop.module.css";

type Language = "cn" | "en";

const sessions = [
  {
    code: "01 / DIAGNOSE",
    cn: "投研流程与数据边界",
    en: "Workflow and data boundaries",
    bodyCn: "选定一个代表性研究场景，梳理信息入口、判断节点、责任人、数据权限与当前断点。",
    bodyEn: "Choose one representative research context and map information entry points, judgment nodes, owners, permissions and current breaks.",
    outputCn: "现状诊断图 · 优先级清单",
    outputEn: "Current-state map · priority list",
  },
  {
    code: "02 / THESIS",
    cn: "命题、证据与反证条件",
    en: "Theses, evidence and falsification",
    bodyCn: "把研究直觉转化为 Hypothesis Card，明确证据强度、时间窗口、反证条件和下一验证点。",
    bodyEn: "Turn research intuition into hypothesis cards with evidence strength, time windows, falsification criteria and next validation points.",
    outputCn: "Hypothesis Card · Evidence Schema",
    outputEn: "Hypothesis cards · evidence schema",
  },
  {
    code: "03 / WORKFLOW",
    cn: "可复用 Agent 工作流",
    en: "Reusable agent workflows",
    bodyCn: "把高质量研究动作拆成 Skill、SOP 与 Agent 任务，标记输入、来源、验收与升级条件。",
    bodyEn: "Decompose high-quality research moves into skills, SOPs and agent tasks with inputs, sources, review and escalation conditions.",
    outputCn: "Skill / SOP · 端到端示范",
    outputEn: "Skills / SOPs · end-to-end demonstration",
  },
  {
    code: "04 / VALIDATE",
    cn: "主观与量化验证",
    en: "Discretionary and quantitative validation",
    bodyCn: "连接产业命题、因子实验、情景分析与失效条件，让两套研究语言进入同一张验证记录。",
    bodyEn: "Connect industry theses, factor experiments, scenarios and failure conditions in one validation record.",
    outputCn: "验证矩阵 · 风险边界",
    outputEn: "Validation matrix · risk boundaries",
  },
  {
    code: "05 / GOVERN",
    cn: "Risk Gate 与人工责任",
    en: "Risk gates and human accountability",
    bodyCn: "定义 AI 输出进入研究、组合讨论与决策记录前的验收规则、责任节点和敏感数据边界。",
    bodyEn: "Define review rules, accountable owners and sensitive-data boundaries before AI output enters research and decision records.",
    outputCn: "Risk Gate · 人工验收规则",
    outputEn: "Risk gates · human review rules",
  },
  {
    code: "06 / REMEMBER",
    cn: "Decision Memory 与实施路线",
    en: "Decision memory and implementation",
    bodyCn: "把预期、动作、结果与偏差连接起来，确定接下来 90 天的系统实施、团队协作和复盘节奏。",
    bodyEn: "Connect expectations, actions, outcomes and error sources, then define the next 90 days of implementation and review.",
    outputCn: "Decision Memory 蓝图 · 90 天路线",
    outputEn: "Decision-memory blueprint · 90-day roadmap",
  },
];

const faqs = [
  {
    qCn: "六个 Session 是培训课程吗？",
    qEn: "Is this a training course?",
    aCn: "它是一项围绕真实研究场景的系统部署工作。每次 Session 都产生可用资产，最终形成团队可继续实施的基础系统与路线。",
    aEn: "It is a deployment engagement around a live research context. Every session produces a usable system asset and contributes to an implementable foundation.",
  },
  {
    qCn: "谁需要参与？",
    qEn: "Who should participate?",
    aCn: "建议由 CIO、研究总监或 PM 作为责任人，核心共建团队通常不超过 8 人；合规、IT 与数据负责人按相关 Session 参与。",
    aEn: "An accountable CIO, research head or PM should lead. The core working group is typically up to eight people, with compliance, IT and data owners joining relevant sessions.",
  },
  {
    qCn: "完成后如何进入 Research Desk？",
    qEn: "How does the Research Desk follow?",
    aCn: "机构可以独立实施，也可以围绕一个研究命题进入付费试点。已有成熟流程的机构可先做 readiness assessment，再直接进入 Desk 试点。",
    aEn: "The institution may implement independently or begin a paid pilot around one research thesis. Mature teams can enter through a readiness assessment.",
  },
  {
    qCn: "价格包含哪些范围？",
    qEn: "What does the starting price cover?",
    aCn: "起价覆盖 6 个远程工作 Session、会前准备、阶段材料与最终实施路线。额外定制、税费、差旅及现场工作单独确认。",
    aEn: "The starting price covers six remote working sessions, preparation, working artifacts and the implementation roadmap. Additional customization, taxes, travel and onsite work are quoted separately.",
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" /></svg>;
}

function UpRightIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

export default function WorkshopPreview({ initialLanguage = "cn" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isCn = language === "cn";
  const inquiry = institutionalMailto({
    source: "WORKSHOP_PAGE",
    topic: "6-Session Research System Workshop",
    language,
  });

  useEffect(() => {
    if (initialLanguage === "en") return;
    const saved = window.localStorage.getItem("lunartulip-language");
    if (saved !== "cn" && saved !== "en") return;
    const frame = window.requestAnimationFrame(() => setLanguage(saved));
    return () => window.cancelAnimationFrame(frame);
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
          <i>/ WORKSHOP</i>
        </Link>
        <div className={styles.headerActions}>
          <div className={styles.language} aria-label={isCn ? "语言选择" : "Language selection"}>
            <button type="button" className={isCn ? styles.active : ""} aria-pressed={isCn} onClick={() => selectLanguage("cn")}>中</button>
            <button type="button" className={!isCn ? styles.active : ""} aria-pressed={!isCn} onClick={() => selectLanguage("en")}>EN</button>
          </div>
          <a className={styles.headerCta} href={inquiry}>{isCn ? "预约机构诊断" : "Book a diagnostic"} <UpRightIcon /></a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>SIX-SESSION INSTITUTIONAL DEPLOYMENT</p>
          <h1>{isCn ? <>把现有投研方法，<br /><span>部署成可运行的 AI-native 系统。</span></> : <>Install your research method<br /><span>as an operating AI-native system.</span></>}</h1>
          <p className={styles.lead}>
            {isCn
              ? "围绕一个真实投研场景，在 6 个工作 Session 中完成流程诊断、命题与证据结构、Agent 工作流、Risk Gate、Decision Memory 和 90 天实施路线。"
              : "Six working sessions around one live investment-research context—from workflow diagnosis and thesis structure to agent workflows, risk gates, decision memory and a 90-day implementation roadmap."}
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={inquiry}>{isCn ? "讨论机构场景" : "Discuss your institutional context"} <UpRightIcon /></a>
            <a className={styles.textLink} href="#sessions">{isCn ? "查看 6 个 Session" : "View the six sessions"} <ArrowIcon /></a>
          </div>
        </div>
        <aside className={styles.offer}>
          <p>FIXED-SCOPE STARTING POINT</p>
          <div><strong>{isCn ? "¥100,000 起" : "From US$15,000"}</strong><span>{isCn ? "6 个远程工作 Session" : "Six remote working sessions"}</span></div>
          <dl>
            <div><dt>{isCn ? "周期" : "TIMELINE"}</dt><dd>{isCn ? "通常 6–8 周" : "Typically 6–8 weeks"}</dd></div>
            <div><dt>{isCn ? "核心团队" : "CORE TEAM"}</dt><dd>{isCn ? "建议不超过 8 人" : "Up to eight working members"}</dd></div>
            <div><dt>{isCn ? "最终交付" : "FINAL OUTPUT"}</dt><dd>{isCn ? "基础系统 + 90 天实施路线" : "System foundation + 90-day roadmap"}</dd></div>
          </dl>
          <small>{isCn ? "定制范围、税费、差旅与现场工作另议。" : "Customization, taxes, travel and onsite work quoted separately."}</small>
        </aside>
      </section>

      <section className={styles.sessions} id="sessions" aria-labelledby="sessions-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>DEPLOYMENT SEQUENCE / 01</p><h2 id="sessions-title">{isCn ? "六次共同工作，形成一套基础系统。" : "Six working sessions form one system foundation."}</h2></div>
          <p>{isCn ? "每次 Session 都以机构的真实材料、真实流程和明确责任边界为输入，并留下可继续使用的系统资产。" : "Each session uses real institutional materials, workflows and accountability boundaries, leaving behind reusable system assets."}</p>
        </div>
        <div className={styles.sessionGrid}>
          {sessions.map((session) => (
            <article key={session.code}>
              <p>{session.code}</p>
              <h3>{isCn ? session.cn : session.en}</h3>
              <span>{isCn ? session.bodyCn : session.bodyEn}</span>
              <strong>{isCn ? session.outputCn : session.outputEn}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pathway} aria-labelledby="pathway-title">
        <div><p className={styles.eyebrow}>WHAT FOLLOWS / 02</p><h2 id="pathway-title">{isCn ? "完成部署后，系统可以独立实施，也可以持续运行。" : "After deployment, implement independently or keep the system operating."}</h2></div>
        <div className={styles.pathwaySteps}>
          <article><small>01</small><strong>WORKSHOP</strong><span>{isCn ? "建立共同语言、系统基础与验收规则" : "Establish shared language, system foundations and review rules"}</span></article>
          <i><ArrowIcon /></i>
          <article><small>02</small><strong>RESEARCH DESK PILOT</strong><span>{isCn ? "围绕一个真实命题验证持续研究回路" : "Validate the operating loop around one live thesis"}</span></article>
          <i><ArrowIcon /></i>
          <article><small>03</small><strong>PRIVATE ADAPTATION</strong><span>{isCn ? "按需进入内部数据、权限与治理环境" : "Adapt to internal data, permissions and governance as needed"}</span></article>
        </div>
        <Link className={styles.deskLink} href={isCn ? "/desk" : "/en/desk"}>{isCn ? "查看 Always-On Research Desk" : "Explore the Always-On Research Desk"} <ArrowIcon /></Link>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div><p className={styles.eyebrow}>QUESTIONS / 03</p><h2 id="faq-title">{isCn ? "机构采购前通常会问。" : "Questions institutions ask before engaging."}</h2></div>
        <div>
          {faqs.map((item) => <details key={item.qEn}><summary>{isCn ? item.qCn : item.qEn}<span>+</span></summary><p>{isCn ? item.aCn : item.aEn}</p></details>)}
        </div>
      </section>

      <section className={styles.request}>
        <div><p className={styles.eyebrow}>START WITH A REAL CONTEXT</p><h2>{isCn ? "先确认这一部署是否适合您的团队。" : "First confirm whether this deployment fits your team."}</h2><p>{isCn ? "请介绍机构类型、研究责任人、一个代表性场景与当前最希望解决的断点。首次邮件无需包含持仓或敏感数据。" : "Tell us your institution type, accountable research owner, one representative context and the current bottleneck. No holdings or sensitive data are needed in the first email."}</p></div>
        <a href={inquiry}><small>{isCn ? "6-SESSION WORKSHOP" : "SIX-SESSION DEPLOYMENT"}</small><strong>{isCn ? "预约机构诊断" : "Book an institutional diagnostic"}</strong><UpRightIcon /></a>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}><Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" /><span>LUNARTULIP LAB</span></Link>
        <p>{isCn ? "机构投研系统部署 · 中国及全球" : "Institutional research-system deployment · China and global"}</p>
        <a href={inquiry}>t.stephanie@lunartuliplab.com</a>
      </footer>
    </main>
  );
}
