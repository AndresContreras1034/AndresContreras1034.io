// src/components/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/Skills.css";

// Importar los íconos desde src/assets
import pythonIcon from "../assets/python.png";
import javaIcon from "../assets/java.png";
import jsIcon from "../assets/javascript.png";
import cppIcon from "../assets/cpp.png";
import sqlIcon from "../assets/sql.png";
import reactIcon from "../assets/react.png";
import springIcon from "../assets/springboot.png";
import tailwindIcon from "../assets/tailwind.png";
import gitIcon from "../assets/git.png";
import powerbiIcon from "../assets/powerbi.png";

// Array de skills
const skillsData = [
  { name: "Python", icon: pythonIcon },
  { name: "Java", icon: javaIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "C++", icon: cppIcon },
  { name: "SQL", icon: sqlIcon },
  { name: "React", icon: reactIcon },
  { name: "Spring Boot", icon: springIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Git", icon: gitIcon },
  { name: "Power BI", icon: powerbiIcon },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-10 text-center text-white"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skillsData.map((skill) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-12 h-12 mb-2"
            />
            <p className="text-gray-200 font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
