"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Language = "cn" | "en";

const en: Record<string, string> = {
  "理念": "Philosophy", "能力地图": "Capabilities", "工作流": "Workflow", "产品": "Solutions", "实践": "Practice", "手札": "Notes", "联系": "Contact", "系统实践": "Systems in Practice", "研究手札": "Research Notes",
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
  "LunarTulip Lab 将信息、假设、证据、动作、仓位、结果与记忆连接起来，让产业判断、量化纪律与 Agent 工作流共同进入持续接受市场反馈的决策系统。": "LunarTulip Lab connects information, theses, evidence, actions, positions, outcomes and memory—bringing domain judgment, quantitative discipline and agent workflows into one decision system shaped by market feedback.",
  "让每一次研究，都提高下一次研究的起点。": "Make every research cycle raise the starting point of the next.", "判断": "JUDGMENT", "证据": "EVIDENCE", "系统": "SYSTEM",
  "人的判断\n× 系统的纪律": "Human judgment\n× system discipline", "保留基金经理对语义、情境与非线性机会的理解，用量化与 Agent 外骨骼减少漏损。": "Preserve the PM’s command of context and nonlinear opportunity; use quantitative and agentic scaffolding to reduce leakage.",
  "真实反馈\n优先于漂亮自动化": "Real feedback\nover elegant automation", "系统的价值不由流程图决定，而由它能否接受现实检验、识别偏差并持续更新决定。": "A system earns its value by surviving reality, exposing error and updating—not by looking elegant on a diagram.",
  "一张从研究到决策的能力地图": "A capability map from research to decision", "选择模块，查看它在系统中的输入、输出与核心动作。": "Select a module to inspect its inputs, outputs and core actions.",
  "研究如何穿过系统": "How research moves through the system", "五个阶段不是流水线终点，而是一条带反馈的研究回路。": "Five stages form a feedback-bearing research loop, not a one-way pipeline.",
  "三种交付深度": "Three levels of delivery", "横向建立完整基础，纵向打穿真实场景，最终让系统在机构内部闭环复利。": "Build the full foundation, penetrate a real investment context, then compound the system inside the institution.",
  "把研究做成会生长的系统。": "Build research systems that learn.", "返回信号起点": "Back to signal origin"
};

const navigation = [
  { label: "理念", href: "#philosophy" },
  { label: "能力地图", href: "#capabilities" },
  { label: "工作流", href: "#workflow" },
  { label: "产品", href: "#cases" },
  { label: "实践", href: "#practice" },
  { label: "手札", href: "#notes" },
  { label: "联系", href: "#contact" },
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
      "如果量化基金有因子库，主动管理也该有假设库",
      "AI 买方决策的第一道分水岭：谁来验收",
      "AI 投研越多，为什么买方决策反而更难？",
    ],
    notesEn: [
      "If Quant Funds Have Factor Libraries, Active Managers Need Thesis Libraries",
      "The First Divide in AI Buy-Side Decisions: Who Validates the Output?",
      "Why More AI Research Can Make Buy-Side Decisions Harder",
    ],
    slugs: ["active-management-hypothesis-library", "who-validates-ai-output", "more-ai-research-harder-decisions"],
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
      "Trading like PM：我的 AI-Native Investment Lab 生长手记",
      "从信息焦虑到系统自由：我的 Notion 投研大脑养成记",
      "Claude Code 之后，量化基金的工程护城河正在坍缩",
    ],
    notesEn: [
      "Trading Like a PM: Notes from Building an AI-Native Investment Lab",
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
  },
];

const workflowSteps = [
  {
    step: "01",
    code: "FRAME",
    title: "定义研究问题",
    description: "明确决策对象、时间尺度、已知信息与真正需要被验证的分歧。",
    input: "研究需求 / 组合问题",
    output: "研究任务书 + 成功标准",
  },
  {
    step: "02",
    code: "INGEST",
    title: "建立证据底座",
    description: "解析多模态材料，完成实体、数字、事件与来源的强校准。",
    input: "报告 / 财报 / 数据 / 访谈",
    output: "结构化证据层",
  },
  {
    step: "03",
    code: "MAP",
    title: "构建因果地图",
    description: "从驱动、传导、瓶颈到兑现路径，显式化产业与资产价格的连接。",
    input: "证据层 + 领域知识",
    output: "AlphaMap + 观察节点",
  },
  {
    step: "04",
    code: "DECIDE",
    title: "形成可执行判断",
    description: "比较情景、概率、赔率与风险边界，生成可审阅的决策材料。",
    input: "命题 / 图谱 / 验证结果",
    output: "决策包 + 触发条件",
  },
  {
    step: "05",
    code: "LEARN",
    title: "用反馈更新系统",
    description: "区分判断、执行与外部噪音的贡献，把真实结果转化为新的系统规则。",
    input: "过程记录 + 结果反馈",
    output: "归因报告 + 版本更新",
  },
];

const useCases = [
  {
    id: "institution",
    label: "机构投研升级",
    index: "CASE / 01",
    title: "投研基础系统",
    summary:
      "以标准化 Workshop 为部署方式，覆盖从信息摄入、假设管理和策略逆向工程，到风险闸门、可复用 Skill 与个人 Agent OS 的完整基础链路。",
    tags: ["STANDARD DELIVERY · 6 SESSIONS", "FULL-STACK FOUNDATION", "PERSONAL AGENT OS"],
    outputs: ["Schema、Hypothesis Card 与研究生产链路", "Risk Gate、Skill / SOP 与端到端示范", "个人 Agent OS 与 Decision Memory 蓝图"],
    metric: "HORIZONTAL FOUNDATION",
    center: "RESEARCH OS",
    nodes: ["INFORMATION", "HYPOTHESIS", "SKILL / SOP", "RISK GATE", "MEMORY"],
    logic: "FOUNDATION → REUSE",
  },
  {
    id: "alphamap",
    label: "产业因果研究",
    index: "CASE / 02",
    title: "产业因果研究",
    summary:
      "围绕客户真实行业、股票池与数据边界，通过咨询 Session 建模，并以可本地部署的 AlphaMap 软件承载产业因果链与持续跟踪。",
    tags: ["ALPHAMAP", "CONSULTING SESSIONS", "LOCAL DEPLOYMENT"],
    outputs: ["客户场景下的产业因果模型", "驱动—传导—兑现路径与观察节点", "可本地部署的 AlphaMap 工作台"],
    metric: "VERTICAL PENETRATION",
    center: "ALPHAMAP",
    nodes: ["DRIVER", "TRANSMISSION", "BOTTLENECK", "REALIZATION", "TRACKING"],
    logic: "CAUSE → SIGNAL",
  },
  {
    id: "decision",
    label: "决策系统闭环",
    index: "CASE / 03",
    title: "决策系统闭环",
    summary:
      "以私有 Harness 连接多个研究场景、人员权限、风险边界与决策记忆，让真实反馈持续写回系统，形成可治理、可演化的组织能力。",
    tags: ["PRIVATE HARNESS", "GOVERNANCE", "DECISION MEMORY"],
    outputs: ["跨场景的研究与决策编排", "权限、风险闸门与执行治理", "持续运行的反馈与决策记忆"],
    metric: "CLOSED-LOOP COMPOUNDING",
    center: "HARNESS",
    nodes: ["RESEARCH", "DECISION", "EXECUTION", "FEEDBACK", "MEMORY"],
    logic: "FEEDBACK → UPDATE",
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

export default function Home() {
  const [language, setLanguage] = useState<Language>("cn");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeCase, setActiveCase] = useState(useCases[0].id);

  const capability =
    capabilities.find((item) => item.id === activeCapability) ?? capabilities[0];
  const workflow = workflowSteps[activeWorkflow];
  const useCase = useCases.find((item) => item.id === activeCase) ?? useCases[0];
  const tx = (value: string) => language === "en" ? (en[value] ?? value) : value;
  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("lunartulip-language", nextLanguage);
  };
  const showNextCapability = () => {
    const index = capabilities.findIndex((item) => item.id === activeCapability);
    setActiveCapability(capabilities[(index + 1) % capabilities.length].id);
  };
  const showNextWorkflow = () => setActiveWorkflow((index) => (index + 1) % workflowSteps.length);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("lunartulip-language");
    if (savedLanguage === "cn" || savedLanguage === "en") {
      const frame = window.requestAnimationFrame(() => setLanguage(savedLanguage));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

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
        <a className="brand" href="#top" aria-label="LunarTulip Lab">
          <BrandMark />
          <span>LUNARTULIP LAB</span>
        </a>

        <nav className="desktop-nav" aria-label={language === "cn" ? "页面章节" : "Page sections"}>
          {navigation.map((item) => (
            <a href={item.href} className={activeSection === item.href ? "active" : ""} aria-current={activeSection === item.href ? "location" : undefined} key={item.href}>
              {tx(item.label)}
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
            <span>0{index + 1}</span> {tx(item.label)}
          </a>
        ))}
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">BUILD THE SYSTEM BEHIND CONVICTION.</p>
          <h1 id="hero-title">
            {tx("为主动管理构建")}
            <br />
            <span>AI-native</span> {tx("研究与")}
            <br />
            {tx("决策系统")}
          </h1>
          <p className="hero-description">
            {tx("从研究基础系统、产业因果模型到机构决策闭环，")}
            <br />
            {tx("让每一次判断，都成为下一次决策的系统资产。")}
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#capabilities">
              {tx("探索能力地图")} <span aria-hidden="true"><ArrowRightIcon /></span>
            </a>
            <a className="secondary-action" href="#contact">
              {language === "cn" ? "预约交流" : "Start a conversation"} <span aria-hidden="true"><ArrowUpRightIcon /></span>
            </a>
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
            alt="银色月面新月环抱郁金香的 LunarTulip Lab 标志"
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

      <section className="capability-preview" aria-labelledby="capability-preview-title">
        <div className="preview-intro">
          <p className="section-index">SYSTEM / 02</p>
          <h2 id="capability-preview-title">{tx("从研究命题到反馈闭环")}</h2>
          <span className="blue-rule" />
        </div>
        <a className="preview-link" href="#capabilities" onClick={() => setActiveCapability("thesis")}>
          <span className="mini-signal" aria-hidden="true" />
          <div><code>01 / THESIS ENGINE</code><p>{tx("把模糊判断转化为可验证命题。")}</p></div>
          <ArrowRightIcon />
        </a>
        <a className="preview-link" href="#capabilities" onClick={() => setActiveCapability("evidence")}>
          <span className="mini-graph" aria-hidden="true" />
          <div><code>02 / EVIDENCE GRAPH</code><p>{tx("聚合多源证据，显式化因果链路。")}</p></div>
          <ArrowRightIcon />
        </a>
        <a className="preview-link" href="#capabilities" onClick={() => setActiveCapability("feedback")}>
          <span className="mini-loop" aria-hidden="true"><LoopIcon /></span>
          <div><code>05 / FEEDBACK LOOP</code><p>{tx("评估决策效果，让反馈驱动迭代。")}</p></div>
          <ArrowRightIcon />
        </a>
      </section>

      <section className="philosophy-section page-section" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-heading">
          <div>
            <p className="section-index">PHILOSOPHY / 01</p>
            <h2 id="philosophy-title">{tx("把基金经理的判断方式，写进一套会生长的买方系统。")}</h2>
          </div>
          <p className="section-lead">
            {tx("LunarTulip Lab 将信息、假设、证据、动作、仓位、结果与记忆连接起来，让产业判断、量化纪律与 Agent 工作流共同进入持续接受市场反馈的决策系统。")}
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
            <p className="section-index">CAPABILITY MAP / 02</p>
            <h2 id="capabilities-title">{tx("一张从研究到决策的能力地图")}</h2>
          </div>
          <p className="section-lead">{tx("选择模块，查看它在系统中的输入、输出与核心动作。")}</p>
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
            <p className="detail-short">{tx(capability.short)}</p>
            <p className="detail-description">{tx(capability.description)}</p>
            <div className="io-grid">
              <div><small>INPUT</small><strong>{tx(capability.input)}</strong></div>
              <div><small>OUTPUT</small><strong>{tx(capability.output)}</strong></div>
            </div>
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
            <p className="section-index">WORKFLOW / 03</p>
            <h2 id="workflow-title">{tx("研究如何穿过系统")}</h2>
          </div>
          <p className="section-lead">{tx("五个阶段不是流水线终点，而是一条带反馈的研究回路。")}</p>
        </div>

        <div className="workflow-track" role="tablist" aria-label={language === "cn" ? "工作流阶段" : "Workflow stages"}>
          <span className="track-base" aria-hidden="true"><i style={{ width: `${(activeWorkflow / (workflowSteps.length - 1)) * 100}%` }} /></span>
          {workflowSteps.map((item, index) => (
            <button
              key={item.step}
              type="button"
              role="tab"
              aria-selected={activeWorkflow === index}
              className={activeWorkflow === index ? "active" : activeWorkflow > index ? "complete" : ""}
              onClick={() => setActiveWorkflow(index)}
            >
              <span>{item.step}</span>
              <small>{item.code}</small>
            </button>
          ))}
        </div>

        <div className="workflow-detail" role="tabpanel" key={workflow.step}>
          <div className="workflow-number">{workflow.step}</div>
          <div className="workflow-copy">
            <p>{workflow.code} / ACTIVE STAGE</p>
            <h3>{tx(workflow.title)}</h3>
            <span>{tx(workflow.description)}</span>
          </div>
          <div className="workflow-io">
            <div><small>INPUT SIGNAL</small><strong>{tx(workflow.input)}</strong></div>
            <b aria-hidden="true"><ArrowRightIcon /></b>
            <div><small>SYSTEM OUTPUT</small><strong>{tx(workflow.output)}</strong></div>
            <button className="next-control workflow-next" type="button" onClick={showNextWorkflow}>
              <span>{language === "cn" ? "下一阶段" : "Next stage"}</span><b aria-hidden="true"><ArrowRightIcon /></b>
            </button>
          </div>
        </div>
      </section>

      <section className="cases-section page-section" id="cases" aria-labelledby="cases-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">PRODUCT LEVELS / 04</p>
            <h2 id="cases-title">{tx("三种交付深度")}</h2>
          </div>
          <p className="section-lead">{tx("横向建立完整基础，纵向打穿真实场景，最终让系统在机构内部闭环复利。")}</p>
        </div>

        <div className="case-tabs" role="tablist" aria-label={language === "cn" ? "产品层级" : "Solution levels"}>
          {useCases.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCase === item.id}
              className={activeCase === item.id ? "active" : ""}
              onClick={() => setActiveCase(item.id)}
              key={item.id}
            >
              <span>{item.index.slice(-2)}</span>{tx(item.label)}
            </button>
          ))}
        </div>

        <article className="case-detail" role="tabpanel" key={useCase.id}>
          <div className="case-copy">
            <p className="case-index">{useCase.index}</p>
            <h3>{tx(useCase.title)}</h3>
            <p className="case-summary">{tx(useCase.summary)}</p>
            <div className="case-tags">{useCase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <ul>{useCase.outputs.map((item) => <li key={item}>{tx(item)}</li>)}</ul>
          </div>
          <div className="case-instrument" aria-label={`${useCase.metric} 模块示意`}>
            <div className="instrument-header"><span>{useCase.metric}</span><small>LIVE MODEL / 01</small></div>
            <div className="instrument-field">
              <div className="semantic-map" aria-label={`${useCase.center} 系统结构`}>
                {useCase.nodes.map((node, index) => (
                  <span className={`semantic-node semantic-node-${index + 1}`} key={node}>{node}</span>
                ))}
                <span className="semantic-line semantic-line-1" />
                <span className="semantic-line semantic-line-2" />
                <span className="semantic-line semantic-line-3" />
                <span className="semantic-line semantic-line-4" />
                <span className="semantic-line semantic-line-5" />
                <strong className="semantic-core">{useCase.center}</strong>
              </div>
              <div className="signal-readout"><small>SYSTEM LOGIC</small><strong>{useCase.logic}</strong></div>
            </div>
            <div className="instrument-footer"><span>{useCase.nodes[0]}</span><i /><span>{useCase.center}</span><i /><span>{useCase.nodes[4]}</span></div>
          </div>
        </article>
      </section>

      <section className="practice-section page-section" id="practice" aria-labelledby="practice-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">SYSTEMS IN PRACTICE / 05</p>
            <h2 id="practice-title">{language === "cn" ? "系统如何进入真实研究" : "How the system works in practice"}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "公开方法与结构，保留客户数据、策略参数和内部决策记忆。" : "Showing the method and structure while protecting client data, strategy parameters and private decision memory."}</p>
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
                <a href="#cases">{language === "cn" ? "查看方法结构" : "View methodology"}<span><ArrowRightIcon /></span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-section page-section" id="notes" aria-labelledby="notes-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">RESEARCH NOTES / 06</p>
            <h2 id="notes-title">{language === "cn" ? "持续写下正在形成的判断" : "Notes from a research system in motion"}</h2>
          </div>
          <p className="section-lead">{language === "cn" ? "从方法论、决策系统到真实建造过程，构成 LunarTulip 的公开研究档案。" : "A public research archive spanning methodology, decision systems and the work of building them."}</p>
        </div>
        <div className="notes-grid">
          {noteColumns.map((column) => (
            <article className="notes-column" key={column.code}>
              <p className="card-index">{column.code}</p>
              <h3>{language === "cn" ? column.title : column.titleEn}</h3>
              <ol>{(language === "cn" ? column.notes : column.notesEn).map((note, index) => <li key={note}><span>0{index + 1}</span><Link href={`/notes/${column.slugs[index]}`}><p>{note}</p></Link><i aria-hidden="true">↗</i></li>)}</ol>
              <a className="notes-contact" href={`mailto:t.stephanie@lunartuliplab.com?subject=${encodeURIComponent(`[LunarTulip] ${language === "cn" ? column.title : column.titleEn}`)}`}>
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
        <p className="section-index">LUNARTULIP LAB / ACTIVE RESEARCH SYSTEMS</p>
        <h2 id="closing-title">{tx("把研究做成会生长的系统。")}</h2>
        <p>Build the system behind conviction.</p>
        <a className="contact-email" href="mailto:t.stephanie@lunartuliplab.com">
          <small>{language === "cn" ? "机构合作与研究交流" : "Institutional partnerships & research"}</small>
          t.stephanie@lunartuliplab.com <span aria-hidden="true"><ArrowUpRightIcon /></span>
        </a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><BrandMark />LUNARTULIP LAB</a>
        <p><a href="mailto:t.stephanie@lunartuliplab.com">t.stephanie@lunartuliplab.com</a></p>
        <p>© 2026 LUNARTULIP LAB</p>
      </footer>
      <a className={`back-to-top ${hasScrolled ? "is-visible" : ""}`} href="#top" aria-label={language === "cn" ? "返回顶部" : "Back to top"}>
        <span aria-hidden="true"><ArrowRightIcon /></span>
      </a>
    </main>
  );
}
