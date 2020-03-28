import Paddle from "./Paddle";
import InputHandler from "./input";
import Ball from "./Ball";
import Brick from "./Brick";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle);

    let bricks = [];
    for (let i = 0; i <= 10; i++) {
      bricks.push(new Brick(this, { x: 70 * i + 10, y: 30 }));
    }

    this.gameObjects = [this.ball, this.paddle, ...bricks];
  }

  update(deltaTime) {
    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
