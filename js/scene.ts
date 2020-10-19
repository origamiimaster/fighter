import { Renderer } from "./renderer.js"
import { Object2D } from "./object2d.js"
class Scene {
    renderer: Renderer;
    constructor(location: HTMLElement) {
        this.renderer = new Renderer(location, 32, 32)
    }
    objects: Array<Object2D> = []
    add(object: Object2D) {
        this.objects.push(object)
    }
    draw() {
        this.renderer.clear()
        this.objects.forEach(object => {
            this.renderer.draw(object)
        })
    }
}
export { Scene } 