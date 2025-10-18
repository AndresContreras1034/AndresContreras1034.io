import { useRef, useState, useEffect } from "react";

const useGameState = () => {
  const kirbySize = 64;
  const kirbyX = 100;
  const gravity = 0.6;
  const jumpStrength = 12;
  const groundY = 0;

  // Refs
  const gameStateRef = useRef("start");
  const yPosRef = useRef(0);
  const velocityRef = useRef(0);
  const runFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const jumpCountRef = useRef(0); // contador de saltos

  // States
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [deltaTime, setDeltaTime] = useState(0);

  // Caja de colisión de Kirby
  const getKirbyBox = () => ({
    x: kirbyX,
    y: window.innerHeight - kirbySize - yPosRef.current,
    width: kirbySize,
    height: kirbySize,
  });

  // Iniciar juego
  const startGame = () => {
    if (gameStateRef.current === "start") {
      gameStateRef.current = "playing";
      setGameState("playing");
      setScore(0);
    }
  };

  // Reiniciar juego
  const resetGame = () => {
    gameStateRef.current = "start";
    setGameState("start");
    yPosRef.current = groundY;
    velocityRef.current = 0;
    runFrameRef.current = 0;
    lastTimeRef.current = 0;
    setScore(0);
    jumpCountRef.current = 0;
  };

  // Marcar Game Over
  const setGameOver = () => {
    gameStateRef.current = "gameover";
    setGameState("gameover");
  };

  // Saltar (máximo 2 saltos)
  const jump = () => {
    if (gameStateRef.current === "playing" && jumpCountRef.current < 2) {
      velocityRef.current = jumpStrength;
      jumpCountRef.current += 1;
    }
  };

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyY") {
        e.preventDefault();
        startGame();
      } else if (e.code === "KeyX") {
        e.preventDefault();
        jump();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Loop de animación
  useEffect(() => {
    const update = (time) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      setDeltaTime(dt);

      // Física de Kirby
      yPosRef.current += velocityRef.current;

      if (yPosRef.current > groundY || velocityRef.current > 0) {
        velocityRef.current -= gravity; // gravedad solo si está en el aire o subiendo
      } else {
        yPosRef.current = groundY;
        velocityRef.current = 0;
        jumpCountRef.current = 0; // reinicia saltos al tocar suelo
      }

      // Puntaje
      if (gameStateRef.current === "playing") {
        setScore((prev) => prev + 1);
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return {
    gameState,
    score,
    deltaTime,
    startGame,
    resetGame,
    setGameOver,
    jump,
    yPos: yPosRef.current,
    velocity: velocityRef.current,
    kirbyBox: getKirbyBox(),
  };
};

export default useGameState;