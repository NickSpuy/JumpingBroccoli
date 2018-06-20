class Gameobject {
    public div: HTMLElement
    public xPos: number
    public yPos: number
    public yMovement: number
    public xMovementLeft: number = 0
    public xMovementRight: number = 0
    
    public constructor() {
        localStorage.colorSetting = '#a4509b';
        localStorage['colorSetting'] = '#a4509b';
        localStorage.setItem('colorSetting', '#a4509b');
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
}