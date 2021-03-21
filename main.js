import { Scene, PhysicsScene, GravityScene, ArcadePhysicsScene } from "./js/scene.js"
import { Rectangle, Circle, CompoundShape, RectangleHurtBox, CircleHitBox, RectangleHitbox } from "./js/shapes.js"
import { Vector2D } from "./js/vector2d.js"
import { ArrowController, WASDController, Character, Pose,Animation } from "./js/character.js"
import { RGBA } from "./js/renderer.js"


let scene = new ArcadePhysicsScene(document.getElementById('test'))
// scene.add(rect)
let controls1 = new ArrowController()
let controls2 = new WASDController()

let idleAnimation = new Animation('idle')
for (let i = 0; i < 5; i++){
    let rect1 = new Rectangle(10, 10)
    rect1.changeColor(new RGBA(255, 255, 0, 1))
    let frame1 = new Pose([],[new Rectangle(10,10)],[rect1])    
    idleAnimation.addPose(frame1)
}
for (let i = 0; i < 5; i++){
    let rect2 = new Rectangle(8, 8)
    rect2.x += 1
    rect2.y += 1
    rect2.changeColor(new RGBA(255, 200, 0, 1))
    let frame2 = new Pose([],[new Rectangle(10,10)], [rect2])
    idleAnimation.addPose(frame2)
}
let char1 = new Character("char1", controls2, idleAnimation)
scene.addCharacter(char1)
setInterval(() => {
    scene.update()
}, 50)


let attackAnimation = new Animation("normal")
// startup
for (let i = 0; i < 10; i++){
    let rect3 = new Rectangle(10, 10)
    rect3.changeColor(new RGBA(255, 255-i*20, 0, 1))
    let frame = new Pose([],[],[rect3])
    attackAnimation.addPose(frame)
}
//move
for (let i = 0; i < 7; i++){
    let rect1 = new Rectangle(5, 5)
    rect1.x -= i
    rect1.y += 2
    rect1.changeColor(new RGBA(255,0,0,1))
    let rect2 = new RectangleHitbox(5,5, new Vector2D(-1, 0), 0)
    rect2.x -= i
    rect2.y += 2
    rect2.changeColor(new RGBA(255,0,0,1))
    let rect3 = new Rectangle(10, 10)
    rect3.changeColor(new RGBA(255, 255-180, 0, 1))
    let frame = new Pose([rect2],[],[rect1, rect3])
    attackAnimation.addPose(frame)
}
for (let i = 7; i > 0; i--){
    let rect1 = new Rectangle(5, 5)
    rect1.x -= i
    rect1.y += 2
    rect1.changeColor(new RGBA(255,0,0,1))
    let rect2 = new RectangleHitbox(5,5, new Vector2D(-1, 0), 0)
    rect2.x -= i
    rect2.y += 2
    rect2.changeColor(new RGBA(255,0,0,1))
    let rect3 = new Rectangle(10, 10)
    rect3.changeColor(new RGBA(255, 255-180, 0, 1))
    let frame = new Pose([rect2],[],[rect1, rect3])
    attackAnimation.addPose(frame)
}
//cooldown
for (let i = 0; i < 10; i++){
    let rect3 = new Rectangle(10, 10)
    rect3.changeColor(new RGBA(255, 255-180 + i*20, 0, 1))
    let frame = new Pose([],[],[rect3])
    attackAnimation.addPose(frame)
}
char1.addAnimation(attackAnimation, "normal")


let animationIdle = new Animation('idle')
animationIdle.addPose(new Pose([],[new RectangleHurtBox(20, 20)],[new Circle(10)]))
let char2 = new Character("char2", controls1, animationIdle)
scene.addCharacter(char2)