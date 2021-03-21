import { CircleCollider, CompoundCollider, RectangleCollider } from "./collision.js";
import { Object2D } from "./object2d.js";
import { RGBA } from "./renderer.js";
class Rectangle extends Object2D {
    constructor(width, height) {
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
    toString() {
        return `R:${this.x},${this.y},${this.width},${this.height}`;
    }
    draw(scene) {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                scene.renderer.screen.write(i, j, this.getColor());
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
    toString() {
        return `C:${this.x},${this.y},${this.radius}`;
    }
    draw(scene) {
        for (let i = this.x; i < this.x + 2 * this.radius; i++) {
            for (let j = this.y; j < this.y + 2 * this.radius; j++) {
                if (Math.floor(Math.pow((-this.x + i - this.radius + 0.5), 2) + Math.pow((-this.y + j - this.radius + 0.5), 2)) <= Math.pow(this.radius, 2)) {
                    scene.renderer.screen.write(i, j, this.color);
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
            let shape = thing[0];
            let x = thing[1];
            let y = thing[2];
            for (let i = 0; i < shape.getPoints().length; i++) {
                for (let j = 0; j < shape.getPoints()[i].length; j++) {
                    let point = shape.getPoints()[i][j];
                    if (point.a == 0) {
                        continue;
                    }
                    else {
                        this.points[i + x][j + y].set(point);
                    }
                }
            }
            shape.x = x;
            shape.y = y;
            this.objects.push(shape);
        });
        this.collider = new CompoundCollider(this);
    }
    toString() {
        let result = `A:${this.x},${this.y};`;
        this.objects.forEach(object => {
            result += object.toString() + ";";
        });
    }
}
class CircleHitBox extends Circle {
    constructor(r, knockback, stunDuration) {
        super(r);
        this.knockback = knockback;
        this.stunDuration = stunDuration;
    }
}
class RectangleHitbox extends Rectangle {
    constructor(width, height, knockback, stunDuration) {
        super(width, height);
        this.knockback = knockback;
        this.stunDuration = stunDuration;
    }
}
class CircleHurtBox extends Circle {
}
class RectangleHurtBox extends Rectangle {
}
export { Rectangle, Circle, CompoundShape, CircleHitBox, RectangleHitbox, CircleHurtBox, RectangleHurtBox };
