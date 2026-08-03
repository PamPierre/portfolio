import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

/**
 * Petit effet de texte "tapé" cyclant entre les rôles (Ingénieur Data,
 * Entrepreneur, Formateur) sans dépendance externe.
 */
const TypedRoles = ({ roles }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= roles.length) setIndex(0);

    const current = roles[index % roles.length];
    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? 40 : 90
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  const current = roles[index % roles.length];

  return (
    <span className="text-terracotta-500">
      {current.substring(0, subIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-terracotta-500 ml-1 align-middle animate-pulse" />
    </span>
  );
};

/** Motif d'arrière-plan évoquant un réseau de données / connexions panafricaines. */
const NetworkBackground = () => (
  <svg
    className="absolute inset-0 h-full w-full opacity-[0.35]"
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {[
      [80, 120, 260, 200],
      [260, 200, 480, 90],
      [480, 90, 700, 180],
      [260, 200, 340, 380],
      [340, 380, 560, 420],
      [560, 420, 700, 300],
      [480, 90, 560, 420],
      [80, 120, 340, 380],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#E67E22"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        className="animate-pulseLine"
      />
    ))}
    {[
      [80, 120],
      [260, 200],
      [480, 90],
      [700, 180],
      [340, 380],
      [560, 420],
      [700, 300],
    ].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={i % 3 === 0 ? 6 : 4}
        fill={i % 2 === 0 ? "#E67E22" : "#0A2540"}
        className="animate-floatSlow"
        style={{ animationDelay: `${i * 0.4}s` }}
      />
    ))}
  </svg>
);

const Hero = () => {
  const { t } = useTranslation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-navy-800 overflow-hidden pt-24"
    >
      <NetworkBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-800/80 to-navy-800" />

      <div className="container-section relative z-10 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-terracotta-300 mb-6 tracking-wide">
            {t("hero.badge")}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-6">
            {t("hero.title")}
          </h1>

          <p className="font-display text-2xl sm:text-3xl font-semibold text-navy-100 mb-6 h-10">
            <TypedRoles roles={t("hero.roles", { returnObjects: true })} />
          </p>

          <p className="text-lg text-navy-200 max-w-xl mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("projects")} className="btn-primary">
              {t("hero.ctaPrimary")}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-display font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              {t("hero.ctaSecondary")}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl rotate-3">
            <img
              src="/assets/profile-placeholder.jpg"
              alt="Djibril Pierre Clavair Pamousso"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.classList.add(
                  "bg-gradient-to-br",
                  "from-navy-600",
                  "to-terracotta-600"
                );
              }}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl bg-terracotta-500 px-5 py-3 shadow-xl -rotate-2">
            <p className="font-display font-bold text-white text-sm">GSDA</p>
            <p className="text-terracotta-100 text-xs">Grand Salon de la Data</p>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-terracotta-400 transition-colors z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <HiArrowDown size={26} />
      </motion.button>
    </section>
  );
};

export default Hero;
