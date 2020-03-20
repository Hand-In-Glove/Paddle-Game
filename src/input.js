export default class InputHandler {
  constructor() {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          alert("moving left");
          break;
        case 39:
          alert("moving right");
          break;
      }
    });
  }
}
