// import Renderer from "./js/renderer.js"
import { Scene } from "./js/scene.js"
import { Rectangle,Circle } from "./js/object2d.js"
let scene = new Scene(document.getElementById("test"))
let rect = new Circle(15)//Rectangle(2, 4)
console.log(rect)
scene.add(rect)

setInterval(() => {
    scene.renderer.render()
    scene.draw()
}, 10)

// setInterval(() => {
//     rect.x += 1
//     rect.y += 2
// }, 1000)
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowDown':
            rect.y += 1
            break
        case 'ArrowUp':
            rect.y -= 1
            break
        case 'ArrowLeft':
            rect.x -= 1
            break
        case 'ArrowRight':
            rect.x += 1
            break

    }
})