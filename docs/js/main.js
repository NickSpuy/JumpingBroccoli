"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Gameobject = (function () {
    function Gameobject() {
        this.xMovementLeft = 0;
        this.xMovementRight = 0;
        this.score = 0;
        this.times = 0;
        this.enemies = [];
    }
    Gameobject.prototype.createBalls = function (spawnTimes) {
        if (this.times < 5) {
            for (var i = 0; i < 2; i++) {
                this.enemies.push(new Enemy());
            }
        }
        else if (this.times < 10) {
            for (var i = 0; i < 3; i++) {
                this.enemies.push(new Enemy());
            }
        }
        else if (this.times < 15) {
            for (var i = 0; i < 4; i++) {
                this.enemies.push(new Enemy());
            }
        }
        else if (this.times < 20) {
            for (var i = 0; i < 5; i++) {
                this.enemies.push(new Enemy());
            }
        }
        else if (this.times < 25) {
            for (var i = 0; i < 6; i++) {
                this.enemies.push(new Enemy());
            }
        }
        spawnTimes += 1;
        this.times = this.times + spawnTimes;
        console.log(this.times);
    };
    Gameobject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Gameobject.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Gameobject;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("ball");
        document.body.appendChild(_this.div);
        _this.div.addEventListener("click", function () { return _this.killShip(); });
        _this.xPos = Math.random() * (window.innerWidth - 100);
        _this.yPos = -100;
        _this.yMovement = 5;
        return _this;
    }
    Enemy.prototype.killShip = function () {
        this.div.parentElement.removeChild(this.div);
    };
    Enemy.prototype.hitPaddle = function () {
        this.yMovement = -5;
    };
    Enemy.prototype.update = function () {
        this.yPos += this.yMovement;
        if (this.yPos < 0) {
            this.yMovement = 5;
        }
        this.div.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    return Enemy;
}(Gameobject));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(main) {
        var _this = _super.call(this) || this;
        _this.main = main;
        _this.player = new Player(37, 39);
        _this.scoreElement = document.createElement("score");
        document.body.appendChild(_this.scoreElement);
        setInterval(function () { return _this.createBalls(0); }, 5000);
        return _this;
    }
    Game.prototype.scoreCount = function (points) {
        points += 1;
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    };
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (this.checkCollision(enemy.getRectangle(), this.player.getRectangle())) {
                enemy.hitPaddle();
            }
            if (enemy.getRectangle().bottom > 1000) {
                this.main.showGameoverScreen();
                setInterval(function () { return document.location.reload(true); }, 1000);
            }
            enemy.update();
            requestAnimationFrame(function () { return _this.scoreCount(0); });
        }
        this.player.update();
    };
    return Game;
}(Gameobject));
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GAME OVER, MAN";
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showStart();
    };
    return GameOver;
}());
var Main = (function () {
    function Main() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Main.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Main.prototype.showStart = function () {
        document.body.innerHTML = "";
        this.currentscreen = new StartScreen(this);
    };
    Main.prototype.showGameScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Game(this);
    };
    Main.prototype.showGameoverScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this);
    };
    return Main;
}());
window.addEventListener("load", function () { return new Main(); });
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(moveLeft, moveRight) {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("paddle");
        document.body.appendChild(_this.div);
        _this.rightKey = moveLeft;
        _this.leftKey = moveRight;
        _this.xPos = 0;
        _this.yPos = window.innerHeight - 50;
        window.addEventListener("keydown", function (e) { return _this.keyPressed(e); });
        window.addEventListener("keyup", function (e) { return _this.keyNotPressed(e); });
        return _this;
    }
    Player.prototype.keyPressed = function (e) {
        switch (e.keyCode) {
            case this.rightKey:
                this.xMovementRight = 10;
                break;
            case this.leftKey:
                this.xMovementLeft = 10;
                break;
        }
    };
    Player.prototype.keyNotPressed = function (e) {
        switch (e.keyCode) {
            case this.rightKey:
                this.xMovementRight = 0;
                break;
            case this.leftKey:
                this.xMovementLeft = 0;
                break;
        }
    };
    Player.prototype.update = function () {
        var newX = this.xPos - this.xMovementRight + this.xMovementLeft;
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.xPos = newX;
        this.div.style.transform = "translate(" + this.xPos + "px, " + this.yPos + "px)";
    };
    return Player;
}(Gameobject));
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "Click here to start!";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showGameScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map