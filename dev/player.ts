///<reference path="gameobject.ts"/>
class Player extends Gameobject {
    private rightKey: number
    private leftKey: number
       
    constructor(moveLeft: number, moveRight:number) {
        super()

        this.div = document.createElement("paddle")
        document.body.appendChild(this.div)
        
        this.rightKey = moveLeft
        this.leftKey = moveRight
        
        this.xPos = 0
        this.yPos = window.innerHeight - 50
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.keyPressed(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.keyNotPressed(e))
    }

    private keyPressed(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.rightKey:
                this.xMovementRight = 10
                break
            case this.leftKey:
                this.xMovementLeft = 10
                break
        }
    }

    private keyNotPressed(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.rightKey:
                this.xMovementRight = 0
                break
            case this.leftKey:
                this.xMovementLeft = 0
                break
        }
    }

    public update() {
        let newX = this.xPos - this.xMovementRight + this.xMovementLeft
        if (newX > 0 && newX + 100 < window.innerWidth) this.xPos = newX
        this.div.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`
    }
}