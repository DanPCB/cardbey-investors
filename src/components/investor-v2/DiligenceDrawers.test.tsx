import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { DiligenceDrawers } from "./DiligenceDrawers";
import { investorV3Content } from "@/content/investor/v3/content";

describe("DiligenceDrawers business and market completion", () => {
  it("completes Business & Economics and Vision & Market without unfinished placeholders", () => {
    render(
      <MemoryRouter>
        <DiligenceDrawers bundle={investorV3Content} locale="en" isDev={false} />
      </MemoryRouter>
    );

    expect(screen.queryByText("[CONFIRM]")).not.toBeInTheDocument();
    expect(screen.queryByText(/\[FOUNDER TO CONFIRM\]/i)).not.toBeInTheDocument();
    expect(screen.getByText(/The model is defined/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Market thesis/i })).toBeInTheDocument();
    expect(screen.getByText(/Initial market hypothesis/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Who first/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Growth is capability-led/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Human participation/i })).toBeInTheDocument();
    expect(screen.getByText(/How the seed program measures the model/i)).toBeInTheDocument();
    expect(screen.queryByText(/World Thesis/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/App → Digital Network → Logistics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Four Foundations/i)).not.toBeInTheDocument();
  }, 15000);

  it("renders VI market thesis without invented figures", () => {
    render(
      <MemoryRouter>
        <DiligenceDrawers bundle={investorV3Content} locale="vi" isDev={false} />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Luận điểm thị trường/i })).toBeInTheDocument();
    expect(screen.getByText(/Ai trước/i)).toBeInTheDocument();
    expect(screen.getByText(/Tăng trưởng theo năng lực/i)).toBeInTheDocument();
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/A\$100M|A\$1B|\[CONFIRM\]/);
  });
});
