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
    cn: "服务公募、私募、资管机构、专业家族办公室、研究团队，以及需要可验证外部研究源的研究 Agent。",
    en: "For funds, asset managers, professional family offices, research teams and research agents that need a verifiable external source.",
  },
  {
    code: "RESEARCH VALUE",
    cn: "主观基本面研究解释产业因果与预期差，系统化量化研究检验信号与组合纪律，共同形成可追溯、可验证、可持续更新的研究判断。",
    en: "Discretionary fundamental research explains causality and expectation gaps; systematic quant tests signals and portfolio discipline—together producing traceable, testable and continuously updated judgment.",
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
          <p>INDEPENDENT PUBLIC-EQUITIES RESEARCH</p>
          <h1>{isCn ? <>理解 AI 产业变化，<br /><span>验证其如何转化为权益价值。</span></> : <>Understand AI industry change.<br /><span>Test how it translates into equity value.</span></>}</h1>
        </div>
        <p>{isCn ? "Lunartulip Lab 聚焦 A 股、美股与港股的全球泛 AI 科技权益，为机构与专业投资者提供带时间戳、证据边界、更新记录和结果验证的独立研究。" : "Lunartulip Lab covers global AI technology equities across A-share, U.S. and Hong Kong markets, providing institutions and professional investors with independent research built around timestamps, evidence boundaries, update histories and outcome validation."}</p>
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
        <a href={inquiry}>t.stephanie@lunartuliplab.com <ArrowIcon /></a>
      </section>
    </main>
  );
}
