import { Object2D } from "./object2d.js";
import { Circle, CompoundShape, Rectangle } from "./shapes.js";

interface CollisionObject extends Object2D {
    collisionDetection(object: Object2D): boolean
    object: Object2D
}
function isCircle(object: Object2D): object is Circle {
    return object.type === "circle"
}
function isRect(object: Object2D): object is Rectangle {
    return object.type === "rectangle"
}

class CircleCollider extends Object2D implements CollisionObject {
    object: Circle
    constructor(object: Circle) {
        super()
        this.object = object
    }
    collisionDetection(object: Object2D) {
        if (isCircle(object)) {
            let c1x = object.x + object.radius//((object.x + object.width) / 2)
            let c1y = object.y + object.radius//((object.y + object.height) / 2)
            let c2x = this.object.x + this.object.radius//((this.object.x + this.object.width) / 2)
            let c2y = this.object.y + this.object.radius//((this.object.y + this.object.height) / 2)
            // console.log(c1x, c1y, c2x, c2y, object.radius, this.object.radius)
            let distX = c1x - c2x
            let distY = c1y - c2y
            // console.log(distX, distY)
            let distance = Math.sqrt((distX * distX) + (distY * distY))
            // console.log(distance)
            return distance < (object.radius + this.object.radius)
        } else if (isRect(object)) {
            let testX = this.object.x + this.object.radius
            let testY = this.object.y + this.object.radius
            if (this.object.x + this.object.radius < object.x) testX = object.x;      // test left edge
            else if (this.object.x + this.object.radius > object.x + object.width) testX = object.x + object.width;   // right edge
            if (this.object.y + this.object.radius < object.y) testY = object.y;      // top edge
            else if (this.object.y + this.object.radius > object.y + object.height) testY = object.y + object.height;   // bottom edge
            let distX = this.object.x + this.object.radius - testX
            let distY = this.object.y + this.object.radius - testY
            let distance = Math.sqrt((distX * distX) + (distY * distY))
            return distance <= this.object.radius
        } else {
            return false
        }
    }
}

class RectangleCollider extends Object2D implements CollisionObject {
    object: Rectangle
    constructor(object: Rectangle) {
        super()
        this.object = object
    }
    collisionDetection(object: Object2D) {
        if (isCircle(object)) {
            let testX = object.x + object.radius
            let testY = object.y + object.radius
            if (object.x + object.radius < this.object.x) testX = this.object.x;      // test left edge
            else if (object.x + object.radius > this.object.x + this.object.width) testX = this.object.x + this.object.width;   // right edge
            if (object.y + object.radius < this.object.y) testY = this.object.y;      // top edge
            else if (object.y + object.radius > this.object.y + this.object.height) testY = this.object.y + this.object.height;   // bottom edge
            let distX = object.x + object.radius - testX
            let distY = object.y + object.radius - testY
            let distance = Math.sqrt((distX * distX) + (distY * distY))
            return distance <= object.radius
        } else if (isRect(object)) {
            if (this.object.x + this.object.width >= object.x &&     // r1 right edge past r2 left
                this.object.x <= object.x + object.width &&       // r1 left edge past r2 right
                this.object.y + this.object.height >= object.y &&       // r1 top edge past r2 bottom
                this.object.y <= object.y + object.height) {       // r1 bottom edge past r2 top
                return true;
            }
            return false;
        } else {
            return false
        }
    }
}
class CompoundCollider extends Object2D implements CollisionObject {
    objects: Array<Object2D> = []
    separations: Array<[number, number]> = []
    object: CompoundShape
    constructor(object: CompoundShape) {
        super()
        this.object = object
        this.objects = this.object.objects
        object.objects.forEach(object => {
            this.separations.push([object.x, object.y])
        })
    }
    collisionDetection(object: Object2D) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].x = this.object.x + this.separations[i][0]
            this.objects[i].y = this.object.y + this.separations[i][1]
        }
        return this.objects.some((e) => e.collider.collisionDetection(object))
    }
}

export { RectangleCollider, CircleCollider, CollisionObject, CompoundCollider }