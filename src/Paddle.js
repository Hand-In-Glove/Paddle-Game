export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.height = 20;
    this.width = 150;

    this.maxSpeed = 5;

    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  draw(ctx) {
    const grd = ctx.createLinearGradient(0, 550, 800, 600);
    grd.addColorStop(0, "yellow");
    grd.addColorStop(1, "orange");
    ctx.fillStyle = grd;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
