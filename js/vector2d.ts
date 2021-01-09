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
    add(vector: Vector2D): Vector2D {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    dot(vector: Vector2D): number {
        return this.x * vector.x + this.y + vector.y;
    }
}
export { Vector2D }

exports.Vector2D = Vector2D