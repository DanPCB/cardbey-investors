import { describe, expect, it } from "vitest";
import {
  PUBLIC_INVESTOR_ORIGIN,
  isRenderOriginHost,
  publicInvestorUrl,
} from "./publicSite";

describe("public investor site identity", () => {
  it("uses investors.cardbey.com as the canonical origin", () => {
    expect(PUBLIC_INVESTOR_ORIGIN).toBe("https://investors.cardbey.com");
    expect(publicInvestorUrl()).toBe("https://investors.cardbey.com/");
    expect(publicInvestorUrl("/")).toBe("https://investors.cardbey.com/");
  });

  it("does not treat the Render hostname as the public identity", () => {
    expect(PUBLIC_INVESTOR_ORIGIN).not.toMatch(/onrender\.com/i);
    expect(isRenderOriginHost("cardbey-investors.onrender.com")).toBe(true);
    expect(isRenderOriginHost("investors.cardbey.com")).toBe(false);
  });
});
