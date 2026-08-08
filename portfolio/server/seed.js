/**
 * Script d'initialisation : crée le compte admin et importe les données de
 * démonstration (projets, expériences, articles) depuis les fichiers JSON
 * du client (client/src/data/json/), pour éviter toute duplication entre
 * le contenu affiché en mode "hors-ligne" (fallback) et la base de données.
 * Usage : npm run seed
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Experience from "./models/Experience.js";
import Article from "./models/Article.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientJsonDir = path.join(__dirname, "..", "client", "src", "data", "json");

const readJson = (file) => {
  const filePath = path.join(clientJsonDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Fichier introuvable, ignoré : ${filePath}`);
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// --- Projets : mappe le schéma "front" (STAR) directement sur le modèle Mongoose ---
const mapProject = (p) => ({
  slug: p.slug,
  title: p.title,
  client: p.client || "",
  category: p.category || "",
  categoryIcon: p.categoryIcon || "📦",
  status: p.status || "Terminé",
  startDate: p.startDate || "",
  endDate: p.endDate || "",
  situation: p.situation || { fr: "", en: "" },
  task: p.task || { fr: "", en: "" },
  action: p.action || { fr: "", en: "" },
  results: p.results || { fr: "", en: "" },
  technologies: p.technologies || [],
  metrics: p.metrics || {},
  imageUrl: p.imageUrl || "",
  link: p.link || "",
});

const mapExperience = (e, index) => ({
  role: e.role,
  company: e.company,
  date: e.date,
  location: e.location,
  points: e.points,
  order: index,
});

const mapArticle = (a, index) => ({
  title: a.title,
  source: a.source,
  sourceUrl: a.sourceUrl,
  imageUrl: a.imageUrl || "",
  excerpt: a.excerpt || { fr: "", en: "" },
  date: a.date || "",
  order: index,
});

const seedCollection = async (Model, name, items) => {
  const count = await Model.countDocuments();
  if (count > 0) {
    console.log(`ℹ️ ${name} déjà présents (${count}), aucune insertion.`);
    return;
  }
  if (!items.length) {
    console.log(`ℹ️ Aucune donnée à importer pour ${name}.`);
    return;
  }
  await Model.insertMany(items);
  console.log(`✅ ${items.length} ${name} insérés.`);
};

const run = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL?.toLowerCase() });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Djibril Pierre Clavair Pamousso",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("✅ Compte admin créé.");
  } else {
    console.log("ℹ️ Compte admin déjà existant, aucune action.");
  }

  const projects = readJson("projects.json").map(mapProject);
  const experiences = readJson("experience.json").map(mapExperience);
  const articles = readJson("news.json").map(mapArticle);

  await seedCollection(Project, "projets", projects);
  await seedCollection(Experience, "expériences", experiences);
  await seedCollection(Article, "articles", articles);

  console.log("🌱 Seed terminé.");
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Erreur lors du seed :", err);
  process.exit(1);
});
