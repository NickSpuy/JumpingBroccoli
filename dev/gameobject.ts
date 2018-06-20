class Gameobject {
    public div: HTMLElement
    public xPos: number
    public yPos: number
    public yMovement: number
    public xMovementLeft: number = 0
    public xMovementRight: number = 0

    public rightKey: number
    public leftKey: number

    public level: number

    public score:number = 0;
    public scoreElement:HTMLElement;

    public times:number = 0;

    public enemies: Enemy[] = []

    public constructor() {

    }

    public createBalls(spawnTimes: number): void {
        if (this.times < 5){
            for (var i = 0; i < 2; i++) {
                this.enemies.push(new Enemy())
            }
        } else if (this.times < 10){
            for (var i = 0; i < 3; i++) {
                this.enemies.push(new Enemy())
            }
        } else if (this.times < 15){
            for (var i = 0; i < 4; i++) {
                this.enemies.push(new Enemy())
            }
        } else if (this.times < 20){
            for (var i = 0; i < 5; i++) {
                this.enemies.push(new Enemy())
            }
        } else if (this.times < 25){
            for (var i = 0; i < 6; i++) {
                this.enemies.push(new Enemy())
            }
        }
        spawnTimes += 1
        this.times = this.times + spawnTimes;
        console.log(this.times)
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }

    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    } 

}