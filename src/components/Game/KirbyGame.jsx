// KirbyGame.jsx
import React, { useRef, useEffect } from "react";
import KirbySprite from "./KirbySprite";
import useGameState from "./hooks/useGameState";
import useEnemies from "./hooks/useEnemies";
import "../../styles/Game.css";

const KirbyGame = () => {
  const canvasRef = useRef(null);
  const deltaTimeRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // ✅ Asegúrate de traer setGameOver desde useGameState
  const {
    gameState,
    score,
    startGame,
    resetGame,
    setGameOver,
    isJumping,
    jump,
    yPos,
  } = useGameState();

  // ✅ Cuando hay colisión, primero mostrar kirby llorando, luego reiniciar
  const { updateEnemies } = useEnemies(gameState, score, () => {
    if (gameState !== "gameover") {
      setGameOver(); // cambia el estado a gameover
      setTimeout(() => resetGame(), 1000); // espera 1 segundo para reiniciar
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(ratio, ratio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleKeyDown = (e) => {
      if (["KeyY", "KeyX", "KeyR"].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === "KeyY") startGame();
      else if (e.code === "KeyX") jump();
      else if (e.code === "KeyR") resetGame();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", jump);

    let animationId;
    const kirbyX = 100;
    const kirbySize = 64;

    const animate = () => {
      const now = performance.now();
      deltaTimeRef.current = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const kirbyY =
        canvas.height / (window.devicePixelRatio || 1) - yPos - kirbySize;

      const kirbyBox = {
        x: kirbyX,
        y: kirbyY,
        width: kirbySize,
        height: kirbySize,
      };

      updateEnemies(ctx, deltaTimeRef.current, kirbyBox);

      const spriteState =
        gameState === "gameover" ? "hit" : isJumping ? "jump" : "run";

      const sprite = KirbySprite({
        state: spriteState,
        score,
        deltaTime: deltaTimeRef.current,
      });

      ctx.drawImage(sprite, kirbyX, kirbyY, kirbySize, kirbySize);

      // Línea del suelo
      ctx.fillStyle = "#444";
      ctx.fillRect(
        0,
        canvas.height / (window.devicePixelRatio || 1) - 86,
        canvas.width,
        4
      );

      if (gameState === "playing") {
        ctx.fillStyle = "#fff";
        ctx.font = "24px Arial";
        ctx.fillText(`Score: ${score}`, canvas.width - 150, 40);
      }

      if (gameState === "gameover") {
        ctx.fillStyle = "#fff";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Game Over — Press R to Restart",
          canvas.width / 2,
          canvas.height / 2
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", jump);
    };
  }, [
    gameState,
    score,
    isJumping,
    yPos,
    startGame,
    resetGame,
    setGameOver,
    jump,
    updateEnemies,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="kirby-game-canvas"
      className="kirby-game-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 20,
        background: "transparent",
      }}
    />
  );
};

export default KirbyGame;
