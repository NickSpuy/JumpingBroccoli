///<reference path="gameobject.ts"/>
class Game extends Gameobject {
    private player: Player
    public main: Main
    
    constructor(main: Main) {
        
        super()
        this.main = main
        this.player = new Player(37, 39) 

        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        
        setInterval(()=>this.createBalls(0), 5000) 
    }

    public scoreCount (points: number) {
        points += 1
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    }

    public update(): void {
        for (var enemy of this.enemies) {
            if (this.checkCollision(enemy.getRectangle(), this.player.getRectangle())) {
                enemy.hitPaddle()
            }
            if (enemy.getRectangle().bottom > 1000) {
                this.main.showGameoverScreen()
                setInterval(()=>document.location.reload(true), 1000)
            }  
            enemy.update()
            requestAnimationFrame( () => this.scoreCount(0) )
        }
        this.player.update()     
    }
}