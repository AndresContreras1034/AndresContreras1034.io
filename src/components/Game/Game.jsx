import React from "react";
import KirbyGame from "./KirbyGame";

const Game = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Kirby Adventure</h1>
      <p className="mb-6 text-lg text-pink-200">
        Usa las flechas para moverte y esquiva a los enemigos
      </p>
      <KirbyGame />
    </div>
  );
};

export default Game;


