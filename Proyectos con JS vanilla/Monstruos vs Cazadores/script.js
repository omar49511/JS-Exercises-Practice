const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

const cellSize = 100;
const celGap = 3;
const gameGrid = [];
const defenders = [];
let numberOfResources = 500;
const enemies = [];
const enemyPositions = [];
let enemiesInterval = 600;
let gameOver = false;
let frame = 0;

class Enemy {
  constructor(verticalPosition) {
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.color = "red";
    this.speed = Math.random() * 0.2 + 4;
    this.movement = this.speed;
    this.shooting = false;
    this.health = 100;
    this.maxHealth = this.health;
    this.projectiles = [];
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    ctx.font = "20px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 30, this.y + 30);
  }
  update() {
    this.x -= this.movement;
  }
}
function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
    if (enemies[i].x < 0) {
      gameOver = true;
    }
  }
  if (frame % enemiesInterval === 0) {
    let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize;
    enemies.push(new Enemy(verticalPosition));
    enemyPositions.push(verticalPosition);
    if (enemiesInterval > 120) {
      enemiesInterval -= 50;
    }
  }
}

//hay que detectar el mouse
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
};

//para saber en que grid nos encontramos

let canvasPosition = canvas.getBoundingClientRect();
//agregar un addEventListener del mousemove para saber las coordenadas
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

//agregar un addEventListener del mouseLeave para saber cuando el mouse sale del canvas

canvas.addEventListener("mouseleave", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});
const ControlBar = {
  width: canvas.width,
  height: cellSize,
};

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
function createGrid() {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      const cell = new Cell(x, y);
      gameGrid.push(cell);
    }
  }
}
createGrid();
function handleGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}

const defender1 = new Image();
defender1.src = "murcielago.png";

class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize - celGap * 2;
    this.height = cellSize - celGap * 2;
    this.color = "purple";
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 194;
    this.spriteHeight = 194;
    this.minFrame = 0;
    this.maxFrame = 3;
  }
  draw() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    ctx.font = "20px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 30, this.y);
    ctx.drawImage(
      defender1,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    if (frame % 8 === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
      if (this.frameX === 15) this.shootNow = true;
    }
  }
}

canvas.addEventListener("click", function () {
  const gridPositionX = mouse.x - (mouse.x % cellSize);
  const gridPositionY = mouse.y - (mouse.y % cellSize);
  if (gridPositionY < cellSize) return;
  let defenderCost = 100;
  if (numberOfResources >= defenderCost) {
    defenders.push(new Defender(gridPositionX, gridPositionY));
    numberOfResources -= defenderCost;
  }
});

function handleDefenders() {
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw();
    defenders[i].update();
    if (enemyPositions.indexOf(defenders[i] - y) !== -1)
      for (let j = 0; j < enemies.length; j++) {
        if (collision(defenders[i], enemies[j])) {
          enemies[j].movement = 0;
          defenders[i].health -= 10;
        }
        if (defenders[i] && defenders[i].health <= 0) {
          defenders.splice(i, 1);
          i--;
          enemies[j].movement = enemies[j].speed;
        }
      }
  }
}
function handleGameStatus() {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Potions: " + numberOfResources, 20, 30);
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "90px Arial";
    ctx.fillText("GAME OVER", 135, 330);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, ControlBar.width, ControlBar.height);
  handleGameGrid();
  handleDefenders();
  handleEnemies();
  handleGameStatus();
  frame++;
  if (!gameOver) {
    requestAnimationFrame(animate);
  }
}
animate();

//hay que crear una función de colisión esta deberá detectar las coordenadas
// entre 2 rectángulo y comparara entre coordenadas (x,y) ancho y alto y determinara
// si ha o no colisionado esta función debe retornar true si colisionaron
// y false si no lo han hecho

function collision(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}
