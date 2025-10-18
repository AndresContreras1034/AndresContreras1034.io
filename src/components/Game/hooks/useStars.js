import { useRef, useEffect } from "react";
import { isColliding } from "../utils/collision";

const useStars = (gameState, score, canvasRef) => {
  const starsRef = useRef([]);
  const starImgRef = useRef(null);
  const spawnTimerRef = useRef(0);
  const imageLoadedRef = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/kirby/star.png";
    img.onload = () => {
      console.log("✨ Star image loaded");
      starImgRef.current = img;
      imageLoadedRef.current = true;
    };
  }, []);

  const spawnStar = () => {
    const scale = window.devicePixelRatio || 1;
    const canvasWidth = canvasRef.current.width / scale;
    const canvasHeight = canvasRef.current.height / scale;

    const starWidth = 32;
    const starHeight = 32;

    starsRef.current.push({
      x: canvasWidth,
      y: Math.random() * (canvasHeight - 200),
      width: starWidth,
      height: starHeight,
      speed: 3 + score * 0.05,
    });

    if (starsRef.current.length > 20) starsRef.current.shift();
  };

  const updateStars = (ctx, deltaTime) => {
    if (!imageLoadedRef.current || !starImgRef.current) {
      console.warn("⚠️ Imagen de estrella no está lista aún");
      return;
    }

    spawnTimerRef.current += deltaTime;
    if (spawnTimerRef.current >= 1.2 && gameState === "playing") {
      spawnStar();
      spawnTimerRef.current = 0;
    }

    starsRef.current = starsRef.current
      .map((star) => ({
        ...star,
        x: star.x - star.speed * (60 * deltaTime),
      }))
      .filter((star) => star.x + star.width > 0);

    starsRef.current.forEach((star) => {
      console.log("🌟 Dibujando estrella en:", star.x, star.y);
      ctx.drawImage(starImgRef.current, star.x, star.y, star.width, star.height);
    });
  };

  const checkStarCollision = (kirbyBox) => {
    return starsRef.current.some((star) => isColliding(kirbyBox, star));
  };

  const clearStars = () => {
    starsRef.current = [];
    spawnTimerRef.current = 0;
  };

  return {
    stars: starsRef.current,
    updateStars,
    checkStarCollision,
    clearStars,
  };
};

export default useStars;