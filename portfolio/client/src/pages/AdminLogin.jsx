import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle, HiOutlineLockClosed } from "react-icons/hi";
import api from "../services/api.js";

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_name", data.name);
      navigate("/admin");
    } catch {
      setError(t("admin.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-800 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="h-12 w-12 rounded-xl bg-navy-800 text-terracotta-400 flex items-center justify-center text-2xl mb-6">
          <HiOutlineLockClosed />
        </div>
        <h1 className="font-display text-xl font-bold text-navy-800 mb-6">
          {t("admin.loginTitle")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">
              {t("admin.email")}
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-navy-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 mb-1.5 block">
              {t("admin.password")}
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-navy-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 text-red-500 text-sm font-medium">
              <HiOutlineExclamationCircle /> {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? t("admin.loggingIn") : t("admin.login")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
