import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();

const PORT = process.env.PORT || 3005;
const REQUEST_GENERAL = "GENERAL_INVESTOR_ENQUIRY";
const REQUEST_MATERIALS = "INVESTOR_MATERIALS";

const DEFAULT_ORIGINS = [
  "https://investors.cardbey.com",
  "https://cardbey-investors.onrender.com",
];

function allowedOrigins() {
  const extra = String(process.env.CORS_ORIGIN || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set([...DEFAULT_ORIGINS, ...extra])];
}

function isAllowedOrigin(origin) {
  return Boolean(origin) && allowedOrigins().includes(origin);
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, false);
      return;
    }
    callback(null, isAllowedOrigin(origin));
  },
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  credentials: false,
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));
app.use(cors(corsOptions));
app.options("/api/contact", cors(corsOptions));

app.use(
  "/api/",
  rateLimit({
    windowMs: 60_000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: "Too many requests" },
  })
);

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(2).max(5000),
  requestType: z.enum([REQUEST_GENERAL, REQUEST_MATERIALS]).optional().default(REQUEST_GENERAL),
  website: z.string().max(0).optional().or(z.literal("")),
});

function logEvent(event, extra = {}) {
  console.info(
    JSON.stringify({
      event,
      ts: new Date().toISOString(),
      ...extra,
    })
  );
}

app.get("/", (_req, res) => res.send("OK"));
app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  const origin = req.headers.origin;
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      logEvent("contact_invalid", { origin: origin || null });
      return res.status(400).json({ ok: false, error: "Invalid payload" });
    }

    if (origin && !isAllowedOrigin(origin)) {
      logEvent("contact_origin_denied", { origin });
      return res.status(403).json({ ok: false, error: "Forbidden" });
    }

    if (parsed.data.website) {
      logEvent("contact_honeypot", { origin: origin || null });
      return res.json({ ok: true });
    }

    const { name, email, message, requestType } = parsed.data;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      logEvent("contact_misconfigured");
      return res.status(503).json({ ok: false, error: "Unavailable" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE ?? "true") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.EMAIL_TO || process.env.SMTP_USER;
    const kindLabel =
      requestType === REQUEST_MATERIALS ? "Investor materials request" : "Investor enquiry";

    await transporter.sendMail({
      from: `"Cardbey Site" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `[${requestType}] ${kindLabel} from ${name}`,
      text: [
        `Request type: ${requestType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    logEvent("contact_accepted", { requestType, origin: origin || null });
    res.json({ ok: true });
  } catch (error) {
    logEvent("contact_failed", {
      origin: origin || null,
      name: error?.name || "Error",
    });
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.listen(PORT, () => {
  logEvent("contact_api_listen", { port: Number(PORT) });
});
