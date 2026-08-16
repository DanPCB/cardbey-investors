import React from "react";

const DICT = {
  en: {
    contact: (name) => `Contact ${name}`,
    emailChip: "Email",
    callChip: "Call",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    requestChip: "Request investor materials",
    requestSub: "Provided following the request",
    nameLabel: "Full name",
    namePh: "Your name",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Message",
    msgPh: "What would you like to discuss?",
    close: "Close",
    send: "Send message",
    sending: "Sending...",
    sentOk: "Sent. Thank you.",
    sentErr: "Could not send the message",
    sentErrHint: (addr) => `Please email ${addr} directly.`,
  },
  vi: {
    contact: (name) => `Liên hệ ${name}`,
    emailChip: "Email",
    callChip: "Gọi",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    requestChip: "Yêu cầu tài liệu nhà đầu tư",
    requestSub: "Được cung cấp sau khi có yêu cầu",
    nameLabel: "Họ và tên",
    namePh: "Họ và tên",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Lời nhắn",
    msgPh: "Bạn muốn trao đổi điều gì?",
    close: "Đóng",
    send: "Gửi liên hệ",
    sending: "Đang gửi...",
    sentOk: "Đã gửi. Cảm ơn bạn.",
    sentErr: "Không thể gửi tin nhắn",
    sentErrHint: (addr) => `Vui lòng gửi email trực tiếp tới ${addr}.`,
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

  React.useEffect(() => {
    if (!open) return undefined;
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

  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  const failMessage = () =>
    `${T.sentErr}. ${typeof T.sentErrHint === "function" ? T.sentErrHint(email) : ""}`.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSent(false);

    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries());

    if (values.website) {
      setError(failMessage());
      return;
    }

    try {
      setSending(true);

      if (onSubmit) {
        await onSubmit(values);
      } else {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 12000);
        let res;
        try {
          res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              message: values.message,
            }),
            signal: controller.signal,
          });
        } finally {
          window.clearTimeout(timer);
        }
        const j = await res.json().catch(() => null);
        if (!res.ok || !j || j.ok !== true) {
          throw new Error(j?.error || failMessage());
        }
      }

      setSent(true);
      e.currentTarget.reset();
    } catch (err) {
      const body = [
        `Name: ${values.name || ""}`,
        `Email: ${values.email || ""}`,
        "",
        String(values.message || ""),
      ].join("\n");
      const mailto = `mailto:${email}?subject=${encodeURIComponent(
        "Cardbey investor inquiry"
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setError(String(err?.message || failMessage()));
    } finally {
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
          {T.contact(founderName)}
        </h3>

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
              className="cfm-chip"
              onClick={() => messageRef.current?.focus()}
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
            />
          </div>

          {error ? <div className="cfm-alert cfm-alert--error">{error}</div> : null}
          {sent ? <div className="cfm-alert cfm-alert--ok">{T.sentOk}</div> : null}

          <div className="cfm-actions">
            <button type="button" className="cfm-btn cfm-btn--ghost" onClick={onClose}>
              {T.close}
            </button>
            <button type="submit" className="cfm-btn" disabled={sending}>
              {sending ? T.sending : T.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
