// src/components/Projects.jsx
import React from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects.js";
import '../styles/Projects.css';

const Projects = () => {
  // Agrupar proyectos por categoría
  const categories = [...new Set(projectsData.map(project => project.category))];

  return (
    <section id="projects">
      {/* Título animado */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      {/* Mapear por categorías */}
      {categories.map(category => (
        <div key={category} className="category-section">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="category-title"
          >
            {category}
          </motion.h3>

          <div className="projects-grid">
            {projectsData
              .filter(project => project.category === category)
              .map((project, index) => (
                <motion.div
                  key={project.name}
                  className="project-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.4, // permanece escalado mientras hover activo
                    transition: { ease: "easeOut" }
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="content">
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
