import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, ".env");
dotenv.config({ path: envPath });

if (!fs.existsSync(envPath)) {
  console.error(
    "\n[!] Missing file: server/.env\n    Create it by copying server/.env.example:\n    copy .env.example .env   (PowerShell: Copy-Item .env.example .env)\n    Then edit server/.env with your MongoDB Atlas URI and JWT_SECRET.\n"
  );
}

const app = express();
const clientOrigin = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: clientOrigin.split(",").map((s) => s.trim()),
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", contactRoutes);

const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(path.join(clientDist, "index.html"))) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(404).json({ message: "Not found" });
    }
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error(
    "Missing MONGODB_URI. Put it in server/.env (see server/.env.example). Atlas → Connect → Drivers → copy connection string."
  );
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET. Add a long random string to server/.env");
  process.exit(1);
}

const PORT = Number(process.env.PORT) || 5000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    if (String(mongoUri).includes("CLUSTER.mongodb.net")) {
      console.error(
        "\nTip: MONGODB_URI must use your real Atlas host from the connection string (e.g. cluster0.xxxxx.mongodb.net), not the placeholder text CLUSTER.\n"
      );
    }
    process.exit(1);
  });
