import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProductCapability } from "@/content/investor";
import { CapabilityGrowthExplorer } from "./CapabilityGrowthExplorer";
import { capabilityGrowthBranches } from "@/content/investor/v3/capabilityGrowthTree";

const caps: ProductCapability[] = [
  {
    id: "cap-ai-storefront",
    title: { en: "Storefront", vi: "Storefront" },
    shortDescription: {
      en: "Create digital business and storefront experiences from supplied business information.",
      vi: "Tạo trải nghiệm storefront.",
    },
    category: "commerce",
    status: "development",
    proofType: "repository",
    public: true,
  },
  {
    id: "cap-ai-performer",
    title: { en: "Performer", vi: "Performer" },
    shortDescription: {
      en: "An orchestration layer that prepares and executes business tasks within defined policies and boundaries.",
      vi: "Lớp điều phối.",
    },
    category: "agents",
    status: "development",
    proofType: "repository",
    public: true,
  },
];

function firstByRole(role: string, name: RegExp) {
  return screen.getAllByRole(role, { name })[0];
}

describe("CapabilityGrowthExplorer", () => {
  it("defaults to Start: Business → Cardbey → Storefront", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    expect(screen.getByText(/One context\. Growing capability/i)).toBeInTheDocument();
    expect(screen.getByText(/Add capability as the context needs it/i)).toBeInTheDocument();
    expect(screen.getByText(/I have a business/i)).toBeInTheDocument();
    expect(screen.getByText(/I want to build a business/i)).toBeInTheDocument();
    expect(firstByRole("button", /CARDBEY/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Grow capability/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryAllByRole("button", { name: /Performer/i })).toHaveLength(0);
  });

  it("expands primary branches on Next / Expand rail", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    fireEvent.click(firstByRole("button", /02 Expand/i));
    expect(screen.getAllByRole("button", { name: /Performer/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Promotion & growth/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Displays & devices/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Business structure/i }).length).toBeGreaterThan(0);
    expect(document.querySelector(".iv3-cge-world")).toHaveAttribute("data-slide", "1");
  });

  it("advances carousel when Storefront is clicked on start", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    fireEvent.click(firstByRole("button", /^Storefront$/i));
    expect(document.querySelector(".iv3-cge-world")).toHaveAttribute("data-slide", "1");
    expect(screen.getAllByRole("button", { name: /Performer/i }).length).toBeGreaterThan(0);
  });

  it("drills into a branch and updates detail panel", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    fireEvent.click(firstByRole("button", /03 Explore/i));
    expect(screen.getAllByRole("button", { name: /Performer/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /^Content$/i }).length).toBeGreaterThan(0);
    fireEvent.click(firstByRole("button", /^Content$/i));
    expect(screen.getByRole("heading", { level: 4, name: /^Content$/i })).toBeInTheDocument();
  });

  it("Explore full system and Reset", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    fireEvent.click(firstByRole("button", /Explore full system/i));
    expect(firstByRole("button", /Return to focus/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Content$/i }).length).toBeGreaterThan(0);
    fireEvent.click(firstByRole("button", /^Reset$/i));
    expect(screen.getAllByText(/Grow capability/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryAllByRole("button", { name: /Performer/i })).toHaveLength(0);
  });

  it("links evidence to diligence", () => {
    render(<CapabilityGrowthExplorer locale="en" capabilities={caps} />);
    const link = screen.getByRole("link", { name: /View evidence/i });
    expect(link).toHaveAttribute("href", "#diligence");
  });

  it("renders VI frame copy", () => {
    render(<CapabilityGrowthExplorer locale="vi" capabilities={caps} />);
    expect(screen.getByText(/Một ngữ cảnh\. Năng lực tăng dần/i)).toBeInTheDocument();
  });

  it("tree registry only references known branch ids", () => {
    expect(capabilityGrowthBranches.map((b) => b.id)).toEqual([
      "performer",
      "promotion",
      "devices",
      "structure",
    ]);
  });
});
