import { runInThisContext } from "vm"
import { Hitbox, Hurtbox, Object2D } from "./object2d.js"
import { Scene } from "./scene.js"
import { Circle, CircleHitBox, CircleHurtBox, Rectangle, RectangleHitbox, RectangleHurtBox } from "./shapes.js"
import { Vector2D } from "./vector2d.js"

class Character {
    name: string
    hitboxes: Array<Hitbox>
    hurtboxes: Array<Hurtbox>
    appearance: Array<Object2D>
    controller: Controller
    poses: Array<Pose>
    x: number
    y: number
    velocity: Vector2D
    maxVel: Vector2D
    currentPose: number
    stunDuration: number
    animations: Map<string,Animation>
    currentAnimation: string
    constructor(name: string, controller: Controller, idleAnimation: Animation) {
        this.name = name
        this.controller = controller
        this.poses = []
        this.animations = new Map()
        this.animations.set("idle", idleAnimation)
        this.hitboxes = []
        this.hurtboxes = []
        this.appearance = []
        this.currentPose = 0
        this.x = 0
        this.y = 0
        this.velocity = new Vector2D(0, 0)
        this.maxVel = new Vector2D(10, 10)
        this.stunDuration = 0
        this.currentAnimation = "idle"
    }
    setX(x: number) {
        // console.log("character setting x " + x)
        this.x = x
        this.animations.forEach((value: Animation, key: string)=>{
            value.setX(x)
        })
        // Object.keys(this.animations).forEach((key: string)=>{
        //     this.animations.get(key).setX(x)
        // })
    }
    setY(y: number) {
        this.y = y
        this.animations.forEach((value: Animation, key: string)=>{
            value.setY(y)
        })    
    }
    draw(scene: Scene, debug: boolean = false) {
        this.appearance.forEach((object: Object2D) => {
            object.draw(scene)
        })
        if (debug) {
            this.hitboxes.forEach((hitbox: Hitbox) => {
                hitbox.draw(scene)
            })
            this.hurtboxes.forEach((hurtbox: Hurtbox) => {
                hurtbox.draw(scene)
            })
        }
    }
    addAnimation(animation: Animation, key: string){
        this.animations.set(key, animation)
    }
    update() {
        // console.log(this.velocity.x)
        if (this.controller.left) {
            this.velocity.x -= 1
        }
        if (this.controller.right) {
            this.velocity.x += 1
        }
        if (this.controller.up) {
            this.velocity.y -= 1
        }
        if (this.controller.down) {
            this.velocity.y += 1
        }
        // // Velocity Damping 
        this.velocity.x *= 0.9
        this.velocity.y *= 0.9
        // if (this.velocity.x > this.maxVel.x) {
        //     this.velocity.x = this.maxVel.x
        // }
        // if (this.velocity.y > this.maxVel.y) {
        //     this.velocity.y = this.maxVel.y
        // }
        //If near floor, and going towards floor, do not move down anymore
        // if (this.y + this.velocity.y >= 128){
        //     console.log("floor:")
        //     this.velocity.y = 0
        //     this.setY(128)
        // }
        // if (this.stunDuration > 0) {
        //     this.stunDuration -= 1
        // }
        if (this.currentAnimation == "idle"){
            let cur_animation
            if (this.controller.normal){
                this.currentAnimation = "normal"
                cur_animation = this.animations.get("normal")
            } else {
                cur_animation = this.animations.get("idle")
            }
            let pose = cur_animation.getCurrentFrame()
            cur_animation.incrementFrame()
            if (cur_animation.currentFrame >= cur_animation.totalFrames) {
                cur_animation.currentFrame = 0
            }
            this.appearance = pose.appearance
            this.hitboxes = pose.hitboxes
            this.hurtboxes = pose.hurtboxes
        } else {
            // Doing other animation, so gotta stick with it
            let cur_animation = this.animations.get(this.currentAnimation)
            let pose = cur_animation.getCurrentFrame()
            cur_animation.incrementFrame()
            if (cur_animation.currentFrame >= cur_animation.totalFrames) {
                cur_animation.reset()
                this.currentAnimation = "idle"
            }
            this.appearance = pose.appearance
            this.hitboxes = pose.hitboxes
            this.hurtboxes = pose.hurtboxes
        }
    }
}

class Pose {
    hitboxes: Array<Hitbox>
    hurtboxes: Array<Hurtbox>
    appearance: Array<Object2D>
    x: number
    y: number
    constructor(hitboxes: Array<Hitbox>, hurtboxes: Array<Hurtbox>, appearance: Array<Object2D>) {
        this.x = 0
        this.y = 0
        this.hitboxes = hitboxes;
        this.hurtboxes = hurtboxes;
        this.appearance = appearance
    }
    setX(x: number) {
        // console.log("setting x" + x)
        let dx = x - this.x
        this.x += dx
        this.hitboxes.forEach((hitbox: Hitbox) => {
            hitbox.x += dx
        })
        this.hurtboxes.forEach((hurtbox: Hurtbox) => {
            hurtbox.x += dx
        })
        this.appearance.forEach((appearance: Object2D) => {
            appearance.x += dx
        })
    }
    setY(y: number) {
        let dy = y - this.y
        this.y += dy
        this.hitboxes.forEach((hitbox: Hitbox) => {
            hitbox.y += dy
        })
        this.hurtboxes.forEach((hurtbox: Hurtbox) => {
            hurtbox.y += dy
        })
        this.appearance.forEach((appearance: Object2D) => {
            appearance.y += dy
        })
    }
}
class Animation {
    poses: Array<Pose>
    currentFrame: number
    totalFrames: number
    name: string
    constructor(name: string) {
        this.name = name
        this.poses = []
        this.currentFrame = 0
        this.totalFrames = 0
    }
    addPose(pose: Pose) {
        this.poses.push(pose)
        this.totalFrames += 1
    }
    reset() {
        this.currentFrame = 0
    }
    getCurrentFrame() {
        return this.poses[this.currentFrame]
    }
    incrementFrame() {
        this.currentFrame += 1
    }
    // resetFrame(){
    //     this.currentFrame = 1
    // }
    setX(x: number) {
        // console.log("received at animation: " + x)
        this.poses.forEach((pose: Pose) => {
            pose.setX(x)
        })
    }
    setY(y: number) {
        this.poses.forEach((pose: Pose) => {
            pose.setY(y)
        })
    }
}



interface Controller {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    normal: boolean
    special: boolean
}
class ArrowController implements Controller {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    debug: boolean
    normal: boolean
    special: boolean
    constructor() {
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.debug = false
        this.normal = false
        this.special = false
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowDown':
                    this.down = true
                    break
                case 'ArrowUp':
                    this.up = true
                    break
                case 'ArrowLeft':
                    this.left = true
                    break
                case 'ArrowRight':
                    this.right = true
                    break
                // case ''
            }
        })
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowDown':
                    this.down = false
                    break
                case 'ArrowUp':
                    this.up = false
                    break
                case 'ArrowLeft':
                    this.left = false
                    break
                case 'ArrowRight':
                    this.right = false
                    break

            }
        })
    }
}
class WASDController implements Controller {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    debug: boolean
    normal: boolean
    special: boolean
    constructor() {
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.debug = false
        this.special = false
        this.normal = false
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 's':
                    this.down = true
                    break
                case 'w':
                    this.up = true
                    break
                case 'a':
                    this.left = true
                    break
                case 'd':
                    this.right = true
                    break
                case 'j':
                    this.normal = true
                    break
                case 'k':
                    this.special = true
                    break
            }
        })
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 's':
                    this.down = false
                    break
                case 'w':
                    this.up = false
                    break
                case 'a':
                    this.left = false
                    break
                case 'd':
                    this.right = false
                    break
                case 'j':
                    this.normal = false
                    break
                case 'k':
                    this.special = false
                    break
            }
        })
    }
}

export { Pose, ArrowController, WASDController, Character, Animation }
function isHitCircle(object: Hitbox): object is CircleHitBox {
    return object.type === "circle"
}
function isHitRect(object: Hitbox): object is RectangleHitbox {
    return object.type === "rectangle"
}
function isHurtCircle(object: Hurtbox): object is CircleHurtBox {
    return object.type === "circle"
}
function isHurtRect(object: Hurtbox): object is RectangleHurtBox {
    return object.type === "rectangle"
}
function isCircle(object: Object2D): object is Circle {
    return object.type === "circle"
}
function isRect(object: Object2D): object is Rectangle {
    return object.type === "rectangle"
}