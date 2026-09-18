"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "@/lib/contact";
import type { InquiryIntent } from "@/lib/institutional-inquiry";
import styles from "./institutional-access.module.css";

const actions: Array<{
  intent: InquiryIntent;
  code: string;
  titleCn: string;
  titleEn: string;
  bodyCn: string;
  bodyEn: string;
  detailCn: string;
  detailEn: string;
}> = [
  {
    intent: "sample_request",
    code: "01 / SAMPLE",
    titleCn: "索取机构样章",
    titleEn: "Request an institutional sample",
    bodyCn: "先审阅代表性研究交付物，再判断方法、证据纪律与表达密度是否适合团队。",
    bodyEn: "Review a representative institutional deliverable before assessing fit, evidence discipline and analytical density.",
    detailCn: "适合首次评估，不需要提供持仓或交易凭证。",
    detailEn: "For initial evaluation; no positions or trading credentials are requested.",
  },
  {
    intent: "research_access",
    code: "02 / ACCESS",
    titleCn: "申请 Lunartulip Research Desk",
    titleEn: "Apply for Lunartulip Research Desk",
    bodyCn: "按「专业投资者或机构 × Coverage Track × 固定周期」订阅，持续获得围绕 AI 科技主题维护的人读研究。",
    bodyEn: "An always-on thematic investment intelligence subscription for a focused set of AI technology themes, purchased by professional investor or institution × Coverage Track × fixed term.",
    detailCn: "包含 State Change Brief、Coverage Review、Deep Dive、Research Models 与有限 Briefing；机器读 API 和另类数据另行约定。",
    detailEn: "Includes State Change Briefs, Coverage Reviews, Deep Dives, Research Models and limited Briefings. Machine-readable APIs and alternative datasets are scoped separately.",
  },
  {
    intent: "machine_readable_research",
    code: "03 / API",
    titleCn: "讨论机器可读 Research API",
    titleEn: "Discuss the machine-readable Research API",
    bodyCn: "把同一套 Research Object、Claim、Evidence、版本与证伪条件交付给内部 Agent、知识库或研究工作流。",
    bodyEn: "Deliver the same Research Objects, claims, evidence, versions and falsifiers into internal agents, knowledge bases or research workflows.",
    detailCn: "按 coverage、字段、更新频率与内部使用场景定义权限；不是公开行情 API。",
    detailEn: "Access is scoped by coverage, fields, update frequency and internal use case; this is not a public market-data API.",
  },
  {
    intent: "alternative_dataset",
    code: "04 / DATA",
    titleCn: "讨论 Quant 买方 Alternative Dataset",
    titleEn: "Discuss alternative datasets for quant investors",
    bodyCn: "面向系统化与 quantamental 买方，提供 point-in-time 的命题、事件、状态、因子候选与证据归属数据。",
    bodyEn: "Point-in-time thesis, event, state, candidate-factor and evidence-attribution data for systematic and quantamental buy-side teams.",
    detailCn: "先定义研究用途、历史覆盖、可回测口径、许可与数据权利边界，再评估交付。",
    detailEn: "Research use, history, backtest basis, licensing and data-rights boundaries are defined before delivery is assessed.",
  },
  {
    intent: "commissioned_mandate",
    code: "05 / MANDATE",
    titleCn: "提交 Commissioned Deep Dive / Theme Mandate",
    titleEn: "Submit a Commissioned Deep Dive / Theme Mandate",
    bodyCn: "仅接受既有 coverage 与长期研究主线内、能够沉淀进持续研究系统的问题。",
    bodyEn: "Accepted only within existing coverage and long-horizon research threads that compound into the ongoing research system.",
    detailCn: "范围限于既有能力圈，不接受临时尽调、代写及无关命题。",
    detailEn: "Not a general outsourcing, ad-hoc diligence, ghostwriting or arbitrary topic service.",
  },
  {
    intent: "research_system_diagnostic",
    code: "06 / WORKSHOP",
    titleCn: "讨论 6-Session AI-native 投研框架 Workshop",
    titleEn: "Discuss the 6-Session AI-native Research Framework Workshop",
    bodyCn: "公开价格：人民币 ¥100,000 起 / US$15,000 起。六次工作会议用于诊断、架构设计与共同工作。",
    bodyEn: "Public starting price: ¥100,000 / US$15,000. Six working sessions cover diagnosis, architecture and collaborative work.",
    detailCn: "默认不含源码交付、代为实施或无限期支持；超出边界的工作另行定义。",
    detailEn: "Source-code delivery, implementation and unlimited support are not included by default; additional work is scoped separately.",
  },
];

export default function InstitutionalAccess({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const pagePath = isCn ? "/institutional-access" : "/en/institutional-access";
  const [intent, setIntent] = useState<InquiryIntent>("sample_request");
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const directEmail = institutionalMailto({
    source: "INSTITUTIONAL_ACCESS_FALLBACK",
    topic: isCn ? "机构研究询盘" : "Institutional Research Inquiry",
    language,
  });

  useEffect(() => {
    const applyHashIntent = () => {
      const requestedIntent = window.location.hash.replace("#intent-", "") as InquiryIntent;
      if (actions.some((action) => action.intent === requestedIntent)) setIntent(requestedIntent);
    };
    const frame = window.requestAnimationFrame(applyHashIntent);
    window.addEventListener("hashchange", applyHashIntent);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", applyHashIntent);
    };
  }, []);

  function chooseIntent(nextIntent: InquiryIntent) {
    setIntent(nextIntent);
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending", message: isCn ? "正在安全发送…" : "Sending securely…" });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const result = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await result.json()) as { message?: string };
      if (!result.ok) throw new Error(payload.message || (isCn ? "提交失败。" : "Submission failed."));
      setStatus({ kind: "success", message: payload.message || (isCn ? "询盘已发送。" : "Inquiry sent.") });
      form.reset();
      setIntent("sample_request");
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : isCn ? "暂时无法发送，请直接邮件联系。" : "Unable to send; please email us directly.",
      });
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isCn ? "机构研究入口" : "Institutional Research Access",
    url: `https://lunartuliplab.com${pagePath}`,
    mainEntity: {
      "@type": "OfferCatalog",
      name: isCn ? "机构研究服务目录" : "Institutional research service catalog",
      itemListElement: actions.map((action) => ({
        "@type": "Offer",
        name: isCn ? action.titleCn : action.titleEn,
        category: "Institutional research service",
        description: isCn ? action.bodyCn : action.bodyEn,
      })),
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / ACCESS
        </Link>
        <nav className={styles.nav}>
          <Link href={isCn ? "/en/institutional-access" : "/institutional-access"}>{isCn ? "EN" : "中文"}</Link>
          <Link href={isCn ? "/" : "/en"}>{isCn ? "首页 ↗" : "Home ↗"}</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>RESEARCH PRODUCTS & SERVICES / 2026</p>
        <h1>{isCn ? <>先选合作方式，<span>再提交研究问题。</span></> : <>Choose the engagement, <span>then bring the research question.</span></>}</h1>
        <div className={styles.heroFoot}>
          <p>{isCn ? "六种合作方式覆盖公开研究样章、AI 科技主题研究订阅、机器读 API、另类数据、研究委托与六次投研框架 Workshop。" : "Six routes cover public research samples, thematic investment intelligence subscriptions, machine-readable APIs, alternative datasets, scoped mandates and a six-session institutional research-system workshop."}</p>
          <span>EN / CN · PROFESSIONAL & INSTITUTIONAL</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="entry-title">
        <div className={styles.sectionHead}>
          <p>01 / ENGAGEMENT ROUTES</p>
          <h2 id="entry-title">{isCn ? "选择一个明确动作" : "Choose one explicit action"}</h2>
        </div>
        <div className={styles.actionGrid}>
          {actions.map((action) => (
            <article id={`intent-${action.intent}`} className={intent === action.intent ? styles.actionCardActive : styles.actionCard} key={action.intent}>
              <p className={styles.cardCode}>{action.code}</p>
              <h3>{isCn ? action.titleCn : action.titleEn}</h3>
              <p>{isCn ? action.bodyCn : action.bodyEn}</p>
              <small>{isCn ? action.detailCn : action.detailEn}</small>
              <button type="button" onClick={() => chooseIntent(action.intent)}>
                {isCn ? "选择并填写询盘 →" : "Select and submit →"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.boundaries} aria-labelledby="alphamap-path-title">
        <div>
          <p className={styles.cardCode}>02 / PUBLIC SAMPLE TO LICENSED DELIVERY</p>
          <h2 id="alphamap-path-title">{isCn ? "先读 AlphaMap，再选择持续或机器读交付。" : "Read AlphaMap first, then choose continuous or machine-readable delivery."}</h2>
        </div>
        <dl>
          <div>
            <dt>PUBLIC ALPHAMAP SAMPLE</dt>
            <dd>{isCn ? "公开样章呈现产业因果、价值传导、可证伪假设与引用元数据；受许可数据集按用途、许可与数据权利单独交付。" : "The public sample presents industry causality, value transmission, falsifiable hypotheses and citation metadata. The article is not a licensed dataset."}{" "}<Link href={isCn ? "/alphamap" : "/en/alphamap"}>{isCn ? "阅读 AlphaMap →" : "Read AlphaMap →"}</Link></dd>
          </div>
          <div>
            <dt>LICENSED RESEARCH API / ALTERNATIVE DATASET</dt>
            <dd>{isCn ? "需要结构化历史、字段级更新或系统接入时，再按 coverage、用途、许可与数据权利边界讨论交付。" : "For structured history, field-level updates or system integration, delivery is scoped by coverage, use, licensing and data rights."}{" "}<a href="#intent-machine_readable_research">{isCn ? "查看机器读路径 →" : "View the machine-readable path →"}</a></dd>
          </div>
        </dl>
      </section>

      <section className={styles.boundaries}>
        <div>
          <p className={styles.cardCode}>03 / OPERATING BOUNDARIES</p>
          <h2>{isCn ? "合作单位与工作边界" : "Delivery units and working boundaries, stated upfront."}</h2>
        </div>
        <dl>
          <div><dt>RESEARCH DESK</dt><dd>{isCn ? "面向 AI 科技主题的持续研究订阅，以专业投资者或机构 × Coverage Track × 固定周期为合作单位；交付状态变化、coverage 复核、深度研究、研究模型与有限 briefing。" : "Always-on thematic investment intelligence for AI technology, scoped as professional investor or institution × Coverage Track × fixed term; delivering state changes, coverage reviews, deep research, research models and limited briefings."}</dd></div>
          <div><dt>API / DATASET</dt><dd>{isCn ? "按 coverage、字段、历史、更新频率、许可与内部研究用途定义；不把未获权利的数据重新包装为产品。" : "Scoped by coverage, fields, history, update frequency, licensing and internal research use; data without appropriate rights is not repackaged as a product."}</dd></div>
          <div><dt>COMMISSIONED</dt><dd>{isCn ? "只接受既有 coverage 与长期主线内的命题，研究团队按既有能力圈接题。" : "Only within existing coverage and long-term threads; the research team is not positioned as an arbitrary-topic contractor."}</dd></div>
          <div><dt>DIAGNOSTIC</dt><dd>{isCn ? "六次会议覆盖现状诊断、目标架构与共同工作。源码、实施和持续支持不默认包含。" : "Six sessions span current-state diagnosis, target architecture and joint work. Code, implementation and ongoing support are excluded by default."}</dd></div>
        </dl>
      </section>

      <section className={styles.inquirySection} aria-labelledby="inquiry-title">
        <div className={styles.inquiryIntro}>
          <p className={styles.cardCode}>04 / STRUCTURED INQUIRY</p>
          <h2 id="inquiry-title">{isCn ? "用一个具体问题开始。" : "Start with one concrete question."}</h2>
          <p>{isCn ? "请说明机构、角色、研究问题与时间预期。不要提交持仓、交易凭证、账户信息或其他敏感数据。" : "Tell us your institution, role, research question and expected timeline. Do not submit positions, trading credentials, account information or other sensitive data."}</p>
          <p className={styles.compliance}>{isCn ? "本入口不构成投资顾问服务、产品募集、投资要约或收益承诺。" : "This channel is not investment advice, fundraising, an investment offer or a promise of returns."}</p>
          <a href={directEmail}>{isCn ? `表单不可用？直接邮件 ${INSTITUTIONAL_EMAIL}` : `Form unavailable? Email ${INSTITUTIONAL_EMAIL}`}</a>
        </div>

        <form ref={formRef} className={styles.form} action="/api/institutional-inquiry" method="post" onSubmit={submitInquiry}>
          <input type="hidden" name="source" value="institutional_access" />
          <input type="hidden" name="language" value={isCn ? "zh" : "en"} />
          <input type="hidden" name="pagePath" value={pagePath} />
          <label>
            <span>{isCn ? "合作意向" : "Inquiry type"}</span>
            <select name="intent" value={intent} onChange={(event) => setIntent(event.target.value as InquiryIntent)} required>
              {actions.map((action) => <option value={action.intent} key={action.intent}>{isCn ? action.titleCn : action.titleEn}</option>)}
            </select>
          </label>
          <div className={styles.twoColumns}>
            <label><span>{isCn ? "机构名称" : "Organization"}</span><input name="organization" maxLength={160} autoComplete="organization" required /></label>
            <label><span>{isCn ? "您的角色" : "Role"}</span><input name="role" maxLength={120} autoComplete="organization-title" required /></label>
            <label><span>{isCn ? "姓名" : "Name"}</span><input name="name" maxLength={120} autoComplete="name" required /></label>
            <label><span>{isCn ? "工作邮箱" : "Work email"}</span><input name="email" type="email" maxLength={254} autoComplete="email" required /></label>
          </div>
          <label><span>{isCn ? "具体研究问题" : "Research question"}</span><textarea name="researchQuestion" maxLength={3000} rows={7} required /></label>
          <label><span>{isCn ? "时间预期" : "Expected timeline"}</span><textarea name="timeline" maxLength={500} rows={3} required /></label>
          <label className={styles.honeypot} aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
          <button className={styles.submit} type="submit" disabled={status.kind === "sending"}>
            {status.kind === "sending" ? (isCn ? "发送中…" : "Sending…") : (isCn ? "提交结构化询盘 →" : "Submit structured inquiry →")}
          </button>
          <p className={`${styles.formStatus} ${status.kind === "error" ? styles.error : ""}`} role="status" aria-live="polite">
            {status.message || (isCn ? "提交后，邮件主题与正文会记录唯一的 source 与 intent。" : "The email subject and body retain the unique source and intent.")}
          </p>
          <noscript><p className={styles.noScript}>{isCn ? "JavaScript 已关闭：提交后将打开清晰的成功或失败结果页。" : "JavaScript is off: submission opens a clear success or failure result page."}</p></noscript>
        </form>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>INSTITUTIONAL RESEARCH · DEFINED SCOPE</span></footer>
    </main>
  );
}
