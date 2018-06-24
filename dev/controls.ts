class Controls {

    private div: HTMLElement
    private back: HTMLElement
    private main : Main

    constructor(main: Main) {
        
        this.main = main
        this.div = document.createElement("text")
        document.body.appendChild(this.div)
        this.div.innerHTML = "Use the arrow keys to move! <br> Click on the meteors to kill them"

        this.back = document.createElement("back")
        document.body.appendChild(this.back)
        this.back.innerHTML = "Back"
        this.back.addEventListener("click", ()=>this.textClicked())
    }

    public update(){

    }

    private textClicked() {
        this.main.showStart()
    }
}