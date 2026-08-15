import nodemailer from "nodemailer";

export const INQUIRY_SOURCE = "institutional_access";

export const INQUIRY_INTENTS = [
  "sample_request",
  "research_access",
  "commissioned_mandate",
  "research_system_diagnostic",
] as const;

export type InquiryIntent = (typeof INQUIRY_INTENTS)[number];
export type InquiryLanguage = "zh" | "en";

export type InstitutionalInquiry = {
  intent: InquiryIntent;
  source: typeof INQUIRY_SOURCE;
  language: InquiryLanguage;
  pagePath: string;
  organization: string;
  role: string;
  name: string;
  email: string;
  researchQuestion: string;
  timeline: string;
};

type ValidationResult =
  | { ok: true; data: InstitutionalInquiry }
  | { ok: false; message: string; status: number };

const FIELD_LIMITS = {
  organization: 160,
  role: 120,
  name: 120,
  email: 254,
  researchQuestion: 3000,
  timeline: 500,
} as const;

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const rateBuckets = new Map<string, number[]>();

export function validateInquiry(input: Record<string, unknown>): ValidationResult {
  if (stringValue(input.companyWebsite)) {
    return { ok: false, message: "Unable to process this request.", status: 400 };
  }

  const source = stringValue(input.source);
  const intent = stringValue(input.intent);
  const language = stringValue(input.language);
  const pagePath = stringValue(input.pagePath);

  if (source !== INQUIRY_SOURCE) {
    return { ok: false, message: "Invalid inquiry source.", status: 400 };
  }
  if (!INQUIRY_INTENTS.includes(intent as InquiryIntent)) {
    return { ok: false, message: "Please select a valid inquiry type.", status: 400 };
  }
  if (language !== "zh" && language !== "en") {
    return { ok: false, message: "Invalid language.", status: 400 };
  }
  if (
    (language === "zh" && pagePath !== "/institutional-access") ||
    (language === "en" && pagePath !== "/en/institutional-access")
  ) {
    return { ok: false, message: "Invalid page path.", status: 400 };
  }

  const fields = {
    organization: stringValue(input.organization),
    role: stringValue(input.role),
    name: stringValue(input.name),
    email: stringValue(input.email),
    researchQuestion: stringValue(input.researchQuestion),
    timeline: stringValue(input.timeline),
  };

  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    const value = fields[field as keyof typeof fields];
    if (!value) {
      return { ok: false, message: `${field} is required.`, status: 400 };
    }
    if (value.length > limit) {
      return { ok: false, message: `${field} exceeds ${limit} characters.`, status: 400 };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { ok: false, message: "Please enter a valid email address.", status: 400 };
  }

  return {
    ok: true,
    data: {
      source: INQUIRY_SOURCE,
      intent: intent as InquiryIntent,
      language,
      pagePath,
      ...fields,
    },
  };
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
    const host = forwardedHost || request.headers.get("host");
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
    const requestUrl = new URL(request.url);
    const protocol = forwardedProto ? `${forwardedProto}:` : requestUrl.protocol;
    return Boolean(host) && originUrl.host === host && originUrl.protocol === protocol;
  } catch {
    return false;
  }
}

export function consumeInquiryRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (rateBuckets.get(key) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    const retryAfter = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000));
    rateBuckets.set(key, recent);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  rateBuckets.set(key, recent);
  if (rateBuckets.size > 2000) {
    for (const [bucketKey, timestamps] of rateBuckets) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_WINDOW_MS)) rateBuckets.delete(bucketKey);
    }
  }
  return { allowed: true, retryAfter: 0 };
}

export async function sendInstitutionalInquiry(inquiry: InstitutionalInquiry): Promise<void> {
  const config = smtpConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
  });

  const subject = `[Lunartulip][${inquiry.source}][${inquiry.intent}] ${inquiry.organization}`;
  const text = [
    "New institutional inquiry",
    "",
    `source: ${inquiry.source}`,
    `intent: ${inquiry.intent}`,
    `language: ${inquiry.language}`,
    `pagePath: ${inquiry.pagePath}`,
    `organization: ${inquiry.organization}`,
    `role: ${inquiry.role}`,
    `name: ${inquiry.name}`,
    `email: ${inquiry.email}`,
    `timeline: ${inquiry.timeline}`,
    "",
    "researchQuestion:",
    inquiry.researchQuestion,
    "",
    "Compliance note: The form does not request positions or trading credentials.",
  ].join("\n");

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: inquiry.email,
    subject,
    text,
  });
}

function smtpConfig() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "SMTP_TO"] as const;
  for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing required SMTP configuration: ${key}`);
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid TCP port.");
  }

  const secureValue = process.env.SMTP_SECURE?.toLowerCase();
  if (secureValue !== "true" && secureValue !== "false") {
    throw new Error("SMTP_SECURE must be true or false.");
  }

  return {
    host: process.env.SMTP_HOST!,
    port,
    secure: secureValue === "true",
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASSWORD!,
    from: process.env.SMTP_FROM!,
    to: process.env.SMTP_TO!,
  };
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
