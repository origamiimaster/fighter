import { GameObject, Position } from "./GameObject.js";

class Rectangle extends GameObject {
    height: number;
    width: number;
    constructor(position: Position, width: number, height: number, color: string) {
        super(position, color);
        this.width = width;
        this.height = height;
    }
}

export { Rectangle }