import React from "react";
import { motion } from "framer-motion";

import profilePic from "../assets/profile.jpg";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import twitterIcon from "../assets/x.png";
import "../styles/About.css";

const About = () => {
  return (
    <section id="about">
      {/* Imagen principal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={profilePic} alt="Andrés Contreras" />
      </motion.div>

      {/* Contenido de texto */}
      <div className="about-text">
        {/* Título con Pzlita */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Me

        </motion.h2>

        {/* Texto descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          I’m a backend developer and data analyst with experience building
          robust and efficient solutions. I'm passionate about transforming
          data into valuable insights and creating applications that streamline
          processes and enable data-driven decision-making.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          I'm always looking to learn new technologies, improve my skills, and
          contribute to challenging projects that make a real impact.
        </motion.p>

        {/* Íconos sociales */}
        <div className="about-socials">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterIcon} alt="Twitter" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
