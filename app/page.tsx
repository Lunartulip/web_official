"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { institutionalMailto } from "../lib/contact";

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
  "机构投研升级": "Institutional Research Upgrade", "投研基础系统": "Research Foundation System",
  "以标准化 Workshop 为部署方式，覆盖从信息摄入、假设管理和策略逆向工程，到风险闸门、可复用 Skill 与个人 Agent OS 的完整基础链路。": "A standardized workshop that installs a complete research foundation—from information ingestion, thesis management and strategy reverse-engineering to risk gates, reusable skills and a personal Agent OS.",
  "Schema、Hypothesis Card 与研究生产链路": "Schemas, hypothesis cards and research production chain", "Risk Gate、Skill / SOP 与端到端示范": "Risk gates, skills / SOPs and end-to-end demonstrations", "个人 Agent OS 与 Decision Memory 蓝图": "Personal Agent OS and decision-memory blueprint",
  "产业因果研究": "Industry Causal Research", "围绕客户真实行业、股票池与数据边界，通过咨询 Session 建模，并以可本地部署的 AlphaMap 软件承载产业因果链与持续跟踪。": "Model the client’s real sectors, universe and data boundaries through focused sessions, then deliver the causal chain and ongoing tracking in a locally deployable AlphaMap workspace.",
  "客户场景下的产业因果模型": "A client-specific industry causal model", "驱动—传导—兑现路径与观察节点": "Drivers, transmission, realization and watchpoints", "可本地部署的 AlphaMap 工作台": "Locally deployable AlphaMap workspace",
  "决策系统闭环": "Decision System Loop", "以私有 Harness 连接多个研究场景、人员权限、风险边界与决策记忆，让真实反馈持续写回系统，形成可治理、可演化的组织能力。": "A private harness connecting research contexts, permissions, risk boundaries and decision memory—so real outcomes continuously update a governable, evolving institutional system.",
  "跨场景的研究与决策编排": "Cross-context research and decision orchestration", "权限、风险闸门与执行治理": "Permissions, risk gates and execution governance", "持续运行的反馈与决策记忆": "Persistent feedback and decision memory",
  "为主动管理构建": "Build", "研究与": "research and decision", "决策系统": "systems for active management",
  "从研究基础系统、产业因果模型到机构决策闭环，": "From research foundations and industry causal models to institutional decision loops,",
  "让每一次判断，都成为下一次决策的系统资产。": "turn every judgment into a system asset for the next decision.", "探索能力地图": "Explore capabilities",
  "从研究命题到反馈闭环": "From investment thesis to feedback loop", "把模糊判断转化为可验证命题。": "Turn fuzzy judgment into testable theses.", "聚合多源证据，显式化因果链路。": "Aggregate evidence and make causal chains explicit.", "评估决策效果，让反馈驱动迭代。": "Measure decisions and let feedback drive iteration.",
  "把基金经理的判断方式，写进一套会生长的买方系统。": "Encode the PM’s judgment into a buy-side system that learns.",
  "Lunartulip Lab 将信息、假设、证据、动作、仓位、结果与记忆连接起来，让产业判断、量化纪律与 Agent 工作流共同进入持续接受市场反馈的决策系统。": "Lunartulip Lab connects information, theses, evidence, actions, positions, outcomes and memory—bringing domain judgment, quantitative discipline and agent workflows into one decision system shaped by market feedback.",
  "让每一次研究，都提高下一次研究的起点。": "Make every research cycle raise the starting point of the next.", "判断": "JUDGMENT", "证据": "EVIDENCE", "系统": "SYSTEM",
  "人的判断\n× 系统的纪律": "Human judgment\n× system discipline", "保留基金经理对语义、情境与非线性机会的理解，用量化与 Agent 外骨骼减少漏损。": "Preserve the PM’s command of context and nonlinear opportunity; use quantitative and agentic scaffolding to reduce leakage.",
  "真实反馈\n优先于漂亮自动化": "Real feedback\nover elegant automation", "系统的价值不由流程图决定，而由它能否接受现实检验、识别偏差并持续更新决定。": "A system earns its value by surviving reality, exposing error and updating—not by looking elegant on a diagram.",
  "一张从研究到决策的能力地图": "A capability map from research to decision", "选择模块，查看它在系统中的输入、输出与核心动作。": "Select a module to inspect its inputs, outputs and core actions.",
  "研究如何穿过系统": "How research moves through the system", "五个阶段不是流水线终点，而是一条带反馈的研究回路。": "Five stages form a feedback-bearing research loop, not a one-way pipeline.",
  "三种交付深度": "Three levels of delivery", "横向建立完整基础，纵向打穿真实场景，最终让系统在机构内部闭环复利。": "Build the full foundation, penetrate a real investment context, then compound the system inside the institution.",
  "把研究做成会生长的系统。": "Build research systems that learn.", "返回信号起点": "Back to signal origin"
};

const navigation = [
  { label: "产品", labelEn: "Products", href: "#products" },
  { label: "能力地图", href: "#capabilities" },
  { label: "工作流", href: "#workflow" },
  { label: "资管方向", labelEn: "Direction", href: "#direction" },
  { label: "手札", href: "#notes" },
  { label: "合作咨询", href: "#contact" },
];

const positioningSignals = [
  { label: "GLOBAL AI TECHNOLOGY UNIVERSE", cn: "全球泛 AI 科技权益", en: "Global AI technology equities" },
  { label: "CROSS-MARKET MAPPING", cn: "跨 A 股、美股与港股", en: "A-shares / U.S. / Hong Kong" },
  { label: "INSTITUTIONAL CONTEXT", cn: "专业机构主动管理", en: "Institutional active management" },
  { label: "DECISION MODEL", cn: "碳基直觉 × 硅基外骨骼", en: "Human-led × AI-augmented" },
];

const engagementTopics = [
  { cn: "6-Session Workshop", en: "6-Session Workshop", detailCn: "部署投研基础系统与 90 天实施路线", detailEn: "Install the research foundation and a 90-day roadmap", subject: "6-Session Research System Workshop" },
  { cn: "Research Desk 试点", en: "Research Desk Pilot", detailCn: "围绕一个真实命题验证持续研究回路", detailEn: "Validate the operating loop around one live thesis", subject: "Research Desk Paid Pilot" },
  { cn: "机构私有化适配", en: "Private Institutional Adaptation", detailCn: "适配数据、权限、治理与 Decision Memory", detailEn: "Adapt data, permissions, governance and decision memory", subject: "Private Institutional Adaptation" },
  { cn: "战略机构合作", en: "Strategic Institutional Partnership", detailCn: "讨论研究、技术与长期资管组织共建", detailEn: "Explore research, technology and long-term operating partnerships", subject: "Strategic Institutional Partnership" },
];

const collaborationLanes = [
  {
    code: "CURRENT / INSTITUTIONAL SYSTEMS",
    titleCn: "机构投研系统",
    titleEn: "Institutional Research Systems",
    bodyCn: "从 6-Session Workshop 建立基础，再由 Always-On Research Desk 持续运行；需要进入内部数据与治理边界时，按机构环境完成私有化适配。",
    bodyEn: "Install the foundation through a six-session deployment, operate it through the Always-On Research Desk, then adapt data and governance for the institutional environment when required.",
    href: "#products",
    ctaCn: "查看当前产品",
    ctaEn: "Explore current offers",
  },
  {
    code: "LONG TERM / ASSET MANAGEMENT",
    titleCn: "AI-native 资管方向",
    titleEn: "AI-native Asset-Management Direction",
    bodyCn: "以主观研究、量化验证、Research Desk 与 Decision Memory 为基础，持续研究 AI-native Fund 的组织与系统原型。",
    bodyEn: "Researching the organizational and system prototype of an AI-native Fund across discretionary research, quantitative validation, the Research Desk and decision memory.",
    href: "#direction",
    ctaCn: "了解长期方向",
    ctaEn: "Explore the direction",
  },
];

const productOffers = [
  {
    code: "START / DEPLOY",
    titleCn: "AI-native Research System Workshop",
    titleEn: "AI-native Research System Deployment",
    summaryCn: "围绕一个真实投研场景，用 6 个工作 Session 把信息、假设、验证、风险闸门与决策记录装进同一套可运行的基础系统。",
    summaryEn: "Six working sessions around a live investment-research context to install one operating foundation for information, theses, validation, risk gates and decision records.",
    fitCn: "已有投资框架、正在推进 AI 化的公募、私募、资管团队与专业家族办公室。",
    fitEn: "Funds, asset managers and professional family offices with an established investment process.",
    deliverablesCn: ["投研流程与数据边界诊断", "Hypothesis Card、Skill / SOP 与 Risk Gate", "Decision Memory 蓝图与 90 天实施路线"],
    deliverablesEn: ["Workflow and data-boundary diagnostic", "Hypothesis cards, skills / SOPs and risk gates", "Decision-memory blueprint and 90-day implementation roadmap"],
    priceCn: "¥100,000 起",
    priceEn: "From US$15,000",
    noteCn: "6 Sessions · 定制范围、税费与差旅另议",
    noteEn: "6 sessions · customization, taxes and travel quoted separately",
    href: "/workshop",
    ctaCn: "了解 6-Session Workshop",
    ctaEn: "Explore the six-session deployment",
  },
  {
    code: "OPERATE / VALIDATE",
    titleCn: "Always-On Research Desk",
    titleEn: "Always-On Research Desk",
    summaryCn: "让事件账本、假设看板、每日简报与决策记忆持续运行。先以边界清晰的付费试点验证使用频率、研究价值与协作方式。",
    summaryEn: "Keep the event ledger, hypothesis board, daily briefs and decision memory operating continuously, beginning with a bounded paid pilot.",
    fitCn: "Workshop 完成后的机构团队；已有成熟流程的机构也可经 readiness assessment 直接进入试点。",
    fitEn: "Teams completing the workshop, or mature institutions entering directly after a readiness assessment.",
    deliverablesCn: ["一个真实命题的持续研究状态", "每日优先级、事件账本与假设更新", "结果复盘与 Decision Memory"],
    deliverablesEn: ["An ongoing research state for one live thesis", "Daily priorities, event ledger and thesis updates", "Outcome review and decision memory"],
    priceCn: "B2B 受邀付费试点",
    priceEn: "Invited B2B paid pilot",
    noteCn: "按覆盖范围、数据、频率、集成与支持定制报价",
    noteEn: "Custom quote based on coverage, data, cadence, integration and support",
    href: "/desk",
    ctaCn: "查看 Research Desk",
    ctaEn: "Explore the Research Desk",
  },
];

const practiceCases = [
  {
    code: "ALPHAMAP / 01",
    title: "AI 基础设施",
    titleEn: "AI Infrastructure",
    thesis: "从算力需求、物理瓶颈到利润兑现，持续追踪产业约束如何穿透资产价格。",
    thesisEn: "Trace how compute demand and physical bottlenecks travel through the value chain into earnings and asset prices.",
    metric: "BOTTLENECK → PNL",
    nodes: ["DEMAND", "BOTTLENECK", "CLOCK", "PNL", "ACTION"],
  },
  {
    code: "ALPHAMAP / 02",
    title: "人形机器人",
    titleEn: "Humanoid Robotics",
    thesis: "把产业阶段、供应链瓶颈、订单传导与仓位语言放进同一套可更新的研究状态。",
    thesisEn: "Place industry stage, supply-chain bottlenecks, order transmission and position language in one updateable research state.",
    metric: "STAGE → POSITION",
    nodes: ["DRIVER", "SUPPLY", "ORDER", "EARNINGS", "POSITION"],
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
      "Self-Driving Portfolio：AI 投研的真正终点",
      "如果量化基金有因子库，主动管理也该有假设库",
      "AI 买方决策的第一道分水岭：谁来验收",
      "AI 投研越多，为什么买方决策反而更难？",
    ],
    notesEn: [
      "Self-Driving Portfolio: The Real Destination of AI Investing",
      "If Quant Funds Have Factor Libraries, Active Managers Need Thesis Libraries",
      "The First Divide in AI Buy-Side Decisions: Who Validates the Output?",
      "Why More AI Research Can Make Buy-Side Decisions Harder",
    ],
    slugs: ["self-driving-portfolio-ai-investing", "active-management-hypothesis-library", "who-validates-ai-output", "more-ai-research-harder-decisions"],
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
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);

  const capability =
    capabilities.find((item) => item.id === activeCapability) ?? capabilities[0];
  const tx = (value: string) => language === "en" ? (en[value] ?? value) : value;
  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("lunartulip-language", nextLanguage);
  };
  const showNextCapability = () => {
    const index = capabilities.findIndex((item) => item.id === activeCapability);
    setActiveCapability(capabilities[(index + 1) % capabilities.length].id);
  };

  useEffect(() => {
    if (initialLanguage === "en") return;
    const savedLanguage = window.localStorage.getItem("lunartulip-language");
    if (savedLanguage === "cn" || savedLanguage === "en") {
      const frame = window.requestAnimationFrame(() => setLanguage(savedLanguage));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [initialLanguage]);

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
          <button type="button" className={language === "cn" ? "active" : ""} onClick={() => selectLanguage("cn")} aria-pressed={language === "cn"}>CN</button>
          <span>/</span>
          <button type="button" className={language === "en" ? "active" : ""} onClick={() => selectLanguage("en")} aria-pressed={language === "en"}>EN</button>
        </div>
        <div className="system-status" aria-label={language === "cn" ? "研究系统运行中" : "Research system active"}>
          <span aria-hidden="true" />
          <b>SYSTEM</b>
          <i>/</i>
          ACTIVE
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
          <p className="eyebrow">CROSS-MARKET PUBLIC EQUITIES · AI TECHNOLOGY</p>
          <h1 id="hero-title">
            {language === "cn" ? (
              <>为主动管理构建<br /><span>AI-native</span> 决策增强系统</>
            ) : (
              <>Build an <span>AI-native</span><br />decision augmentation system<br />for active management</>
            )}
          </h1>
          <p className="hero-description">
            {language === "cn" ? (
              <>
                <span>聚焦全球泛 AI 科技产业链的二级权益研究，跨 A 股、美股与港股追踪技术演进、产业传导与价值兑现。</span>
                <span>为公募、私募、资管机构与专业家族办公室连接研究命题、证据追踪、决策记录与反馈复盘。</span>
              </>
            ) : (
              <>
                <span>Public-equity research across the global AI technology value chain, connecting A-share, U.S. and Hong Kong markets from technical progress to industry transmission and value realization.</span>
                <span>Connecting theses, evidence, decision records and feedback for funds, asset managers and professional family offices.</span>
              </>
            )}
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#products">
              {language === "cn" ? "了解机构产品" : "Explore institutional offers"} <span aria-hidden="true"><ArrowRightIcon /></span>
            </a>
            <Link className="secondary-action" href={language === "en" ? "/en/desk" : "/desk"}>
              {language === "cn" ? "查看 Research Desk" : "View Research Desk"} <span aria-hidden="true"><ArrowUpRightIcon /></span>
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

      <section className="product-section page-section" id="products" aria-labelledby="products-title">
        <div className="section-heading product-heading">
          <div>
            <p className="section-index">INSTITUTIONAL OFFERS / 01</p>
            <h2 id="products-title">
              {language === "cn" ? "先建立系统，再让它持续运行。" : "Install the system. Then keep it operating."}
            </h2>
          </div>
          <p className="section-lead">
            {language === "cn"
              ? "面向公募、私募、资管机构与专业家族办公室。当前可从标准化部署或边界清晰的 Research Desk 试点进入。"
              : "For funds, asset managers and professional family offices—begin with a structured deployment or a bounded Research Desk pilot."}
          </p>
        </div>

        <div className="collaboration-lanes" aria-label={language === "cn" ? "两条机构合作主线" : "Two institutional collaboration lanes"}>
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
              <p className="product-deliverable-label">{language === "cn" ? "完成后得到" : "WHAT THE TEAM LEAVES WITH"}</p>
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
            <span>WORKSHOP</span><i /><b>OPERATING LOOP</b><i /><span>RESEARCH DESK</span>
          </div>
        </div>

        <div className="enterprise-mode">
          <div><small>ENTERPRISE DELIVERY MODE</small><strong>{language === "cn" ? "私有化适配随 Desk 深度进入" : "Private adaptation follows the depth of the Desk engagement"}</strong></div>
          <p>{language === "cn" ? "当试点需要连接机构内部数据、权限、治理、Agent 编排与 Decision Memory 时，再共同定义部署与持续维护边界。" : "When a pilot needs internal data, permissions, governance, agent orchestration and decision memory, deployment and maintenance boundaries are defined together."}</p>
        </div>
      </section>

      <section className="philosophy-section page-section" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-heading">
          <div>
            <p className="section-index">OPERATING PRINCIPLES / 02</p>
            <h2 id="philosophy-title">{tx("把基金经理的判断方式，写进一套会生长的买方系统。")}</h2>
          </div>
          <p className="section-lead">
            {tx("Lunartulip Lab 将信息、假设、证据、动作、仓位、结果与记忆连接起来，让产业判断、量化纪律与 Agent 工作流共同进入持续接受市场反馈的决策系统。")}
          </p>
        </div>

        <div className="principles-grid">
          <article className="principle-card principle-main">
            <p className="card-index">01 / COMPOUND</p>
            <h3>{tx("让每一次研究，都提高下一次研究的起点。")}</h3>
            <div className="compound-diagram" aria-hidden="true">
              <span>{tx("判断")}</span><i>→</i><span>{tx("证据")}</span><i>→</i><span>{tx("系统")}</span><i>↗</i>
            </div>
          </article>
          <article className="principle-card">
            <p className="card-index">02 / HYBRID</p>
            <h3>{tx("人的判断\n× 系统的纪律").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3>
            <p>{tx("保留基金经理对语义、情境与非线性机会的理解，用量化与 Agent 外骨骼减少漏损。")}</p>
          </article>
          <article className="principle-card">
            <p className="card-index">03 / FEEDBACK</p>
            <h3>{tx("真实反馈\n优先于漂亮自动化").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3>
            <p>{tx("系统的价值不由流程图决定，而由它能否接受现实检验、识别偏差并持续更新决定。")}</p>
          </article>
        </div>
      </section>

      <section className="capability-section page-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">SYSTEM CAPABILITIES / 03</p>
            <h2 id="capabilities-title">{language === "cn" ? "五个可见产出，组成一套研究系统。" : "Five visible outputs form one research system."}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "先看完整回路，再按模块查看方法细节。每项能力都对应机构现状、系统动作与可验收产出。" : "See the full loop first, then inspect each method. Every capability maps a current condition to a system action and an observable output."}</p>
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
              <div><small>{language === "cn" ? "机构现状" : "CURRENT CONDITION"}</small><p>{language === "cn" ? capability.situationCn : capability.situationEn}</p></div>
              <div><small>{language === "cn" ? "系统动作" : "SYSTEM ACTION"}</small><p>{language === "cn" ? capability.actionCn : capability.actionEn}</p></div>
              <div><small>{language === "cn" ? "可见产出" : "VISIBLE OUTPUT"}</small><p>{language === "cn" ? capability.resultCn : capability.resultEn}</p></div>
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
            <p className="section-index">DAILY OPERATING LOOP / 04</p>
            <h2 id="workflow-title">{language === "cn" ? "一天的变化，如何变成下一次更好的判断。" : "How daily change improves the next judgment."}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "Research Desk 把市场变化、假设更新、研究优先级、判断记录与结果反馈连接成同一条日常回路。" : "The Research Desk connects market change, thesis updates, research priorities, decision records and outcome feedback in one daily operating loop."}</p>
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
            <p className="section-index">LONG-TERM DIRECTION / 05</p>
            <h2 id="vision-title">{language === "cn" ? <>AI-native Fund<br />长期资管方向</> : <>AI-native Fund<br />Asset-Management Direction</>}</h2>
            <p>
              {language === "cn"
                ? "Lunartulip Lab 正在持续研究 AI-native Fund 的组织与系统原型。主观产业研究、量化策略验证、Research Desk、风险约束与 Decision Memory 在同一套买方基础设施中接受长期反馈，最终投资责任始终由人承担。"
                : "Lunartulip Lab is researching the organizational and system prototype of an AI-native Fund. Discretionary industry research, quantitative validation, the Research Desk, risk constraints and decision memory learn from long-term feedback in one buy-side infrastructure, with final investment accountability remaining human."}
            </p>
            <div className="vision-links">
              <Link href="/notes/self-driving-portfolio-ai-investing">{language === "cn" ? "阅读长期组织形态" : "Read the long-term operating thesis"}<ArrowRightIcon /></Link>
              <Link href="/notes/trading-like-pm-lab-notes">{language === "cn" ? "查看系统生长手记" : "Read the system field notes"}<ArrowRightIcon /></Link>
            </div>
          </div>
          <div className="vision-boundary">
            <article>
              <small>CURRENT / NOW</small>
              <h3>{language === "cn" ? "当前对外合作" : "Current mandate"}</h3>
              <p>{language === "cn" ? "6-Session Research System Workshop、Always-On Research Desk 付费试点，以及随试点深度进入的数据、权限与治理适配。" : "The six-session research-system deployment, paid Always-On Research Desk pilots, and data, permission and governance adaptation as an engagement deepens."}</p>
            </article>
            <article>
              <small>FUTURE / COMPLIANCE-LED</small>
              <h3>{language === "cn" ? "长期资管方向" : "Long-term asset-management direction"}</h3>
              <p>{language === "cn" ? "面向持牌机构、潜在合作主体与产业伙伴讨论研究、技术和组织共建。未来资管业务将在相应主体、资质与合规框架完备后独立开展。" : "Research, technology and organizational partnerships may be discussed with licensed institutions and strategic counterparties. Any future asset-management business will operate through an appropriate entity, qualifications and compliance framework."}</p>
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
            <p className="section-index">SYSTEMS IN PRACTICE / 06</p>
            <h2 id="practice-title">{language === "cn" ? "系统如何进入真实研究" : "How the system works in practice"}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "以下是泛 AI 科技方向的公开方法示范；系统可在机构授权的股票池、数据与研究边界内适配。" : "Public methodology demonstrations across AI technology; the system can be adapted to an institution’s authorized universe, data and research boundaries."}</p>
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
                <a href="#capabilities">{language === "cn" ? "查看方法结构" : "View methodology"}<span><ArrowRightIcon /></span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-section page-section" id="notes" aria-labelledby="notes-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">RESEARCH NOTES / 07</p>
            <h2 id="notes-title">{language === "cn" ? "持续写下正在形成的判断" : "Notes from a research system in motion"}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "从方法论、决策系统到真实建造过程，构成 Lunartulip 的公开研究档案。" : "A public research archive spanning methodology, decision systems and the work of building them."}</p>
        </div>
        <div className="notes-grid">
          {noteColumns.map((column) => (
            <article className="notes-column" key={column.code}>
              <p className="card-index">{column.code}</p>
              <h3>{language === "cn" ? column.title : column.titleEn}</h3>
              <ol>{(language === "cn" ? column.notes : column.notesEn).map((note, index) => <li key={note}><span>0{index + 1}</span><Link href={`/notes/${column.slugs[index]}`}><p>{note}</p></Link><i aria-hidden="true">↗</i></li>)}</ol>
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
        <h2 id="closing-title">{language === "cn" ? "从一个真实问题开始。" : "Start with a real investment question."}</h2>
        <p>{language === "cn" ? "请介绍您的机构、研究场景与希望解决的问题。" : "Tell us about your institution, research context and the problem you want to solve."}</p>
        <div className="engagement-grid">
          {engagementTopics.map((topic, index) => (
            <a key={topic.subject} href={institutionalMailto({ source: "HOME_ENGAGEMENT", topic: topic.subject, language })}>
              <small>0{index + 1}</small>
              <strong>{language === "cn" ? topic.cn : topic.en}</strong>
              <span>{language === "cn" ? topic.detailCn : topic.detailEn}</span>
              <i aria-hidden="true"><ArrowUpRightIcon /></i>
            </a>
          ))}
        </div>
        <a className="contact-email" href={institutionalMailto({ source: "HOME_CONTACT", topic: language === "cn" ? "机构合作咨询" : "Institutional Inquiry", language })}>
          <small>{language === "cn" ? "海内外机构合作与研究交流" : "China & global institutional partnerships"}</small>
          t.stephanie@lunartuliplab.com <span aria-hidden="true"><ArrowUpRightIcon /></span>
        </a>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><BrandMark />LUNARTULIP LAB</a>
          <div className="footer-contact">
            <p><a href={institutionalMailto({ source: "HOME_FOOTER", topic: language === "cn" ? "官网联系" : "Website Contact", language })}>t.stephanie@lunartuliplab.com</a></p>
            <p className="footer-links">
              <Link href={language === "en" ? "/en/about" : "/about"}>{language === "cn" ? "关于我们" : "About"}</Link>
              <Link href={language === "en" ? "/en/workshop" : "/workshop"}>Workshop</Link>
              <Link href={language === "en" ? "/en/desk" : "/desk"}>Research Desk</Link>
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
            ? "官网公开内容用于研究方法与系统能力介绍，不构成投资建议、基金募集、金融产品推介或收益承诺。"
            : "Public content describes research methods and system capabilities. It is not investment advice, fundraising, a financial-product solicitation or a promise of returns."}
        </p>
      </footer>
      <a className={`back-to-top ${hasScrolled ? "is-visible" : ""}`} href="#top" aria-label={language === "cn" ? "返回顶部" : "Back to top"}>
        <span aria-hidden="true"><ArrowRightIcon /></span>
      </a>
    </main>
  );
}
