import { Scene } from "./js/scene.js"
import { Rectangle, Circle,CompoundShape } from "./js/shapes.js"
import { RGBA } from "./js/renderer.js"




let scene = new Scene(document.getElementById("test"))
let rect = new Circle(5) //new CompoundShape( [[new Circle(5),8,0],[new Circle(3),0,0]])
rect.x += 10
rect.y += 10
scene.add(rect)
let thing2 = new Rectangle(20,10)
thing2.x += 10
thing2.y += 10
scene.add(thing2)


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