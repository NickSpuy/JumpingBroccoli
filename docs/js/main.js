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
var Controls = (function () {
    function Controls(main) {
        var _this = this;
        this.main = main;
        this.div = document.createElement("text");
        document.body.appendChild(this.div);
        this.div.innerHTML = "Use the arrow keys to move! <br> Click on the meteors to kill them";
        this.back = document.createElement("back");
        document.body.appendChild(this.back);
        this.back.innerHTML = "Back";
        this.back.addEventListener("click", function () { return _this.textClicked(); });
    }
    Controls.prototype.update = function () {
    };
    Controls.prototype.textClicked = function () {
        this.main.showStart();
    };
    return Controls;
}());
var Gameobject = (function () {
    function Gameobject() {
        this.xMovementLeft = 0;
        this.xMovementRight = 0;
        localStorage.colorSetting = '#a4509b';
        localStorage['colorSetting'] = '#a4509b';
        localStorage.setItem('colorSetting', '#a4509b');
    }
    Gameobject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Gameobject;
}());
var GameOver = (function () {
    function GameOver() {
        this.div = document.createElement("text");
        document.body.appendChild(this.div);
        this.div.innerHTML = "GAME OVER!";
    }
    GameOver.prototype.update = function () {
    };
    return GameOver;
}());
var Game = (function () {
    function Game(main) {
        var _this = this;
        this.score = 0;
        this.level = 1;
        this.times = 0;
        this.enemies = [];
        this.hiscore = [];
        this.main = main;
        this.player = new Player(37, 39);
        setInterval(function () { return _this.createMeteors(0, 0); }, 5000);
        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        this.hiscoreElement = document.createElement("hiscore");
        document.body.appendChild(this.hiscoreElement);
        var hiscores = localStorage.getItem('hiscores') || '';
        if (hiscores == "") {
            this.hiscoreElement.innerHTML = "Hiscore: 0 ";
        }
        else {
            this.hiscoreElement.innerHTML = "Hiscore: " + hiscores;
        }
    }
    Game.prototype.createMeteors = function (spawnTimes, level) {
        if (this.times % 5 == 0) {
            level += 1;
            this.level = this.level + level;
        }
        for (var i = 0; i < this.level; i++) {
            this.enemies.push(new Enemy());
        }
        spawnTimes += 1;
        this.times = this.times + spawnTimes;
    };
    Game.prototype.checkHiscore = function () {
        var oldHiscores = localStorage.getItem('hiscores') || '';
        var currentHiscore = parseInt(oldHiscores);
        if (this.score > currentHiscore || isNaN(currentHiscore)) {
            this.hiscore.push(this.score);
            localStorage.setItem("hiscores", this.hiscore[0]);
        }
    };
    Game.prototype.scoreCount = function (points) {
        points += 1;
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
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
                this.checkHiscore();
            }
            enemy.update();
            requestAnimationFrame(function () { return _this.scoreCount(0); });
        }
        this.player.update();
    };
    return Game;
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
    Main.prototype.showControls = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Controls(this);
    };
    Main.prototype.showGameScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Game(this);
    };
    Main.prototype.showGameoverScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver();
    };
    return Main;
}());
window.addEventListener("load", function () { return new Main(); });
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("meteor");
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(moveLeft, moveRight) {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("player");
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
    function StartScreen(main) {
        var _this = this;
        this.main = main;
        this.start = document.createElement("text");
        document.body.appendChild(this.start);
        this.start.addEventListener("click", function () { return _this.startClicked(); });
        this.start.innerHTML = "Play";
        this.controls = document.createElement("text2");
        document.body.appendChild(this.controls);
        this.controls.addEventListener("click", function () { return _this.controlsClicked(); });
        this.controls.innerHTML = "Controls";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.controlsClicked = function () {
        this.main.showControls();
    };
    StartScreen.prototype.startClicked = function () {
        this.main.showGameScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map