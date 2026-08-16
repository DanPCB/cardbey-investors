import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContactFounderModal, { resolveContactApiPath } from "./ContactFounderModal";

describe("ContactFounderModal", () => {
  it("does not offer a PDF download when no hosted deck URL exists", () => {
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        email="founder@cardbey.com"
        lang="en"
      />
    );
    expect(screen.queryByRole("link", { name: /Investor Deck/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Request investor materials/i })).toBeInTheDocument();
    expect(screen.getByText(/Provided following the request/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email/i })).toHaveAttribute(
      "href",
      "mailto:founder@cardbey.com"
    );
    expect(screen.getByRole("link", { name: /Call/i })).toHaveAttribute("href", "tel:+61451867365");
  });

  it("does not treat a relative /files path as a real deck", () => {
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        deckUrl="/files/Cardbey_Investor_Pitch_Pack_English.pdf"
        lang="en"
      />
    );
    expect(screen.queryByRole("link", { name: /Investor Deck/i })).not.toBeInTheDocument();
  });

  it("requires a message and submits once", async () => {
    const onSubmit = vi.fn(async () => undefined);
    render(
      <ContactFounderModal open onClose={() => undefined} lang="en" onSubmit={onSubmit} />
    );
    expect(screen.getByLabelText(/Message/i)).toBeRequired();
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Please send materials." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/Sent\. Thank you/i)).toBeInTheDocument();
  });

  it("resolves the contact API path from VITE_API_BASE shapes", () => {
    expect(resolveContactApiPath(undefined)).toBe("/api/contact");
    expect(resolveContactApiPath("https://cardbey-inv-server.onrender.com/api")).toBe(
      "https://cardbey-inv-server.onrender.com/api/contact"
    );
    expect(resolveContactApiPath("http://localhost:8787")).toBe("http://localhost:8787/api/contact");
  });
});
