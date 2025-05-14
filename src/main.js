const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const mapImage = new Image();
mapImage.src = "./map.png";

const playerImage = new Image();
playerImage.src = "./sprite1.png";

// Config
const speed = 5;
let cameraX = 0;
let cameraY = 0;

// Scale factor (e.g., 1.5 for 150% size, 0.5 for 50% size)
const scale = 1.5;

// Setup sprite vars (set later after image loads)
let frameWidth = 0;
let frameHeight = 0;

let frameX = 0;
let frameY = 0;
let frameCount = 4;
let frameTimer = 0;
let frameInterval = 8;

const directions = {
  down: 0,
  up: 3,
  left: 1,
  right: 2,
};

let keys = {}; // for smooth movement

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

playerImage.onload = () => {
  frameWidth = playerImage.width / 4;
  frameHeight = playerImage.height / 4;
  requestAnimationFrame(gameLoop);
};

function updatePlayer() {
  let moving = false;

  if (keys["ArrowUp"]) {
    cameraY += speed;
    frameY = directions.up;
    moving = true;
    
  }
  if (keys["ArrowDown"]) {
    cameraY -= speed;
    frameY = directions.down;
    moving = true;
  }
  if (keys["ArrowLeft"]) {
    cameraX += speed;
    frameY = directions.left;
    moving = true;
  }
  if (keys["ArrowRight"]) {
    cameraX -= speed;
    frameY = directions.right;
    moving = true;
  }

  if (moving) {
    frameTimer++;
    if (frameTimer >= frameInterval) {
      frameX = (frameX + 1) % frameCount;
      frameTimer = 0;
    }
  } else {
    frameX = 0; // idle
  }
}

function gameLoop() {
  updatePlayer();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mapImage, cameraX, cameraY);

  // Draw player in center
  ctx.drawImage(
    playerImage,
    frameX * frameWidth, // sourceX
    frameY * frameHeight, // sourceY
    frameWidth, // sourceWidth
    frameHeight, // sourceHeight
    canvas.width / 2 - (frameWidth * scale) / 2, // destinationX
    canvas.height / 2 - (frameHeight * scale) / 2, // destinationY
    frameWidth * scale, // destinationWidth
    frameHeight * scale // destinationHeight
  );

  requestAnimationFrame(gameLoop);
}