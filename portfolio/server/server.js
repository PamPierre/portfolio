import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";

import authRoutes, { profileRouter } from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ----- Middlewares globaux -----
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

// Limite le nombre de requêtes sur les routes sensibles (login, contact) contre le brute-force / spam
const sensitiveRouteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Trop de requêtes, veuillez réessayer plus tard." },
});

// ----- Routes -----
app.use("/api/auth", authRoutes);
app.use("/api/auth/login", sensitiveRouteLimiter);
app.use("/api/profile", profileRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", sensitiveRouteLimiter, contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ----- Gestion des erreurs 404 -----
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable." });
});

// ----- Gestion des erreurs globales -----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT} (${process.env.NODE_ENV || "development"})`);
});
