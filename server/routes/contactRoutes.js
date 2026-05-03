import express from "express";
import { sendContactNotification } from "../utils/email.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (cleanName.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters." });
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ message: "A valid email is required." });
    }
    if (cleanMessage.length < 10) {
      return res.status(400).json({ message: "Message must be at least 10 characters." });
    }
    if (cleanMessage.length > 5000) {
      return res.status(400).json({ message: "Message is too long." });
    }

    await sendContactNotification({
      senderName: cleanName,
      senderEmail: cleanEmail,
      message: cleanMessage,
    });
    res.json({ ok: true, message: "Message sent." });
  } catch (err) {
    if (err.code === "MAIL_NOT_CONFIGURED") {
      return res.status(503).json({
        message: "Email is not configured on the server. Set Gmail or SMTP in server/.env.",
      });
    }
    console.error("[contact]", err);
    res.status(500).json({ message: "Could not send message. Try again later." });
  }
});

export default router;
