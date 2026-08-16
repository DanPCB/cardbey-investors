import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProductCapability } from "@/content/investor";
import { InvestorCapabilityIllustration } from "./InvestorCapabilityIllustrations";
import { RealEvidenceCollage } from "./ThesisVisuals";

const sampleCap: ProductCapability = {
  id: "cap-ai-storefront",
  title: { en: "Storefront", vi: "Storefront" },
  shortDescription: {
    en: "Create digital business and storefront experiences from supplied business information.",
    vi: "Tạo trải nghiệm DN/storefront từ thông tin cung cấp.",
  },
  category: "commerce",
  status: "development",
  proofType: "repository",
  public: true,
};

describe("InvestorCapabilityIllustration", () => {
  it("renders accessible labels for each type", () => {
    const { rerender } = render(
      <InvestorCapabilityIllustration type="storefront" locale="en" />
    );
    expect(
      screen.getByRole("img", { name: /business information becomes/i })
    ).toBeInTheDocument();
    rerender(<InvestorCapabilityIllustration type="performer" locale="en" />);
    expect(
      screen.getByRole("img", { name: /orchestration layer/i })
    ).toBeInTheDocument();
  });
});

describe("RealEvidenceCollage illustrations", () => {
  it("leads with storefront and links to diligence evidence", () => {
    render(
      <RealEvidenceCollage
        locale="en"
        capabilities={[sampleCap]}
        media={[]}
        isDev={false}
      />
    );
    expect(screen.getByText(/The vision already has a starting point/i)).toBeInTheDocument();
    expect(screen.getByText(/Storefront \/ business creation/i)).toBeInTheDocument();
    expect(screen.getByText(/Concept illustrations explain product purpose/i)).toBeInTheDocument();
    expect(screen.queryByText(/fabricated imagery/i)).not.toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /View evidence/i });
    expect(links[0]).toHaveAttribute("href", "#diligence");
    expect(
      document.querySelector(".iv3-evidence-tile--featured .iv3-cap-illust--storefront")
    ).toBeTruthy();
  });
});
