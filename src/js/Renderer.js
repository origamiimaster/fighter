import { Rectangle } from "./Rectangle.js";
class Renderer {
    constructor(canvasContainer, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        canvasContainer.appendChild(this.canvas);
    }
    render(object) {
        if (object instanceof Rectangle) {
            this.renderRectangle(object);
        }
        else {
            throw Error("Not Implemented");
        }
        // Recursively render the child elements. 
        object.children.forEach(child => {
            this.render(child);
        });
    }
    renderRectangle(object) {
        this.context.fillStyle = object.renderColor;
        this.context.fillRect(object.position.x, object.position.y, object.width, object.height);
    }
}
export { Renderer };
