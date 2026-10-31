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
    intent: "alternative_dataset",
    code: "01 / SYSTEMATIC EQUITY",
    titleCn: "系统化权益与基本面量化团队",
    titleEn: "Systematic equity and quantamental teams",
    bodyCn: "将产业关系、产品结构和经营变化用于科技股中低频选股、主题轮动与共同风险研究。",
    bodyEn: "Use industry relationships, product structures and operating changes in medium- and low-frequency stock selection, thematic analysis and common-risk research.",
    detailCn: "获取 AlphaMap 数据说明、字段、历史覆盖与可评估样例。",
    detailEn: "Request the AlphaMap data overview, fields, history and evaluation samples.",
  },
  {
    intent: "research_access",
    code: "02 / FUNDAMENTAL EQUITY",
    titleCn: "基本面权益投资团队",
    titleEn: "Fundamental equity investment teams",
    bodyCn: "把新的产业证据对应到公司盈利驱动，复核支持或挑战原有投资假设的变化。",
    bodyEn: "Connect new industry evidence to company earnings drivers and review what supports or challenges an existing investment thesis.",
    detailCn: "讨论一个正在跟踪的科技股主题、公司或投资判断。",
    detailEn: "Discuss a technology-equity theme, company or investment question under active review.",
  },
  {
    intent: "commissioned_mandate",
    code: "03 / INVESTMENT PLATFORM",
    titleCn: "投资研究平台与产品团队",
    titleEn: "Investment research platforms and product teams",
    bodyCn: "围绕终端投资用户的具体问题，补充科技产业分析、公司比较与投资假设跟踪能力。",
    bodyEn: "Add technology-industry analysis, company comparison and thesis monitoring around a defined end-user investment task.",
    detailCn: "讨论 AlphaMap 数据授权和专题投研方法与应用的组合方式。",
    detailEn: "Discuss a research and data partnership combining AlphaMap with a scoped methodology application.",
  },
];

export default function InstitutionalAccess({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const pagePath = isCn ? "/institutional-access" : "/en/institutional-access";
  const [intent, setIntent] = useState<InquiryIntent>("alternative_dataset");
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
      setIntent("alternative_dataset");
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
        <p className={styles.kicker}>GLOBAL TECHNOLOGY EQUITY RESEARCH & ALTERNATIVE DATA</p>
        <h1>{isCn ? <>按研究任务，<span>选择合作入口。</span></> : <>Choose the entry point <span>by research task.</span></>}</h1>
        <div className={styles.heroFoot}>
          <p>{isCn ? "LunarTulip Research 面向系统化权益、基本面权益和投资研究平台，提供 AlphaMap 科技股另类数据，以及固定范围的专题投研方法与应用。" : "LunarTulip Research works with systematic equity teams, fundamental investors and investment platforms through AlphaMap alternative data and defined research-methodology engagements."}</p>
          <span>EN / CN · INSTITUTIONAL BUY-SIDE</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="entry-title">
        <div className={styles.sectionHead}>
          <p>01 / BUY-SIDE RESEARCH TASKS</p>
          <h2 id="entry-title">{isCn ? "您的团队希望完成什么任务？" : "What does your team need to accomplish?"}</h2>
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
          <p className={styles.cardCode}>02 / TWO ENGAGEMENT FORMATS</p>
          <h2 id="alphamap-path-title">{isCn ? "两种合作方式，可以独立选择或组合。" : "Two engagement formats, available separately or together."}</h2>
        </div>
        <dl>
          <div>
            <dt>{isCn ? "AlphaMap｜科技股另类数据" : "ALPHAMAP / TECHNOLOGY EQUITY ALTERNATIVE DATA"}</dt>
            <dd>{isCn ? "适用于希望持续使用产业关系、公司经营状态及其变化数据的机构。具体主题、公司、字段、历史、更新与使用范围在数据说明和授权方案中列明。年度数据授权人民币 30 万元起，具体范围与报价在询单后确认。" : "For institutions that need continuing use of industry relationships, company operating conditions and changes over time. Coverage, fields, history, updates and permitted use are defined in the data overview and license. Annual data licenses start at US$42,000; the final scope and quote follow the inquiry."}{" "}<Link href={isCn ? "/alphamap" : "/en/alphamap"}>{isCn ? "阅读公开研究 →" : "Read the public research →"}</Link></dd>
          </div>
          <div>
            <dt>{isCn ? "专题投研方法与应用" : "SCOPED RESEARCH METHODOLOGY & APPLICATION"}</dt>
            <dd>{isCn ? "适用于已经确定研究问题、希望把相应方法用于团队实际工作的机构。交付围绕约定任务，可包含研究方法、输出、必要模块与文档，并完成参考应用和团队交接。专题项目人民币 15 万元起，具体范围与报价在询单后确认。" : "For institutions with a defined research question that want a method applied in real team workflows. Delivery may include the agreed methodology, outputs, necessary modules and documentation, plus a reference application and handoff. Scoped projects start at US$21,000; the final scope and quote follow the inquiry."}{" "}<a href="#intent-research_access">{isCn ? "讨论研究任务 →" : "Discuss a research task →"}</a></dd>
          </div>
        </dl>
      </section>

      <section className={styles.boundaries}>
        <div>
          <p className={styles.cardCode}>03 / SCOPE & LICENSING</p>
          <h2>{isCn ? "合作范围随实际研究用途确定。" : "Scope follows the actual research use."}</h2>
        </div>
        <dl>
          <div><dt>DATA LICENSE</dt><dd>{isCn ? "标准授权不自动包含第三方分发、产品内展示、再许可或模型训练。使用主体、范围、更新与权利按合作方案确认。" : "A standard license does not automatically include third-party distribution, in-product display, sublicensing or model training. Users, scope, updates and rights are agreed in the engagement."}</dd></div>
          <div><dt>SCOPED PROJECT</dt><dd>{isCn ? "项目围绕一个可界定的主题或任务展开，不自动扩大到全部主题、无限定制或完整内部系统。" : "Each project covers one defined theme or task. It does not automatically extend to every theme, unlimited customization or the complete internal system."}</dd></div>
          <div><dt>PLATFORM APPLICATION</dt><dd>{isCn ? "面向终端用户的展示、查询、分发、白标、再许可及训练用途，需要按实际应用单独确定范围与报价。" : "End-user display, querying, distribution, white-label use, sublicensing and training rights require a separately defined scope and commercial proposal."}</dd></div>
          <div><dt>PUBLIC RESEARCH</dt><dd>{isCn ? "Deep Dive、Research Series 与公开 AlphaMap 用于阅读、引用和方法评估，不等同于获授数据或完整产品权限。" : "Deep Dives, Research Series and public AlphaMap studies support reading, citation and method evaluation; they do not grant licensed data or complete product rights."}</dd></div>
        </dl>
      </section>

      <section className={styles.inquirySection} aria-labelledby="inquiry-title">
        <div className={styles.inquiryIntro}>
          <p className={styles.cardCode}>04 / INSTITUTIONAL INQUIRY</p>
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
            {status.message || (isCn ? "我们会根据研究任务匹配资料、样例与合作范围。" : "We will match the inquiry with relevant materials, samples and engagement scope.")}
          </p>
          <noscript><p className={styles.noScript}>{isCn ? "JavaScript 已关闭：提交后将打开清晰的成功或失败结果页。" : "JavaScript is off: submission opens a clear success or failure result page."}</p></noscript>
        </form>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>INSTITUTIONAL RESEARCH · DEFINED SCOPE</span></footer>
    </main>
  );
}
