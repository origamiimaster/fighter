import { Object2D } from "./object2d.js";
class CircleCollider extends Object2D {
    constructor(r) {
        super();
    }
    collisionDetection(object) {
        // switch(object.type){
        //     case "rectangle":
        //         return false
        //     case "circle":
        //         let distX = object.x - this.x
        //         let distY = object.y - this.y
        //         let distance = Math.sqrt( (distX*distX) + (distY*distY) )
        //         return distance <= object.radius + this.radius
        // }
        return false;
    }
}
export { CircleCollider };
