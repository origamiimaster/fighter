import { CircleCollider } from "./collision.js"
import { Object2D } from "./object2d.js"
import { RGBA } from "./renderer.js"

class Rectangle extends Object2D {
    constructor(height: number, width: number) {
        super()
        this.type = "rectangle"
        this.width = width
        this.height = height
        for (let i = 0; i < width; i++) {
            this.points[i] = []
            for (let j = 0; j < height; j++) {
                this.points[i][j] = new RGBA(0, 255, 255, 1)
            }
        }
    }
}
class Circle extends Object2D {
    radius: number
    collider: CircleCollider
    constructor(r: number) {
        super()
        this.type = "circle"
        this.radius = r
        this.height = 2 * this.radius
        this.width = 2 * this.radius
        this.collider = new CircleCollider(r)
        for (let x = 0; x < 2 * this.radius; x++) {
            this.points[x] = []
            for (let y = 0; y < 2 * this.radius; y++) {
                if (Math.floor((x - this.radius + 0.5) ** 2 + (y - this.radius + 0.5) ** 2) <= this.radius ** 2) {
                    this.points[x][y] = new RGBA(0, 255, 255, 1)
                } else {
                    this.points[x][y] = new RGBA(0, 0, 0, 0)
                }
            }
        }
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
}


export { Rectangle, Circle }