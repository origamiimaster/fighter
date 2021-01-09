import { Renderer, RGBA } from "./renderer.js"
import { Object2D } from "./object2d.js"
class Scene {
    renderer: Renderer;
    constructor(location: HTMLElement) {
        this.renderer = new Renderer(location, 128, 128)
    }
    objects: Array<Object2D> = []
    add(object: Object2D) {
        this.objects.push(object)
    }
    draw() : void{
        this.objects.forEach(object => {
            object.isColliding = false;
        })

        for( let i = 0; i < this.objects.length; i++){
            for( let j = i+1; j < this.objects.length; j++){
                if(this.objects[i].collider.collisionDetection(this.objects[j])){
                    this.objects[i].isColliding = true
                    this.objects[j].isColliding = true
                }
            }
        }        
        this.renderer.clear()
        this.objects.forEach(object => {
            if(object.isColliding){
                object.changeColor(new RGBA(255,0,0,1))
            } else {
                object.changeColor(new RGBA(255,255,255,1))
            }
        })

        this.objects.forEach((object)=>{
            this.renderer.draw(object)
        })
    }
}
export { Scene } 