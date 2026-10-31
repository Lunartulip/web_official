"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "../../lib/contact";
import styles from "./about.module.css";

type Language = "cn" | "en";

const definitions = [
  {
    code: "RESEARCH SCOPE",
    cn: "聚焦全球科技股，重点研究 AI 产业链与相关投资主题。",
    en: "Global technology equities, with an emphasis on the AI value chain and related investment themes.",
  },
  {
    code: "WHO WE SERVE",
    cn: "面向系统化权益与基本面量化团队、基本面权益投资团队，以及投资研究平台与产品团队。",
    en: "For systematic and quantamental teams, fundamental equity investors, and investment research platforms.",
  },
  {
    code: "RESEARCH VALUE",
    cn: "结合产业与公司基本面分析、量化研究和 AlphaMap 另类数据，为股票选择、投资假设跟踪与主题研究提供研究输入和方法支持。",
    en: "Fundamental analysis, quantitative research and AlphaMap alternative data support stock selection, investment thesis monitoring and thematic research.",
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
          <p>GLOBAL TECHNOLOGY EQUITY RESEARCH & ALTERNATIVE DATA</p>
          <h1>{isCn ? <>全球科技股的<br /><span>基本面与量化研究。</span></> : <>Fundamental and quantitative research<br /><span>for global technology equities.</span></>}</h1>
        </div>
        <p>{isCn ? "LunarTulip Research 是一家聚焦全球科技股的独立研究机构。我们研究产业变化怎样进入公司的收入、利润与现金流，以及这些变化相对于既有预期意味着什么。" : "LunarTulip Research is an independent research firm focused on global technology equities. We study how industry change reaches company revenue, profit and cash flow, and what it means relative to existing expectations."}</p>
      </section>

      <section className={styles.definition}>
        {definitions.map((item, index) => <article key={item.code}><small>0{index + 1} / {item.code}</small><p>{isCn ? item.cn : item.en}</p></article>)}
      </section>

      <section className={styles.offers}>
        <div><p>RESEARCH & OUTCOMES</p><h2>{isCn ? "从研究作品到结果记录。" : "From research work to outcome records."}</h2></div>
        <div className={styles.offerGrid}>
          <Link href={isCn ? "/deep-dive" : "/en/deep-dive"}><small>01 / RESEARCH</small><strong>Lunartulip Deep Dive</strong><span>{isCn ? "阅读带 as-of 日期、关键证据、风险边界与更新记录的旗舰研究样章。" : "Read flagship research with as-of dates, key evidence, risk boundaries and update histories."}</span><b>VERSIONED RESEARCH</b><ArrowIcon /></Link>
          <Link href={isCn ? "/authority-ledger" : "/en/authority-ledger"}><small>02 / OUTCOMES</small><strong>Authority Ledger</strong><span>{isCn ? "查看历史判断的聚合结果、双基准、样本口径与计算方法。" : "Review aggregate outcomes, dual benchmarks, cohort definitions and methodology for prior judgments."}</span><b>AGGREGATE OUTCOMES</b><ArrowIcon /></Link>
        </div>
      </section>

      <section className={styles.direction}>
        <div><p>LONG-TERM DIRECTION</p><h2>{isCn ? <>从判断质量，<br />到资本结果。</> : <>From judgment quality<br />to capital outcomes.</>}</h2></div>
        <div><p>{isCn ? "长期研究聚焦 AI-native 投资组织如何在真实资本责任下持续验证判断、管理风险并从结果中学习。任何未来资管业务将在相应主体、资质与合规框架完备后独立开展。" : "Our long-term research examines how an AI-native investment organization tests judgment, governs risk and learns from outcomes under real capital accountability. Any future asset-management activity will operate separately under the appropriate entity, qualifications and compliance framework."}</p><Link href="/notes/self-driving-portfolio-ai-investing">{isCn ? "阅读长期研究" : "Read the long-term research"} <ArrowIcon /></Link></div>
      </section>

      <section className={styles.identity}>
        <div><small>OFFICIAL NAME</small><strong>Lunartulip Lab</strong></div>
        <div><small>RECOGNIZED ALIASES</small><strong>LunarTulip Lab · Lunar Tulip Lab</strong></div>
        <div><small>OFFICIAL DOMAIN</small><strong>lunartuliplab.com</strong></div>
        <div><small>PUBLIC CHANNELS</small><strong>{isCn ? "微信公众号 / 小红书：Lunartulip Lab" : "WeChat Official Account / Xiaohongshu: Lunartulip Lab"}</strong></div>
      </section>

      <section className={styles.contact}>
        <div><p>CHINA & GLOBAL RESEARCH EXCHANGE</p><h2>{isCn ? "从一个具体研究问题开始。" : "Start with one specific research question."}</h2></div>
        <a href={inquiry}>{INSTITUTIONAL_EMAIL} <ArrowIcon /></a>
      </section>
    </main>
  );
}
