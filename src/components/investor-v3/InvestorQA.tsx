import { useId, useState } from "react";
import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  investorQaCopy as copy,
  investorQaItems,
  type InvestorQaCategory,
  type InvestorQaItem,
} from "@/content/investor/v3/investorQa";
import { trackInvestorEvent } from "@/lib/analytics";

type Props = {
  locale: LocaleCode;
  onContact?: () => void;
  onNavigate?: (id: string) => void;
};

export function InvestorQA({ locale, onContact, onNavigate }: Props) {
  const titleId = useId();
  const [openId, setOpenId] = useState(investorQaItems[0]?.id ?? "");

  const toggle = (item: InvestorQaItem) => {
    const next = openId === item.id ? "" : item.id;
    setOpenId(next);
    if (next) {
      trackInvestorEvent("investor_qa_opened", {
        questionId: item.id,
        n: item.n,
        version: "v3",
      });
    }
  };

  const go = (href: string, contact?: boolean, questionId?: string) => {
    trackInvestorEvent("investor_qa_link", {
      questionId: questionId || "closing",
      href,
      version: "v3",
    });
    if (contact && onContact) {
      onContact();
      return;
    }
    const id = href.replace("#", "");
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let lastCategory: InvestorQaCategory | null = null;

  return (
    <div className="iv3-qa">
      <div className="iv3-qa-frame" role="region" aria-labelledby={titleId}>
        <p className="iv3-qa-kicker" id={titleId}>
          {t(copy.frameLabel, locale)}
        </p>
        <ul className="iv3-qa-list">
          {investorQaItems.map((item) => {
            const showCat = item.category !== lastCategory;
            lastCategory = item.category;
            const isOpen = openId === item.id;
            const panelId = `iv3-qa-panel-${item.id}`;
            const btnId = `iv3-qa-btn-${item.id}`;
            const n = String(item.n).padStart(2, "0");
            return (
              <li key={item.id} className={`iv3-qa-item${isOpen ? " is-open" : ""}`}>
                {showCat ? (
                  <p className="iv3-qa-cat">{t(copy.categories[item.category], locale)}</p>
                ) : null}
                <button
                  type="button"
                  id={btnId}
                  className="iv3-qa-q"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item)}
                >
                  <span className="iv3-qa-n">{n}</span>
                  <span className="iv3-qa-q-text">{t(item.question, locale)}</span>
                  <span className="iv3-qa-sign" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className="iv3-qa-answer" id={panelId} role="region" aria-labelledby={btnId}>
                  <div className="iv3-qa-answer-inner">
                    <p>{t(item.answer, locale)}</p>
                    {item.links?.length ? (
                      <p className="iv3-qa-links">
                        {item.links.map((link) => (
                          <a
                            key={link.href + t(link.label, locale)}
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              go(link.href, link.contact, item.id);
                            }}
                          >
                            {t(link.label, locale)}
                          </a>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="iv3-qa-close">
        <h4>{t(copy.closingTitle, locale)}</h4>
        <p>{t(copy.closingBody, locale)}</p>
        <div className="iv3-qa-close-actions">
          <button type="button" className="iv2-btn iv2-btn-primary" onClick={() => go("#contact", true)}>
            {t(copy.askFounder, locale)}
          </button>
          <a
            className="iv2-btn iv2-btn-ghost"
            href="#resources"
            onClick={(e) => {
              e.preventDefault();
              go("#resources");
            }}
          >
            {t(copy.requestMaterials, locale)}
          </a>
        </div>
      </div>
    </div>
  );
}
