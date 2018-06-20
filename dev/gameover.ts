class GameOver {
    private div: HTMLElement
    private game: Main

    constructor(g: Main) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.splashClicked())
        this.div.innerHTML = "GAME OVER, MAN"
    }

    public update() {

    }

    private splashClicked() {
        this.game.showStart()
    }
}