import { Line, LineSegment } from "./line2d.js"
import { RGBA } from "./renderer.js"
import { Vector2D } from "./vector2d.js"
import { CircleCollider, CollisionObject } from "./collision.js"
import { Scene } from "./scene.js"
class Object2D {
    collider: CollisionObject
    collidingWith: Array<Object2D>
    isColliding: boolean
    type: string
    width: number
    height: number
    x: number
    y: number
    velocity: Vector2D
    newVelocity: Vector2D
    mass: number
    fixed: boolean
    points: Array<Array<RGBA>> = []
    color: RGBA
    constructor() {
        this.x = 0
        this.y = 0
        this.mass = 1
        this.fixed = false
        this.velocity = new Vector2D(0, 0)
        this.newVelocity = this.velocity
        this.collidingWith = []
        this.color = new RGBA(255, 255, 255, 1)
    }
    changeColor(color: RGBA) {
        for (let x = 0; x < this.points.length; x++) {
            for (let y = 0; y < this.points[x].length; y++) {
                if (this.points[x][y].a != 0) {
                    this.points[x][y].set(color)
                }
            }
        }
    }
    getPoints() {
        return this.points
    }
    // draw(scene:Scene){
    //     scene.drawObject(this)
    // }
    getColor() {
        return this.color
    }
    draw(scene: Scene) {

    }
}
class Polygon {
    vertices: Array<Vector2D>
    sides: Array<LineSegment>
    constructor(points: Array<Vector2D>) {
        this.vertices = points
        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.sides.push(new LineSegment(this.vertices[i], this.vertices[i + 1]))
        }
    }

}

interface Hitbox extends Object2D {
    knockback: Vector2D
    stunDuration: number
}

interface Hurtbox extends Object2D {
}
export { Object2D, Hitbox, Hurtbox }