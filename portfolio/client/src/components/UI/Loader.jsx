import React from "react";
import { motion } from "framer-motion";

const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen bg-surface" : "py-16"
      }`}
      role="status"
      aria-label="Chargement en cours"
    >
      <motion.div
        className="relative h-12 w-12"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <span className="absolute inset-0 rounded-full border-4 border-navy-100" />
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-terracotta-500" />
      </motion.div>
    </div>
  );
};

export default Loader;
