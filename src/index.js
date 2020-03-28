import Paddle from "./Paddle";
import InputHandler from "./input";
import Ball from "./Ball";

let canvas = document.querySelector("#gameScreen");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball();

new InputHandler(paddle);

let lastTime = 0;

paddle.draw(ctx);

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //clear the canvas screen
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  //update paddle position
  paddle.update(deltaTime);
  //redraw paddle
  paddle.draw(ctx);
  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
