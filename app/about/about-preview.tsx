"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { institutionalMailto } from "../../lib/contact";
import styles from "./about.module.css";

type Language = "cn" | "en";

const definitions = [
  {
    code: "RESEARCH SCOPE",
    cn: "聚焦全球泛 AI 科技产业链的跨市场二级权益研究，连接 A 股、美股与港股的技术演进、产业传导与价值兑现。",
    en: "Cross-market public-equity research across the global AI technology value chain, connecting A-share, U.S. and Hong Kong markets.",
  },
  {
    code: "WHO WE SERVE",
    cn: "服务公募、私募、资管机构与专业家族办公室中的 CIO、研究负责人、基金经理和 AI / 量化负责人。",
    en: "Serving CIOs, research heads, portfolio managers and AI or quantitative leads across funds, asset managers and professional family offices.",
  },
  {
    code: "WHAT WE BUILD",
    cn: "把研究命题、证据、主观与量化验证、风险约束、决策记录和结果反馈连接成可追溯、可复盘、可持续更新的系统。",
    en: "Connecting theses, evidence, discretionary and quantitative validation, risk constraints, decision records and outcome feedback in one traceable system.",
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" /></svg>;
}

export default function AboutPreview({ initialLanguage = "cn" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isCn = language === "cn";
  const inquiry = institutionalMailto({ source: "ABOUT_PAGE", topic: "Institutional Partnership", language });

  useEffect(() => {
    if (initialLanguage === "en") return;
    const saved = window.localStorage.getItem("lunartulip-language");
    if (saved !== "cn" && saved !== "en") return;
    const frame = window.requestAnimationFrame(() => setLanguage(saved));
    return () => window.cancelAnimationFrame(frame);
  }, [initialLanguage]);

  const choose = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("lunartulip-language", next);
    document.documentElement.lang = next === "cn" ? "zh-CN" : "en";
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={31} height={34} alt="" aria-hidden="true" />
          <span>LUNARTULIP LAB</span><i>/ ABOUT</i>
        </Link>
        <div className={styles.tools}>
          <button className={isCn ? styles.active : ""} onClick={() => choose("cn")} aria-pressed={isCn}>中</button>
          <button className={!isCn ? styles.active : ""} onClick={() => choose("en")} aria-pressed={!isCn}>EN</button>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p>CANONICAL ENTITY / LUNARTULIP LAB</p>
          <h1>{isCn ? <>面向机构主动管理的<br /><span>AI-native 投研系统实验室。</span></> : <>An AI-native research-systems lab<br /><span>for institutional active management.</span></>}</h1>
        </div>
        <p>{isCn ? "Lunartulip Lab 研究并部署能够持续接受市场反馈的买方系统，让人的产业判断、量化纪律与 Agent 工作流进入同一套责任清晰的决策基础设施。" : "Lunartulip Lab researches and deploys buy-side systems that learn from market feedback, bringing human industry judgment, quantitative discipline and agent workflows into one accountable decision infrastructure."}</p>
      </section>

      <section className={styles.definition}>
        {definitions.map((item, index) => <article key={item.code}><small>0{index + 1} / {item.code}</small><p>{isCn ? item.cn : item.en}</p></article>)}
      </section>

      <section className={styles.offers}>
        <div><p>WHAT INSTITUTIONS CAN ENGAGE TODAY</p><h2>{isCn ? "当前产品与合作入口" : "Current offers and institutional entry points"}</h2></div>
        <div className={styles.offerGrid}>
          <Link href={isCn ? "/workshop" : "/en/workshop"}><small>01 / DEPLOY</small><strong>6-Session Research System Workshop</strong><span>{isCn ? "建立投研基础、工作流、Risk Gate 与 90 天路线。" : "Install the research foundation, workflows, risk gates and a 90-day roadmap."}</span><b>{isCn ? "¥100,000 起" : "From US$15,000"}</b><ArrowIcon /></Link>
          <Link href={isCn ? "/desk" : "/en/desk"}><small>02 / OPERATE</small><strong>Always-On Research Desk</strong><span>{isCn ? "通过 B2B 受邀付费试点持续运行事件账本、假设与 Decision Memory。" : "Operate the ledger, theses and decision memory through an invited B2B paid pilot."}</span><b>{isCn ? "定制报价" : "Custom quote"}</b><ArrowIcon /></Link>
        </div>
      </section>

      <section className={styles.direction}>
        <div><p>LONG-TERM DIRECTION</p><h2>AI-native Fund /<br />Buy-side Prototype</h2></div>
        <div><p>{isCn ? "长期研究方向覆盖 AI-native 投资组织、策略验证、决策治理与持续反馈。任何未来资管业务将由具备相应主体、资质与合规框架的独立实体开展。" : "The long-term research direction spans AI-native investment organizations, strategy validation, decision governance and continuous feedback. Any future asset-management business will operate through an appropriate independent entity, qualifications and compliance framework."}</p><Link href={isCn ? "/notes/self-driving-portfolio-ai-investing" : "/notes/self-driving-portfolio-ai-investing"}>{isCn ? "阅读长期研究" : "Read the long-term research"} <ArrowIcon /></Link></div>
      </section>

      <section className={styles.identity}>
        <div><small>OFFICIAL NAME</small><strong>Lunartulip Lab</strong></div>
        <div><small>RECOGNIZED ALIASES</small><strong>LunarTulip Lab · Lunar Tulip Lab</strong></div>
        <div><small>OFFICIAL DOMAIN</small><strong>lunartuliplab.com</strong></div>
        <div><small>PUBLIC CHANNELS</small><strong>{isCn ? "微信公众号 / 小红书：Lunartulip Lab" : "WeChat Official Account / Xiaohongshu: Lunartulip Lab"}</strong></div>
      </section>

      <section className={styles.contact}>
        <div><p>CHINA & GLOBAL INSTITUTIONAL PARTNERSHIPS</p><h2>{isCn ? "从一个真实研究场景开始。" : "Start with one real research context."}</h2></div>
        <a href={inquiry}>t.stephanie@lunartuliplab.com <ArrowIcon /></a>
      </section>
    </main>
  );
}
