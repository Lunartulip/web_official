import { NextResponse } from "next/server";
import { INSTITUTIONAL_EMAIL } from "@/lib/contact";
import {
  consumeInquiryRateLimit,
  isSameOrigin,
  sendInstitutionalInquiry,
  validateInquiry,
} from "@/lib/institutional-inquiry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const wantsJson = request.headers.get("content-type")?.includes("application/json") ?? false;
  const language = request.headers.get("accept-language")?.toLowerCase().startsWith("zh") ? "zh" : "en";

  if (!isSameOrigin(request)) {
    return response(wantsJson, 403, "Request origin was rejected.", language);
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const rateLimit = consumeInquiryRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return response(wantsJson, 429, "Too many requests. Please try again later.", language, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  let input: Record<string, unknown>;
  try {
    if (wantsJson) {
      input = (await request.json()) as Record<string, unknown>;
    } else {
      const formData = await request.formData();
      input = Object.fromEntries(formData.entries());
    }
  } catch {
    return response(wantsJson, 400, "Unable to read the submitted form.", language);
  }

  const validation = validateInquiry(input);
  const responseLanguage = input.language === "zh" ? "zh" : "en";
  if (!validation.ok) {
    return response(wantsJson, validation.status, validation.message, responseLanguage);
  }

  try {
    await sendInstitutionalInquiry(validation.data);
    const message =
      responseLanguage === "zh"
        ? "询盘已发送。我们会通过您填写的邮箱回复。"
        : "Your inquiry has been sent. We will reply to the email address provided.";
    return response(wantsJson, 200, message, responseLanguage);
  } catch (error) {
    console.error("Institutional inquiry delivery failed.", error);
    const message =
      responseLanguage === "zh"
        ? `暂时无法发送。请稍后重试，或直接发送邮件至 ${INSTITUTIONAL_EMAIL}。`
        : `Delivery is temporarily unavailable. Please try again or email ${INSTITUTIONAL_EMAIL}.`;
    return response(wantsJson, 503, message, responseLanguage);
  }
}

function response(
  wantsJson: boolean,
  status: number,
  message: string,
  language: "zh" | "en",
  headers: HeadersInit = {},
) {
  if (wantsJson) {
    return NextResponse.json({ ok: status >= 200 && status < 300, message }, { status, headers });
  }

  const title =
    status >= 200 && status < 300
      ? language === "zh"
        ? "询盘已提交"
        : "Inquiry submitted"
      : language === "zh"
        ? "未能提交询盘"
        : "Inquiry not submitted";
  const returnPath = language === "zh" ? "/institutional-access" : "/en/institutional-access";
  const safeMessage = escapeHtml(message);
  const html = `<!doctype html>
<html lang="${language === "zh" ? "zh-CN" : "en"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{margin:0;background:#080b0f;color:#dce2e8;font:16px/1.7 system-ui,sans-serif}main{max-width:680px;margin:12vh auto;padding:40px;border:1px solid #34404b;background:#10151b}h1{font-weight:500}a{color:#b9d8ed}p{color:#aeb8c2}</style></head>
<body><main><h1>${title}</h1><p>${safeMessage}</p><p><a href="${returnPath}">${language === "zh" ? "返回机构入口" : "Return to Institutional Access"}</a> · <a href="mailto:${INSTITUTIONAL_EMAIL}">${language === "zh" ? "直接发送邮件" : "Email directly"}</a></p></main></body>
</html>`;
  return new NextResponse(html, {
    status,
    headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
