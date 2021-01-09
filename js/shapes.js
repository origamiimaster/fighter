import { CircleCollider, CompoundCollider, RectangleCollider } from "./collision.js";
import { Object2D } from "./object2d.js";
import { RGBA } from "./renderer.js";
class Rectangle extends Object2D {
    constructor(height, width) {
        super();
        this.type = "rectangle";
        this.width = width;
        this.height = height;
        this.collider = new RectangleCollider(this);
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
        this.type = "circle";
        this.radius = r;
        this.height = 2 * this.radius;
        this.width = 2 * this.radius;
        this.collider = new CircleCollider(this);
        for (let x = 0; x < 2 * this.radius; x++) {
            this.points[x] = [];
            for (let y = 0; y < 2 * this.radius; y++) {
                if (Math.floor(Math.pow((x - this.radius + 0.5), 2) + Math.pow((y - this.radius + 0.5), 2)) <= Math.pow(this.radius, 2)) {
                    this.points[x][y] = new RGBA(0, 255, 255, 1);
                }
                else {
                    this.points[x][y] = new RGBA(0, 0, 0, 0);
                }
            }
        }
    }
}
class CompoundShape extends Object2D {
    constructor(shapes) {
        super();
        this.objects = [];
        this.height = 0;
        this.width = 0;
        this.width = Math.max(...shapes.map(elem => elem[0].width + elem[1])) - Math.min(...shapes.map(elem => elem[1]));
        this.height = Math.max(...shapes.map(elem => elem[0].height + elem[2])) - Math.min(...shapes.map(elem => elem[2]));
        console.log(this.width, this.height);
        for (let i = 0; i < this.width; i++) {
            this.points[i] = [];
            for (let j = 0; j < this.height; j++) {
                this.points[i][j] = new RGBA(0, 0, 0, 0);
            }
        }
        shapes.forEach((thing) => {
            // console.log(thing)
            let shape = thing[0];
            let x = thing[1];
            let y = thing[2];
            for (let i = 0; i < shape.points.length; i++) {
                for (let j = 0; j < shape.points[i].length; j++) {
                    let point = shape.points[i][j];
                    if (point.a == 0) {
                        continue;
                    }
                    else {
                        // if(0 <= i+x && i+x < this.width
                        // && 0 <= j+y && j+x < this.height){
                        this.points[i + x][j + y].set(point);
                        // }
                    }
                }
            }
            shape.x = x;
            shape.y = y;
            this.objects.push(shape);
        });
        this.collider = new CompoundCollider(this);
    }
}
export { Rectangle, Circle, CompoundShape };
