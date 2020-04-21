import { collisionDetect } from "./CollisionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.querySelector("#gameBrick");

    this.game = game;

    this.position = position;

    this.width = 70;

    this.height = 65;

    this.hit = false;
  }

  update() {
    if (collisionDetect(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.hit = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
