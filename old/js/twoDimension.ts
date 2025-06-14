import { Vector2D } from "./vector2d.js"
class twoD {
        constructor() {

        }
        static distance(v1: Vector2D, v2: Vector2D): number {
            return v1.distanceTo(v2);
        }
    }