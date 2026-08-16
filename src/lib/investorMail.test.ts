import { describe, expect, it } from "vitest";
import {
  FOUNDER_EMAIL,
  INVESTOR_SITE,
  LOGO_URL,
  buildAcknowledgement,
  buildInternalNotification,
  escapeHtml,
  greetingName,
  mailMarkupIssues,
  resolveMailLang,
} from "./investorMail";

const FROM_EMAIL = "hello@cardbey.com";
const INVESTOR_EMAIL = "jane.investor@example.com";

function ack(overrides: Record<string, string> = {}) {
  return buildAcknowledgement({
    name: "Jane Investor",
    email: INVESTOR_EMAIL,
    lang: "en",
    fromEmail: FROM_EMAIL,
    replyTo: FOUNDER_EMAIL,
    ...overrides,
  });
}

function forbiddenPitch(blob: string) {
  expect(blob).not.toMatch(/SAFE/i);
  expect(blob).not.toMatch(/post-money/i);
  expect(blob).not.toMatch(/A\$12M|A\$3M|valuation/i);
  expect(blob).not.toMatch(/fundraising/i);
}

describe("investor enquiry mail branding", () => {
  it("uses the production Cardbey logo HTTPS URL", () => {
    expect(LOGO_URL).toBe("https://investors.cardbey.com/cardbey-logo-192.png");
    expect(INVESTOR_SITE).toBe("https://investors.cardbey.com");
    const mail = ack();
    expect(mail.html).toContain(`src="${LOGO_URL}"`);
    expect(mail.html).toContain('alt="Cardbey"');
    expect(mail.html).toContain("width=\"40\"");
    expect(mail.html).toContain("height=\"40\"");
    expect(mail.html).not.toContain("cid:");
    expect(mail.html).not.toMatch(/placeholder|letter C|generated avatar/i);
  });

  it("builds an English acknowledgement with Cardbey Investor styling", () => {
    const mail = ack({ lang: "en" });
    expect(mail.subject).toBe("We received your message — Cardbey");
    expect(mail.from).toBe(`"Cardbey" <${FROM_EMAIL}>`);
    expect(mail.replyTo).toBe(FOUNDER_EMAIL);
    expect(mail.to).toBe(INVESTOR_EMAIL);
    expect(mail.text).toContain("Hello Jane,");
    expect(mail.text).toContain("We've received your message and will respond directly.");
    expect(mail.html).toContain("Thank you for contacting Cardbey");
    expect(mail.html).toContain("INVESTOR");
    expect(mail.html).toContain("#059669");
    expect(mail.html).toContain("#111827");
    expect(mail.html).toContain("max-width:600px");
    expect(mail.html).toContain("SIGNSCATER PTY LTD");
    expect(mail.html).not.toContain("Xin chào");
    expect(mail.html).not.toContain("<script");
    expect(mailMarkupIssues(mail.html, mail.text)).toEqual([]);
    forbiddenPitch(`${mail.subject}\n${mail.text}\n${mail.html}`);
  });

  it("builds a Vietnamese acknowledgement without duplicating English", () => {
    const mail = ack({ lang: "vi", name: "Lan Nguyen" });
    expect(mail.subject).toBe("Cardbey đã nhận được tin nhắn của bạn");
    expect(mail.text).toContain("Xin chào Lan,");
    expect(mail.html).toContain("Cảm ơn bạn đã liên hệ Cardbey");
    expect(mail.html).toContain("NHÀ ĐẦU TƯ");
    expect(mail.text).not.toContain("Hello Lan,");
    expect(mail.html).not.toContain("Thank you for contacting Cardbey");
    expect(mail.replyTo).toBe(FOUNDER_EMAIL);
  });

  it("falls back to bilingual copy when language is unknown", () => {
    const mail = ack({ lang: "" });
    expect(mail.subject).toMatch(/We received your message/);
    expect(mail.subject).toMatch(/Cardbey đã nhận được tin nhắn của bạn/);
    expect(mail.text).toContain("Hello Jane,");
    expect(mail.text).toContain("Xin chào Jane,");
  });

  it("uses the submitted first name and never infers from email", () => {
    expect(greetingName("Jane Investor", "sumsign@example.com")).toBe("Jane");
    expect(greetingName("sumsign", "sumsign@example.com")).toBe("sumsign");
    expect(greetingName("", "sumsign@example.com")).toBe("");
    expect(greetingName("sumsign@example.com", "sumsign@example.com")).toBe("");
    expect(ack({ name: "" }).text).toMatch(/^Hello,/m);
    expect(ack({ lang: "vi", name: "" }).text).toMatch(/^Xin chào,/m);
    expect(ack({ name: "" }).text).not.toContain("sumsign");
    expect(ack({ name: "", email: "sumsign@example.com" }).text).not.toContain("sumsign");
  });

  it("escapes untrusted fields in HTML", () => {
    expect(escapeHtml(`<img src=x onerror=alert(1)>`)).toBe(
      "&lt;img src=x onerror=alert(1)&gt;"
    );
    const mail = ack({
      name: `<script>alert(1)</script> Jane`,
    });
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).not.toContain("<script>alert");
    const internal = buildInternalNotification({
      name: `Eve <b>Admin</b>`,
      email: `eve@example.com`,
      message: `<img src=x onerror=alert(1)>\nSecond line`,
      lang: "en",
      fromEmail: FROM_EMAIL,
      founderEmail: FOUNDER_EMAIL,
    });
    expect(internal.html).toContain("&lt;img src=x");
    expect(internal.html).toContain("Second line");
    expect(internal.html).not.toContain("<img src=x onerror");
  });

  it("sets From and Reply-To correctly for acknowledgement vs internal mail", () => {
    const mail = ack();
    const internal = buildInternalNotification({
      name: "Jane Investor",
      email: INVESTOR_EMAIL,
      message: "Please send the note.",
      lang: "vi",
      fromEmail: FROM_EMAIL,
      founderEmail: FOUNDER_EMAIL,
      receivedAt: new Date("2026-08-16T12:00:00.000Z"),
    });
    expect(mail.from).toContain(FROM_EMAIL);
    expect(mail.from).not.toContain(INVESTOR_EMAIL);
    expect(mail.replyTo).toBe(FOUNDER_EMAIL);
    expect(mail.replyTo).not.toBe(INVESTOR_EMAIL);
    expect(internal.from).toBe(`"Cardbey" <${FROM_EMAIL}>`);
    expect(internal.to).toBe(FOUNDER_EMAIL);
    expect(internal.replyTo).toBe(INVESTOR_EMAIL);
    expect(internal.text).toContain("Language: vi");
    expect(internal.text).toContain("Source: https://investors.cardbey.com/");
    expect(internal.html).toContain("Reply to investor");
    expect(internal.html).toContain(LOGO_URL);
    expect(mailMarkupIssues(internal.html, internal.text)).toEqual([]);
    forbiddenPitch(`${internal.subject}\n${internal.text}\n${internal.html}`);
  });

  it("resolves language conservatively", () => {
    expect(resolveMailLang("en")).toBe("en");
    expect(resolveMailLang("vi")).toBe("vi");
    expect(resolveMailLang("fr")).toBe("");
    expect(resolveMailLang(undefined)).toBe("");
  });

  it("uses table layout and a plain-text alternative", () => {
    const mail = ack();
    expect(mail.html).toContain('role="presentation"');
    expect(mail.html).toContain("viewport");
    expect(mail.text).toContain("Cardbey");
    expect(mail.text).toContain("founder@cardbey.com");
    expect(mail.text).not.toContain("<table");
  });
});
