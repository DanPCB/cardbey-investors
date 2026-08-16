/**
 * Canonical public identity for the investor static site.
 * Render onrender.com is infrastructure only — never advertise it in UI or SEO.
 */
export const PUBLIC_INVESTOR_ORIGIN = "https://investors.cardbey.com";

export function publicInvestorUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${PUBLIC_INVESTOR_ORIGIN}/`;
  return `${PUBLIC_INVESTOR_ORIGIN}${normalized}`;
}

export function isRenderOriginHost(hostname: string | undefined): boolean {
  return (hostname || "").toLowerCase() === "cardbey-investors.onrender.com";
}
