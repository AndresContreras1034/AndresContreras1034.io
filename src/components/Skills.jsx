// src/components/Skills.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Skills.css";

// Import icons from src/assets
import pythonIcon from "../assets/python.png";
import javaIcon from "../assets/java.png";
import jsIcon from "../assets/javascript.png";
import cppIcon from "../assets/cpp.png";
import cIcon from "../assets/c.png";
import matlabIcon from "../assets/matlab.png";
import htmlIcon from "../assets/html.png";
import cssIcon from "../assets/css.png";

import reactIcon from "../assets/react.png";
import springIcon from "../assets/springboot.png";
import tailwindIcon from "../assets/tailwind.png";

import gitIcon from "../assets/git.png";
import powerbiIcon from "../assets/powerbi.png";
import arduinoIcon from "../assets/arduino.png";
import blenderIcon from "../assets/blender.png";
import unrealIcon from "../assets/unreal.png";

import sqlIcon from "../assets/sql.png";
import mysqlIcon from "../assets/mysql.png";
import sqliteIcon from "../assets/sqlite.png";
import mongoIcon from "../assets/mongodb.png";

// Skill categories
const skillsCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: pythonIcon, description: "Versatile language for data science, AI, and web development." },
      { name: "Java", icon: javaIcon, description: "Object-oriented language ideal for enterprise applications." },
      { name: "JavaScript", icon: jsIcon, description: "Essential language for frontend and backend web development." },
      { name: "C", icon: cIcon, description: "Low-level language, foundation of many others." },
      { name: "C++", icon: cppIcon, description: "Extension of C with object-oriented programming." },
      { name: "MATLAB", icon: matlabIcon, description: "Used for mathematical computations and simulations." },
      { name: "HTML5", icon: htmlIcon, description: "Markup language for structuring web pages." },
      { name: "CSS3", icon: cssIcon, description: "Style sheet language for designing web interfaces." },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", icon: reactIcon, description: "Library for building interactive user interfaces." },
      { name: "Spring Boot", icon: springIcon, description: "Framework for building robust Java applications." },
      { name: "Tailwind CSS", icon: tailwindIcon, description: "Utility-first CSS framework for modern UI design." },
    ],
  },
  {
    title: "Tools & Environments",
    skills: [
      { name: "Git", icon: gitIcon, description: "Distributed version control system." },
      { name: "Power BI", icon: powerbiIcon, description: "Microsoft's data visualization and business analytics tool." },
      { name: "Arduino", icon: arduinoIcon, description: "Open-source hardware platform for electronics projects." },
      { name: "Blender", icon: blenderIcon, description: "3D modeling and animation software." },
      { name: "Unreal Engine", icon: unrealIcon, description: "Game engine for high-quality 3D games and simulations." },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "SQL", icon: sqlIcon, description: "Language for managing relational databases." },
      { name: "MySQL", icon: mysqlIcon, description: "Popular open-source relational database system." },
      { name: "SQLite", icon: sqliteIcon, description: "Lightweight, embedded relational database." },
      { name: "MongoDB", icon: mongoIcon, description: "NoSQL database for flexible document storage." },
    ],
  },
];

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const handleCardClick = (skillName) => {
    setActiveSkill((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-10 text-center text-white"
      >
        Skills
      </motion.h2>

      {skillsCategories.map((category) => (
        <div key={category.title} className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-white mb-6 text-center"
          >
            {category.title}
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
            {category.skills.map((skill) => (
              <motion.div
                key={skill.name}
                onClick={() => handleCardClick(skill.name)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`skill-card ${activeSkill === skill.name ? "active" : ""}`}
              >
                <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-2" />
                <p className="text-gray-200 font-medium">{skill.name}</p>
                <span className="tooltip">{skill.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
