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
    intent: "research_model_sample",
    code: "01 / RESEARCH MODELS",
    titleCn: "持续投资判断与情景修订",
    titleEn: "Ongoing judgment and scenario revisions",
    bodyCn: "围绕具体投资问题持续更新变量、情景、判断与下一验证点。",
    bodyEn: "Maintain variables, scenarios, judgment and next tests around a defined investment question.",
    detailCn: "获取 Research Model 样例，或讨论 Research Desk 持续交付范围。",
    detailEn: "Request a Research Model sample or discuss continuous delivery through Research Desk.",
  },
  {
    intent: "alternative_dataset",
    code: "02 / ALPHAMAP DATA",
    titleCn: "PIT 产业关系、经营状态与另类特征",
    titleEn: "PIT relationships, operating states and alternative features",
    bodyCn: "将可调用的数据用于科技股中低频选股、主题轮动与共同风险研究。",
    bodyEn: "Use callable data in medium- and low-frequency stock selection, thematic rotation and common-risk research.",
    detailCn: "获取 AlphaMap 数据说明、字段、历史覆盖与可评估样例。",
    detailEn: "Request the AlphaMap data overview, fields, history and evaluation samples.",
  },
  {
    intent: "strategy_access",
    code: "03 / STRATEGY",
    titleCn: "模型组合与机构策略合作",
    titleEn: "Model portfolios and institutional strategy collaboration",
    bodyCn: "围绕已验证信号、模型组合与风险预算，按证据等级讨论合作。",
    bodyEn: "Discuss validated signals, model portfolios and risk budgets under explicit evidence standards.",
    detailCn: "审阅样本外结果、风险与 PnL attribution 的可用范围。",
    detailEn: "Review the available out-of-sample, risk and PnL-attribution evidence.",
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
      "@type": "ItemList",
      name: isCn ? "三类产品与合作入口" : "Three products and engagement routes",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "LunarTulip Research Models",
            serviceType: "Continuous investment research models",
            description: isCn ? "围绕具体投资问题持续更新变量、情景、判断与 revision。" : "Ongoing variables, scenarios, judgment and revisions around defined investment questions.",
            url: `https://lunartuliplab.com${pagePath}#intent-research_model_sample`,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            name: "AlphaMap Alternative Data",
            serviceType: "Institutional alternative-data license",
            description: isCn ? "围绕科技产业关系、公司经营状态及其变化提供时点化数据和另类特征。" : "Point-in-time technology-industry relationships, company operating states and alternative features.",
            url: `https://lunartuliplab.com${pagePath}#intent-alternative_dataset`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            name: "LunarTulip Strategies",
            serviceType: "Model portfolios and institutional strategy collaboration",
            description: isCn ? "围绕已验证信号、模型组合、风险预算与归因证据开展机构合作。" : "Institutional collaboration around validated signals, model portfolios, risk budgets and attribution evidence.",
            url: `https://lunartuliplab.com${pagePath}#intent-strategy_access`,
          },
        },
      ],
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
        <p className={styles.kicker}>RESEARCH MODELS · ALPHAMAP DATA · STRATEGIES</p>
        <h1>{isCn ? <>先选购买对象，<span>再确定合作范围。</span></> : <>Choose the purchasing object, <span>then define scope.</span></>}</h1>
        <div className={styles.heroFoot}>
          <p>{isCn ? "Research Models 交付持续判断，AlphaMap 交付可调用的数据与特征，Strategy 交付模型组合及机构策略合作。三者共享研究内核，使用权与服务责任分别约定。" : "Research Models deliver ongoing judgment. AlphaMap delivers callable data and features. Strategy delivers model portfolios and institutional collaboration. All three share one research core, with usage rights and service responsibilities scoped separately."}</p>
          <span>EN / CN · INSTITUTIONAL BUY-SIDE</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="entry-title">
        <div className={styles.sectionHead}>
          <p>01 / THREE COMMERCIAL DOORS</p>
          <h2 id="entry-title">{isCn ? "您的团队需要购买什么？" : "What does your team need to buy?"}</h2>
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
          <p className={styles.cardCode}>02 / PRODUCTS & DELIVERY</p>
          <h2 id="alphamap-path-title">{isCn ? "三类产品，共用一套研究内核。" : "Three products, one shared research core."}</h2>
        </div>
        <dl>
          <div>
            <dt>{isCn ? "RESEARCH MODELS｜持续判断与 revision" : "RESEARCH MODELS — ONGOING JUDGMENT & REVISION"}</dt>
            <dd>{isCn ? "围绕一个明确投资问题持续更新变量、情景与判断。Research Desk 是可读展示与持续交付界面，Deep Dive 提供公开证据。项目人民币 15 万元起，具体范围与报价在询单后确认。" : "Maintain variables, scenarios and judgment around one defined investment question. Research Desk is the readable continuous-delivery surface; Deep Dive provides public evidence. Engagements start at US$21,000, with final scope and quote confirmed after inquiry."}{" "}<a href="#intent-research_model_sample">{isCn ? "获取模型样例 →" : "Request a model sample →"}</a></dd>
          </div>
          <div>
            <dt>{isCn ? "ALPHAMAP DATA｜另类数据授权" : "ALPHAMAP DATA — ALTERNATIVE-DATA LICENSE"}</dt>
            <dd>{isCn ? "适用于希望持续使用 PIT 产业关系、公司经营状态与另类特征的机构。字段、历史、更新和使用范围在授权方案中列明。年度数据授权人民币 30 万元起，具体范围与报价在询单后确认。" : "For institutions that need continuing use of PIT industry relationships, company operating states and alternative features. Fields, history, updates and permitted use are defined in the license. Annual licenses start at US$42,000, with final scope and quote confirmed after inquiry."}{" "}<Link href={isCn ? "/alphamap" : "/en/alphamap"}>{isCn ? "阅读公开研究 →" : "Read the public research →"}</Link></dd>
          </div>
          <div>
            <dt>{isCn ? "STRATEGY｜模型组合与机构策略合作" : "STRATEGY — MODEL PORTFOLIOS & INSTITUTIONAL COLLABORATION"}</dt>
            <dd>{isCn ? "围绕已验证信号、模型组合与风险预算，按样本外结果和归因材料界定证据等级。具体范围在询单后确认，不在公开页面提供持仓、权重或结果承诺。" : "Collaboration around validated signals, model portfolios and risk budgets, with out-of-sample results and attribution defining the evidence level. Scope follows the inquiry; no specific holdings, weights or outcome promises are provided publicly."}{" "}<Link href={isCn ? "/strategy" : "/en/strategy"}>{isCn ? "查看 Strategy 合作边界 →" : "Review Strategy boundaries →"}</Link></dd>
          </div>
          <div>
            <dt>{isCn ? "DELIVERY LAYER｜API · CSV · JSON · MCP · SKILL" : "DELIVERY LAYER — API · CSV · JSON · MCP · SKILL"}</dt>
            <dd>{isCn ? "人用界面、结构化文件与机器接入服务于上述三类产品。部分 AlphaMap 数据可通过 Desk API 交付；高限额、批量历史与事件流按真实接入需求开放。" : "Human interfaces, structured files and machine integration deliver the three products above. Some AlphaMap data may use Desk APIs; higher limits, bulk history and event streams follow validated integration demand."}</dd>
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
          <div><dt>DESK / API ENTITLEMENT</dt><dd>{isCn ? "Desk、Pro、限额 API 与 Power/API 的字段、历史、频率和调用额度分别约定。购买 AlphaMap 不自动取得全部 Desk 或 API 权限。" : "Desk, Pro, limited API and Power/API entitlements are scoped separately by fields, history, frequency and usage limits. An AlphaMap license does not automatically grant every Desk or API right."}</dd></div>
          <div><dt>RESEARCH MODELS</dt><dd>{isCn ? "每项合作围绕一个可界定的投资问题，不自动扩大到全部主题、无限定制或完整内部系统。" : "Each engagement covers one defined investment question. It does not automatically extend to every theme, unlimited customization or the complete internal system."}</dd></div>
          <div><dt>PLATFORM APPLICATION</dt><dd>{isCn ? "面向终端用户的展示、查询、分发、白标、再许可及训练用途，需要按实际应用单独确定范围与报价。" : "End-user display, querying, distribution, white-label use, sublicensing and training rights require a separately defined scope and commercial proposal."}</dd></div>
          <div><dt>STRATEGY</dt><dd>{isCn ? "策略合作的研究范围、风险预算、证据等级和责任边界分别约定；公开内容不构成投资要约或结果承诺。" : "Strategy scope, risk budget, evidence level and responsibility are agreed separately; public content is not an investment offer or outcome promise."}</dd></div>
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
