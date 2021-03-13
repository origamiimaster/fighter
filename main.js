import { Scene, PhysicsScene, GravityScene } from "./js/scene.js"
import { Rectangle, Circle, CompoundShape } from "./js/shapes.js"
import { Vector2D } from "./js/vector2d.js"




let scene = new PhysicsScene(document.getElementById("test"))
// let floor = new Rectangle(128, 10)
// floor.fixed = true


let rect = new Circle(5)
let newRect = new Circle(6)
newRect.x += 40
newRect.y += 20
scene.add(newRect)
newRect.velocity.x -= 0.1
// let rect = new CompoundShape( [[new Circle(5),8,0],[new Circle(3),0,0]])
rect.x += 10
rect.y += 10
scene.add(rect)
// scene.add(floor)
// floor.y += 128 - 10 - 10
// let thing2 = new Rectangle(20, 10)
// thing2.x += 10
// thing2.y += 10
// scene.add(thing2)

// let v1 = new Vector2D(2,1)
// let v2 = new Vector2D(3,4)
// console.log(v1)
// console.log(v2)
// let v3 = v1 + v2
// console.log(v3)
// let v4 = v1.plus(v2)
// console.log(v4)
setInterval(() => {
    scene.update()
}, 1000)


document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowDown':
            rect.velocity.y += .1
            break
        case 'ArrowUp':
            rect.velocity.y -= .1
            break
        case 'ArrowLeft':
            rect.velocity.x -= .1
            break
        case 'ArrowRight':
            rect.velocity.x += .1
            break
    }
})

