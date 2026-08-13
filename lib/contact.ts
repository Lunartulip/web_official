export const INSTITUTIONAL_EMAIL = "t.stephanie@lunartuliplab.com";

export function institutionalMailto(input: {
  source: string;
  topic: string;
  language?: "cn" | "en";
}): string {
  const source = normalizeTag(input.source);
  const topic = input.topic.trim().slice(0, 160) || "Institutional Inquiry";
  const subject = `[Lunartulip][Website][${source}] ${topic}`;
  const body =
    input.language === "en"
      ? [
          "Hello Lunartulip Lab,",
          "",
          `I am contacting you from the ${source} section of lunartuliplab.com.`,
          "",
          "Organization:",
          "Your role:",
          "Market / company / industry in focus:",
          "Specific research question:",
          "Preferred exchange format:",
          "",
          "Please do not include positions, trading credentials, or other sensitive data in this first email.",
        ].join("\n")
      : [
          "您好，Lunartulip Lab：",
          "",
          `我从 lunartuliplab.com 的 ${source} 入口联系。`,
          "",
          "机构名称：",
          "您的角色：",
          "关注的市场 / 公司 / 产业：",
          "希望讨论的具体研究问题：",
          "偏好的交流方式：",
          "",
          "首次邮件请勿附带持仓、交易凭证或其他敏感数据。",
        ].join("\n");
  return `mailto:${INSTITUTIONAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function normalizeTag(value: string): string {
  const normalized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48);
  return normalized || "GENERAL";
}
