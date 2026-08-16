import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("App public routing", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("renders Investor V3 at / when V3 is primary", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "true");
    vi.stubEnv("VITE_INVESTOR_V3_PRIMARY", "true");
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "false");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "false");
    const { default: App } = await import("./App.jsx");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      await screen.findByRole(
        "heading",
        { name: /The Structure of Economic Participation Is Changing/i },
        { timeout: 10000 }
      )
    ).toBeInTheDocument();
  }, 15000);

  it("keeps /investors-v3 as an alias that redirects to / when V3 is primary", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "true");
    vi.stubEnv("VITE_INVESTOR_V3_PRIMARY", "true");
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "false");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "false");
    const { default: App } = await import("./App.jsx");
    render(
      <MemoryRouter initialEntries={["/investors-v3#qa"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      await screen.findByRole(
        "heading",
        { name: /The Structure of Economic Participation Is Changing/i },
        { timeout: 10000 }
      )
    ).toBeInTheDocument();
  }, 15000);
});
