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
    titleCn: "申请 Institutional Research Access",
    titleEn: "Apply for Institutional Research Access",
    bodyCn: "购买单位为「机构 × Coverage Track × 固定周期」，不是个人订阅或无限制研究请求。",
    bodyEn: "Purchased as institution × Coverage Track × fixed term—not an individual subscription or unlimited request queue.",
    detailCn: "包含 State Change Brief、Coverage Review、Deep Dive、Research Models 与有限 Briefing。",
    detailEn: "Includes State Change Briefs, Coverage Reviews, Deep Dives, Research Models and limited Briefings.",
  },
  {
    intent: "commissioned_mandate",
    code: "03 / MANDATE",
    titleCn: "提交 Commissioned Deep Dive / Theme Mandate",
    titleEn: "Submit a Commissioned Deep Dive / Theme Mandate",
    bodyCn: "仅接受既有 coverage 与长期研究主线内、能够沉淀进持续研究系统的问题。",
    bodyEn: "Accepted only within existing coverage and long-horizon research threads that compound into the ongoing research system.",
    detailCn: "范围限于既有能力圈，不接受临时尽调、代写及无关命题。",
    detailEn: "Not a general outsourcing, ad-hoc diligence, ghostwriting or arbitrary topic service.",
  },
  {
    intent: "research_system_diagnostic",
    code: "04 / DIAGNOSTIC",
    titleCn: "讨论 6-Session AI-native Research System Diagnostic",
    titleEn: "Discuss the 6-Session AI-native Research System Diagnostic",
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
    const requestedIntent = window.location.hash.replace("#intent-", "") as InquiryIntent;
    if (actions.some((action) => action.intent === requestedIntent)) setIntent(requestedIntent);
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
        <p className={styles.kicker}>INSTITUTIONAL RESEARCH ACCESS / 2026</p>
        <h1>{isCn ? <>先选合作方式，<span>再提交研究问题。</span></> : <>Choose the engagement, <span>then bring the research question.</span></>}</h1>
        <div className={styles.heroFoot}>
          <p>{isCn ? "页面列出四种合作方式及各自边界。双方先确认目标、coverage 与周期，再决定是否合作。" : "Four entry points with four explicit boundaries. We align on objective, coverage and term before any engagement."}</p>
          <span>CN / EN · INSTITUTIONAL ONLY</span>
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

      <section className={styles.boundaries}>
        <div>
          <p className={styles.cardCode}>02 / OPERATING BOUNDARIES</p>
          <h2>{isCn ? "合作单位与工作边界" : "Delivery units and working boundaries, stated upfront."}</h2>
        </div>
        <dl>
          <div><dt>RESEARCH ACCESS</dt><dd>{isCn ? "机构 × Coverage Track × 固定周期；交付状态变化、coverage 复核、深度研究、研究模型与有限 briefing。" : "Institution × Coverage Track × fixed term; state changes, coverage review, deep research, research models and limited briefings."}</dd></div>
          <div><dt>COMMISSIONED</dt><dd>{isCn ? "只接受既有 coverage 与长期主线内的命题，研究团队按既有能力圈接题。" : "Only within existing coverage and long-term threads; the research team is not positioned as an arbitrary-topic contractor."}</dd></div>
          <div><dt>DIAGNOSTIC</dt><dd>{isCn ? "六次会议覆盖现状诊断、目标架构与共同工作。源码、实施和持续支持不默认包含。" : "Six sessions span current-state diagnosis, target architecture and joint work. Code, implementation and ongoing support are excluded by default."}</dd></div>
        </dl>
      </section>

      <section className={styles.inquirySection} aria-labelledby="inquiry-title">
        <div className={styles.inquiryIntro}>
          <p className={styles.cardCode}>03 / STRUCTURED INQUIRY</p>
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
