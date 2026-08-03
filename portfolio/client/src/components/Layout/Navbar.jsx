import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useLanguage } from "../../context/LanguageContext.jsx";

const NAV_KEYS = ["about", "experience", "projects", "skills", "contact"];

const Navbar = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-section flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-display text-lg font-extrabold text-navy-800 tracking-tight"
        >
          DPCP<span className="text-terracotta-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="text-sm font-medium text-navy-700 hover:text-terracotta-600 transition-colors"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            aria-label="Changer de langue"
            className="text-sm font-semibold text-navy-800 border border-navy-200 rounded-full px-3 py-1 hover:border-terracotta-500 hover:text-terracotta-600 transition-colors"
          >
            {language === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="btn-primary !px-5 !py-2 text-sm"
          >
            {t("nav.cta")}
          </button>
        </div>

        <button
          className="md:hidden text-navy-800 text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className="text-left py-2 text-navy-700 font-medium border-b border-navy-50"
                >
                  {t(`nav.${key}`)}
                </button>
              ))}
              <button
                onClick={toggleLanguage}
                className="text-left py-2 text-navy-700 font-medium"
              >
                {language === "fr" ? "English" : "Français"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
