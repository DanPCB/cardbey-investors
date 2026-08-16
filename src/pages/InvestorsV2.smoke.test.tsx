import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import InvestorsV2 from "./InvestorsV2";
import { investorContent } from "@/content/investor";

describe("InvestorsV2 smoke", () => {
  it("renders core narrative sections", () => {
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI Operating System for Small Businesses/i,
      })
    ).toBeInTheDocument();

    for (const id of [
      "problem",
      "why-now",
      "answer",
      "architecture",
      "what-built",
      "traction",
      "resources",
      "contact",
      "funding",
    ]) {
      expect(document.getElementById(id)).toBeTruthy();
    }

    expect(investorContent.sections.length).toBeGreaterThanOrEqual(25);
    expect(screen.getByRole("button", { name: /Explore Cardbey/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View What We Have Built/i })).toBeInTheDocument();
  });

  it("switches language without losing architecture section", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Tiếng Việt" }));
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Hệ Điều Hành AI cho Doanh Nghiệp Nhỏ/i,
      })
    ).toBeInTheDocument();
    expect(document.getElementById("architecture")).toBeTruthy();
  });

  it("exposes keyboard-focusable primary language controls", async () => {
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    const en = screen.getByRole("button", { name: "English" });
    en.focus();
    expect(en).toHaveFocus();
  });

  it("does not show confidential financial model content", () => {
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    expect(screen.queryByText(/FINANCIAL MODEL REQUIRED/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign the SAFE Note/i)).not.toBeInTheDocument();
  });

  it("shows funding and team safe fallbacks without empty cards", () => {
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /Investor Discussions/i })).toBeInTheDocument();
    expect(
      screen.getByText(/founder-led, combining product development/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Sign SAFE/i)).not.toBeInTheDocument();
  });

  it("renders hero operating-system visual", () => {
    render(
      <MemoryRouter>
        <InvestorsV2 />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/From fragmented inputs to an operating system/i)
    ).toBeInTheDocument();
  });
});

