import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("investor SEO identity", () => {
  const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
  const robots = readFileSync(resolve(__dirname, "../../public/robots.txt"), "utf8");
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");

  it("points canonical, Open Graph and sitemap at investors.cardbey.com", () => {
    expect(html).toMatch(/rel="canonical" href="https:\/\/investors\.cardbey\.com\/"/);
    expect(html).toMatch(/property="og:url" content="https:\/\/investors\.cardbey\.com\/"/);
    expect(html).toMatch(/property="og:image" content="https:\/\/investors\.cardbey\.com\/cardbey-logo-512\.png"/);
    expect(html).toMatch(/SIGNSCATER PTY LTD/);
    expect(html).toMatch(/ABN 50 685 406 697/);
    expect(robots).toMatch(/Sitemap: https:\/\/investors\.cardbey\.com\/sitemap\.xml/);
    expect(sitemap).toMatch(/<loc>https:\/\/investors\.cardbey\.com\/<\/loc>/);
  });

  it("does not advertise the Render origin in public metadata", () => {
    expect(html).not.toMatch(/cardbey-investors\.onrender\.com/);
    expect(robots).not.toMatch(/onrender\.com/);
    expect(sitemap).not.toMatch(/onrender\.com/);
  });
});
