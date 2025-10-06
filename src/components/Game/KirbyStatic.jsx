import React, { useEffect, useRef } from "react";
import "../../styles/Game.css";

// Sprite estático de Kirby
import kirby_idle from "/assets/kirby/kirby_idle.png";

const KirbyStatic = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 128; // ancho del sprite
    canvas.height = 128; // alto del sprite

    const img = new Image();
    img.src = kirby_idle;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 128, 128);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="kirby-static mt-6"
      style={{ width: "64px", height: "64px" }}
    />
  );
};

export default KirbyStatic;
