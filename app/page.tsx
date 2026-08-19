"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { INSTITUTIONAL_EMAIL, institutionalMailto } from "../lib/contact";

type Language = "cn" | "en";

const en: Record<string, string> = {
  "理念": "Philosophy", "能力地图": "Capabilities", "工作流": "Workflow", "机构合作": "Institutional", "实践": "Practice", "手札": "Notes", "合作咨询": "Engage", "系统实践": "Systems in Practice", "研究手札": "Research Notes",
  "研究命题引擎": "Thesis Engine", "把直觉转化为可检验、可更新的命题。": "Turn investment intuition into testable, updateable theses.",
  "从研究问题出发，显式化核心假设、反证条件与关键里程碑。保留人的判断，同时让 AI 能够理解研究目标与边界。": "Frame the core hypothesis, disconfirming evidence and critical milestones around a real investment question—preserving human judgment while making its objectives and boundaries legible to AI.",
  "问题 / 直觉 / 市场分歧": "Question / intuition / market disagreement", "结构化命题 / 证伪条件": "Structured thesis / falsification criteria",
  "假设拆解": "Thesis decomposition", "预期差定位": "Expectation-gap mapping", "里程碑定义": "Milestone design",
  "证据与因果图谱": "Evidence & Causal Graph", "把分散材料组织成带权重的证据网络。": "Organize fragmented research into a weighted evidence network.",
  "连接研报、财报、产业数据与访谈材料，识别实体、关系、时间与证据强度，形成可追溯的产业链因果地图。": "Connect filings, research, industry data and interviews into a traceable causal map with explicit entities, relationships, timing and evidence strength.",
  "文档 / 数据 / 产业知识": "Documents / data / domain knowledge", "证据链 / 因果图 / 观察点": "Evidence chain / causal map / watchpoints",
  "多源解析": "Multi-source ingestion", "关系抽取": "Relationship extraction", "因果链校准": "Causal calibration",
  "Agent 工作流": "Agent Workflows", "把高质量研究动作封装成可重复流程。": "Encode high-quality research moves into repeatable workflows.",
  "将研究方法拆成可编排的 skills、SOP 与 agent 任务，让复杂流程可被调用、检查与复用，而不是停留在一次性对话里。": "Decompose research methods into orchestrated skills, SOPs and agent tasks that can be invoked, audited and reused beyond a single conversation.",
  "方法论 / SOP / 工具": "Method / SOP / tools", "任务编排": "Task orchestration", "质量检查": "Quality control", "资产化沉淀": "Reusable system assets",
  "策略验证实验室": "Strategy Validation Lab", "让主观判断与量化验证在同一框架协作。": "Bring discretionary judgment and quantitative validation into one framework.",
  "用因子、信号、回测与情景分析检验研究命题，识别稳健区间和失效条件，为集中决策增加纪律，而非替代基金经理。": "Test investment theses with factors, signals, backtests and scenarios; identify robust ranges and failure conditions to add discipline without replacing the PM.",
  "命题 / 信号 / 市场数据": "Thesis / signals / market data", "验证结果 / 风险边界": "Validation / risk boundaries", "因子实验": "Factor research", "稳健性检验": "Robustness testing", "情景压力测试": "Scenario stress tests",
  "决策反馈闭环": "Decision Feedback Loop", "让结果反向更新研究系统，而非只做事后复盘。": "Feed outcomes back into the research system—not merely into post-mortems.",
  "记录预期、动作、结果与偏差来源，把真实反馈写回假设、证据权重和流程规则，持续提高下一次决策的起点。": "Record expectations, actions, outcomes and sources of error; write real-world feedback back into theses, evidence weights and operating rules.",
  "决策记录 / 结果 / 偏差": "Decision record / outcome / error", "归因 / 更新 / 新规则": "Attribution / update / new rules", "结果归因": "Outcome attribution", "假设更新": "Thesis updates", "规则演化": "Rule evolution",
  "定义研究问题": "Frame the question", "明确决策对象、时间尺度、已知信息与真正需要被验证的分歧。": "Define the decision object, time horizon, known information and the disagreement that must be tested.",
  "研究需求 / 组合问题": "Research need / portfolio question", "研究任务书 + 成功标准": "Research brief + success criteria",
  "建立证据底座": "Build the evidence layer", "解析多模态材料，完成实体、数字、事件与来源的强校准。": "Parse multimodal materials and rigorously calibrate entities, numbers, events and sources.",
  "报告 / 财报 / 数据 / 访谈": "Research / filings / data / interviews", "结构化证据层": "Structured evidence layer",
  "构建因果地图": "Map the causal chain", "从驱动、传导、瓶颈到兑现路径，显式化产业与资产价格的连接。": "Make the path from drivers and transmission to bottlenecks and realization explicit.",
  "证据层 + 领域知识": "Evidence + domain knowledge", "AlphaMap + 观察节点": "AlphaMap + watchpoints",
  "形成可执行判断": "Form an actionable view", "比较情景、概率、赔率与风险边界，生成可审阅的决策材料。": "Compare scenarios, probabilities, payoff and risk boundaries to produce an auditable decision package.",
  "命题 / 图谱 / 验证结果": "Thesis / map / validation", "决策包 + 触发条件": "Decision package + triggers",
  "用反馈更新系统": "Update through feedback", "区分判断、执行与外部噪音的贡献，把真实结果转化为新的系统规则。": "Separate judgment, execution and external noise, then turn outcomes into improved system rules.",
  "过程记录 + 结果反馈": "Process record + outcomes", "归因报告 + 版本更新": "Attribution + system update",
  "判断": "JUDGMENT", "证据": "EVIDENCE", "系统": "SYSTEM"
};

const navigation = [
  { label: "双研究引擎", labelEn: "Research", href: "#research" },
  { label: "研究与结果", labelEn: "Research & Outcomes", href: "#practice" },
  { label: "研究方法", labelEn: "Research Methods", href: "#capabilities" },
  { label: "长期方向", labelEn: "Direction", href: "#direction" },
  { label: "手札", href: "#notes" },
  { label: "研究交流", labelEn: "Engage", href: "#contact" },
];

const positioningSignals = [
  { label: "WHO WE ARE", cn: "独立科技权益研究机构", en: "Independent public-equities research" },
  { label: "ENGINE / FUNDAMENTAL", cn: "主观基本面研究", en: "Discretionary fundamental research" },
  { label: "ENGINE / QUANT", cn: "系统化量化研究", en: "Systematic quantitative research" },
  { label: "RESEARCH WORKSPACE", cn: "Always-On Research Desk", en: "Always-On Research Desk" },
];

const deskCapabilities = [
  { code: "RESEARCH", cn: "全球信息、产业因果与投资命题", en: "Global information, industry causality and investment theses" },
  { code: "STRATEGY", cn: "因子实验、回测、压力测试与市场状态", en: "Factor research, backtests, stress tests and market regimes" },
  { code: "PORTFOLIO", cn: "组合状态、风险预算、约束与监控", en: "Portfolio state, risk budgets, constraints and monitoring" },
  { code: "LEARNING", cn: "Decision Memory、结果归因与规则更新", en: "Decision memory, attribution and rule updates" },
];

const engagementTopics = [
  { cn: "索取机构样章", en: "Request an institutional sample", detailCn: "先审阅研究密度、证据纪律与交付标准", detailEn: "Evaluate analytical density, evidence discipline and delivery quality", intent: "sample_request" },
  { cn: "申请 Research Access", en: "Apply for Research Access", detailCn: "机构 × Coverage Track × 固定周期的持续研究", detailEn: "Ongoing research by institution × Coverage Track × fixed term", intent: "research_access" },
  { cn: "提交研究 Mandate", en: "Submit a research mandate", detailCn: "仅限既有 coverage 与长期研究主线", detailEn: "Scoped to existing coverage and long-horizon research threads", intent: "commissioned_mandate" },
  { cn: "讨论 6-Session Diagnostic", en: "Discuss the 6-Session Diagnostic", detailCn: "诊断并共同设计 AI-native 投研系统", detailEn: "Diagnose and co-design an AI-native research system", intent: "research_system_diagnostic" },
];

const collaborationLanes = [
  {
    code: "ENGINE 01 / DISCRETIONARY FUNDAMENTAL",
    titleCn: "主观基本面研究",
    titleEn: "Discretionary Fundamental Research",
    bodyCn: "追问技术变化如何穿透产业结构、公司利润、估值与预期差，形成公司深度研究、价值捕获图谱与可持续跟踪的前瞻验证点。",
    bodyEn: "Trace how technology change travels through industry structure, company earnings, valuation and expectations—producing company deep dives, value-capture maps and forward tests.",
    href: "/deep-dive",
    ctaCn: "阅读旗舰 Deep Dive",
    ctaEn: "Read flagship Deep Dives",
  },
  {
    code: "ENGINE 02 / SYSTEMATIC QUANT",
    titleCn: "系统化量化研究",
    titleEn: "Systematic Quantitative Research",
    bodyCn: "检验信号、权重、市场状态与组合规则是否具有可复现的预测或风险调整价值，公开验证设计、样本边界、成本后结果与失败记录。",
    bodyEn: "Test whether signals, weights, regimes and portfolio rules offer reproducible predictive or risk-adjusted value, with explicit validation design, sample boundaries, post-cost results and failures.",
    href: "#notes",
    ctaCn: "查看量化研究",
    ctaEn: "Explore quant research",
  },
];

const productOffers = [
  {
    code: "PROOF 01 / RESEARCH OBJECTS",
    titleCn: "Lunartulip Deep Dive",
    titleEn: "Lunartulip Deep Dive",
    summaryCn: "围绕具体公司与产业问题的版本化深度研究，以稳定 URL 保留核心论点、关键证据、风险边界、as-of 日期与更新记录。",
    summaryEn: "Versioned deep research on specific companies and industries, preserving core theses, key evidence, risk boundaries, as-of dates and update histories at stable URLs.",
    fitCn: "适合希望评估公司研究深度、产业传导判断与持续更新能力的机构和专业投资者。",
    fitEn: "For institutions and professional investors evaluating company-research depth, industry-transmission judgment and update discipline.",
    deliverablesCn: ["带时间戳的核心判断", "关键证据与风险边界", "Update History 与更正记录"],
    deliverablesEn: ["Timestamped thesis", "Key evidence and risk boundary", "Update history and corrections"],
    priceCn: "POINT-IN-TIME / VERSIONED",
    priceEn: "POINT-IN-TIME / VERSIONED",
    noteCn: "目前公开两篇旗舰研究",
    noteEn: "Two flagship research objects currently available",
    href: "/deep-dive",
    ctaCn: "查看 Deep Dive",
    ctaEn: "View Deep Dives",
  },
  {
    code: "PROOF 02 / AUTHORITY LEDGER",
    titleCn: "判断与结局账本",
    titleEn: "Calls & Outcomes Ledger",
    summaryCn: "汇总历史判断的后续结果、双基准、样本口径与计算方法，让读者可以在统一规则下评估判断质量。",
    summaryEn: "Aggregate subsequent outcomes, dual benchmarks, cohort definitions and methodology so readers can evaluate prior judgment under one consistent rule set.",
    fitCn: "适合关注历史判断结果、验证纪律、样本透明度与风险收益不对称性的专业读者。",
    fitEn: "For professional readers examining prior outcomes, validation discipline, sample transparency and payoff asymmetry.",
    deliverablesCn: ["回溯期与纪律期分列", "命中率、超额与盈亏比口径", "数据来源、as-of 与生成版本"],
    deliverablesEn: ["Separate reconstructed and discipline cohorts", "Hit-rate, excess and payoff methodology", "Source, as-of date and generated version"],
    priceCn: "AGGREGATE / METHODOLOGY-LED",
    priceEn: "AGGREGATE / METHODOLOGY-LED",
    noteCn: "数字由统一账本生成，可复核口径与更新时间",
    noteEn: "Generated from the canonical ledger with reproducible methodology and timestamps",
    href: "/authority-ledger",
    ctaCn: "打开 Authority Ledger",
    ctaEn: "Open Authority Ledger",
  },
];

const practiceCases = [
  {
    code: "DEEP DIVE / PLTR",
    title: "Palantir：AI 应用层商业化开始进入回报兑现",
    titleEn: "Palantir: AI application commercialization begins to convert into returns",
    thesis: "把美国商业收入加速作为 AI 基础设施投入向应用层收入传导的带时间戳验证点。",
    thesisEn: "A timestamped test of whether AI infrastructure spending is transmitting into application-layer revenue.",
    metric: "AS OF 2026-08-05",
    nodes: ["QUESTION", "EVIDENCE", "THESIS", "RISK", "UPDATE"],
    href: "/deep-dive/palantir-ai-application-commercialization-2026q2",
  },
  {
    code: "DEEP DIVE / NET + TEAM",
    title: "Cloudflare + Atlassian：AI 应用层验证从单点走向多点",
    titleEn: "Cloudflare + Atlassian: AI application validation broadens beyond a single company",
    thesis: "用机器流量基础设施与企业协作软件盈利拐点，检验 AI 应用层商业化是否正在扩散。",
    thesisEn: "Test whether AI application commercialization is broadening through machine-traffic infrastructure and enterprise-software profitability.",
    metric: "AS OF 2026-08-07",
    nodes: ["QUESTION", "EVIDENCE", "THESIS", "RISK", "UPDATE"],
    href: "/deep-dive/cloudflare-atlassian-ai-application-commercialization-2026q2",
  },
];

const noteColumns = [
  {
    code: "COLUMN / 01",
    title: "AI 原生主动管理",
    titleEn: "AI-Native Active Management",
    notes: [
      "AI 正在打开基金经理的 Alpha 半径",
      "主观私募 AI 化成为共识之后，真正的分水岭才刚开始",
      "AI 买方决策的差距才刚刚开始",
    ],
    notesEn: [
      "AI Is Expanding the PM’s Alpha Radius",
      "After AI Adoption Becomes Consensus, the Real Divide Begins",
      "The Gap in AI-Native Buy-Side Decision-Making Is Just Beginning",
    ],
    slugs: ["ai-expands-alpha-radius", "subjective-funds-ai-divide", "buy-side-decision-gap"],
  },
  {
    code: "COLUMN / 02",
    title: "买方决策系统",
    titleEn: "Decision Systems",
    notes: [
      "盈亏不是经验：Self-Driving Portfolio 之后，AI 投资还缺一层决策归因",
      "Self-Driving Portfolio：AI 投研的真正终点",
      "如果量化基金有因子库，主动管理也该有假设库",
      "AI 买方决策的第一道分水岭：谁来验收",
      "AI 投研越多，为什么买方决策反而更难？",
    ],
    notesEn: [
      "P&L Is Not Experience: The Missing Decision-Attribution Layer",
      "Self-Driving Portfolio: The Real Destination of AI Investing",
      "If Quant Funds Have Factor Libraries, Active Managers Need Thesis Libraries",
      "The First Divide in AI Buy-Side Decisions: Who Validates the Output?",
      "Why More AI Research Can Make Buy-Side Decisions Harder",
    ],
    slugs: ["decision-attribution-after-self-driving-portfolio", "self-driving-portfolio-ai-investing", "active-management-hypothesis-library", "who-validates-ai-output", "more-ai-research-harder-decisions"],
  },
  {
    code: "COLUMN / 03",
    title: "主观 × 量化",
    titleEn: "Quantamental Research",
    notes: [
      "直觉惊人的基金经理，人均是隐式贝叶斯大师",
      "量化、基本面与 AI：贝叶斯更新如何重塑组合管理",
      "Qlib 一直没讲清楚的一件事：信号有了，策略从哪来",
    ],
    notesEn: [
      "Great Intuitive PMs Are Often Implicit Bayesian Masters",
      "How Bayesian Updating Reshapes Portfolio Management",
      "The Missing Link in Qlib: From Signals to Strategy",
    ],
    slugs: ["portfolio-managers-implicit-bayesians", "bayesian-portfolio-management", "qlib-signal-to-strategy"],
  },
  {
    code: "COLUMN / 04",
    title: "系统生长手记",
    titleEn: "Field Notes",
    notes: [
      "AI 量化与基本面融合：一个 AI-native Fund 原型的生长手记",
      "从信息焦虑到系统自由：我的 Notion 投研大脑养成记",
      "Claude Code 之后，量化基金的工程护城河正在坍缩",
    ],
    notesEn: [
      "AI Quant Meets Fundamental Research: Building an AI-native Fund Prototype",
      "From Information Anxiety to System Freedom: Building My Notion Research Brain",
      "After Claude Code, Quant Funds’ Engineering Moats Are Collapsing",
    ],
    slugs: ["trading-like-pm-lab-notes", "notion-research-brain", "coding-agents-quant-moat"],
  },
];

const capabilities = [
  {
    id: "thesis",
    number: "01",
    code: "THESIS ENGINE",
    title: "研究命题引擎",
    short: "把直觉转化为可检验、可更新的命题。",
    description:
      "从研究问题出发，显式化核心假设、反证条件与关键里程碑。保留人的判断，同时让 AI 能够理解研究目标与边界。",
    input: "问题 / 直觉 / 市场分歧",
    output: "结构化命题 / 证伪条件",
    bullets: ["假设拆解", "预期差定位", "里程碑定义"],
    situationCn: "研究直觉散落在会议、聊天与个人笔记中。",
    situationEn: "Investment intuition is scattered across meetings, chats and personal notes.",
    actionCn: "把核心假设、反证条件和时间窗口写成可更新命题。",
    actionEn: "Encode core assumptions, disconfirming evidence and time windows as updateable theses.",
    resultCn: "Hypothesis Card 与明确的下一验证节点",
    resultEn: "Hypothesis cards and explicit next validation points",
  },
  {
    id: "evidence",
    number: "02",
    code: "EVIDENCE GRAPH",
    title: "证据与因果图谱",
    short: "把分散材料组织成带权重的证据网络。",
    description:
      "连接研报、财报、产业数据与访谈材料，识别实体、关系、时间与证据强度，形成可追溯的产业链因果地图。",
    input: "文档 / 数据 / 产业知识",
    output: "证据链 / 因果图 / 观察点",
    bullets: ["多源解析", "关系抽取", "因果链校准"],
    situationCn: "新信息不断进入，来源与判断之间难以追溯。",
    situationEn: "New information arrives continuously while links between sources and judgments disappear.",
    actionCn: "连接来源、事件、产业传导与证据强度。",
    actionEn: "Connect sources, events, industry transmission and evidence strength.",
    resultCn: "事件账本、证据链与产业观察点",
    resultEn: "Event ledger, evidence chains and industry watchpoints",
  },
  {
    id: "workflow",
    number: "03",
    code: "AGENT WORKFLOW",
    title: "Agent 工作流",
    short: "把高质量研究动作封装成可重复流程。",
    description:
      "将研究方法拆成可编排的 skills、SOP 与 agent 任务，让复杂流程可被调用、检查与复用，而不是停留在一次性对话里。",
    input: "方法论 / SOP / 工具",
    output: "Skills / Agents / Harness",
    bullets: ["任务编排", "质量检查", "资产化沉淀"],
    situationCn: "高质量研究动作依赖个人记忆，难以重复。",
    situationEn: "High-quality research moves depend on individual memory and are hard to repeat.",
    actionCn: "把方法拆成可调用、可检查的 Skill 与 SOP。",
    actionEn: "Turn methods into callable, reviewable skills and SOPs.",
    resultCn: "可复用工作流与明确的人类验收点",
    resultEn: "Reusable workflows with explicit human review points",
  },
  {
    id: "strategy",
    number: "04",
    code: "STRATEGY LAB",
    title: "策略验证实验室",
    short: "让主观判断与量化验证在同一框架协作。",
    description:
      "用因子、信号、回测与情景分析检验研究命题，识别稳健区间和失效条件，为集中决策增加纪律，而非替代基金经理。",
    input: "命题 / 信号 / 市场数据",
    output: "验证结果 / 风险边界",
    bullets: ["因子实验", "稳健性检验", "情景压力测试"],
    situationCn: "主观命题与量化验证分处两套语言。",
    situationEn: "Discretionary theses and quantitative validation live in separate languages.",
    actionCn: "用因子、回测、情景与风险边界检验命题。",
    actionEn: "Test theses through factors, backtests, scenarios and risk boundaries.",
    resultCn: "验证结果、失效条件与可审阅决策材料",
    resultEn: "Validation, failure conditions and auditable decision material",
  },
  {
    id: "feedback",
    number: "05",
    code: "FEEDBACK HARNESS",
    title: "决策反馈闭环",
    short: "让结果反向更新研究系统，而非只做事后复盘。",
    description:
      "记录预期、动作、结果与偏差来源，把真实反馈写回假设、证据权重和流程规则，持续提高下一次决策的起点。",
    input: "决策记录 / 结果 / 偏差",
    output: "归因 / 更新 / 新规则",
    bullets: ["结果归因", "假设更新", "规则演化"],
    situationCn: "复盘停留在结果描述，难以改变下一次研究。",
    situationEn: "Reviews describe outcomes without improving the next research cycle.",
    actionCn: "把预期、动作、结果与偏差写回系统。",
    actionEn: "Write expectations, actions, outcomes and error sources back into the system.",
    resultCn: "Decision Memory、归因与规则更新",
    resultEn: "Decision memory, attribution and rule updates",
  },
];

const workflowSteps = [
  {
    step: "01",
    code: "SENSE",
    title: "市场变化进入事件账本",
    titleEn: "Market change enters the event ledger",
    description: "系统持续捕捉授权范围内的重要变化，保留来源、时间与影响对象；研究员确认其是否值得进入研究状态。",
    descriptionEn: "The system captures material change within the authorized scope; the researcher confirms whether it should enter the research state.",
    ownerCn: "系统捕捉 · 人工确认",
    ownerEn: "System capture · human confirmation",
  },
  {
    step: "02",
    code: "UPDATE",
    title: "证据更新对应假设",
    titleEn: "Evidence updates the relevant thesis",
    description: "新证据连接到具体命题，记录强化、削弱或仍待验证，并更新反证条件与下一观察点。",
    descriptionEn: "New evidence links to a specific thesis, records what it strengthens or weakens, and updates falsification criteria and watchpoints.",
    ownerCn: "Agent 归档 · 研究员判断",
    ownerEn: "Agent organization · researcher judgment",
  },
  {
    step: "03",
    code: "BRIEF",
    title: "形成今日研究优先级",
    titleEn: "Form today’s research priorities",
    description: "Research Desk 把变化折叠成今日头条、关键命题状态与下一组验证动作，减少信息流对注意力的占用。",
    descriptionEn: "The Research Desk compresses change into priorities, thesis states and the next validation actions.",
    ownerCn: "系统生成 · PM 审阅",
    ownerEn: "System draft · PM review",
  },
  {
    step: "04",
    code: "RECORD",
    title: "判断写入 Decision Memory",
    titleEn: "Judgment enters decision memory",
    description: "保留判断形成时的信息集、责任人、风险边界与后续动作，让复盘能够回到当时可见的事实。",
    descriptionEn: "Preserve the information set, owner, risk boundaries and subsequent action behind each judgment.",
    ownerCn: "人类决策 · 系统留痕",
    ownerEn: "Human decision · system record",
  },
  {
    step: "05",
    code: "LEARN",
    title: "结果反馈更新规则",
    titleEn: "Outcome feedback updates the rules",
    description: "区分研究判断、执行与外部噪音的贡献，把结果写回证据权重、命题状态和下一轮工作流。",
    descriptionEn: "Separate judgment, execution and external noise, then update evidence weights, thesis states and the next operating cycle.",
    ownerCn: "联合复盘 · 版本更新",
    ownerEn: "Joint review · version update",
  },
];

function BrandMark() {
  return (
    <Image className="brand-mark-image" src="/lunartulip-silver-emblem.png" width={34} height={38} alt="" aria-hidden="true" />
  );
}

function ArrowRightIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.2 8A7 7 0 1 0 19 15M18.2 8V3.8M18.2 8H14" />
    </svg>
  );
}

export default function Home({ initialLanguage = "cn" }: { initialLanguage?: Language }) {
  const language = initialLanguage;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);

  const capability =
    capabilities.find((item) => item.id === activeCapability) ?? capabilities[0];
  const tx = (value: string) => language === "en" ? (en[value] ?? value) : value;
  const showNextCapability = () => {
    const index = capabilities.findIndex((item) => item.id === activeCapability);
    setActiveCapability(capabilities[(index + 1) % capabilities.length].id);
  };

  useEffect(() => {
    document.documentElement.lang = language === "cn" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const sections = ["top", ...navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -67% 0px", threshold: [0, 0.1, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <header className={`site-header ${hasScrolled ? "is-scrolled" : ""}`} aria-label={language === "cn" ? "主导航" : "Main navigation"}>
        <a className="brand" href="#top" aria-label="Lunartulip Lab">
          <BrandMark />
          <span>LUNARTULIP LAB</span>
        </a>

        <nav className="desktop-nav" aria-label={language === "cn" ? "页面章节" : "Page sections"}>
          {navigation.map((item) => (
            <a href={item.href} className={activeSection === item.href ? "active" : ""} aria-current={activeSection === item.href ? "location" : undefined} key={item.href}>
              {language === "en" ? (item.labelEn ?? tx(item.label)) : item.label}
            </a>
          ))}
        </nav>

        <div className="header-tools">
        <div className="language-switch" aria-label="Language selector">
          <Link href="/" className={language === "cn" ? "active" : ""} hrefLang="zh-CN" aria-current={language === "cn" ? "page" : undefined} onClick={() => window.localStorage.setItem("lunartulip-language", "cn")}>CN</Link>
          <span>/</span>
          <Link href="/en" className={language === "en" ? "active" : ""} hrefLang="en" aria-current={language === "en" ? "page" : undefined} onClick={() => window.localStorage.setItem("lunartulip-language", "en")}>EN</Link>
        </div>
        <div className="system-status" aria-label={language === "cn" ? "全球 AI 科技权益独立研究" : "Independent global AI technology equity research"}>
          <span aria-hidden="true" />
          <b>RESEARCH</b>
          <i>/</i>
          GLOBAL AI
        </div>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? (language === "cn" ? "关闭导航" : "Close navigation") : (language === "cn" ? "打开导航" : "Open navigation")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <button
        className={`nav-backdrop ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={language === "cn" ? "关闭导航" : "Close navigation"}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label={language === "cn" ? "移动端页面章节" : "Mobile sections"} aria-hidden={!menuOpen}>
        {navigation.map((item, index) => (
          <a href={item.href} className={activeSection === item.href ? "active" : ""} aria-current={activeSection === item.href ? "location" : undefined} key={item.href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span> {language === "en" ? (item.labelEn ?? tx(item.label)) : item.label}
          </a>
        ))}
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">INDEPENDENT PUBLIC-EQUITIES RESEARCH · GLOBAL AI TECHNOLOGY</p>
          <h1 id="hero-title">
            {language === "cn" ? (
              <>
                <span className="hero-title-line">主观基本面 × 系统化量化</span>
                <span className="hero-title-line hero-title-tagline">两台研究引擎，持续验证判断。</span>
              </>
            ) : (
              <>
                <span className="hero-title-line">Discretionary Fundamental</span>
                <span className="hero-title-line">× Systematic Quant</span>
                <span className="hero-title-line hero-title-tagline">Two Research Engines.</span>
                <span className="hero-title-line">Judgment under Continuous Test.</span>
              </>
            )}
          </h1>
          <p className="hero-description">
            {language === "cn" ? (
              <>
                <span>Lunartulip Lab 是一家聚焦全球泛 AI 科技权益的 AI-native 独立研究机构。</span>
                <span>我们用主观基本面研究理解产业因果、公司利润与预期差，用系统化量化研究检验信号、组合纪律与风险调整价值。</span>
                <span>帮助专业投资者与机构研究团队更快识别变化、复核关键假设，并以可追溯记录持续提高判断质量。</span>
              </>
            ) : (
              <>
                <span>Lunartulip Lab is an AI-native independent research institution focused on global AI technology equities.</span>
                <span>Discretionary fundamental research explains industry causality, earnings and expectations; systematic quant tests signals, portfolio discipline and risk-adjusted value.</span>
                <span>For professional investors and institutional research teams seeking faster change detection, explicit thesis review and traceable improvement in judgment quality.</span>
              </>
            )}
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#practice">
              {language === "cn" ? "阅读旗舰研究" : "Read flagship research"} <span aria-hidden="true"><ArrowRightIcon /></span>
            </a>
            <Link className="secondary-action" href={language === "en" ? "/en/authority-ledger" : "/authority-ledger"}>
              {language === "cn" ? "查看判断账本" : "View the Authority Ledger"} <span aria-hidden="true"><ArrowUpRightIcon /></span>
            </Link>
          </div>
        </div>

        <div className="signal-visual" aria-label={language === "cn" ? "从命题、证据到反馈的研究信号图" : "Research signal map from thesis and evidence to feedback"}>
          <div className="axis axis-x" />
          <div className="axis axis-y" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <Image
            className="lunar-form"
            src="/lunartulip-silver-emblem.png"
            width={470}
            height={510}
            alt="银色月面新月环抱郁金香的 Lunartulip Lab 标志"
            priority
          />
          <span className="signal-node node-one" />
          <span className="signal-node node-two" />
          <span className="signal-node node-three" />
          <span className="signal-node node-four" />
          <div className="metric-card metric-thesis">
            <small>THESIS PATH</small>
            <code>QUESTION → HYPOTHESIS → TEST</code>
            <p>HUMAN JUDGMENT <b>IN LOOP</b></p>
          </div>
          <div className="metric-card metric-evidence">
            <small>EVIDENCE SYSTEM</small>
            <code>SOURCE → CLAIM → CAUSE</code>
            <p>TRACEABLE <b>/ UPDATEABLE</b></p>
          </div>
          <p className="coordinates">ACTIVE RESEARCH SYSTEM<br />LUNARTULIP LAB · 2026</p>
        </div>
      </section>

      <section className="positioning-strip" aria-label={language === "cn" ? "市场范围与系统定位" : "Market scope and system positioning"}>
        {positioningSignals.map((item) => (
          <div key={item.label}>
            <small>{item.label}</small>
            <strong>{language === "cn" ? item.cn : item.en}</strong>
          </div>
        ))}
      </section>

      <section className="product-section page-section" id="research" aria-labelledby="research-title">
        <div className="section-heading product-heading">
          <div>
            <p className="section-index">RESEARCH ENGINES / 01</p>
            <h2 id="research-title">
              {language === "cn" ? "两台研究引擎，持续解释与验证市场机会。" : "Two research engines continuously explain and test market opportunity."}
            </h2>
          </div>
          <p className="section-lead">
            {language === "cn"
              ? "主观基本面研究回答产业因果、公司利润与预期差，系统化量化研究检验信号、组合纪律与风险调整价值。两台引擎共同产出可追溯的研究判断、验证记录与结果反馈。"
              : "Discretionary fundamental research addresses industry causality, company earnings and expectation gaps; systematic quant tests signals, portfolio discipline and risk-adjusted value. Together they produce traceable judgment, validation records and outcome feedback."}
          </p>
        </div>

        <div className="collaboration-lanes" aria-label={language === "cn" ? "两台研究引擎" : "Two research engines"}>
          {collaborationLanes.map((lane, index) => (
            <article key={lane.code}>
              <div className="lane-index">0{index + 1}</div>
              <div>
                <p>{lane.code}</p>
                <h3>{language === "cn" ? lane.titleCn : lane.titleEn}</h3>
                <span>{language === "cn" ? lane.bodyCn : lane.bodyEn}</span>
              </div>
              <a href={lane.href}>{language === "cn" ? lane.ctaCn : lane.ctaEn}<ArrowRightIcon /></a>
            </article>
          ))}
        </div>

        <div className="desk-control-plane">
          <div className="desk-control-copy">
            <p>ALWAYS-ON RESEARCH DESK / AI-NATIVE RESEARCH WORKSPACE</p>
            <h3>{language === "cn" ? "让两台引擎的判断，在一个工作区持续更新。" : "Keep judgment from both engines continuously updated in one workspace."}</h3>
            <span>
              {language === "cn"
                ? "主观基本面系统由 PM 判断驱动，通过 Coverage 与 R 线 AlphaMap × Ontology 持续更新产业和公司认知；系统化量化系统持续运行策略研究与组合验证。Research Desk 将两台引擎的研究状态、双 NAV 与结果反馈汇集为清晰的日常工作区。"
                : "The discretionary fundamental system is PM-led, using Coverage and the R-line AlphaMap × Ontology to update industry and company views; the systematic quant system continuously runs strategy research and portfolio validation. Research Desk brings both engines’ research state, dual NAV and outcome feedback into one clear daily workspace."}
            </span>
            <Link href={language === "en" ? "/en/desk" : "/desk"}>
              {language === "cn" ? "查看 Research Desk 真实界面与九层架构" : "Explore the real interface and nine-layer architecture"} <ArrowRightIcon />
            </Link>
          </div>
          <div className="desk-control-grid">
            {deskCapabilities.map((item, index) => (
              <div key={item.code}>
                <small>0{index + 1} / {item.code}</small>
                <strong>{language === "cn" ? item.cn : item.en}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="product-ladder">
          {productOffers.map((offer, index) => (
            <article className={`product-offer ${index === 1 ? "product-offer-featured" : ""}`} key={offer.code}>
              <div className="product-offer-head">
                <p>{offer.code}</p>
                <span>{index === 0 ? "01" : "02"}</span>
              </div>
              <h3>{language === "cn" ? offer.titleCn : offer.titleEn}</h3>
              <p className="product-summary">{language === "cn" ? offer.summaryCn : offer.summaryEn}</p>
              <dl>
                <div>
                  <dt>{language === "cn" ? "适合对象" : "BEST FOR"}</dt>
                  <dd>{language === "cn" ? offer.fitCn : offer.fitEn}</dd>
                </div>
              </dl>
              <p className="product-deliverable-label">{language === "cn" ? "内容包含" : "WHAT IT INCLUDES"}</p>
              <ul>{(language === "cn" ? offer.deliverablesCn : offer.deliverablesEn).map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="product-price">
                <strong>{language === "cn" ? offer.priceCn : offer.priceEn}</strong>
                <small>{language === "cn" ? offer.noteCn : offer.noteEn}</small>
              </div>
              <Link className={index === 1 ? "case-cta case-cta-primary" : "case-cta"} href={language === "en" ? `/en${offer.href}` : offer.href}>
                {language === "cn" ? offer.ctaCn : offer.ctaEn} <span aria-hidden="true"><ArrowUpRightIcon /></span>
              </Link>
            </article>
          ))}
          <div className="product-connector" aria-hidden="true">
            <span>FUNDAMENTAL</span><i /><b>SHARED EVIDENCE</b><i /><span>QUANT</span>
          </div>
        </div>

        <div className="enterprise-mode">
          <div><small>INSTITUTIONAL RESEARCH ACCESS</small><strong>{language === "cn" ? "从公开研究开始，按问题与时效深入" : "Begin with public research, then go deeper by question and cadence"}</strong></div>
          <p>{language === "cn" ? "机构与专业投资者可以先通过 Deep Dive、Authority Ledger 与 Research Desk 界面了解研究质量和工作方法，再围绕持续跟踪、深度研究问题或双引擎方法展开专业交流。" : "Institutions and professional investors can begin with Deep Dives, the Authority Ledger and the Research Desk interface, then explore continuous monitoring, a specific deep-research question or the dual-engine method."}</p>
          <Link href={language === "en" ? "/en/institutional-access" : "/institutional-access"}>{language === "cn" ? "了解机构研究方式" : "Explore institutional research formats"} <ArrowRightIcon /></Link>
        </div>
      </section>

      <section className="philosophy-section page-section" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-heading">
          <div>
            <p className="section-index">RESEARCH DISCIPLINE / 02</p>
            <h2 id="philosophy-title">{language === "cn" ? "两台引擎各自验证，在投资学习层汇合。" : "Two engines validate independently and meet in the investment-learning layer."}</h2>
          </div>
          <p className="section-lead">
            {language === "cn" ? "Fundamental 保留对产业因果、公司利润与预期差的完整解释，Quant 独立检验信号、稳定性与成本后价值；两者在证据、决策记录与结果归因层形成共同语言。" : "Fundamental research preserves full explanations of industry causality, company earnings and expectation gaps. Quant independently tests signals, stability and post-cost value. Both meet through shared evidence, decision records and outcome attribution."}
          </p>
        </div>

        <div className="principles-grid">
          <article className="principle-card principle-main">
            <p className="card-index">01 / POINT-IN-TIME</p>
            <h3>{language === "cn" ? "判断必须带时间戳，才能被未来验证。" : "Judgment needs a timestamp before the future can test it."}</h3>
            <div className="compound-diagram" aria-hidden="true">
              <span>{tx("判断")}</span><i>→</i><span>{tx("证据")}</span><i>→</i><span>{tx("系统")}</span><i>↗</i>
            </div>
          </article>
          <article className="principle-card">
            <p className="card-index">02 / DUAL ENGINE</p>
            <h3>{language === "cn" ? <>产业因果<br />× 统计验证</> : <>Industry causality<br />× statistical validation</>}</h3>
            <p>{language === "cn" ? "主观基本面回答机制与预期差；系统化量化回答复现性、稳定性和成本后价值。" : "Fundamental research addresses mechanisms and expectation gaps; systematic quant addresses reproducibility, stability and post-cost value."}</p>
          </article>
          <article className="principle-card">
            <p className="card-index">03 / CORRECTION</p>
            <h3>{language === "cn" ? <>更正记录<br />也是研究资产</> : <>Corrections are<br />research assets</>}</h3>
            <p>{language === "cn" ? "新证据出现后回到上游修正，并重新生成所有受影响版本，让公开判断始终对应最新证据与明确时点。" : "New evidence triggers an upstream correction and regeneration of every affected version, keeping published judgment aligned with current evidence and an explicit point in time."}</p>
          </article>
        </div>
      </section>

      <section className="capability-section page-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">RESEARCH VALUE CHAIN / 03</p>
            <h2 id="capabilities-title">{language === "cn" ? "让研究判断可追溯、可验证、可复用。" : "Make research judgment traceable, testable and reusable."}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "从信息摄入、产业因果与命题管理，到量化验证和结果归因，完整研究链路帮助专业团队减少信息漏损与重复验证成本，并把经验沉淀为可持续复用的机构知识。" : "From information intake, industry causality and thesis management to quantitative validation and outcome attribution, the connected research chain reduces information loss and repeated validation work while turning experience into reusable institutional knowledge."}</p>
        </div>

        <div className="capability-overview" aria-label={language === "cn" ? "研究系统完整能力回路" : "Complete research-system capability loop"}>
          {capabilities.map((item, index) => (
            <button type="button" key={item.id} className={activeCapability === item.id ? "active" : ""} onClick={() => setActiveCapability(item.id)}>
              <span>{item.number}</span>
              <small>{item.code}</small>
              <strong>{language === "cn" ? item.resultCn : item.resultEn}</strong>
              {index < capabilities.length - 1 && <i aria-hidden="true"><ArrowRightIcon /></i>}
            </button>
          ))}
        </div>

        <div className="capability-console">
          <div className="capability-tabs" role="tablist" aria-label={language === "cn" ? "能力模块" : "Capability modules"}>
            {capabilities.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCapability === item.id}
                className={activeCapability === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setActiveCapability(item.id)}
              >
                <span className="cap-node" aria-hidden="true"><i /></span>
                <span className="cap-label"><small>{item.number} / {item.code}</small><b>{tx(item.title)}</b></span>
                <span className="cap-arrow" aria-hidden="true"><ArrowRightIcon /></span>
              </button>
            ))}
          </div>

          <div className="capability-detail" role="tabpanel" key={capability.id}>
            <div className="detail-signal" aria-hidden="true">
              <span className="detail-orbit" />
              <span className="detail-core">{capability.number}</span>
              <span className="detail-path path-a" />
              <span className="detail-path path-b" />
              <i className="detail-dot dot-a" />
              <i className="detail-dot dot-b" />
              <i className="detail-dot dot-c" />
            </div>
            <p className="detail-code">{capability.number} / {capability.code}</p>
            <h3>{tx(capability.title)}</h3>
            <div className="capability-outcomes">
              <div><small>{language === "cn" ? "研究挑战" : "RESEARCH CHALLENGE"}</small><p>{language === "cn" ? capability.situationCn : capability.situationEn}</p></div>
              <div><small>{language === "cn" ? "研究方法" : "RESEARCH METHOD"}</small><p>{language === "cn" ? capability.actionCn : capability.actionEn}</p></div>
              <div><small>{language === "cn" ? "研究产出" : "RESEARCH OUTPUT"}</small><p>{language === "cn" ? capability.resultCn : capability.resultEn}</p></div>
            </div>
            <details className="capability-method">
              <summary>{language === "cn" ? "查看方法细节" : "View method detail"}</summary>
              <p>{tx(capability.description)}</p>
              <div><small>INPUT</small><strong>{tx(capability.input)}</strong><small>OUTPUT</small><strong>{tx(capability.output)}</strong></div>
            </details>
            <div className="detail-bullets">
              {capability.bullets.map((bullet, index) => <span key={bullet}>0{index + 1} {tx(bullet)}</span>)}
            </div>
            <button className="next-control" type="button" onClick={showNextCapability}>
              <span>{language === "cn" ? "下一能力模块" : "Next capability"}</span><b aria-hidden="true"><ArrowRightIcon /></b>
            </button>
          </div>
        </div>
      </section>

      <section className="workflow-section page-section" id="workflow" aria-labelledby="workflow-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">CONTINUOUS RESEARCH OPERATIONS / 04</p>
            <h2 id="workflow-title">{language === "cn" ? "更快识别真正变化，及时更新关键判断。" : "Identify material change faster and update critical judgment in time."}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "系统持续汇总市场变化、关键证据、命题状态与结果反馈，形成清晰的今日研究优先级和下一验证动作，让研究团队把注意力从追逐信息转向更新判断。" : "The system continuously connects market change, key evidence, thesis state and outcome feedback into clear daily priorities and next validation actions—shifting research attention from chasing information to updating judgment."}</p>
        </div>

        <div className="workflow-loop" aria-label={language === "cn" ? "持续研究日常回路" : "Daily continuous research loop"}>
          {workflowSteps.map((item, index) => (
            <article key={item.step}>
              <div className="workflow-loop-head"><span>{item.step}</span><small>{item.code}</small></div>
              <h3>{language === "cn" ? item.title : item.titleEn}</h3>
              <p>{language === "cn" ? item.description : item.descriptionEn}</p>
              <strong>{language === "cn" ? item.ownerCn : item.ownerEn}</strong>
              {index < workflowSteps.length - 1 && <i aria-hidden="true"><ArrowRightIcon /></i>}
            </article>
          ))}
          <div className="workflow-return" aria-hidden="true"><span>{language === "cn" ? "反馈写回下一轮研究" : "Feedback enters the next cycle"}</span><LoopIcon /></div>
        </div>
      </section>

      <section className="vision-section page-section" id="direction" aria-labelledby="vision-title">
        <div className="vision-panel">
          <div className="vision-copy">
            <p className="section-index">VALUE REALIZATION / 05</p>
            <h2 id="vision-title">{language === "cn" ? <>现在看得见研究质量，<br />长期看资本结果。</> : <>See research quality now.<br />Judge long-term value through capital outcomes.</>}</h2>
            <p>
              {language === "cn"
                ? "机构与专业投资者可以先通过研究作品、版本记录、更正与结局账本判断我们的研究质量。长期，双研究引擎将在真实资本责任下持续接受检验；任何未来资管合作均将在相应主体、资质与合规框架完备后独立开展。"
                : "Institutions and professional investors can first evaluate our research quality through published work, version histories, corrections and outcome records. Over time, both engines will remain accountable to real capital outcomes; any future asset-management activity will operate separately under the appropriate entity, qualifications and compliance framework."}
            </p>
            <div className="vision-links">
              <Link href={language === "cn" ? "/notes/decision-attribution-after-self-driving-portfolio" : "/en/notes/decision-attribution-after-self-driving-portfolio"}>{language === "cn" ? "阅读决策归因研究" : "Read the decision-attribution research"}<ArrowRightIcon /></Link>
              <Link href="/notes/trading-like-pm-lab-notes">{language === "cn" ? "查看系统生长手记" : "Read the system field notes"}<ArrowRightIcon /></Link>
            </div>
          </div>
          <div className="vision-boundary">
            <article>
              <small>RESEARCH ACCESS</small>
              <h3>{language === "cn" ? "先验证研究质量" : "Evaluate research quality first"}</h3>
              <p>{language === "cn" ? "通过 Deep Dive、研究方法、更新记录与 Authority Ledger，评估研究深度、验证纪律和结果质量；如需持续跟踪或围绕具体研究问题深入，可进一步开展机构研究交流。" : "Use Deep Dives, research methods, update histories and the Authority Ledger to assess depth, validation discipline and outcome quality, then explore continuous monitoring or a specific research question through institutional exchange."}</p>
              <Link href={language === "en" ? "/en/institutional-access" : "/institutional-access"}>{language === "cn" ? "了解机构研究方式" : "Explore institutional research formats"} <ArrowRightIcon /></Link>
            </article>
            <article>
              <small>LONG-TERM DIRECTION</small>
              <h3>{language === "cn" ? "长期资本管理方向" : "Long-term capital-management direction"}</h3>
              <p>{language === "cn" ? "真实资本结果将长期检验双研究引擎的判断质量、风险纪律与学习能力。相关业务将在相应主体、资质与合规框架完备后独立开展。" : "Real capital outcomes will test the two engines’ judgment quality, risk discipline and learning capacity over time. Related activity will operate separately under the appropriate entity, qualifications and compliance framework."}</p>
              <a href={institutionalMailto({ source: "HOME_ASSET_DIRECTION", topic: "Strategic Institutional Partnership", language })}>
                {language === "cn" ? "讨论战略机构合作" : "Discuss a strategic institutional partnership"} <ArrowUpRightIcon />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="practice-section page-section" id="practice" aria-labelledby="practice-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">DEEP RESEARCH / 06</p>
            <h2 id="practice-title">{language === "cn" ? "从具体公司和产业问题，看见研究深度。" : "See the depth of research through specific company and industry questions."}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "两篇旗舰研究分别围绕具体公司与产业问题展开，完整保留研究问题、核心论点、关键证据、风险边界、as-of 日期与更新记录。" : "Two flagship research objects address specific company and industry questions, preserving the research question, core thesis, key evidence, risk boundary, as-of date and update history."}</p>
        </div>
        <div className="practice-grid">
          {practiceCases.map((item) => (
            <article className="practice-card" key={item.code}>
              <p className="card-index">{item.code}</p>
              <div className="practice-visual" aria-hidden="true">
                <span className="practice-axis" />
                {item.nodes.map((node, index) => <i key={node} className={`practice-node practice-node-${index + 1}`}>{node}</i>)}
                <strong>{item.metric}</strong>
              </div>
              <div className="practice-copy">
                <h3>{language === "cn" ? item.title : item.titleEn}</h3>
                <p>{language === "cn" ? item.thesis : item.thesisEn}</p>
                <Link href={language === "en" ? `/en${item.href}` : item.href}>{language === "cn" ? "阅读研究" : "Read the research"}<span><ArrowRightIcon /></span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-section page-section" id="notes" aria-labelledby="notes-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">RESEARCH NOTES / 07</p>
            <h2 id="notes-title">{language === "cn" ? "研究方法、系统实践与长期思考" : "Research methods, system practice and long-term thinking"}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "围绕主观基本面、系统化量化、AI-native investing 与投资决策系统，持续沉淀可供专业读者参考的方法研究。" : "Ongoing methodological research for professional readers across discretionary fundamental, systematic quant, AI-native investing and investment decision systems."}</p>
        </div>
        <div className="notes-grid">
          {noteColumns.map((column) => (
            <article className="notes-column" key={column.code}>
              <p className="card-index">{column.code}</p>
              <h3>{language === "cn" ? column.title : column.titleEn}</h3>
              <ol>{(language === "cn" ? column.notes : column.notesEn).map((note, index) => {
                const slug = column.slugs[index];
                const href = language === "en" && slug === "decision-attribution-after-self-driving-portfolio"
                  ? `/en/notes/${slug}`
                  : `/notes/${slug}`;
                return <li key={note}><span>0{index + 1}</span><Link href={href}><p>{note}</p></Link><i aria-hidden="true">↗</i></li>;
              })}</ol>
              <a className="notes-contact" href={institutionalMailto({ source: "HOME_NOTE_COLUMN", topic: language === "cn" ? column.title : column.titleEn, language })}>
                {language === "cn" ? "交流这一研究方向" : "Discuss this research area"} <span aria-hidden="true"><ArrowUpRightIcon /></span>
              </a>
            </article>
          ))}
        </div>
        <Link className="notes-archive-link" href="/notes">
          {language === "cn" ? "查看全部研究手札" : "View all research notes"} <span aria-hidden="true"><ArrowRightIcon /></span>
        </Link>
      </section>

      <section className="closing-section" id="contact" aria-labelledby="closing-title">
        <div className="closing-orbit" aria-hidden="true"><span /><i /></div>
        <p className="section-index">ENGAGE LUNARTULIP LAB / CHINA & GLOBAL</p>
        <h2 id="closing-title">{language === "cn" ? "从一个值得验证的研究问题开始。" : "Start with a research question worth testing."}</h2>
        <p>{language === "cn" ? "请介绍您的机构背景、关注市场与具体研究问题，我们将从最适合的研究方式开始交流。" : "Tell us about your institution, market focus and a specific research question, and we will begin with the most relevant research format."}</p>
        <div className="engagement-grid">
          {engagementTopics.map((topic, index) => (
            <Link key={topic.intent} href={`${language === "en" ? "/en" : ""}/institutional-access#intent-${topic.intent}`}>
              <small>0{index + 1}</small>
              <strong>{language === "cn" ? topic.cn : topic.en}</strong>
              <span>{language === "cn" ? topic.detailCn : topic.detailEn}</span>
              <i aria-hidden="true"><ArrowUpRightIcon /></i>
            </Link>
          ))}
        </div>
        <a className="contact-email" href={institutionalMailto({ source: "HOME_CONTACT", topic: language === "cn" ? "机构合作咨询" : "Institutional Inquiry", language })}>
          <small>{language === "cn" ? "海内外机构合作与研究交流" : "China & global institutional partnerships"}</small>
          {INSTITUTIONAL_EMAIL} <span aria-hidden="true"><ArrowUpRightIcon /></span>
        </a>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><BrandMark />LUNARTULIP LAB</a>
          <div className="footer-contact">
            <p><a href={institutionalMailto({ source: "HOME_FOOTER", topic: language === "cn" ? "官网联系" : "Website Contact", language })}>{INSTITUTIONAL_EMAIL}</a></p>
            <p className="footer-links">
              <Link href={language === "en" ? "/en/about" : "/about"}>{language === "cn" ? "关于我们" : "About"}</Link>
              <Link href={language === "en" ? "/en/deep-dive" : "/deep-dive"}>Deep Dive</Link>
              <Link href={language === "en" ? "/en/authority-ledger" : "/authority-ledger"}>Authority Ledger</Link>
              <Link href={language === "en" ? "/en/institutional-access" : "/institutional-access"}>Research Access</Link>
            </p>
            <p className="footer-social">
              <span>{language === "cn" ? "微信公众号" : "WeChat Official Account"}：Lunartulip Lab</span>
              <span>{language === "cn" ? "小红书" : "Xiaohongshu"}：Lunartulip Lab</span>
            </p>
          </div>
          <p>© 2026 LUNARTULIP LAB</p>
        </div>
        <p className="footer-boundary">
          {language === "cn"
            ? "官网公开内容用于展示研究问题、方法、版本与聚合验证记录，不构成投资建议、操作指引、基金募集、金融产品推介或收益承诺。"
            : "Public content presents research questions, methods, versions and aggregate validation records. It is not investment advice, trading instruction, fundraising, financial-product solicitation or a promise of returns."}
        </p>
      </footer>
      <a className={`back-to-top ${hasScrolled ? "is-visible" : ""}`} href="#top" aria-label={language === "cn" ? "返回顶部" : "Back to top"}>
        <span aria-hidden="true"><ArrowRightIcon /></span>
      </a>
    </main>
  );
}
