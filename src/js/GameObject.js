class GameObject {
    constructor(position, color) {
        this.position = new Position(0, 0);
        this.position.set(position);
        this.renderColor = color;
        this.children = [];
    }
    collide(other) {
        throw Error("Not Implemented");
    }
    appendChild(child) {
        this.children.push(child);
    }
    replaceChildren(children) {
        this.children = [];
        children.forEach(child => {
            this.children.push(child);
        });
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(position) {
        this.x = position.x;
        this.y = position.y;
    }
}
export { GameObject, Position };
