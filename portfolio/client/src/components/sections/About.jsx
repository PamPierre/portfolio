import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineGlobeAlt, HiOutlineEye, HiOutlineAcademicCap } from "react-icons/hi";
import AnimatedSection from "../UI/AnimatedSection.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import api from "../../services/api.js";

const icons = [HiOutlineGlobeAlt, HiOutlineEye, HiOutlineAcademicCap];

const About = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get("/profile")
      .then((res) => mounted && setBio(res.data.bio))
      .catch(() => {
        // Si l'API n'est pas encore branchée, on affiche la bio par défaut du cahier des charges.
      });
    return () => {
      mounted = false;
    };
  }, []);

  const fallbackBio = {
    fr: "Ingénieur data, formateur et entrepreneur burkinabè, Djibril Pierre Clavair Pamousso est co-fondateur et gérant d'Africa Data Entry. Titulaire d'un Master « Données et Systèmes Connectés » de l'École des Mines de Saint-Étienne, il a débuté sa carrière dans le support technique avant de se spécialiser en ingénierie des données. Il a notamment occupé les fonctions de Data Engineer et de Data Science Manager chez Rocket4Sales à Lyon, où il a contribué à créer et structurer le pôle data de l'entreprise.",
    en: "A Burkinabé data engineer, trainer and entrepreneur, Djibril Pierre Clavair Pamousso is co-founder and manager of Africa Data Entry. Holder of a Master's degree in \"Data and Connected Systems\" from École des Mines de Saint-Étienne, he began his career in technical support before specializing in data engineering. He notably served as Data Engineer and Data Science Manager at Rocket4Sales in Lyon.",
  };

  const displayedBio = bio?.[language] || fallbackBio[language];
  const values = t("about.values", { returnObjects: true });

  return (
    <section id="about" className="py-24 bg-surface-alt">
      <div className="container-section">
        <AnimatedSection>
          <span className="section-label">{t("about.label")}</span>
          <h2 className="section-title max-w-2xl">{t("about.title")}</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 mt-10 items-start">
          <AnimatedSection delay={0.1}>
            <p className="text-ink/80 leading-relaxed text-lg mb-8">{displayedBio}</p>
            <blockquote className="relative border-l-4 border-terracotta-500 pl-6 py-2 italic text-navy-800 font-display text-xl font-medium">
              {t("about.quote")}
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="space-y-4">
            <h3 className="font-display font-semibold text-navy-800 uppercase text-sm tracking-wider mb-2">
              {t("about.valuesTitle")}
            </h3>
            {values.map((value, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={value.title}
                  className="card p-5 flex gap-4 items-start hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <div className="shrink-0 h-11 w-11 rounded-lg bg-terracotta-50 text-terracotta-600 flex items-center justify-center text-xl">
                    <Icon />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-navy-800">{value.title}</p>
                    <p className="text-sm text-ink/70 mt-1">{value.desc}</p>
                  </div>
                </div>
              );
            })}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
