import { useRef, useState, useEffect } from "react";

const useGameState = () => {
  const kirbySize = 64;
  const kirbyX = 100;
  const gravity = 0.6;
  const jumpStrength = 12;
  const groundY = 0; // suelo en 0, yPos crece hacia arriba

  // Hooks al nivel superior
  const gameStateRef = useRef("start");
  const yPosRef = useRef(0); // Kirby inicia en el suelo (altura 0)
  const velocityRef = useRef(0);
  const runFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [isJumping, setIsJumping] = useState(false);
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
    setIsJumping(false);
  };
  // Marcar Game Over (cuando Kirby toca un enemigo)
const setGameOver = () => {
  gameStateRef.current = "gameover";
  setGameState("gameover");
  setIsJumping(false); // por si muere en el aire
};


  // Saltar
  const jump = () => {
    if (gameStateRef.current === "playing" && !isJumping) {
      setIsJumping(true);
      velocityRef.current = jumpStrength; // positivo para subir
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
      if (isJumping) {
        velocityRef.current -= gravity; // gravedad reduce velocidad
        yPosRef.current += velocityRef.current; // subir
        if (yPosRef.current <= groundY) {
          yPosRef.current = groundY;
          velocityRef.current = 0;
          setIsJumping(false);
        }
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
  }, [isJumping]);

  return {
    gameState,
    score,
    deltaTime,
    startGame,
    resetGame,
    setGameOver,
    isJumping,
    jump,
    yPos: yPosRef.current,
    velocity: velocityRef.current,
    kirbyBox: getKirbyBox(),
  };
};

export default useGameState;