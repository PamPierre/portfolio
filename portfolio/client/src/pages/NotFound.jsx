import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-display text-8xl font-extrabold text-navy-800/10">404</p>
        <h1 className="font-display text-2xl font-bold text-navy-800 -mt-6 mb-2">
          {t("notFound.title")}
        </h1>
        <p className="text-ink/70 mb-8">{t("notFound.subtitle")}</p>
        <Link to="/" className="btn-primary">
          {t("notFound.cta")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
