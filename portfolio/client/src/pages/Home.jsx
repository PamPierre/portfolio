import React from "react";
import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import Experience from "../components/sections/Experience.jsx";
import Projects from "../components/sections/Projects.jsx";
import Skills from "../components/sections/Skills.jsx";
import Contact from "../components/sections/Contact.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;
