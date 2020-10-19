import { Renderer } from "./renderer.js";
class Scene {
    constructor(location) {
        this.objects = [];
        this.renderer = new Renderer(location, 32, 32);
    }
    add(object) {
        this.objects.push(object);
    }
    draw() {
        this.renderer.clear();
        this.objects.forEach(object => {
            this.renderer.draw(object);
        });
    }
}
export { Scene };
