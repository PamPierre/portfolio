import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimatedSection from "../UI/AnimatedSection.jsx";

const Experience = () => {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true });

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="container-section">
        <AnimatedSection>
          <span className="section-label">{t("experience.label")}</span>
          <h2 className="section-title">{t("experience.title")}</h2>
        </AnimatedSection>

        <div className="relative mt-14">
          {/* Ligne verticale du "pipeline" — évoque le flux de données entre les postes */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-navy-100 md:-translate-x-1/2" />

          <div className="space-y-14">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.company + item.date}
                  className={`relative md:flex ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start gap-8`}
                >
                  {/* Marqueur */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-0 md:left-1/2 top-1 h-8 w-8 -translate-x-1/2 rounded-full bg-terracotta-500 border-4 border-white shadow-card flex items-center justify-center text-white text-xs font-bold z-10"
                  >
                    {items.length - i}
                  </motion.div>

                  <div className="hidden md:block md:w-1/2" />

                  <AnimatedSection
                    delay={0.1}
                    y={20}
                    className="pl-12 md:pl-0 md:w-1/2"
                  >
                    <div className="card p-6 hover:shadow-card-hover hover:-translate-y-1">
                      <p className="text-xs font-semibold text-terracotta-600 uppercase tracking-wide mb-1">
                        {item.date} · {item.location}
                      </p>
                      <h3 className="font-display font-bold text-navy-800 text-lg">
                        {item.role}
                      </h3>
                      <p className="text-navy-500 font-medium mb-3">{item.company}</p>
                      <ul className="space-y-1.5">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="text-sm text-ink/75 flex gap-2 leading-relaxed"
                          >
                            <span className="text-terracotta-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-terracotta-500 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
