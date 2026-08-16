export type InvestorAnalyticsEvent =
  | "investor_page_view"
  | "investor_language_changed"
  | "investor_section_viewed"
  | "investor_pack_clicked"
  | "investor_deck_clicked"
  | "safe_note_clicked"
  | "founder_contact_clicked"
  | "product_proof_opened"
  | "architecture_diagram_engaged"
  | "request_access_submitted"
  | "hero_primary_cta"
  | "what_built_cta"
  | "investor_materials_cta"
  | "philosophy_drawer_cta"
  | "roadmap_engaged"
  | "media_view"
  | "resource_diagram_node_view"
  | "resource_diagram_node_select"
  | "resource_diagram_all_connect"
  | "capability_tree_step"
  | "capability_tree_expand"
  | "capability_tree_select"
  | "capability_tree_view_all"
  | "capability_tree_evidence_open"
  | "investor_qa_opened"
  | "investor_qa_link";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export type AnalyticsAdapter = {
  track: (event: InvestorAnalyticsEvent, payload?: AnalyticsPayload) => void;
};

/** No-op adapter — swap for a real provider later. Never send message bodies or PII. */
const noopAdapter: AnalyticsAdapter = {
  track: () => {
    /* intentionally empty */
  },
};

let adapter: AnalyticsAdapter = noopAdapter;

export function setAnalyticsAdapter(next: AnalyticsAdapter) {
  adapter = next;
}

export function trackInvestorEvent(
  event: InvestorAnalyticsEvent,
  payload?: AnalyticsPayload
) {
  try {
    adapter.track(event, payload);
  } catch {
    /* never break UX for analytics */
  }
}
