import React from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects.js";
import '../styles/Projects.css';

const Projects = () => {
  return (
    <section id="projects">
      {/* Título animado */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Proyectos
      </motion.h2>

      {/* Grid de proyectos */}
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.name}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.4,
              y: [0, -10, 0], // rebote
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
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
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver proyecto
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
