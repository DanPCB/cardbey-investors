// src/App.jsx
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SoundProvider } from "@/lib/sound";
import {
  investorV3HomePath,
  isInvestorPlatformV2Enabled,
  isInvestorPlatformV3Enabled,
  isInvestorV2Primary,
  isInvestorV3Primary,
} from "@/lib/featureFlags";

const Investors = lazy(() => import("./pages/Investors"));
const InvestorsV2 = lazy(() => import("./pages/InvestorsV2"));
const InvestorsV3 = lazy(() => import("./pages/InvestorsV3"));

function LazyInvestorPage({ page: Page, label }) {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 24, color: "#cbd5e1" }}>Loading {label}…</div>
      }
    >
      <Page />
    </Suspense>
  );
}

function RedirectWithLocation({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
}

function rootElement({ v2Primary, v3Primary }) {
  if (v2Primary) {
    return <LazyInvestorPage page={InvestorsV2} label="Investor Platform" />;
  }
  if (v3Primary) {
    return <LazyInvestorPage page={InvestorsV3} label="Investor Platform V3" />;
  }
  return <LazyInvestorPage page={Investors} label="Investor Relations" />;
}

export default function App() {
  const v2Enabled = isInvestorPlatformV2Enabled();
  const v3Enabled = isInvestorPlatformV3Enabled();
  const v2Primary = isInvestorV2Primary();
  const v3Primary = isInvestorV3Primary();
  const v3Home = investorV3HomePath();

  return (
    <SoundProvider>
      <Routes>
        <Route path="/" element={rootElement({ v2Primary, v3Primary })} />
        <Route
          path="/investors-legacy"
          element={
            v2Primary || v3Primary ? (
              <LazyInvestorPage page={Investors} label="Investor Relations" />
            ) : (
              <RedirectWithLocation to="/" />
            )
          }
        />
        <Route
          path="/investors-v2"
          element={
            v2Enabled ? (
              v2Primary ? (
                <RedirectWithLocation to="/" />
              ) : (
                <LazyInvestorPage page={InvestorsV2} label="Investor Platform V2" />
              )
            ) : (
              <RedirectWithLocation to="/" />
            )
          }
        />
        <Route
          path="/investors-v3"
          element={
            v3Enabled ? (
              v3Primary ? (
                <RedirectWithLocation to={v3Home} />
              ) : (
                <LazyInvestorPage page={InvestorsV3} label="Investor Platform V3" />
              )
            ) : (
              <RedirectWithLocation to="/" />
            )
          }
        />
        <Route path="*" element={<RedirectWithLocation to="/" />} />
      </Routes>
    </SoundProvider>
  );
}
