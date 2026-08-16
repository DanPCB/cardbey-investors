import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("InvestorsV2 review mode", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("hides review panel by default", async () => {
    vi.stubEnv("VITE_INVESTOR_V2_REVIEW_MODE", "false");
    const { default: InvestorsV2 } = await import("./InvestorsV2");
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/review panel/i)).not.toBeInTheDocument();
    expect(document.querySelector("[data-review-mode='true']")).toBeNull();
  }, 15000);

  it("shows review panel only when flag is true", async () => {
    vi.stubEnv("VITE_INVESTOR_V2_REVIEW_MODE", "true");
    vi.resetModules();
    const { default: InvestorsV2 } = await import("./InvestorsV2");
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/review panel/i)).toBeInTheDocument();
    expect(document.querySelector("[data-review-mode='true']")).toBeTruthy();
    expect(screen.getByText(/Release summary/i)).toBeInTheDocument();
    expect(screen.getByText(/HOLD_FOR_EVIDENCE/i)).toBeInTheDocument();
  });
});
