import { GameObject } from "./GameObject.js";
class Rectangle extends GameObject {
    constructor(position, width, height, color) {
        super(position, color);
        this.width = width;
        this.height = height;
    }
}
export { Rectangle };
