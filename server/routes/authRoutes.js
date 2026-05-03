import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";
import { sendWelcomeEmail } from "../utils/email.js";

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanName = typeof name === "string" ? name.trim() : "";
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: "Valid email and password (min 6 chars) required" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: cleanName,
      email: email.toLowerCase(),
      passwordHash,
    });
    const token = signToken(user._id.toString());
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });

    void sendWelcomeEmail({ to: user.email, name: user.name }).catch((e) => {
      console.error("[welcome email]", e.message);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = signToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select("email name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

export default router;
