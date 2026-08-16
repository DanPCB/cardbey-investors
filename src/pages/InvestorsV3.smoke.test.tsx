import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import InvestorsV3 from "./InvestorsV3";

describe("InvestorsV3 high-momentum compressed pitch smoke", () => {
  it(
    "renders the compressed investor spine without unfinished financial UI",
    () => {
    render(
      <MemoryRouter>
        <InvestorsV3 />
      </MemoryRouter>
    );

    expect(document.querySelector(".iv3-theme")).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Legacy site/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Trang cũ/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /The Structure of Economic Participation Is Changing/i })
    ).toBeInTheDocument();
    expect(screen.getByText("92M")).toBeInTheDocument();
    expect(screen.getByText("170M")).toBeInTheDocument();
    expect(screen.getByText(/\+78M/i)).toBeInTheDocument();
    expect(screen.getByText(/One signal of the shift/i)).toBeInTheDocument();
    expect(screen.getByText(/accessible resources do not coordinate themselves/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Existing business/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Person \/ idea \/ opportunity/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /Access ≠ Capability/i })).toBeInTheDocument();
    expect(screen.getAllByText(/coordination gap/i).length).toBeGreaterThanOrEqual(1);

    expect(
      screen.getByRole("heading", { name: /CARDBEY — Resource Aggregation Accelerator/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/What does this mean in practice/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The prebuilt store is not the thesis/i)
    ).toBeInTheDocument();
    expect(document.querySelector(".iv3-proof img")).toBeNull();
    expect(screen.getByRole("button", { name: /^Market$/i })).toBeInTheDocument();
    expect(screen.getAllByText(/^Capability$/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Accumulation$/).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", { name: /Start with one context\. Add capability as it needs it/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /The next stage is market execution/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Phase 1 — market activation/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/VALIDATING — NOT YET PROVEN/i)).toBeInTheDocument();
    expect(screen.getByText(/ASK FIRST/i)).toBeInTheDocument();
    expect(screen.getByText(/DEMONSTRATE VALUE FIRST/i)).toBeInTheDocument();
    expect(screen.getByText(/Why Australia \+ Vietnam/i)).toBeInTheDocument();
    expect(screen.getByText(/not a claim of acquisition without CAC/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /If it works, the same idea can apply to more economic activity/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/The accumulation hypothesis/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /The seed proposition is a defined 12-month experiment/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/^A\$3M$/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Post-money SAFE/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Why this cap/i)).toBeInTheDocument();
    expect(screen.queryByText(/Series A valuation/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Approximately 25%/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/funded plan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Up to approximately 25%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Open resource/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /The next round is not the milestone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /From foundation → evidence → scale/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/If evidence supports it — not a forecast/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /How does my SAFE participate/i })).toHaveAttribute(
      "href",
      "#drawer-safe"
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /The next phase is market execution/i,
      })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/The vision already has a starting point/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/One context\. Growing capability/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Grow capability/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/Concept illustrations explain product purpose/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Go deeper by investor focus/i)).toBeInTheDocument();
    expect(screen.getByText(/Want the detail/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Do businesses engage, claim and activate/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/The opportunity is visible\. The mechanism has a foundation/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Don't invest because the outcome sounds inevitable/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Đừng đầu tư vì kết quả nghe như tất yếu/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Judge whether the opportunity/i })).not.toBeInTheDocument();
    expect(screen.getByText(/We welcome investors who want to examine the opportunity/i)).toBeInTheDocument();
    expect(screen.queryByText(/How valuable can it become/i)).not.toBeInTheDocument();

    // Duplicate loops / ladders removed from the main pitch
    expect(screen.queryByText(/Aggregation creates acceleration/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Aggregation is not the end state/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Technology enables coordination/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Value circulation — direction/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/How Cardbey can make money \(compact\)/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /AI changes both sides of the equation/i })
    ).not.toBeInTheDocument();

    // Compressed away from main headings
    expect(
      screen.queryByRole("heading", {
        name: /What happens when individuals gain the capability of organizations/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Cardbey is building the layer in between/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /The vision became more practical/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /We didn't wait for investment to begin/i })
    ).not.toBeInTheDocument();

    // No unfinished public financial chrome
    expect(screen.queryByText(/Illustrative Growth Scenarios/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Founder input required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\[FOUNDER TO CONFIRM\]/i)).not.toBeInTheDocument();
    expect(screen.queryByText("[CONFIRM]")).not.toBeInTheDocument();
    expect(screen.getByText(/The model is defined\. The economics are not yet proven/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Market thesis/i })).toBeInTheDocument();
    expect(screen.queryByText(/Sign SAFE/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/A\$36M/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/A\$900M/i)).not.toBeInTheDocument();

    expect(screen.getByText(/World Economic Forum, Future of Jobs Report 2025/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ILO–NASK/i).length).toBeGreaterThanOrEqual(1);

    // Nav labels
    expect(screen.getAllByText(/^Bottleneck$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^First market$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Investment$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Q&A$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^Materials$/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", { name: /Investor Q&A/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Questions we would ask if we were evaluating Cardbey/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/SIGNSCATER PTY LTD/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/ABN 50 685 406 697/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/COMPANY LEGAL LINE REQUIRED/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Investor Platform V2 foundation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\[PLACEHOLDER\]/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\[CẦN /)).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="/files/"]')).toBeNull();
    expect(document.getElementById("operating-layer")).toBeTruthy();
    expect(screen.getAllByText(/First connected capabilities/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Possible Cardbey economics/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/A\$3M funds Cardbey Phase 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Person \/ idea \/ opportunity or existing business/i).length).toBeGreaterThanOrEqual(1);
    expect(
      [...document.querySelectorAll("a[href]")].some((a) =>
        /localhost:5173|127\.0\.0\.1:5173/.test(a.getAttribute("href") || "")
      )
    ).toBe(false);
    expect(document.getElementById("growth-capital")).toBeTruthy();
    expect(document.getElementById("qa")).toBeTruthy();
    expect(document.getElementById("resources")).toBeTruthy();
    expect(document.getElementById("footer")).toBeTruthy();
    expect(document.getElementById("closing")).toBeNull();
    expect(screen.getAllByRole("button", { name: /Request Investor Materials/i }).length).toBeGreaterThanOrEqual(2);

    fireEvent.click(screen.getAllByRole("button", { name: /^Contact$/i })[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /Investor Deck/i })).not.toBeInTheDocument();
    expect(
      within(dialog).getByRole("button", { name: /Request investor materials/i })
    ).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /Email/i })).toHaveAttribute(
      "href",
      "mailto:founder@cardbey.com"
    );
    expect(within(dialog).getByRole("link", { name: /Call/i })).toHaveAttribute(
      "href",
      "tel:+61451867365"
    );
  },
  15000
);

  it("switches the opening to Vietnamese economic-participation framing", () => {
    render(
      <MemoryRouter>
        <InvestorsV3 />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Tiếng Việt" }));
    expect(
      screen.getByRole("heading", { name: /Cấu trúc tham gia kinh tế đang thay đổi/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Doanh nghiệp hiện tại/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Cá nhân \/ ý tưởng \/ cơ hội/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/nguồn lực dễ tiếp cận không có nghĩa là chúng tự phối hợp/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tiếp cận ≠ Năng lực/i })).toBeInTheDocument();
    expect(
      screen.queryByText(/Cách con người tổ chức việc làm, năng lực, doanh nghiệp/i)
    ).not.toBeInTheDocument();
  });
});
