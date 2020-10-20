class Line {
    constructor(a, b) {
        this.point1 = a;
        this.point2 = b;
    }
    incident(x) {
        return this.slope() == (this.point1.y - x.y) / (this.point1.x - x.x);
    }
    intersection(x) {
        if (x.slope() == this.slope()) {
            return false;
        }
        else {
        }
    }
    slope() {
        if (this.point1.x - this.point2.x == 0) {
            return false;
        }
        else {
            return (this.point1.y - this.point2.y) / (this.point1.x - this.point2.x);
        }
    }
}
class LineSegment extends Line {
    constructor(a, b) {
        super(a, b);
    }
}
export { Line, LineSegment };
