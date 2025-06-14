import { GameObject, Position } from "./GameObject.js";
import { Rectangle } from "./Rectangle.js";
import { Renderer } from "./Renderer.js";

class GameEngine {
    renderer: Renderer;
    background: GameObject;

    constructor(gameContainer: HTMLElement) {
        this.background = new Rectangle(new Position(0, 0), 600, 300, "#000000");
        this.renderer = new Renderer(gameContainer, 600, 300);
        this.renderer.render(this.background);
    }

    stepOneFrame() {
        
    }
}

export { GameEngine }