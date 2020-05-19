import { collisionDetect } from "./CollisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.querySelector("#gameBall");

    this.gameWidth = game.gameWidth;

    this.gameHeight = game.gameHeight;

    this.game = game;

    this.reset();

    this.size = 40;
  }

  reset() {
    this.position = { x: 100, y: 300 };

    this.speed = { x: 5, y: 5 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //collision check left and right boundry
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //collision check top boundry
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //check for bottom and deduct life
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      (this.game.paddle.position.x =
        this.game.gameWidth / 2 - this.game.paddle.width / 2),
        this.reset();
    }

    //collision check paddle
    const leftPaddle = this.game.paddle.position.x;
    const rightPaddle = this.game.paddle.position.x + this.game.paddle.width;

    if (collisionDetect(this, this.game.paddle)) {
      this.speed.y = -this.speed.y * 1.06;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
