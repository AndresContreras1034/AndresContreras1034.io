
import React, { useRef, useEffect, useState } from "react";

// Sprite paths
const kirby_idle = "/assets/kirby/kirby_idle.png";
const kirby_run_1 = "/assets/kirby/kirby_run_1.png";
const kirby_run_2 = "/assets/kirby/kirby_run_2.png";
const kirby_jump = "/assets/kirby/kirby_jump.png";
const kirby_hit = "/assets/kirby/kirby_hit.png";
const enemySprite = "/assets/kirby/enemy.png";
const starSprite = "/assets/kirby/star.png";

const KirbyGame = ({ onClose }) => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef("start");
  const yPosRef = useRef(150);
  const velocityRef = useRef(0);
  const enemiesRef = useRef([]);
  const starsRef = useRef([]);
  const scoreRef = useRef(0);
  const runFrameRef = useRef(0);
  const isJumpingRef = useRef(false);
  const lastTimeRef = useRef(0);
  const shakeRef = useRef(false);
  const shakeTimerRef = useRef(0);
  const enemySpawnRateRef = useRef(1200);
  const scoreIntervalRef = useRef(null);
  const enemyIntervalRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start");

  const gravity = 0.6;
  const jumpStrength = 12;
  const groundY = 150;
  const kirbyX = 100;
  const kirbySize = 64;

  const kirbyRunImgs = useRef([new Image(), new Image()]);
  const kirbyIdleImg = useRef(new Image());
  const kirbyJumpImg = useRef(new Image());
  const kirbyHitImg = useRef(new Image());
  const enemyImg = useRef(new Image());
  const starImg = useRef(new Image());

  useEffect(() => {
    kirbyIdleImg.current.src = kirby_idle;
    kirbyRunImgs.current[0].src = kirby_run_1;
    kirbyRunImgs.current[1].src = kirby_run_2;
    kirbyJumpImg.current.src = kirby_jump;
    kirbyHitImg.current.src = kirby_hit;
    enemyImg.current.src = enemySprite;
    starImg.current.src = starSprite;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const spawnEnemy = () => {
      if (enemiesRef.current.length < 10) {
        enemiesRef.current.push({
          x: canvas.width,
          y: canvas.height - groundY - kirbySize,
          width: 48,
          height: 48,
          speed: 5 + scoreRef.current * 0.1,
        });
      }
    };

    const spawnStar = () => {
      if (starsRef.current.length < 5) {
        starsRef.current.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 200) + 100,
          width: 32,
          height: 32,
          speed: 3,
        });
      }
    };

    const resetGame = () => {
      gameStateRef.current = "start";
      setGameState("start");
      yPosRef.current = groundY;
      velocityRef.current = 0;
      isJumpingRef.current = false;
      runFrameRef.current = 0;
      lastTimeRef.current = 0;
      enemiesRef.current = [];
      starsRef.current = [];
      scoreRef.current = 0;
      setScore(0);
      shakeRef.current = false;
      enemySpawnRateRef.current = 1200;
      clearInterval(scoreIntervalRef.current);
      clearInterval(enemyIntervalRef.current);
    };

    const startGame = () => {
      if (gameStateRef.current === "start") {
        gameStateRef.current = "playing";
        setGameState("playing");

        spawnEnemy();

        scoreIntervalRef.current = setInterval(() => {
          scoreRef.current += 1;
          setScore(scoreRef.current);

          if (scoreRef.current % 10 === 0 && enemySpawnRateRef.current > 600) {
            enemySpawnRateRef.current -= 100;
            clearInterval(enemyIntervalRef.current);
            enemyIntervalRef.current = setInterval(() => {
              if (gameStateRef.current === "playing") spawnEnemy();
            }, enemySpawnRateRef.current);
          }

          if (scoreRef.current % 5 === 0) {
            spawnStar();
          }
        }, 1000);

        enemyIntervalRef.current = setInterval(() => {
          if (gameStateRef.current === "playing") spawnEnemy();
        }, enemySpawnRateRef.current);
      }
    };

    const jump = () => {
      if (gameStateRef.current === "playing" && !isJumpingRef.current) {
        isJumpingRef.current = true;
        velocityRef.current = -jumpStrength;
      }
    };

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
    window.addEventListener("touchstart", jump);

    const animate = (time) => {
      const deltaTime = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (shakeRef.current) {
        const offset = Math.sin(time * 0.05) * 3;
        ctx.translate(offset, offset);
        shakeTimerRef.current -= deltaTime;
        if (shakeTimerRef.current <= 0) {
          shakeRef.current = false;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }

      if (isJumpingRef.current) {
        velocityRef.current += gravity;
        yPosRef.current += velocityRef.current;
        if (yPosRef.current >= groundY) {
          yPosRef.current = groundY;
          velocityRef.current = 0;
          isJumpingRef.current = false;
        }
      }

      let kirbyImg;
      if (gameStateRef.current === "gameover") kirbyImg = kirbyHitImg.current;
      else if (gameStateRef.current === "start") kirbyImg = kirbyIdleImg.current;
      else if (isJumpingRef.current) kirbyImg = kirbyJumpImg.current;
      else {
        const runSpeedFactor = 6 + scoreRef.current * 0.1;
        runFrameRef.current += deltaTime * runSpeedFactor;
        if (runFrameRef.current > 1000) runFrameRef.current = 0;
        kirbyImg = kirbyRunImgs.current[Math.floor(runFrameRef.current) % 2];
      }

      ctx.drawImage(kirbyImg, kirbyX, canvas.height - yPosRef.current - kirbySize, kirbySize, kirbySize);

      starsRef.current = starsRef.current
        .map((star) => ({ ...star, x: star.x - star.speed }))
        .filter((star) => star.x + star.width > 0);

      starsRef.current.forEach((star, index) => {
        ctx.drawImage(starImg.current, star.x, star.y, star.width, star.height);

        const kirbyBox = {
          x: kirbyX,
          y: canvas.height - yPosRef.current - kirbySize,
          width: kirbySize,
          height: kirbySize,
        };

        const starBox = {
          x: star.x,
          y: star.y,
          width: star.width,
          height: star.height,
        };

        const isColliding =
          kirbyBox.x < starBox.x + starBox.width &&
          kirbyBox.x + kirbyBox.width > starBox.x &&
          kirbyBox.y < starBox.y + starBox.height &&
          kirbyBox.y + kirbyBox.height > starBox.y;

        if (isColliding) {
          scoreRef.current += 5;
          setScore(scoreRef.current);
          starsRef.current.splice(index, 1);
        }
      });

      enemiesRef.current = enemiesRef.current
        .map((enemy) => ({ ...enemy, x: enemy.x - enemy.speed }))
        .filter((enemy) => enemy.x + enemy.width > 0);

      enemiesRef.current.forEach((enemy) => {
        ctx.drawImage(enemyImg.current, enemy.x, enemy.y, enemy.width, enemy.height);

        const kirbyBox = {
          x: kirbyX,
          y: canvas.height - yPosRef.current - kirbySize,
          width: kirbySize,
          height: kirbySize,
        };

        const enemyBox = {
          x: enemy.x,
          y: enemy.y,
          width: enemy.width,
          height: enemy.height,
        };

        const isColliding =
          kirbyBox.x < enemyBox.x + enemyBox.width &&
          kirbyBox.x + kirbyBox.width > enemyBox.x &&
          kirbyBox.y < enemyBox.y + enemyBox.height &&
          kirbyBox.y + kirbyBox.height > enemyBox.y;

        if (isColliding && gameStateRef.current === "playing") {
          gameStateRef.current = "gameover";
          setGameState("gameover");
          clearInterval(scoreIntervalRef.current);
          clearInterval(enemyIntervalRef.current);
          shakeRef.current = true;
          shakeTimerRef.current = 0.5;
        }
      });

      ctx.fillStyle = "#ffffff";
      ctx.font = "24px Arial";
      if (gameStateRef.current === "playing") {
        ctx.fillText(`Score: ${scoreRef.current}`, canvas.width - 150, 40);
      } else if (gameStateRef.current === "gameover") {
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over — Press R to Restart", canvas.width / 2, canvas.height / 2);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", jump);
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(scoreIntervalRef.current);
      clearInterval(enemyIntervalRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="kirby-game-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};

export default KirbyGame;

