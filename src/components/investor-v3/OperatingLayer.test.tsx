import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OperatingLayer } from "./OperatingLayer";
import {
  operatingCapabilities,
  operatingLayerCopy,
} from "@/content/investor/v3/operatingLayer";

describe("OperatingLayer", () => {
  it("shows one-business capability taxonomy without five-startup product names", () => {
    render(<OperatingLayer locale="en" />);
    expect(screen.getByText(/First connected capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/EXISTING BUSINESS or PERSON \/ IDEA \/ OPPORTUNITY/i)).toBeInTheDocument();
    expect(screen.getByText(/Two starting points/i)).toBeInTheDocument();
    expect(screen.getByText(/Person · idea · opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/Business presence \/ storefront/i)).toBeInTheDocument();
    expect(screen.getByText(/Commerce \/ orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Fulfilment \/ delivery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Global Live/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Possible Cardbey economics/i)).toBeInTheDocument();
    expect(screen.getByText(/REVENUE NOW \/ INITIAL/i)).toBeInTheDocument();
    expect(screen.getByText(/REVENUE TO VALIDATE/i)).toBeInTheDocument();
    expect(screen.getByText(/FUTURE ECONOMICS/i)).toBeInTheDocument();
    expect(screen.queryByText(/^Cardbey Store$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cardbey Display Network/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Cardbey Global Live$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Cardbey Delivery$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Instant Order/i)).not.toBeInTheDocument();
    expect(operatingCapabilities.find((r) => r.id === "delivery")?.status.en).toBe("DIRECTION");
    expect(operatingCapabilities.find((r) => r.id === "live")?.capabilityIds).toEqual([]);
  });

  it("keeps Vietnamese commercial-layer meaning", () => {
    render(<OperatingLayer locale="vi" />);
    expect(screen.getByText(operatingLayerCopy.kicker.vi)).toBeInTheDocument();
    expect(screen.getByText(operatingLayerCopy.revenueKicker.vi)).toBeInTheDocument();
    expect(screen.getAllByText(/ĐÃ CÓ/).length).toBeGreaterThanOrEqual(1);
  });
});
