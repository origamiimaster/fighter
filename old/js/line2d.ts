import { Vector2D } from "./vector2d.js"

class Line {
    point1: Vector2D
    point2: Vector2D
    a: Vector2D //For line in form ax + by = c
    b: Vector2D //Not implemented
    c: Vector2D
    constructor(a: Vector2D, b: Vector2D) {
        this.point1 = a
        this.point2 = b
    }
    incident(x: Vector2D): boolean {
        return this.slope() == (this.point1.y - x.y)/(this.point1.x - x.x)
    }
    intersection(x: Line): Vector2D | boolean {
        if(x.slope() == this.slope()){
            return false
        } else {

        }
    }
    slope(): number | false{
        if(this.point1.x - this.point2.x == 0){
            return false;
        } else {
            return (this.point1.y - this.point2.y)/(this.point1.x - this.point2.x)
        }
    }
}

class LineSegment extends Line{
    constructor(a: Vector2D, b: Vector2D){
        super(a,b)
    }
    // incident(x: Vector2D){

    // }
}
export { Line,LineSegment }