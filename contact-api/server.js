import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();

// ----- config -----
const PORT = process.env.PORT || 3005;
const ORIGINS = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);
const corsOptions = ORIGINS.length
  ? { origin: ORIGINS, methods: ["POST"], credentials: false }
  : { origin: true };

// ----- middleware -----
app.use(express.json());
app.use(cors(corsOptions));
app.set("trust proxy", 1); // good practice on Render/Proxies

// simple global rate limit
app.use("/api/", rateLimit({ windowMs: 60_000, max: 10 }));

// validation schema + honeypot
const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  message: z.string().min(2).max(5000),
  website: z.string().max(0).optional().or(z.literal("")) // honeypot field
});

// health check
app.get("/", (req, res) => res.send("OK"));
app.get("/healthz", (req, res) => res.json({ ok: true }));

// main endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid payload" });
    }
    const { name, email, message } = parsed.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE ?? "true") === "true", // 465 true, 587 false
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const to = process.env.EMAIL_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Cardbey Site" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `Investor inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
