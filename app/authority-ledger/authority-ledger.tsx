import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ledger from "@/data/authority/calls_kpi_summary.json";
import styles from "../proof.module.css";

const pct = (value: number | null, digits = 1) => value === null ? "—" : `${(value * 100).toFixed(digits)}%`;
const signedPct = (value: number | null) => value === null ? "—" : `${value >= 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;

export default function AuthorityLedger({ language = "cn" }: { language?: "cn" | "en" }) {
  const isCn = language === "cn";
  const backfill = ledger.cohorts.backfill;
  const discipline = ledger.cohorts.desk_discipline;
  const external = backfill.csi500;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href={isCn ? "/" : "/en"}>
          <Image src="/lunartulip-silver-emblem.png" width={29} height={32} alt="" aria-hidden="true" />
          LUNARTULIP LAB / AUTHORITY LEDGER
        </Link>
        <Link className={styles.back} href={isCn ? "/" : "/en"}>{isCn ? "返回首页 ↗" : "Home ↗"}</Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>FORECAST LEDGER / AGGREGATE OUTCOMES</p>
          <h1>{isCn ? <>过去的判断，后来<br /><span>究竟发生了什么。</span></> : <>What happened after<br /><span>the original calls.</span></>}</h1>
        </div>
        <aside className={styles.heroAside}>
          <p>{isCn ? "这里汇总带时间戳判断的后续结果，并以双基准、命中率、平均超额与盈亏比呈现。所有数字由统一 calls 账本生成，便于复核样本、口径与更新时间。" : "This page summarizes what followed timestamped judgments using dual benchmarks, hit rates, average excess returns and payoff ratios. Every figure is generated from the canonical calls ledger for reproducible sample, methodology and update checks."}</p>
          <strong>AS OF {ledger.as_of} · GENERATED {ledger.generated_at}</strong>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionLabel}>SAMPLE & METHODOLOGY</p><h2>{isCn ? "理解样本，再解读结果。" : "Understand the sample before interpreting the result."}</h2></div>
          <p className={styles.lead}>{isCn ? "当前已裁决样本来自历史重构区间，用于检验既有判断在统一规则下的后续表现；Desk 纪律期样本独立记录，待形成足够已结算观察后单独展示。" : "Currently resolved observations come from a reconstructed historical window, testing prior judgments under one consistent rule set. Desk-discipline observations are recorded separately and will be shown independently once enough outcomes have settled."}</p>
        </div>

        <div className={styles.stats}>
          <div><small>{isCn ? "已裁决 / 含失效裁定" : "Resolved / incl. invalidated"}</small><strong>{backfill.settled}</strong></div>
          <div><small>{isCn ? "EW 方向性命中率" : "EW directional hit rate"}</small><strong>{pct(backfill.universe_ew.hit_rate)}</strong></div>
          <div><small>{isCn ? "CSI500 方向性命中率" : "CSI500 directional hit rate"}</small><strong>{pct(external.hit_rate)}</strong></div>
          <div><small>{isCn ? "CSI500 纯赢亏盈亏比" : "CSI500 hit/miss payoff ratio"}</small><strong>{external.win_loss_ratio_hm_only?.toFixed(2) ?? "—"}×</strong></div>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <p className={styles.meta}>UNIVERSE-EW / RESEARCH BENCHMARK</p>
            <h3>{backfill.universe_ew.hit} hit / {backfill.universe_ew.miss} miss / {backfill.universe_ew.flat} flat</h3>
            <p>{isCn ? `方向调整后平均超额 ${signedPct(backfill.universe_ew.avg_excess)}；hit/miss-only 盈亏比 ${backfill.universe_ew.win_loss_ratio_hm_only?.toFixed(2)}×。` : `Direction-adjusted average excess ${signedPct(backfill.universe_ew.avg_excess)}; hit/miss-only payoff ratio ${backfill.universe_ew.win_loss_ratio_hm_only?.toFixed(2)}×.`}</p>
          </article>
          <article className={styles.card}>
            <p className={styles.meta}>CSI500 / EXTERNAL BENCHMARK</p>
            <h3>{external.hit} hit / {external.miss} miss / {external.flat} flat</h3>
            <p>{isCn ? `方向调整后平均超额 ${signedPct(external.avg_excess)}；hit/miss-only 盈亏比 ${external.win_loss_ratio_hm_only?.toFixed(2)}×。` : `Direction-adjusted average excess ${signedPct(external.avg_excess)}; hit/miss-only payoff ratio ${external.win_loss_ratio_hm_only?.toFixed(2)}×.`}</p>
          </article>
        </div>

        <div className={styles.curve} aria-label={isCn ? "滚动 30 天周度命中率" : "Weekly rolling 30-day hit rate"}>
          {ledger.hit_rate_curve.map((point) => (
            <div key={point.week_start}>
              <small>{point.week_start}</small><strong>{pct(point.hit_rate_ew)}</strong>
              <i style={{ "--rate": `${(point.hit_rate_ew ?? 0) * 100}%` } as CSSProperties} />
              <span>{isCn ? `${point.settled_count} 个 EW 已结算样本` : `${point.settled_count} EW observations settled`}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.policy}>
          <strong>{isCn ? "如何阅读这些数字" : "How to read these figures"}</strong>
          <p>{isCn ? "方向性命中率 = hit / (hit + miss)；expired_flat 不计分母，invalidated 从三件套中剔除；阈值为 ±5%，avoid / trim 方向取反。纯赢亏盈亏比仅使用 hit 与 miss，flat 不稀释。回溯窗口从 2026-03-30 开始，当前证据链接完整率为 100%。" : "Directional hit rate = hit / (hit + miss). Expired-flat observations are excluded from the denominator; invalidated calls are excluded from the metric set. The threshold is ±5%, with avoid/trim direction inverted. The hit/miss-only payoff ratio excludes flats. The reconstructed window begins on 2026-03-30; current evidence-link completeness is 100%."}</p>
          <p>{isCn ? `纪律期当前已结算 ${discipline.settled}，追踪中 ${discipline.tracking}。回溯期与纪律期独立列示；命中率需与平均超额、盈亏比、样本规模和时间区间共同解读。` : `The Desk-discipline cohort currently has ${discipline.settled} settled and ${discipline.tracking} tracking observations. Reconstructed and discipline cohorts are reported separately; hit rate should be interpreted alongside average excess return, payoff ratio, sample size and time window.`}</p>
        </div>
      </section>

      <footer className={styles.footer}><span>DATA AS OF {ledger.as_of}</span><span>{isCn ? "聚合研究记录，不构成投资建议" : "Aggregate research record, not investment advice"}</span></footer>
    </main>
  );
}
