import { Scene } from "./js/scene.js"
import { Rectangle, Circle } from "./js/shapes.js"
import { RGBA } from "./js/renderer.js"

let scene = new Scene(document.getElementById("test"))
let rect = new Circle(5)
rect.x += 10
rect.y += 10
console.log(rect)
scene.add(rect)
scene.add(new Circle(5))

// document.addEventListener('click',()=>{
//     let color = RGBA.random()
//     // console.log(color)
//     rect.changeColor(color)
// })
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