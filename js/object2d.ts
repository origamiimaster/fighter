import { Line, LineSegment } from "./line2d.js"
import { RGBA } from "./renderer.js"
import { Vector2D } from "./vector2d.js"
class Object2D {
    width: number
    height: number
    x: number
    y: number
    points: Array<Array<RGBA>> = []
    constructor() {
        this.x = 0
        this.y = 0
    }
}
class Polygon{
    vertices: Array<Vector2D>
    sides: Array<LineSegment>
    constructor(points: Array<Vector2D>){
        this.vertices = points
        for (let i = 0; i < this.vertices.length -1; i++){
            this.sides.push(new LineSegment(this.vertices[i], this.vertices[i+1]))
        }
    }
    
}
class Rectangle extends Object2D {
    constructor(height: number, width: number) {
        super()
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
    constructor(r: number) {
        super()
        this.radius = r
        this.height = 2 * this.radius
        this.width = 2 * this.radius
        for (let x = 0; x < 2 * this.radius; x++) {
            this.points[x] = []
            for (let y = 0; y < 2 * this.radius; y++) {
                if (Math.floor((x - this.radius + 0.5) ** 2 + (y - this.radius + 0.5) ** 2) <= this.radius ** 2) {
                    this.points[x][y] = new RGBA(0, 255, 255, 1)
                } else {
                    this.points[x][y] = new RGBA(0, 0, 0, 1)
                }
            }
        }
    }
}
export { Object2D, Rectangle, Circle }