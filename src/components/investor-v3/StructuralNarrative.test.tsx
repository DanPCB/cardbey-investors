import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AccumulationHypothesis,
  CoordinationBottleneck,
  EconomicPathways,
  InvestorRealityCheck,
  StructuralShiftVisual,
  UspTransformationModel,
} from "./StructuralNarrative";
import { investorV3Sections } from "@/content/investor/v3/sections";

describe("Structural narrative bridges", () => {
  it("renders directional shift rows without replacement claims", () => {
    render(<StructuralShiftVisual locale="en" />);
    expect(screen.getByText(/Direction of change/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligence concentrated/i)).toBeInTheDocument();
    expect(screen.getByText("Increasingly accessible")).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/will replace all organizations/i);
  });

  it("establishes access ≠ capability before Cardbey", () => {
    render(<CoordinationBottleneck locale="en" />);
    expect(screen.getByText(/How do the right resources work together/i)).toBeInTheDocument();
    expect(screen.getByText(/coordination gap/i)).toBeInTheDocument();
    expect(screen.getByText(/^AI$/)).toBeInTheDocument();
    expect(screen.queryByText(/^Discover$/)).not.toBeInTheDocument();
  });

  it("shows two economic pathways without a second architecture", () => {
    render(<EconomicPathways locale="en" />);
    expect(screen.getByText(/Existing business/i)).toBeInTheDocument();
    expect(screen.getByText(/More capability/i)).toBeInTheDocument();
    expect(screen.getByText(/Person \/ idea \/ opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/accessible resources do not coordinate themselves/i)).toBeInTheDocument();
  });

  it("labels accumulation as a hypothesis", () => {
    render(<AccumulationHypothesis locale="en" />);
    expect(screen.getByText(/Hypothesis — to be validated/i)).toBeInTheDocument();
    expect(screen.getByText(/The accumulation hypothesis/i)).toBeInTheDocument();
  });

  it("keeps the reality check commercially conservative", () => {
    render(<InvestorRealityCheck locale="en" />);
    expect(screen.getByText(/Commercial validation remains early/i)).toBeInTheDocument();
    expect(screen.getByText(/So where could Cardbey have an advantage/i)).toBeInTheDocument();
  });

  it("renders the USP as a strategic transformation, not ownership", () => {
    render(<UspTransformationModel locale="en" />);
    expect(screen.getByText(/Fragmented resources/i)).toBeInTheDocument();
    expect(screen.getByText(/People/i)).toBeInTheDocument();
    expect(screen.getByText(/^Act$/i)).toBeInTheDocument();
    expect(screen.getByText(/not claiming to own or fully integrate/i)).toBeInTheDocument();
  });

  it("reframes the hero as structural participation, not labour-only", () => {
    const hero = investorV3Sections.find((s) => s.id === "hero")!;
    expect(hero.title.en).toMatch(/Economic Participation/i);
    expect(hero.eyebrow?.en).toMatch(/The shift/i);
    expect(hero.introduction?.en).toMatch(/who can participate economically/i);
    expect(hero.body?.[0].en).toMatch(/who can build, operate and participate/i);
    expect(hero.bullets?.some((b) => /Distributed infrastructure/i.test(b.en))).toBe(true);
    expect(hero.title.vi).toMatch(/Cấu trúc tham gia kinh tế đang thay đổi/i);
    expect(hero.introduction?.vi).toMatch(/ai có thể tham gia kinh tế/i);
    expect(hero.introduction?.vi).not.toMatch(/thị trường lao động/i);
  });
});
