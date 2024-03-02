export class GameMouseEvent {
    type;
    button;
    pos;
    constructor(type, button, pos) {
        this.type = type;
        this.button = button;
        this.pos = pos;
    }
}
