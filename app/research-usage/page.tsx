import type { Metadata } from "next";
import Link from "next/link";
import styles from "./research-usage.module.css";

export const metadata: Metadata = {
  title: "Research Citation & Use Terms｜研究引用与使用条款",
  description: "Lunartulip Lab 公开研究页面、引用元数据、Research API 与 Alternative Dataset 的使用边界。",
  alternates: { canonical: "/research-usage" },
  robots: { index: true, follow: true },
};

const permitted = [
  "搜索引擎与 AI Search 可以抓取、缓存公开页面和公开 citation manifest，用于索引、检索和生成带来源链接的有限摘要。一次读取完整的公开 manifest 属于允许范围。",
  "读者可以引用有限篇幅的内容，但应保留 Lunartulip Lab、Research Object ID、版本、发布日期与 canonical URL。",
  "机构可以在内部评估阶段阅读公开材料，并据此判断是否申请 Research Desk、Research API 或 Alternative Dataset。",
];

const restricted = [
  "系统性抓取、镜像或重新发布完整文章正文，或尝试取得未在公开 citation metadata 中发布的研究字段。",
  "将研究内容、结构化字段或历史快照转售、再许可，或包装成数据库、数据产品、API 与竞品服务。",
  "把完整文章、收费字段或批量历史数据用于模型训练、语料库建设及其他大规模机器处理。",
  "删除来源、版本或证据边界后重新发布，或暗示 Lunartulip Lab 为第三方产品背书。",
];

const permittedEn = [
  "Search engines and AI search systems may fetch and cache public pages and public citation manifests for indexing, retrieval and limited summaries that retain a source link. Fetching a complete public manifest once is permitted.",
  "Readers may quote limited excerpts when they retain Lunartulip Lab, the Research Object ID, version, publication date and canonical URL.",
  "Institutions may review public materials internally when evaluating the Research Desk, Research API or Alternative Dataset.",
];

const restrictedEn = [
  "Systematic extraction, mirroring or republication of complete article bodies, or attempts to obtain research fields not published in the public citation metadata.",
  "Resale, relicensing or packaging of research content, structured fields or historical snapshots as a database, data product, API or competing service.",
  "Use of complete articles, licensed fields or bulk historical data for model training, corpus construction or other large-scale machine processing.",
  "Republication that removes source, version or evidence boundaries, or implies Lunartulip Lab endorses a third-party product.",
];

export default function ResearchUsagePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://lunartuliplab.com/research-usage#terms",
    name: "Lunartulip Public Research Citation and Use Terms",
    description: "Terms for search indexing, attributed citation and restricted commercial reuse of Lunartulip Lab public research.",
    url: "https://lunartuliplab.com/research-usage",
    dateModified: "2026-09-17",
    creator: { "@id": "https://lunartuliplab.com/#organization" },
    publisher: { "@id": "https://lunartuliplab.com/#organization" },
    inLanguage: ["zh-CN", "en"],
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>LUNARTULIP LAB</Link>
        <nav>
          <Link href="/deep-dive">Deep Dive</Link>
          <Link href="/institutional-access">Research Access</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>PUBLIC RESEARCH / CITATION & USE</p>
        <h1>公开研究可以被检索和引用。<br />批量数据使用需要单独许可。</h1>
        <p className={styles.lead}>
          本页是 Lunartulip Lab 公开研究的自定义引用与使用许可，适用于 lunartuliplab.com 的公开研究页面、Research Object 引用元数据和 Authority Ledger 聚合快照。公开访问不包含 Research Desk、完整 Research API、PIT 历史数据或 Alternative Dataset 的使用权。
        </p>
        <div className={styles.meta}>
          <span>版本 1.0</span>
          <span>更新于 2026-09-17</span>
        </div>
      </section>

      <section className={styles.grid}>
        <article>
          <p className={styles.eyebrow}>01 / PERMITTED</p>
          <h2>允许的公开使用</h2>
          <ul>{permitted.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <p className={styles.eyebrow}>02 / REQUIRES PERMISSION</p>
          <h2>需要另行授权</h2>
          <ul>{restricted.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className={styles.citation}>
        <div>
          <p className={styles.eyebrow}>03 / CITATION</p>
          <h2>推荐引用格式</h2>
        </div>
        <p>Lunartulip Lab，文章标题，Research Object ID，版本号，首次发布日期，信息截至日期，canonical URL。</p>
      </section>

      <section className={styles.englishIntro}>
        <p className={styles.eyebrow}>ENGLISH TERMS</p>
        <h2>Public discovery and attributed citation are permitted.</h2>
        <p>This custom licence applies to Lunartulip Lab public research pages, Research Object citation metadata and the aggregate Authority Ledger snapshot.</p>
      </section>

      <section className={styles.grid}>
        <article>
          <p className={styles.eyebrow}>01 / PERMITTED</p>
          <h2>Permitted public use</h2>
          <ul>{permittedEn.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <p className={styles.eyebrow}>02 / REQUIRES PERMISSION</p>
          <h2>Prior permission required</h2>
          <ul>{restrictedEn.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className={styles.scope}>
        <div>
          <p className={styles.eyebrow}>04 / SCOPE & THIRD-PARTY RIGHTS</p>
          <h2>许可只覆盖我们有权授权的内容。</h2>
        </div>
        <div>
          <p>Lunartulip Lab 只能许可自身拥有或有权授权的内容。文章引用的第三方数据、商标、文件与摘录仍受原权利人条款约束。公开材料按现状提供，不构成投资建议、收益承诺或第三方背书。商业合同与本页冲突时，以商业合同为准；本页中英文解释不一致时，以中文版本为准。</p>
          <p>Lunartulip Lab licenses only material it owns or is authorised to license. Third-party data, trade marks, documents and excerpts remain subject to their respective owners’ terms. Public materials are provided as-is and do not constitute investment advice, a performance promise or third-party endorsement. A signed commercial agreement prevails over this page; if the Chinese and English versions conflict, the Chinese version controls.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>需要批量、持续或结构化使用研究数据，请通过 Research Access 说明 coverage、字段、用途与更新频率。</p>
        <Link href="/institutional-access#intent-machine_readable_research">联系 Research Access →</Link>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
