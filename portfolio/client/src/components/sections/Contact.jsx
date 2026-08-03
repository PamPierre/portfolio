import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import AnimatedSection from "../UI/AnimatedSection.jsx";
import api from "../../services/api.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    if (!form.subject.trim()) next.subject = true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-400 ${
      errors[field] ? "border-red-400" : "border-navy-100 focus:border-terracotta-400"
    }`;

  return (
    <section id="contact" className="py-24 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-node-grid bg-[length:24px_24px] opacity-[0.06]" />
      <div className="container-section relative">
        <AnimatedSection className="max-w-xl mb-12">
          <span className="section-label !text-terracotta-400">{t("contact.label")}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-navy-200">{t("contact.subtitle")}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <AnimatedSection delay={0.1}>
            <h3 className="font-display font-semibold text-white uppercase text-sm tracking-wider mb-6">
              {t("contact.infoTitle")}
            </h3>
            <div className="space-y-5">
              <a
                href="mailto:pampierre20@gmail.com"
                className="flex items-center gap-4 text-navy-100 hover:text-terracotta-400 transition-colors"
              >
                <span className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center text-lg shrink-0">
                  <HiOutlineMail />
                </span>
                pampierre20@gmail.com
              </a>
              <a
                href="tel:+22677875435"
                className="flex items-center gap-4 text-navy-100 hover:text-terracotta-400 transition-colors"
              >
                <span className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center text-lg shrink-0">
                  <HiOutlinePhone />
                </span>
                +226 77 87 54 35
              </a>
              <div className="flex items-center gap-4 text-navy-100">
                <span className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center text-lg shrink-0">
                  <HiOutlineLocationMarker />
                </span>
                {t("contact.location")}
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://linkedin.com/in/djibrilpierre-pamousso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center text-lg text-navy-100 hover:bg-terracotta-500 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/PamPierre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center text-lg text-navy-100 hover:bg-terracotta-500 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                    {t("contact.form.name")}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                  {t("contact.form.subject")}
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass("subject")}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass("message")}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 text-sm font-medium"
                >
                  <HiOutlineCheckCircle /> {t("contact.form.success")}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-500 text-sm font-medium"
                >
                  <HiOutlineExclamationCircle /> {t("contact.form.error")}
                </motion.p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
