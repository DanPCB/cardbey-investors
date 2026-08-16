import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactFounderModal, {
  REQUEST_MATERIALS,
  resolveContactApiPath,
} from "./ContactFounderModal";

describe("ContactFounderModal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

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

  it("requires a message and submits a general enquiry once", async () => {
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
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      requestType: "GENERAL_INVESTOR_ENQUIRY",
    });
    expect(await screen.findByText(/Message received/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Thank you for contacting Cardbey/i)
    ).toBeInTheDocument();
  });

  it("marks investor-material requests and prefills the message without overwriting", async () => {
    const onSubmit = vi.fn(async () => undefined);
    render(
      <ContactFounderModal open onClose={() => undefined} lang="en" onSubmit={onSubmit} />
    );
    fireEvent.click(screen.getByRole("button", { name: /Request investor materials/i }));
    expect(screen.getByLabelText(/Message/i)).toHaveValue(
      "I'd like to request Cardbey investor materials."
    );
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "I'd like to request Cardbey investor materials.\nAlso include SAFE terms." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0].requestType).toBe(REQUEST_MATERIALS);
  });

  it("keeps the form open with a friendly error and does not launch mailto on API failure", async () => {
    const loc = { href: "https://investors.cardbey.com/" };
    vi.stubGlobal("location", loc);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("NetworkError when attempting to fetch resource.");
      })
    );
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        email="founder@cardbey.com"
        lang="en"
        apiPath="https://cardbey-inv-server.onrender.com/api/contact"
      />
    );
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Interested in the seed round." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(/We couldn't send your message just now/i);
    expect(screen.queryByText(/NetworkError/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/i)).toHaveValue("Ada Lovelace");
    expect(screen.getByLabelText(/Message/i)).toHaveValue("Interested in the seed round.");
    expect(loc.href).not.toMatch(/^mailto:/);
    expect(screen.getByRole("button", { name: /Send message/i })).toBeEnabled();
  });

  it("shows the Vietnamese failure copy without launching mailto", async () => {
    const loc = { href: "https://investors.cardbey.com/" };
    vi.stubGlobal("location", loc);
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 503, json: async () => ({}) })));
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        email="founder@cardbey.com"
        lang="vi"
        apiPath="https://cardbey-inv-server.onrender.com/api/contact"
      />
    );
    fireEvent.change(screen.getByLabelText(/Họ và tên/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Lời nhắn/i), {
      target: { value: "Xin thông tin vòng seed." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Gửi liên hệ/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/Hiện tại chưa thể gửi tin nhắn/i);
    expect(loc.href).not.toMatch(/^mailto:/);
  });

  it("only shows success after the server confirms acceptance", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      }))
    );
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        lang="en"
        apiPath="https://cardbey-inv-server.onrender.com/api/contact"
      />
    );
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    expect(await screen.findByText(/Message received/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Send message/i })).not.toBeInTheDocument();
  });

  it("does not send a second request while the first is in progress", async () => {
    let finish;
    const fetchMock = vi.fn(
      () =>
        new Promise((resolve) => {
          finish = () =>
            resolve({
              ok: true,
              status: 200,
              json: async () => ({ ok: true }),
            });
        })
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <ContactFounderModal
        open
        onClose={() => undefined}
        lang="en"
        apiPath="https://cardbey-inv-server.onrender.com/api/contact"
      />
    );
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    fireEvent.click(screen.getByRole("button", { name: /Send message|Sending/i }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    finish();
    expect(await screen.findByText(/Message received/i)).toBeInTheDocument();
  });

  it("resolves the contact API path from VITE_API_BASE shapes", () => {
    expect(resolveContactApiPath(undefined)).toBe("/api/contact");
    expect(resolveContactApiPath("https://cardbey-inv-server.onrender.com/api")).toBe(
      "https://cardbey-inv-server.onrender.com/api/contact"
    );
    expect(resolveContactApiPath("http://localhost:8787")).toBe("http://localhost:8787/api/contact");
  });
});
