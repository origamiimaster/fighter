import { LineSegment } from "./line2d.js";
class Object2D {
    constructor() {
        this.points = [];
        this.x = 0;
        this.y = 0;
    }
}
class Polygon {
    constructor(points) {
        this.vertices = points;
        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.sides.push(new LineSegment(this.vertices[i], this.vertices[i + 1]));
        }
    }
}
export { Object2D };
