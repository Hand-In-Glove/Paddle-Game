import Game from "./Game";

let canvas = document.querySelector("#gameScreen");
let gameBG = document.querySelector("#gameBackground");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //clear the canvas screen
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.drawImage(gameBG, 100, 20);
  game.update(deltaTime);

  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
