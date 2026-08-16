import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GrowthCapitalJourney } from "./GrowthCapitalJourney";
import { SeedPropositionPanel, SafeDiligencePanel } from "./SeedPropositionPanel";
import { seedPropositionCopy, seedOwnershipExamples } from "@/content/investor/v3/seedProposition";
import { assertNoLegacyLeakage } from "@/content/investor/v3/financialFigures";

describe("GrowthCapitalJourney", () => {
  it("pitch variant states the proposed A$3M SAFE without unfinished forecasts", () => {
    render(<GrowthCapitalJourney locale="en" isDev={false} variant="pitch" />);
    expect(screen.getByRole("heading", { name: /The Seed Proposition/i })).toBeInTheDocument();
    expect(screen.getAllByText(/^A\$3M$/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Post-money SAFE/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/A\$12M/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Proposed terms/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Why this cap/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /If I invest, what do I get/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Illustrative only/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /What does A\$3M buy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /The next round is not the milestone/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From foundation/i })).toBeInTheDocument();
    expect(screen.getByText(/Today — foundation exists/i)).toBeInTheDocument();
    expect(screen.queryByText(/Illustrative Growth Scenarios/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Founder input required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\[FOUNDER TO CONFIRM\]/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/currently valued at A\$12M as an established fact/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /SAFE mechanics and close details/i })).toHaveAttribute(
      "href",
      "#diligence"
    );
  });

  it("full variant keeps scenario explorer gated until public figures exist", () => {
    render(<GrowthCapitalJourney locale="en" isDev={true} variant="full" />);
    expect(screen.queryByText(/Illustrative Growth Scenarios/i)).not.toBeInTheDocument();
    expect(screen.getByText(/scenario numbers stay gated/i)).toBeInTheDocument();
  });

  it("full variant supports keyboard timeline nodes", () => {
    render(<GrowthCapitalJourney locale="en" isDev={true} variant="full" />);
    const seeds = screen.getAllByRole("button", { name: /Seed \/ Prove/i });
    const rail = seeds[seeds.length - 1];
    rail.focus();
    fireEvent.keyDown(rail, { key: "Enter" });
    expect(rail).toHaveAttribute("aria-pressed", "true");
  });

  it("renders VI seed proposition labels on pitch", () => {
    render(<GrowthCapitalJourney locale="vi" isDev={false} variant="pitch" />);
    expect(screen.getByRole("heading", { name: /Đề xuất vòng Seed/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Vòng tiếp theo không phải cột mốc/i })).toBeInTheDocument();
    expect(screen.getByText(/Hôm nay — nền tảng đã có/i)).toBeInTheDocument();
  });
});

describe("SeedPropositionPanel", () => {
  it("keeps ownership examples illustrative and shows one development roadmap", () => {
    render(<SeedPropositionPanel locale="en" />);
    expect(seedOwnershipExamples).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: /Q4/i }));
    expect(screen.getAllByText(/SCALE \/ CHANGE \/ STOP DECISION/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Scale$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Change$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Stop \/ reassess/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /The next round is not the milestone/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From foundation/i })).toBeInTheDocument();
    expect(screen.queryByText(/^Fail$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Succeed$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Potential company value growth/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /How does my SAFE participate/i })).toHaveAttribute(
      "href",
      "#drawer-safe"
    );
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/A\$100M|A\$1B|guaranteed return is|IRR|Series A valuation/i);
    expect(assertNoLegacyLeakage(JSON.stringify(seedPropositionCopy))).toBe(true);
  });

  it("renders the VI development-path heading and keeps Scale / Change / Stop", () => {
    render(<SeedPropositionPanel locale="vi" />);
    expect(
      screen.getByRole("heading", { name: /Từ nền tảng → bằng chứng → quy mô/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Nhân rộng/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Đổi hướng/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Dừng \/ đánh giá lại/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /SAFE của tôi tham gia thế nào/i })).toHaveAttribute(
      "href",
      "#drawer-safe"
    );
  });

  it("lets Stop dim the success continuation and keeps SAFE chain out of the pitch visual", () => {
    render(<SeedPropositionPanel locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /Stop \/ reassess/i }));
    const expansion = screen.getByRole("button", { name: /DIRECTION Expansion/i });
    expect(expansion.className).not.toMatch(/\bis-on\b/);
    expect(screen.queryByText(/Future equity conversion/i)).not.toBeInTheDocument();
  });
});

describe("SafeDiligencePanel", () => {
  it("shows the SAFE participation chain without return multiples", () => {
    render(<SafeDiligencePanel locale="en" />);
    expect(screen.getByText(/How the proposed SAFE can participate/i)).toBeInTheDocument();
    expect(screen.getByText(/A\$3M seed SAFE — proposed/i)).toBeInTheDocument();
    expect(screen.getByText(/Future equity conversion/i)).toBeInTheDocument();
    expect(screen.getByText(/Subsequent financing \/ dilution/i)).toBeInTheDocument();
    expect(screen.getByText(/Possible future liquidity event — not guaranteed/i)).toBeInTheDocument();
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/A\$100M|A\$1B|10x|IRR/i);
  });
});
