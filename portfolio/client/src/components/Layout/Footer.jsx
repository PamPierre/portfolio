import React from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-white">
      <div className="container-section py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-lg">
            Djibril Pierre Clavair Pamousso
          </p>
          <p className="text-navy-200 text-sm mt-1">{t("footer.builtWith")}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/djibrilpierre-pamousso"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-navy-200 hover:text-terracotta-400 transition-colors text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/PamPierre"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-navy-200 hover:text-terracotta-400 transition-colors text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:pampierre20@gmail.com"
            aria-label="Email"
            className="text-navy-200 hover:text-terracotta-400 transition-colors text-xl"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="text-navy-300 text-xs">
          © {year} Djibril Pierre Clavair Pamousso — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
