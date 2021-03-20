import { LineSegment } from "./line2d.js";
import { Vector2D } from "./vector2d.js";
class Object2D {
    constructor() {
        this.points = [];
        this.x = 0;
        this.y = 0;
        this.mass = 1;
        this.fixed = false;
        this.velocity = new Vector2D(0, 0);
        this.newVelocity = this.velocity;
        this.collidingWith = [];
    }
    changeColor(color) {
        for (let x = 0; x < this.points.length; x++) {
            for (let y = 0; y < this.points[x].length; y++) {
                if (this.points[x][y].a != 0) {
                    this.points[x][y].set(color);
                }
            }
        }
    }
    getPoints() {
        return this.points;
    }
    draw(scene) {
        scene.drawObject(this);
    }
    getColor() {
        return this.points[0][0];
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
