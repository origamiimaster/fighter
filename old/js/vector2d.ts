class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    distanceTo(target: Vector2D): number {
        return Math.sqrt((target.x - this.x) ** 2 + (target.y - this.y) ** 2)
    }
    multiply(scalar: number): Vector2D {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    plus(vector: Vector2D): Vector2D {
        let newX = this.x + vector.x;
        let newY = this.y + vector.y;
        return new Vector2D(newX, newY);
    }
    add(vector: Vector2D) {
        this.x += vector.x
        this.y += vector.y
    }
    subtract(vector: Vector2D){
        return this.plus(vector.multiply(-1))
    }
    dot(vector: Vector2D): number {
        return this.x * vector.x + this.y + vector.y;
    }
    unit(): Vector2D {
        let newX = this.x
        let newY = this.y
        let mag = this.magnitude()
        return new Vector2D(newX / mag, newY / mag)
    }
    magnitude(): number {
        return this.distanceTo(new Vector2D(0, 0))
    }
}
export { Vector2D }

// exports.Vector2D = Vector2D