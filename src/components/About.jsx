import React from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.jpg";
import "../styles/About.css";

const About = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
    >
      {/* Image */}
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

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 mb-4">
          I’m a backend developer and data analyst with experience building
          robust and efficient solutions. I'm passionate about transforming data
          into valuable insights and creating applications that streamline
          processes and enable data-driven decision-making.
        </p>
        <p className="text-gray-700">
          I'm always looking to learn new technologies, improve my skills, and
          contribute to challenging projects that make a real impact.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
