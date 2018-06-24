class Main {
    private currentscreen:any

    constructor() {
        this.currentscreen = new StartScreen(this)
        this.gameLoop() 
    }

    private gameLoop():void{
        this.currentscreen.update()   
        requestAnimationFrame(() => this.gameLoop())
    }

    public showStart() {
        document.body.innerHTML = ""
        this.currentscreen = new StartScreen(this)
    }

    public showControls() {
        document.body.innerHTML = ""
        this.currentscreen = new Controls(this)
    }
    
    public showGameScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new Game(this)
    }

    public showGameoverScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new GameOver()
    }
} 

window.addEventListener("load", () => new Main())