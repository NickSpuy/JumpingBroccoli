class StartScreen {

    private div: HTMLElement
    private game : Main

    constructor(g:Main) {
        
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", ()=>this.splashClicked())

        this.div.innerHTML = "Click here to start the game!"
   
    }

    public update(){

    }

    private splashClicked() {
        this.game.showGameScreen()
    }
}