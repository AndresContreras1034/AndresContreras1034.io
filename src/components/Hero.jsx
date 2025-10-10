import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KirbyStatic from "./Game/KirbyStatic";
import KirbyGame from "./Game/KirbyGame";
import "../styles/Hero.css";

const Hero = () => {
  const [showGame, setShowGame] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handlePlayClick = () => {
    if (showGame) {
      setShowGame(false);
      setShowHint(false);
    } else {
      setShowGame(true);
      setShowHint(true);
    }
  };

  const handleCloseGame = () => {
    setShowGame(false);
    setShowHint(false);
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center px-6 text-center"
    >
      {/* Kirby Game overlay */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <KirbyGame onClose={handleCloseGame} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="absolute top-6 bg-black/70 text-white px-4 py-2 rounded-full shadow-lg text-sm md:text-base z-30 pointer-events-none"
          >
            Press <strong>X</strong> to jump · Press <strong>Y</strong> to start
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight z-10"
      >
        Andrés Méndez<span className="blinking-cursor">|</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 mb-2 z-10"
      >
        Systems Engineering Student
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-200 max-w-2xl z-10"
      >
        Backend Developer & Data Analyst. Juego Kirby: inicia con "Y", salta con "X".
      </motion.p>

      {/* Static Kirby if game is not active */}
      {!showGame && <KirbyStatic />}

      {/* Play / Close Game button */}
      <button
        onClick={handlePlayClick}
        className="cta-button relative z-30 mt-10 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg transition-all duration-300"
      >
        {showGame ? "Close Game" : "Play with Kirby"}
      </button>
    </section>
  );
};

export default Hero;