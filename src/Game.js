import Paddle from "./Paddle";
import InputHandler from "./input";
import Ball from "./Ball";
import { level1, level2, level3, levelBuilder } from "./Levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  VICTORY: 5,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    this.levels = [level1, level2, level3];
    this.currentLevel = 0;
  }

  start() {
    if (
      this.gameState !== GAME_STATE.MENU &&
      this.gameState !== GAME_STATE.NEWLEVEL
    ) {
      return;
    }

    this.bricks = levelBuilder(this, this.levels[this.currentLevel]);

    this.ball.reset();

    this.gameObjects = [this.ball, this.paddle];

    this.gameState = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gameState = GAME_STATE.GAMEOVER;
    }

    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAMEOVER ||
      this.gameState === GAME_STATE.VICTORY
    ) {
      return;
    }

    if (this.bricks.length === 0) {
      this.currentLevel++;
      if (this.currentLevel === this.levels.length) {
        this.gameState = GAME_STATE.VICTORY;
      } else {
        this.gameState = GAME_STATE.NEWLEVEL;
        this.start();
      }
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.hit);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(50,50,250,0.5)";
      ctx.fill();
      ctx.font = "50px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      let menuGrad = ctx.createLinearGradient(
        0,
        0,
        this.gameWidth,
        this.gameHeight
      );
      menuGrad.addColorStop(0, "rgb(0,150,250)");
      menuGrad.addColorStop(1, "rgb(100,255,100)");
      ctx.fillStyle = menuGrad;
      ctx.fill();
      ctx.font = "50px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press SPACEBAR to Start Game",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillText(
        "Press ESC to Pause ",
        this.gameWidth / 2,
        this.gameHeight / 2 + 60
      );
    }

    if (this.gameState === GAME_STATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(50,50,250,0.8)";
      ctx.fill();
      ctx.font = "50px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText("GAME OVER FOOL", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText(
        "Press R to Restart ",
        this.gameWidth / 2,
        this.gameHeight / 2 + 60
      );
    }

    if (this.gameState === GAME_STATE.VICTORY) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      let menuGrad = ctx.createLinearGradient(
        0,
        0,
        this.gameWidth,
        this.gameHeight
      );
      menuGrad.addColorStop(1, "rgb(250,90,50)");
      menuGrad.addColorStop(0, "rgb(250,255,100)");
      ctx.fillStyle = menuGrad;
      ctx.fill();
      ctx.font = "50px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.fillText(
        "YOU BEAT THE GAME DAWG",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }

  restartGame() {
    // if (this.gameState !== GAME_STATE.GAMEOVER) {
    //   return;
    // } else {
    this.lives = 3;
    this.currentLevel = 0;
    this.gameState = GAME_STATE.MENU;
    // }
  }

  // toggleMenu() {
  //   if (this.gameState === GAME_STATE.MENU) {
  //     this.gameState = GAME_STATE.RUNNING;
  //   } else {
  //  }
  // }
}
