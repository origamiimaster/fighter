class Renderer {
    constructor(element, height, width) {
        this.height = height;
        this.width = width;
        this.screen = new Screen(width, height);
        this.canvas = document.createElement("canvas");
        this.canvas.height = height * 10;
        this.canvas.width = width * 10;
        element.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.context.scale(10, 10);
    }
    clear() {
        this.screen.clear();
    }
    draw(object) {
        this.screen.draw(object);
    }
    render() {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.context.fillStyle = this.screen.get(i, j);
                this.context.fillRect(i, j, 1, 1);
                // if (Math.random() * 2000 < 1)
                //     this.screen.write(i, j, 255, 255, 255, 1)
            }
        }
    }
}
class RGBA {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    get() {
        return `rgba(${this.r},${this.g},${this.b})`;
    }
    set(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }
    write(color) {
        this.r = Math.min((this.r * (1 - color.a)) + (color.r * color.a), 255);
        this.g = Math.min((this.g * (1 - color.a)) + (color.g * color.a), 255);
        this.b = Math.min((this.b * (1 - color.a)) + (color.b * color.a), 255);
    }
}
class Screen {
    constructor(width, height) {
        this.self = [];
        this.height = height;
        this.width = width;
        for (let i = 0; i < width; i++) {
            this.self[i] = [];
            for (let j = 0; j < height; j++) {
                this.self[i][j] = new RGBA(0, 0, 0, 1);
            }
        }
    }
    clear() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.self[i][j].set(new RGBA(0, 0, 0, 1));
            }
        }
    }
    get(x, y) {
        return this.self[x][y].get();
    }
    set(x, y, r, g, b, a) {
        this.self[x][y].set(new RGBA(r, g, b, a));
    }
    write(x, y, r, g, b, a) {
        this.self[x][y].write(new RGBA(r, g, b, a));
    }
    draw(object) {
        for (let x_scene = object.x, x_object = 0; x_scene < this.width && x_object < object.width; x_object++, x_scene++) {
            for (let y_scene = object.y, y_object = 0; y_scene < this.height && y_object < object.height; y_object++, y_scene++) {
                if (0 <= x_scene && 0 <= x_object && 0 <= y_scene && 0 <= y_object) {
                    this.self[x_scene][y_scene].write(object.points[x_object][y_object]);
                }
            }
        }
    }
}
export { Renderer, RGBA };
