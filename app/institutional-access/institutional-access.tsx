import Image from "next/image";
import Link from "next/link";
import { institutionalMailto } from "@/lib/contact";
import styles from "../proof.module.css";

const layers = [
  {
    code: "PUBLIC RESEARCH",
    titleCn: "研究样章与结果记录",
    titleEn: "Research samples and outcome records",
    bodyCn: "通过 Deep Dive、研究方法、更新记录与 Authority Ledger，快速评估研究深度、验证纪律和历史判断质量。",
    bodyEn: "Use Deep Dives, research methods, update histories and the Authority Ledger to evaluate research depth, validation discipline and prior judgment quality.",
  },
  {
    code: "CONTINUOUS BRIEFING",
    titleCn: "交易日研究简报",
    titleEn: "Trading-day research briefing",
    bodyCn: "持续跟踪市场变化、关键证据与研究优先级，帮助专业团队更快识别需要关注、验证或更新的判断。",
    bodyEn: "Track market change, key evidence and research priorities so professional teams can identify which judgments require attention, validation or revision.",
  },
  {
    code: "DEEP RESEARCH",
    titleCn: "公司与产业深度研究",
    titleEn: "Company and industry deep research",
    bodyCn: "围绕全球泛 AI 科技权益中的具体公司、产业链与价值捕获问题，提供带时间戳、证据边界和更新路径的深度研究交流。",
    bodyEn: "Explore specific companies, value chains and value-capture questions across global AI technology equities through timestamped research with explicit evidence boundaries and update paths.",
  },
  {
    code: "RESEARCH SYSTEM VIEW",
    titleCn: "双引擎研究系统方法",
    titleEn: "Dual-engine research-system method",
    bodyCn: "了解主观基本面与系统化量化如何连接证据、命题、组合约束与结果反馈，并讨论适合机构场景的研究协作方式。",
    bodyEn: "See how discretionary fundamental and systematic quant research connect evidence, theses, portfolio constraints and outcome feedback, then discuss a research format suited to your institution.",
  },
];

export default function InstitutionalAccess({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const inquiry = institutionalMailto({ source: "INSTITUTIONAL_ACCESS", topic: "Institutional Research Exchange", language });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / ACCESS
        </Link>
        <Link className={styles.back} href={isCn ? "/" : "/en"}>{isCn ? "返回首页 ↗" : "Home ↗"}</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>INSTITUTIONAL RESEARCH ACCESS</p>
          <h1>{isCn ? <>从公开研究，<br /><span>到机构级持续跟踪。</span></> : <>From public research<br /><span>to institutional continuity.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "面向公募、私募、资管机构、专业家族办公室与研究团队，围绕全球泛 AI 科技权益提供可验证研究、持续跟踪与专业研究交流。" : "For funds, asset managers, professional family offices and research teams seeking verifiable research, continuous monitoring and professional exchange across global AI technology equities."}</p>
          <strong>RESEARCH → CONTINUITY → INSTITUTIONAL EXCHANGE</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>RESEARCH FORMATS</p><h2>{isCn ? "选择适合团队的研究入口。" : "Choose the right research entry point."}</h2></div>
          <p className={styles.lead}>{isCn ? "可以先通过公开研究与结果记录评估质量，再围绕持续跟踪、深度研究问题或双引擎方法展开机构交流。具体范围、频率与信息边界根据研究目标共同确认。" : "Begin with public research and outcome records, then explore continuous monitoring, a specific deep-research question or the dual-engine method. Scope, cadence and information boundaries are agreed around the research objective."}</p>
        </div>
        <div className={styles.grid}>
          {layers.map((layer) => (
            <article className={styles.card} key={layer.code}>
              <p className={styles.meta}>{layer.code}</p>
              <h3>{isCn ? layer.titleCn : layer.titleEn}</h3>
              <p>{isCn ? layer.bodyCn : layer.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "机构研究交流" : "Institutional research exchange"}</strong>
          <p>{isCn ? "公募、私募、资管机构、专业家族办公室与研究团队，如希望围绕全球泛 AI 科技权益、双研究引擎或可验证研究记录展开专业交流，可以介绍机构背景与具体研究问题。该入口不构成投资顾问服务、产品募集或收益承诺。" : "Funds, asset managers, professional family offices and research teams may introduce their institution and a specific research question to discuss global AI technology equities, the dual research engines or verifiable research records. This channel is not investment advisory, fundraising or a promise of returns."}</p>
          <a className={styles.action} href={inquiry}>{isCn ? "发起机构研究交流 →" : "Start an institutional research exchange →"}</a>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{isCn ? "机构研究交流 · 中英文" : "Institutional research exchange · Chinese & English"}</span></footer>
    </main>
  );
}
