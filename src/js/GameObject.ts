class GameObject {
    position: Position;
    renderColor: string;
    children: GameObject[];
    constructor(position: Position, color: string) {
        this.position = new Position(0, 0);
        this.position.set(position);
        this.renderColor = color;
        this.children = [];
    }
    collide(other: GameObject) {
        throw Error("Not Implemented");
    }
    appendChild(child: GameObject) {
        this.children.push(child);
    }
    replaceChildren(children: GameObject[]) {
        this.children = [];
        children.forEach(child => {
            this.children.push(child);
        })
    }
}

class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    set(position: Position) {
        this.x = position.x;
        this.y = position.y;
    }
}

export { GameObject, Position }