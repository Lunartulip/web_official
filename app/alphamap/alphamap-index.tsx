import Image from "next/image";
import Link from "next/link";
import { alphaMapStudies } from "@/lib/research-objects";
import styles from "../proof.module.css";

function modifiedDate(item: (typeof alphaMapStudies)[number]) {
  return item.versions.at(-1)?.date ?? item.publishedAt;
}

function compareStudies(
  a: (typeof alphaMapStudies)[number],
  b: (typeof alphaMapStudies)[number],
) {
  return modifiedDate(b).localeCompare(modifiedDate(a))
    || b.publishedAt.localeCompare(a.publishedAt);
}

export default function AlphaMapIndex({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const locale = isCn ? "zh-CN" : "en";
  const prefix = isCn ? "" : "/en";
  const latestStudy = [...alphaMapStudies].sort(compareStudies)[0];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / ALPHAMAP
        </Link>
        <div className={styles.headerTools}>
          <nav className={styles.localeNav} aria-label={isCn ? "语言选择" : "Language selection"}>
            <Link className={!isCn ? styles.localeActive : undefined} href="/en/alphamap" hrefLang="en" aria-current={!isCn ? "page" : undefined}>EN</Link>
            <span>/</span>
            <Link className={isCn ? styles.localeActive : undefined} href="/alphamap" hrefLang="zh-CN" aria-current={isCn ? "page" : undefined}>CN</Link>
          </nav>
          <Link className={styles.back} href={isCn ? "/" : "/en"}>{isCn ? "返回首页 ↗" : "Home ↗"}</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>METHODS RESEARCH / ALPHAMAP</p>
          <h1>{isCn ? <>先弄清分数里有什么，<br /><span>再讨论它能否预测。</span></> : <>First identify what is inside the score.<br /><span>Then ask whether it predicts.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "AlphaMap 记录图谱、语义投影与横截面测量的研究过程。每篇研究固定图谱版本、样本、观察窗口和诊断边界，便于复核方法测到了什么。" : "AlphaMap documents research on graphs, semantic projections and cross-sectional measurement. Each study fixes the graph vintage, sample, observation window and diagnostic boundary so the method can be audited."}</p>
          <strong>DATED · REPRODUCIBLE · NON-PROMOTIONAL</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>ALPHAMAP STUDIES / {String(alphaMapStudies.length).padStart(2, "0")}</p>
            <h2>{isCn ? "方法先接受测量检查。" : "Methods face measurement checks first."}</h2>
          </div>
          <p className={styles.lead}>{isCn ? "研究从 #000 的单期投影诊断推进到 #001 的完整图因子检验：91 家候选公司、266 份时点文件和 85 个成熟周度截面。控制后仍未建立可预测的网络 alpha。" : "The series moves from the single-vintage projection diagnostic in #000 to a full graph-factor test in #001: 91 candidates, 266 dated documents and 85 mature weekly cross-sections. Predictive network alpha is still not established after controls."}</p>
        </div>
        <div className={styles.grid}>
          {[...alphaMapStudies]
            .sort(compareStudies)
            .map((item) => (
              <article className={`${styles.card} ${styles.themeCard} ${styles.featureCard}`} key={item.slug}>
                <p className={styles.meta}>{item.sourceLabel.split(" · ")[0].toUpperCase()} / PUBLISHED {item.publishedAt} · AS OF {item.asOf}</p>
                <h3>{item.renderings[locale].title}</h3>
                <p>{item.renderings[locale].standfirst}</p>
                <a href={`${prefix}/alphamap/${item.slug}`}>{isCn ? "阅读方法研究 →" : "Read the methods study →"}</a>
              </article>
            ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "产品边界" : "Product boundary"}</strong>
          <p>{isCn ? "公开页面展示可引用的方法研究和限制条件，不提供实时信号、生产组合权重、交易指令或收益承诺。机器读 Research Objects 与持续研究按用途和许可范围交付。" : "The public surface provides citable methods research and its limitations. It does not provide live signals, production portfolio weights, trading instructions or return promises. Machine-readable Research Objects and continuous research are delivered by use case and license."}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>CONTINUE THE WORK</p><h2>{isCn ? "需要接入研究系统，可以从这里开始。" : "Start here to bring the work into a research system."}</h2></div>
          <p className={styles.lead}>{isCn ? "公开研究适合审阅方法。机构可进一步讨论版本化数据、内部 Agent 接口和定制研究范围。" : "The public study supports method review. Institutions can discuss versioned data, internal-agent interfaces and scoped research work."}</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}><p className={styles.meta}>CITATION METADATA</p><h3>Research Object</h3><p>{isCn ? "读取对象 ID、版本、日期、摘要、DOI 和 canonical URL。" : "Read the object ID, version, dates, abstract, DOI and canonical URLs."}</p><Link href={`/research/${latestStudy.slug}`}>{isCn ? "打开最新公开元数据 →" : "Open the latest public metadata →"}</Link></article>
          <article className={styles.card}><p className={styles.meta}>INSTITUTIONAL ACCESS</p><h3>{isCn ? "机器读与定制研究" : "Machine-readable and scoped research"}</h3><p>{isCn ? "讨论 Research API、Alternative Dataset 或研究委托。" : "Discuss the Research API, alternative datasets or a research mandate."}</p><Link href={`${prefix}/institutional-access#intent-machine_readable_research`}>{isCn ? "联系研究团队 →" : "Contact the research team →"}</Link></article>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{isCn ? "方法研究不构成投资建议" : "Methods research is not investment advice"}</span></footer>
    </main>
  );
}
