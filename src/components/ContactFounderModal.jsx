import React from "react";

const DICT = {
  en: {
    contact: (name) => `Contact ${name}`,
    emailChip: "Email",
    callChip: "Call",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    nameLabel: "Full name",
    namePh: "John Smith",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Message",
    msgPh: "Hello...",
    close: "Close",
    send: "Send message",
    sending: "Sending...",
    sentOk: "Sent! Thank you.",
    sentErr: "Could not send message",
  },
  vi: {
    contact: (name) => `Liên hệ ${name}`,
    emailChip: "Email",
    callChip: "Gọi",
    deckChip: "Investor Deck",
    deckSub: "PDF",
    nameLabel: "Họ & tên",
    namePh: "Nguyễn Văn A",
    emailLabel: "Email",
    emailPh: "you@company.com",
    msgLabel: "Lời nhắn",
    msgPh: "Xin chào...",
    close: "Đóng",
    send: "Gửi liên hệ",
    sending: "Đang gửi...",
    sentOk: "Đã gửi! Cảm ơn bạn.",
    sentErr: "Không thể gửi tin nhắn",
  },
};

export default function ContactFounderModal({
  open,
  onClose,
  founderName = "Founder",
  email = "info@cardbey.com",     // shown in quick chips only
  phone = "+61 451 867 365",
  deckUrl = "/deck.pdf",
  lang = "en",
  apiPath = "/api/contact",       // 👈 your backend endpoint
  onSubmit,                       // optional override; if not provided we POST to apiPath
  text = {},                      // optional per-key overrides
}) {
  const T0 = DICT[lang] || DICT.en;
  const T = { ...T0, ...text };

  const dialogRef = React.useRef(null);
  const firstFieldRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 0);
  }, [open]);

  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries());

    // simple honeypot check
    if (values.website) {
      setError(T.sentErr);
      return;
    }

    try {
      setSending(true);

      if (onSubmit) {
        await onSubmit(values);
      } else {
        const res = await fetch(apiPath, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message,
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || T.sentErr);
        }
      }

      setSent(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(String(err?.message || T.sentErr));
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="cfm-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        className="cfm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cfm-title"
        ref={dialogRef}
      >
        <button className="cfm-close" onClick={onClose} aria-label="Close">×</button>

        <h3 id="cfm-title" className="cfm-title">{T.contact(founderName)}</h3>

        <div className="cfm-quick">
          <a className="cfm-chip" href={`mailto:${email}`} target="_blank" rel="noreferrer">
            📩 {T.emailChip}
            <span className="cfm-sub">{email}</span>
          </a>
          <a className="cfm-chip" href={`tel:${phone.replace(/\s+/g, "")}`}>
            📞 {T.callChip}
            <span className="cfm-sub">{phone}</span>
          </a>
          <a className="cfm-chip" href={deckUrl} target="_blank" rel="noreferrer">
            📑 {T.deckChip}
            <span className="cfm-sub">{T.deckSub}</span>
          </a>
        </div>

        <form className="cfm-form" onSubmit={handleSubmit}>
          {/* Honeypot (hidden) */}
          <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div className="cfm-row">
            <label htmlFor="cfm-name">{T.nameLabel}</label>
            <input
              id="cfm-name"
              name="name"
              type="text"
              placeholder={T.namePh}
              ref={firstFieldRef}
              required
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
            />
          </div>
          <div className="cfm-row">
            <label htmlFor="cfm-message">{T.msgLabel}</label>
            <textarea
              id="cfm-message"
              name="message"
              rows={4}
              placeholder={T.msgPh}
            />
          </div>

          {error && <div className="cfm-alert cfm-alert--error">{error}</div>}
          {sent && <div className="cfm-alert cfm-alert--ok">{T.sentOk}</div>}

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
