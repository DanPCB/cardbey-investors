/**
 * Build-time feature flags (Vite).
 * V2 remains at /investors-v2 unless PRIMARY cutover is explicitly enabled.
 * Review mode must never activate unless explicitly enabled.
 * PRIMARY must remain false until cutover decision = APPROVE_CUTOVER.
 */
function envTrue(raw: string | undefined): boolean {
  return String(raw ?? "").toLowerCase() === "true" || raw === "1";
}

export function isInvestorPlatformV2Enabled(): boolean {
  const raw = import.meta.env.VITE_ENABLE_INVESTOR_PLATFORM_V2;
  if (raw == null || raw === "") {
    return import.meta.env.DEV;
  }
  return envTrue(raw);
}

/** Explicit opt-in only — never implied by DEV alone. */
export function isInvestorV2ReviewMode(): boolean {
  return envTrue(import.meta.env.VITE_INVESTOR_V2_REVIEW_MODE);
}

/**
 * Marks intentional public soft-launch of /investors-v2 (Option B).
 * Does not change routing by itself; review mode should stay false in production.
 */
export function isInvestorV2PublicSoftLaunch(): boolean {
  return envTrue(import.meta.env.VITE_INVESTOR_V2_PUBLIC) && isInvestorPlatformV2Enabled();
}

/**
 * When true (and V2 enabled), `/` renders Investor V2 and legacy is available at /investors-legacy.
 * Defaults false. Must not enable without recorded APPROVE_CUTOVER.
 */
export function isInvestorV2Primary(): boolean {
  return envTrue(import.meta.env.VITE_INVESTOR_V2_PRIMARY) && isInvestorPlatformV2Enabled();
}

/**
 * Investor Platform V3 (Operating Philosophy narrative).
 * Defaults to enabled in DEV when unset; production must set explicitly.
 * Serving V3 at `/` requires VITE_INVESTOR_V3_PRIMARY (this static site only).
 */
export function isInvestorPlatformV3Enabled(): boolean {
  const raw = import.meta.env.VITE_ENABLE_INVESTOR_PLATFORM_V3;
  if (raw == null || raw === "") {
    return import.meta.env.DEV;
  }
  return envTrue(raw);
}

/**
 * When true (and V3 enabled, V2 not primary), `/` renders Investor V3.
 * `/investors-v3` remains an alias. Legacy pitch stays at `/investors-legacy`.
 */
export function isInvestorV3Primary(): boolean {
  return (
    envTrue(import.meta.env.VITE_INVESTOR_V3_PRIMARY) &&
    isInvestorPlatformV3Enabled() &&
    !isInvestorV2Primary()
  );
}

/** Home path for the V3 pitch on this static site. */
export function investorV3HomePath(): string {
  return isInvestorV3Primary() ? "/" : "/investors-v3";
}
