export default class Brick {
  constructor(game, position) {
    this.image = document.querySelector("#gameBrick");

    this.game = game;

    this.position = position;

    this.width = 70;

    this.height = 65;
  }

  update(deltaTime) {}

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
