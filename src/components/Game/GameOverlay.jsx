import React from "react";

const GameOverlay = ({ gameOver, score }) => {
  if (!gameOver) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      <h2 className="text-4xl font-bold mb-4">¡Juego Terminado!</h2>
      <p className="text-xl mb-6">Puntaje final: {score}</p>
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default GameOverlay;



