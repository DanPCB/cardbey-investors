import { useEffect, useMemo, useState } from "react";
import ContactFounderModal from "@/components/ContactFounderModal";
import {
  ArchitectureDiagram,
  Disclosure,
  FounderContactCTA,
  InvestorCTA,
  InvestorFooter,
  InvestorHeader,
  InvestorLocaleProvider,
  InvestorPageShell,
  InvestorSection,
  NAV_SECTION_IDS_V3,
  ReviewPanel,
  SectionBodyBlocks,
  useInvestorLocale,
} from "@/components/investor-v2";
import { filterPublicBundle, getOrderedSections, t } from "@/content/investor";
import { investorV3Content } from "@/content/investor/v3/content";
import { getPublicFounderInput } from "@/content/investor/founder-input";
import { trackInvestorEvent } from "@/lib/analytics";
import { investorV3HomePath } from "@/lib/featureFlags";
import "@/styles/investor-v2.css";
import "@/styles/investor-v3.css";
import "@/styles/contact-founder.css";

const V3_SECTION_INDEX: Record<string, string> = {
  hero: "01",
  paradox: "02",
  "missing-layer": "03",
  "start-one": "04",
  "commercial-validation": "05",
  expansion: "06",
  "growth-capital": "07",
  "seed-opportunity": "08",
  qa: "09",
};

function resolveContactFounderName(): string {
  const approved = getPublicFounderInput().find((r) => r.id === "founder-public-name");
  if (approved?.value) return String(approved.value);
  const fromEnv = import.meta.env.VITE_IR_FOUNDER_NAME?.trim();
  if (fromEnv) return fromEnv;
  return "Danh Pham";
}

function InvestorsV3Inner() {
  const { locale, setLocale } = useInvestorLocale();
  const [contactOpen, setContactOpen] = useState(false);
  const isDev = import.meta.env.DEV;
  const showTeamPlaceholders = isDev;
  const contactFounderName = useMemo(() => resolveContactFounderName(), []);

  const bundle = useMemo(
    () => filterPublicBundle(investorV3Content, { isDev }),
    [isDev]
  );
  const sections = useMemo(() => getOrderedSections(bundle), [bundle]);

  useEffect(() => {
    trackInvestorEvent("investor_page_view", {
      version: "v3",
      locale,
    });
  }, [locale]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            trackInvestorEvent("investor_section_viewed", {
              sectionId: entry.target.id,
              locale,
              version: "v3",
            });
          }
        }
      },
      { threshold: 0.45 }
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections, locale]);

  const navigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  const preserveHashOnLocaleChange = (next: typeof locale) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    setLocale(next);
    if (hash) {
      requestAnimationFrame(() => {
        const id = hash.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    }
  };

  const openContact = () => {
    trackInvestorEvent("founder_contact_clicked", { locale, version: "v3" });
    setContactOpen(true);
  };

  return (
    <InvestorPageShell theme="v3">
      <a className="iv2-skip" href="#iv2-main">
        Skip to content
      </a>
      <ReviewPanel />

      <InvestorHeader
        locale={locale}
        onLocaleChange={preserveHashOnLocaleChange}
        sections={sections}
        onContact={openContact}
        onNavigateSection={navigateSection}
        brandTo={investorV3HomePath()}
        navSectionIds={NAV_SECTION_IDS_V3}
        navVariant="institutional"
        showLegacy={false}
      />

      <main id="iv2-main">
        {sections
          .filter((section) => section.id !== "footer")
          .map((section) => (
            <InvestorSection
              key={section.id}
              id={section.id}
              eyebrow={section.eyebrow}
              title={section.title}
              introduction={section.introduction}
              locale={locale}
              tier={section.tier || "investor"}
              sectionIndex={V3_SECTION_INDEX[section.id]}
            >
              <SectionBodyBlocks
                bundle={bundle}
                sectionId={section.id}
                locale={locale}
                showTeamPlaceholders={showTeamPlaceholders}
                isDev={isDev}
                onContact={openContact}
                onNavigate={navigateSection}
              />

              <ArchitectureDiagram diagramId={section.diagramId} locale={locale} />

              {section.ctas?.length ? (
                <div className="iv2-cta-row">
                  {section.ctas.map((cta) => {
                    if (cta.action === "contact") {
                      return (
                        <FounderContactCTA
                          key={cta.id}
                          label={t(cta.label, locale)}
                          onClick={openContact}
                        />
                      );
                    }
                    if (cta.action === "scroll" && cta.targetSectionId) {
                      return (
                        <InvestorCTA
                          key={cta.id}
                          variant={cta.variant || "secondary"}
                          onClick={() => {
                            if (cta.id === "cta-v3-paradox") {
                              trackInvestorEvent("hero_primary_cta", {
                                id: cta.id,
                                version: "v3",
                              });
                            }
                            if (cta.id === "cta-v3-built" || cta.id === "cta-v3-evidence" || cta.id === "cta-v3-explore") {
                              trackInvestorEvent("what_built_cta", {
                                id: cta.id,
                                version: "v3",
                              });
                            }
                            if (
                              cta.id === "cta-v3-materials" ||
                              cta.id === "cta-v3-fund-materials" ||
                              cta.id === "cta-v3-contact-materials"
                            ) {
                              trackInvestorEvent("investor_materials_cta", {
                                id: cta.id,
                                version: "v3",
                              });
                            }
                            if (cta.id === "cta-v3-philosophy") {
                              trackInvestorEvent("philosophy_drawer_cta", {
                                id: cta.id,
                                version: "v3",
                              });
                            }
                            navigateSection(cta.targetSectionId!);
                          }}
                        >
                          {t(cta.label, locale)}
                        </InvestorCTA>
                      );
                    }
                    return (
                      <InvestorCTA
                        href={cta.href || "#resources"}
                        variant={cta.variant || "secondary"}
                        key={cta.id}
                      >
                        {t(cta.label, locale)}
                      </InvestorCTA>
                    );
                  })}
                </div>
              ) : null}

              <Disclosure text={section.disclosure} locale={locale} />
            </InvestorSection>
          ))}
      </main>

      <InvestorFooter
        companyLine={bundle.legal.companyLine}
        notes={bundle.legal.notes}
        locale={locale}
      />

      <ContactFounderModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        founderName={contactFounderName}
        email={import.meta.env.VITE_IR_FOUNDER || "founder@cardbey.com"}
        phone="+61 451 867 365"
        lang={locale}
      />
    </InvestorPageShell>
  );
}

export default function InvestorsV3() {
  return (
    <InvestorLocaleProvider>
      <InvestorsV3Inner />
    </InvestorLocaleProvider>
  );
}
