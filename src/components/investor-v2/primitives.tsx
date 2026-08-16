import React from "react";
import type { LocaleCode, LocalizedString, SectionId } from "@/content/investor";
import { t } from "@/content/investor";

export function InvestorPageShell({
  children,
  theme = "v2",
}: {
  children: React.ReactNode;
  theme?: "v2" | "v3";
}) {
  return (
    <div className={theme === "v3" ? "iv2-shell iv3-theme" : "iv2-shell"}>
      {children}
    </div>
  );
}

export function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="iv2-eyebrow">{children}</p>;
}

export function SectionHeading({
  children,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return <Tag className="iv2-heading">{children}</Tag>;
}

export function SectionIntroduction({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="iv2-intro">{children}</p>;
}

export function InvestorSection({
  id,
  eyebrow,
  title,
  introduction,
  locale,
  tier = "investor",
  children,
  className = "",
  sectionIndex,
}: {
  id: SectionId;
  eyebrow?: LocalizedString;
  title: LocalizedString;
  introduction?: LocalizedString;
  locale: LocaleCode;
  tier?: "core" | "supporting" | "investor";
  children?: React.ReactNode;
  className?: string;
  sectionIndex?: string;
}) {
  const headingId = `${id}-heading`;
  const eyebrowText = eyebrow ? t(eyebrow, locale) : "";
  const indexedEyebrow =
    sectionIndex && eyebrowText
      ? `${sectionIndex} — ${eyebrowText}`
      : sectionIndex || eyebrowText;

  return (
    <section
      id={id}
      className={`iv2-section iv2-tier-${tier} ${id === "hero" ? "iv2-hero" : ""} ${className}`.trim()}
      aria-labelledby={headingId}
      data-tier={tier}
      data-section={id}
    >
      <div className="iv2-container">
        {indexedEyebrow ? <SectionEyebrow>{indexedEyebrow}</SectionEyebrow> : null}
        {id === "hero" ? (
          <p className="iv2-brand-hero">Cardbey</p>
        ) : null}
        <SectionHeading as={id === "hero" ? "h1" : "h2"}>
          <span id={headingId}>{t(title, locale)}</span>
        </SectionHeading>
        {introduction ? (
          <SectionIntroduction>{t(introduction, locale)}</SectionIntroduction>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Disclosure({
  text,
  locale,
}: {
  text?: LocalizedString;
  locale: LocaleCode;
}) {
  if (!text) return null;
  return <p className="iv2-disclosure">{t(text, locale)}</p>;
}

export function SourceReference({
  label,
}: {
  label: string;
}) {
  return <p className="iv2-disclosure">{label}</p>;
}

export function InvestorCTA({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  type?: "button" | "submit";
}) {
  const className = `iv2-btn iv2-btn-${variant}`;
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export function FounderContactCTA({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <InvestorCTA variant="primary" onClick={onClick}>
      {label}
    </InvestorCTA>
  );
}

export function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: LocaleCode;
  onChange: (locale: LocaleCode) => void;
}) {
  return (
    <div className="iv2-lang" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        onClick={() => onChange("en")}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "vi"}
        aria-label="Tiếng Việt"
        onClick={() => onChange("vi")}
      >
        VI
      </button>
    </div>
  );
}
