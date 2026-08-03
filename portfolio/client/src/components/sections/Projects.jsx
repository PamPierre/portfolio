import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiOutlineArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import AnimatedSection from "../UI/AnimatedSection.jsx";
import Loader from "../UI/Loader.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import api from "../../services/api.js";

// Palette cyclique pour les vignettes de projet sans image (dégradés de la charte)
const gradients = [
  "from-navy-700 to-navy-900",
  "from-terracotta-500 to-terracotta-700",
  "from-navy-600 to-terracotta-600",
  "from-navy-800 to-navy-600",
  "from-terracotta-600 to-navy-800",
];

// Fallback statique basé sur le cahier des charges, utilisé si l'API n'est pas encore branchée.
const fallbackProjects = [
  {
    _id: "gsda",
    slug: "gsda",
    title: { fr: "GSDA – Grand Salon de la Data en Afrique", en: "GSDA – Grand Salon de la Data en Afrique" },
    client: "Africa Data Entry",
    context: {
      fr: "Créer un événement fédérateur pour l'écosystème data ouest-africain.",
      en: "Create a unifying event for the West African data ecosystem.",
    },
    role: { fr: "Promoteur et directeur de l'événement.", en: "Event promoter and director." },
    solution: {
      fr: "Organisation d'un salon de deux jours réunissant décideurs et experts data.",
      en: "Two-day event bringing together decision-makers and data experts.",
    },
    results: { fr: "Première édition réussie.", en: "Successful first edition." },
    technologies: ["Gestion de projet", "Événementiel"],
  },
  {
    _id: "fespaco",
    slug: "fespaco-rtb",
    title: { fr: "Vote digital Fespaco – RTB", en: "Fespaco digital voting – RTB" },
    client: "RTB",
    context: {
      fr: "Solution de vote sécurisé en temps réel pour le prix du grand public.",
      en: "Secure real-time voting solution for the audience award.",
    },
    role: { fr: "Pilotage d'une équipe de 4 développeurs.", en: "Led a team of 4 developers." },
    solution: { fr: "Application de vote digital sécurisée.", en: "Secure digital voting application." },
    results: { fr: "Vote conduit avec succès.", en: "Voting conducted successfully." },
    technologies: ["Sécurité", "Temps réel"],
  },
  {
    _id: "fnpsl",
    slug: "fnpsl",
    title: { fr: "Digitalisation du marketing – FNPSL", en: "Marketing digitalization – FNPSL" },
    client: "FNPSL",
    context: {
      fr: "Automatiser les campagnes et centraliser la gestion des leads.",
      en: "Automate campaigns and centralize lead management.",
    },
    role: { fr: "Pilotage du développement.", en: "Led development." },
    solution: { fr: "Application web sur mesure.", en: "Custom web application." },
    results: { fr: "Livraison dans les délais.", en: "Delivered on time." },
    technologies: ["Web", "CRM"],
  },
  {
    _id: "canprono",
    slug: "canprono",
    title: { fr: "CanProno", en: "CanProno" },
    client: "Projet personnel",
    context: {
      fr: "Application de pronostics sportifs avec système de récompenses.",
      en: "Sports prediction app with a reward system.",
    },
    role: { fr: "Conception et management de l'équipe.", en: "Design and team management." },
    solution: { fr: "Planification agile et déploiement continu.", en: "Agile planning and continuous deployment." },
    results: { fr: "Produit fonctionnel déployé.", en: "Functional product deployed." },
    technologies: ["Agile", "Full-stack"],
  },
  {
    _id: "rocket4sales",
    slug: "rocket4sales",
    title: { fr: "Architecture data Rocket4Sales", en: "Rocket4Sales data architecture" },
    client: "Rocket4Sales",
    context: { fr: "Structurer le pôle data de l'entreprise.", en: "Structure the company's data department." },
    role: { fr: "Data Engineer & Lead Développeur.", en: "Data Engineer & Lead Developer." },
    solution: {
      fr: "Architecture cloud native AWS, orchestration ETL Airflow.",
      en: "Cloud-native AWS architecture, ETL orchestration with Airflow.",
    },
    results: { fr: "Pôle data structuré et autonome.", en: "Structured and autonomous data department." },
    technologies: ["AWS", "Airflow", "PostgreSQL"],
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [projects, setProjects] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get("/projects")
      .then((res) => mounted && setProjects(res.data.length ? res.data : fallbackProjects))
      .catch(() => mounted && setProjects(fallbackProjects));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects" className="py-24 bg-surface-alt">
      <div className="container-section">
        <AnimatedSection className="max-w-2xl">
          <span className="section-label">{t("projects.label")}</span>
          <h2 className="section-title">{t("projects.title")}</h2>
          <p className="text-ink/70">{t("projects.subtitle")}</p>
        </AnimatedSection>

        {!projects ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, i) => (
              <AnimatedSection key={project._id} delay={(i % 3) * 0.1}>
                <motion.button
                  onClick={() => setSelected(project)}
                  whileHover={{ y: -6 }}
                  className="card w-full text-left overflow-hidden group h-full flex flex-col"
                >
                  <div
                    className={`h-36 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-end p-4 relative overflow-hidden`}
                  >
                    <span className="text-white/90 font-display font-bold text-sm uppercase tracking-wide">
                      {project.client}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display font-bold text-navy-800 text-lg mb-2">
                      {project.title[language]}
                    </h3>
                    <p className="text-sm text-ink/70 leading-relaxed line-clamp-3 mb-4 flex-1">
                      {project.context[language]}
                    </p>
                    <div className="flex items-center gap-1 text-terracotta-600 font-semibold text-sm">
                      {t("projects.cta")}
                      <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-navy-50 p-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-terracotta-600 uppercase tracking-wide mb-1">
                    {selected.client}
                  </p>
                  <h3 className="font-display font-bold text-navy-800 text-2xl">
                    {selected.title[language]}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label={t("projects.modal.close")}
                  className="shrink-0 h-9 w-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-navy-100"
                >
                  <HiX size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-display font-semibold text-navy-800 text-sm uppercase tracking-wide mb-2">
                    {t("projects.modal.context")}
                  </h4>
                  <p className="text-ink/80 leading-relaxed">{selected.context[language]}</p>
                </div>

                {selected.role?.[language] && (
                  <div>
                    <h4 className="font-display font-semibold text-navy-800 text-sm uppercase tracking-wide mb-2">
                      {t("projects.modal.role")}
                    </h4>
                    <p className="text-ink/80 leading-relaxed">{selected.role[language]}</p>
                  </div>
                )}

                {selected.solution?.[language] && (
                  <div>
                    <h4 className="font-display font-semibold text-navy-800 text-sm uppercase tracking-wide mb-2">
                      {t("projects.modal.solution")}
                    </h4>
                    <p className="text-ink/80 leading-relaxed">{selected.solution[language]}</p>
                  </div>
                )}

                {selected.results?.[language] && (
                  <div>
                    <h4 className="font-display font-semibold text-navy-800 text-sm uppercase tracking-wide mb-2">
                      {t("projects.modal.results")}
                    </h4>
                    <p className="text-ink/80 leading-relaxed">{selected.results[language]}</p>
                  </div>
                )}

                {selected.technologies?.length > 0 && (
                  <div>
                    <h4 className="font-display font-semibold text-navy-800 text-sm uppercase tracking-wide mb-3">
                      {t("projects.modal.technologies")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium bg-navy-50 text-navy-700 px-3 py-1.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-terracotta-600 font-semibold text-sm hover:underline"
                  >
                    {selected.link} <HiOutlineExternalLink />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
