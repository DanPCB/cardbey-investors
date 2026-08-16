import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResourceAggregationAccelerator } from "./ResourceAggregationAccelerator";
import {
  uspCopy,
  uspResources,
  uspVisibleWordCount,
} from "@/content/investor/v3/resourceAggregationUsp";
import { investorV3Sections } from "@/content/investor/v3/sections";

describe("ResourceAggregationAccelerator", () => {
  it("renders the canonical resources → Cardbey → capability path", () => {
    render(<ResourceAggregationAccelerator locale="en" />);
    expect(screen.getByRole("button", { name: /^Market$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Intelligence$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Infrastructure$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Capital$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^CARDBEY$/i })).toBeInTheDocument();
    expect(screen.getByText(/^Capability$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Activity$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Evidence$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Accumulation$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /How it begins around a business or an idea/i })).toHaveAttribute(
      "href",
      "#start-one"
    );
    expect(uspResources.map((r) => r.id)).toEqual([
      "market",
      "intelligence",
      "infrastructure",
      "capital",
    ]);
  });

  it("renders VI resource labels", () => {
    render(<ResourceAggregationAccelerator locale="vi" />);
    expect(screen.getByRole("button", { name: /Thị trường/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Trí tuệ/i })).toBeInTheDocument();
    expect(screen.getByText(uspCopy.definition.vi)).toBeInTheDocument();
  });

  it("does not claim proven scale, ownership or guaranteed speed", () => {
    render(<ResourceAggregationAccelerator locale="en" />);
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/\$\d/);
    expect(text).not.toMatch(/guaranteed/i);
    expect(text).toMatch(/not by collecting APIs/i);
  });

  it("activates all paths when Cardbey is clicked", () => {
    render(<ResourceAggregationAccelerator locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /^CARDBEY$/i }));
    expect(document.querySelector(".iv3-raa")).toHaveClass("is-pulse");
  });

  it("keeps USP visible copy compact", () => {
    const section = investorV3Sections.find((s) => s.id === "missing-layer")!;
    const sectionWords = [section.introduction?.en, ...(section.body?.map((b) => b.en) || [])]
      .join(" ")
      .trim()
      .split(/\s+/).length;
    expect(section.title.en).toMatch(/Resource Aggregation Accelerator/i);
    expect(sectionWords).toBeLessThanOrEqual(80);
    expect(uspVisibleWordCount()).toBeLessThanOrEqual(140);
  });
});
