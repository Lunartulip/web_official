export const alphaMapWhitepapers = [
  {
    number: "000",
    slug: "finllm-kg-to-tradable-quant-factors-000",
    publishedAt: "2026-10-31",
    title: "从基本面判断到量化策略：金融知识图谱如何进入科技股投资",
    subtitle: "AlphaMap 白皮书先导篇｜面向全球科技股趋势成长与轮动的中低频策略研究",
    description:
      "AlphaMap 白皮书 #000 从金融知识图谱的经济语义、时间与状态迁移出发，讨论如何将 FinLLM-KG 转化为面向全球科技股趋势成长与轮动的可交易中低频量化因子。",
  },
] as const;

export type AlphaMapWhitepaper = (typeof alphaMapWhitepapers)[number];
