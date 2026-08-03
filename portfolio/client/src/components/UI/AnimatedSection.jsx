import React from "react";
import { motion } from "framer-motion";

/**
 * Wrapper générique pour révéler une section au scroll (fade-in + translation).
 * `as` permet de choisir la balise sémantique (section, div, article...).
 */
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  y = 40,
  as = "div",
  id,
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;
