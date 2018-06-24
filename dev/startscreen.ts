class StartScreen {

    private start: HTMLElement
    private controls: HTMLElement
    private main : Main

    constructor(main: Main) {  
        this.main = main
        this.start = document.createElement("text")
        document.body.appendChild(this.start)
        this.start.addEventListener("click", ()=>this.startClicked())

        this.start.innerHTML = "Play"

        this.controls = document.createElement("text2")
        document.body.appendChild(this.controls)
        this.controls.addEventListener("click", ()=>this.controlsClicked())

        this.controls.innerHTML = "Controls"
    }

    public update(){

    }

    private controlsClicked() {
        this.main.showControls()    
    }

    private startClicked() {
        this.main.showGameScreen()
    }
}