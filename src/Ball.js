export default class Ball {
  constructor(game) {
    this.image = document.querySelector("#gameBall");

    this.gameWidth = game.gameWidth;

    this.gameHeight = game.gameHeight;

    this.game = game;

    this.position = { x: 10, y: 10 };

    this.speed = { x: 5, y: 5 };

    this.size = 40;
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
    //collision check top and bottom boundry
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //collision check paddle
    const leftPaddle = this.game.paddle.position.x;
    const rightPaddle = this.game.paddle.position.x + this.game.paddle.width;

    if (
      this.position.y + this.size >= this.game.paddle.position.y &&
      this.position.x >= leftPaddle &&
      this.position.x + this.size <= rightPaddle
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
