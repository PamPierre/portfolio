import React from "react";
import { useTranslation } from "react-i18next";
import {
  HiOutlineClipboardList,
  HiOutlineCloud,
  HiOutlineCode,
  HiOutlineHeart,
} from "react-icons/hi";
import AnimatedSection from "../UI/AnimatedSection.jsx";

const skillGroups = [
  {
    key: "management",
    icon: HiOutlineClipboardList,
    items: [
      "Méthodologies agiles",
      "Planification / Sprints",
      "Gestion des risques",
      "Coordination d'équipe",
      "Reporting client",
      "Ateliers fonctionnels",
    ],
  },
  {
    key: "data",
    icon: HiOutlineCloud,
    items: ["AWS (S3, MWAA)", "Airflow", "PostgreSQL", "Power BI / Looker", "Odoo ERP"],
  },
  {
    key: "languages",
    icon: HiOutlineCode,
    items: ["Python", "SQL", "Jira / Trello", "Git / GitHub", "Specs fonctionnelles", "Recettage / UAT"],
  },
  {
    key: "soft",
    icon: HiOutlineHeart,
    items: ["Leadership", "Rigueur & autonomie", "Esprit analytique", "Pédagogie", "Résilience"],
  },
];

const Skills = () => {
  const { t } = useTranslation();
  const categories = t("skills.categories", { returnObjects: true });

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="container-section">
        <AnimatedSection className="max-w-2xl mb-12">
          <span className="section-label">{t("skills.label")}</span>
          <h2 className="section-title">{t("skills.title")}</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <AnimatedSection key={group.key} delay={i * 0.1}>
                <div className="card p-6 h-full hover:shadow-card-hover hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-navy-800 text-terracotta-400 flex items-center justify-center text-2xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-navy-800 mb-4">
                    {categories[group.key]}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-ink/70 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
