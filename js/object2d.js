import { RGBA } from "./renderer.js";
class Object2D {
    constructor() {
        this.points = [];
        this.x = 0;
        this.y = 0;
    }
}
class Polygon {
    constructor() {
    }
}
class Rectangle extends Object2D {
    constructor(height, width) {
        super();
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.points[i] = [];
            for (let j = 0; j < height; j++) {
                this.points[i][j] = new RGBA(0, 255, 255, 1);
            }
        }
    }
}
class Circle extends Object2D {
    constructor(r) {
        super();
        this.radius = r;
        this.height = 2 * this.radius;
        this.width = 2 * this.radius;
        for (let x = 0; x < 2 * this.radius; x++) {
            this.points[x] = [];
            for (let y = 0; y < 2 * this.radius; y++) {
                if (Math.floor(Math.pow((x - this.radius + 0.5), 2) + Math.pow((y - this.radius + 0.5), 2)) <= Math.pow(this.radius, 2)) {
                    this.points[x][y] = new RGBA(0, 255, 255, 1);
                }
                else {
                    this.points[x][y] = new RGBA(0, 0, 0, 1);
                }
            }
        }
    }
}
export { Object2D, Rectangle, Circle };
