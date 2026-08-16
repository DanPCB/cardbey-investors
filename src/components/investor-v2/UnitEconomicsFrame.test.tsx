import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UnitEconomicsFrame } from "./UnitEconomicsFrame";

describe("UnitEconomicsFrame", () => {
  it("shows evidence statuses instead of [CONFIRM] placeholders", () => {
    render(<UnitEconomicsFrame locale="en" />);
    expect(screen.queryByText("[CONFIRM]")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /One business — economic model to validate/i })).toBeInTheDocument();
    expect(screen.getByText(/The model is defined\. The economics are not yet proven/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^TO MEASURE$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^VALIDATING$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^TO PROVE$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^DIRECTION$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Acquisition payback/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^Discover$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /What would prove the business model/i })).toBeInTheDocument();
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/CAC|LTV|ARPU|gross margin %|payback period of/i);
  });

  it("renders VI model principle and seed question", () => {
    render(<UnitEconomicsFrame locale="vi" />);
    expect(
      screen.getByText(/Mô hình đã được xác định\. Hiệu quả kinh tế chưa được chứng minh/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Câu hỏi của giai đoạn Seed/i)).toBeInTheDocument();
    expect(screen.queryByText("[CONFIRM]")).not.toBeInTheDocument();
  });
});
