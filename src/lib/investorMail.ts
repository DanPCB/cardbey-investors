export const INVESTOR_SITE = "https://investors.cardbey.com";
export const LOGO_URL = `${INVESTOR_SITE}/cardbey-logo-192.png`;
export const FOUNDER_EMAIL = "founder@cardbey.com";
export const COMPANY_LINE = "SIGNSCATER PTY LTD";
export const COMPANY_IDS = "ABN 50 685 406 697 · ACN 685 406 697";

const COLORS = {
  page: "#f7f8fa",
  card: "#ffffff",
  text: "#111827",
  secondary: "#374151",
  muted: "#6b7280",
  border: "#e5e7eb",
  accent: "#059669",
  panel: "#f0fdf4",
};

export function escapeHtml(value: string): string {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function greetingName(fullName: string, email?: string): string {
  const cleaned = String(fullName || "").replace(/[\r\n\t]+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned.includes("@")) return "";
  if (email && cleaned.toLowerCase() === String(email).trim().toLowerCase()) return "";
  const first = cleaned.split(/\s+/).filter(Boolean)[0] || "";
  if (first.length < 2) return "";
  return first;
}

export function resolveMailLang(raw: string | undefined): "en" | "vi" | "" {
  const value = String(raw || "").toLowerCase();
  if (value === "vi") return "vi";
  if (value === "en") return "en";
  return "";
}

function greetingLine(lang: "en" | "vi", name: string, email?: string): string {
  const first = greetingName(name, email);
  if (lang === "vi") return first ? `Xin chào ${first},` : "Xin chào,";
  return first ? `Hello ${first},` : "Hello,";
}

const COPY = {
  en: {
    subject: "We received your message — Cardbey",
    heading: "Thank you for contacting Cardbey",
    body: "We've received your message and will respond directly.",
    materialsBody:
      "We've received your request for Cardbey investor materials and will follow up directly.",
    panel: "Your enquiry has been received.",
    investor: "INVESTOR",
    relations: "Investor Relations",
    confirm: "This message confirms receipt of your enquiry.",
  },
  vi: {
    subject: "Cardbey đã nhận được tin nhắn của bạn",
    heading: "Cảm ơn bạn đã liên hệ Cardbey",
    body: "Cardbey đã nhận được tin nhắn của bạn và sẽ phản hồi trực tiếp.",
    materialsBody:
      "Cardbey đã nhận yêu cầu tài liệu nhà đầu tư và sẽ phản hồi trực tiếp.",
    panel: "Yêu cầu của bạn đã được ghi nhận.",
    investor: "NHÀ ĐẦU TƯ",
    relations: "Quan hệ nhà đầu tư",
    confirm: "Thư này xác nhận Cardbey đã nhận được liên hệ của bạn.",
  },
};

function wrapEmail(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cardbey</title>
<style type="text/css">
@media only screen and (max-width: 620px) {
  .email-shell { width: 100% !important; max-width: 100% !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.page};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.page};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" class="email-shell" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:${COLORS.card};border:1px solid ${COLORS.border};">
          ${inner}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function brandHeaderHtml(lang: "en" | "vi" = "en"): string {
  const sub = lang === "vi" ? COPY.vi.investor : COPY.en.investor;
  return `
          <tr>
            <td style="padding:24px 20px 16px 20px;border-bottom:1px solid ${COLORS.border};">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${LOGO_URL}" width="40" height="40" alt="Cardbey" style="display:block;width:40px;height:40px;border:0;outline:none;">
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.2;color:${COLORS.text};font-weight:700;">Cardbey</div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;color:${COLORS.accent};font-weight:700;padding-top:4px;">${escapeHtml(sub)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function footerHtml(lang: "en" | "vi", options: { confirm?: boolean } = {}): string {
  const copy = COPY[lang];
  const confirmBlock =
    options.confirm === false
      ? ""
      : `<br><br>${escapeHtml(copy.confirm)}`;
  return `
          <tr>
            <td style="padding:24px 20px 28px 20px;border-top:1px solid ${COLORS.border};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${COLORS.text};font-weight:700;">Cardbey</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${COLORS.secondary};">${escapeHtml(copy.relations)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;padding-top:10px;">
                <a href="${INVESTOR_SITE}/" style="color:${COLORS.accent};text-decoration:none;">investors.cardbey.com</a><br>
                <a href="mailto:${FOUNDER_EMAIL}" style="color:${COLORS.accent};text-decoration:none;">${FOUNDER_EMAIL}</a>
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.muted};padding-top:16px;">
                ${COMPANY_LINE}<br>${COMPANY_IDS}${confirmBlock}
              </div>
            </td>
          </tr>`;
}

export function buildAcknowledgement(input: {
  name: string;
  email: string;
  lang?: string;
  requestType?: string;
  fromEmail: string;
  replyTo: string;
}): {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
} {
  const lang = resolveMailLang(input.lang) || "en";
  const bilingual = !resolveMailLang(input.lang);
  const copy = COPY[lang];
  const materials = input.requestType === "INVESTOR_MATERIALS";
  const bodyText = materials ? copy.materialsBody : copy.body;
  const greet = greetingLine(lang, input.name, input.email);
  const heading = copy.heading;

  const enGreet = greetingLine("en", input.name, input.email);
  const viGreet = greetingLine("vi", input.name, input.email);
  const enBody = materials ? COPY.en.materialsBody : COPY.en.body;
  const viBody = materials ? COPY.vi.materialsBody : COPY.vi.body;

  let text: string;
  let htmlInner: string;
  let subject: string;

  if (bilingual) {
    subject = `${COPY.en.subject} / ${COPY.vi.subject}`;
    text = [
      enGreet,
      "",
      COPY.en.heading,
      enBody,
      "",
      viGreet,
      COPY.vi.heading,
      viBody,
      "",
      "Cardbey",
      COPY.en.relations,
      `${INVESTOR_SITE}/`,
      input.replyTo,
      "",
      COMPANY_LINE,
      COMPANY_IDS,
      COPY.en.confirm,
    ].join("\n");
    htmlInner = `${brandHeaderHtml("en")}
          <tr>
            <td style="padding:28px 20px 8px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;color:${COLORS.text};font-weight:700;">${escapeHtml(COPY.en.heading)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:16px;">${escapeHtml(enGreet)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:8px;">${escapeHtml(enBody)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:20px;">${escapeHtml(viGreet)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:8px;">${escapeHtml(viBody)}</div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
                <tr>
                  <td style="background-color:${COLORS.panel};border:1px solid #a7f3d0;padding:12px 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.text};">
                    ${escapeHtml(COPY.en.panel)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${footerHtml("en")}`;
  } else {
    subject = copy.subject;
    text = [
      greet,
      "",
      heading,
      bodyText,
      "",
      copy.panel,
      "",
      "Cardbey",
      copy.relations,
      `${INVESTOR_SITE}/`,
      input.replyTo,
      "",
      COMPANY_LINE,
      COMPANY_IDS,
      copy.confirm,
    ].join("\n");
    htmlInner = `${brandHeaderHtml(lang)}
          <tr>
            <td style="padding:28px 20px 8px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;color:${COLORS.text};font-weight:700;">${escapeHtml(heading)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:16px;">${escapeHtml(greet)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.secondary};padding-top:8px;">${escapeHtml(bodyText)}</div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
                <tr>
                  <td style="background-color:${COLORS.panel};border:1px solid #a7f3d0;padding:12px 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.text};">
                    ${escapeHtml(copy.panel)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${footerHtml(lang)}`;
  }

  return {
    from: `"Cardbey" <${input.fromEmail}>`,
    to: input.email,
    replyTo: input.replyTo,
    subject,
    text,
    html: wrapEmail(htmlInner),
  };
}

export function buildInternalNotification(input: {
  name: string;
  email: string;
  message: string;
  lang?: string;
  requestType?: string;
  receivedAt?: Date;
  fromEmail: string;
  founderEmail: string;
}): {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
} {
  const received = (input.receivedAt || new Date()).toISOString();
  const langLabel = resolveMailLang(input.lang) || "unspecified";
  const requestType = input.requestType || "GENERAL_INVESTOR_ENQUIRY";
  const kind =
    requestType === "INVESTOR_MATERIALS" ? "Investor materials request" : "Investor enquiry";
  const safeMsg = escapeHtml(input.message).replace(/\n/g, "<br>");
  const displayName = String(input.name || "").replace(/[\r\n]+/g, " ").trim() || "investor";
  const subject = `[${requestType}] ${kind} from ${displayName}`;

  const text = [
    "CARDBEY INVESTOR ENQUIRY",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Language: ${langLabel}`,
    `Request type: ${requestType}`,
    `Source: ${INVESTOR_SITE}/`,
    `Received: ${received}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = wrapEmail(`${brandHeaderHtml("en")}
          <tr>
            <td style="padding:28px 20px 8px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.3;color:${COLORS.text};font-weight:700;">CARDBEY INVESTOR ENQUIRY</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${COLORS.secondary};padding-top:16px;">
                <strong style="color:${COLORS.text};">Name:</strong> ${escapeHtml(input.name)}<br>
                <strong style="color:${COLORS.text};">Email:</strong> ${escapeHtml(input.email)}<br>
                <strong style="color:${COLORS.text};">Language:</strong> ${escapeHtml(langLabel)}<br>
                <strong style="color:${COLORS.text};">Request type:</strong> ${escapeHtml(requestType)}<br>
                <strong style="color:${COLORS.text};">Source:</strong> <a href="${INVESTOR_SITE}/" style="color:${COLORS.accent};text-decoration:none;">investors.cardbey.com</a><br>
                <strong style="color:${COLORS.text};">Received:</strong> ${escapeHtml(received)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${COLORS.text};padding-top:16px;"><strong>Message</strong></div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${COLORS.secondary};padding:12px 14px;margin-top:8px;background:${COLORS.page};border:1px solid ${COLORS.border};">${safeMsg}</div>
              <div style="padding-top:18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
                <a href="mailto:${escapeHtml(input.email)}" style="color:${COLORS.accent};text-decoration:none;">Reply to investor</a>
              </div>
            </td>
          </tr>
          ${footerHtml("en", { confirm: false })}`);

  return {
    from: `"Cardbey" <${input.fromEmail}>`,
    to: input.founderEmail,
    replyTo: input.email,
    subject,
    text,
    html,
  };
}

const UNSAFE_MAIL_RE = [
  /localhost/i,
  /127\.0\.0\.1/,
  /onrender\.com/i,
  /data:image/i,
  /file:\/\//i,
];

export function mailMarkupIssues(html: string, text = ""): string[] {
  const blob = `${html}\n${text}`;
  return UNSAFE_MAIL_RE.filter((pattern) => pattern.test(blob)).map((pattern) =>
    String(pattern)
  );
}
