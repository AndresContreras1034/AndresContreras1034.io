import React, { useEffect, useRef } from "react";
import "../../styles/Game.css";

const kirby_idle = "/assets/kirby/kirby_idle.png"; // ruta desde public

const KirbyStatic = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 128;
    canvas.height = 128;

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


