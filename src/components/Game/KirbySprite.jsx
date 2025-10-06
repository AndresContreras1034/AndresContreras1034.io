// KirbySprite.js
const kirby_idle = "/assets/kirby/kirby_idle.png";
const kirby_run_1 = "/assets/kirby/kirby_run_1.png";
const kirby_run_2 = "/assets/kirby/kirby_run_2.png";
const kirby_jump = "/assets/kirby/kirby_jump.png";
const kirby_hit = "/assets/kirby/kirby_hit.png";

// Imágenes precargadas
const kirbyRunImgs = [new Image(), new Image()];
kirbyRunImgs[0].src = kirby_run_1;
kirbyRunImgs[1].src = kirby_run_2;

const kirbyIdleImg = new Image();
kirbyIdleImg.src = kirby_idle;

const kirbyJumpImg = new Image();
kirbyJumpImg.src = kirby_jump;

const kirbyHitImg = new Image();
kirbyHitImg.src = kirby_hit;

let runFrame = 0;

export default function KirbySprite({ state, score, deltaTime }) {
  if (state === "hit") return kirbyHitImg;
  if (state === "jump") return kirbyJumpImg;
  if (state === "idle") return kirbyIdleImg;

  // Animación de correr
  runFrame += deltaTime * (6 + score * 0.1);
  const frameIndex = Math.floor(runFrame) % kirbyRunImgs.length;
  return kirbyRunImgs[frameIndex];
}
