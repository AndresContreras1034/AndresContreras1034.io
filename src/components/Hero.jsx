import React, { useState } from "react";
import { motion } from "framer-motion";
import KirbyStatic from "./Game/KirbyStatic";
import KirbyGame from "./Game/KirbyGame";
import "../styles/Hero.css";

const Hero = () => {
  const [showGame, setShowGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleGameToggle = () => {
    const nextState = !showGame;
    setShowGame(nextState);
    setShowInstructions(nextState); // Mostrar instrucciones solo al abrir el juego
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center px-6 text-center"
    >
      {/* Kirby Game en capa superior */}
      {showGame && (
        <div className="absolute inset-0 z-20">
          <KirbyGame onClose={() => {
            setShowGame(false);
            setShowInstructions(false); // Ocultar instrucciones al cerrar
          }} />
        </div>
      )}

      {/* Instrucciones del juego arriba del nombre */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-10 text-sm md:text-base text-pink-200 z-30 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm"
        >
          Juego Kirby: inicia con <strong>“Y”</strong>, salta con <strong>“X”</strong>.
        </motion.div>
      )}

      {/* Nombre principal */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-2 leading-tight z-10"
      >
        Andrés Méndez<span className="blinking-cursor">|</span>
      </motion.h1>

      {/* Línea descriptiva debajo del nombre */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 mb-6 z-10"
      >
        Systems Engineering Student · 7th semester · Age 19
      </motion.h2>

      {/* Descripción adicional */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-200 max-w-2xl z-10"
      >
        Backend Developer & Data Analyst. (meti: SEO, CERTIFICACION, CSS, JSX,PLACEHOLDER, NAVBAR,about...)
      </motion.p>

      {/* Kirby estático si el juego no está activo */}
      {!showGame && <KirbyStatic />}

      {/* Botón para iniciar/cerrar juego */}
      <button
        onClick={handleGameToggle}
        className="cta-button z-10 mt-4"
      >
        {showGame ? "Cerrar juego" : "Jugar con Kirby"}
      </button>
    </section>
  );
};

export default Hero;