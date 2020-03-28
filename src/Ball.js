export default class Ball {
  constructor() {
    this.image = document.querySelector("#gameBall");
  }

  draw(ctx) {
    ctx.drawImage(this.image, 10, 10, 40, 40);
  }

  update() {}
}
