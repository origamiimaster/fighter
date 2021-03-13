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
    plus(vector) {
        let newX = this.x + vector.x;
        let newY = this.y + vector.y;
        return new Vector2D(newX, newY);
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    subtract(vector) {
        return this.plus(vector.multiply(-1));
    }
    dot(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    unit() {
        let newX = this.x;
        let newY = this.y;
        let mag = this.magnitude();
        return new Vector2D(newX / mag, newY / mag);
    }
    magnitude() {
        return this.distanceTo(new Vector2D(0, 0));
    }
}
export { Vector2D };
// exports.Vector2D = Vector2D
