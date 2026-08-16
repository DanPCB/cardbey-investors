import { useState } from "react";
import { Link } from "react-router-dom";
import type { LocaleCode, SectionContent } from "@/content/investor";
import { t } from "@/content/investor";
import { LanguageSwitcher } from "./primitives";

const NAV_SECTION_IDS_V2 = [
  "answer",
  "what-built",
  "architecture",
  "traction",
  "resources",
  "contact",
] as const;

export const NAV_SECTION_IDS_V3 = [
  "paradox",
  "missing-layer",
  "start-one",
  "commercial-validation",
  "expansion",
  "growth-capital",
  "qa",
  "resources",
] as const;

export function InvestorHeader({
  locale,
  onLocaleChange,
  sections,
  onContact,
  onNavigateSection,
  brandTo = "/investors-v2",
  navSectionIds,
  legacyLabel,
  navVariant = "default",
  showLegacy = true,
}: {
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  sections: SectionContent[];
  onContact: () => void;
  onNavigateSection: (id: string) => void;
  brandTo?: string;
  navSectionIds?: readonly string[];
  legacyLabel?: { en: string; vi: string };
  navVariant?: "default" | "institutional";
  showLegacy?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const allowed = navSectionIds || NAV_SECTION_IDS_V2;
  const navItems = sections.filter((s) => allowed.includes(s.id));
  const legacy = legacyLabel || { en: "Legacy site", vi: "Trang cũ" };
  const institutional = navVariant === "institutional";

  return (
    <header
      className={`iv2-header${institutional ? " iv2-header--institutional" : ""}`}
    >
      <div className="iv2-container iv2-header-inner">
        <Link to={brandTo} className="iv2-brand">
          <img src="/cardbey-icon.png" alt="" width={28} height={28} />
          <span className="iv2-brand-mark">Cardbey</span>
          <span className="iv2-brand-sub">
            {locale === "vi" ? "Nhà đầu tư" : "Investor"}
          </span>
        </Link>

        <nav className="iv2-nav" aria-label="Investor">
          <div className="iv2-nav-desktop">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(item.id);
                }}
              >
                {t(item.eyebrow || item.title, locale)}
              </a>
            ))}
            <button type="button" className="iv2-btn iv2-btn-primary" onClick={onContact}>
              {locale === "vi" ? "Liên hệ" : "Contact"}
            </button>
            {showLegacy ? (
              <Link className="iv2-btn iv2-btn-ghost" to="/">
                {locale === "vi" ? legacy.vi : legacy.en}
              </Link>
            ) : null}
          </div>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
          <button
            type="button"
            className="iv2-mobile-toggle"
            aria-expanded={open}
            aria-controls="iv2-mobile-nav"
            aria-label={locale === "vi" ? "Mở menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      <div
        id="iv2-mobile-nav"
        className={`iv2-container iv2-mobile-nav ${open ? "is-open" : ""}`}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              onNavigateSection(item.id);
            }}
          >
            {t(item.eyebrow || item.title, locale)}
          </a>
        ))}
        <button
          type="button"
          className="iv2-btn iv2-btn-primary"
          onClick={() => {
            setOpen(false);
            onContact();
          }}
        >
          {locale === "vi" ? "Liên hệ founder" : "Contact founder"}
        </button>
        {showLegacy ? (
          <Link className="iv2-btn iv2-btn-ghost" to="/" onClick={() => setOpen(false)}>
            {locale === "vi" ? legacy.vi : legacy.en}
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export function InvestorNavigation(props: Parameters<typeof InvestorHeader>[0]) {
  return <InvestorHeader {...props} />;
}

export function MobileSectionNavigator({
  sections,
  locale,
  onNavigateSection,
}: {
  sections: SectionContent[];
  locale: LocaleCode;
  onNavigateSection: (id: string) => void;
}) {
  const items = sections.filter((s) =>
    ["hero", "what-built", "architecture", "resources", "contact"].includes(s.id)
  );
  return (
    <nav className="iv2-mobile-section-nav" aria-label="Section shortcuts">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection(item.id);
          }}
        >
          {t(item.eyebrow || item.title, locale)}
        </a>
      ))}
    </nav>
  );
}

export function InvestorFooter({
  companyLine,
  notes,
  locale,
}: {
  companyLine: Record<LocaleCode, string>;
  notes: Record<LocaleCode, string>[];
  locale: LocaleCode;
}) {
  return (
    <footer className="iv2-footer" id="footer">
      <div className="iv2-container">
        <div>{t(companyLine, locale)}</div>
        <ul className="iv2-footer-notes">
          {notes.map((note) => (
            <li key={note.en}>{t(note, locale)}</li>
          ))}
        </ul>
        <p style={{ marginTop: 16 }}>© {new Date().getFullYear()} Cardbey</p>
      </div>
    </footer>
  );
}
