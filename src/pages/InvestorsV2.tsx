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
  MobileSectionNavigator,
  ReviewPanel,
  SectionBodyBlocks,
  useInvestorLocale,
} from "@/components/investor-v2";
import {
  filterPublicBundle,
  getOrderedSections,
  investorContent,
  t,
} from "@/content/investor";
import { getPublicFounderInput } from "@/content/investor/founder-input";
import { trackInvestorEvent } from "@/lib/analytics";
import "@/styles/investor-v2.css";
import "@/styles/contact-founder.css";

function resolveContactFounderName(): string {
  const approved = getPublicFounderInput().find((r) => r.id === "founder-public-name");
  if (approved?.value) return String(approved.value);
  const fromEnv = import.meta.env.VITE_IR_FOUNDER_NAME?.trim();
  if (fromEnv) return fromEnv;
  // Operational contact label only — not a confirmed public biography.
  return "Danh Pham";
}

function InvestorsV2Inner() {
  const { locale, setLocale } = useInvestorLocale();
  const [contactOpen, setContactOpen] = useState(false);
  const isDev = import.meta.env.DEV;
  const showTeamPlaceholders = isDev;
  const contactFounderName = useMemo(() => resolveContactFounderName(), []);

  const bundle = useMemo(
    () => filterPublicBundle(investorContent, { isDev }),
    [isDev]
  );
  const sections = useMemo(() => getOrderedSections(bundle), [bundle]);

  useEffect(() => {
    trackInvestorEvent("investor_page_view", {
      version: "v2",
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
    trackInvestorEvent("founder_contact_clicked", { locale });
    setContactOpen(true);
  };

  return (
    <InvestorPageShell>
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
            >
              <SectionBodyBlocks
                bundle={bundle}
                sectionId={section.id}
                locale={locale}
                showTeamPlaceholders={showTeamPlaceholders}
                isDev={isDev}
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
                            if (cta.id === "cta-explore") {
                              trackInvestorEvent("hero_primary_cta", { id: cta.id });
                            }
                            if (cta.id === "cta-built") {
                              trackInvestorEvent("what_built_cta", { id: cta.id });
                            }
                            if (cta.id === "cta-materials" || cta.id === "cta-fund-materials") {
                              trackInvestorEvent("investor_materials_cta", { id: cta.id });
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

      <MobileSectionNavigator
        sections={sections}
        locale={locale}
        onNavigateSection={navigateSection}
      />

      <ContactFounderModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        founderName={contactFounderName}
        email={import.meta.env.VITE_IR_FOUNDER || "founder@cardbey.com"}
        lang={locale}
      />
    </InvestorPageShell>
  );
}

export default function InvestorsV2() {
  return (
    <InvestorLocaleProvider>
      <InvestorsV2Inner />
    </InvestorLocaleProvider>
  );
}
