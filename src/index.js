import Paddle from "/src/Paddle";
import InputHandler from "/src/input";

let canvas = document.querySelector("#gameScreen");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

new InputHandler();

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //clear the canvas screen
  ctx.clearRect(0, 0, 800, 600);
  //update paddle position
  paddle.update(deltaTime);
  //redraw paddle
  paddle.draw(ctx);

  requestAnimationFrame(gameLoop);
}
