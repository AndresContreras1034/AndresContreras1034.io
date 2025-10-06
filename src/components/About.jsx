import React from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.jpg";
import Pzlita from "../assets/Pzlita.png";
import "../styles/About.css";

const About = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 relative"
    >
      {/* Imagen principal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-full overflow-hidden shadow-lg"
      >
        <img
          src={profilePic}
          alt="Andrés Méndez"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 relative"
      >
        {/* Título con Pzlita como icono */}
        <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-4 inline-flex items-center relative">
          About Me
          <motion.img
            src={Pzlita}
            alt="Pzlita"
            className="pzlita"
            initial={{ opacity: 0, x: 2, y: -1 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>

        <p className="text-gray-200 mb-4">
          I’m a backend developer and data analyst with experience building
          robust and efficient solutions. I'm passionate about transforming data
          into valuable insights and creating applications that streamline
          processes and enable data-driven decision-making.
        </p>
        <p className="text-gray-200">
          I'm always looking to learn new technologies, improve my skills, and
          contribute to challenging projects that make a real impact.
        </p>
      </motion.div>
    </section>
  );
};

export default About;




