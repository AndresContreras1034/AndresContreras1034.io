import React from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects.js";
import '../styles/Projects.css';

const Projects = () => {
  return (
    <section id="projects">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Proyectos
      </motion.h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-card"
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