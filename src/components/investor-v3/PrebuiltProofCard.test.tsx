import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrebuiltProofCard } from "./PrebuiltProofCard";
import {
  getPublicPrebuiltExample,
  prebuiltProofCopy,
} from "@/content/investor/v3/prebuiltProof";

describe("PrebuiltProofCard", () => {
  it("demonstrates the thesis without redefining Cardbey as a store generator", () => {
    render(<PrebuiltProofCard locale="en" />);
    expect(screen.getByText(/What does this mean in practice/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The prebuilt store is not the thesis/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/EXISTS — one implementation of the mechanism/i)).toBeInTheDocument();
    expect(screen.getByText(/^Discover$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Claim$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Activate$/i)).toBeInTheDocument();
    expect(screen.queryByText(/ghost store/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/hasn't seen this yet/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/acquisition without CAC/i)).not.toBeInTheDocument();
    expect(document.querySelector(".iv3-proof img")).toBeNull();
    expect(getPublicPrebuiltExample()).toBeNull();
  });

  it("keeps Vietnamese meaning without a literal store-generator pitch", () => {
    render(<PrebuiltProofCard locale="vi" />);
    expect(screen.getByText(prebuiltProofCopy.kicker.vi)).toBeInTheDocument();
    expect(screen.getByText(prebuiltProofCopy.distinction.vi)).toBeInTheDocument();
    expect(screen.getByText(prebuiltProofCopy.existsLabel.vi)).toBeInTheDocument();
  });
});
