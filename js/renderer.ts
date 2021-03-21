import { Object2D } from "./object2d.js"
class Renderer {
    screen: Screen;
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    height: number
    width: number
    constructor(element: HTMLElement, height: number, width: number) {
        let scale = 2
        this.height = height
        this.width = width
        this.screen = new Screen(width, height);
        this.canvas = document.createElement("canvas")
        this.canvas.height = height * scale
        this.canvas.width = width * scale
        element.appendChild(this.canvas)
        this.context = this.canvas.getContext("2d")
        this.context.scale(scale, scale)

    }
    clear() {
        this.screen.clear()
    }
    draw(object: Object2D) {
        this.screen.draw(object)
    }
    render() {
        this.context.clearRect(0, 0, this.width, this.height)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.context.fillStyle = this.screen.get(i, j)
                this.context.fillRect(i, j, 1, 1)
            }
        }
    }

}


class RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
    get() {
        return `rgba(${this.r},${this.g},${this.b})`
    }
    set(color: RGBA) {
        this.r = color.r
        this.g = color.g
        this.b = color.b
        this.a = color.a
    }
    write(color: RGBA) {
        this.r = Math.min((this.r * (1 - color.a)) + (color.r * color.a), 255)
        this.g = Math.min((this.g * (1 - color.a)) + (color.g * color.a), 255)
        this.b = Math.min((this.b * (1 - color.a)) + (color.b * color.a), 255)
    }
    static random(): RGBA {
        return new RGBA(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 1)
    }
}
class Screen {
    self: Array<Array<RGBA>> = []
    width: number
    height: number
    constructor(width: number, height: number) {
        this.height = height
        this.width = width
        for (let i = 0; i < width; i++) {
            this.self[i] = []
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
    get(x: number, y: number): string {
        return this.self[x][y].get()
    }
    set(x: number, y: number, r: number, g: number, b: number, a: number) {
        this.self[x][y].set(new RGBA(r, g, b, a))
    }
    // write(x: number, y: number, r: number, g: number, b: number, a: number) {
    //     this.self[x][y].write(new RGBA(r, g, b, a))
    // }
    draw(object: Object2D) {
        for (let x_scene = object.x, x_object = 0; x_scene < this.width && x_object < object.width; x_object++, x_scene++) {
            for (let y_scene = object.y, y_object = 0; y_scene < this.height && y_object < object.height; y_object++, y_scene++) {
                if (0 <= x_scene && 0 <= x_object && 0 <= y_scene && 0 <= y_object && object.getPoints()[x_object][y_object].a != 0) {
                    try {
                        this.self[Math.floor(x_scene)][Math.floor(y_scene)].write(object.getPoints()[x_object][y_object])
                    } catch (e) {
                        console.log(e)
                        console.log(Math.floor(x_scene))
                        console.log(Math.floor(y_scene))
                    }
                }
            }
        }
    }
    write(x: number, y: number, color: RGBA) {
        try {
            this.self[Math.floor(x)][Math.floor(y)].write(color)
        } catch (e) {
            console.log(e)
            console.log(Math.floor(x))
            console.log(Math.floor(y))
        }
        // if (this.self[Math.floor(x)]== undefined ||this.self[Math.floor(x)][Math.floor(y)] == undefined) {

        // } else {
        //     this.self[Math.floor(x)][Math.floor(y)].write(color)
        // }
    }
}
export { Renderer, RGBA }
