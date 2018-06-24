class GameOver {
    private div: HTMLElement

    constructor() {
        this.div = document.createElement("text")
        document.body.appendChild(this.div)
        this.div.innerHTML = "GAME OVER!"
    }

    public update() {

    }
}