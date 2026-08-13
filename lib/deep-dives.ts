export type DeepDive = {
  slug: string;
  tickers: string[];
  publishedAt: string;
  version: string;
  source: string;
  titleCn: string;
  titleEn: string;
  questionCn: string;
  questionEn: string;
  thesisCn: string;
  thesisEn: string;
  standfirstCn: string;
  standfirstEn: string;
  whyItMattersCn: string;
  whyItMattersEn: string;
  consensusCn: string;
  consensusEn: string;
  differentiatedCn: string;
  differentiatedEn: string;
  evidenceCn: string[];
  evidenceEn: string[];
  causalChain: Array<{
    titleCn: string;
    titleEn: string;
    bodyCn: string;
    bodyEn: string;
  }>;
  valuationCn: string;
  valuationEn: string;
  forwardTests: Array<{
    titleCn: string;
    titleEn: string;
    bodyCn: string;
    bodyEn: string;
  }>;
  risksCn: string[];
  risksEn: string[];
  updateCn: string;
  updateEn: string;
};

export const deepDives: DeepDive[] = [
  {
    slug: "palantir-ai-application-commercialization-2026q2",
    tickers: ["PLTR"],
    publishedAt: "2026-08-05",
    version: "2026-08-08 corrected",
    source: "Palantir AI application commercialization · 2026-08-05 edition",
    titleCn: "Palantir：AI 应用层商业化开始进入回报兑现",
    titleEn: "Palantir: AI application commercialization begins to convert into returns",
    questionCn: "AI 资本支出是否已经开始向企业应用收入形成可验证的传导？",
    questionEn: "Is AI capital expenditure beginning to transmit into verifiable enterprise-application revenue?",
    thesisCn: "Palantir 的美国商业收入加速，为 AI 基础设施投入向应用层收入传导提供了一个带时间戳的验证点；这条逻辑需要在美股域独立研究，而不是机械映射到 A 股。",
    thesisEn: "Palantir’s accelerating U.S. commercial revenue provides a timestamped test of whether AI infrastructure spending is transmitting into application-layer revenue. The thesis belongs in a U.S.-market framework rather than a mechanical A-share mapping.",
    standfirstCn: "PLTR 本季真正证明的，不只是 AI 软件需求强，而是高价值决策工作流已经能够持续吸收企业核心预算。接近 48 倍 forward sales 之后，研究重点也随之改变：市场不再需要证明商业化存在，而要验证这种增长强度能维持多久。",
    standfirstEn: "PLTR’s quarter shows more than strong demand for AI software: high-value decision workflows are now absorbing core enterprise budgets at scale. At nearly 48× forward sales, the question is no longer whether monetization exists, but how long this growth intensity can persist.",
    whyItMattersCn: "过去两年，AI 产业最容易确认的是上游资本开支，最难确认的是应用层能否把算力转化为可持续收入、利润与客户锁定。Palantir 提供了目前最强的一组正向样本：商业收入、合同额、政府业务与利润同时加速，说明客户正在把 AI 从试验预算迁入经营与决策主流程。",
    whyItMattersEn: "The easiest part of the AI cycle to verify has been upstream capital spending; the hardest has been whether applications can turn compute into durable revenue, profit and customer lock-in. Palantir offers one of the strongest positive samples: commercial revenue, contract value, government activity and profit accelerated together as AI moved from pilots into core operating and decision workflows.",
    consensusCn: "市场已经看见美国商业收入同比增长 149%、TCV bookings 同比增长 153%，也看见全年收入指引继续上调。高增长与高估值都不是隐藏信息。",
    consensusEn: "The market already sees 149% U.S. commercial growth, 153% growth in TCV bookings and another increase in full-year guidance. Neither the growth nor the premium valuation is hidden.",
    differentiatedCn: "更值得跟踪的是收入结构是否发生类别迁移：如果美国商业收入持续接近并最终超过政府收入，PLTR 可能从“政府与数据平台”进一步被定价为企业 AI 决策操作层。这个变化会延长增长久期；反过来，任何 bookings、TCV 与收入增速不同步，都可能先击穿当前估值制度。",
    differentiatedEn: "The more important variable is a possible category shift in the revenue mix. If U.S. commercial revenue continues to converge with and eventually exceed government revenue, PLTR may be valued less as a government/data platform and more as an enterprise AI decision layer. That could extend growth duration; any divergence between bookings, TCV and recognized revenue could instead break the current valuation regime.",
    evidenceCn: [
      "Q2 2026 收入 19.35 亿美元，同比增长 93%；美国商业收入 7.64 亿美元，同比增长 149%。",
      "美国商业 TCV bookings 21.32 亿美元，同比增长 153%；全年收入指引上调至 81.50–81.58 亿美元。",
      "美国政府收入 8.09 亿美元，同比增长 90%；商业与政府两条需求曲线同时加速。",
    ],
    evidenceEn: [
      "Q2 2026 revenue reached $1.935 billion, up 93%; U.S. commercial revenue reached $764 million, up 149%.",
      "U.S. commercial TCV bookings reached $2.132 billion, up 153%; full-year revenue guidance rose to $8.150–8.158 billion.",
      "U.S. government revenue reached $809 million, up 90%; commercial and government demand curves accelerated together.",
    ],
    causalChain: [
      {
        titleCn: "数据被组织成可行动语义",
        titleEn: "Data becomes actionable context",
        bodyCn: "Ontology 先把数据、对象、权限与动作连接起来，使模型输出能够进入真实组织流程。",
        bodyEn: "Ontology connects data, objects, permissions and actions so model output can enter real organizational workflows.",
      },
      {
        titleCn: "模型进入高价值决策链",
        titleEn: "Models enter high-value decisions",
        bodyCn: "AIP 的价值来自把模型接入经营、生产和政府决策，而不是停留在独立 AI 功能。",
        bodyEn: "AIP creates value by embedding models in operating, production and government decisions rather than isolating AI as a feature.",
      },
      {
        titleCn: "试验预算迁移为核心预算",
        titleEn: "Pilot spend becomes core budget",
        bodyCn: "当工作流、人员与动作共同改变，客户购买的接近可执行决策能力，合同规模与替换成本同步上升。",
        bodyEn: "As workflows, people and actions change together, customers buy executable decision capacity; contract size and switching friction rise.",
      },
      {
        titleCn: "商业收入验证价值捕获",
        titleEn: "Commercial growth validates capture",
        bodyCn: "商业收入、TCV 与利润共同加速，才使 AI 使用真正穿过收入表，而不是停留在 adoption 指标。",
        bodyEn: "Commercial revenue, TCV and profit accelerating together is what moves AI usage through the income statement rather than leaving it at adoption metrics.",
      },
    ],
    valuationCn: "按财报后约 3900 亿美元市值与约 81.5 亿美元全年收入指引粗算，forward P/S 接近 48 倍。这个价格已经预付了极长增长久期，因此“业务很好”并不足够；下一阶段必须看到 US commercial TCV、bookings 与收入继续同步，且商业收入占比持续提升。",
    valuationEn: "Using a post-earnings market value near $390 billion and roughly $8.15 billion of full-year revenue guidance implies close to 48× forward sales. That price prepays a very long growth duration, so “the business is strong” is not enough; U.S. commercial TCV, bookings and revenue must remain aligned while the commercial mix keeps expanding.",
    forwardTests: [
      {
        titleCn: "商业收入能否继续逼近政府收入",
        titleEn: "Can commercial revenue converge with government?",
        bodyCn: "观察美国商业收入增速与收入占比；持续逼近将强化企业 AI 平台的类别迁移。",
        bodyEn: "Track U.S. commercial growth and mix; continued convergence would strengthen the enterprise-AI-platform category shift.",
      },
      {
        titleCn: "TCV、bookings 与收入是否同步",
        titleEn: "Do TCV, bookings and revenue stay aligned?",
        bodyCn: "领先合同指标先于收入失速，将是增长久期缩短的早期信号。",
        bodyEn: "A slowdown in leading contract indicators ahead of revenue would be an early signal of shorter growth duration.",
      },
      {
        titleCn: "高估值如何吸收第一次减速",
        titleEn: "How does the multiple absorb the first slowdown?",
        bodyCn: "接近 48 倍 sales 的定价对任何增长降档都高度敏感，需要把基本面兑现与估值风险同时观察。",
        bodyEn: "A multiple near 48× sales is highly sensitive to any growth reset, requiring operating delivery and valuation risk to be monitored together.",
      },
    ],
    risksCn: ["后续季度增速显著回落", "应用软件估值整体压缩", "价格与财务数据发生版本更正"],
    risksEn: ["A material slowdown in subsequent quarters", "Broad application-software multiple compression", "A later correction to price or financial data"],
    updateCn: "2026-08-08：发布更正版，更新研究论点与证据表述。本文用于呈现研究问题、核心论点、关键证据与风险，不构成仓位、成交或操作指引。",
    updateEn: "2026-08-08: published a corrected edition with updated thesis and evidence language. This article presents the research question, core thesis, key evidence and risks; it does not provide positions, execution or trading instructions.",
  },
  {
    slug: "cloudflare-atlassian-ai-application-commercialization-2026q2",
    tickers: ["NET", "TEAM"],
    publishedAt: "2026-08-07",
    version: "2026-08-08 corrected",
    source: "Cloudflare + Atlassian AI application commercialization · 2026-08-07 edition",
    titleCn: "Cloudflare + Atlassian：AI 应用层验证从单点走向多点",
    titleEn: "Cloudflare + Atlassian: AI application validation broadens beyond a single company",
    questionCn: "PLTR 的单点验证，是否正在扩展为 AI 应用层更广泛的商业化证据？",
    questionEn: "Is the single-company PLTR signal broadening into wider evidence of AI application commercialization?",
    thesisCn: "Cloudflare 的 Agent 流量增长与 Atlassian 的盈利拐点提供了两种不同的验证：一端是机器流量基础设施，另一端是企业协作软件的货币化。市场同时出现的负面样本说明，增长质量仍需逐家公司判断。",
    thesisEn: "Cloudflare’s agent-traffic growth and Atlassian’s profitability inflection provide two distinct tests: machine-traffic infrastructure and enterprise-collaboration monetization. Negative peers in the same period show why growth quality still requires company-level judgment.",
    standfirstCn: "NET 与 TEAM 说明，AI 应用层的机会已经从“有没有使用量”转向“谁控制收费节点”。Cloudflare 的二阶变量不是机器流量本身，而是每次机器活动能穿过多少个收费层；Atlassian 的潜在重估也不只来自 Rovo adoption，而是 Agent 是否让组织上下文与协同密度变得更值钱。",
    standfirstEn: "NET and TEAM show that the application-layer question is shifting from usage to control of the charging point. Cloudflare’s second-order variable is not machine traffic itself, but how many monetizable layers each machine action crosses. Atlassian’s potential rerating depends less on Rovo adoption alone than on whether agents make organizational context and coordination density more valuable.",
    whyItMattersCn: "模型能力正在商品化，企业真正稀缺的是可执行上下文、权限、工作流和难以绕开的基础设施节点。NET 与 TEAM 分别站在机器流量入口和企业组织上下文两端，提供了 PLTR 之外的两种价值捕获机制，也让 AI Capex 的回报验证从单一公司走向横截面比较。",
    whyItMattersEn: "As model capability commoditizes, the scarce assets become executable context, permissions, workflows and infrastructure chokepoints. NET and TEAM sit at two different control points—machine-traffic infrastructure and organizational context—broadening the AI-capex return test beyond a single company.",
    consensusCn: "市场已经知道 Agent 请求量会快速增长，也知道 Rovo 等 AI 产品正在进入大型企业。一级 adoption 与流量增长已经进入叙事，单独重复这些数字无法形成足够的信息增量。",
    consensusEn: "The market already knows agent requests are growing rapidly and AI products such as Rovo are entering large enterprises. First-order adoption and traffic growth are already part of the narrative; repeating them alone adds little information.",
    differentiatedCn: "NET 的潜在预期差是 monetization density：一次 Agent 动作可能连续触发 network、Workers、security、identity 与执行层收费。TEAM 的潜在预期差是 billing unit 变化：AI coding 也许减少人类 seat，却可能制造更多 task、review、dependency 与 governance，使收入函数从“人头 × 席位”扩展为“人类席位 + Agent 活动 + 组织上下文”。",
    differentiatedEn: "For NET, the potential expectation gap is monetization density: one agent action can trigger network, Workers, security, identity and execution charges. For TEAM, it is a possible change in the billing unit: AI coding may compress human seats while creating more tasks, reviews, dependencies and governance, expanding the revenue function from seats alone to human seats plus agent activity and organizational context.",
    evidenceCn: [
      "Cloudflare Q2 收入 6.961 亿美元，同比增长 35.9%；年收入超过 10 万美元的大客户达到 4,698 家。",
      "Cloudflare 在 2026 年 6 月 Investor Day 披露 AI Agent 日请求量同比增长超过 1,700%。",
      "Atlassian FY2026 Q4 收入约 17.7 亿美元，同比增长 28%；Subscription ARR 66.1 亿美元，同比增长 23%。",
      "使用 Rovo 的客户 ARR 扩张约为未使用客户的 2 倍，但这一相关性仍需后续季度验证。",
    ],
    evidenceEn: [
      "Cloudflare Q2 revenue reached $696.1 million, up 35.9%; customers spending more than $100,000 annually reached 4,698.",
      "At its June 2026 Investor Day, Cloudflare reported more than 1,700% year-over-year growth in daily AI-agent requests.",
      "Atlassian FY2026 Q4 revenue was roughly $1.77 billion, up 28%; subscription ARR reached $6.61 billion, up 23%.",
      "Rovo users expanded ARR at roughly twice the rate of non-users, though that correlation still requires forward validation.",
    ],
    causalChain: [
      {
        titleCn: "Agent 把访问改写为机器动作",
        titleEn: "Agents turn visits into machine actions",
        bodyCn: "一次任务可能连续调用 API、网站、模型、安全检查与执行环境，机器请求增长可以显著快于人类用户。",
        bodyEn: "One task can trigger APIs, websites, models, security checks and execution environments, allowing machine requests to outgrow human users.",
      },
      {
        titleCn: "NET 控制机器流量入口",
        titleEn: "NET controls the traffic chokepoint",
        bodyCn: "同一次机器活动可能穿过 Workers、安全、身份与网络层，决定单位活动收入的不是请求量，而是收费层密度。",
        bodyEn: "The same machine action may cross Workers, security, identity and network layers; revenue per action depends on chargeable-layer density, not requests alone.",
      },
      {
        titleCn: "Agent 制造更多组织状态",
        titleEn: "Agents create more organizational state",
        bodyCn: "更高代码产出会带来更多任务、评审、依赖与治理需求，组织协调对象可能随 Agent 活动一起增长。",
        bodyEn: "Higher code output creates more tasks, reviews, dependencies and governance, potentially expanding coordination objects alongside agent activity.",
      },
      {
        titleCn: "TEAM 控制上下文与协同层",
        titleEn: "TEAM controls context and coordination",
        bodyCn: "Jira、Confluence 与 Teamwork Graph 已沉淀项目、权限和关系；AI 越深入，已有上下文越可能成为难以迁移的资产。",
        bodyEn: "Jira, Confluence and Teamwork Graph already hold projects, permissions and relationships; deeper AI use can make that context harder to replace.",
      },
    ],
    valuationCn: "NET 财报后约 38–40 倍 FY sales，市场已为机器流量故事支付极高溢价，必须看到收费密度而非请求量单独增长。TEAM 约 5–6 倍 forward sales 的折价则有合理基础：成熟 seat SaaS、FY2027 增速下台阶和 AI coding 的 seat compression 风险。只有当 workflow density 与 enterprise expansion 持续兑现，估值制度迁移才有因果基础。",
    valuationEn: "NET traded near 38–40× FY sales after earnings, already pricing a large machine-traffic premium; monetization density, not requests alone, must rise. TEAM’s roughly 5–6× forward-sales discount has rational roots in mature seat SaaS, slower FY2027 growth and AI-coding seat compression. A valuation-regime shift needs sustained evidence in workflow density and enterprise expansion.",
    forwardTests: [
      {
        titleCn: "NET：流量能否进入更多收费层",
        titleEn: "NET: Does traffic cross more chargeable layers?",
        bodyCn: "观察 paid Workers usage、security attach、large-customer expansion 与 RPO，而不只看 Agent requests。",
        bodyEn: "Track paid Workers usage, security attach, large-customer expansion and RPO—not agent requests alone.",
      },
      {
        titleCn: "NET：单位机器活动收入是否变厚",
        titleEn: "NET: Does revenue density per machine action rise?",
        bodyCn: "若请求量高速增长却没有收入增速或指引上修，monetization-density 命题需要降级。",
        bodyEn: "If requests surge without revenue acceleration or higher guidance, the monetization-density thesis weakens.",
      },
      {
        titleCn: "TEAM：AI 是压缩 seat 还是增加 workflow",
        titleEn: "TEAM: Does AI compress seats or expand workflow?",
        bodyCn: "观察 Rovo、Teamwork Collection、subscription ARR、Cloud NRR 与大型企业扩张是否持续领先。",
        bodyEn: "Track Rovo, Teamwork Collection, subscription ARR, cloud NRR and large-enterprise expansion.",
      },
      {
        titleCn: "TEAM：上下文层能否成为新收费单位",
        titleEn: "TEAM: Can context become a new billing unit?",
        bodyCn: "只有 Agent 活动持续创造任务、依赖和治理对象，agent coordination / context 的类别迁移才成立。",
        bodyEn: "The agent-coordination/context shift requires agent activity to keep creating tasks, dependencies and governance objects.",
      },
    ],
    risksCn: ["Agent 流量增速回归", "Rovo 客群口径无法扩展到更广泛客户", "企业软件支出与估值同步走弱"],
    risksEn: ["Normalization in agent-traffic growth", "Rovo cohort economics failing to broaden", "Concurrent weakness in enterprise-software spending and valuation"],
    updateCn: "2026-08-08：发布更正版，更新研究论点与证据表述，并保留原始研究时点与版本记录。",
    updateEn: "2026-08-08: published a corrected edition with updated thesis and evidence language while preserving the original research date and version history.",
  },
];

export function getDeepDive(slug: string) {
  return deepDives.find((item) => item.slug === slug);
}
