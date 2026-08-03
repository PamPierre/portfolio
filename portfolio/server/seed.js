/**
 * Script d'initialisation : crée le compte admin et quelques projets de démo
 * à partir des variables d'environnement et du CV fourni.
 * Usage : npm run seed
 */
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Project from "./models/Project.js";

dotenv.config();

const projectsSeed = [
  {
    slug: "gsda",
    title: {
      fr: "GSDA – Grand Salon de la Data en Afrique",
      en: "GSDA – Grand Salon de la Data en Afrique",
    },
    client: "Africa Data Entry",
    context: {
      fr: "Créer un événement fédérateur pour l'écosystème data ouest-africain, encore fragmenté et peu visible à l'international.",
      en: "Create a unifying event for the West African data ecosystem, which was still fragmented and lacked international visibility.",
    },
    role: {
      fr: "Promoteur et directeur de l'événement : conception du concept, programmation, coordination des intervenants et des partenaires.",
      en: "Event promoter and director: concept design, programming, coordination of speakers and partners.",
    },
    solution: {
      fr: "Organisation d'un salon de deux jours réunissant décideurs, data scientists et institutions autour de conférences, ateliers et mises en réseau.",
      en: "Organization of a two-day event bringing together decision-makers, data scientists and institutions through talks, workshops and networking.",
    },
    results: {
      fr: "Première édition réussie, positionnement de Djibril comme catalyseur de l'écosystème data en Afrique de l'Ouest.",
      en: "Successful first edition, positioning Djibril as a catalyst for the West African data ecosystem.",
    },
    technologies: ["Gestion de projet", "Événementiel", "Partenariats"],
    featured: true,
    order: 1,
  },
  {
    slug: "fespaco-rtb",
    title: { fr: "Vote digital Fespaco – RTB", en: "Fespaco digital voting – RTB" },
    client: "RTB (Radiodiffusion Télévision du Burkina)",
    context: {
      fr: "Fournir une solution de vote sécurisé en temps réel pour le prix du grand public du Fespaco, avec une forte affluence attendue.",
      en: "Provide a secure, real-time voting solution for the Fespaco audience award, with high expected traffic.",
    },
    role: {
      fr: "Pilotage de la solution, coordination d'une équipe de 4 développeurs, définition des spécifications fonctionnelles et suivi en production.",
      en: "Led the solution, coordinated a team of 4 developers, defined functional specifications and monitored production.",
    },
    solution: {
      fr: "Application de vote digital sécurisée, mise en production avec suivi des opérations en temps réel.",
      en: "Secure digital voting application, deployed with real-time operations monitoring.",
    },
    results: {
      fr: "Vote conduit avec succès malgré la forte affluence, livraison dans les délais impartis.",
      en: "Voting conducted successfully despite high traffic, delivered on schedule.",
    },
    technologies: ["Gestion de projet", "Sécurité", "Temps réel"],
    featured: true,
    order: 2,
  },
  {
    slug: "fnpsl",
    title: {
      fr: "Digitalisation du marketing – FNPSL",
      en: "Marketing digitalization – FNPSL",
    },
    client: "FNPSL",
    context: {
      fr: "Automatiser les campagnes marketing et centraliser la gestion des leads et de la communication.",
      en: "Automate marketing campaigns and centralize lead and communication management.",
    },
    role: {
      fr: "Pilotage du développement, animation des réunions client, priorisation des fonctionnalités et gestion des risques.",
      en: "Led development, facilitated client meetings, prioritized features and managed risks.",
    },
    solution: {
      fr: "Application web sur mesure de gestion de campagnes et de leads.",
      en: "Custom web application for campaign and lead management.",
    },
    results: {
      fr: "Livraison dans les délais, centralisation effective de la communication marketing.",
      en: "Delivered on time, effective centralization of marketing communication.",
    },
    technologies: ["Gestion de projet", "Web", "CRM"],
    featured: true,
    order: 3,
  },
  {
    slug: "canprono",
    title: { fr: "CanProno", en: "CanProno" },
    client: "Projet personnel",
    context: {
      fr: "Concevoir une application de pronostics sportifs avec système de récompenses pour les utilisateurs.",
      en: "Design a sports prediction application with a user reward system.",
    },
    role: {
      fr: "Conception et management de l'équipe de développement (front, back, test).",
      en: "Design and management of the development team (front, back, testing).",
    },
    solution: {
      fr: "Application web de pronostics sportifs avec planification agile et déploiement continu.",
      en: "Sports prediction web app with agile planning and continuous deployment.",
    },
    results: {
      fr: "Produit fonctionnel déployé, base d'utilisateurs engagée par le système de récompenses.",
      en: "Functional product deployed, user base engaged through the reward system.",
    },
    technologies: ["Product management", "Agile", "Full-stack"],
    featured: true,
    order: 4,
  },
  {
    slug: "rocket4sales",
    title: {
      fr: "Architecture data Rocket4Sales",
      en: "Rocket4Sales data architecture",
    },
    client: "Rocket4Sales",
    context: {
      fr: "Structurer le pôle data de l'entreprise et intégrer des flux financiers (Revolut, Qonto) pour le pilotage décisionnel.",
      en: "Structure the company's data department and integrate financial flows (Revolut, Qonto) for decision-making.",
    },
    role: {
      fr: "Data Engineer & Lead Développeur : définition de l'architecture, orchestration ETL, optimisation base de données.",
      en: "Data Engineer & Lead Developer: architecture design, ETL orchestration, database optimization.",
    },
    solution: {
      fr: "Architecture data cloud native sur AWS, orchestration ETL avec Airflow, optimisation PostgreSQL et tableaux de bord décisionnels.",
      en: "Cloud-native data architecture on AWS, ETL orchestration with Airflow, PostgreSQL optimization and BI dashboards.",
    },
    results: {
      fr: "Pôle data structuré et autonome, nouveaux data engineers formés et accompagnés.",
      en: "Structured and autonomous data department, new data engineers trained and mentored.",
    },
    technologies: ["AWS", "Airflow", "PostgreSQL", "Power BI"],
    featured: true,
    order: 5,
  },
];

const run = async () => {
  await connectDB();

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL?.toLowerCase() });
  if (!existing) {
    await User.create({
      name: process.env.ADMIN_NAME || "Djibril Pierre Clavair Pamousso",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("✅ Compte admin créé.");
  } else {
    console.log("ℹ️ Compte admin déjà existant, aucune action.");
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projectsSeed);
    console.log(`✅ ${projectsSeed.length} projets de démonstration insérés.`);
  } else {
    console.log("ℹ️ Des projets existent déjà, aucune insertion.");
  }

  console.log("🌱 Seed terminé.");
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Erreur lors du seed :", err);
  process.exit(1);
});
