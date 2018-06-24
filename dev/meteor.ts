///<reference path="gameobject.ts"/>
class Enemy extends Gameobject { 
    
    constructor() {
        super()

        this.div = document.createElement("meteor")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.killShip())

        this.xPos = Math.random() * (window.innerWidth - 100)
        this.yPos = -100
        this.yMovement = 5
    }

    public killShip() {
        this.div.parentElement!.removeChild(this.div)
    }
    
    public hitPaddle(){
        this.yMovement = -5
    }

    public update() : void {    
        this.yPos += this.yMovement
        if(this.yPos < 0) { 
            this.yMovement = 5
        }              
        this.div.style.transform = `translate(${this.xPos}px, ${this.yPos}px)` 
    }
}