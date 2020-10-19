class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(target) {
        return Math.sqrt(Math.pow((target.x - this.x), 2) + Math.pow((target.y - this.y), 2));
    }
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    dot(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
}
export { Vector2D };
