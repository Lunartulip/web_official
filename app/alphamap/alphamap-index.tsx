import Image from "next/image";
import Link from "next/link";
import { alphaMapWhitepapers } from "@/lib/alphamap-whitepapers";
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
          <p className={styles.kicker}>ALPHAMAP ALTERNATIVE DATA / FINLLM-KG → TRADABLE QUANT FACTORS</p>
          <h1>{isCn ? <>让金融知识图谱，<br /><span>进入科技股因子与策略。</span></> : <>Turn financial knowledge graphs<br /><span>into technology-equity factors and strategies.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "AlphaMap 将 FinLLM-KG（大模型金融知识图谱）转化为可调用的 PIT 产业关系、公司经营状态与另类特征因子，并继续检验其能否形成可交易的量化信号。研究主攻全球科技股趋势成长与轮动的中低频策略；白皮书给出理论版图，DOI 实证研究负责检验。" : "AlphaMap turns FinLLM-KG—large-model financial knowledge graphs—into callable point-in-time industry relationships, company operating states and alternative features, then tests whether they become tradable quantitative signals. The research focuses on medium- and low-frequency global technology-equity growth and rotation; whitepapers define the map and DOI studies test it."}</p>
          <strong>ECONOMIC SEMANTICS · STATE TRANSITIONS · ALPHA MECHANICS</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>ALPHAMAP WHITEPAPERS / {String(alphaMapWhitepapers.length).padStart(2, "0")}</p>
            <h2>{isCn ? "从经济语义走向 Alpha Mechanics。" : "From economic meaning to Alpha Mechanics."}</h2>
          </div>
          <p className={styles.lead}>{isCn ? "业内分歧已经越过实体与三元组抽取，进入图的经济学语义、时间和状态迁移，以及图结构最终对应哪一种超额收益生成机制。AlphaMap 白皮书将逐篇展开这条路线。" : "The central question has moved beyond entity and triple extraction: what economic meaning the graph carries, how time and state transitions are modeled, and which excess-return mechanism the graph ultimately represents."}</p>
        </div>
        <div className={styles.grid}>
          {alphaMapWhitepapers.map((item) => (
            <article className={`${styles.card} ${styles.themeCard} ${styles.featureCard}`} key={item.slug}>
              <p className={styles.meta}>WHITEPAPER {item.number} / 2026 ANNUAL RESEARCH TOUR</p>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <a href={`/alphamap/${item.slug}`}>{isCn ? "阅读白皮书先导篇 →" : "Read the Chinese whitepaper prologue →"}</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>DOI EMPIRICAL STUDIES / {String(alphaMapStudies.length).padStart(2, "0")}</p>
            <h2>{isCn ? "理论主张交给数据检验。" : "Put each theoretical claim to an empirical test."}</h2>
          </div>
          <p className={styles.lead}>{isCn ? "DOI 实证系列从 #000 的单期投影诊断推进到 #001 的完整图因子检验：91 家候选公司、266 份时点文件和 85 个成熟周度截面。控制后仍未建立可预测的网络 alpha。" : "The DOI series moves from the single-vintage projection diagnostic in #000 to a full graph-factor test in #001: 91 candidates, 266 dated documents and 85 mature weekly cross-sections. Predictive network alpha is still not established after controls."}</p>
        </div>
        <div className={styles.grid}>
          {[...alphaMapStudies]
            .sort(compareStudies)
            .map((item) => (
              <article className={`${styles.card} ${styles.themeCard} ${styles.featureCard}`} key={item.slug}>
                <p className={styles.meta}>{item.sourceLabel.split(" · ")[0].toUpperCase()} / PUBLISHED {item.publishedAt} · AS OF {item.asOf}</p>
                <h3>{item.renderings[locale].title}</h3>
                <p>{item.renderings[locale].standfirst}</p>
                <a href={`${prefix}/alphamap/${item.slug}`}>{isCn ? "阅读 DOI 实证研究 →" : "Read the DOI empirical study →"}</a>
              </article>
            ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>ALPHAMAP-POWERED INDUSTRY RESEARCH / 01</p>
            <h2>{isCn ? "看见关系，还要算清它怎样进入现金流。" : "Map the relationship, then trace it into cash flow."}</h2>
          </div>
          <p className={styles.lead}>{isCn ? "DOI 系列检验网络因子。这一层使用 AlphaMap 的客户、供货与信用关系，结合合同、财务和起租条件，处理市场正在交易的投资命题。首篇追踪 NVIDIA 换帅之后 CoreWeave 融资、设备采购、托管回款与 HBM 需求的传导条件。" : "The DOI series tests network factors. This layer uses AlphaMap customer, supply and credit relationships alongside contracts, financials and lease conditions to study live investment theses. The first case traces CoreWeave financing, equipment procurement, hosting cash flows and HBM demand after NVIDIA's leadership transition."}</p>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.themeCard} ${styles.featureCard}`}>
            <p className={styles.meta}>LUNARTULIP RESEARCH / INDUSTRY &amp; COMPANY DEEP DIVE</p>
            <h3>{isCn ? "NVIDIA换帅之后，AI产业链哪些增长预期需要重估？" : "After NVIDIA’s Leadership Transition, Which AI Growth Expectations Need Reassessment?"}</h3>
            <p>{isCn ? "以 AlphaMap 关系为起点，核对 55 项公开来源，结合最新财报，把客户融资、HBM扩产、CPO器件价值与托管起租放进同一份投资判断。" : "Starting with AlphaMap relationships, the report reconciles 55 public sources and links customer financing, HBM expansion, CPO component value and hosting commencement in one investment assessment."}</p>
            <Link href={`${prefix}/deep-dive/ai-infrastructure-cash-flow-first-case-2026-11`}>{isCn ? "阅读首个产业研究案例 →" : "Read the first industry-research case →"}</Link>
          </article>
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
          <div><p className={styles.sectionLabel}>ALPHAMAP ALTERNATIVE DATA / CONTINUE THE WORK</p><h2>{isCn ? "从公开方法研究进入机构数据评估。" : "Move from public methods research into institutional data evaluation."}</h2></div>
          <p className={styles.lead}>{isCn ? "公开研究适合审阅问题、设计、结果和局限。机构可进一步获取 AlphaMap 数据说明与样例，并按许可选择文件、feed 或 API 交付；明确的投资问题也可进入 Research Models。" : "The public study supports review of the question, design, result and limitations. Institutions can request AlphaMap materials and use licensed file, feed or API delivery; defined investment questions may also enter Research Models."}</p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}><p className={styles.meta}>CITATION METADATA</p><h3>Research Object</h3><p>{isCn ? "读取对象 ID、版本、日期、摘要、DOI 和 canonical URL。" : "Read the object ID, version, dates, abstract, DOI and canonical URLs."}</p><Link href={`/research/${latestStudy.slug}`}>{isCn ? "打开最新公开元数据 →" : "Open the latest public metadata →"}</Link></article>
          <article className={styles.card}><p className={styles.meta}>INSTITUTIONAL ACCESS</p><h3>{isCn ? "AlphaMap 数据与机器交付" : "AlphaMap Data & Machine Delivery"}</h3><p>{isCn ? "获取数据说明与样例，并讨论文件、feed、Desk Pro 限额 API 或后续 Power/API 的适用范围。" : "Request data materials and discuss the appropriate scope for file, feed, Desk Pro limited-API or later Power/API delivery."}</p><Link href={`${prefix}/institutional-access#intent-alternative_dataset`}>{isCn ? "查看机构合作入口 →" : "View institutional entry points →"}</Link></article>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 LUNARTULIP LAB</span><span>{isCn ? "方法研究不构成投资建议" : "Methods research is not investment advice"}</span></footer>
    </main>
  );
}
