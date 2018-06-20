class Game {
    private player: Player
    private main: Main
    private score: number = 0;
    private scoreElement: HTMLElement;
    private hiscoreElement: HTMLElement;
    private level: number = 1
    private times: number = 0;
    private enemies: Enemy[] = []

    public hiscore: any[] = []
    
    constructor(main: Main) {
        this.main = main
        this.player = new Player(37, 39) 

        setInterval(()=>this.createMeteors(0, 0), 5000) 

        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);

        this.hiscoreElement = document.createElement("hiscore");
        document.body.appendChild(this.hiscoreElement);
        let hiscores = localStorage.getItem('hiscores') || '';

        if (hiscores == "") {
            this.hiscoreElement.innerHTML = "Hiscore: 0 "
        } else {
            this.hiscoreElement.innerHTML = "Hiscore: " + hiscores
        }
    }

    private createMeteors(spawnTimes: number, level: number): void {
        if (this.times % 5 == 0){
            level +=1
            this.level = this.level + level
        } 
        for (var i = 0; i < this.level; i++) {
            this.enemies.push(new Enemy())
        }
        spawnTimes += 1
        this.times = this.times + spawnTimes;
    }

    private checkHiscore() {
        let oldHiscores = localStorage.getItem('hiscores') || '';
        let currentHiscore = parseInt(oldHiscores)

        if (this.score > currentHiscore || isNaN(currentHiscore)) {
            this.hiscore.push(this.score)
            localStorage.setItem("hiscores", this.hiscore[0]);
        }
    }

    private scoreCount (points: number) {
        points += 1
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    }

    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    } 

    public update(): void {
        for (var enemy of this.enemies) {
            if (this.checkCollision(enemy.getRectangle(), this.player.getRectangle())) {
                enemy.hitPaddle()
            }
            if (enemy.getRectangle().bottom > 1000) {
                this.main.showGameoverScreen()
                setInterval(()=>document.location.reload(true), 1000)
                this.checkHiscore()
                
            }  
            enemy.update()
            requestAnimationFrame( () => this.scoreCount(0) )
        }
        this.player.update()     
    }
}