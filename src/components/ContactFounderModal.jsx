import React from "react";

export const REQUEST_GENERAL = "GENERAL_INVESTOR_ENQUIRY";
export const REQUEST_MATERIALS = "INVESTOR_MATERIALS";

const DICT = {
  en: {
    contact: (name) => `Contact ${name}`,
    emailChip: "Email",
    callChip: "Call",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    requestChip: "Request investor materials",
    requestSub: "Provided following the request",
    materialsPrefill: "I'd like to request Cardbey investor materials.",
    nameLabel: "Full name",
    namePh: "Your name",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Message",
    msgPh: "What would you like to discuss?",
    close: "Close",
    send: "Send message",
    sending: "Sending...",
    receivedTitle: "Message received.",
    receivedBody:
      "Thank you for contacting Cardbey. We'll respond to your enquiry directly.",
    sentErrLead: "We couldn't send your message just now. Please try again, or contact ",
    sentErrTrail: " directly.",
  },
  vi: {
    contact: (name) => `Liên hệ ${name}`,
    emailChip: "Email",
    callChip: "Gọi",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    requestChip: "Yêu cầu tài liệu nhà đầu tư",
    requestSub: "Được cung cấp sau khi có yêu cầu",
    materialsPrefill: "Tôi muốn yêu cầu tài liệu nhà đầu tư Cardbey.",
    nameLabel: "Họ và tên",
    namePh: "Họ và tên",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Lời nhắn",
    msgPh: "Bạn muốn trao đổi điều gì?",
    close: "Đóng",
    send: "Gửi liên hệ",
    sending: "Đang gửi...",
    receivedTitle: "Đã nhận tin nhắn.",
    receivedBody:
      "Cảm ơn bạn đã liên hệ Cardbey. Chúng tôi sẽ phản hồi trực tiếp về nội dung trao đổi.",
    sentErrLead: "Hiện tại chưa thể gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua ",
    sentErrTrail: ".",
  },
};

function focusableIn(root) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
    )
  ).filter((el) => el.offsetParent !== null || el.getClientRects().length);
}

export function resolveContactApiPath(apiBase) {
  const base = String(apiBase || "").replace(/\/$/, "");
  if (!base) return "/api/contact";
  if (base.endsWith("/api")) return `${base}/contact`;
  return `${base}/api/contact`;
}

function logContactIssue(details) {
  if (import.meta.env.DEV) {
    console.warn("[contact]", details);
  }
}

export default function ContactFounderModal({
  open,
  onClose,
  founderName = "Founder",
  email = "info@cardbey.com",
  phone = "+61 451 867 365",
  deckUrl,
  lang = "en",
  apiPath,
  onSubmit,
  text = {},
}) {
  const T0 = DICT[lang] || DICT.en;
  const T = { ...T0, ...text };
  const endpoint =
    apiPath || resolveContactApiPath(import.meta.env.VITE_API_BASE);
  const deckReady = typeof deckUrl === "string" && /^https?:\/\//i.test(deckUrl);

  const dialogRef = React.useRef(null);
  const firstFieldRef = React.useRef(null);
  const messageRef = React.useRef(null);
  const lastFocusRef = React.useRef(null);

  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [requestType, setRequestType] = React.useState(REQUEST_GENERAL);
  const inFlightRef = React.useRef(false);

  React.useEffect(() => {
    if (!open) {
      setSending(false);
      setSent(false);
      setError(false);
      setName("");
      setEmailValue("");
      setMessage("");
      setRequestType(REQUEST_GENERAL);
      return undefined;
    }
    lastFocusRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = focusableIn(dialogRef.current);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      if (lastFocusRef.current instanceof HTMLElement) {
        lastFocusRef.current.focus();
      }
    };
  }, [open, onClose]);

  const requestMaterials = () => {
    setRequestType(REQUEST_MATERIALS);
    setMessage((current) => {
      const trimmed = String(current || "").trim();
      if (!trimmed) return T.materialsPrefill;
      return current;
    });
    window.setTimeout(() => messageRef.current?.focus(), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending || sent || inFlightRef.current) return;
    inFlightRef.current = true;
    setError(false);

    if (e.currentTarget.elements.website?.value) {
      logContactIssue({ event: "honeypot" });
      setError(true);
      inFlightRef.current = false;
      return;
    }

    const payload = {
      name: name.trim(),
      email: emailValue.trim(),
      message: message.trim(),
      requestType,
      lang: lang === "vi" ? "vi" : "en",
    };

    try {
      setSending(true);

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 12000);
        let res;
        try {
          res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              ...payload,
              website: "",
            }),
            signal: controller.signal,
          });
        } finally {
          window.clearTimeout(timer);
        }
        const j = await res.json().catch(() => null);
        if (!res.ok || !j || j.ok !== true) {
          logContactIssue({
            event: "contact_rejected",
            status: res.status,
            endpoint,
          });
          setError(true);
          return;
        }
      }

      setSent(true);
    } catch (err) {
      logContactIssue({
        event: "contact_network",
        endpoint,
        name: err?.name,
      });
      setError(true);
    } finally {
      inFlightRef.current = false;
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="cfm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="cfm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cfm-title"
        ref={dialogRef}
      >
        <button
          className="cfm-close"
          onClick={onClose}
          aria-label={lang === "vi" ? "Đóng" : "Close"}
        >
          ×
        </button>

        <h3 id="cfm-title" className="cfm-title">
          {sent ? T.receivedTitle : T.contact(founderName)}
        </h3>

        {sent ? (
          <div className="cfm-success">
            <p className="cfm-success-body">{T.receivedBody}</p>
            <div className="cfm-actions">
              <button type="button" className="cfm-btn" onClick={onClose}>
                {T.close}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="cfm-quick">
              <a className="cfm-chip" href={`mailto:${email}`} rel="noreferrer">
                📩 {T.emailChip}
                <span className="cfm-sub">{email}</span>
              </a>
              {phone ? (
                <a className="cfm-chip" href={`tel:${phone.replace(/\s+/g, "")}`}>
                  📞 {T.callChip}
                  <span className="cfm-sub">{phone}</span>
                </a>
              ) : null}
              {deckReady ? (
                <a className="cfm-chip" href={deckUrl} target="_blank" rel="noreferrer">
                  📑 {T.deckChip}
                  <span className="cfm-sub">{T.deckSub}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className={`cfm-chip${requestType === REQUEST_MATERIALS ? " is-active" : ""}`}
                  aria-pressed={requestType === REQUEST_MATERIALS}
                  onClick={requestMaterials}
                >
                  📑 {T.requestChip}
                  <span className="cfm-sub">{T.requestSub}</span>
                </button>
              )}
            </div>

            <form className="cfm-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="requestType" value={requestType} />

              <div className="cfm-row">
                <label htmlFor="cfm-name">{T.nameLabel}</label>
                <input
                  id="cfm-name"
                  name="name"
                  type="text"
                  placeholder={T.namePh}
                  ref={firstFieldRef}
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div className="cfm-row">
                <label htmlFor="cfm-email">{T.emailLabel}</label>
                <input
                  id="cfm-email"
                  name="email"
                  type="email"
                  placeholder={T.emailPh}
                  required
                  maxLength={200}
                  autoComplete="email"
                  value={emailValue}
                  onChange={(ev) => setEmailValue(ev.target.value)}
                />
              </div>
              <div className="cfm-row">
                <label htmlFor="cfm-message">{T.msgLabel}</label>
                <textarea
                  id="cfm-message"
                  name="message"
                  rows={4}
                  placeholder={T.msgPh}
                  ref={messageRef}
                  required
                  minLength={2}
                  maxLength={5000}
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                />
              </div>

              {error ? (
                <div className="cfm-alert cfm-alert--error" role="alert">
                  {T.sentErrLead}
                  <a href={`mailto:${email}`}>{email}</a>
                  {T.sentErrTrail}
                </div>
              ) : null}

              <div className="cfm-actions">
                <button type="button" className="cfm-btn cfm-btn--ghost" onClick={onClose}>
                  {T.close}
                </button>
                <button type="submit" className="cfm-btn" disabled={sending}>
                  {sending ? T.sending : T.send}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
