import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InvestorQA } from "./InvestorQA";
import {
  investorQaCopy,
  investorQaItems,
  wordCount,
} from "@/content/investor/v3/investorQa";

describe("InvestorQA", () => {
  it("opens the first question by default and keeps a single panel", () => {
    render(<InvestorQA locale="en" />);
    const first = screen.getByRole("button", {
      name: /Why invest in Cardbey when Amazon/i,
    });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/enormous resources already exist/i)).toBeVisible();
    expect(screen.getByText(/part of the opportunity/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /What exactly is Cardbey/i })
    );
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: /What exactly is Cardbey/i })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("renders 15 questions with category labels", () => {
    render(<InvestorQA locale="en" />);
    expect(
      screen.getByText(/Opportunity, thesis & competition/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Defensibility & business model/i)).toBeInTheDocument();
    expect(screen.getByText(/Evidence & execution/i)).toBeInTheDocument();
    expect(screen.getByText(/Scale, risk & investor outcome/i)).toBeInTheDocument();
    expect(investorQaItems).toHaveLength(15);
  });

  it("orders opportunity before mechanism, competition and possible defensibility", () => {
    expect(investorQaItems.map((q) => q.id)).toEqual([
      "competition",
      "opportunity",
      "what-is",
      "problem",
      "why-now",
      "incumbents",
      "moat",
      "first-market",
      "make-money",
      "what-exists",
      "market-evidence",
      "why-capital",
      "use-of-seed",
      "global-scale",
      "risk-return",
    ]);
    expect(investorQaCopy.categories.thesis.en).toBe(
      "Opportunity, thesis & competition"
    );
    expect(investorQaCopy.categories.thesis.vi).toBe(
      "Cơ hội, luận điểm & cạnh tranh"
    );
  });

  it("keeps answers conservative on traction and returns", () => {
    const blob = investorQaItems.map((q) => q.answer.en).join(" ");
    expect(blob).toMatch(/resource aggregation accelerator/i);
    expect(blob).toMatch(/not established/i);
    expect(blob).toMatch(/no guaranteed return/i);
    expect(blob).not.toMatch(/aggregation is the moat/i);
    expect(blob).not.toMatch(/speed is Cardbey'?s moat/i);
    expect(blob).toMatch(/A\$3 million/i);
    expect(blob).not.toMatch(/A\$36M|A\$216M|A\$900M/);
    expect(blob).not.toMatch(/FOUNDER TO CONFIRM/i);
    expect(blob).toMatch(
      /Moat protects captured value\. Opportunity creates the possibility of value in the first place\./
    );
    expect(
      blob.match(/Moat protects captured value/gi) ?? []
    ).toHaveLength(1);
  });

  it("renders the opportunity question in EN and VI", () => {
    const { unmount } = render(<InvestorQA locale="en" />);
    expect(
      screen.getByRole("button", {
        name: /If large platforms have more capital, technology and distribution/i,
      })
    ).toBeInTheDocument();
    unmount();
    render(<InvestorQA locale="vi" />);
    expect(
      screen.getByRole("button", {
        name: /Nếu các nền tảng lớn có nhiều vốn, công nghệ và khả năng phân phối hơn/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cơ hội, luận điểm & cạnh tranh/i)
    ).toBeInTheDocument();
  });

  it("renders VI copy without mixing English questions", () => {
    render(<InvestorQA locale="vi" />);
    expect(
      screen.getByRole("button", {
        name: /Tại sao đầu tư vào Cardbey khi đã có Amazon/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Vẫn còn câu hỏi/i)).toBeInTheDocument();
  });

  it("keeps EN answers in the 60–130 word band", () => {
    for (const item of investorQaItems) {
      const n = wordCount(item.answer.en);
      expect(n, item.id).toBeGreaterThanOrEqual(60);
      expect(n, item.id).toBeLessThanOrEqual(130);
    }
  });

  it("maintains EN/VI parity on every Q&A string", () => {
    for (const item of investorQaItems) {
      expect(item.question.vi.length).toBeGreaterThan(0);
      expect(item.answer.vi.length).toBeGreaterThan(0);
      for (const link of item.links || []) {
        expect(link.label.vi.length).toBeGreaterThan(0);
      }
    }
  });
});
