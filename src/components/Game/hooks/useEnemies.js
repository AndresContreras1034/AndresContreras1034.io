// hooks/useEnemies.js
import { useRef, useEffect } from "react";
import { isColliding } from "../utils/collision";

const useEnemies = (gameState, score, onGameOver) => {
  const enemiesRef = useRef([]);
  const enemyImgRef = useRef(new Image());
  const spawnTimerRef = useRef(0);
  const nextSpawnRef = useRef(0);
  const gameOverHandled = useRef(false); // Evita múltiples triggers

  useEffect(() => {
    enemyImgRef.current.src = "/assets/kirby/enemy.png";
    nextSpawnRef.current = 1 + Math.random() * 1.0;
  }, []);

  const spawnEnemy = () => {
    const enemyWidth = 48;
    const enemyHeight = 48;
    const offsetY = 40;
    const fixedY = window.innerHeight - 64 - enemyHeight + offsetY;

    const minSpeed = 4;
    const maxSpeed = 8;
    let enemySpeed = minSpeed + score * 0.05;
    if (enemySpeed > maxSpeed) enemySpeed = maxSpeed;
    enemySpeed += Math.random() * 0.5;

    enemiesRef.current.push({
      x: window.innerWidth,
      y: fixedY,
      width: enemyWidth,
      height: enemyHeight,
      speed: enemySpeed,
    });
  };

  const updateEnemies = (ctx, deltaTime, kirbyBox) => {
    if (gameState === "playing") {
      spawnTimerRef.current += deltaTime;
      if (spawnTimerRef.current >= nextSpawnRef.current) {
        if (Math.random() < 0.6 + score * 0.01) {
          spawnEnemy();
        }
        spawnTimerRef.current = 0;
        nextSpawnRef.current = 0.5 + Math.random() * 1.5;
      }
    }

    // Si el juego terminó, detenemos el movimiento
    if (gameState !== "playing") {
      enemiesRef.current.forEach((enemy) => {
        ctx.drawImage(enemyImgRef.current, enemy.x, enemy.y, enemy.width, enemy.height);
      });
      return;
    }

    // Actualización normal
    enemiesRef.current = enemiesRef.current
      .map((enemy) => ({ ...enemy, x: enemy.x - enemy.speed }))
      .filter((enemy) => enemy.x + enemy.width > 0);

    enemiesRef.current.forEach((enemy) => {
      ctx.drawImage(enemyImgRef.current, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Detección de colisión
    const collision = enemiesRef.current.some((enemy) => isColliding(kirbyBox, enemy));

    if (collision && !gameOverHandled.current) {
      gameOverHandled.current = true;
      onGameOver(); // Llamamos a la función que pone el estado en gameover
    }
  };

  const clearEnemies = () => {
    enemiesRef.current = [];
    spawnTimerRef.current = 0;
    nextSpawnRef.current = 1 + Math.random() * 1.0;
    gameOverHandled.current = false;
  };

  return {
    enemies: enemiesRef.current,
    updateEnemies,
    clearEnemies,
  };
};

export default useEnemies;


