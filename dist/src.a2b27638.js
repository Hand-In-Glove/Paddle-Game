// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle = /*#__PURE__*/function () {
  function Paddle(game) {
    _classCallCheck(this, Paddle);

    this.gameWidth = game.gameWidth;
    this.height = 20;
    this.width = 150;
    this.maxSpeed = 10;
    this.speed = 0;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  _createClass(Paddle, [{
    key: "draw",
    value: function draw(ctx) {
      var grd = ctx.createLinearGradient(0, 550, 800, 600);
      grd.addColorStop(0, "yellow");
      grd.addColorStop(1, "orange");
      ctx.fillStyle = grd;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed;

      if (this.position.x < 0) {
        this.position.x = 0;
      }

      if (this.position.x + this.width > this.gameWidth) {
        this.position.x = this.gameWidth - this.width;
      }
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(paddle, game) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        paddle.moveLeft();
        break;

      case 39:
        paddle.moveRight();
        break;

      case 27:
        game.togglePause();
        break;

      case 32:
        game.start();
        break;

      case 82:
        game.restartGame();
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 37:
        paddle.speed < 0 && paddle.stop();
        break;

      case 39:
        paddle.speed > 0 && paddle.stop();
        break;
    }
  });
};

exports.default = InputHandler;
},{}],"src/CollisionDetection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collisionDetect = collisionDetect;

function collisionDetect(ball, gameObject) {
  //collision check paddle
  var bottomOfBall = ball.position.y + ball.size;
  var topOfBall = ball.position.y;
  var topOfObject = gameObject.position.y;
  var bottomOfObject = gameObject.position.y + gameObject.height;
  var leftOfObject = gameObject.position.x;
  var rightOfObject = gameObject.position.x + gameObject.width;

  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftOfObject && ball.position.x + ball.size <= rightOfObject) {
    return true;
  } else {
    return false;
  }
}
},{}],"src/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CollisionDetection = require("./CollisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball = /*#__PURE__*/function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.image = document.querySelector("#gameBall");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.reset();
    this.size = 40;
  }

  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: 100,
        y: 300
      };
      this.speed = {
        x: 5,
        y: 5
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y; //collision check left and right boundry

      if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      } //collision check top boundry


      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      } //check for bottom and deduct life


      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives--;
        this.game.paddle.position.x = this.game.gameWidth / 2 - this.game.paddle.width / 2, this.reset();
      } //collision check paddle


      var leftPaddle = this.game.paddle.position.x;
      var rightPaddle = this.game.paddle.position.x + this.game.paddle.width;

      if ((0, _CollisionDetection.collisionDetect)(this, this.game.paddle)) {
        this.speed.y = -this.speed.y * 1.06;
        this.position.y = this.game.paddle.position.y - this.size;
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"./CollisionDetection":"src/CollisionDetection.js"}],"src/Brick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CollisionDetection = require("./CollisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brick = /*#__PURE__*/function () {
  function Brick(game, position) {
    _classCallCheck(this, Brick);

    this.image = document.querySelector("#gameBrick");
    this.game = game;
    this.position = position;
    this.width = 70;
    this.height = 65;
    this.hit = false;
  }

  _createClass(Brick, [{
    key: "update",
    value: function update() {
      if ((0, _CollisionDetection.collisionDetect)(this.game.ball, this)) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.hit = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }]);

  return Brick;
}();

exports.default = Brick;
},{"./CollisionDetection":"src/CollisionDetection.js"}],"src/Levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelBuilder = levelBuilder;
exports.level3 = exports.level2 = exports.level1 = void 0;

var _Brick = _interopRequireDefault(require("./Brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function levelBuilder(game, level) {
  var bricks = [];
  level.forEach(function (row, rowIndex) {
    row.forEach(function (brick, brickIndex) {
      if (brick === 1) {
        var position = {
          x: 50 + 70 * brickIndex,
          y: 65 * rowIndex + 10
        };
        bricks.push(new _Brick.default(game, position));
      }
    });
  });
  return bricks;
}

var level1 = [[0, 0, 1, 1, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level1 = level1;
var level2 = [[1, 0, 1, 1, 0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1, 0, 1, 0, 0], [1, 1, 0, 0, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level2 = level2;
var level3 = [[0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]];
exports.level3 = level3;
},{"./Brick":"src/Brick.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Paddle = _interopRequireDefault(require("./Paddle"));

var _input = _interopRequireDefault(require("./input"));

var _Ball = _interopRequireDefault(require("./Ball"));

var _Levels = require("./Levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  VICTORY: 5
};

var Game = /*#__PURE__*/function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new _Paddle.default(this);
    this.ball = new _Ball.default(this);
    new _input.default(this.paddle, this);
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    this.levels = [_Levels.level1, _Levels.level2, _Levels.level3];
    this.currentLevel = 0;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.NEWLEVEL) {
        return;
      }

      this.bricks = (0, _Levels.levelBuilder)(this, this.levels[this.currentLevel]);
      this.ball.reset();
      this.gameObjects = [this.ball, this.paddle];
      this.gameState = GAME_STATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) {
        this.gameState = GAME_STATE.GAMEOVER;
      }

      if (this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAMEOVER || this.gameState === GAME_STATE.VICTORY) {
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

      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (object) {
        return object.update(deltaTime);
      });
      this.bricks = this.bricks.filter(function (brick) {
        return !brick.hit;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (object) {
        return object.draw(ctx);
      });

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
        var menuGrad = ctx.createLinearGradient(0, 0, this.gameWidth, this.gameHeight);
        menuGrad.addColorStop(0, "rgb(0,150,250)");
        menuGrad.addColorStop(1, "rgb(100,255,100)");
        ctx.fillStyle = menuGrad;
        ctx.fill();
        ctx.font = "50px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Press SPACEBAR to Start Game", this.gameWidth / 2, this.gameHeight / 2);
        ctx.fillText("Press ESC to Pause ", this.gameWidth / 2, this.gameHeight / 2 + 60);
      }

      if (this.gameState === GAME_STATE.GAMEOVER) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(50,50,250,0.8)";
        ctx.fill();
        ctx.font = "50px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER FOOL", this.gameWidth / 2, this.gameHeight / 2);
        ctx.fillText("Press R to Restart ", this.gameWidth / 2, this.gameHeight / 2 + 60);
      }

      if (this.gameState === GAME_STATE.VICTORY) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);

        var _menuGrad = ctx.createLinearGradient(0, 0, this.gameWidth, this.gameHeight);

        _menuGrad.addColorStop(1, "rgb(250,90,50)");

        _menuGrad.addColorStop(0, "rgb(250,255,100)");

        ctx.fillStyle = _menuGrad;
        ctx.fill();
        ctx.font = "50px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText("YOU BEAT THE GAME DAWG", this.gameWidth / 2, this.gameHeight / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gameState === GAME_STATE.PAUSED) {
        this.gameState = GAME_STATE.RUNNING;
      } else {
        this.gameState = GAME_STATE.PAUSED;
      }
    }
  }, {
    key: "restartGame",
    value: function restartGame() {
      // if (this.gameState !== GAME_STATE.GAMEOVER) {
      //   return;
      // } else {
      this.lives = 3;
      this.currentLevel = 0;
      this.gameState = GAME_STATE.MENU; // }
    } // toggleMenu() {
    //   if (this.gameState === GAME_STATE.MENU) {
    //     this.gameState = GAME_STATE.RUNNING;
    //   } else {
    //  }
    // }

  }]);

  return Game;
}();

exports.default = Game;
},{"./Paddle":"src/Paddle.js","./input":"src/input.js","./Ball":"src/Ball.js","./Levels":"src/Levels.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("#gameScreen");
var gameBG = document.querySelector("#gameBackground");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _Game.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0;

function gameLoop(timeStamp) {
  var deltaTime = timeStamp - lastTime;
  lastTime = timeStamp; //clear the canvas screen

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.drawImage(gameBG, 100, 20);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"./Game":"src/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59903" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map