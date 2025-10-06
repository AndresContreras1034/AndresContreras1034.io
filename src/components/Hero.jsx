import React, { useState } from "react";
import { motion } from "framer-motion";
import KirbyStatic from "./Game/KirbyStatic";
import KirbyGame from "./Game/KirbyGame";
import "../styles/Hero.css";

const Hero = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center items-center px-6 text-center">
      {/* Kirby Game en capa superior */}
      {showGame && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <KirbyGame onClose={() => setShowGame(false)} />
        </div>
      )}

      {/* Contenido principal */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight z-10"
      >
        Andrés Méndez<span className="blinking-cursor">|</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-200 max-w-2xl z-10"
      >
        Backend Developer &amp; Data Analyst (Juego todavia mal=) Se inicia con y se salta con x. 
      </motion.p>

      {/* Kirby estático si el juego no está activo */}
      {!showGame && <KirbyStatic />}

      {/* Botón para iniciar/cerrar juego */}
      <button
        onClick={() => setShowGame(!showGame)}
        className="cta-button z-10"
      >
        {showGame ? "Cerrar juego" : "Jugar con Kirby"}
      </button>
    </section>
  );
};

export default Hero;