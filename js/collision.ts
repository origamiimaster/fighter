import { Object2D } from "./object2d.js";

interface collisionObject extends Object2D{
    collisionDetection(object: Object2D): boolean
}
class CircleCollider extends Object2D implements collisionObject{
    constructor(r: number){
        super()

    }
    collisionDetection(object: Object2D){
        // switch(object.type){
        //     case "rectangle":
        //         return false
        //     case "circle":
        //         let distX = object.x - this.x
        //         let distY = object.y - this.y
        //         let distance = Math.sqrt( (distX*distX) + (distY*distY) )
        //         return distance <= object.radius + this.radius
        // }
        return false
    }
}

export {CircleCollider}