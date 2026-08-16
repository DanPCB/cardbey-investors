import { afterEach, describe, expect, it, vi } from "vitest";

describe("feature flag", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults to enabled in development when unset", async () => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "");
    const { isInvestorPlatformV2Enabled } = await import("./featureFlags");
    expect(isInvestorPlatformV2Enabled()).toBe(true);
  });

  it("honours explicit false", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "false");
    const { isInvestorPlatformV2Enabled } = await import("./featureFlags");
    expect(isInvestorPlatformV2Enabled()).toBe(false);
  });

  it("honours explicit true", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "true");
    const { isInvestorPlatformV2Enabled } = await import("./featureFlags");
    expect(isInvestorPlatformV2Enabled()).toBe(true);
  });

  it("keeps review mode off unless explicitly enabled", async () => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_INVESTOR_V2_REVIEW_MODE", "");
    const { isInvestorV2ReviewMode } = await import("./featureFlags");
    expect(isInvestorV2ReviewMode()).toBe(false);
  });

  it("enables review mode only when flag is true", async () => {
    vi.stubEnv("VITE_INVESTOR_V2_REVIEW_MODE", "true");
    const { isInvestorV2ReviewMode } = await import("./featureFlags");
    expect(isInvestorV2ReviewMode()).toBe(true);
  });

  it("keeps public soft-launch and primary cutover off by default", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "true");
    vi.stubEnv("VITE_INVESTOR_V2_PUBLIC", "");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "");
    const {
      isInvestorV2PublicSoftLaunch,
      isInvestorV2Primary,
    } = await import("./featureFlags");
    expect(isInvestorV2PublicSoftLaunch()).toBe(false);
    expect(isInvestorV2Primary()).toBe(false);
  });

  it("requires V2 enabled for primary cutover flag", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "false");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "true");
    const { isInvestorV2Primary } = await import("./featureFlags");
    expect(isInvestorV2Primary()).toBe(false);
  });

  it("enables primary only when both flags are true", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "true");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "true");
    const { isInvestorV2Primary } = await import("./featureFlags");
    expect(isInvestorV2Primary()).toBe(true);
  });

  it("defaults V3 enabled in development when unset", async () => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "");
    const { isInvestorPlatformV3Enabled } = await import("./featureFlags");
    expect(isInvestorPlatformV3Enabled()).toBe(true);
  });

  it("honours explicit V3 false", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "false");
    const { isInvestorPlatformV3Enabled } = await import("./featureFlags");
    expect(isInvestorPlatformV3Enabled()).toBe(false);
  });

  it("keeps V3 off the site root unless explicitly primary", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "true");
    vi.stubEnv("VITE_INVESTOR_V3_PRIMARY", "");
    const { isInvestorV3Primary, investorV3HomePath } = await import("./featureFlags");
    expect(isInvestorV3Primary()).toBe(false);
    expect(investorV3HomePath()).toBe("/investors-v3");
  });

  it("serves V3 at the site root when primary is enabled", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "true");
    vi.stubEnv("VITE_INVESTOR_V3_PRIMARY", "true");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "false");
    const { isInvestorV3Primary, investorV3HomePath } = await import("./featureFlags");
    expect(isInvestorV3Primary()).toBe(true);
    expect(investorV3HomePath()).toBe("/");
  });

  it("does not make V3 primary if V2 primary is on", async () => {
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V2", "true");
    vi.stubEnv("VITE_INVESTOR_V2_PRIMARY", "true");
    vi.stubEnv("VITE_ENABLE_INVESTOR_PLATFORM_V3", "true");
    vi.stubEnv("VITE_INVESTOR_V3_PRIMARY", "true");
    const { isInvestorV3Primary } = await import("./featureFlags");
    expect(isInvestorV3Primary()).toBe(false);
  });
});
