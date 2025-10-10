import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Certifications.css";

const certificationsData = [
  { title: "CS50x: Introduction to Computer Science" },
  { title: "CS50R: Introduction to Programming with R" },
  { title: "CS50: Web Programming with Python and JavaScript" },
  { title: "Data Analysis Bootcamp" },
  { title: "Diploma in Applied Statistics" },
  { title: "Advanced SQL Certificate" },
  { title: "Data Structures in Python" },
  { title: "Software Design Patterns" },
];

const Certifications = () => {
  const [activeCert, setActiveCert] = useState(null);

  const handleCardClick = (title) => {
    setActiveCert((prev) => (prev === title ? null : title));
  };

  return (
    <section id="certifications" aria-label="Certifications Section">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Certifications
      </motion.h2>

      <motion.div
        className="cert-grid"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {certificationsData.map((cert) => (
          <motion.div
            key={cert.title}
            onClick={() => handleCardClick(cert.title)}
            className={`cert-card ${activeCert === cert.title ? "active" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, rotateX: 3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            layout
            role="button"
            aria-label={`Certification: ${cert.title}`}
          >
            <h3 style={{ fontWeight: "normal" }}>{cert.title}</h3>

            <AnimatePresence>
              {activeCert === cert.title && (
                <motion.div
                  className="tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {cert.title}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Certifications;
