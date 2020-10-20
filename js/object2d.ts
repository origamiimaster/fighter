import { Line, LineSegment } from "./line2d.js"
import { RGBA } from "./renderer.js"
import { Vector2D } from "./vector2d.js"
import { CircleCollider } from "./collision.js"
class Object2D {
    type: string
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

export { Object2D }