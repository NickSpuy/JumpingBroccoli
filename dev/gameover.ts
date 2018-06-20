class GameOver {
    private div: HTMLElement

    constructor() {
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "GAME OVER, MAN"
    }

    public update() {

    }
}