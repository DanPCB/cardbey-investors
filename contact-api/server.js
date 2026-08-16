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

function env(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value != null && String(value).trim() !== "") return String(value).trim();
  }
  return "";
}

function envFlag(raw, fallback = false) {
  if (raw == null || raw === "") return fallback;
  const normalized = String(raw).trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

/** Accept Cardbey Core MAIL_* keys or the contact-api SMTP_* aliases. */
function mailConfig() {
  const host = env("MAIL_HOST", "SMTP_HOST");
  const user = env("MAIL_USER", "SMTP_USER");
  const pass = env("MAIL_PASS", "SMTP_PASS");
  const portRaw = env("MAIL_PORT", "SMTP_PORT");
  const port = Number(portRaw || 465);
  const secureDefault = port === 465;
  const fromEmail = env("MAIL_FROM_EMAIL", "SMTP_FROM", "MAIL_USER", "SMTP_USER");
  const fromName = env("MAIL_FROM_NAME") || "Cardbey Investor";
  return {
    host,
    user,
    pass,
    port,
    secure: envFlag(env("MAIL_SECURE", "SMTP_SECURE"), secureDefault),
    insecureTls: envFlag(env("MAIL_INSECURE_TLS"), false),
    fromEmail,
    fromName,
    to: env("EMAIL_TO", "MAIL_TO") || fromEmail,
  };
}

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
    const mail = mailConfig();

    if (!mail.host || !mail.user || !mail.pass || !mail.fromEmail) {
      logEvent("contact_misconfigured");
      return res.status(503).json({ ok: false, error: "Unavailable" });
    }

    const transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: { user: mail.user, pass: mail.pass },
      ...(mail.insecureTls ? { tls: { rejectUnauthorized: false } } : {}),
    });

    const kindLabel =
      requestType === REQUEST_MATERIALS ? "Investor materials request" : "Investor enquiry";

    await transporter.sendMail({
      from: `"${mail.fromName}" <${mail.fromEmail}>`,
      to: mail.to,
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
