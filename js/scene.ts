import { Renderer, RGBA } from "./renderer.js"
import { Object2D } from "./object2d.js"
import { Vector2D } from "./vector2d.js";
import { dir } from "console";
class Scene {
    renderer: Renderer;
    location: HTMLElement;
    constructor(location: HTMLElement) {
        this.location = location
        this.renderer = new Renderer(location, 128, 128)
    }
    objects: Array<Object2D> = []
    add(object: Object2D) {
        this.objects.push(object)
    }
    doCollision() {
        this.objects.forEach(object => {
            object.isColliding = false;
        })

        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.objects[i].collider.collisionDetection(this.objects[j])) {
                    this.objects[i].isColliding = true
                    this.objects[j].isColliding = true
                }
            }
        }
    }
    drawCollision() {
        this.renderer.clear()
        this.objects.forEach(object => {
            if (object.isColliding) {
                object.changeColor(new RGBA(255, 0, 0, 1))
            } else {
                object.changeColor(new RGBA(255, 255, 255, 1))
            }
        })
    }
    draw(): void {
        this.doCollision()
        this.drawCollision()
        this.objects.forEach((object) => {
            this.renderer.draw(object)
        })
    }
    update() {
        this.objects.forEach((object: Object2D) => {
            if (!object.fixed) {
                object.x += object.velocity.x
                object.y += object.velocity.y
            } else {
                object.velocity = new Vector2D(0, 0)
            }
        })
        this.renderer.render()
        this.draw()
    }
}
class PhysicsScene extends Scene {
    constructor(location: HTMLElement) {
        super(location)
    }
    doCollision() {
        this.objects.forEach(object => {
            object.isColliding = false;
            object.collidingWith = []
        })

        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.objects[i].collider.collisionDetection(this.objects[j])) {
                    this.objects[i].isColliding = true
                    this.objects[j].isColliding = true
                    this.objects[i].collidingWith.push(this.objects[j])
                    this.objects[j].collidingWith.push(this.objects[i])
                }
            }
        }
    }
    update() {
        this.objects.forEach((object: Object2D) => {
            if (!object.fixed && !object.isColliding) {
                //Behaves as normal, keep velocity the same.
                // object.x += object.velocity.x
                // object.y += object.velocity.y
            } else if (!object.isColliding) {
                //If it is fixed and not colliding, set it's new velocity to 0
                object.newVelocity = new Vector2D(0, 0)
            } else {
                let collision_object_velocities: Array<Vector2D> = []
                let collision_object_positions: Array<Vector2D> = []
                let totalOtherMass = 0
                object.collidingWith.forEach((otherObject: Object2D) => {
                    collision_object_positions.push(new Vector2D(otherObject.x, otherObject.y))
                    collision_object_velocities.push(otherObject.velocity)
                    totalOtherMass += otherObject.mass
                })
                let avgMass = totalOtherMass / object.collidingWith.length
                let averagePos: Vector2D = collision_object_positions.reduce((accumulator: Vector2D, currentValue: Vector2D) => { return accumulator.plus(currentValue) })
                averagePos = averagePos.multiply(1 / collision_object_positions.length)
                let averageVel: Vector2D = collision_object_velocities.reduce((accumulator: Vector2D, currentValue: Vector2D) => { return accumulator.plus(currentValue) })
                averageVel = averageVel.multiply(1 / collision_object_velocities.length)
                // Calculate angle that it should be launched 
                let collisionNormUnit = calculateLaunchAngle(new Vector2D(object.x, object.y), object.velocity, averagePos, averageVel)
                // let m1 = object.mass
                let vel1 = object.velocity
                let vel1Mag = object.velocity.magnitude()
                // let m2 = avgMass
                let vel2 = averageVel
                let vel2Mag = averageVel.magnitude()
                let relVel = vel1.subtract(vel2)
                let speed = relVel.x * collisionNormUnit.x + relVel.y * collisionNormUnit.y
                console.log(object.velocity)
                if (speed < 0) {
                    //Do nothing cause then the objects are already moving apart????
                    object.newVelocity = object.velocity
                } else {
                    // object.newVelocity = object.velocity.subtract(collisionNormUnit).multiply(speed)
                    object.newVelocity = new Vector2D(object.velocity.x + speed * collisionNormUnit.x, object.velocity.y + speed * collisionNormUnit.y)
                }
                // let debug = this.location.children[0]
                // debug.innerHTML += object.newVelocity.x + " " + object.newVelocity.y + " , "
                console.log(object.velocity)
                console.log(averageVel)
            }
            this.objects.forEach(object => {
                
                // console.log(object.newVelocity)
                object.velocity = object.newVelocity
                object.x += object.velocity.x
                object.y += object.velocity.y
            })
        })
        this.renderer.render()
        this.draw()
    }
}

function calculateLaunchAngle(position1: Vector2D, velocity1: Vector2D, position2: Vector2D, velocity2: Vector2D) {
    // get line between the two: 
    let line = [position1, position2]
    // get midpoint 
    // let midpoint = (new Vector2D(line[0].x + line[1].x, line[0].y + line[1].y)).multiply(0.5)
    // the unit vector from the midpoint to the origin is the angle we want, which is incidentally the same 
    let direction = line[0].subtract(line[1]).unit()
    return direction
}

class ArcadePhysicsScene extends Scene{
    
}

class GravityScene extends PhysicsScene {
    gravity: number
    constructor(location: HTMLElement, gravity: number) {
        super(location)
        this.gravity = gravity
    }
    update() {
        this.objects.forEach((object: Object2D) => {
            object.velocity.y += this.gravity
        })
        super.update()
    }
}
export { Scene, PhysicsScene, GravityScene }